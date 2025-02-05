import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { SignatureData } from "@/types/transaction";

interface SignatureSectionProps {
  role: string | null;
  data: SignatureData;
  onChange: (field: string, value: any) => void;
}

export function SignatureSection({ role, data, onChange }: SignatureSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Sign & Submit</h2>
        <p className="text-gray-500 mb-6">Review and sign the transaction details</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name <span className="text-red-500">*</span></Label>
              <Input
                id="agentName"
                value={data.agentName}
                onChange={(e) => onChange("agentName", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateSubmitted">Date <span className="text-red-500">*</span></Label>
              <Input
                id="dateSubmitted"
                type="date"
                value={data.dateSubmitted}
                onChange={(e) => onChange("dateSubmitted", e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={data.termsAccepted}
                onCheckedChange={(checked) => onChange("termsAccepted", checked)}
              />
              <Label htmlFor="termsAccepted">
                I agree to the terms and conditions
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="infoConfirmed"
                checked={data.infoConfirmed}
                onCheckedChange={(checked) => onChange("infoConfirmed", checked)}
              />
              <Label htmlFor="infoConfirmed">
                I confirm that all information provided is accurate and complete
              </Label>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <Pen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 mb-4">Click below to add your electronic signature</p>
            <Input
              id="signature"
              value={data.signature}
              onChange={(e) => onChange("signature", e.target.value)}
              placeholder="Type your name to sign"
              required
            />
          </div>

          <Button className="w-full">
            Submit Transaction
          </Button>
        </div>
      </Card>
    </div>
  );
}