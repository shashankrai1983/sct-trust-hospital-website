import { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { pcosPcodTreatmentData } from '@/data/services/pcos-pcod-treatment';
import { MedicalServiceSchema } from '@/components/seo/rich-snippets/medical-service-schema';
import { FAQSchema } from '@/components/seo/rich-snippets/faq-schema';
import { BreadcrumbSchema, generateServiceBreadcrumb } from '@/components/seo/rich-snippets/breadcrumb-schema';

export const metadata: Metadata = {
  title: pcosPcodTreatmentData.seo.title,
  description: pcosPcodTreatmentData.seo.description,
  keywords: pcosPcodTreatmentData.seo.keywords,
  authors: [{ name: 'Dr. Amita Shukla' }],
  creator: 'SCT Trust Hospital',
  publisher: 'SCT Trust Hospital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: pcosPcodTreatmentData.seo.title,
    description: pcosPcodTreatmentData.seo.description,
    url: pcosPcodTreatmentData.seo.canonicalUrl,
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: pcosPcodTreatmentData.seo.ogImage || pcosPcodTreatmentData.hero.image,
        width: 1200,
        height: 630,
        alt: pcosPcodTreatmentData.hero.imageAlt,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pcosPcodTreatmentData.seo.title,
    description: pcosPcodTreatmentData.seo.description,
    images: [pcosPcodTreatmentData.seo.ogImage || pcosPcodTreatmentData.hero.image],
  },
  alternates: {
    canonical: pcosPcodTreatmentData.seo.canonicalUrl,
  },
  other: {
    'medical-specialty': 'Gynecology and Endocrinology',
    'service-area': 'Lucknow, Uttar Pradesh, India',
    'provider': 'Dr. Amita Shukla',
  }
};

export default function PcosPcodTreatmentPage() {
  const serviceUrl = 'https://dramitashukla.com/services/pcos-pcod-treatment';
  
  const faqData = [
    {
      question: "What are PCOS and PCOD?",
      answer: "PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovary Disease) are hormonal disorders affecting women of reproductive age. They involve irregular periods, excess androgen levels, and polycystic ovaries. PCOS is a more severe condition with metabolic implications.",
      category: "General Information",
      dateCreated: "2024-01-01"
    },
    {
      question: "Can PCOS/PCOD be cured permanently?",
      answer: "While PCOS/PCOD cannot be completely cured, symptoms can be effectively managed with proper treatment including lifestyle modifications, medications, and regular monitoring. Many women with PCOS lead normal, healthy lives with appropriate care.",
      category: "Treatment",
      dateCreated: "2024-01-01"
    },
    {
      question: "Will I be able to get pregnant with PCOS?",
      answer: "Yes, many women with PCOS can conceive naturally or with fertility treatments. Proper management of PCOS symptoms, weight management, and fertility treatments can significantly improve chances of pregnancy. Early treatment improves outcomes.",
      category: "Fertility",
      dateCreated: "2024-01-01"
    },
    {
      question: "What lifestyle changes help with PCOS?",
      answer: "Key lifestyle changes include maintaining a healthy weight, regular exercise, balanced diet low in refined carbs, stress management, adequate sleep, and avoiding smoking. These changes can significantly improve PCOS symptoms and overall health.",
      category: "Lifestyle",
      dateCreated: "2024-01-01"
    }
  ];

  const breadcrumbItems = generateServiceBreadcrumb("PCOS/PCOD Treatment", "pcos-pcod-treatment");

  return (
    <>
      <MedicalServiceSchema
        serviceName="PCOS/PCOD Treatment"
        serviceDescription="Comprehensive PCOS/PCOD treatment including hormonal management, fertility treatments, lifestyle counseling, and long-term health monitoring for women's reproductive health."
        serviceUrl={serviceUrl}
        procedureType="Medical Treatment and Hormonal Management"
        preparation="Fasting blood tests, recent ultrasound reports, menstrual history, and current medications list"
        followup="Regular monitoring every 3-6 months with blood tests and ultrasounds"
        benefits={[
          "Regulated menstrual cycles",
          "Improved fertility outcomes",
          "Better metabolic health",
          "Reduced hirsutism and acne",
          "Weight management support",
          "Long-term health monitoring"
        ]}
        risks={[
          "Medication side effects",
          "Temporary hormonal fluctuations",
          "Need for lifestyle modifications"
        ]}
        duration="PT45M"
        recovery="Ongoing management with lifestyle modifications"
        cost={{
          minPrice: 800,
          maxPrice: 3000,
          currency: "₹"
        }}
        bodyLocation="Ovaries, reproductive system"
        medicalCode={{
          code: "E28.2",
          codingSystem: "ICD-10"
        }}
      />
      
      <FAQSchema
        faqs={faqData}
        mainEntity="PCOS/PCOD Treatment"
        about="Polycystic ovary syndrome treatment and management"
        url={serviceUrl}
        name="PCOS/PCOD Treatment FAQ"
        description="Frequently asked questions about PCOS/PCOD treatment by Dr. Amita Shukla at SCT Trust Hospital, Lucknow"
      />
      
      <BreadcrumbSchema
        items={breadcrumbItems}
        currentPageName="PCOS/PCOD Treatment"
        currentPageUrl={serviceUrl}
      />
      
      <ServicePageTemplate data={pcosPcodTreatmentData} />
    </>
  );
}