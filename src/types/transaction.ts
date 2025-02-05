export interface PropertyData {
  mlsNumber: string;
  address: string;
  salePrice: string;
  status: string;
  isWinterized: boolean;
  updateMls: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: string;
  type: string;
}

export interface CommissionData {
  totalCommission: string;
  brokerSplit: string;
  isReferral: boolean;
  referralFee: string;
}

export interface PropertyDetailsData {
  yearBuilt: string;
  squareFootage: string;
  propertyType: string;
  description: string;
}

export interface WarrantyData {
  hasWarranty: boolean;
  provider: string;
  term: string;
  cost: string;
}

export interface TitleCompanyData {
  companyName: string;
  escrowOfficer: string;
  escrowNumber: string;
  phone: string;
  email: string;
}

export interface AdditionalInfoData {
  specialConditions: string;
  notes: string;
  requiresFollowUp: boolean;
}

export interface SignatureData {
  termsAccepted: boolean;
  infoConfirmed: boolean;
  signature: string;
}