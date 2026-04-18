import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PragatiChat from '@/components/PragatiChat';
import PWAInstaller from '@/components/PWAInstaller';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.advayafm.com'),
  title: {
    default: 'D Advaya FM NaipuNya | AI-Powered Training for India\'s Workforce',
    template: '%s | D Advaya FM NaipuNya',
  },
  description:
    'Revolutionizing training and certification for India\'s vital industries through AI-powered assessments, immersive WebXR simulations, and personalized learning paths. Trusted by leading institutions including the Ministry of Skill Development & Entrepreneurship.',
  keywords: [
    'FM training',
    'facility management training India',
    'driver training MoRTH',
    'housekeeping training IHM',
    'POSH training',
    'AI workforce training',
    'blue collar skilling India',
    'hospitality training',
    'compliance training',
  ],
  authors: [{ name: 'D Advaya FM Pvt Ltd' }],
  creator: 'D Advaya FM Pvt Ltd',
  publisher: 'D Advaya FM Pvt Ltd',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.advayafm.com',
    siteName: 'D Advaya FM NaipuNya',
    title: 'D Advaya FM NaipuNya | AI-Powered Training for India\'s Workforce',
    description:
      'Immersive WebXR training for drivers, housekeeping, security, and facility management professionals. MoRTH and NSDC aligned curriculum.',
    images: [
      {
        url: '/logos/advaya-fm.png',
        width: 1200,
        height: 630,
        alt: 'D Advaya FM NaipuNya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D Advaya FM NaipuNya',
    description: 'AI-Powered Training for India\'s Workforce',
    images: ['/logos/advaya-fm.png'],
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
  icons: {
    icon: '/logos/advaya-fm.png',
    apple: '/logos/fm-naipunya.jpg',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'D Advaya FM',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'application-name': 'D Advaya FM NaipuNya',
  },
};

export const viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PragatiChat />
        <PWAInstaller />
      </body>
    </html>
  );
}
