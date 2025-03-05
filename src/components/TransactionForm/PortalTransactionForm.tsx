
import React from "react";
import { TransactionForm } from "./TransactionForm";

interface PortalTransactionFormProps {
  agentId?: string;
  onFormSubmit?: (data: any) => void;
  logo?: string;
}

export function PortalTransactionForm({ agentId, onFormSubmit, logo }: PortalTransactionFormProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white">
      <TransactionForm />
    </div>
  );
}
