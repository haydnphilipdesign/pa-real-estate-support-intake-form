
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WarrantyData } from "@/types/transaction";

interface WarrantySectionProps {
  role: string | null;
  data: WarrantyData;
  onChange: (field: string, value: any) => void;
}

export function WarrantySection({ role, data, onChange }: WarrantySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-white">Warranty Information</h2>
        <p className="text-white/80 mb-6">Enter warranty details for the property</p>
      </div>

      <Card className="p-6 backdrop-blur-lg bg-white/20 border-white/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hasWarranty" className="text-white">Home Warranty Purchased</Label>
            <Switch
              id="hasWarranty"
              checked={data.hasWarranty}
              onCheckedChange={(checked) => onChange("hasWarranty", checked)}
            />
          </div>

          {data.hasWarranty && (
            <>
              <div className="space-y-2">
                <Label htmlFor="provider" className="text-white">Warranty Provider <span className="text-red-500">*</span></Label>
                <Input
                  id="provider"
                  value={data.provider}
                  onChange={(e) => onChange("provider", e.target.value)}
                  placeholder="Enter warranty provider name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost" className="text-white">Warranty Cost <span className="text-red-500">*</span></Label>
                <Input
                  id="cost"
                  type="number"
                  value={data.cost}
                  onChange={(e) => onChange("cost", e.target.value)}
                  placeholder="Enter warranty cost"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Warranty Paid By <span className="text-red-500">*</span></Label>
                <RadioGroup
                  value={data.paidBy}
                  onValueChange={(value) => onChange("paidBy", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" className="border-white" />
                    <Label htmlFor="seller" className="text-white">Seller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" className="border-white" />
                    <Label htmlFor="buyer" className="text-white">Buyer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agent" id="agent" className="border-white" />
                    <Label htmlFor="agent" className="text-white">Agent</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
