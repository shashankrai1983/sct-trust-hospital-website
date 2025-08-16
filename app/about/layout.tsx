import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Dr. Amita Shukla - Gynecologist Biography & Experience | SCT Trust Hospital',
  description: 'Learn about Dr. Amita Shukla\'s medical background, 10+ years gynecology experience, Gold Medalist MBBS, and specialized training. Leading gynecologist in Lucknow.',
  keywords: ['Dr. Amita Shukla biography', 'gynecologist experience', 'medical education', 'Gold Medalist MBBS', 'SCT Trust Hospital', 'Lucknow gynecologist'],
  openGraph: {
    title: 'About Dr. Amita Shukla - Gynecologist Biography & Experience',
    description: 'Learn about Dr. Amita Shukla\'s medical background, 10+ years gynecology experience, and specialized training in women\'s healthcare.',
    url: 'https://dramitashukla.com/about',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: 'https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png',
      width: 1200,
      height: 630,
      alt: 'Dr. Amita Shukla - Gynecologist Biography',
    }],
    locale: 'en_IN',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Amita Shukla - Gynecologist Biography & Experience',
    description: 'Learn about Dr. Amita Shukla\'s medical background and 10+ years experience in gynecology',
    images: ['https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}