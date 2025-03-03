
import Airtable from 'airtable';
import { TransactionFormData } from '@/types/transaction';

const airtableBase = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const transactionsTable = airtableBase(import.meta.env.VITE_AIRTABLE_TRANSACTIONS_TABLE_ID);
const clientsTable = airtableBase(import.meta.env.VITE_AIRTABLE_CLIENTS_TABLE_ID);

// Mapping of form fields to Airtable field IDs
const transactionFieldMap = {
  mlsNumber: 'fld6O2FgIXQU5G27o',
  address: 'fldypnfnHhplWYcCW',
  propertyStatus: 'fldV2eLxz6w0TpLFU',
  salePrice: 'fldhHjBZJISmnP8SK',
  isWinterized: 'fldExdgBDgdB1i9jy',
  updateMls: 'fldw3GlfvKtyNfIAW',
  commissionBase: 'fldwx7zlKIGGIAxfq',
  sellersAssist: 'fldTvXx96Na0zRh6W',
  totalCommission: 'fldsOqVJDGYKUjD8L',
  totalCommissionPercentage: 'fldE8INzEorBtx2uN',
  fixedCommissionAmount: 'fldNXNV9Yx2LwJPhN',
  listingAgentPercentage: 'flduuQQT7o6XAGlRe',
  buyersAgentPercentage: 'fld5KRrToAAt5kOLd',
  buyerPaidPercentage: 'flddRltdGj05Clzpa',
  isReferral: 'fldLVyXkhqppQ7WpC',
  referralParty: 'fldzVtmn8uylVxuTF',
  referralFee: 'fldewmjoaJVwiMF46',
  specialInstructions: 'fldDWN8jU4kdCffzu',
  urgentIssues: 'fldgW16aPdFMdspO6',
  notes: 'fld30htJ7euVerCLW',
  requiresFollowUp: 'fldIG7LFmo1Sro6Oz',
  clients: 'fldmPyBwuOO1dgj1g',
  agentName: 'fldFD4xHD0vxnSOHJ',
  dateSubmitted: 'fldSSndzSwwzeLSph',
  termsAccepted: 'fldgBdQYZLx6IRdSn',
  infoConfirmed: 'fldlFelkiiGDrSCqe',
  brokerEin: 'fld20VbKbWzdR4Sp7',
  agentRole: 'fldOVyoxz38rWwAFy',
};

const clientFieldMap = {
  name: 'fldSqxNOZ9B5PgSab',
  email: 'flddP6a8EG6qTJdIi',
  phone: 'fldBnh8W6iGW014yY',
  address: 'fldz1IpeR1256LhuC',
  type: 'fldSY6vbE1zAhJZqd',
  maritalStatus: 'fldeK6mjSfxELU0MD',
  transactions: 'fldYsIpMRHmvRjpUd',
};

export const submitToAirtable = async (data: TransactionFormData & { selectedRole: string }) => {
  try {
    // First, create client records
    const clientRecords = await Promise.all(
      data.clients.map(client => 
        clientsTable.create({
          [clientFieldMap.name]: client.name,
          [clientFieldMap.email]: client.email,
          [clientFieldMap.phone]: client.phone,
          [clientFieldMap.address]: client.address,
          [clientFieldMap.type]: client.type,
          [clientFieldMap.maritalStatus]: client.maritalStatus,
        })
      )
    );

    // Then create the transaction record with links to clients
    const transactionRecord = await transactionsTable.create({
      [transactionFieldMap.mlsNumber]: data.propertyData.mlsNumber,
      [transactionFieldMap.address]: data.propertyData.address,
      [transactionFieldMap.propertyStatus]: data.propertyData.status,
      [transactionFieldMap.salePrice]: parseFloat(data.propertyData.salePrice),
      [transactionFieldMap.isWinterized]: data.propertyData.isWinterized,
      [transactionFieldMap.updateMls]: data.propertyData.updateMls,
      [transactionFieldMap.commissionBase]: data.commissionData.commissionBase,
      [transactionFieldMap.sellersAssist]: data.commissionData.sellersAssist ? parseFloat(data.commissionData.sellersAssist) : 0,
      [transactionFieldMap.totalCommission]: data.commissionData.totalCommission ? parseFloat(data.commissionData.totalCommission) : 0,
      [transactionFieldMap.listingAgentPercentage]: data.commissionData.listingAgentCommission ? parseFloat(data.commissionData.listingAgentCommission) : 0,
      [transactionFieldMap.buyersAgentPercentage]: data.commissionData.buyersAgentCommission ? parseFloat(data.commissionData.buyersAgentCommission) : 0,
      [transactionFieldMap.buyerPaidPercentage]: data.commissionData.buyerPaidCommission ? parseFloat(data.commissionData.buyerPaidCommission) : 0,
      [transactionFieldMap.isReferral]: data.commissionData.isReferral,
      [transactionFieldMap.referralParty]: data.commissionData.referralParty,
      [transactionFieldMap.referralFee]: data.commissionData.referralFee ? parseFloat(data.commissionData.referralFee) : 0,
      [transactionFieldMap.specialInstructions]: data.additionalInfo.specialInstructions,
      [transactionFieldMap.urgentIssues]: data.additionalInfo.urgentIssues,
      [transactionFieldMap.notes]: data.additionalInfo.notes,
      [transactionFieldMap.requiresFollowUp]: data.additionalInfo.requiresFollowUp,
      [transactionFieldMap.clients]: clientRecords.map(record => record.id),
      [transactionFieldMap.agentName]: data.signatureData.agentName,
      [transactionFieldMap.dateSubmitted]: data.signatureData.dateSubmitted,
      [transactionFieldMap.termsAccepted]: data.signatureData.termsAccepted,
      [transactionFieldMap.infoConfirmed]: data.signatureData.infoConfirmed,
      [transactionFieldMap.brokerEin]: data.commissionData.brokerEin,
      [transactionFieldMap.agentRole]: data.selectedRole,
    });

    // Update the client records with the new transaction
    await Promise.all(
      clientRecords.map(clientRecord =>
        clientsTable.update(clientRecord.id, {
          [clientFieldMap.transactions]: [transactionRecord.id],
        })
      )
    );

    return { transaction: transactionRecord, clients: clientRecords };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};
