
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  className = "",
}: FormNavigationProps) {
  return (
    <div className={`flex items-center justify-between mt-8 ${className}`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2 bg-white/30 hover:bg-white/40 text-brand-navy border-white/30 px-5 py-6 h-11 transition-all shadow-sm backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold2 text-brand-navy px-5 py-6 h-11 transition-all shadow-sm"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
