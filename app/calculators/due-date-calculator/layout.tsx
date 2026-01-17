import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Due Date Calculator - Pregnancy EDD",
  description:
    "Calculate your baby's expected due date using your Last Menstrual Period (LMP). Free pregnancy due date calculator with trimester tracking and weekly milestones from Dr. Amita Shukla, Lucknow.",
  keywords: [
    "due date calculator",
    "pregnancy due date calculator",
    "EDD calculator",
    "expected delivery date",
    "LMP due date calculator",
    "pregnancy calculator",
    "baby due date",
    "delivery date calculator",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "pregnancy calculator lucknow",
    "naegele rule calculator",
  ],
  openGraph: {
    title: "Due Date Calculator - Calculate Your Baby's EDD | Dr. Amita Shukla",
    description:
      "Calculate your expected delivery date with medical accuracy using LMP. Track pregnancy milestones and trimester progress.",
    type: "website",
    url: "https://dramitashukla.com/calculators/due-date-calculator",
    locale: "en_IN",
    siteName: "Dr. Amita Shukla - Gynecologist & Obstetrician",
    images: [
      {
        url: "/images/calculators/due-date-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Due Date Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Due Date Calculator | Dr. Amita Shukla",
    description:
      "Calculate your baby's expected due date using LMP. Professional pregnancy calculator with trimester tracking.",
    images: ["/images/calculators/due-date-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/due-date-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "medical-disclaimer":
      "This due date calculator provides estimates based on the standard Naegele's Rule for educational purposes. Only 5% of babies are born on their exact due date. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized prenatal care.",
  },
};

export default function DueDateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
