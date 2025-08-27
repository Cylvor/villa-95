import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from '@/components/layout/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import StructuredData from '@/components/seo/StructuredData';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import PlausibleAnalytics from '@/components/analytics/PlausibleAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Villa 95 - Luxury Hill Country Retreat | Rangala, Sri Lanka",
  description: "Experience unparalleled luxury in the heart of Sri Lanka's misty mountains. Villa 95 offers breathtaking views, modern amenities, and unforgettable memories in Rangala.",
  keywords: "Villa 95, luxury villa, hill country, Sri Lanka, Rangala, booking, accommodation, mountain retreat",
  authors: [{ name: "Villa 95" }],
  creator: "Villa 95",
  publisher: "Villa 95",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://villa95rangala.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Villa 95 - Luxury Hill Country Retreat | Rangala, Sri Lanka",
    description: "Experience unparalleled luxury in the heart of Sri Lanka's misty mountains. Villa 95 offers breathtaking views, modern amenities, and unforgettable memories in Rangala.",
    url: 'https://villa95rangala.com',
    siteName: 'Villa 95',
    images: [
      {
        url: '/images/villa95-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Villa 95 - Luxury Hill Country Retreat in Rangala, Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Villa 95 - Luxury Hill Country Retreat | Rangala, Sri Lanka",
    description: "Experience unparalleled luxury in the heart of Sri Lanka's misty mountains. Villa 95 offers breathtaking views, modern amenities, and unforgettable memories in Rangala.",
    images: ['/images/villa95-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <PlausibleAnalytics domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
