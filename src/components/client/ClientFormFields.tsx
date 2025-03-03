
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
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${client.id}`} className="text-white">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id={`name-${client.id}`}
            value={client.name}
            onChange={(e) => onClientChange(client.id, "name", e.target.value)}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`email-${client.id}`} className="text-white">Email <span className="text-red-500">*</span></Label>
          <Input
            id={`email-${client.id}`}
            type="email"
            value={client.email}
            onChange={(e) => onClientChange(client.id, "email", e.target.value)}
            required
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`phone-${client.id}`} className="text-white">Phone <span className="text-red-500">*</span></Label>
          <Input
            id={`phone-${client.id}`}
            value={client.phone}
            onChange={(e) => onClientChange(client.id, "phone", e.target.value)}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`address-${client.id}`} className="text-white">Address <span className="text-red-500">*</span></Label>
          <Input
            id={`address-${client.id}`}
            value={client.address}
            onChange={(e) => onClientChange(client.id, "address", e.target.value)}
            required
            placeholder="Enter address"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-white">Marital Status <span className="text-red-500">*</span></Label>
          <Select
            value={client.maritalStatus}
            onValueChange={(value) => onClientChange(client.id, "maritalStatus", value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
          <Label className="text-white">Client Type <span className="text-red-500">*</span></Label>
          <RadioGroup
            value={client.type}
            onValueChange={(value) => onClientChange(client.id, "type", value)}
          >
            <div className="flex space-x-4">
              {getAvailableTypes().map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={`${type.value}-${client.id}`} className="text-white border-white" />
                  <Label htmlFor={`${type.value}-${client.id}`} className="text-white">{type.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
