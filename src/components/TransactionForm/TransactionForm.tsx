
import { useState } from "react";
import { Toaster } from "./src/components/ui/toaster";
import { TooltipProvider } from "./src/components/ui/tooltip";
import { Toaster as Sonner } from "./src/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Import form components
import { FormNavigation } from "./src/components/FormNavigation";
import { RoleSelection } from "./src/components/RoleSelection";
import { PropertyInformation } from "./src/components/PropertyInformation";
import { ClientInformation } from "./src/components/ClientInformation";
import { CommissionSection } from "./src/components/CommissionSection";
import { DocumentsSection } from "./src/components/DocumentsSection";
import { PropertyDetailsSection } from "./src/components/PropertyDetailsSection";
import { WarrantySection } from "./src/components/WarrantySection";
import { AdditionalInfoSection } from "./src/components/AdditionalInfoSection";
import { SignatureSection } from "./src/components/SignatureSection";
import { StepWizard } from "./src/components/StepWizard";

// Import the custom hook for form state management
import { useTransactionForm } from "./src/hooks/useTransactionForm";
import { submitToAirtable } from "./src/utils/airtable";
import { useToast } from "./src/hooks/use-toast";

interface TransactionFormProps {
  onComplete?: (data: any) => void;
  logo?: string;
  className?: string;
}

const queryClient = new QueryClient();

export default function TransactionForm({ 
  onComplete,
  logo = "/lovable-uploads/9849cb8f-e9f4-4d2d-ac43-b638a6715172.png",
  className = ""
}: TransactionFormProps) {
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
      
      if (onComplete) {
        onComplete(formData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
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
        <div className={`min-h-screen p-4 flex items-center justify-center ${className}`}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl backdrop-blur-md bg-white/20 rounded-xl border border-white/30 shadow-xl overflow-hidden"
          >
            <div className="py-4 px-8">
              <div className="flex justify-center mb-6">
                <img 
                  src={logo}
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
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
