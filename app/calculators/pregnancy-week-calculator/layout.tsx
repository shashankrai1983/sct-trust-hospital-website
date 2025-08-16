import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Week Calculator | Track Current Week & Trimester | Dr. Amita Shukla',
  description: 'Calculate your current pregnancy week and trimester with Dr. Amita Shukla\'s professional pregnancy week calculator in Lucknow. Track weekly milestones and development.',
  keywords: [
    'pregnancy week calculator',
    'current pregnancy week',
    'trimester calculator', 
    'gestational age calculator',
    'pregnancy tracking',
    'weekly pregnancy milestones',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow gynecologist',
    'pregnancy monitoring',
    'prenatal care',
    'pregnancy development tracker'
  ],
  openGraph: {
    title: 'Pregnancy Week Calculator | Track Your Progress | Dr. Amita Shukla',
    description: 'Track your current pregnancy week and trimester with professional accuracy. Get weekly milestones and development information from Dr. Amita Shukla.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    url: '/calculators/pregnancy-week-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Week Calculator - Track Your Progress',
    description: 'Calculate your current pregnancy week and track weekly milestones with medical precision. Expert prenatal care in Lucknow.',
  },
  alternates: {
    canonical: '/calculators/pregnancy-week-calculator',
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

export default function PregnancyWeekCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}