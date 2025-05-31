'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [isLoading, setIsLoading] = useState(true);
    const [isValidSession, setIsValidSession] = useState(false); // Optional: for actual validation

    useEffect(() => {
        // In a real app, you'd send the sessionId to your backend to verify
        // and then perhaps provision access or update user status.
        // For this MVP, we'll assume any session_id passed is valid after a brief "confirmation".
        if (sessionId) {
            console.log('Verifying payment success for session_id:', sessionId);
            // Simulate backend verification
            const timer = setTimeout(() => {
                setIsValidSession(true); // Assume valid for now
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            // No session ID, something is wrong or direct navigation.
            setIsLoading(false);
            setIsValidSession(false);
        }
    }, [sessionId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-6"></div>
                <h1 className="text-2xl font-semibold text-purple-300">Confirming Your Cosmic Transaction...</h1>
                <p className="text-slate-400">Please wait while we align the stars for you.</p>
            </div>
        );
    }

    if (!isValidSession && !sessionId) { // Added check for no session ID at all
         return (
            <div className="flex flex-col items-center justify-center text-center py-20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-yellow-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-3xl font-bold text-yellow-400 mb-4">Missing Information</h1>
                <p className="text-lg text-slate-300 mb-8">
                    It seems you've reached this page without a payment session.
                </p>
                <div className="space-x-4">
                    <a href="/pricing" className="btn-primary">View Pricing</a>
                    <a href="/" className="btn-secondary">Go Home</a>
                </div>
            </div>
        );
    }

    // If session was deemed valid (or we are in mock mode with a session ID)
    return (
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-400 mb-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold cosmic-text-glow mb-4">Payment Successful!</h1>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
                Your cosmic journey is about to begin! Your payment has been confirmed and the universe is aligning.
            </p>
            {sessionId && (
                <p className="text-xs text-slate-500 mb-6 bg-slate-800 px-2 py-1 rounded-md">
                    Session ID: <span className="font-mono">{sessionId}</span>
                </p>
            )}
            <p className="text-slate-400 mb-10">
                You can now proceed to generate your detailed natal chart report.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="/generate-report" className="btn-primary px-8 py-3 text-lg">
                    Generate My Report
                </a>
                <a href="/pricing" className="btn-secondary px-8 py-3 text-lg">
                    View Other Plans
                </a>
            </div>
        </div>
    );
}
