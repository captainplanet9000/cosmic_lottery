import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

interface PaymentFormProps {
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isProcessing, setIsProcessing }) => {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return
    }
    
    // Set processing state to show loading UI
    setIsProcessing(true)
    
    // In a real implementation, you would:
    // 1. Send the payment details to your server
    // 2. Create a payment intent on the server
    // 3. Confirm the payment with stripe.confirmCardPayment()
    
    // For demo purposes, we'll simulate a successful payment after a delay
    setTimeout(() => {
      // Redirect to loading page after "successful" payment
      router.push('/generating')
    }, 2000)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <div className="p-3 border border-cosmic-muted rounded-lg bg-cosmic-card/80 shadow-inner">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#F8FAFC',
                  '::placeholder': {
                    color: '#94A3B8',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="lottery-play-button w-full"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <span className="animate-cosmic-spin mr-2">🎰</span>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <span className="mr-2">💳</span>
            Pay $19.99 & Draw Numbers
          </span>
        )}
      </button>

      <div className="flex items-center justify-center space-x-4 text-xs text-cosmic-muted mt-4">
        <span>🔒 Secure Payment</span>
        <span>💳 SSL Encrypted</span>
        <span>✅ Money Back Guarantee</span>
      </div>
    </form>
  )
}

export default PaymentForm