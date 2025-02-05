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
              onChange={(field, value) => setPropertyData(prev => ({ ...prev, [field]: value }))}
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
            />
          )}

          {currentStep === 6 && (
            <WarrantySection 
              role={selectedRole}
            />
          )}

          {currentStep === 7 && (
            <TitleCompanySection 
              role={selectedRole}
            />
          )}

          {currentStep === 8 && (
            <DocumentsSection role={selectedRole} />
          )}

          {currentStep === 9 && (
            <AdditionalInfoSection 
              role={selectedRole}
            />
          )}

          {currentStep === 10 && (
            <SignatureSection 
              role={selectedRole}
            />
          )}
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