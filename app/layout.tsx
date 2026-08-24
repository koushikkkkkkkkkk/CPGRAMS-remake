import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-[100dvh] bg-[#0A0A0A] font-sans text-[#EAEAEA] antialiased">
        <Navbar />
        <main className="relative pt-[104px]">
          {children}
        </main>
      </body>
    </html>
  );
}
