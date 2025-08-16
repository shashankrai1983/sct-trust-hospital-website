import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Women\'s Health Blog | Dr. Amita Shukla - Expert Medical Insights',
  description: 'Read expert articles on women\'s health, pregnancy care, PCOS treatment, and fertility by Dr. Amita Shukla. Professional medical advice and health tips for women.',
  keywords: ['women health blog', 'pregnancy care articles', 'PCOS treatment', 'fertility advice', 'gynecology blog', 'Dr. Amita Shukla', 'medical advice', 'Lucknow'],
  openGraph: {
    title: 'Women\'s Health Blog | Dr. Amita Shukla - Expert Medical Insights',
    description: 'Read expert articles on women\'s health, pregnancy care, and gynecological issues by Dr. Amita Shukla, leading gynecologist in Lucknow.',
    url: 'https://dramitashukla.com/blog',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: 'https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png',
      width: 1200,
      height: 630,
      alt: 'Women\'s Health Blog by Dr. Amita Shukla',
    }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Women\'s Health Blog | Dr. Amita Shukla',
    description: 'Expert articles on women\'s health, pregnancy care, and gynecological issues',
    images: ['https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}