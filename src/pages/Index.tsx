import { useState } from "react";
import { FormSidebar } from "@/components/FormSidebar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { RoleSelection } from "@/components/RoleSelection";
import { PropertyInformation } from "@/components/PropertyInformation";
import { ClientInformation } from "@/components/ClientInformation";
import { CommissionSection } from "@/components/CommissionSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { PropertyDetailsSection } from "@/components/PropertyDetailsSection";
import { WarrantySection } from "@/components/WarrantySection";
import { TitleCompanySection } from "@/components/TitleCompanySection";
import { AdditionalInfoSection } from "@/components/AdditionalInfoSection";
import { SignatureSection } from "@/components/SignatureSection";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 10;

interface ValidationErrors {
  [key: string]: string[];
}

export default function Index() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState({
    mlsNumber: "",
    address: "",
    salePrice: "",
    status: "occupied",
    isWinterized: false,
    updateMls: false,
  });
  const [clients, setClients] = useState([
    {
      id: "1",
      name: "",
      email: "",
      phone: "",
      address: "",
      maritalStatus: "",
      type: "buyer",
    },
  ]);
  const [commissionData, setCommissionData] = useState({
    totalCommission: "",
    brokerSplit: "",
    isReferral: false,
    referralFee: "",
  });
  const [propertyDetails, setPropertyDetails] = useState({
    yearBuilt: "",
    squareFootage: "",
    propertyType: "single-family",
    description: "",
  });
  const [warrantyData, setWarrantyData] = useState({
    hasWarranty: false,
    provider: "",
    term: "",
    cost: "",
  });
  const [titleData, setTitleData] = useState({
    companyName: "",
    escrowOfficer: "",
    escrowNumber: "",
    phone: "",
    email: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState({
    specialConditions: "",
    notes: "",
    requiresFollowUp: false,
  });
  const [signatureData, setSignatureData] = useState({
    termsAccepted: false,
    infoConfirmed: false,
    signature: "",
  });

  const validateStep = (step: number): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!selectedRole) {
          errors.role = ["Please select a role to continue"];
        }
        break;

      case 2:
        if (!propertyData.mlsNumber) errors.mlsNumber = ["MLS number is required"];
        if (!propertyData.address) errors.address = ["Property address is required"];
        if (!propertyData.salePrice) errors.salePrice = ["Sale price is required"];
        break;

      case 3:
        clients.forEach((client, index) => {
          if (!client.name) errors[`client${index}Name`] = ["Client name is required"];
          if (!client.email) errors[`client${index}Email`] = ["Client email is required"];
          if (!client.phone) errors[`client${index}Phone`] = ["Client phone is required"];
          if (!client.maritalStatus) errors[`client${index}MaritalStatus`] = ["Marital status is required"];
        });
        break;

      case 4:
        if (!commissionData.totalCommission) errors.totalCommission = ["Total commission is required"];
        if (!commissionData.brokerSplit) errors.brokerSplit = ["Broker split is required"];
        if (commissionData.isReferral && !commissionData.referralFee) {
          errors.referralFee = ["Referral fee is required when referral is selected"];
        }
        break;

      case 5:
        if (!propertyDetails.yearBuilt) errors.yearBuilt = ["Year built is required"];
        if (!propertyDetails.squareFootage) errors.squareFootage = ["Square footage is required"];
        break;

      case 6:
        if (warrantyData.hasWarranty) {
          if (!warrantyData.provider) errors.warrantyProvider = ["Warranty provider is required"];
          if (!warrantyData.term) errors.warrantyTerm = ["Warranty term is required"];
          if (!warrantyData.cost) errors.warrantyCost = ["Warranty cost is required"];
        }
        break;

      case 7:
        if (!titleData.companyName) errors.titleCompany = ["Title company name is required"];
        if (!titleData.escrowOfficer) errors.escrowOfficer = ["Escrow officer is required"];
        if (!titleData.escrowNumber) errors.escrowNumber = ["Escrow number is required"];
        break;

      case 10:
        if (!signatureData.termsAccepted) {
          errors.terms = ["You must accept the terms and conditions"];
        }
        if (!signatureData.infoConfirmed) {
          errors.confirmation = ["You must confirm the information is accurate"];
        }
        if (!signatureData.signature) {
          errors.signature = ["Signature is required"];
        }
        break;
    }

    return errors;
  };

  const handleStepClick = (step: number) => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length === 0 || step < currentStep) {
      setCurrentStep(step);
    } else {
      Object.values(errors).flat().forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
    }
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      Object.values(errors).flat().forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePropertyChange = (field: string, value: string | boolean) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClient = () => {
    setClients((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: "",
        email: "",
        phone: "",
        address: "",
        maritalStatus: "",
        type: selectedRole === "listing-agent" ? "seller" : 
              selectedRole === "buyers-agent" ? "buyer" : "buyer",
      },
    ]);
  };

  const handleRemoveClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  const handleClientChange = (id: string, field: string, value: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, [field]: value } : client
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <FormSidebar currentStep={currentStep} onStepClick={handleStepClick} />
      
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container max-w-4xl py-8">
          {currentStep === 1 && (
            <RoleSelection
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
          )}
          
          {currentStep === 2 && (
            <PropertyInformation
              data={propertyData}
              onChange={handlePropertyChange}
              role={selectedRole}
            />
          )}
          
          {currentStep === 3 && (
            <ClientInformation
              clients={clients}
              onAddClient={handleAddClient}
              onRemoveClient={handleRemoveClient}
              onClientChange={handleClientChange}
              role={selectedRole}
            />
          )}

          {currentStep === 4 && (
            <CommissionSection 
              role={selectedRole}
              data={commissionData}
              onChange={(field, value) => setCommissionData(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === 5 && (
            <PropertyDetailsSection 
              role={selectedRole}
              data={propertyDetails}
              onChange={(field, value) => setPropertyDetails(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === 6 && (
            <WarrantySection 
              role={selectedRole}
              data={warrantyData}
              onChange={(field, value) => setWarrantyData(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === 7 && (
            <TitleCompanySection 
              role={selectedRole}
              data={titleData}
              onChange={(field, value) => setTitleData(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === 8 && (
            <DocumentsSection role={selectedRole} />
          )}

          {currentStep === 9 && (
            <AdditionalInfoSection 
              role={selectedRole}
              data={additionalInfo}
              onChange={(field, value) => setAdditionalInfo(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === 10 && (
            <SignatureSection 
              role={selectedRole}
              data={signatureData}
              onChange={(field, value) => setSignatureData(prev => ({ ...prev, [field]: value }))}
            />
          )}
        </div>
      </main>

      <MobileNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
