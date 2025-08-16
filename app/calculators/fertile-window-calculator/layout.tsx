import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fertile Window Calculator | 6-Day Fertility Tracking | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  description: 'Track your 6-day fertile window with detailed cycle monitoring and medical insights. Professional fertility tracking for conception planning from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.',
  keywords: [
    'fertile window calculator',
    'fertility tracking',
    'conception planning',
    '6-day fertile window',
    'cycle monitoring',
    'fertility insights',
    'ovulation tracking',
    'menstrual cycle analysis',
    'fertility calendar',
    'conception probability',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow fertility specialist',
    'reproductive health'
  ],
  openGraph: {
    title: 'Fertile Window Calculator - Professional Fertility Tracking | Dr. Amita Shukla',
    description: 'Track your 6-day fertile window with detailed cycle monitoring and medical insights. Professional fertility tracking for conception planning.',
    type: 'website',
    url: 'https://dramitashukla.com/calculators/fertile-window-calculator',
    images: [
      {
        url: '/images/calculators/fertile-window-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fertile Window Calculator - Dr. Amita Shukla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fertile Window Calculator | Dr. Amita Shukla',
    description: 'Track your 6-day fertile window with detailed cycle monitoring and medical insights.',
    images: ['/images/calculators/fertile-window-calculator-og.jpg'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/calculators/fertile-window-calculator',
  },
  other: {
    'medical-disclaimer': 'This fertility tracking tool provides estimates for educational purposes. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized fertility guidance.',
  },
};

export default function FertileWindowCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}