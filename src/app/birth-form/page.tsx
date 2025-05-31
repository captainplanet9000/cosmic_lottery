'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import BirthDataForm from '@/components/forms/BirthDataForm'
import StepIndicator from '@/components/common/StepIndicator'
import { FormProvider, useForm } from 'react-hook-form'

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

// Form steps
const steps = [
  { id: 'name', title: 'Your Name' },
  { id: 'datetime', title: 'Birth Date & Time' },
  { id: 'location', title: 'Birth Location' },
  { id: 'review', title: 'Review & Confirm' }
]

export default function BirthFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm()
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <motion.main 
      className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-cosmic-gradient bg-fixed"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-cosmic-secondary">Your Cosmic Lottery Ticket</h1>
          <p className="text-lg text-cosmic-foreground/90">Enter your birth details to generate your cosmic fortune</p>
        </div>
        
        <div className="cosmic-card">
          <FormProvider {...methods}>
            <form>
              <StepIndicator currentStep={currentStep} steps={steps} />
              
              <div className="my-8">
                <BirthDataForm currentStep={currentStep} />
              </div>
              
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="cosmic-button bg-cosmic-card hover:bg-cosmic-card/80 border border-cosmic-primary"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="cosmic-button ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => methods.handleSubmit(() => window.location.href = '/payment')()}
                    className="lottery-play-button ml-auto"
                  >
                    Generate Your Cosmic Lottery
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </motion.main>
  )
}