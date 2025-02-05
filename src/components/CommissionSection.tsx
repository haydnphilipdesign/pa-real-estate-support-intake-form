import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CommissionSectionProps {
  role: string | null;
}

export function CommissionSection({ role }: CommissionSectionProps) {
  const [isReferral, setIsReferral] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Commission Details</h2>
        <p className="text-gray-500 mb-6">Enter the commission information for this transaction</p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalCommission">Total Commission (%)</Label>
          <Input
            id="totalCommission"
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Enter commission percentage"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerSplit">Broker Split (%)</Label>
          <Input
            id="brokerSplit"
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Enter broker split percentage"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isReferral"
            checked={isReferral}
            onCheckedChange={(checked) => setIsReferral(checked as boolean)}
          />
          <Label htmlFor="isReferral">This is a referral</Label>
        </div>

        {isReferral && (
          <div className="space-y-2">
            <Label htmlFor="referralFee">Referral Fee (%)</Label>
            <Input
              id="referralFee"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="Enter referral fee percentage"
            />
          </div>
        )}
      </div>
    </div>
  );
}