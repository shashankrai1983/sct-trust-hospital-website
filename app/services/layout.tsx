import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Gynecology Services in Lucknow | Dr. Amita Shukla | SCT Trust Hospital",
  description:
    "Comprehensive gynecology services by Dr. Amita Shukla in Lucknow. Expert care for high-risk pregnancy, PCOS treatment, infertility, laparoscopy, antenatal care at SCT Trust Hospital.",
  keywords: [
    "best gynaecologist in lucknow",
    "top gynecologist lucknow",
    "best lady doctor lucknow",
    "gynecological services",
    "women health services",
    "obstetric care",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "pregnancy care",
    "infertility treatment",
    "PCOS treatment",
    "laparoscopic surgery",
    "antenatal care",
    "well women health",
    "best gynecologist near me",
    "women doctor lucknow",
  ],
  authors: [{ name: "Dr. Amita Shukla" }],
  creator: "SCT Trust Hospital",
  publisher: "SCT Trust Hospital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gynecology Services in Lucknow | Dr. Amita Shukla",
    description:
      "Comprehensive gynecology services including pregnancy care, PCOS treatment, infertility care, and laparoscopy by Dr. Amita Shukla at SCT Trust Hospital.",
    url: "https://dramitashukla.com/services",
    siteName: "Dr. Amita Shukla - Gynecologist & Obstetrician",
    images: [
      {
        url: "https://i.ibb.co/v6M89Byz/doctor-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Amita Shukla - Best Gynaecologist in Lucknow",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gynecology Services in Lucknow | Dr. Amita Shukla",
    description:
      "Expert gynecology services including PCOS treatment, pregnancy care, infertility treatment, and laparoscopy at SCT Trust Hospital.",
    images: ["https://i.ibb.co/v6M89Byz/doctor-image.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
