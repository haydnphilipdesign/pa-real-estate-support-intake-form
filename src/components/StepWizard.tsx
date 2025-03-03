
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
    <div className="w-full space-y-6 px-8 pt-8 pb-4 glass-nav rounded-t-2xl">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Transaction Form</h1>
          <button className="bg-brand-gold hover:bg-brand-gold2 text-brand-navy py-2.5 px-5 rounded-lg text-sm flex items-center gap-2 font-medium transition-colors duration-200 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
            Fill with Test Data
          </button>
        </div>
        <p className="text-base text-white/70">Please fill out all required fields to complete your transaction.</p>
      </div>
      
      <div className="flex overflow-x-auto pb-2 hide-scrollbar gap-2">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex flex-col items-center min-w-[70px] md:min-w-0 transition-colors whitespace-nowrap",
                "px-3 py-2 rounded-xl",
                isActive && "text-brand-gold",
                isCompleted && "text-brand-gold/80",
                !isActive && !isCompleted && "text-white/60"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full text-sm mb-2 transition-all",
                isActive && "bg-brand-gold text-brand-navy shadow-glow",
                isCompleted && "bg-brand-gold/30 text-white",
                !isActive && !isCompleted && "bg-white/10 text-white/60"
              )}>
                {step.id}
              </div>
              <span className="text-xs font-medium">{step.title}</span>
            </button>
          );
        })}
      </div>
      
      <div className="h-2.5 rounded-full overflow-hidden bg-white/10">
        <motion.div 
          className="h-full bg-brand-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
