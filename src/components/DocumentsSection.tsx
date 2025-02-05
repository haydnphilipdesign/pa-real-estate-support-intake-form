import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DocumentsSectionProps {
  role: string | null;
}

export function DocumentsSection({ role }: DocumentsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Required Documents</h2>
        <p className="text-gray-500 mb-6">Upload all required transaction documents</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <Label>Purchase Agreement</Label>
          <div className="flex items-center gap-4">
            <Input type="file" className="flex-1" accept=".pdf,.doc,.docx" />
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Property Disclosure</Label>
          <div className="flex items-center gap-4">
            <Input type="file" className="flex-1" accept=".pdf,.doc,.docx" />
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Agency Agreements</Label>
          <div className="flex items-center gap-4">
            <Input type="file" className="flex-1" accept=".pdf,.doc,.docx" />
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {role === "listing-agent" && (
          <div className="space-y-4">
            <Label>Listing Agreement</Label>
            <div className="flex items-center gap-4">
              <Input type="file" className="flex-1" accept=".pdf,.doc,.docx" />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}