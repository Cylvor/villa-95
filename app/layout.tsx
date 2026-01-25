import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll"; // Import the smooth scroll component
import CustomCursor from "./components/CustomCursor";

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
  title: "Villa 95 | Rangala",
  description:
    "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
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