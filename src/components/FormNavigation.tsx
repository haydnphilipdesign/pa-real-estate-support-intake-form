
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
    <div className={`flex items-center justify-between mt-6 ${className}`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center bg-white/50 hover:bg-white/60"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="flex items-center bg-amber-500 hover:bg-amber-600 text-white"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
