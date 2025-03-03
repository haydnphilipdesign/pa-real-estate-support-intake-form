
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StepWizardProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, title: "Role Selection" },
  { id: 2, title: "Property Info" },
  { id: 3, title: "Client Info" },
  { id: 4, title: "Commission" },
  { id: 5, title: "Property Details" },
  { id: 6, title: "Warranty" },
  { id: 7, title: "Title Company" },
  { id: 8, title: "Documents" },
  { id: 9, title: "Additional Info" },
  { id: 10, title: "Sign & Submit" },
];

export function StepWizard({ currentStep, totalSteps, onStepClick }: StepWizardProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4 px-4 py-6">
      <Progress value={progress} className="h-2" />
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "px-3 py-2 rounded-lg transition-colors text-left",
                "hover:bg-white/10",
                isActive && "bg-white/20 text-primary font-medium",
                isCompleted && "text-primary/80",
                !isActive && !isCompleted && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs",
                  isActive && "bg-primary text-primary-foreground",
                  isCompleted && "bg-primary/20 text-primary",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}>
                  {step.id}
                </span>
                <span className="truncate">{step.title}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
