// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/" className="text-2xl font-bold cosmic-text-glow hover:opacity-80 transition-opacity">
                    Cosmic Lottery
                </Link>
                <ul className="flex flex-wrap items-center space-x-4 md:space-x-6 text-sm md:text-base">
                    <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                    <li><Link href="/generate-report" className="hover:text-purple-400 transition-colors">Generate Report</Link></li>
                    <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                    <li className="hidden md:inline-block"><span className="text-slate-600">|</span></li>
                    <li><Link href="/login" className="hover:text-teal-400 transition-colors">Login</Link></li>
                    <li><Link href="/register" className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-md text-white font-semibold transition-colors">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
}
