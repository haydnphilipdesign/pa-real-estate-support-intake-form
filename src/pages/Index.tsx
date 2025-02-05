import { FormSidebar } from "@/components/FormSidebar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { FormNavigation } from "@/components/FormNavigation";
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
import { useTransactionForm } from "@/hooks/useTransactionForm";

export default function Index() {
  const {
    currentStep,
    selectedRole,
    setSelectedRole,
    propertyData,
    setPropertyData,
    clients,
    setClients,
    commissionData,
    setCommissionData,
    propertyDetails,
    setPropertyDetails,
    warrantyData,
    setWarrantyData,
    titleData,
    setTitleData,
    additionalInfo,
    setAdditionalInfo,
    signatureData,
    setSignatureData,
    handleStepClick,
    handleNext,
    handlePrevious,
  } = useTransactionForm();

  const handleAddClient = () => {
    setClients((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: "",
        email: "",
        phone: "",
        address: "",
        maritalStatus: "single",
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

  const handleFieldChange = (section: string, field: string, value: any) => {
    switch (section) {
      case "property":
        setPropertyData(prev => ({ ...prev, [field]: value }));
        break;
      case "commission":
        setCommissionData(prev => ({ ...prev, [field]: value }));
        break;
      case "propertyDetails":
        setPropertyDetails(prev => ({ ...prev, [field]: value }));
        break;
      case "warranty":
        setWarrantyData(prev => ({ ...prev, [field]: value }));
        break;
      case "title":
        setTitleData(prev => ({ ...prev, [field]: value }));
        break;
      case "additionalInfo":
        setAdditionalInfo(prev => ({ ...prev, [field]: value }));
        break;
      case "signature":
        setSignatureData(prev => ({ ...prev, [field]: value }));
        break;
    }
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
              onChange={(field, value) => handleFieldChange("property", field, value)}
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
              onChange={(field, value) => handleFieldChange("commission", field, value)}
            />
          )}

          {currentStep === 5 && (
            <PropertyDetailsSection 
              role={selectedRole}
              data={propertyDetails}
              onChange={(field, value) => handleFieldChange("propertyDetails", field, value)}
            />
          )}

          {currentStep === 6 && (
            <WarrantySection 
              role={selectedRole}
              data={warrantyData}
              onChange={(field, value) => handleFieldChange("warranty", field, value)}
            />
          )}

          {currentStep === 7 && (
            <TitleCompanySection 
              role={selectedRole}
              data={titleData}
              onChange={(field, value) => handleFieldChange("title", field, value)}
            />
          )}

          {currentStep === 8 && (
            <DocumentsSection role={selectedRole} />
          )}

          {currentStep === 9 && (
            <AdditionalInfoSection 
              role={selectedRole}
              data={additionalInfo}
              onChange={(field, value) => handleFieldChange("additionalInfo", field, value)}
            />
          )}

          {currentStep === 10 && (
            <SignatureSection 
              role={selectedRole}
              data={signatureData}
              onChange={(field, value) => handleFieldChange("signature", field, value)}
            />
          )}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={10}
            onNext={handleNext}
            onPrevious={handlePrevious}
            className="mt-8"
          />
        </div>
      </main>

      <MobileNavigation
        currentStep={currentStep}
        totalSteps={10}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}