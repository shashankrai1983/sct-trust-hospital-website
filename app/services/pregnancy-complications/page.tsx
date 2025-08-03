import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { pregnancyComplicationsData } from '@/data/services/pregnancy-complications';

export const metadata: Metadata = {
  title: pregnancyComplicationsData.seo.title,
  description: pregnancyComplicationsData.seo.description,
  keywords: pregnancyComplicationsData.seo.keywords,
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
    title: pregnancyComplicationsData.seo.title,
    description: pregnancyComplicationsData.seo.description,
    url: pregnancyComplicationsData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: pregnancyComplicationsData.seo.ogImage || pregnancyComplicationsData.hero.image,
        width: 1200,
        height: 630,
        alt: pregnancyComplicationsData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pregnancyComplicationsData.seo.title,
    description: pregnancyComplicationsData.seo.description,
    images: [pregnancyComplicationsData.seo.ogImage || pregnancyComplicationsData.hero.image],
  },
  alternates: {
    canonical: pregnancyComplicationsData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Emergency Obstetrics and Maternal-Fetal Medicine',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
    'emergency-contact': '+91-8303222222',
  }
};

export default function PregnancyComplicationsPage() {
  return <ServicePageTemplate data={pregnancyComplicationsData} />;
}