
import { PortalTransactionForm } from './TransactionForm/PortalTransactionForm';

interface AgentPortalTransactionFormProps {
  agent: {
    id: string;
    name: string;
  };
  onSubmit: (data: any) => void;
  logo?: string;
}

/**
 * AgentPortalTransactionForm is a wrapper around the PortalTransactionForm
 * that provides agent-specific functionality
 */
export function AgentPortalTransactionForm({
  agent,
  onSubmit,
  logo = "/lovable-uploads/9849cb8f-e9f4-4d2d-ac43-b638a6715172.png"
}: AgentPortalTransactionFormProps) {
  return (
    <div className="agent-portal-transaction-form">
      <PortalTransactionForm 
        agentId={agent.id} 
        onFormSubmit={onSubmit} 
        logo={logo} 
      />
    </div>
  );
}
