'use client';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to replace with your actual test publishable key
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_PLACEHOLDER');

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Placeholder for future, more complex purchase logic
    const handlePurchase = async (planId: string) => {
        if (planId !== 'single_report') {
            alert('This plan is not yet available for purchase.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:3001/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ itemId: planId }) // Future: pass planId to backend
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to create checkout session. Please try again.');
            }

            const data = await res.json();
            const stripe = await stripePromise;

            if (stripe) {
                const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.id });
                if (stripeError) {
                    console.error('Stripe redirection error:', stripeError);
                    setError(stripeError.message || 'Failed to redirect to Stripe. Please try again.');
                }
            } else {
                setError('Stripe.js failed to load. Please check your internet connection and try again.');
            }
        } catch (err: any) {
            console.error('Purchase error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const plans = [
        {
            id: 'single_report',
            name: 'Single Report',
            price: '$19',
            priceSuffix: '.99',
            description: 'A complete 5-section natal chart analysis.',
            features: [
                'Full 5-section analysis', 'Psychological Profile', 'Career Strengths',
                'Relationship Patterns', 'Karmic Lessons', 'Major Transits (1-2 yrs)'
            ],
            buttonText: 'Purchase Now',
            buttonClass: 'btn-primary', // Use class from globals.css
            borderColor: 'border-purple-500/50',
            textColor: 'text-purple-300',
            gradientClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
            disabled: false,
        },
        {
            id: '3_pack_bundle',
            name: '3-Pack Bundle',
            price: '$49',
            priceSuffix: '.99',
            originalPrice: '$59.97',
            description: 'Save $10! Three full reports.',
            features: ['Three full reports', 'Share with friends or family', 'Best value for multiple readings'],
            buttonText: 'Coming Soon',
            buttonClass: 'bg-slate-600 text-slate-400 cursor-not-allowed',
            borderColor: 'border-slate-700/50',
            textColor: 'text-teal-300',
            disabled: true,
        },
        {
            id: 'monthly_explorer',
            name: 'Monthly Explorer',
            price: '$14',
            priceSuffix: '.99/mo',
            description: '2 reports per month.',
            features: ['Ongoing cosmic insights', 'Track your journey', 'Priority support'],
            buttonText: 'Coming Soon',
            buttonClass: 'bg-slate-600 text-slate-400 cursor-not-allowed',
            borderColor: 'border-slate-700/50',
            textColor: 'text-blue-300',
            disabled: true,
        },
        {
            id: 'annual_pro',
            name: 'Annual Pro',
            price: '$119',
            priceSuffix: '.99/yr',
            description: 'Unlimited reports + API access.',
            features: ['For enthusiasts & professionals', 'Early access to new features', 'API access for developers'],
            buttonText: 'Coming Soon',
            buttonClass: 'bg-slate-600 text-slate-400 cursor-not-allowed',
            borderColor: 'border-slate-700/50',
            textColor: 'text-yellow-300',
            disabled: true,
        },
    ];

    return (
        <div className="py-12 md:py-20"> {/* Adjusted padding, min-h-screen removed as layout handles it */}
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 cosmic-text-glow">
                    Choose Your Cosmic Path
                </h1>

                {error && (
                    <div className="mb-8 p-4 bg-red-700/30 border border-red-600 text-red-300 rounded-md text-center max-w-md mx-auto">
                        <p className="font-semibold">Payment Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`bg-slate-800/70 p-6 rounded-xl shadow-2xl border ${plan.borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col`}>
                            <h2 className={`text-2xl font-semibold mb-2 ${plan.textColor}`}>{plan.name}</h2>
                            <div className="mb-3">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-xl align-top">{plan.priceSuffix}</span>
                                {plan.originalPrice && <span className="text-sm line-through text-slate-400 ml-2">{plan.originalPrice}</span>}
                            </div>
                            <p className="text-sm text-gray-400 mb-4 min-h-[40px]">{plan.description}</p>
                            <ul className="mb-6 text-sm text-gray-400 space-y-2 flex-grow">
                                {plan.features.map(feature => <li key={feature}>✓ {feature}</li>)}
                            </ul>
                            <button
                                onClick={() => handlePurchase(plan.id)}
                                disabled={plan.disabled || isLoading}
                                className={`w-full font-bold py-3 px-4 rounded-lg shadow-lg transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed ${plan.disabled ? plan.buttonClass : plan.gradientClass || plan.buttonClass}`}
                            >
                                {isLoading && plan.id === 'single_report' ? 'Processing...' : plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
                <p className="mt-16 text-center text-sm text-gray-500">
                    Payments are securely processed by Stripe. You will be redirected to Stripe Checkout.
                </p>
                 <p className="mt-4 text-center text-sm">
                    <a href="/generate-report">Back to Report Generation</a>
                </p>
            </div>
        </div>
    );
}
