import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll"; // Import the smooth scroll component
import CustomCursor from "./components/CustomCursor";
import { getSiteUrl } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // Added 300 (Light) as used in your designs
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Villa 95 | Rangala",
  description:
    "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Villa 95 | Rangala",
    description:
      "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
    url: "/",
    siteName: "Villa 95",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa 95 | Rangala",
    description:
      "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo/favicon.svg",
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
      >
        <CustomCursor />
        <SmoothScroll /> {/* Initializes the smooth scroll logic */}
        {children}
      </body>
    </html>
  );
}