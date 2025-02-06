import Airtable from 'airtable';

const AIRTABLE_API_KEY = 'patTmLTvKhZ0hs6ZB.3644ac279f9828df981ce7921b05d5c996f5f2e82d9c51daee4604a06c4f9e2d';
const AIRTABLE_BASE_ID = 'appfzBPCBvZeW9QTl';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export const submitToAirtable = async (formData: any) => {
  try {
    const record = await base('Transactions').create([
      {
        fields: {
          // Property Information
          'MLS Number': formData.propertyData.mlsNumber,
          'Address': formData.propertyData.address,
          'Sale Price': formData.propertyData.salePrice,
          'Status': formData.propertyData.status,
          'Is Winterized': formData.propertyData.isWinterized,
          'Update MLS': formData.propertyData.updateMls,

          // Client Information (first client)
          'Client Name': formData.clients[0]?.name,
          'Client Email': formData.clients[0]?.email,
          'Client Phone': formData.clients[0]?.phone,
          'Client Address': formData.clients[0]?.address,
          'Client Type': formData.clients[0]?.type,
          'Marital Status': formData.clients[0]?.maritalStatus,

          // Commission Information
          'Total Commission': formData.commissionData.totalCommission,
          'Broker Split': formData.commissionData.brokerSplit,
          'Is Referral': formData.commissionData.isReferral,
          'Referral Fee': formData.commissionData.referralFee,

          // Additional Information
          'Special Instructions': formData.additionalInfo.specialInstructions,
          'Urgent Issues': formData.additionalInfo.urgentIssues,
          'Notes': formData.additionalInfo.notes,
          'Requires Follow Up': formData.additionalInfo.requiresFollowUp,

          // Signature Information
          'Agent Name': formData.signatureData.agentName,
          'Date Submitted': formData.signatureData.dateSubmitted,
          'Terms Accepted': formData.signatureData.termsAccepted,
          'Info Confirmed': formData.signatureData.infoConfirmed,
          'Signature': formData.signatureData.signature,
        }
      }
    ]);

    return record;
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};