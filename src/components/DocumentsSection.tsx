
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ListChecks } from "lucide-react";

// Document categories with their respective documents
const DOCUMENT_CATEGORIES = {
  "Core Transaction Documents": [
    "Agreement of Sale",
    "Attorney Review Clause (if applicable)",
    "Deposit Money Notice",
    "Cooperating Broker's Compensation",
    "KW Wire Fraud Notice",
  ],
  "Agency & Disclosure Documents": [
    "Buyer's Agency Contract",
    "Listing Agreement",
    "Dual Agency Disclosure",
    "Consumer Notice",
    "KW Affiliate Services Disclosure",
    "KW Affiliate Services Addendum",
    "Seller's Property Disclosure",
    "Lead Based Paint Disclosure (if applicable)",
  ],
  "Financial Documents": [
    "Buyer's Estimated Costs",
    "Seller's Estimated Costs",
    "KPSS ABA (if using Keystone Premier Settlement)",
    "For Your Protection Notice (if applicable)",
  ],
  "Warranty Documents": [
    "KW Home Warranty Waiver",
  ],
  "Additional Documents": [
    "Referral Agreement & W-9 (if applicable)",
  ],
} as const;

// Helper function to get role-specific documents
const getRoleDocuments = (role: string | null): string[] => {
  switch (role) {
    case "buyers-agent":
      return [
        "Agreement of Sale",
        "Attorney Review Clause (if applicable)",
        "KW Affiliate Services Disclosure",
        "KW Affiliate Services Addendum",
        "KW Wire Fraud Notice",
        "KW Home Warranty Waiver",
        "Consumer Notice",
        "Buyer's Agency Contract",
        "Seller's Property Disclosure",
        "Lead Based Paint Disclosure (if applicable)",
        "Deposit Money Notice",
        "Buyer's Estimated Costs",
        "Cooperating Broker's Compensation",
        "KPSS ABA (if using Keystone Premier Settlement)",
        "For Your Protection Notice (if applicable)",
        "Referral Agreement & W-9 (if applicable)",
      ];
    case "listing-agent":
      return [
        "Agreement of Sale",
        "Attorney Review Clause (if applicable)",
        "KW Affiliate Services Addendum",
        "Seller's Property Disclosure",
        "Lead Based Paint Disclosure (if applicable)",
        "Seller's Estimated Costs",
        "KW Wire Fraud Notice",
        "Referral Agreement & W-9 (if applicable)",
        "KW Home Warranty Waiver",
        "Cooperating Broker's Compensation",
      ];
    case "dual-agent":
      return [
        "Agreement of Sale",
        "Attorney Review Clause (if applicable)",
        "KW Affiliate Services Disclosure",
        "KW Affiliate Services Addendum",
        "Consumer Notice",
        "Buyer's Agency Contract",
        "Seller's Property Disclosure",
        "Lead Based Paint Disclosure (if applicable)",
        "Deposit Money Notice",
        "Buyer's Estimated Costs",
        "Seller's Estimated Costs",
        "KPSS ABA (if using Keystone Premier Settlement)",
        "For Your Protection Notice (if applicable)",
        "Referral Agreement & W-9 (if applicable)",
        "KW Wire Fraud Notice",
        "KW Home Warranty Waiver",
        "Cooperating Broker's Compensation",
        "Dual Agency Disclosure",
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
