
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface StepWizardProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, title: "Role Selection" },
  { id: 2, title: "Property Information" },
  { id: 3, title: "Client Information" },
  { id: 4, title: "Commission" },
  { id: 5, title: "Property & Title" },
  { id: 6, title: "Warranty" },
  { id: 7, title: "Documents" },
  { id: 8, title: "Additional Info" },
  { id: 9, title: "Signature" },
];

export function StepWizard({ currentStep, totalSteps, onStepClick }: StepWizardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const progress = (currentStep / totalSteps) * 100;

  // Scroll to the active step when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeStep = container.querySelector(`[data-step="${currentStep}"]`);
      
      if (activeStep) {
        const containerWidth = container.clientWidth;
        const stepWidth = activeStep.clientWidth;
        const scrollLeft = activeStep.getBoundingClientRect().left + container.scrollLeft - container.getBoundingClientRect().left;
        
        // Center the active step
        container.scrollTo({
          left: scrollLeft - containerWidth / 2 + stepWidth / 2,
          behavior: 'smooth'
        });
      }

      // Check if we need to show scroll indicators
      checkScrollButtons();
    }
  }, [currentStep]);
  
  // Check if scroll buttons should be visible
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }
  };

  // Handle scrolling left and right
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.6; // Scroll by 60% of container width
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      // Set a timeout to check button visibility after scrolling
      setTimeout(checkScrollButtons, 350);
    }
  };

  return (
    <div className="w-full space-y-4 px-2 pt-4 pb-2 relative">
      {/* Scroll buttons */}
      {showLeftArrow && (
        <button 
          className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 shadow-sm text-white transition-all"
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      {showRightArrow && (
        <button 
          className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 shadow-sm text-white transition-all"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      
      {/* Steps carousel */}
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto pb-2 hide-scrollbar px-5 space-x-2"
        onScroll={checkScrollButtons}
      >
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              data-step={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex flex-col items-center min-w-[100px] transition-colors whitespace-nowrap px-3 py-1 rounded-lg",
                isActive && "text-white",
                isCompleted && "text-white/80",
                !isActive && !isCompleted && "text-white/60"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-sm mb-1 transition-all",
                isActive ? "bg-white/20 shadow-sm" : "",
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
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden bg-white/10">
        <div 
          className="h-full border-b-2 border-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
