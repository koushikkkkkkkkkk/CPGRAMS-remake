import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jansunwai Civic OS",
  description: "Next-generation civic grievance redressal platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="apple-layout">
        
        {/* Apple HIG Floating Top Navigation Capsule */}
        <nav className="mac-top-nav-container">
          <div className="mac-top-nav">
            
            <div className="nav-links">
              <a href="/" className="nav-pill active">Home</a>
              <a href="/lodge" className="nav-pill">Lodge</a>
              <a href="/status" className="nav-pill">Status</a>
              <a href="/contact" className="nav-pill">Contact</a>
            </div>
            <div className="nav-actions">
              <ThemeToggle />
              <button className="icon-btn">🔔</button>
              <a href="/login" className="icon-btn profile-btn">KA</a>
            </div>

          </div>
        </nav>

        {/* Main Content Viewport */}
        <main className="apple-viewport">
          {children}
        </main>
        
      </body>
    </html>
  );
}
