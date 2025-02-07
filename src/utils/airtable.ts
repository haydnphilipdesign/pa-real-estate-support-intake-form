
import Airtable from 'airtable';

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
        'MLS Number': formattedMlsNumber,
        'Address': formData.propertyData.address,
        'Sale Price': formData.propertyData.salePrice,
        'Status': formData.propertyData.status,
        'Is Winterized': formData.propertyData.isWinterized,
        'Update MLS': formData.propertyData.updateMls,

        // Commission Information
        'Commission Base': formData.commissionData.commissionBase,
        'Sellers Assist': formData.commissionData.sellersAssist,
        'Total Commission': formData.commissionData.totalCommission,
        'Listing Agent Commission': formData.commissionData.listingAgentCommission,
        'Buyers Agent Commission': formData.commissionData.buyersAgentCommission,
        'Buyer Paid Commission': formData.commissionData.buyerPaidCommission,
        'Is Referral': formData.commissionData.isReferral,
        'Referral Party': formData.commissionData.referralParty,
        'Broker EIN': formData.commissionData.brokerEin,
        'Referral Fee': formData.commissionData.referralFee,

        // Client Information (indexed for multiple clients)
        'Client Name': client.name,
        'Client Email': client.email,
        'Client Phone': client.phone,
        'Client Address': client.address,
        'Client Type': client.type,
        'Marital Status': client.maritalStatus,
        'Client Index': index + 1,

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
    }));

    // Create records for each client
    const records = await base('Transactions').create(clientRecords);
    return records;
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};

