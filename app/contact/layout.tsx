import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Dr. Amita Shukla - Book Appointment | SCT Trust Hospital Lucknow',
  description: 'Book appointment with Dr. Amita Shukla. Contact SCT Trust Hospital Aliganj, Lucknow. Phone: +91-8303222222. Expert gynecologist available 24/7 emergency care.',
  keywords: ['book appointment Dr. Amita Shukla', 'contact gynecologist', 'SCT Trust Hospital contact', 'Lucknow gynecologist appointment', 'Aliganj hospital'],
  openGraph: {
    title: 'Contact Dr. Amita Shukla - Book Appointment | SCT Trust Hospital',
    description: 'Book appointment with Dr. Amita Shukla at SCT Trust Hospital, Aliganj, Lucknow. Expert gynecological care with 24/7 emergency services.',
    url: 'https://dramitashukla.com/contact',
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: 'https://i.ibb.co/8gGt9HFG/1.png',
      width: 1200,
      height: 630,
      alt: 'SCT Trust Hospital - Contact Dr. Amita Shukla',
    }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dr. Amita Shukla - Book Appointment',
    description: 'Book appointment with Dr. Amita Shukla at SCT Trust Hospital, Lucknow. Phone: +91-8303222222',
    images: ['https://i.ibb.co/8gGt9HFG/1.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}