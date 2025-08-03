import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { pcosPcodTreatmentData } from '@/data/services/pcos-pcod-treatment';

export const metadata: Metadata = {
  title: pcosPcodTreatmentData.seo.title,
  description: pcosPcodTreatmentData.seo.description,
  keywords: pcosPcodTreatmentData.seo.keywords,
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
    title: pcosPcodTreatmentData.seo.title,
    description: pcosPcodTreatmentData.seo.description,
    url: pcosPcodTreatmentData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: pcosPcodTreatmentData.seo.ogImage || pcosPcodTreatmentData.hero.image,
        width: 1200,
        height: 630,
        alt: pcosPcodTreatmentData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pcosPcodTreatmentData.seo.title,
    description: pcosPcodTreatmentData.seo.description,
    images: [pcosPcodTreatmentData.seo.ogImage || pcosPcodTreatmentData.hero.image],
  },
  alternates: {
    canonical: pcosPcodTreatmentData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Gynecology and Endocrinology',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function PcosPcodTreatmentPage() {
  return <ServicePageTemplate data={pcosPcodTreatmentData} />;
}