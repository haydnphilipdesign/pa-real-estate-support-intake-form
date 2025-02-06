import Airtable from 'airtable';

interface AirtableCredentials {
  apiKey: string;
  baseId: string;
}

let airtableCredentials: AirtableCredentials | null = null;

export const setAirtableCredentials = (credentials: AirtableCredentials) => {
  airtableCredentials = credentials;
};

export const submitToAirtable = async (formData: any) => {
  if (!airtableCredentials) {
    throw new Error('Airtable credentials not set');
  }

  const base = new Airtable({ apiKey: airtableCredentials.apiKey }).base(airtableCredentials.baseId);

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