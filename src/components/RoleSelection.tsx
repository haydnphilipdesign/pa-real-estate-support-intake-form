import { Card } from "@/components/ui/card";
import { Home, Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleSelectionProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}

const roles = [
  {
    id: "listing-agent",
    title: "Listing Agent",
    description: "Representing the seller in this transaction",
    icon: Home,
  },
  {
    id: "buyers-agent",
    title: "Buyer's Agent",
    description: "Representing the buyer in this transaction",
    icon: Users,
  },
  {
    id: "dual-agent",
    title: "Dual Agent",
    description: "Representing both parties in this transaction",
    icon: UserCheck,
  },
];

export function RoleSelection({ selectedRole, onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Select Your Role</h2>
        <p className="text-muted-foreground">
          Choose your role in this real estate transaction
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-md",
                selectedRole === role.id && "ring-2 ring-primary",
              )}
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="p-6">
                <Icon className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}