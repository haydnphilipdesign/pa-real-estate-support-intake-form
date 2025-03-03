
import Airtable from 'airtable';
import { TABLES, TRANSACTION_FIELDS, CLIENT_FIELDS } from '@/config/airtable';

const AIRTABLE_API_KEY = 'patTmLTvKhZ0hs6ZB.3644ac279f9828df981ce7921b05d5c996f5f2e82d9c51daee4604a06c4f9e2d';
const AIRTABLE_BASE_ID = 'appfzBPCBvZeW9QTl';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

function formatMlsNumber(mlsNumber: string): string {
  // Remove any whitespace and non-digit characters
  let cleaned = mlsNumber.replace(/[^\d]/g, '');
  
  // Limit to 6 digits
  cleaned = cleaned.slice(0, 6);
  
  // Pad with leading zeros if needed
  cleaned = cleaned.padStart(6, '0');
  
  return cleaned;
}

export const submitToAirtable = async (formData: any) => {
  try {
    // Format the MLS number before creating records
    const formattedMlsNumber = formatMlsNumber(formData.propertyData.mlsNumber);
    
    // Handle multiple clients by creating an array of records
    const clientRecords = formData.clients.map((client: any, index: number) => ({
      fields: {
        // Property Information
        [TRANSACTION_FIELDS.MLS_NUMBER]: formattedMlsNumber,
        [TRANSACTION_FIELDS.ADDRESS]: formData.propertyData.address,
        [TRANSACTION_FIELDS.SALE_PRICE]: formData.propertyData.salePrice,
        [TRANSACTION_FIELDS.PROPERTY_STATUS]: formData.propertyData.status,
        [TRANSACTION_FIELDS.WINTERIZED]: formData.propertyData.isWinterized,
        [TRANSACTION_FIELDS.UPDATE_MLS]: formData.propertyData.updateMls,

        // Commission Information
        [TRANSACTION_FIELDS.COMMISSION_BASE]: formData.commissionData.commissionBase,
        [TRANSACTION_FIELDS.SELLERS_ASSIST]: formData.commissionData.sellersAssist,
        [TRANSACTION_FIELDS.TOTAL_COMMISSION_PERCENTAGE]: formData.commissionData.totalCommission,
        [TRANSACTION_FIELDS.LISTING_AGENT_PERCENTAGE]: formData.commissionData.listingAgentCommission,
        [TRANSACTION_FIELDS.BUYERS_AGENT_PERCENTAGE]: formData.commissionData.buyersAgentCommission,
        [TRANSACTION_FIELDS.BUYER_PAID_PERCENTAGE]: formData.commissionData.buyerPaidCommission,
        [TRANSACTION_FIELDS.REFERRAL]: formData.commissionData.isReferral,
        [TRANSACTION_FIELDS.REFERRAL_PARTY]: formData.commissionData.referralParty,
        [TRANSACTION_FIELDS.BROKER_EIN]: formData.commissionData.brokerEin,
        [TRANSACTION_FIELDS.REFERRAL_FEE]: formData.commissionData.referralFee,

        // Client Information (indexed for multiple clients)
        [CLIENT_FIELDS.CLIENT_NAME]: client.name,
        [CLIENT_FIELDS.CLIENT_EMAIL]: client.email,
        [CLIENT_FIELDS.CLIENT_PHONE]: client.phone,
        [CLIENT_FIELDS.CLIENT_ADDRESS]: client.address,
        [CLIENT_FIELDS.CLIENT_TYPE]: client.type,
        [CLIENT_FIELDS.MARITAL_STATUS]: client.maritalStatus,
        [CLIENT_FIELDS.CLIENT_INDEX]: index + 1,

        // Additional Information
        [TRANSACTION_FIELDS.SPECIAL_INSTRUCTIONS]: formData.additionalInfo.specialInstructions,
        [TRANSACTION_FIELDS.URGENT_ISSUES]: formData.additionalInfo.urgentIssues,
        [TRANSACTION_FIELDS.ADDITIONAL_INFORMATION]: formData.additionalInfo.notes,
        [TRANSACTION_FIELDS.REQUIRES_FOLLOW_UP]: formData.additionalInfo.requiresFollowUp,

        // Signature Information
        [TRANSACTION_FIELDS.AGENT_NAME]: formData.signatureData.agentName,
        [TRANSACTION_FIELDS.DATE_SUBMITTED]: formData.signatureData.dateSubmitted,
        [TRANSACTION_FIELDS.TERMS_ACCEPTED]: formData.signatureData.termsAccepted,
        [TRANSACTION_FIELDS.INFO_CONFIRMED]: formData.signatureData.infoConfirmed,
      }
    }));

    // Create records for each client
    const records = await base(TABLES.TRANSACTIONS).create(clientRecords);
    return records;
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};
