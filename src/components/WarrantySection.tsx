import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

interface WarrantySectionProps {
  role: string | null;
}

export function WarrantySection({ role }: WarrantySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Warranty Information</h2>
        <p className="text-gray-500 mb-6">Enter warranty details for the property</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="homeWarranty">Home Warranty Included</Label>
            <Switch id="homeWarranty" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warrantyProvider">Warranty Provider</Label>
            <Input id="warrantyProvider" placeholder="Enter warranty provider name" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="warrantyTerm">Warranty Term (months)</Label>
              <Input id="warrantyTerm" type="number" placeholder="Enter warranty term" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warrantyCost">Warranty Cost</Label>
              <Input id="warrantyCost" type="number" placeholder="Enter warranty cost" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}