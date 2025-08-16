import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Weight Gain Calculator | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  description: 'Track your pregnancy weight gain with medical precision. Get personalized recommendations based on BMI and pregnancy stage. Professional guidance from Dr. Amita Shukla in Lucknow.',
  keywords: [
    'pregnancy weight gain calculator',
    'pregnancy weight tracking',
    'BMI pregnancy calculator',
    'healthy pregnancy weight',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow gynecologist',
    'pregnancy care Lucknow',
    'weight gain during pregnancy',
    'pregnancy nutrition',
    'prenatal care',
    'pregnancy health calculator'
  ].join(', '),
  openGraph: {
    title: 'Pregnancy Weight Gain Calculator | Dr. Amita Shukla',
    description: 'Track your pregnancy weight gain with medical precision. Get personalized recommendations from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Weight Gain Calculator | Dr. Amita Shukla',
    description: 'Track your pregnancy weight gain with medical precision. Professional guidance from Lucknow\'s trusted gynecologist.',
  },
  alternates: {
    canonical: '/calculators/weight-gain-calculator',
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function WeightGainCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}