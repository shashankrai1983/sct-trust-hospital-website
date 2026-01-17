import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Calorie Calculator",
  description:
    "Calculate daily calorie requirements during pregnancy and breastfeeding. Harris-Benedict based pregnancy nutrition calculator with trimester-specific adjustments by Dr. Amita Shukla, Lucknow.",
  keywords: [
    "pregnancy calorie calculator",
    "daily calorie needs pregnancy",
    "breastfeeding calorie calculator",
    "pregnancy nutrition calculator",
    "Harris-Benedict pregnancy",
    "calorie requirements pregnant",
    "pregnancy diet calculator",
    "trimester calorie needs",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "pregnancy nutrition lucknow",
    "prenatal calorie intake",
  ],
  openGraph: {
    title:
      "Pregnancy Calorie Calculator - Daily Nutritional Needs | Dr. Amita Shukla",
    description:
      "Calculate daily calorie requirements during pregnancy and breastfeeding with trimester-specific adjustments.",
    type: "website",
    url: "https://dramitashukla.com/calculators/calorie-needs-calculator",
    locale: "en_IN",
    siteName: "Dr. Amita Shukla - Gynecologist & Obstetrician",
    images: [
      {
        url: "/images/calculators/calorie-needs-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pregnancy Calorie Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Calorie Calculator | Dr. Amita Shukla",
    description:
      "Calculate daily calorie needs during pregnancy and breastfeeding. Professional nutrition guidance.",
    images: ["/images/calculators/calorie-needs-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/calorie-needs-calculator",
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
      "This calorie calculator provides general estimates based on the Harris-Benedict equation for educational purposes. Individual calorie needs vary based on metabolism, activity level, and health conditions. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized pregnancy nutrition guidance.",
  },
};

export default function CalorieNeedsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
