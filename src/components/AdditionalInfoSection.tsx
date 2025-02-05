import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface AdditionalInfoSectionProps {
  role: string | null;
}

export function AdditionalInfoSection({ role }: AdditionalInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
        <p className="text-gray-500 mb-6">Add any additional notes or special conditions</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialConditions">Special Conditions</Label>
            <Textarea
              id="specialConditions"
              placeholder="Enter any special conditions or contingencies"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Enter any additional notes about the transaction"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="followUp">Requires Follow-up</Label>
            <Switch id="followUp" />
          </div>
        </div>
      </Card>
    </div>
  );
}