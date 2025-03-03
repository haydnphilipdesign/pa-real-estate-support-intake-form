
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepWizardProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, title: "Role Selection" },
  { id: 2, title: "Client Information" },
  { id: 3, title: "Property Info" },
  { id: 4, title: "Commission" },
  { id: 5, title: "Property Details" },
  { id: 6, title: "Warranty" },
  { id: 7, title: "Title Company" },
  { id: 8, title: "Documents" },
  { id: 9, title: "Additional Info" },
  { id: 10, title: "Signature" },
];

export function StepWizard({ currentStep, totalSteps, onStepClick }: StepWizardProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4 px-2 pt-4 pb-2">      
      <div className="flex overflow-x-auto pb-2 hide-scrollbar justify-center gap-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex flex-col items-center min-w-0 transition-colors whitespace-nowrap",
                "px-2 py-1 rounded-lg",
                isActive && "bg-white/20 backdrop-blur-sm",
                isActive && "text-white",
                isCompleted && "text-white/80",
                !isActive && !isCompleted && "text-white/60"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-sm mb-1 transition-all",
                isActive && "bg-white/30 text-white shadow-sm",
                isCompleted && "bg-white/25 text-white",
                !isActive && !isCompleted && "bg-white/15 text-white/70"
              )}>
                {step.id}
              </div>
              <span className="text-xs font-medium">{step.title}</span>
            </button>
          );
        })}
      </div>
      
      <div className="h-1 rounded-full overflow-hidden bg-white/10">
        <motion.div 
          className="h-full bg-white/50"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
