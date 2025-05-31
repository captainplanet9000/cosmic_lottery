'use client';
import { useState, useRef, useEffect } from 'react';
import { LoadScriptNext, Autocomplete } from '@react-google-maps/api';
import Link from 'next/link';

const libraries: ('places')[] = ['places'];

interface Slide {
    title: string;
    content: string;
}

interface ReportData {
    reportTitle: string;
    slides: Slide[];
}

function ReportDisplay({ report }: { report: ReportData }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, report.slides.length - 1));
    const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    if (!report || !report.slides || report.slides.length === 0) {
        return <p className="text-center text-red-400 px-4">Report data is incomplete or missing.</p>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl text-white border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center cosmic-text-glow">{report.reportTitle}</h2>
            <div className="bg-slate-700/50 p-4 sm:p-6 rounded-lg shadow-inner mb-4 sm:mb-6 min-h-[200px] sm:min-h-[250px] flex flex-col justify-center ring-1 ring-slate-600">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-teal-300">{report.slides[currentSlide]?.title || 'N/A'}</h3>
                <div
                    className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed prose prose-xs sm:prose-sm prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: report.slides[currentSlide]?.content?.replace(/\n/g, '<br />') || "No content available for this section." }}
                />
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className="btn-secondary px-4 py-2 text-xs sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-xs sm:text-sm text-slate-400">Section {currentSlide + 1} of {report.slides.length}</span>
                <button
                    onClick={handleNext}
                    disabled={currentSlide === report.slides.length - 1}
                    className="btn-secondary px-4 py-2 text-xs sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default function GenerateReportPage() {
    const [formData, setFormData] = useState({
        name: '', birthDate: '', birthTime: '', birthPlace: '', userId: ''
    });
    const [report, setReport] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setFormData(prev => ({ ...prev, userId: storedUserId }));
            const fetchCredits = async () => {
                try {
                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
                    const res = await fetch(`${backendUrl}/api/user/credits/${storedUserId}`);
                    if (!res.ok) {
                        const errData = await res.json();
                        throw new Error(errData.message || 'Failed to fetch credits.');
                    }
                    const data = await res.json();
                    setUserCredits(data.credits_available);
                } catch (err: any) {
                    console.error("Error fetching credits:", err);
                    setError(prevError => prevError ? `${prevError}\nCould not load credit balance.` : "Could not load credit balance.");
                    setUserCredits(0);
                }
            };
            fetchCredits();
        } else {
            setError("User not identified. Please log in to generate reports.");
            setUserCredits(0);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.formatted_address) {
                setFormData(prev => ({ ...prev, birthPlace: place.formatted_address }));
            } else if (place && place.name) {
                 setFormData(prev => ({ ...prev, birthPlace: place.name }));
            }
        }
    };

    const handleBirthPlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, birthPlace: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.userId) {
            setError("User ID is missing. Please log in again.");
            return;
        }
        if (!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) {
            console.warn("Google Places API key not configured. Proceeding with manual birth place input.");
        }

        setIsLoading(true);
        setError(null);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/report/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to generate report (HTTP ${res.status})`);
            }
            setReport(data);
            if (typeof data.creditsRemaining === 'number') {
                setUserCredits(data.creditsRemaining);
            }
        } catch (err: any) {
            setError(err.message);
            setReport(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateAnother = () => {
        setReport(null);
        setError(null);
        setFormData(prev => ({ name: '', birthDate: '', birthTime: '', birthPlace: '', userId: prev.userId }));
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-purple-500 mb-4 sm:mb-6"></div>
                <h1 className="text-xl sm:text-2xl font-semibold text-purple-300">Generating Your Cosmic Report...</h1>
                <p className="text-slate-400 text-sm sm:text-base">The stars are aligning, please wait.</p>
            </div>
        );
    }

    if (error && !report) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 sm:h-20 w-16 sm:w-20 text-red-500 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3 sm:mb-4">Report Generation Error</h1>
                <p className="text-md sm:text-lg text-slate-300 mb-6 sm:mb-8 max-w-md">{error}</p>
                <button onClick={handleGenerateAnother} className="btn-secondary px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base">
                    Try Again
                </button>
            </div>
        );
    }

    if (report) {
        return (
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 px-2 sm:px-4">
                 {error && <p className="text-center text-yellow-400 mb-4 bg-yellow-900/50 p-3 rounded-md max-w-xl mx-auto text-xs sm:text-sm border border-yellow-700">{error}</p>}
                <ReportDisplay report={report} />
                <div className="text-center mt-6 sm:mt-8">
                    <button
                        onClick={handleGenerateAnother}
                        className="btn-secondary px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
                    >
                        Generate Another Report
                    </button>
                </div>
            </div>
        );
    }

    return (
        <LoadScriptNext
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""}
            libraries={libraries}
            loadingElement={
                <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                    <div className="animate-pulse rounded-full h-10 sm:h-12 w-10 sm:w-12 border-t-2 border-b-2 border-slate-500 mb-3 sm:mb-4"></div>
                    <p className="text-slate-400 text-sm sm:text-base">Loading cartography services...</p>
                </div>
            }
            onError={(e) => {
                console.error("Google Maps LoadScriptNext error:", e);
                setError("Could not load mapping service for address autocomplete. You can still enter the birth place manually.");
            }}
        >
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 px-2">
                <div className="bg-slate-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-center cosmic-text-glow">Generate Natal Chart Report</h1>
                    <p className="text-center text-slate-400 mb-6 sm:mb-8 text-xs sm:text-sm">Enter the birth details for the person you want the report generated for.</p>

                    {!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && !error?.includes("mapping service") && (
                        <p className="text-center text-yellow-500 text-xs mb-4 p-2 bg-yellow-800/30 rounded-md border border-yellow-700">
                            Note: Google Places API key is not configured. Birth place input is manual. Autocomplete disabled.
                        </p>
                    )}
                     {error && error.includes("mapping service") && (
                        <p className="text-center text-orange-400 text-xs mb-4 p-2 bg-orange-900/50 rounded-md border border-orange-700">
                            {error}
                        </p>
                    )}
                     {error && !error.includes("mapping service") && !report && (
                         <div className="mb-4 p-3 bg-red-700/30 border border-red-600 text-red-300 rounded-md text-xs sm:text-sm">
                            <p className="font-semibold">Error:</p>
                            <p>{error}</p>
                        </div>
                     )}

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-purple-300 mb-1">Name of Subject</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                                   className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="birthDate" className="block text-xs sm:text-sm font-medium text-purple-300 mb-1">Birth Date</label>
                            <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required
                                   className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="birthTime" className="block text-xs sm:text-sm font-medium text-purple-300 mb-1">Time of Birth</label>
                            <input type="time" name="birthTime" id="birthTime" value={formData.birthTime} onChange={handleChange} required
                                   className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="birthPlaceInput" className="block text-xs sm:text-sm font-medium text-purple-300 mb-1">Place of Birth</label>
                            <Autocomplete
                                onLoad={(ref) => autocompleteRef.current = ref}
                                onPlaceChanged={handlePlaceChanged}
                                options={{ types: ['(cities)'] }}
                                fields={['formatted_address', 'name']}
                            >
                                <input
                                    type="text"
                                    id="birthPlaceInput"
                                    placeholder="E.g., London, United Kingdom"
                                    value={formData.birthPlace}
                                    onChange={handleBirthPlaceChange}
                                    required
                                    className="form-input"
                                    name="birthPlace"
                                />
                            </Autocomplete>
                        </div>
                        <div>
                            <button type="submit"
                                    className="w-full mt-2 btn-primary py-2.5 sm:py-3 px-4 text-sm sm:text-md font-medium" // Adjusted padding & text size
                                    disabled={isLoading || !formData.userId || userCredits === 0}>
                                {isLoading ? 'Generating...' :
                                 userCredits === null ? 'Loading Credits...' :
                                 userCredits === 0 ? 'No Credits Available' :
                                 `Generate Report (${userCredits} Credit${userCredits === 1 ? '' : 's'} Left)`}
                            </button>
                            {!formData.userId && <p className="text-xs text-red-400 text-center mt-2">Please log in to generate reports.</p>}
                            {formData.userId && userCredits === 0 && (
                                <p className="text-xs text-yellow-400 text-center mt-2">
                                    You have no report credits. <Link href="/pricing" className="underline hover:text-yellow-300">Purchase credits here.</Link>
                                </p>
                            )}
                        </div>
                    </form>
                     <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-400">
                        Reports use credits. Purchased reports are saved to <Link href="/my-reports" className="underline hover:text-purple-300">My Reports</Link>.
                        <br/>
                        Current Credits: {userCredits === null ? 'Loading...' : userCredits}
                        <span className="mx-1 sm:mx-2">|</span>
                        <Link href="/pricing" className="underline hover:text-teal-300">Get More Credits</Link>
                    </p>
                </div>
            </div>
        </LoadScriptNext>
    );
}
