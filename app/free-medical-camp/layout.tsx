import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Medical Investigation Camp - September 19, 2025 | SCT Trust Hospital',
  description: 'Join us for a Free Medical Investigation Camp on September 19, 2025. Get 7 essential health tests including Thyroid, Hemoglobin, RBS, Protein test, BMD, BMI, and Vitamin D absolutely free at SCT Trust Hospital, Lucknow.',
  keywords: 'free medical camp, health checkup, free health tests, medical investigation, thyroid test, hemoglobin test, RBS test, protein test, BMD test, BMI calculation, vitamin D test, SCT Trust Hospital, Lucknow medical camp',
  openGraph: {
    title: 'Free Medical Investigation Camp - September 19, 2025',
    description: 'Get 7 essential health tests absolutely free at SCT Trust Hospital. Join us on Friday, September 19, 2025.',
    type: 'website',
    url: 'https://dramitashukla.com/free-medical-camp',
    images: [
      {
        url: 'https://dramitashukla.com/og-medical-camp.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Medical Investigation Camp at SCT Trust Hospital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Medical Investigation Camp - September 19, 2025',
    description: 'Get 7 essential health tests absolutely free at SCT Trust Hospital',
    images: ['https://dramitashukla.com/og-medical-camp.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FreeMedicalCampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Free Medical Investigation Camp",
            "description": "Free health checkup camp offering 7 essential medical tests including Thyroid, Hemoglobin, RBS, Protein test, BMD, BMI, and Vitamin D screening.",
            "startDate": "2025-09-19T09:00:00+05:30",
            "endDate": "2025-09-19T17:00:00+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "SCT Trust Hospital",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "A1/7, Sector-H, Aliganj, Near Kendriya Bhawan",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "226024",
                "addressCountry": "IN"
              }
            },
            "organizer": {
              "@type": "MedicalOrganization",
              "name": "Late Shri S C Trivedi Memorial Mother & Child Trust Hospital",
              "url": "https://dramitashukla.com",
              "telephone": "+91-522-4102222",
              "email": "trusttrivedi@gmail.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2025-01-01T00:00:00+05:30",
              "description": "Free medical tests for all attendees"
            },
            "performer": {
              "@type": "MedicalOrganization",
              "name": "SCT Trust Hospital Medical Team"
            },
            "about": {
              "@type": "MedicalTest",
              "name": "Comprehensive Health Screening",
              "medicalTestPanelComposition": [
                "Thyroid Function Test",
                "Hemoglobin Test",
                "Random Blood Sugar Test",
                "Protein Test",
                "Bone Mineral Density Test",
                "Body Mass Index Calculation",
                "Vitamin D Test"
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}