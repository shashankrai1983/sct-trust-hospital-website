import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High-Risk Pregnancy Assessment | Maternal Health Risk Calculator | Dr. Amita Shukla | SCT Trust Hospital Lucknow',
  description: 'Professional high-risk pregnancy assessment tool with evidence-based scoring system. Early identification of pregnancy complications with specialized guidance from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.',
  keywords: [
    'high risk pregnancy assessment',
    'pregnancy risk calculator',
    'maternal health screening',
    'pregnancy complications',
    'high risk pregnancy factors',
    'preeclampsia risk',
    'gestational diabetes screening',
    'pregnancy risk evaluation',
    'maternal health assessment',
    'pregnancy monitoring',
    'Dr. Amita Shukla',
    'SCT Trust Hospital',
    'Lucknow high risk pregnancy',
    'maternal fetal medicine',
    'pregnancy specialist'
  ],
  openGraph: {
    title: 'High-Risk Pregnancy Assessment - Professional Risk Evaluation | Dr. Amita Shukla',
    description: 'Professional high-risk pregnancy assessment tool with evidence-based scoring system. Early identification of pregnancy complications with specialized medical guidance.',
    type: 'website',
    url: 'https://dramitashukla.com/calculators/high-risk-pregnancy-assessment',
    images: [
      {
        url: '/images/calculators/high-risk-pregnancy-assessment-og.jpg',
        width: 1200,
        height: 630,
        alt: 'High-Risk Pregnancy Assessment - Dr. Amita Shukla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Risk Pregnancy Assessment | Dr. Amita Shukla',
    description: 'Professional high-risk pregnancy assessment tool with evidence-based scoring system for early complication identification.',
    images: ['/images/calculators/high-risk-pregnancy-assessment-og.jpg'],
  },
  alternates: {
    canonical: 'https://dramitashukla.com/calculators/high-risk-pregnancy-assessment',
  },
  other: {
    'medical-disclaimer': 'This pregnancy risk assessment tool is for educational purposes only and does not replace professional medical evaluation. Results are estimates based on general risk factors. Always consult with Dr. Amita Shukla or a qualified healthcare provider for comprehensive pregnancy care and personalized risk assessment.',
  },
};

export default function HighRiskPregnancyAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}