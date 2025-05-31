import React from 'react'
import { motion } from 'framer-motion'

interface Step {
  id: string
  title: string
}

interface StepIndicatorProps {
  currentStep: number
  steps: Step[]
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative flex flex-col items-center ${index === steps.length - 1 ? '' : 'flex-1'}`}
          >
            <motion.div 
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                ${index <= currentStep 
                  ? 'bg-cosmic-secondary text-cosmic-background font-bold' 
                  : 'bg-cosmic-card border border-cosmic-muted text-cosmic-muted'}`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStep ? 1.2 : 1,
                transition: { duration: 0.3 }
              }}
            >
              {index + 1}
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className="absolute top-4 w-full h-0.5">
                <div className="h-full bg-cosmic-muted">
                  <motion.div 
                    className="h-full bg-cosmic-secondary"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index < currentStep ? "100%" : "0%",
                      transition: { duration: 0.5 }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-xs md:text-sm mt-1">
        {steps.map((step, index) => (
          <div 
            key={`title-${step.id}`}
            className={`text-center ${index === 0 ? 'text-left' : ''} ${index === steps.length - 1 ? 'text-right' : ''} ${index === currentStep ? 'text-cosmic-secondary font-medium' : 'text-cosmic-muted'}`}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator