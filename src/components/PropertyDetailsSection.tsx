import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyDetailsData } from "@/types/transaction";

interface PropertyDetailsSectionProps {
  role: string | null;
  data?: PropertyDetailsData;
  onChange?: (field: string, value: string) => void;
}

export function PropertyDetailsSection({ role, data, onChange }: PropertyDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
        <p className="text-gray-500 mb-6">Enter additional property information</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input 
                id="yearBuilt" 
                type="number" 
                placeholder="Enter year built"
                value={data?.yearBuilt}
                onChange={(e) => onChange?.("yearBuilt", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="squareFootage">Square Footage</Label>
              <Input 
                id="squareFootage" 
                type="number" 
                placeholder="Enter square footage"
                value={data?.squareFootage}
                onChange={(e) => onChange?.("squareFootage", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Property Type</Label>
            <RadioGroup 
              defaultValue="single-family"
              value={data?.propertyType}
              onValueChange={(value) => onChange?.("propertyType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single-family" id="single-family" />
                <Label htmlFor="single-family">Single Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi-family" id="multi-family" />
                <Label htmlFor="multi-family">Multi Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="condo" id="condo" />
                <Label htmlFor="condo">Condo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyDescription">Property Description</Label>
            <Textarea
              id="propertyDescription"
              placeholder="Enter property description"
              className="min-h-[100px]"
              value={data?.description}
              onChange={(e) => onChange?.("description", e.target.value)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}