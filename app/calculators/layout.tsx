import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Women\'s Health Calculators | Dr. Amita Shukla',
    default: 'Women\'s Health Calculators | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  },
  description: 'Professional women\'s health calculators by Dr. Amita Shukla. Calculate due dates, pregnancy weeks, ovulation, BMI, and more with medical accuracy. Expert prenatal care in Lucknow.',
  keywords: [
    'pregnancy calculator',
    'due date calculator',
    'ovulation calculator',
    'BMI calculator',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow gynecologist',
    'women\'s health calculator',
    'prenatal calculator',
    'fertility calculator',
    'pregnancy week calculator',
    'conception calculator',
    'women\'s health tools',
  ],
  openGraph: {
    title: 'Women\'s Health Calculators - Dr. Amita Shukla | SCT Trust Hospital',
    description: 'Professional pregnancy and women\'s health calculators with medical accuracy. Expert care by Dr. Amita Shukla in Lucknow.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: '/images/calculators-og.jpg', // You would need to create this image
        width: 1200,
        height: 630,
        alt: 'Women\'s Health Calculators by Dr. Amita Shukla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Women\'s Health Calculators - Professional Medical Tools',
    description: 'Calculate due dates, pregnancy weeks, ovulation, and more with medical precision. Expert care in Lucknow.',
  },
  alternates: {
    canonical: '/calculators',
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

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="calculators-section">
      {children}
    </div>
  );
}