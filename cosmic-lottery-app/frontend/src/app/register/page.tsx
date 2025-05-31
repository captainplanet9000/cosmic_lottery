'use client';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to register');
            }
            setMessage('Registration successful! You can now login.');
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Register for Cosmic Lottery</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password" // Use new-password for registration
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full btn-primary py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-400' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    {/* Using default link styling from globals.css */}
                    <a href="/login" className="font-medium">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
