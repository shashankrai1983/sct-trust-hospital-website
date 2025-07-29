import { Metadata } from 'next';
import LuxuryHighRiskPregnancy from './luxury-version';

export const metadata: Metadata = {
  title: 'High Risk Pregnancy Care | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  description: 'Expert high-risk pregnancy care by Dr. Amita Shukla in Lucknow. Specialized monitoring, comprehensive care for complex pregnancies. 10+ years experience, 98% success rate.',
  keywords: [
    'high risk pregnancy',
    'maternal fetal medicine',
    'pregnancy complications',
    'gestational diabetes',
    'preeclampsia',
    'Dr. Amita Shukla',
    'Lucknow gynecologist',
    'SCT Trust Hospital',
    'specialized pregnancy care',
    'high risk obstetrics'
  ],
  authors: [{ name: 'Dr. Amita Shukla' }],
  creator: 'SCT Trust Hospital',
  publisher: 'SCT Trust Hospital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'High Risk Pregnancy Care | Dr. Amita Shukla',
    description: 'Expert high-risk pregnancy care with personalized treatment plans. Comprehensive monitoring and specialized care for complex pregnancies.',
    url: 'https://dramitashukla.com/services/high-risk-pregnancy',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: 'https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png',
        width: 1200,
        height: 630,
        alt: 'High Risk Pregnancy Care by Dr. Amita Shukla',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Risk Pregnancy Care | Dr. Amita Shukla',
    description: 'Expert high-risk pregnancy care with comprehensive monitoring and personalized treatment plans.',
    images: ['https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/services/high-risk-pregnancy',
  },
};

export default function HighRiskPregnancyPage() {
  return <LuxuryHighRiskPregnancy />;
}