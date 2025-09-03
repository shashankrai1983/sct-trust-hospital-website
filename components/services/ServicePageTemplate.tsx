"use client";

import { ServicePageData } from '@/types/services';
import { ServiceProvider } from '@/contexts/service-context';
import { 
  generateMedicalServiceSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema, 
  generateOrganizationSchema 
} from '@/lib/service-schema';
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

// Section registry - eliminates special case conditionals
const OPTIONAL_SECTIONS = {
  process: ProcessSection,
  riskFactors: RiskFactorsSection,
  treatments: TreatmentSection,
  sops: SOPSection,
  warnings: WarningSection,
  differentiators: DifferentiatorsSection
} as const;

type OptionalSectionKey = keyof typeof OPTIONAL_SECTIONS;

export default function ServicePageTemplate({ 
  data, 
  className = "" 
}: ServicePageTemplateProps) {
  const { hero, overview, faqs, cta, config } = data;

  // Simple theme selection - no ternary hell
  const themeClass = `theme-${config?.theme || 'forest'}`;

  return (
    <ServiceProvider service={data.service}>
      <div className={`service-page ${themeClass} ${className} overflow-x-hidden`}>
        {/* Emergency Banner (if enabled) */}
        {config?.showEmergencyBanner && (
          <div className="bg-primary-green text-white py-2 px-4 text-center text-sm font-medium">
            <span>🚨 Medical Emergency? Call +91 8303222222 immediately</span>
          </div>
        )}

        {/* Hero Section - Always present */}
        <HeroSection data={hero} />

        {/* Overview Section - Always present */}
        <OverviewSection data={overview} />

        {/* Optional sections - no special cases, just iterate */}
        {Object.entries(OPTIONAL_SECTIONS).map(([key, Component]) => {
          const sectionData = data[key as OptionalSectionKey];
          return sectionData ? (
            <Component key={key} data={sectionData} />
          ) : null;
        })}

        {/* FAQ Section - Always present */}
        <FAQSection data={faqs} />

        {/* Call to Action Section - Always present */}
        <CTASection data={cta} />

        {/* Structured Data - Clean and maintainable */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateMedicalServiceSchema(data))
          }}
        />
        
        {(() => {
          const faqSchema = generateFAQSchema(data);
          return faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(faqSchema)
              }}
            />
          ) : null;
        })()}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(data))
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
        />
      </div>
    </ServiceProvider>
  );
}