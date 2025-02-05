import { PropertyData, Client, CommissionData, PropertyDetailsData, WarrantyData, TitleCompanyData, SignatureData } from "../types/transaction";

export const validateStep = (step: number, data: {
  selectedRole: string | null;
  propertyData: PropertyData;
  clients: Client[];
  commissionData: CommissionData;
  propertyDetails: PropertyDetailsData;
  warrantyData: WarrantyData;
  titleData: TitleCompanyData;
  signatureData: SignatureData;
}): { [key: string]: string[] } => {
  const errors: { [key: string]: string[] } = {};

  switch (step) {
    case 1:
      if (!data.selectedRole) {
        errors.role = ["Please select a role to continue"];
      }
      break;

    case 2:
      if (!data.propertyData.mlsNumber) errors.mlsNumber = ["MLS number is required"];
      if (!data.propertyData.address) errors.address = ["Property address is required"];
      if (!data.propertyData.salePrice) errors.salePrice = ["Sale price is required"];
      break;

    case 3:
      data.clients.forEach((client, index) => {
        if (!client.name) errors[`client${index}Name`] = ["Client name is required"];
        if (!client.email) errors[`client${index}Email`] = ["Client email is required"];
        if (!client.phone) errors[`client${index}Phone`] = ["Client phone is required"];
        if (!client.maritalStatus) errors[`client${index}MaritalStatus`] = ["Marital status is required"];
      });
      break;

    case 4:
      if (!data.commissionData.totalCommission) errors.totalCommission = ["Total commission is required"];
      if (!data.commissionData.brokerSplit) errors.brokerSplit = ["Broker split is required"];
      if (data.commissionData.isReferral && !data.commissionData.referralFee) {
        errors.referralFee = ["Referral fee is required when referral is selected"];
      }
      break;

    case 10:
      if (!data.signatureData.termsAccepted) {
        errors.terms = ["You must accept the terms and conditions"];
      }
      if (!data.signatureData.infoConfirmed) {
        errors.confirmation = ["You must confirm the information is accurate"];
      }
      if (!data.signatureData.signature) {
        errors.signature = ["Signature is required"];
      }
      break;
  }

  return errors;
};