// src/components/Header.tsx
'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/" className="text-2xl font-bold cosmic-text-glow hover:opacity-80 transition-opacity">
                    Cosmic Lottery
                </Link>

                {/* Mobile Menu Button - visible on small screens */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 rounded-md text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex md:items-center md:space-x-6 text-sm">
                    <li><Link href="/" className="hover:text-purple-400 transition-colors py-1">Home</Link></li>
                    <li><Link href="/generate-report" className="hover:text-purple-400 transition-colors py-1">Generate Chart</Link></li>
                    <li><Link href="/my-reports" className="hover:text-purple-400 transition-colors py-1">My Charts</Link></li>
                    <li><Link href="/pricing" className="hover:text-purple-400 transition-colors py-1">Pricing</Link></li>
                    <li className="hidden lg:inline-block"><span className="text-slate-600">|</span></li>
                    <li><Link href="/login" className="hover:text-teal-400 transition-colors py-1">Login</Link></li>
                    <li><Link href="/register" className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-md text-white font-semibold transition-colors">Register</Link></li>
                </ul>
            </nav>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-3" id="mobile-menu">
                    <ul className="flex flex-col space-y-3 px-2 pt-2 pb-3 bg-slate-800 rounded-md">
                        <li><Link href="/" className="block hover:text-purple-400 transition-colors py-2 px-3 rounded-md hover:bg-slate-700" onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link href="/generate-report" className="block hover:text-purple-400 transition-colors py-2 px-3 rounded-md hover:bg-slate-700" onClick={toggleMobileMenu}>Generate Chart</Link></li>
                        <li><Link href="/my-reports" className="block hover:text-purple-400 transition-colors py-2 px-3 rounded-md hover:bg-slate-700" onClick={toggleMobileMenu}>My Charts</Link></li>
                        <li><Link href="/pricing" className="block hover:text-purple-400 transition-colors py-2 px-3 rounded-md hover:bg-slate-700" onClick={toggleMobileMenu}>Pricing</Link></li>
                        <hr className="border-slate-700"/>
                        <li><Link href="/login" className="block hover:text-teal-400 transition-colors py-2 px-3 rounded-md hover:bg-slate-700" onClick={toggleMobileMenu}>Login</Link></li>
                        <li><Link href="/register" className="block bg-purple-600 hover:bg-purple-700 text-center py-2 px-3 rounded-md text-white font-semibold transition-colors" onClick={toggleMobileMenu}>Register</Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
}