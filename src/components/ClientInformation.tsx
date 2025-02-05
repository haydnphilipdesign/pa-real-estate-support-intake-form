import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientCard } from "./client/ClientCard";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: string;
  type: string;
}

interface ClientInformationProps {
  clients: Client[];
  onAddClient: () => void;
  onRemoveClient: (id: string) => void;
  onClientChange: (id: string, field: string, value: string) => void;
  role: string | null;
}

export function ClientInformation({
  clients,
  onAddClient,
  onRemoveClient,
  onClientChange,
  role,
}: ClientInformationProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Client Information</h2>
        <p className="text-muted-foreground">
          Enter the details for all clients involved in this transaction
        </p>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onRemoveClient={onRemoveClient}
            onClientChange={onClientChange}
            role={role}
            showRemoveButton={clients.length > 1}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onAddClient}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Client
        </Button>
      </div>
    </div>
  );
}