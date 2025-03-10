
import { cn } from "@/lib/utils";

interface StepWizardProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, title: "Role\nSelection" },
  { id: 2, title: "Property\nInformation" },
  { id: 3, title: "Client\nInformation" },
  { id: 4, title: "Commission\nInformation" },
  { id: 5, title: "Property & Title\nInformation" },
  { id: 6, title: "Home Warranty\nInformation" },
  { id: 7, title: "Required\nDocumentation" },
  { id: 8, title: "Additional\nInformation" },
  { id: 9, title: "Sign &\nSubmit" },
];

export function StepWizard({ currentStep, totalSteps, onStepClick }: StepWizardProps) {
  // Calculate visible steps (previous, current, and next steps)
  const getVisibleSteps = () => {
    // Always show current step and neighbors
    const visibleSteps = steps.filter(step => {
      return Math.abs(step.id - currentStep) <= 1 || step.id === 1 || step.id === steps.length;
    });
    
    // Sort by ID to ensure correct order
    return visibleSteps.sort((a, b) => a.id - b.id);
  };

  const visibleSteps = getVisibleSteps();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4 px-2 pt-4 pb-2">      
      <div className="flex overflow-x-auto pb-2 hide-scrollbar justify-center">
        {visibleSteps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isFirst = index === 0;
          const isLast = index === visibleSteps.length - 1;
          
          // Add ellipsis indicators for gaps
          const showLeftEllipsis = !isFirst && visibleSteps[index - 1]?.id !== step.id - 1;
          const showRightEllipsis = !isLast && visibleSteps[index + 1]?.id !== step.id + 1;
          
          return (
            <>
              {showLeftEllipsis && (
                <div className="flex items-center px-2">
                  <span className="text-white/50">•••</span>
                </div>
              )}
              
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className={cn(
                  "flex flex-col items-center min-w-0 transition-colors whitespace-nowrap px-4 py-1 rounded-lg",
                  isActive && "text-white",
                  isCompleted && "text-white/80",
                  !isActive && !isCompleted && "text-white/60"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-sm mb-1 transition-all",
                  isActive ? "text-white" : "",
                  isCompleted && "text-white/80",
                  !isActive && !isCompleted && "text-white/70"
                )}>
                  {step.id}
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "border-b border-white pb-1"
                )}>
                  {step.title}
                </span>
              </button>
              
              {showRightEllipsis && (
                <div className="flex items-center px-2">
                  <span className="text-white/50">•••</span>
                </div>
              )}
            </>
          );
        })}
      </div>
      
      <div className="h-1 rounded-full overflow-hidden bg-white/10">
        <div 
          className="h-full border-b-2 border-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
