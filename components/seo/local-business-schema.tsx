'use client';

import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  includeServiceAreas?: boolean;
  includeOpeningHours?: boolean;
  includeMedicalServices?: boolean;
}

export function LocalBusinessSchema({ 
  includeServiceAreas = true,
  includeOpeningHours = true,
  includeMedicalServices = true
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["Hospital", "MedicalClinic", "LocalBusiness"],
      "name": "SCT Trust Hospital",
      "alternateName": "SC Trivedi Memorial Mother And Child Trust Hospital",
      "description": "Leading hospital in Lucknow providing comprehensive gynecological and obstetric care under the expertise of Dr. Amita Shukla, the best gynecologist in Lucknow.",
      
      // Primary location and contact
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A-1/7, Chandrapath Road, near Kendriya Bhawan",
        "addressLocality": "Aliganj",
        "addressRegion": "Lucknow",
        "postalCode": "226024",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.8467,
        "longitude": 80.9462
      },
      "telephone": "+91-522-XXXXXXX", // Add actual phone number
      "email": "info@dramitashukla.com",
      "url": "https://dramitashukla.com",
      
      // Medical specialty and services
      "medicalSpecialty": [
        "Gynecology",
        "Obstetrics",
        "Reproductive Medicine",
        "Maternal-Fetal Medicine",
        "Gynecologic Surgery"
      ],
      
      ...(includeMedicalServices && {
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gynecological Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "High-Risk Pregnancy Management",
                "description": "Specialized care for high-risk pregnancies with advanced monitoring and treatment"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "PCOS/PCOD Treatment",
                "description": "Comprehensive treatment for polycystic ovary syndrome"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Infertility Treatment",
                "description": "Advanced fertility treatments and reproductive care"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Laparoscopic Surgery",
                "description": "Minimally invasive gynecological surgery"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Normal Delivery",
                "description": "Natural childbirth with expert medical support"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Cesarean Section",
                "description": "Safe surgical delivery when medically necessary"
              }
            }
          ]
        }
      }),
      
      // Service areas in Lucknow
      ...(includeServiceAreas && {
        "areaServed": [
          {
            "@type": "Place",
            "name": "Aliganj, Lucknow"
          },
          {
            "@type": "Place", 
            "name": "Gomti Nagar, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Indira Nagar, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Hazratganj, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Aminabad, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Chowk, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Kaiserbagh, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Mahanagar, Lucknow"
          },
          {
            "@type": "Place",
            "name": "Lucknow, Uttar Pradesh, India"
          }
        ]
      }),
      
      // Opening hours
      ...(includeOpeningHours && {
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "18:00"
          }
        ]
      }),
      
      // Chief Medical Officer
      "employee": {
        "@type": "Physician",
        "name": "Dr. Amita Shukla",
        "jobTitle": "Chief Gynecologist & Medical Director",
        "medicalSpecialty": ["Gynecology", "Obstetrics"],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "educationalLevel": "Master of Surgery",
            "about": "MS in Obstetrics and Gynecology"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "about": "High-Risk Pregnancy Management - American College of Obstetricians and Gynecologists"
          }
        ],
        "experienceRequirements": "20+ years of clinical experience",
        "qualifications": "Gold medalist in MBBS, MS in Obstetrics and Gynecology, Advanced training in High-Risk Pregnancy"
      },
      
      // Hospital accreditation and certifications
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "about": "Licensed Medical Facility - Government of Uttar Pradesh"
        }
      ],
      
      // Social media and online presence
      "sameAs": [
        "https://www.facebook.com/dramitashukla",
        "https://www.instagram.com/dramitashukla",
        "https://twitter.com/dramitashukla",
        "https://www.linkedin.com/in/dramitashukla"
      ],
      
      // Additional business info
      "foundingDate": "2010",
      "slogan": "Expert Gynecological Care with Compassion",
      "brand": {
        "@type": "Brand",
        "name": "Dr. Amita Shukla - Best Gynecologist in Lucknow"
      },
      
      // Payment options
      "paymentAccepted": [
        "Cash",
        "Credit Card",
        "Debit Card", 
        "UPI",
        "Insurance"
      ],
      
      // Accessibility
      "isAccessibleForFree": false,
      "smokingAllowed": false,
      
      // Additional contact methods
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-522-XXXXXXX",
          "contactType": "customer support",
          "availableLanguage": ["Hindi", "English"],
          "hoursAvailable": "Mo-Sa 10:00-20:00, Su 10:00-18:00"
        },
        {
          "@type": "ContactPoint",
          "contactType": "emergency",
          "telephone": "+91-XXXXXXXXXX",
          "availableLanguage": ["Hindi", "English"], 
          "hoursAvailable": "24/7"
        }
      ]
    };

    // Remove existing local business schema
    const existingScript = document.querySelector('script[data-schema="local-business"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new local business schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'local-business');
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="local-business"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [includeServiceAreas, includeOpeningHours, includeMedicalServices]);

  return null;
}