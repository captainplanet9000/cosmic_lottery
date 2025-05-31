import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure this path is correct based on where globals.css was created
import Header from "@/components/Header"; // Adjust path if necessary, assuming components is in src

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cosmic Lottery",
  description: "Unlock the secrets of the stars with personalized natal chart readings.",
  // Add more metadata like openGraph, icons etc. if needed
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
          {/* Added some margin top/bottom for content spacing from header/footer */}
          {children}
        </main>
        <footer className="bg-slate-900 text-center p-6 text-sm text-gray-500 border-t border-slate-800">
            © {new Date().getFullYear()} Cosmic Lottery App. All rights reserved. For entertainment purposes only.
            <p className="mt-1">
              <Link href="/privacy-policy" className="hover:text-purple-400">Privacy Policy</Link> |
              <Link href="/terms-of-service" className="hover:text-purple-400">Terms of Service</Link>
            </p>
        </footer>
      </body>
    </html>
  );
}

// Helper component for links in footer, if needed, or use direct Link from next/link
// const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
//   <Link href={href} className="text-gray-400 hover:text-purple-300 transition-colors">
//     {children}
//   </Link>
// );
