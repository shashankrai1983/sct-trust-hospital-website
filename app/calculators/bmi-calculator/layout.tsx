import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator for Women",
  description:
    "Calculate your Body Mass Index with women's health focused insights and medical recommendations. Professional BMI assessment from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.",
  keywords: [
    "BMI calculator",
    "body mass index",
    "women's health BMI",
    "weight assessment",
    "health calculator",
    "obesity screening",
    "weight management",
    "healthy weight range",
    "women's wellness",
    "PCOS BMI",
    "pregnancy weight",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "Lucknow health assessment",
    "reproductive health BMI",
  ],
  openGraph: {
    title: "BMI Calculator - Women's Health Assessment | Dr. Amita Shukla",
    description:
      "Calculate your Body Mass Index with women's health focused insights and medical recommendations. Professional health assessment with personalized guidance.",
    type: "website",
    url: "https://dramitashukla.com/calculators/bmi-calculator",
    images: [
      {
        url: "/images/calculators/bmi-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "BMI Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator | Dr. Amita Shukla",
    description:
      "Calculate your Body Mass Index with women's health focused insights and medical recommendations.",
    images: ["/images/calculators/bmi-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/bmi-calculator",
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
      "This BMI calculator provides general health estimates for educational purposes. BMI may not account for muscle mass, bone density, or individual health factors. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized medical assessment.",
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
