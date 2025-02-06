
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
      <div className="space-y-2 animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">
          Client Information
        </h2>
        <p className="text-muted-foreground">
          Enter the details for all clients involved in this transaction
        </p>
      </div>

      <div className="space-y-4 transition-all duration-300">
        {clients.map((client, index) => (
          <div
            key={client.id}
            className="transform transition-all duration-500 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 150}ms`,
              opacity: 0,
              animation: `fade-in 0.5s ease-out ${index * 0.15}s forwards`,
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
          className="w-full bg-white hover:bg-brand-gold/10 transition-all duration-300 group relative overflow-hidden"
          onClick={onAddClient}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-90" />
            Add Another Client
          </span>
        </Button>
      </div>
    </div>
  );
}
