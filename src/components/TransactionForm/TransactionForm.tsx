
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import components
import { FormNavigation } from "@/components/FormNavigation";
import { RoleSelection } from "@/components/RoleSelection";
import { PropertyInformation } from "@/components/PropertyInformation";
import { ClientInformation } from "@/components/ClientInformation";
import { CommissionSection } from "@/components/CommissionSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { PropertyDetailsSection } from "@/components/PropertyDetailsSection";
import { WarrantySection } from "@/components/WarrantySection";
import { AdditionalInfoSection } from "@/components/AdditionalInfoSection";
import { SignatureSection } from "@/components/SignatureSection";
import { StepWizard } from "@/components/StepWizard";

// Import hooks and utils
import { useTransactionForm } from "@/hooks/useTransactionForm";
import { submitToAirtable } from "@/utils/airtable";
import { useToast } from "@/hooks/use-toast";

// Create a new QueryClient instance
const queryClient = new QueryClient();

export function TransactionForm() {
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

  // Since we combined Property Details and Title sections, adjust the total steps
  const totalSteps = 9;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen p-4 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl backdrop-blur-md bg-white/20 rounded-xl border border-white/30 shadow-xl overflow-hidden"
          >
            <div className="py-4 px-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/9849cb8f-e9f4-4d2d-ac43-b638a6715172.png"
                  alt="PA Real Estate Support Services LLC"
                  className="h-12"
                />
              </div>

              <StepWizard
                currentStep={currentStep}
                totalSteps={totalSteps}
                onStepClick={handleStepClick}
              />

              <div className="p-4 md:p-6">
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
                    titleData={titleData}
                    onTitleChange={(field, value) => setTitleData(prev => ({ ...prev, [field]: value }))}
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
                  <DocumentsSection role={selectedRole} />
                )}

                {currentStep === 8 && (
                  <AdditionalInfoSection 
                    role={selectedRole}
                    data={additionalInfo}
                    onChange={(field, value) => setAdditionalInfo(prev => ({ ...prev, [field]: value }))}
                  />
                )}

                {currentStep === 9 && (
                  <SignatureSection 
                    role={selectedRole}
                    data={signatureData}
                    onChange={(field, value) => setSignatureData(prev => ({ ...prev, [field]: value }))}
                    onSubmit={handleSubmit}
                  />
                )}

                <FormNavigation
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  className="mt-8"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
