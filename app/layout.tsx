import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll"; // Import the smooth scroll component
import CustomCursor from "./components/CustomCursor";
import { getConfiguredSiteUrl } from "./lib/site";

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
  metadataBase: getConfiguredSiteUrl(),
  title: "Villa 95 | Rangala",
  description:
    "A private sanctuary above the clouds in the Knuckles Mountain Range, Sri Lanka.",
  keywords: [
    "Villa 95",
    "Villa 95 Rangala",
    "Rangala Villa 95",
    "Rangala",
    "Rooms",
    "Kotaganga",
    "Kotaganga falls",
    "kotaganga seven falls",
    "heeloya",
    "meemure",
    "meemure village",
    "heeloya village",
    "Knuckles Mountain Range",
    "Knuckles Range accommodation",
    "Knuckles Mountain Range villa",
    "mountain villa Sri Lanka",
    "luxury villa Sri Lanka",
    "boutique hotel Sri Lanka",
    "Rangala hotel",
    "Kandy mountain retreat",
    "Kandy villa",
    "Rangala Sri Lanka",
    "Rangala Knuckles View",
    "Knuckles Mountain Range Rangala",
    "Rangala Mountain View",
    "Knuckles View Point Rangala",
    "Rangala hill country",

"Rangala village Sri Lanka",

"Knuckles mountains near Kandy",

"Rangala misty mountains",

"Rangala scenic views" ,  
"best view point in Rangala",

"Rangala Knuckles mountain view",

"places to visit near Rangala",

"Rangala hill country views",

"Knuckles range view from Rangala",

"Rangala nature attractions",

"hidden places near Knuckles range" ,
"Rangala near Kandy",

"Rangala Knuckles range Sri Lanka",

"Rangala mountain village Sri Lanka",

"Knuckles viewpoint near Kandy",
"Knuckles cloud forest",

"eco tourism Sri Lanka",

"hill country climate Sri Lanka",

"Knuckles trekking trails",

"Rangala tea estates",
    "Sri Lanka hill country stay",
    "nature retreat Sri Lanka",
    "family friendly villa Sri Lanka",
    "couples retreat Sri Lanka",
    "honeymoon villa Sri Lanka",
    "private villa with mountain view",
  ],
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