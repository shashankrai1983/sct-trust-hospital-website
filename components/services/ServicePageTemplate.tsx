"use client";

import { ServicePageData } from '@/types/services';
import HeroSection from './sections/HeroSection';
import OverviewSection from './sections/OverviewSection';
import ProcessSection from './sections/ProcessSection';
import RiskFactorsSection from './sections/RiskFactorsSection';
import TreatmentSection from './sections/TreatmentSection';
import FAQSection from './sections/FAQSection';
import WarningSection from './sections/WarningSection';
import SOPSection from './sections/SOPSection';
import DifferentiatorsSection from './sections/DifferentiatorsSection';
import CTASection from './sections/CTASection';

interface ServicePageTemplateProps {
  data: ServicePageData;
  className?: string;
}

export default function ServicePageTemplate({ 
  data, 
  className = "" 
}: ServicePageTemplateProps) {
  const {
    hero,
    overview,
    process,
    riskFactors,
    treatments,
    faqs,
    warnings,
    sops,
    differentiators,
    cta,
    config
  } = data;

  // Determine theme classes based on service configuration
  const themeClass = config?.theme === 'forest' 
    ? 'theme-forest' 
    : config?.theme === 'brown' 
    ? 'theme-brown' 
    : 'theme-primary';

  return (
    <div className={`service-page ${themeClass} ${className} overflow-x-hidden`}>
      {/* Emergency Banner (if enabled) */}
      {config?.showEmergencyBanner && (
        <div className="bg-primary-green text-white py-2 px-4 text-center text-sm font-medium">
          <span>🚨 Medical Emergency? Call +91 8303222222 immediately</span>
        </div>
      )}

      {/* Hero Section - Always present */}
      <HeroSection data={hero} service={data.service} />

      {/* Overview Section - Always present */}
      <OverviewSection data={overview} service={data.service} />

      {/* Process Section - Optional */}
      {process && <ProcessSection data={process} service={data.service} />}

      {/* Risk Factors Section - Optional */}
      {riskFactors && <RiskFactorsSection data={riskFactors} service={data.service} />}

      {/* Treatment Options Section - Optional */}
      {treatments && <TreatmentSection data={treatments} service={data.service} />}

      {/* Standard Operating Procedures - Optional */}
      {sops && <SOPSection data={sops} service={data.service} />}

      {/* Warning Signs Section - Optional */}
      {warnings && <WarningSection data={warnings} service={data.service} />}

      {/* What Makes Us Different - Optional */}
      {differentiators && <DifferentiatorsSection data={differentiators} service={data.service} />}


      {/* FAQ Section - Always present */}
      <FAQSection data={faqs} service={data.service} />

      {/* Call to Action Section - Always present */}
      <CTASection data={cta} service={data.service} />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />
      
      {/* FAQ Schema */}
      {faqs && faqs.faqs && faqs.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
      )}
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />
    </div>
  );
}