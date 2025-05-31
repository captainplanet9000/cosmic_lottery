'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react'; // Added useEffect for userId
// import { useRouter } from 'next/navigation'; // Optional: for redirecting to login

// Make sure to replace with your actual test publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_PLACEHOLDER');

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [planIdBeingProcessed, setPlanIdBeingProcessed] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    // const router = useRouter(); // Optional: for redirecting

    useEffect(() => {
        // Attempt to get userId from localStorage (assuming it's stored on login)
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handlePurchase = async (planId: string, itemId?: string) => {
        if (!itemId || planId === 'monthly_explorer' || planId === 'annual_pro') {
            alert('This plan is not yet available for purchase or item ID is missing.');
            return;
        }

        if (!userId) {
            setError("Please log in to make a purchase. Your user ID is needed to assign credits.");
            // router.push('/login'); // Optional: redirect to login
            return;
        }

        setIsLoading(true);
        setPlanIdBeingProcessed(planId); // Set which plan is being processed
        setError(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: itemId, userId: userId }) // Pass itemId and userId
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
            setPlanIdBeingProcessed(null); // Reset after attempt
        }
    };

    const plans = [
        {
            id: 'single_report',
            name: 'Single Report',
            price: '$200',
            priceSuffix: '.00',
            description: 'A complete 5-section natal chart analysis.',
            features: [
                'Full 5-section analysis', 'Psychological Profile', 'Career Strengths',
                'Relationship Patterns', 'Karmic Lessons', 'Major Transits (1-2 yrs)'
            ],
            buttonText: 'Purchase Now',
            buttonClass: 'btn-primary',
            borderColor: 'border-purple-500/50',
            textColor: 'text-purple-300',
            gradientClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
            disabled: false,
            itemId: 'single_report_20000' // item ID for Stripe, price in cents
        },
        {
            id: 'bundle_3_reports', // New ID for this bundle
            name: '3 Report Bundle',
            price: '$480', // New Price
            priceSuffix: '.00',
            originalPrice: '$600.00', // Original price if 3 * $200
            description: 'Save $120! Three full reports.',
            features: ['Three full reports', 'Perfect for gifting or multiple analyses', 'Best value for dedicated explorers'],
            buttonText: 'Purchase Bundle',
            buttonClass: 'btn-primary',
            borderColor: 'border-teal-500/50',
            textColor: 'text-teal-300',
            gradientClass: 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
            disabled: false,
            itemId: 'bundle_3_reports_48000'
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
            itemId: 'monthly_sub_1499' // Example itemId
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
            itemId: 'annual_sub_11999' // Example itemId
        },
    ];

    return (
        <div className="py-8 sm:py-12 md:py-20"> {/* Adjusted padding for smaller screens */}
            <div className="container mx-auto px-4 sm:px-6"> {/* Adjusted padding for smaller screens */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 cosmic-text-glow">
                    Choose Your Cosmic Path
                </h1>

                {error && (
                    <div className="mb-8 p-3 sm:p-4 bg-red-700/30 border border-red-600 text-red-300 rounded-md text-center max-w-md mx-auto text-sm sm:text-base">
                        <p className="font-semibold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}
                 {!userId && !isLoading && (
                    <div className="mb-8 p-3 sm:p-4 bg-yellow-700/30 border border-yellow-600 text-yellow-300 rounded-md text-center max-w-md mx-auto text-sm sm:text-base">
                        <p className="font-semibold">User Not Identified</p>
                        <p>Please <Link href="/login" className="underline hover:text-yellow-200">log in</Link> to make purchases and link credits to your account.</p>
                    </div>
                )}


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"> {/* Ensure grid stacks on smallest screens */}
                    {plans.map((plan) => (
                        <div key={plan.id} className={`bg-slate-800/70 p-5 sm:p-6 rounded-xl shadow-2xl border ${plan.borderColor} transform hover:scale-105 transition-transform duration-300 flex flex-col`}>
                            <h2 className={`text-xl sm:text-2xl font-semibold mb-2 ${plan.textColor}`}>{plan.name}</h2>
                            <div className="mb-3">
                                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                                <span className="text-lg sm:text-xl align-top">{plan.priceSuffix}</span>
                                {plan.originalPrice && <span className="text-xs sm:text-sm line-through text-slate-400 ml-2">{plan.originalPrice}</span>}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 mb-4 min-h-[30px] sm:min-h-[40px]">{plan.description}</p>
                            <ul className="mb-5 sm:mb-6 text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-2 flex-grow">
                                {plan.features.map(feature => <li key={feature}>✓ {feature}</li>)}
                            </ul>
                            <button
                                onClick={() => handlePurchase(plan.id, plan.itemId)}
                                disabled={plan.disabled || isLoading}
                                className={`w-full font-bold py-2.5 sm:py-3 px-4 rounded-lg shadow-lg transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base ${plan.disabled ? plan.buttonClass : plan.gradientClass || plan.buttonClass}`}
                            >
                                {isLoading && plan.id === planIdBeingProcessed ? 'Processing...' : plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
                <p className="mt-16 text-center text-sm text-gray-500">
                    Payments are securely processed by Stripe. You will be redirected to Stripe Checkout.
                </p>
                 <p className="mt-4 text-center text-sm">
                    <Link href="/generate-report" className="text-purple-400 hover:text-purple-300">Back to Report Generation</Link>
                </p>
            </div>
        </div>
    );
}
