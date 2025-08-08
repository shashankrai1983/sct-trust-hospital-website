import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Gynaecologist in Lucknow | Dr. Amita Shukla | SCT Trust Hospital',
  description: 'Dr. Amita Shukla - Best Gynaecologist in Lucknow with 10+ years experience. Expert in high-risk pregnancy, PCOS treatment, infertility care, laparoscopy at SCT Trust Hospital.',
  keywords: [
    'best gynaecologist in lucknow',
    'top gynecologist lucknow',
    'best lady doctor lucknow',
    'gynecological services',
    'women health services', 
    'obstetric care',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'pregnancy care',
    'infertility treatment',
    'PCOS treatment',
    'laparoscopic surgery',
    'antenatal care',
    'well women health',
    'best gynecologist near me',
    'women doctor lucknow'
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
    title: 'Best Gynaecologist in Lucknow | Dr. Amita Shukla',
    description: 'Dr. Amita Shukla offers comprehensive women healthcare services including pregnancy care, fertility treatments, and specialized gynecological procedures in Lucknow.',
    url: 'https://dramitashukla.com/services',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: 'https://i.ibb.co/v6M89Byz/doctor-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Amita Shukla - Best Gynaecologist in Lucknow',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Gynaecologist in Lucknow | Dr. Amita Shukla',
    description: 'Comprehensive women healthcare services with expert care and personalized treatment plans in Lucknow.',
    images: ['https://i.ibb.co/v6M89Byz/doctor-image.jpg'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}