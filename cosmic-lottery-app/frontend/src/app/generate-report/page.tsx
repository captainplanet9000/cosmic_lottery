'use client';
import { useState } from 'react';

interface Slide {
    title: string;
    content: string;
}

interface ReportData {
    reportTitle: string;
    slides: Slide[];
}

// ReportDisplay component
function ReportDisplay({ report }: { report: ReportData }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide(prev => Math.min(prev + 1, report.slides.length - 1));
    };

    const handlePrev = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-800/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl text-white border border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-center cosmic-text-glow">{report.reportTitle}</h2>
            <div className="bg-slate-700/50 p-6 rounded-lg shadow-inner mb-6 min-h-[250px] flex flex-col justify-center ring-1 ring-slate-600">
                <h3 className="text-xl font-semibold mb-3 text-teal-300">{report.slides[currentSlide].title}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed prose prose-sm prose-invert max-w-none">{report.slides[currentSlide].content}</p>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className="btn-secondary px-5 py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-sm text-slate-400">Slide {currentSlide + 1} of {report.slides.length}</span>
                <button
                    onClick={handleNext}
                    disabled={currentSlide === report.slides.length - 1}
                    className="btn-secondary px-5 py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default function GenerateReportPage() {
    const [formData, setFormData] = useState({ name: '', birthDate: '', birthTime: '', birthPlace: '' });
    const [report, setReport] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setReport(null); // Clear previous report
        try {
            const res = await fetch('http://localhost:3001/api/report/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to generate report. Please check your input.');
            }
            setReport(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Render different states
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                <p className="mt-4 text-xl text-purple-300">Generating your cosmic report...</p>
                <p className="text-sm text-gray-400">Please wait a moment.</p>
            </div>
        );
    }

    if (report) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <ReportDisplay report={report} />
                <button
                    onClick={() => { setReport(null); setError(null); setFormData({ name: '', birthDate: '', birthTime: '', birthPlace: '' });}}
                    className="mt-8 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition-colors duration-150"
                >
                    Generate Another Report
                </button>
            </div>
        );
    }

    // Default: show form
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-purple-400">Generate Your Natal Chart Report</h1>
                {error && (
                    <div className="mb-4 p-3 bg-red-700/30 border border-red-600 text-red-300 rounded-md text-sm">
                        <p className="font-semibold">Error Generating Report:</p>
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                               className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-1">Birth Date</label>
                        <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required
                               className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-300 mb-1">Time of Birth</label>
                        <input type="time" name="birthTime" id="birthTime" value={formData.birthTime} onChange={handleChange} required
                               className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-300 mb-1">Place of Birth (City, Country)</label>
                        <input type="text" name="birthPlace" id="birthPlace" value={formData.birthPlace} onChange={handleChange} required
                               className="form-input" />
                    </div>
                    <div>
                        <button type="submit"
                                className="w-full mt-2 btn-primary py-3 px-4 text-md font-medium transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500"
                                disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Cosmic Report'}
                        </button>
                    </div>
                </form>
                 <p className="mt-8 text-center text-sm text-gray-400">
                    Logged in? Purchased reports are saved to your account.
                    <br/>
                    <Link href="/login">Login</Link> or <Link href="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
