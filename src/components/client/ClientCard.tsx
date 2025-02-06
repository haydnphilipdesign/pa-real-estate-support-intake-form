
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
    <Card className="group p-6 transition-all duration-300 hover:shadow-lg animate-fade-in relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors duration-300">
            Client Details
          </h3>
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveClient(client.id)}
              className="hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-105"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="relative transition-all duration-300 group-hover:translate-y-0">
          <ClientFormFields
            client={client}
            onClientChange={onClientChange}
            role={role}
          />
        </div>
      </div>
    </Card>
  );
}
