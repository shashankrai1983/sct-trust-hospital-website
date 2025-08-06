import { Metadata } from 'next';
import LuxuryHighRiskPregnancy from './luxury-version';
import { MedicalServiceSchema } from '@/components/seo/rich-snippets/medical-service-schema';
import { FAQSchema } from '@/components/seo/rich-snippets/faq-schema';
import { BreadcrumbSchema, generateServiceBreadcrumb } from '@/components/seo/rich-snippets/breadcrumb-schema';

export const metadata: Metadata = {
  title: 'High Risk Pregnancy Care | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  description: 'Expert high-risk pregnancy care by Dr. Amita Shukla in Lucknow. Specialized monitoring, comprehensive care for complex pregnancies. 10+ years experience, 98% success rate.',
  keywords: [
    'high risk pregnancy',
    'maternal fetal medicine',
    'pregnancy complications',
    'gestational diabetes',
    'preeclampsia',
    'Dr. Amita Shukla',
    'Lucknow gynecologist',
    'SCT Trust Hospital',
    'specialized pregnancy care',
    'high risk obstetrics'
  ],
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
    title: 'High Risk Pregnancy Care | Dr. Amita Shukla',
    description: 'Expert high-risk pregnancy care with personalized treatment plans. Comprehensive monitoring and specialized care for complex pregnancies.',
    url: 'https://dramitashukla.com/services/high-risk-pregnancy',
    siteName: 'Dr. Amita Shukla - Gynecologist & Obstetrician',
    images: [
      {
        url: 'https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png',
        width: 1200,
        height: 630,
        alt: 'High Risk Pregnancy Care by Dr. Amita Shukla',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Risk Pregnancy Care | Dr. Amita Shukla',
    description: 'Expert high-risk pregnancy care with comprehensive monitoring and personalized treatment plans.',
    images: ['https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/services/high-risk-pregnancy',
  },
};

export default function HighRiskPregnancyPage() {
  const serviceUrl = 'https://dramitashukla.com/services/high-risk-pregnancy';
  
  const faqData = [
    {
      question: "What exactly is a high-risk pregnancy?",
      answer: "A high-risk pregnancy is one where the mother or baby has an increased chance of health problems during pregnancy, labor, or delivery. The term 'high-risk' doesn't mean something will definitely go wrong, but rather indicates that closer monitoring and specialized care are needed to ensure the best outcomes for both mother and baby.",
      category: "General Information",
      dateCreated: "2024-01-01"
    },
    {
      question: "Does having a high-risk pregnancy mean my baby will have problems?",
      answer: "No, being classified as high-risk doesn't mean your baby will definitely have problems. Many women with high-risk pregnancies deliver healthy babies with proper care and monitoring. The classification simply means you need extra attention and specialized care to ensure the best possible outcomes.",
      category: "Concerns",
      dateCreated: "2024-01-01"
    },
    {
      question: "How often will I need to visit the doctor during a high-risk pregnancy?",
      answer: "High-risk pregnancies typically require more frequent antenatal visits for closer monitoring. The exact frequency depends on your specific risk factors and how your pregnancy progresses. Your doctor will create a personalized schedule that may include additional tests, ultrasounds, and specialist consultations.",
      category: "Treatment",
      dateCreated: "2024-01-01"
    },
    {
      question: "What specialists might I need to see during my high-risk pregnancy?",
      answer: "Depending on your specific situation, you may be referred to specialists in maternal-fetal medicine, genetics, pediatrics, cardiology, endocrinology, or other relevant fields. The goal is to have a team of experts monitoring different aspects of your health and your baby's development.",
      category: "Treatment",
      dateCreated: "2024-01-01"
    },
    {
      question: "Can I do anything to reduce my pregnancy risks?",
      answer: "Yes, there are several steps you can take: attend all prenatal appointments, maintain a healthy diet, manage weight gain according to medical advice, avoid alcohol, smoking, and drugs, prevent infections, take prescribed medications, and follow your doctor's recommendations closely.",
      category: "Prevention",
      dateCreated: "2024-01-01"
    }
  ];

  const breadcrumbItems = generateServiceBreadcrumb("High Risk Pregnancy Care", "high-risk-pregnancy");

  return (
    <>
      <MedicalServiceSchema
        serviceName="High Risk Pregnancy Care"
        serviceDescription="Expert high-risk pregnancy care with specialized monitoring, comprehensive care for complex pregnancies, and personalized treatment plans to ensure healthy outcomes for both mother and baby."
        serviceUrl={serviceUrl}
        procedureType="Medical Consultation and Monitoring"
        preparation="Bring medical records, previous pregnancy history, and current medications list"
        followup="Regular monitoring appointments scheduled based on risk level and pregnancy progression"
        benefits={[
          "Specialized monitoring for mother and baby",
          "Early detection of potential complications",
          "Coordinated care with multiple specialists",
          "Personalized treatment plans",
          "24/7 emergency support",
          "Advanced diagnostic capabilities"
        ]}
        duration="PT60M"
        recovery="Ongoing monitoring throughout pregnancy"
        cost={{
          minPrice: 1500,
          maxPrice: 5000,
          currency: "₹"
        }}
        bodyLocation="Uterus, reproductive system"
        medicalCode={{
          code: "O09.9",
          codingSystem: "ICD-10"
        }}
      />
      
      <FAQSchema
        faqs={faqData}
        mainEntity="High Risk Pregnancy Care"
        about="High-risk pregnancy management and specialized prenatal care"
        url={serviceUrl}
        name="High Risk Pregnancy Care FAQ"
        description="Frequently asked questions about high-risk pregnancy care by Dr. Amita Shukla at SCT Trust Hospital, Lucknow"
      />
      
      <BreadcrumbSchema
        items={breadcrumbItems}
        currentPageName="High Risk Pregnancy Care"
        currentPageUrl={serviceUrl}
      />
      
      <LuxuryHighRiskPregnancy />
    </>
  );
}