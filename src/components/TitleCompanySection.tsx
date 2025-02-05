import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface TitleCompanySectionProps {
  role: string | null;
}

export function TitleCompanySection({ role }: TitleCompanySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Title Company Information</h2>
        <p className="text-gray-500 mb-6">Enter title company and escrow details</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titleCompany">Title Company Name</Label>
            <Input id="titleCompany" placeholder="Enter title company name" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="escrowOfficer">Escrow Officer</Label>
              <Input id="escrowOfficer" placeholder="Enter escrow officer name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="escrowNumber">Escrow Number</Label>
              <Input id="escrowNumber" placeholder="Enter escrow number" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titlePhone">Phone Number</Label>
              <Input id="titlePhone" type="tel" placeholder="Enter phone number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titleEmail">Email</Label>
              <Input id="titleEmail" type="email" placeholder="Enter email address" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}