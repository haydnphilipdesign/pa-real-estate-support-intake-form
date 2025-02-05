import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TitleCompanyData } from "@/types/transaction";

interface TitleCompanySectionProps {
  role: string | null;
  data: TitleCompanyData;
  onChange: (field: string, value: any) => void;
}

export function TitleCompanySection({ role, data, onChange }: TitleCompanySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Title Company Information</h2>
        <p className="text-gray-500 mb-6">Enter title company details</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Title Company Name <span className="text-red-500">*</span></Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              placeholder="Enter title company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Transaction Coordinator Fee Paid By <span className="text-red-500">*</span></Label>
            <RadioGroup
              value={data.coordinatorFeePaidBy}
              onValueChange={(value) => onChange("coordinatorFeePaidBy", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client">Client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent" id="agent" />
                <Label htmlFor="agent">Agent</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>
    </div>
  );
}