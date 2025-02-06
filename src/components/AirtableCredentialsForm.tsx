import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AirtableCredentials {
  apiKey: string;
  baseId: string;
}

interface AirtableCredentialsFormProps {
  onCredentialsSubmit: (credentials: AirtableCredentials) => void;
}

export function AirtableCredentialsForm({ onCredentialsSubmit }: AirtableCredentialsFormProps) {
  const [credentials, setCredentials] = useState<AirtableCredentials>({
    apiKey: "",
    baseId: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.apiKey || !credentials.baseId) {
      toast({
        title: "Error",
        description: "Please provide both API Key and Base ID",
        variant: "destructive",
      });
      return;
    }
    onCredentialsSubmit(credentials);
    toast({
      title: "Success",
      description: "Airtable credentials saved for this session",
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">Airtable API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={credentials.apiKey}
            onChange={(e) => setCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
            placeholder="Enter your Airtable API Key"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="baseId">Airtable Base ID</Label>
          <Input
            id="baseId"
            value={credentials.baseId}
            onChange={(e) => setCredentials(prev => ({ ...prev, baseId: e.target.value }))}
            placeholder="Enter your Airtable Base ID"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Save Credentials
        </Button>
      </form>
    </Card>
  );
}