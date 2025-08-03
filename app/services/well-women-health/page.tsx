import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { wellWomenHealthData } from '@/data/services/well-women-health';

export const metadata: Metadata = {
  title: wellWomenHealthData.seo.title,
  description: wellWomenHealthData.seo.description,
  keywords: wellWomenHealthData.seo.keywords,
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
    title: wellWomenHealthData.seo.title,
    description: wellWomenHealthData.seo.description,
    url: wellWomenHealthData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: wellWomenHealthData.seo.ogImage || wellWomenHealthData.hero.image,
        width: 1200,
        height: 630,
        alt: wellWomenHealthData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: wellWomenHealthData.seo.title,
    description: wellWomenHealthData.seo.description,
    images: [wellWomenHealthData.seo.ogImage || wellWomenHealthData.hero.image],
  },
  alternates: {
    canonical: wellWomenHealthData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Preventive Women\'s Healthcare and Wellness',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function WellWomenHealthPage() {
  return <ServicePageTemplate data={wellWomenHealthData} />;
}