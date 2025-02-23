import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PropertyDetailsData } from "@/types/transaction";

interface PropertyDetailsSectionProps {
  role: string | null;
  data?: PropertyDetailsData;
  onChange?: (field: string, value: any) => void;
}

export function PropertyDetailsSection({ role, data, onChange }: PropertyDetailsSectionProps) {
  const isListingOrDualAgent = role === "listing-agent" || role === "dual-agent";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
        <p className="text-gray-500 mb-6">Enter additional property information</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {isListingOrDualAgent && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="resaleCertRequired">Resale Certificate Required</Label>
                <Switch
                  id="resaleCertRequired"
                  checked={data?.resaleCertRequired}
                  onCheckedChange={(checked) => onChange?.("resaleCertRequired", checked)}
                />
              </div>

              {data?.resaleCertRequired && (
                <div className="space-y-2">
                  <Label htmlFor="hoaName">HOA Name</Label>
                  <Input
                    id="hoaName"
                    value={data?.hoaName}
                    onChange={(e) => onChange?.("hoaName", e.target.value)}
                    placeholder="Enter HOA name"
                  />
                </div>
              )}
            </>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="coRequired">CO Required</Label>
            <Switch
              id="coRequired"
              checked={data?.coRequired}
              onCheckedChange={(checked) => onChange?.("coRequired", checked)}
            />
          </div>

          {data?.coRequired && (
            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality/Township</Label>
              <Input
                id="municipality"
                value={data?.municipality}
                onChange={(e) => onChange?.("municipality", e.target.value)}
                placeholder="Enter municipality/township"
              />
            </div>
          )}

          {isListingOrDualAgent && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="firstRightOfRefusal">First Right of Refusal</Label>
                <Switch
                  id="firstRightOfRefusal"
                  checked={data?.firstRightOfRefusal}
                  onCheckedChange={(checked) => onChange?.("firstRightOfRefusal", checked)}
                />
              </div>

              {data?.firstRightOfRefusal && (
                <div className="space-y-2">
                  <Label htmlFor="firstRightName">First Right of Refusal Name</Label>
                  <Input
                    id="firstRightName"
                    value={data?.firstRightName}
                    onChange={(e) => onChange?.("firstRightName", e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
              )}
            </>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="attorneyRepresentation">Attorney Representation</Label>
            <Switch
              id="attorneyRepresentation"
              checked={data?.attorneyRepresentation}
              onCheckedChange={(checked) => onChange?.("attorneyRepresentation", checked)}
            />
          </div>

          {data?.attorneyRepresentation && (
            <div className="space-y-2">
              <Label htmlFor="attorneyName">Attorney Name</Label>
              <Input
                id="attorneyName"
                value={data?.attorneyName}
                onChange={(e) => onChange?.("attorneyName", e.target.value)}
                placeholder="Enter attorney name"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}