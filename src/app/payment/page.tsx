'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PaymentForm from '@/components/forms/PaymentForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Animation variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
}

// Mock Stripe public key - would be replaced with actual key in production
const stripePromise = loadStripe('pk_test_mock_key')

export default function PaymentPage() {
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-cosmic-secondary">One Step From Your Cosmic Fortune</h1>
          <p className="text-lg text-cosmic-foreground/90">Complete your payment to unlock your personalized astrological report</p>
        </div>
        
        <div className="cosmic-card">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/2 cosmic-card bg-cosmic-card/50">
              <h3 className="text-xl font-heading mb-2 text-cosmic-secondary">Your Cosmic Lottery Report</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 text-cosmic-secondary">✨</span>
                  <span>Complete Personality Profile Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cosmic-secondary">✨</span>
                  <span>Career & Vocational Strengths</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cosmic-secondary">✨</span>
                  <span>Relationship Style & Love Patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cosmic-secondary">✨</span>
                  <span>Karmic Lessons & Past Life Indicators</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cosmic-secondary">✨</span>
                  <span>Current Major Transits (1-2 years)</span>
                </li>
              </ul>              <div className="mt-4 p-3 rounded-lg bg-golden-ticket text-cosmic-background font-medium">
                <span className="text-lg">Special Price: $19.99</span>
                <span className="text-sm ml-2 line-through opacity-70">$29.99</span>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-xl font-heading mb-4 text-cosmic-secondary">Complete Your Purchase</h3>
              
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  isProcessing={paymentProcessing} 
                  setIsProcessing={setPaymentProcessing}
                />
              </Elements>
            </div>
          </div>
          
          <div className="text-center text-sm text-cosmic-muted-foreground">
            <p>By proceeding with payment, you agree to our <Link href="/terms" className="text-cosmic-secondary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-cosmic-secondary hover:underline">Privacy Policy</Link>.</p>
            <p className="mt-2">Your satisfaction is guaranteed. If you're not happy with your report, contact us within 7 days for a full refund.</p>
          </div>
        </div>
      </div>
    </motion.main>
  )
}