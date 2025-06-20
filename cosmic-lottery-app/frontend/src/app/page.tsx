'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-8 cosmic-text-glow">
        Welcome to Cosmic Lottery
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl">
        Unlock the secrets of the stars. Gain profound insights into your life path with personalized natal chart analyses.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/generate-report" legacyBehavior>
          <a className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-150">
            Generate Free Sample
          </a>
        </Link>
        <Link href="/pricing" legacyBehavior>
          <a className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-150">
            Explore Full Reports
          </a>
        </Link>
      </div>
      <div className="mt-20 pt-8 border-t border-slate-700 w-full max-w-md">
        <p className="text-gray-400 mb-2">Already have an account or need to register?</p>
        <div className="flex justify-center space-x-4">
          <Link href="/login" legacyBehavior>
            <a>Login</a>
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/register" legacyBehavior>
            <a>Register</a>
          </Link>
        </div>
      </div>
    </div>
  );
}