import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";

interface SignatureSectionProps {
  role: string | null;
}

export function SignatureSection({ role }: SignatureSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Sign & Submit</h2>
        <p className="text-gray-500 mb-6">Review and sign the transaction details</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="confirm" />
              <Label htmlFor="confirm">
                I confirm that all information provided is accurate and complete
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">
                I agree to the terms and conditions
              </Label>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <Pen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 mb-4">Click below to add your electronic signature</p>
            <Button variant="outline" className="w-full">
              Add Signature
            </Button>
          </div>

          <Button className="w-full">
            Submit Transaction
          </Button>
        </div>
      </Card>
    </div>
  );
}