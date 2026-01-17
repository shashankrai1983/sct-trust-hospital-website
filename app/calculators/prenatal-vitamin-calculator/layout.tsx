import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenatal Vitamin Calculator - Pregnancy Nutrition",
  description:
    "Get personalized prenatal vitamin and mineral recommendations for your pregnancy. Calculate daily nutritional needs, discover Indian superfood alternatives, and track your nutrition progress with our Nutrition Ninja Maa system.",
  keywords: [
    "prenatal vitamins",
    "pregnancy nutrition",
    "vitamin calculator",
    "pregnancy supplements",
    "folic acid",
    "iron requirements",
    "calcium pregnancy",
    "DHA pregnancy",
    "Indian pregnancy foods",
    "prenatal nutrition lucknow",
    "Dr. Amita Shukla",
    "SCT Trust Hospital",
    "pregnancy diet plan",
    "vitamin deficiency pregnancy",
    "nutritional requirements trimester",
  ],
  authors: [{ name: "Dr. Amita Shukla" }],
  creator: "SCT Trust Hospital",
  publisher: "SCT Trust Hospital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Prenatal Vitamin Calculator | Expert Pregnancy Nutrition Guidance",
    description:
      "Calculate personalized vitamin requirements for pregnancy and breastfeeding. Get expert recommendations from Dr. Amita Shukla with Indian superfood alternatives.",
    url: "https://dramitashukla.com/calculators/prenatal-vitamin-calculator",
    siteName: "Dr. Amita Shukla - SCT Trust Hospital",
    images: [
      {
        url: "/images/prenatal-vitamin-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Prenatal Vitamin Calculator - Pregnancy Nutrition Tool",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prenatal Vitamin Calculator | Dr. Amita Shukla",
    description:
      "Get personalized prenatal vitamin recommendations with Indian superfood alternatives. Expert guidance for healthy pregnancy nutrition.",
    images: ["/images/prenatal-vitamin-calculator-twitter.jpg"],
    creator: "@SCTTrustHospital",
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
  alternates: {
    canonical:
      "https://dramitashukla.com/calculators/prenatal-vitamin-calculator",
  },
};

export default function PrenatalVitaminCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
