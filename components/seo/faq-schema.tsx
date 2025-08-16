'use client';

import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqItems: FAQItem[];
}

export function FAQSchema({ faqItems }: FAQSchemaProps) {
  useEffect(() => {
    // Only add FAQ schema if we have items
    if (!faqItems || faqItems.length === 0) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // Remove existing FAQ schema if present
    const existingScript = document.querySelector('script[data-schema="faq"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaScript = document.querySelector('script[data-schema="faq"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [faqItems]);

  return null; // This component doesn't render anything
}

// Common gynecology FAQ data for reuse
export const gynecologyFAQs: FAQItem[] = [
  {
    question: "What services does Dr. Amita Shukla provide as a gynecologist in Lucknow?",
    answer: "Dr. Amita Shukla provides comprehensive gynecological services including high-risk pregnancy management, PCOS/PCOD treatment, infertility care, normal delivery, cesarean section, laparoscopic surgery, hysteroscopy, menopause management, and general women's health consultations."
  },
  {
    question: "How to book an appointment with Dr. Amita Shukla in Lucknow?",
    answer: "You can book an appointment with Dr. Amita Shukla by calling SCT Trust Hospital directly, using our online appointment booking system on this website, or visiting the hospital in person at Aliganj, Lucknow. We also offer emergency consultation services."
  },
  {
    question: "What are the consultation hours at SCT Trust Hospital?",
    answer: "Dr. Amita Shukla is available for consultations Monday through Saturday from 10:00 AM to 8:00 PM. Sunday consultations are available by appointment only. For emergency cases, 24/7 support is provided."
  },
  {
    question: "Does Dr. Amita Shukla handle high-risk pregnancies?",
    answer: "Yes, Dr. Amita Shukla is specially trained in high-risk pregnancy management and has completed advanced training from The American College of Obstetricians and Gynecologists (USA). She has successfully managed over 10,000 deliveries including complex high-risk cases."
  },
  {
    question: "What makes Dr. Amita Shukla the best gynecologist in Lucknow?",
    answer: "Dr. Amita Shukla is considered among the best gynecologists in Lucknow due to her 20+ years of experience, gold medal academic achievements, advanced international training, over 10,000 successful deliveries, expertise in high-risk pregnancies, and compassionate patient care approach."
  },
  {
    question: "What PCOS/PCOD treatments are available at SCT Trust Hospital?",
    answer: "SCT Trust Hospital offers comprehensive PCOS/PCOD treatment including hormonal therapy, lifestyle modification guidance, fertility treatments, weight management programs, and surgical interventions when necessary. Dr. Amita Shukla provides personalized treatment plans based on individual patient needs."
  },
  {
    question: "Are laparoscopic surgeries performed at SCT Trust Hospital?",
    answer: "Yes, Dr. Amita Shukla is an experienced laparoscopic surgeon and performs various minimally invasive procedures including laparoscopic ovarian cyst removal, endometriosis treatment, hysterectomy, and fertility-related surgeries using advanced laparoscopic techniques."
  },
  {
    question: "What infertility treatments are available in Lucknow with Dr. Amita Shukla?",
    answer: "Dr. Amita Shukla provides comprehensive infertility evaluation and treatment including ovulation induction, intrauterine insemination (IUI), fertility counseling, hormonal assessments, and surgical correction of fertility-related issues. She works with patients to develop personalized fertility treatment plans."
  }
];

// Location-specific FAQ for local SEO
export const lucknowLocationFAQs: FAQItem[] = [
  {
    question: "Where is SCT Trust Hospital located in Lucknow?",
    answer: "SCT Trust Hospital is located at A-1/7, Chandrapath Road, near Kendriya Bhawan, Sector H, Aliganj, Lucknow, Uttar Pradesh - 226024. The hospital is easily accessible from all parts of Lucknow including Gomti Nagar, Indira Nagar, and other major areas."
  },
  {
    question: "Which areas of Lucknow does Dr. Amita Shukla serve?",
    answer: "Dr. Amita Shukla serves patients from all areas of Lucknow including Aliganj, Gomti Nagar, Indira Nagar, Hazratganj, Aminabad, Chowk, Kaiserbagh, Mahanagar, and surrounding districts. The central location of SCT Trust Hospital makes it accessible from anywhere in Lucknow."
  }
];