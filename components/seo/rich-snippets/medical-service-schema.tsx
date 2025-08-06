interface MedicalServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  procedureType: string;
  preparation?: string;
  followup?: string;
  benefits: string[];
  risks?: string[];
  duration?: string;
  recovery?: string;
  cost?: {
    minPrice?: number;
    maxPrice?: number;
    currency: string;
  };
  bodyLocation?: string;
  medicalCode?: {
    code: string;
    codingSystem: string;
  };
}

export function MedicalServiceSchema({
  serviceName,
  serviceDescription,
  serviceUrl,
  procedureType,
  preparation,
  followup,
  benefits,
  risks,
  duration,
  recovery,
  cost,
  bodyLocation,
  medicalCode
}: MedicalServiceSchemaProps) {
  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${serviceUrl}#medical-procedure`,
    "name": serviceName,
    "description": serviceDescription,
    "url": serviceUrl,
    "procedureType": procedureType,
    "preparation": preparation,
    "followup": followup,
    "bodyLocation": bodyLocation,
    "medicalCode": medicalCode ? {
      "@type": "MedicalCode",
      "code": medicalCode.code,
      "codingSystem": medicalCode.codingSystem
    } : undefined,
    "performer": {
      "@type": "Physician",
      "@id": "https://dramitashukla.com/#person",
      "name": "Dr. Amita Shukla",
      "jobTitle": "Gynecologist & Obstetrician",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "MS (OBS & GYNAE)"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "credentialCategory": "degree",
          "name": "MBBS (Gold Medalist)"
        }
      ],
      "yearsOfExperience": 10,
      "medicalSpecialty": ["Gynecology", "Obstetrics"],
      "worksFor": {
        "@type": "MedicalOrganization",
        "@id": "https://dramitashukla.com/#organization",
        "name": "SCT Trust Hospital"
      }
    },
    "location": {
      "@type": "MedicalOrganization",
      "@id": "https://dramitashukla.com/#organization"
    },
    "includedInHealthInsurancePlan": true,
    "availableLanguage": ["en", "hi"],
    "status": "Available",
    "category": "Gynecological Procedure"
  };

  // Add cost information if provided
  if (cost) {
    medicalProcedureSchema["priceRange"] = cost.minPrice && cost.maxPrice 
      ? `${cost.currency}${cost.minPrice}-${cost.currency}${cost.maxPrice}`
      : `${cost.currency}${cost.minPrice || cost.maxPrice}`;
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${serviceUrl}#how-to-procedure`,
    "name": `How ${serviceName} Works`,
    "description": `Step-by-step process for ${serviceName} at SCT Trust Hospital with Dr. Amita Shukla`,
    "image": {
      "@type": "ImageObject",
      "url": `https://dramitashukla.com/images/${serviceName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      "width": 1200,
      "height": 630
    },
    "totalTime": duration || "PT60M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Medical consultation"
      },
      {
        "@type": "HowToSupply", 
        "name": "Medical records and test results"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Advanced medical equipment"
      },
      {
        "@type": "HowToTool",
        "name": "Ultrasound machine"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Initial Consultation",
        "text": "Comprehensive medical history and physical examination with Dr. Amita Shukla",
        "url": `${serviceUrl}#consultation`,
        "image": {
          "@type": "ImageObject",
          "url": "https://dramitashukla.com/images/consultation.jpg"
        }
      },
      {
        "@type": "HowToStep", 
        "position": 2,
        "name": "Diagnostic Assessment",
        "text": "Detailed diagnostic tests and evaluations to assess your condition",
        "url": `${serviceUrl}#diagnosis`,
        "image": {
          "@type": "ImageObject",
          "url": "https://dramitashukla.com/images/diagnosis.jpg"
        }
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Treatment Plan",
        "text": "Personalized treatment plan tailored to your specific needs and condition",
        "url": `${serviceUrl}#treatment-plan`,
        "image": {
          "@type": "ImageObject",
          "url": "https://dramitashukla.com/images/treatment-plan.jpg"
        }
      },
      {
        "@type": "HowToStep",
        "position": 4, 
        "name": "Ongoing Care",
        "text": "Regular follow-up appointments and continuous monitoring throughout treatment",
        "url": `${serviceUrl}#follow-up`,
        "image": {
          "@type": "ImageObject",
          "url": "https://dramitashukla.com/images/follow-up.jpg"
        }
      }
    ],
    "estimatedCost": cost ? {
      "@type": "MonetaryAmount",
      "currency": cost.currency,
      "value": cost.minPrice || cost.maxPrice || 0
    } : undefined,
    "performer": {
      "@id": "https://dramitashukla.com/#person"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": `${serviceUrl}#medical-service`,
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@id": "https://dramitashukla.com/#organization"
    },
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "serviceType": "In-person consultation",
        "serviceLocation": {
          "@id": "https://dramitashukla.com/#organization"
        }
      },
      {
        "@type": "ServiceChannel",
        "serviceType": "Emergency consultation", 
        "availableLanguage": ["English", "Hindi"],
        "servicePhone": "+91-8303222222"
      }
    ],
    "category": "Medical Consultation",
    "serviceType": procedureType,
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": {
      "@type": "City",
      "name": "Lucknow", 
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalProcedureSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}