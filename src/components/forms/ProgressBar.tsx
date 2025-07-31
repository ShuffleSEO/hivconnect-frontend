interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export default function ProgressBar({ currentStep, totalSteps, progress }: ProgressBarProps) {
  // Create a dynamic class for the progress width
  const progressWidthClass = `w-[${progress}%]`;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out ${progressWidthClass}`}
        />
      </div>
      
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                isCompleted
                  ? 'bg-green-600 text-white'
                  : isCurrent
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}