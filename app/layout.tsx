import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Providers } from './providers';
import { ConditionalNavbar } from '@/components/layout/conditional-navbar';
import { ConditionalFooter } from '@/components/layout/conditional-footer';
import { SchemaMarkup } from '@/components/seo/schema-markup';
import { GoogleAnalytics } from '@/components/seo/google-analytics';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lato = Lato({ 
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://www.dramitashukla.com' : 'http://localhost:3000'),
  title: 'Best Gynaecologist in Lucknow - Dr. Amita Shukla | SCT Trust Hospital',
  description: 'Dr. Amita Shukla is the best gynaecologist in Lucknow with 10+ years experience. Expert in high-risk pregnancy, PCOS treatment, infertility care at SCT Trust Hospital. Book appointment.',
  
  // Open Graph for social sharing
  openGraph: {
    title: 'Best Gynaecologist in Lucknow - Dr. Amita Shukla',
    description: 'Leading gynecologist in Lucknow specializing in women\'s health, pregnancy care, and fertility treatments.',
    url: 'https://www.dramitashukla.com',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: '/images/dr-amita-shukla-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Dr. Amita Shukla - Best Gynaecologist in Lucknow',
    }],
    locale: 'en_IN',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Best Gynaecologist in Lucknow - Dr. Amita Shukla',
    description: 'Expert gynecological care in Lucknow with 10+ years experience',
    images: ['/images/dr-amita-shukla-twitter.jpg'],
    creator: '@DrAmitaShukla',
  },

  // Robots and indexing
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

  // Medical and local SEO
  authors: [{ name: 'Dr. Amita Shukla', url: 'https://www.dramitashukla.com/about' }],
  creator: 'Dr. Amita Shukla',
  publisher: 'SCT Trust Hospital',
  category: 'Healthcare',
  classification: 'Medical Practice',
  
  // Local SEO
  other: {
    'geo.region': 'IN-UP',
    'geo.placename': 'Lucknow',
    'geo.position': '26.8467;80.9462',
    'ICBM': '26.8467, 80.9462',
    'og:locality': 'Lucknow',
    'og:region': 'Uttar Pradesh',
    'og:country-name': 'India',
  },

  // Verification
  verification: {
    google: 'your-google-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },

  // Icons (local files) - Enhanced for better Google detection
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#22c55e' },
      { rel: 'shortcut icon', url: '/favicon.ico' }
    ]
  },

  // Manifest
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" type="image/x-icon" href="https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/amitashukla/upscaled_dr_amita_shukla.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/amitashukla/upscaled_dr_amita_shukla.ico" />
        <link rel="icon" type="image/x-icon" sizes="32x32" href="https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/amitashukla/upscaled_dr_amita_shukla.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/amitashukla/upscaled_dr_amita_shukla.ico" />
        <SchemaMarkup />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.variable} ${lato.variable} font-sans bg-accent-cream antialiased`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative overflow-hidden min-h-screen">
              <GridPattern 
                width={50} 
                height={50}
                strokeDasharray="1 1"
                className="fixed inset-0 text-primary-green/5 dark:text-primary-green/10 pointer-events-none"
              />
              <ConditionalNavbar />
              <main className="relative">{children}</main>
              <ConditionalFooter />
              <Toaster />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
