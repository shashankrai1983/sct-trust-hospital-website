import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { laparoscopyData } from '@/data/services/laparoscopy';

export const metadata: Metadata = {
  title: laparoscopyData.seo.title,
  description: laparoscopyData.seo.description,
  keywords: laparoscopyData.seo.keywords,
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
    title: laparoscopyData.seo.title,
    description: laparoscopyData.seo.description,
    url: laparoscopyData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: laparoscopyData.seo.ogImage || laparoscopyData.hero.image,
        width: 1200,
        height: 630,
        alt: laparoscopyData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: laparoscopyData.seo.title,
    description: laparoscopyData.seo.description,
    images: [laparoscopyData.seo.ogImage || laparoscopyData.hero.image],
  },
  alternates: {
    canonical: laparoscopyData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Minimally Invasive Gynecological Surgery',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function LaparoscopyPage() {
  return <ServicePageTemplate data={laparoscopyData} />;
}