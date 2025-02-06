
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface CommissionData {
  totalCommission: string;
  listingAgentCommission: string;
  buyersAgentCommission: string;
  isReferral: boolean;
  referralParty: string;
  brokerEin: string;
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
        {role === "listing-agent" && (
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
              placeholder="Enter total commission percentage"
              required
            />
          </div>
        )}

        {role === "listing-agent" && (
          <div className="space-y-2">
            <Label htmlFor="listingAgentCommission">Listing Agent Commission (%) <span className="text-red-500">*</span></Label>
            <Input
              id="listingAgentCommission"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={data.listingAgentCommission}
              onChange={(e) => onChange("listingAgentCommission", e.target.value)}
              placeholder="Enter listing agent commission percentage"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="buyersAgentCommission">Buyer's Agent Commission (%) <span className="text-red-500">*</span></Label>
          <Input
            id="buyersAgentCommission"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.buyersAgentCommission}
            onChange={(e) => onChange("buyersAgentCommission", e.target.value)}
            placeholder="Enter buyer's agent commission percentage"
            required
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isReferral"
              checked={data.isReferral}
              onCheckedChange={(checked) => onChange("isReferral", checked as boolean)}
            />
            <Label htmlFor="isReferral">This is a referral</Label>
          </div>

          {data.isReferral && (
            <div className="space-y-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="referralParty">Referral Party <span className="text-red-500">*</span></Label>
                <Input
                  id="referralParty"
                  type="text"
                  value={data.referralParty}
                  onChange={(e) => onChange("referralParty", e.target.value)}
                  placeholder="Enter referral party name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brokerEin">Broker EIN <span className="text-red-500">*</span></Label>
                <Input
                  id="brokerEin"
                  type="text"
                  value={data.brokerEin}
                  onChange={(e) => onChange("brokerEin", e.target.value)}
                  placeholder="Enter broker EIN"
                  required
                />
              </div>

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
