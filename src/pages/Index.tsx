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

  const handleStepClick = (step: number) => {
    if (step < currentStep || validateCurrentStep()) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!selectedRole) {
          toast({
            title: "Please select a role",
            description: "You must select a role to continue",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!propertyData.mlsNumber || !propertyData.address || !propertyData.salePrice) {
          toast({
            title: "Missing information",
            description: "Please fill in all required property information",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        const hasInvalidClient = clients.some(
          (client) => !client.name || !client.email || !client.phone || !client.maritalStatus
        );
        if (hasInvalidClient) {
          toast({
            title: "Missing client information",
            description: "Please fill in all required client information",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 4:
        // Commission validation will be added later
        return true;
      case 5:
        // Documents validation will be added later
        return true;
      default:
        return true;
    }
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
            <CommissionSection role={selectedRole} />
          )}

          {currentStep === 5 && (
            <PropertyDetailsSection role={selectedRole} />
          )}

          {currentStep === 6 && (
            <WarrantySection role={selectedRole} />
          )}

          {currentStep === 7 && (
            <TitleCompanySection role={selectedRole} />
          )}

          {currentStep === 8 && (
            <DocumentsSection role={selectedRole} />
          )}

          {currentStep === 9 && (
            <AdditionalInfoSection role={selectedRole} />
          )}

          {currentStep === 10 && (
            <SignatureSection role={selectedRole} />
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