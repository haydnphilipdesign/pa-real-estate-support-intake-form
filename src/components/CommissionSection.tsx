import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CommissionData {
  totalCommission: string;
  brokerSplit: string;
  isReferral: boolean;
  referralFee: string;
}

interface CommissionSectionProps {
  role: string | null;
  data: CommissionData;
  onChange: (field: string, value: string | boolean) => void;
}

export function CommissionSection({ role, data, onChange }: CommissionSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Commission Details</h2>
        <p className="text-gray-500 mb-6">Enter the commission information for this transaction</p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalCommission">Total Commission (%) <span className="text-red-500">*</span></Label>
          <Input
            id="totalCommission"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.totalCommission}
            onChange={(e) => onChange("totalCommission", e.target.value)}
            placeholder="Enter commission percentage"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerSplit">Broker Split (%) <span className="text-red-500">*</span></Label>
          <Input
            id="brokerSplit"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.brokerSplit}
            onChange={(e) => onChange("brokerSplit", e.target.value)}
            placeholder="Enter broker split percentage"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isReferral"
            checked={data.isReferral}
            onCheckedChange={(checked) => onChange("isReferral", checked as boolean)}
          />
          <Label htmlFor="isReferral">This is a referral</Label>
        </div>

        {data.isReferral && (
          <div className="space-y-2">
            <Label htmlFor="referralFee">Referral Fee (%) <span className="text-red-500">*</span></Label>
            <Input
              id="referralFee"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={data.referralFee}
              onChange={(e) => onChange("referralFee", e.target.value)}
              placeholder="Enter referral fee percentage"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}