import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Weight Gain Calculator",
  description:
    "Track your pregnancy weight gain with medical precision. Get personalized recommendations based on BMI and pregnancy stage. Professional guidance from Dr. Amita Shukla in Lucknow.",
  keywords: [
    "pregnancy weight gain calculator",
    "pregnancy weight tracking",
    "BMI pregnancy calculator",
    "healthy pregnancy weight",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "Lucknow gynecologist",
    "pregnancy care Lucknow",
    "weight gain during pregnancy",
    "pregnancy nutrition",
    "prenatal care",
    "pregnancy health calculator",
  ],
  openGraph: {
    title: "Pregnancy Weight Gain Calculator | Dr. Amita Shukla",
    description:
      "Track your pregnancy weight gain with medical precision. Get personalized recommendations from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.",
    type: "website",
    url: "https://dramitashukla.com/calculators/weight-gain-calculator",
    locale: "en_IN",
    siteName: "Dr. Amita Shukla - SCT Trust Hospital",
    images: [
      {
        url: "/images/calculators/weight-gain-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pregnancy Weight Gain Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Weight Gain Calculator | Dr. Amita Shukla",
    description:
      "Track your pregnancy weight gain with medical precision. Professional guidance from Lucknow's trusted gynecologist.",
    images: ["/images/calculators/weight-gain-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/weight-gain-calculator",
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
      "This weight gain calculator provides general estimates based on IOM guidelines for educational purposes. Individual weight gain recommendations may vary based on pre-pregnancy BMI, multiple pregnancies, and health conditions. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized pregnancy weight guidance.",
  },
};

export default function WeightGainCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
