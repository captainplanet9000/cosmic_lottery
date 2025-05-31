'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ReportSummary {
    id: number;
    report_title: string;
    input_name: string;
    created_at: string;
    is_shared: boolean;
    share_token: string | null;
    slide1_title?: string;
}

export default function MyReportsPage() {
    const [reports, setReports] = useState<ReportSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [expandedReportId, setExpandedReportId] = useState<number | null>(null);
    const [shareActionLoading, setShareActionLoading] = useState<number | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [currentReportForEmail, setCurrentReportForEmail] = useState<ReportSummary | null>(null);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [emailSending, setEmailSending] = useState(false);
    const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const fetchReports = async (currentUserId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/reports/my-reports/${currentUserId}`);

            if (!res.ok) {
                if (res.status === 404) setReports([]);
                else {
                    const errorData = await res.json().catch(() => ({ message: 'Failed to fetch reports and parse error.' }));
                    throw new Error(errorData.message || `Server responded with ${res.status}`);
                }
            } else {
                const data: ReportSummary[] = await res.json();
                setReports(data);
            }
        } catch (err: any) {
            console.error("Fetch reports error:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUserEmail = localStorage.getItem('userEmail');
        if (storedUserId) {
            setUserId(storedUserId);
            if (storedUserEmail) setUserEmail(storedUserEmail);
            fetchReports(storedUserId);
        } else {
            setIsLoading(false);
        }
    }, []);


    const toggleReportExpansion = (reportId: number) => {
        setExpandedReportId(expandedReportId === reportId ? null : reportId);
    };

    const handleShareReport = async (reportId: number) => {
        if (!userId) return;
        setShareActionLoading(reportId);
        setError(null); // Clear previous general errors
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/reports/${reportId}/share`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to share report.');
            }
            await fetchReports(userId);
        } catch (err: any) {
            setError(`Failed to share report ${reportId}: ${err.message}`);
        } finally {
            setShareActionLoading(null);
        }
    };

    const handleStopSharingReport = async (reportId: number) => {
        if (!userId) return;
        setShareActionLoading(reportId);
        setError(null); // Clear previous general errors
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/reports/${reportId}/stop-sharing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to stop sharing report.');
            }
            await fetchReports(userId);
        } catch (err: any) {
            setError(`Failed to stop sharing report ${reportId}: ${err.message}`);
        } finally {
            setShareActionLoading(null);
        }
    };

    const handleCopyLink = (shareToken: string) => {
        const shareLink = `${window.location.origin}/share/report/${shareToken}`;
        navigator.clipboard.writeText(shareLink)
            .then(() => alert('Share link copied to clipboard!'))
            .catch(err => {
                console.error('Failed to copy share link:', err);
                alert('Failed to copy link. Please try manually.');
            });
    };

    const handleOpenEmailModal = (report: ReportSummary) => {
        setCurrentReportForEmail(report);
        setRecipientEmail(userEmail || '');
        setShowEmailModal(true);
        setEmailStatus(null);
    };

    // Loading state for initial fetch
    if (isLoading && reports.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-purple-500 mb-4 sm:mb-6"></div>
                <h1 className="text-xl sm:text-2xl font-semibold text-purple-300">Loading Your Cosmic Archives...</h1>
            </div>
        );
    }

    // Not logged in state
    if (!userId && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 sm:h-20 w-16 sm:w-20 text-yellow-400 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-3 sm:mb-4">Access Denied</h1>
                <p className="text-md sm:text-lg text-slate-300 mb-6 sm:mb-8">Please log in to view your generated reports.</p>
                <Link href="/login" className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-lg">
                    Go to Login
                </Link>
            </div>
        );
    }

    // Error state when no reports are loaded (e.g., initial fetch failed)
    if (error && reports.length === 0 && !isLoading ) {
         return (
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 sm:h-20 w-16 sm:w-20 text-red-500 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3 sm:mb-4">Error Loading Reports</h1>
                <p className="text-md sm:text-lg text-slate-300 mb-6 sm:mb-8">{error.replace(/Failed to share report \d+: /g, '').replace(/Failed to stop sharing report \d+: /g, '')}</p>
                <button onClick={() => userId && fetchReports(userId)} className="btn-secondary px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base">
                    Try Again
                </button>
            </div>
        );
    }

    // Email Modal Component
    const EmailReportModal = () => {
        if (!showEmailModal || !currentReportForEmail) return null;

        const handleSubmitEmail = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!userId || !currentReportForEmail) return;
            setEmailSending(true);
            setEmailStatus(null);
            setError(null); // Clear general errors
            try {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
                const res = await fetch(`${backendUrl}/api/reports/${currentReportForEmail.id}/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, recipientEmail }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to send email.');
                setEmailStatus({ type: 'success', message: data.message || 'Email sent successfully!' });
                setTimeout(() => {
                    setShowEmailModal(false);
                    setEmailStatus(null);
                }, 3000);
            } catch (err: any) {
                setEmailStatus({ type: 'error', message: err.message });
            } finally {
                setEmailSending(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
                <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-300">Email Report: <span className="font-normal italic">{currentReportForEmail.report_title}</span></h2>
                    {emailStatus && (
                        <p className={`mb-3 text-xs sm:text-sm p-2 rounded-md ${emailStatus.type === 'success' ? 'bg-green-700/30 text-green-300 border border-green-600' : 'bg-red-700/30 text-red-300 border border-red-600'}`}>
                            {emailStatus.message}
                        </p>
                    )}
                    <form onSubmit={handleSubmitEmail}>
                        <div className="mb-4">
                            <label htmlFor="recipientEmail" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Recipient's Email</label>
                            <input
                                type="email"
                                id="recipientEmail"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                required
                                className="form-input w-full text-sm sm:text-base"
                                placeholder="Enter email address"
                            />
                        </div>
                        <div className="flex justify-end space-x-2 sm:space-x-3">
                            <button type="button" onClick={() => { setShowEmailModal(false); setEmailStatus(null); }} className="btn-secondary bg-slate-600 hover:bg-slate-500 py-2 px-3 sm:px-4 text-xs sm:text-sm" disabled={emailSending}>Cancel</button>
                            <button type="submit" className="btn-primary py-2 px-3 sm:px-4 text-xs sm:text-sm" disabled={emailSending}>
                                {emailSending ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="py-6 sm:py-8 md:py-12 px-2 sm:px-4">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center cosmic-text-glow">My Cosmic Reports</h1>

                {error && reports.length > 0 && (
                     <p className="text-center text-red-400 mb-4 bg-red-700/30 p-3 rounded-md max-w-3xl mx-auto text-sm">{error.replace(/Failed to share report \d+: /g, '').replace(/Failed to stop sharing report \d+: /g, '')}</p>
                )}

                {reports.length === 0 && !isLoading && !error && userId ? (
                     <div className="text-center py-10 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 sm:h-24 w-20 sm:w-24 text-slate-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <p className="text-lg sm:text-xl text-slate-400 mb-4">No reports found in your archive.</p>
                        <p className="text-slate-500 mb-8 text-sm sm:text-base">Looks like you haven't generated any cosmic reports yet.</p>
                        <Link href="/generate-report" className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-lg">
                            Generate Your First Report
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                        {reports.map((report) => (
                           <div key={report.id} className="bg-slate-800/70 p-4 sm:p-5 rounded-xl shadow-xl border border-slate-700 hover:border-purple-500/70 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex-grow mr-2">
                                    <h2 className="text-lg sm:text-xl font-semibold text-purple-300">{report.report_title}</h2>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1">For: <span className="font-medium text-slate-300">{report.input_name}</span></p>
                                    <p className="text-xs sm:text-sm text-slate-400">Generated: {new Date(report.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <button
                                    onClick={() => toggleReportExpansion(report.id)}
                                    className="text-sm text-purple-400 hover:text-purple-300 p-1 flex-shrink-0"
                                    aria-label={expandedReportId === report.id ? "Collapse report details" : "Expand report details"}
                                >
                                    {expandedReportId === report.id ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    }
                                </button>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:flex-wrap sm:gap-2 items-start sm:items-center">
                                {report.is_shared && report.share_token ? (
                                    <div className="space-y-2 w-full sm:flex-grow sm:min-w-[200px] mb-2 sm:mb-0">
                                        <p className="text-xs text-green-400">Shared via link:</p>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`${window.location.origin}/share/report/${report.share_token}`}
                                                className="form-input text-xs py-1 w-full bg-slate-700 flex-grow"
                                            />
                                            <button onClick={() => handleCopyLink(report.share_token!)} className="btn-secondary text-xs py-1 px-2 whitespace-nowrap flex-shrink-0">Copy</button>
                                        </div>
                                        <button
                                            onClick={() => handleStopSharingReport(report.id)}
                                            disabled={shareActionLoading === report.id}
                                            className="btn-primary bg-red-600 hover:bg-red-700 text-xs py-1 px-2 disabled:opacity-50 w-full sm:w-auto"
                                        >
                                            {shareActionLoading === report.id ? 'Processing...' : 'Stop Sharing'}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleShareReport(report.id)}
                                        disabled={shareActionLoading === report.id}
                                        className="btn-primary text-xs py-1 px-2 disabled:opacity-50 whitespace-nowrap w-full sm:w-auto sm:mr-2"
                                    >
                                        {shareActionLoading === report.id ? 'Processing...' : 'Share via Link'}
                                    </button>
                                )}
                                <button
                                    onClick={() => handleOpenEmailModal(report)}
                                    className="btn-secondary text-xs py-1 px-2 whitespace-nowrap disabled:opacity-50 w-full sm:w-auto"
                                    disabled={emailSending && currentReportForEmail?.id === report.id}
                                >
                                   {emailSending && currentReportForEmail?.id === report.id ? 'Sending...' : 'Email Report'}
                                </button>
                            </div>

                            {expandedReportId === report.id && (
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <h3 className="text-md font-semibold text-teal-300 mb-2">{report.slide1_title || "Report Introduction"}</h3>
                                    <p className="text-sm text-slate-400 italic">
                                        (Full report view with all sections is coming soon!)
                                    </p>
                                    <p className="text-xs text-slate-500 mt-2">Report ID: {report.id}</p>
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                 )
                }
            </div>
            <EmailReportModal />
        </>
    );
}
