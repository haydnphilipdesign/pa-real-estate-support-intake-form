
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
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Client Information
        </h2>
        <p className="text-white/70">
          Enter the details for all clients involved in this transaction
        </p>
      </div>

      <div className="space-y-4 transition-all duration-300">
        {clients.map((client, index) => (
          <div
            key={client.id}
            className="transition-all duration-300 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <ClientCard
              client={client}
              onRemoveClient={onRemoveClient}
              onClientChange={onClientChange}
              role={role}
              showRemoveButton={clients.length > 1}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 border-white/20 group"
          onClick={onAddClient}
        >
          <Plus className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
          Add Another Client
        </Button>
      </div>
    </div>
  );
}
