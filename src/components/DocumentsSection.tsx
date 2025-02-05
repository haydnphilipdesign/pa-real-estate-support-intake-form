import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentsSectionProps {
  role: string | null;
}

interface DocumentFile {
  name: string;
  file: File;
}

export function DocumentsSection({ role }: DocumentsSectionProps) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<{ [key: string]: DocumentFile | null }>({
    purchaseAgreement: null,
    propertyDisclosure: null,
    agencyAgreements: null,
    listingAgreement: null,
  });

  const handleFileChange = (documentType: string, file: File | null) => {
    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setDocuments(prev => ({
      ...prev,
      [documentType]: file ? { name: file.name, file } : null
    }));

    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const removeFile = (documentType: string) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: null
    }));
    toast({
      title: "File removed",
      description: "The document has been removed",
    });
  };

  const renderDocumentInput = (
    label: string,
    documentType: string,
    required: boolean = true
  ) => (
    <div className="space-y-4">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex items-center gap-4">
        {documents[documentType] ? (
          <div className="flex-1 flex items-center justify-between bg-gray-50 px-4 py-2 rounded border">
            <span className="truncate">{documents[documentType]?.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFile(documentType)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1">
            <Input
              type="file"
              className="flex-1"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(documentType, e.target.files?.[0] || null)}
            />
          </div>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.doc,.docx';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              handleFileChange(documentType, file || null);
            };
            input.click();
          }}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Required Documents</h2>
        <p className="text-gray-500 mb-6">
          Upload all required transaction documents. Accepted formats: PDF, DOC, DOCX
        </p>
      </div>

      <div className="grid gap-6">
        {renderDocumentInput("Purchase Agreement", "purchaseAgreement")}
        {renderDocumentInput("Property Disclosure", "propertyDisclosure")}
        {renderDocumentInput("Agency Agreements", "agencyAgreements")}
        {role === "listing-agent" && renderDocumentInput("Listing Agreement", "listingAgreement")}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
}