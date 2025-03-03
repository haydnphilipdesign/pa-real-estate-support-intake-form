
import { useEffect } from "react";
import TransactionForm from "./TransactionForm";

interface PortalTransactionFormProps {
  onFormSubmit?: (data: any) => void;
  agentId?: string;
  logo?: string;
  className?: string;
}

export default function PortalTransactionForm({
  onFormSubmit,
  agentId,
  logo,
  className
}: PortalTransactionFormProps) {
  useEffect(() => {
    // You can add any portal-specific initialization here
    console.log("TransactionForm mounted in Portal for agent:", agentId);
    
    // Clean up function
    return () => {
      console.log("TransactionForm unmounted from Portal");
    };
  }, [agentId]);

  const handleFormComplete = (data: any) => {
    // Add any portal-specific data processing here
    const enrichedData = {
      ...data,
      agentId,
      submittedAt: new Date().toISOString(),
      source: "agent-portal"
    };
    
    if (onFormSubmit) {
      onFormSubmit(enrichedData);
    }
  };

  return (
    <TransactionForm 
      onComplete={handleFormComplete}
      logo={logo}
      className={className}
    />
  );
}
