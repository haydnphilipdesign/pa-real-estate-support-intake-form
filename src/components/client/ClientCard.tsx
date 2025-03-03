
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { ClientFormFields } from "./ClientFormFields";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: string;
  type: string;
}

interface ClientCardProps {
  client: Client;
  onRemoveClient: (id: string) => void;
  onClientChange: (id: string, field: string, value: string) => void;
  role: string | null;
  showRemoveButton: boolean;
}

export function ClientCard({
  client,
  onRemoveClient,
  onClientChange,
  role,
  showRemoveButton,
}: ClientCardProps) {
  return (
    <Card className="p-6 glass-card rounded-xl animate-fade-in hover:shadow-card transition-all duration-300 group">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Client Details</h3>
        {showRemoveButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveClient(client.id)}
            className="hover:bg-brand-red/10 hover:text-brand-red text-white/80 transition-colors duration-200"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <ClientFormFields
          client={client}
          onClientChange={onClientChange}
          role={role}
        />
      </div>
    </Card>
  );
}
