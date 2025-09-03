import { ServicePageData } from '@/types/services';

/**
 * Generate structured data schema for medical services
 * Eliminates hardcoded schema in template components
 */
export function generateMedicalServiceSchema(data: ServicePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": data.service.name,
    "description": data.service.description,
    "url": data.seo.canonicalUrl,
    "image": data.hero.image,
    "provider": {
      "@type": "Physician",
      "name": "Dr. Amita Shukla",
      "specialty": "Gynecology and Obstetrics",
      "url": "https://dramitashukla.com/about",
      "image": "https://dramitashukla.com/images/dr-amita-shukla.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SCT Trust Hospital",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226001",
        "addressCountry": "IN"
      },
      "telephone": "+91-8303222222",
      "email": "contact@dramitashukla.com"
    },
    "location": {
      "@type": "Hospital",
      "name": "SCT Trust Hospital",
      "url": "https://dramitashukla.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SCT Trust Hospital",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226001", 
        "addressCountry": "IN"
      },
      "telephone": "+91-522-4242424"
    },
    "availableService": {
      "@type": "MedicalTherapy",
      "name": data.service.name,
      "description": data.service.description,
      "url": data.seo.canonicalUrl
    },
    "medicalSpecialty": "Obstetrics and Gynecology",
    "serviceArea": {
      "@type": "City",
      "name": "Lucknow",
      "containedInPlace": {
        "@type": "State", 
        "name": "Uttar Pradesh",
        "containedInPlace": {
          "@type": "Country",
          "name": "India"
        }
      }
    },
    "keywords": data.seo.keywords.join(", "),
    "inLanguage": "en-IN",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Physician",
      "name": "Dr. Amita Shukla"
    },
    "publisher": {
      "@type": "Hospital",
      "name": "SCT Trust Hospital",
      "url": "https://dramitashukla.com"
    },
    ...data.seo.structuredData
  };
}

export function generateFAQSchema(data: ServicePageData) {
  const { faqs } = data;
  
  if (!faqs?.faqs?.length) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": `${data.service.name} FAQ`,
    "url": data.seo.canonicalUrl,
    "mainEntity": faqs.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(data: ServicePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dramitashukla.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://dramitashukla.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.service.name,
        "item": data.seo.canonicalUrl
      }
    ]
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "SCT Trust Hospital",
    "alternateName": "Dr. Amita Shukla Clinic",
    "url": "https://dramitashukla.com",
    "logo": "https://dramitashukla.com/images/logo.png",
    "image": "https://dramitashukla.com/images/sct-trust-hospital.jpg",
    "description": "Leading gynecology and obstetrics hospital in Lucknow providing comprehensive women's healthcare services by Dr. Amita Shukla.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SCT Trust Hospital",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226001",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8303222222",
        "contactType": "Appointments",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-522-4242424",
        "contactType": "Hospital Reception",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "founder": {
      "@type": "Physician",
      "name": "Dr. Amita Shukla",
      "specialty": "Gynecology and Obstetrics"
    },
    "medicalSpecialty": "Obstetrics and Gynecology",
    "serviceArea": {
      "@type": "City",
      "name": "Lucknow"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "sameAs": [
      "https://facebook.com/dramitashukla",
      "https://instagram.com/dramitashukla",
      "https://linkedin.com/in/dramitashukla"
    ]
  };
}