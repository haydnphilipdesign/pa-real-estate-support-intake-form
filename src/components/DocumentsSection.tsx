import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ListChecks } from "lucide-react";

// Document categories with their respective documents
const DOCUMENT_CATEGORIES = {
  "Core Transaction Documents": [
    "Agreement of Sale & Addenda",
    "Attorney Review Clause",
    "Deposit Money Notice",
    "Commission Agreement",
    "Wire Fraud Advisory",
  ],
  "Agency & Disclosure Documents": [
    "Buyer's Agency Contract",
    "Listing Agreement",
    "Dual Agency Disclosure",
    "Consumer Notice",
    "KW Affiliate Services Disclosure",
  ],
  "Financial Documents": [
    "Estimated Closing Costs",
    "Estimated Seller Proceeds",
    "Prequalification Letter",
    "Proof of Funds",
  ],
  "Property Documents": [
    "Seller's Property Disclosure",
    "Title Documents",
  ],
  "Additional Documents": [
    "KW Home Warranty Waiver",
  ],
} as const;

// Helper function to get role-specific documents
const getRoleDocuments = (role: string | null): string[] => {
  switch (role) {
    case "buyers-agent":
      return [
        "Agreement of Sale & Addenda",
        "Attorney Review Clause",
        "Deposit Money Notice",
        "Buyer's Agency Contract",
        "Estimated Closing Costs",
        "KW Affiliate Services Disclosure",
        "Consumer Notice",
        "Seller's Property Disclosure",
        "Prequalification Letter",
        "Proof of Funds",
        "Commission Agreement",
        "Wire Fraud Advisory",
        "KW Home Warranty Waiver"
      ];
    case "listing-agent":
      return [
        "Listing Agreement",
        "Seller's Property Disclosure",
        "Agreement of Sale & Addenda",
        "Estimated Seller Proceeds",
        "Title Documents",
        "KW Affiliate Services Disclosure",
        "Wire Fraud Advisory",
        "Commission Agreement"
      ];
    case "dual-agent":
      return [
        "Agreement of Sale & Addenda",
        "Dual Agency Disclosure",
        "Deposit Money Notice",
        "Attorney Review Clause",
        "Buyer's Agency Contract",
        "Estimated Closing Costs",
        "Prequalification Letter",
        "Proof of Funds",
        "Listing Agreement",
        "Seller's Property Disclosure",
        "Estimated Seller Proceeds",
        "Title Documents",
        "KW Affiliate Services Disclosure",
        "Consumer Notice",
        "Wire Fraud Advisory",
        "Commission Agreement",
        "KW Home Warranty Waiver"
      ];
    default:
      return [];
  }
};

interface DocumentsSectionProps {
  role: string | null;
}

export function DocumentsSection({ role }: DocumentsSectionProps) {
  const [checkedDocuments, setCheckedDocuments] = useState<Set<string>>(new Set());
  const roleDocuments = getRoleDocuments(role);

  const handleDocumentCheck = (document: string, checked: boolean) => {
    setCheckedDocuments(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(document);
      } else {
        newSet.delete(document);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ListChecks className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Required Documents</h2>
      </div>
      
      <p className="text-muted-foreground">
        Please confirm that you have uploaded the following documents to your transaction management system:
      </p>

      <div className="space-y-6">
        {Object.entries(DOCUMENT_CATEGORIES).map(([category, documents]) => {
          const categoryDocuments = documents.filter(doc => roleDocuments.includes(doc));
          
          if (categoryDocuments.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <h3 className="font-medium text-lg text-primary">{category}</h3>
              <div className="space-y-3">
                {categoryDocuments.map((document) => (
                  <div key={document} className="flex items-center space-x-2">
                    <Checkbox
                      id={document}
                      checked={checkedDocuments.has(document)}
                      onCheckedChange={(checked) => 
                        handleDocumentCheck(document, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={document}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {document}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Note: All documents must be uploaded to your transaction management system (Dotloop/DocuSign) 
          before marking them as complete here.
        </p>
      </div>
    </div>
  );
}