import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Water Intake Calculator",
  description:
    "Calculate daily water requirements during pregnancy and breastfeeding. Track hydration needs with pregnancy-specific adjustments and Hydration Hero streaks from Dr. Amita Shukla, Lucknow.",
  keywords: [
    "pregnancy water intake calculator",
    "hydration calculator pregnancy",
    "daily water needs pregnant",
    "pregnancy hydration tracker",
    "water requirement pregnancy",
    "breastfeeding water intake",
    "pregnancy fluid intake",
    "hydration during pregnancy",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "pregnancy hydration lucknow",
    "prenatal hydration",
  ],
  openGraph: {
    title:
      "Pregnancy Water Intake Calculator - Hydration Tracker | Dr. Amita Shukla",
    description:
      "Calculate daily water requirements during pregnancy and breastfeeding with hydration tracking.",
    type: "website",
    url: "https://dramitashukla.com/calculators/water-intake-calculator",
    locale: "en_IN",
    siteName: "Dr. Amita Shukla - Gynecologist & Obstetrician",
    images: [
      {
        url: "/images/calculators/water-intake-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pregnancy Water Intake Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Water Intake Calculator | Dr. Amita Shukla",
    description:
      "Calculate daily water needs during pregnancy. Track hydration with pregnancy-specific guidance.",
    images: ["/images/calculators/water-intake-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/water-intake-calculator",
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
      "This water intake calculator provides general hydration estimates for educational purposes. Individual water needs vary based on climate, activity level, and health conditions. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized pregnancy hydration guidance.",
  },
};

export default function WaterIntakeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
