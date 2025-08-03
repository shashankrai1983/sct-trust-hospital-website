import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { infertilityTreatmentData } from '@/data/services/infertility-treatment';

export const metadata: Metadata = {
  title: infertilityTreatmentData.seo.title,
  description: infertilityTreatmentData.seo.description,
  keywords: infertilityTreatmentData.seo.keywords,
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
    title: infertilityTreatmentData.seo.title,
    description: infertilityTreatmentData.seo.description,
    url: infertilityTreatmentData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: infertilityTreatmentData.seo.ogImage || infertilityTreatmentData.hero.image,
        width: 1200,
        height: 630,
        alt: infertilityTreatmentData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: infertilityTreatmentData.seo.title,
    description: infertilityTreatmentData.seo.description,
    images: [infertilityTreatmentData.seo.ogImage || infertilityTreatmentData.hero.image],
  },
  alternates: {
    canonical: infertilityTreatmentData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Reproductive Medicine',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function InfertilityTreatmentPage() {
  return <ServicePageTemplate data={infertilityTreatmentData} />;
}