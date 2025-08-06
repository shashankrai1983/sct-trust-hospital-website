interface PersonProfileSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  url: string;
  telephone?: string;
  email?: string;
  yearsOfExperience?: number;
  awards?: string[];
  education?: Array<{
    degree: string;
    institution: string;
    year?: string;
    location?: string;
    honors?: string;
  }>;
  specialties?: string[];
  languages?: string[];
  publications?: Array<{
    title: string;
    datePublished: string;
    publisher?: string;
    url?: string;
  }>;
  memberOf?: Array<{
    name: string;
    url?: string;
  }>;
  sameAs?: string[];
}

export function PersonProfileSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  telephone,
  email,
  yearsOfExperience,
  awards = [],
  education = [],
  specialties = [],
  languages = [],
  publications = [],
  memberOf = [],
  sameAs = []
}: PersonProfileSchemaProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "MedicalBusiness"],
    "@id": `${url}#person`,
    "name": name,
    "alternateName": name.replace("Dr. ", ""),
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": image,
      "width": 400,
      "height": 400,
      "contentUrl": image
    },
    "jobTitle": jobTitle,
    "url": url,
    "telephone": telephone,
    "email": email,
    "gender": "Female",
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "worksFor": {
      "@type": "MedicalOrganization",
      "@id": "https://dramitashukla.com/#organization",
      "name": "SCT Trust Hospital",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector-2, Viraj Khand",
        "addressLocality": "Gomti Nagar",
        "addressRegion": "Uttar Pradesh", 
        "postalCode": "226010",
        "addressCountry": "IN"
      }
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": jobTitle,
      "occupationLocation": {
        "@type": "City",
        "name": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "experienceRequirements": `${yearsOfExperience}+ years`,
      "skills": specialties,
      "responsibilities": [
        "High-risk pregnancy management",
        "Infertility diagnosis and treatment", 
        "PCOS/PCOD treatment",
        "Minimally invasive gynecological surgery",
        "Antenatal and postnatal care",
        "Women's health consultation"
      ]
    },
    "knowsAbout": specialties,
    "knowsLanguage": languages.map(lang => ({
      "@type": "Language",
      "name": lang
    })),
    "award": awards,
    "hasCredential": education.map(edu => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "degree",
      "educationalLevel": edu.degree.includes("MS") ? "PostGraduate" : 
                           edu.degree.includes("MBBS") ? "Graduate" : "Diploma",
      "name": edu.degree,
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": edu.institution,
        "address": edu.location
      },
      "dateCreated": edu.year,
      "honors": edu.honors
    })),
    "alumniOf": education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "address": edu.location
    })),
    "memberOf": memberOf.map(org => ({
      "@type": "Organization",
      "name": org.name,
      "url": org.url
    })),
    "sameAs": sameAs,
    "subjectOf": publications.map(pub => ({
      "@type": "Article",
      "headline": pub.title,
      "datePublished": pub.datePublished,
      "publisher": {
        "@type": "Organization",
        "name": pub.publisher
      },
      "url": pub.url,
      "author": {
        "@id": `${url}#person`
      }
    })),
    "performerIn": [
      {
        "@type": "MedicalProcedure",
        "name": "High Risk Pregnancy Care",
        "description": "Specialized care for complex pregnancies"
      },
      {
        "@type": "MedicalProcedure", 
        "name": "PCOS/PCOD Treatment",
        "description": "Comprehensive PCOS management"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Infertility Treatment",
        "description": "Fertility evaluation and treatment"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Laparoscopic Surgery",
        "description": "Minimally invasive procedures"
      }
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Medical Consultation",
        "serviceType": "Healthcare"
      },
      "availability": "https://schema.org/InStock",
      "availableDeliveryMethod": "https://schema.org/OnSitePickup",
      "businessFunction": "https://schema.org/Provide"
    }
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile-page`,
    "mainEntity": {
      "@id": `${url}#person`
    },
    "name": `About ${name} - Professional Profile`,
    "description": `Professional profile page for ${name}, ${jobTitle} at SCT Trust Hospital, Lucknow`,
    "url": url,
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://dramitashukla.com/#website"
    },
    "about": {
      "@id": `${url}#person`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": image
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@id": `${url}#person`
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://dramitashukla.com/#organization"
    }
  };

  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${url}#medical-business`,
    "name": `${name} - ${jobTitle}`,
    "description": description,
    "founder": {
      "@id": `${url}#person`
    },
    "employee": {
      "@id": `${url}#person`
    },
    "medicalSpecialty": specialties,
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Card", "UPI", "Insurance"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Gynecological Consultation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Obstetric Care"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure", 
            "name": "Reproductive Health Services"
          }
        }
      ]
    },
    "openingHours": [
      "Mo-Sa 09:00-18:00",
      "Su 10:00-14:00"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": telephone,
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalBusinessSchema),
        }}
      />
    </>
  );
}