
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
        <h2 className="text-2xl font-semibold mb-4 text-white">Title Company Information</h2>
        <p className="text-white/80 mb-6">Enter title company details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-white">Title Company Name <span className="text-red-500">*</span></Label>
          <Input
            id="companyName"
            value={data.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="Enter title company name"
            required
          />
        </div>
      </div>
    </div>
  );
}
