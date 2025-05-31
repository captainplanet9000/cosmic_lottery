'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To get token from URL
import Link from 'next/link'; // For linking back to homepage or branding

// Re-use or adapt ReportDisplay component structure if suitable
interface Slide {
    title: string;
    content: string;
}

interface SharedReportData {
    reportTitle: string;
    slides: Slide[];
    // Optionally include inputName or createdAt if desired for public view
    // inputName?: string;
    // createdAt?: string;
}

// Minimalist Header for Shared Page
function SharedPageHeader() {
    return (
        <header className="bg-slate-900 text-white p-3 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex justify-center items-center">
                <Link href="/" className="text-xl font-bold cosmic-text-glow hover:opacity-80 transition-opacity">
                    Cosmic Lottery Reports
                </Link>
            </nav>
        </header>
    );
}

// Minimalist Footer for Shared Page
function SharedPageFooter() {
     return (
        <footer className="bg-slate-900 text-center p-4 text-xs text-gray-600 border-t border-slate-800">
            Report provided by Cosmic Lottery App. For entertainment purposes only.
            <p className="mt-1">
                <Link href="/" className="hover:text-purple-400">Return to Homepage</Link>
            </p>
        </footer>
    );
}


export default function SharedReportPage() {
    const params = useParams();
    const token = params.token as string; // Extract token from URL

    const [report, setReport] = useState<SharedReportData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (token) {
            const fetchSharedReport = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
                    const res = await fetch(`${backendUrl}/api/public/reports/shared/${token}`);

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({ message: 'Report not found or sharing disabled.' }));
                        throw new Error(errorData.message || `Server responded with ${res.status}`);
                    }
                    const data: SharedReportData = await res.json();
                    setReport(data);
                } catch (err: any) {
                    console.error("Fetch shared report error:", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSharedReport();
        } else {
            setError("No share token provided.");
            setIsLoading(false);
        }
    }, [token]);

    const handleNextSlide = () => {
        if (report) {
            setCurrentSlide(prev => Math.min(prev + 1, report.slides.length - 1));
        }
    };

    const handlePrevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
    };

    if (isLoading) {
        return (
             <>
                <SharedPageHeader />
                <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-150px)]"> {/* Adjusted min height */}
                    <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-purple-500 mb-4 sm:mb-6"></div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-purple-300">Loading Shared Cosmic Report...</h1>
                </main>
                <SharedPageFooter />
            </>
        );
    }

    if (error) {
        return (
            <>
                <SharedPageHeader />
                <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-150px)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 sm:h-20 w-16 sm:w-20 text-red-500 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3 sm:mb-4">Could Not Load Report</h1>
                    <p className="text-md sm:text-lg text-slate-300 mb-6 sm:mb-8">{error}</p>
                     <Link href="/" className="btn-primary px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base">
                        Back to Homepage
                    </Link>
                </main>
                <SharedPageFooter />
            </>
        );
    }

    if (!report) {
        return (
             <>
                <SharedPageHeader />
                <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-150px)]">
                    <p className="text-lg sm:text-xl text-slate-400">Report data is unavailable.</p>
                </main>
                <SharedPageFooter />
            </>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-gray-200">
            <SharedPageHeader />
            <main className="flex-grow container mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-8">
                <div className="w-full max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl text-white border border-slate-700">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center cosmic-text-glow">{report.reportTitle}</h1>

                    <div className="bg-slate-700/50 p-4 sm:p-6 rounded-lg shadow-inner mb-5 sm:mb-6 min-h-[250px] sm:min-h-[300px] flex flex-col justify-center ring-1 ring-slate-600">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-teal-300 text-center">{report.slides[currentSlide]?.title || 'N/A'}</h2>
                        <div
                            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed prose prose-sm sm:prose-base prose-invert max-w-none prose-p:my-2 sm:prose-p:my-3 prose-headings:my-3 sm:prose-headings:my-4"
                            dangerouslySetInnerHTML={{ __html: report.slides[currentSlide]?.content?.replace(/\n/g, '<br />') || "No content available for this section." }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-3 sm:space-y-0">
                        <button
                            onClick={handlePrevSlide}
                            disabled={currentSlide === 0}
                            className="btn-secondary w-full sm:w-auto px-5 py-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Previous Section
                        </button>
                        <span className="text-xs sm:text-sm text-slate-400 order-first sm:order-none">Section {currentSlide + 1} of {report.slides.length}</span>
                        <button
                            onClick={handleNextSlide}
                            disabled={currentSlide === report.slides.length - 1}
                            className="btn-secondary w-full sm:w-auto px-5 py-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Next Section
                        </button>
                    </div>
                </div>
            </main>
            <SharedPageFooter />
        </div>
    );
}
