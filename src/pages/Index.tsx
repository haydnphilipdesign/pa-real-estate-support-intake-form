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
import { submitToAirtable } from "@/utils/airtable";
import { useToast } from "@/hooks/use-toast";
import { StepWizard } from "@/components/StepWizard";

export default function Index() {
  const { toast } = useToast();
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

  const handleSubmit = async () => {
    try {
      const formData = {
        selectedRole,
        propertyData,
        clients,
        commissionData,
        propertyDetails,
        warrantyData,
        titleData,
        additionalInfo,
        signatureData,
      };

      await submitToAirtable(formData);
      
      toast({
        title: "Success!",
        description: "Transaction has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gold/30 to-brand-navy/10">
      <main className="container max-w-6xl py-8">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/9849cb8f-e9f4-4d2d-ac43-b638a6715172.png"
            alt="PA Real Estate Support Services LLC"
            className="h-16 mx-auto mb-6"
          />
          <div className="h-px bg-brand-navy/10 max-w-md mx-auto" />
        </div>

        <div className="backdrop-blur-xl bg-white/30 rounded-2xl border border-white/20 shadow-lg">
          <StepWizard
            currentStep={currentStep}
            totalSteps={10}
            onStepClick={handleStepClick}
          />

          <div className="p-6">
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
                onAddClient={() => setClients((prev) => [
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
                ])}
                onRemoveClient={(id) => setClients((prev) => prev.filter((client) => client.id !== id))}
                onClientChange={(id, field, value) => setClients((prev) =>
                  prev.map((client) =>
                    client.id === id ? { ...client, [field]: value } : client
                  )
                )}
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
                onSubmit={handleSubmit}
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
        </div>
      </main>
    </div>
  );
}
