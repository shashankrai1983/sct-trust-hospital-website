import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { antenatalCareData } from '@/data/services/antenatal-care';

export const metadata: Metadata = {
  title: antenatalCareData.seo.title,
  description: antenatalCareData.seo.description,
  keywords: antenatalCareData.seo.keywords,
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
    title: antenatalCareData.seo.title,
    description: antenatalCareData.seo.description,
    url: antenatalCareData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: antenatalCareData.seo.ogImage || antenatalCareData.hero.image,
        width: 1200,
        height: 630,
        alt: antenatalCareData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: antenatalCareData.seo.title,
    description: antenatalCareData.seo.description,
    images: [antenatalCareData.seo.ogImage || antenatalCareData.hero.image],
  },
  alternates: {
    canonical: antenatalCareData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Obstetrics and Maternal-Fetal Medicine',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function AntenatalCarePage() {
  return <ServicePageTemplate data={antenatalCareData} />;
}