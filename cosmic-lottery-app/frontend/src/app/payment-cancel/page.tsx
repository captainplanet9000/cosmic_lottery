'use client';

export default function PaymentCancelPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                {/* A more explicit "X" in a circle might be:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> */}
            </svg>
            <h1 className="text-4xl font-bold text-red-400 mb-4">Payment Process Incomplete</h1>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
                It looks like you didn't complete the payment process or an issue occurred. Your cosmic insights are waiting!
            </p>
            <p className="text-slate-400 mb-10">
                No worries, you can always try again or explore other options.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                    href="/pricing"
                    className="btn-primary px-8 py-3 text-lg"
                >
                    Return to Pricing
                </a>
                <a
                    href="/"
                    className="btn-secondary px-8 py-3 text-lg"
                >
                    Explore Homepage
                </a>
            </div>
        </div>
    );
}
