import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Za Naturizam — AI vodič za naturistička putovanja",
    template: "%s · Za Naturizam",
  },
  description:
    "TripAdvisor-style AI tourist guide for naturists and clothing-optional travelers in Croatia. Clean Community.",
  keywords: [
    "naturizam",
    "naturist Croatia",
    "FKK",
    "clothing-optional",
    "Koversada",
    "Valalta",
    "Za Naturizam",
  ],
  openGraph: {
    title: "Za Naturizam",
    description:
      "AI guide for naturist & clothing-optional travel in Croatia — places, tips and Clean Community.",
    locale: "hr_HR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  metadataBase: new URL("https://za-naturizam.vercel.app"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
