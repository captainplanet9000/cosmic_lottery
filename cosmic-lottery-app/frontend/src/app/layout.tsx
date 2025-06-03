import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cosmic Lottery - Professional Astrology Reports",
  description: "Unlock the secrets of the stars with personalized natal chart readings and professional astrological analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans bg-slate-950 text-gray-200 min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 mt-4 mb-8">
          {children}
        </main>
        <footer className="bg-slate-900 text-center p-6 text-sm text-gray-500 border-t border-slate-800">
            © {new Date().getFullYear()} Cosmic Lottery. All rights reserved. For entertainment purposes only.
            <p className="mt-1">
              <Link href="/privacy-policy" className="hover:text-purple-400">Privacy Policy</Link> |{" "}
              <Link href="/terms-of-service" className="hover:text-purple-400">Terms of Service</Link>
            </p>
        </footer>
      </body>
    </html>
  );
}