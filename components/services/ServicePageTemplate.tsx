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
            "provider": {
              "@type": "Physician",
              "name": "Dr. Amita Shukla",
              "specialty": "Gynecology and Obstetrics",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "India"
              }
            },
            "location": {
              "@type": "Hospital",
              "name": "SCT Trust Hospital",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh", 
                "addressCountry": "India"
              },
              "telephone": "+91-522-4242424"
            },
            "availableService": {
              "@type": "MedicalTherapy",
              "name": data.service.name,
              "description": data.service.description
            },
            ...data.seo.structuredData
          })
        }}
      />
    </div>
  );
}