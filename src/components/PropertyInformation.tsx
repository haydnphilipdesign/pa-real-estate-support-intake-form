
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface PropertyInformationProps {
  data: {
    mlsNumber: string;
    address: string;
    salePrice: string;
    status: string;
    isWinterized: boolean;
    updateMls: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
  role: string | null;
}

export function PropertyInformation({
  data,
  onChange,
  role
}: PropertyInformationProps) {
  const canUpdateMls = role === "listing-agent" || role === "dual-agent";
  
  const handleMlsNumberChange = (value: string) => {
    // Remove any non-digit characters
    let cleaned = value.replace(/[^\d]/g, '');

    // Limit to 6 digits
    cleaned = cleaned.slice(0, 6);

    // Pad with leading zeros if needed
    cleaned = cleaned.padStart(6, '0');
    onChange("mlsNumber", cleaned);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Property Information</h2>
        <p className="text-white/70">
          Enter the details about the property
        </p>
      </div>

      <Card className="p-6 backdrop-blur-lg bg-transparent border-white/30">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mlsNumber" className="text-white">MLS Number <span className="text-red-500">*</span></Label>
              <Input 
                id="mlsNumber" 
                placeholder="Enter 6 digits" 
                value={data.mlsNumber} 
                onChange={e => handleMlsNumberChange(e.target.value)} 
                required 
              />
              <p className="text-xs text-white/60">
                Format example: 123456
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salePrice" className="text-white">Sale Price <span className="text-red-500">*</span></Label>
              <Input 
                id="salePrice" 
                placeholder="Enter sale price" 
                value={data.salePrice} 
                onChange={e => onChange("salePrice", e.target.value)} 
                type="number" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">Property Address <span className="text-red-500">*</span></Label>
            <Input 
              id="address" 
              placeholder="Enter full property address" 
              value={data.address} 
              onChange={e => onChange("address", e.target.value)} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Property Status <span className="text-red-500">*</span></Label>
            <RadioGroup value={data.status} onValueChange={value => onChange("status", value)} className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vacant" id="vacant" />
                <Label htmlFor="vacant" className="text-white">Vacant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="occupied" id="occupied" />
                <Label htmlFor="occupied" className="text-white">Occupied</Label>
              </div>
            </RadioGroup>
          </div>

          {data.status === "vacant" && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="winterized" 
                checked={data.isWinterized} 
                onCheckedChange={checked => onChange("isWinterized", checked)} 
              />
              <Label htmlFor="winterized" className="text-white">Property is winterized</Label>
            </div>
          )}

          {canUpdateMls && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="updateMls" 
                checked={data.updateMls} 
                onCheckedChange={checked => onChange("updateMls", checked)} 
              />
              <Label htmlFor="updateMls" className="text-white">Update MLS status</Label>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
