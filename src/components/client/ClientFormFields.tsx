
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: string;
  type: string;
}

interface ClientFormFieldsProps {
  client: Client;
  onClientChange: (id: string, field: string, value: string) => void;
  role: string | null;
}

export function ClientFormFields({ client, onClientChange, role }: ClientFormFieldsProps) {
  console.log("Rendering ClientFormFields with client:", client);

  const getAvailableTypes = () => {
    switch (role) {
      case "listing-agent":
        return [{ value: "seller", label: "Seller" }];
      case "buyers-agent":
        return [{ value: "buyer", label: "Buyer" }];
      case "dual-agent":
        return [
          { value: "buyer", label: "Buyer" },
          { value: "seller", label: "Seller" },
        ];
      default:
        return [{ value: "buyer", label: "Buyer" }];
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Updating ${field} to:`, value);
    onClientChange(client.id, field, value);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${client.id}`}>Full Name <span className="text-red-500">*</span></Label>
          <Input
            id={`name-${client.id}`}
            value={client?.name ?? ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`email-${client.id}`}>Email <span className="text-red-500">*</span></Label>
          <Input
            id={`email-${client.id}`}
            type="email"
            value={client?.email ?? ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email address"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`phone-${client.id}`}>Phone <span className="text-red-500">*</span></Label>
          <Input
            id={`phone-${client.id}`}
            value={client?.phone ?? ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`address-${client.id}`}>Address <span className="text-red-500">*</span></Label>
          <Input
            id={`address-${client.id}`}
            value={client?.address ?? ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter address"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Marital Status <span className="text-red-500">*</span></Label>
          <Select
            value={client?.maritalStatus ?? "single"}
            onValueChange={(value) => handleInputChange("maritalStatus", value)}
          >
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Client Type <span className="text-red-500">*</span></Label>
          <RadioGroup
            value={client?.type ?? "buyer"}
            onValueChange={(value) => handleInputChange("type", value)}
            className="flex space-x-4"
          >
            {getAvailableTypes().map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={type.value} 
                  id={`${type.value}-${client.id}`}
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-gold/50"
                />
                <Label 
                  htmlFor={`${type.value}-${client.id}`}
                  className="cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
