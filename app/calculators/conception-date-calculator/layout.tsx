import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conception Date Calculator | Estimate Conception Timing | Dr. Amita Shukla',
  description: 'Calculate your estimated conception date using LMP or due date with Dr. Amita Shukla\'s professional conception calculator in Lucknow. Scientific medical precision for family planning.',
  keywords: [
    'conception date calculator',
    'conception timing calculator', 
    'estimate conception date',
    'fertility window calculator',
    'conception planning',
    'ovulation date calculator',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow gynecologist',
    'family planning',
    'fertility guidance',
    'conception estimation'
  ],
  openGraph: {
    title: 'Conception Date Calculator | Scientific Timing Estimation | Dr. Amita Shukla',
    description: 'Calculate your estimated conception date with scientific precision using LMP or due date. Professional fertility guidance from Dr. Amita Shukla in Lucknow.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    url: '/calculators/conception-date-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conception Date Calculator - Scientific Timing Estimation',
    description: 'Calculate your estimated conception date with medical precision. Expert fertility guidance and conception planning in Lucknow.',
  },
  alternates: {
    canonical: '/calculators/conception-date-calculator',
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

export default function ConceptionDateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}