import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { I18nProvider } from "../lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CivicOS",
  description: "Public service reporting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-[100dvh] font-sans antialiased selection:bg-[#E1F3FE] selection:text-[var(--color-accent)] dark:selection:bg-[#1A1A1A] dark:selection:text-[var(--color-accent)]">
        <I18nProvider>
          <Navbar />
          <main className="relative pt-[64px]">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
