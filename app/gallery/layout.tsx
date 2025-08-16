import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospital Gallery - SCT Trust Hospital | Dr. Amita Shukla',
  description: 'View our modern hospital facilities, medical equipment, and comfortable patient rooms at SCT Trust Hospital, Aliganj, Lucknow. State-of-the-art gynecology department.',
  keywords: ['SCT Trust Hospital gallery', 'hospital facilities', 'medical equipment', 'patient rooms', 'gynecology department', 'Aliganj hospital', 'Lucknow hospital'],
  openGraph: {
    title: 'Hospital Gallery - SCT Trust Hospital | Dr. Amita Shukla',
    description: 'View our modern hospital facilities and state-of-the-art medical equipment at SCT Trust Hospital, Lucknow.',
    url: 'https://dramitashukla.com/gallery',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: 'https://i.ibb.co/8gGt9HFG/1.png',
      width: 1200,
      height: 630,
      alt: 'SCT Trust Hospital Gallery',
    }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hospital Gallery - SCT Trust Hospital',
    description: 'View our modern hospital facilities and medical equipment at SCT Trust Hospital, Lucknow.',
    images: ['https://i.ibb.co/8gGt9HFG/1.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/gallery',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}