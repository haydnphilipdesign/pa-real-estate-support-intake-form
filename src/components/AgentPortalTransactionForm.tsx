
import React from "react";
import { PortalTransactionForm } from './TransactionForm/PortalTransactionForm';

interface AgentPortalTransactionFormProps {
  agentId?: string;
  onFormSubmit?: (data: any) => void;
  logo?: string;
  className?: string;
}

export function AgentPortalTransactionForm({
  agentId,
  onFormSubmit,
  logo,
  className
}: AgentPortalTransactionFormProps) {
  return (
    <div className={className}>
      <PortalTransactionForm
        agentId={agentId}
        onFormSubmit={onFormSubmit}
        logo={logo}
      />
    </div>
  );
}
