import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ovulation Calculator - Fertile Days",
  description:
    "Calculate your ovulation date and fertile window with medical accuracy. Professional fertility tracking tool from Dr. Amita Shukla at SCT Trust Hospital, Lucknow. Plan your conception journey with confidence.",
  keywords: [
    "ovulation calculator",
    "fertility window calculator",
    "conception planning",
    "menstrual cycle tracking",
    "fertility tracking",
    "ovulation date",
    "fertile days",
    "family planning",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "Lucknow gynecologist",
    "fertility specialist",
  ],
  openGraph: {
    title:
      "Ovulation Calculator - Track Your Fertile Window | Dr. Amita Shukla",
    description:
      "Calculate your ovulation date and fertile window with medical-grade accuracy. Professional fertility guidance from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.",
    type: "website",
    url: "https://dramitashukla.com/calculators/ovulation-calculator",
    images: [
      {
        url: "/images/calculators/ovulation-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Ovulation Calculator - Dr. Amita Shukla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovulation Calculator | Dr. Amita Shukla",
    description:
      "Calculate your ovulation date and fertile window. Professional fertility tracking tool.",
    images: ["/images/calculators/ovulation-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://dramitashukla.com/calculators/ovulation-calculator",
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
      "This calculator provides estimates for educational purposes. Always consult with Dr. Amita Shukla or a qualified healthcare provider for personalized medical advice.",
  },
};

export default function OvulationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
