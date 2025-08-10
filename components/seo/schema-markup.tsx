export function SchemaMarkup() {
  // Enhanced Local Business Schema with more detailed information
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness"],
    "@id": "https://dramitashukla.com/#organization",
    "name": "SCT Trust Hospital - Dr. Amita Shukla",
    "alternateName": "Dr. Amita Shukla Gynecologist",
    "description": "Best gynaecologist in Lucknow specializing in women's health, high-risk pregnancy, PCOS treatment, and fertility care",
    "url": "https://dramitashukla.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dramitashukla.com/logo.png",
      "width": 400,
      "height": 400
    },
    "image": {
      "@type": "ImageObject", 
      "url": "https://dramitashukla.com/images/sct-trust-hospital.jpg",
      "width": 1200,
      "height": 800
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SCT Trust Hospital, Sector-2, Viraj Khand",
      "addressLocality": "Gomti Nagar",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    "telephone": "+91-8303222222",
    "email": "amitaobg@gmail.com",
    "openingHours": [
      "Mo-Sa 09:00-18:00",
      "Su 10:00-14:00"
    ],
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Card, UPI, Insurance",
    
    "medicalSpecialty": [
      "Gynecology",
      "Obstetrics", 
      "Reproductive Medicine",
      "Maternal-Fetal Medicine"
    ],
    
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "High-Risk Pregnancy Care",
        "description": "Specialized care for complex pregnancies"
      },
      {
        "@type": "MedicalProcedure", 
        "name": "PCOS/PCOD Treatment",
        "description": "Comprehensive PCOS management and treatment"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Infertility Treatment", 
        "description": "Fertility evaluation and treatment options"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Laparoscopic Surgery",
        "description": "Minimally invasive gynecological procedures"
      }
    ],

    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "educationalLevel": "PostGraduate",
        "name": "MS (OBS & GYNAE)"
      }
    ],

    "areaServed": [
      {
        "@type": "City",
        "name": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      }
    ],

    "sameAs": [
      "https://www.facebook.com/DrAmitaShukla",
      "https://www.instagram.com/dramitashukla",
      "https://www.linkedin.com/in/dramitashukla",
      "https://www.practo.com/lucknow/doctor/dr-amita-shukla-gynecologist",
      "https://www.justdial.com/lucknow/dr-amita-shukla-gynecologist"
    ],
    
    // Enhanced ratings and reviews
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 150,
      "bestRating": 5,
      "worstRating": 1
    },
    
    // Patient testimonials and reviews
    "review": [
      {
        "@type": "Review",
        "@id": "https://dramitashukla.com/#review1",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Priya Sharma"
        },
        "reviewBody": "Dr. Amita Shukla at SCT Trust Hospital provided excellent care during my high-risk pregnancy. Her expertise and compassionate approach made all the difference.",
        "datePublished": "2024-01-15",
        "itemReviewed": {
          "@type": "MedicalOrganization",
          "@id": "https://dramitashukla.com/#organization",
          "name": "Dr. Amita Shukla - SCT Trust Hospital"
        }
      },
      {
        "@type": "Review",
        "@id": "https://dramitashukla.com/#review2",
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Anjali Gupta"
        },
        "reviewBody": "Best gynecologist in Lucknow. Dr. Amita at SCT Trust Hospital helped me with my PCOS treatment and I feel much better now.",
        "datePublished": "2024-02-10",
        "itemReviewed": {
          "@type": "MedicalOrganization",
          "@id": "https://dramitashukla.com/#organization",
          "name": "Dr. Amita Shukla - SCT Trust Hospital"
        }
      },
      {
        "@type": "Review",
        "@id": "https://dramitashukla.com/#review3",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Sunita Singh"
        },
        "reviewBody": "Excellent infertility treatment at SCT Trust Hospital. Dr. Amita's personalized care helped us conceive after years of trying.",
        "datePublished": "2024-03-05",
        "itemReviewed": {
          "@type": "MedicalOrganization",
          "@id": "https://dramitashukla.com/#organization",
          "name": "Dr. Amita Shukla - SCT Trust Hospital"
        }
      }
    ],
    
    // Enhanced contact points
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8303222222",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-8303222222",
        "contactType": "emergency",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN"
      }
    ],
    
    // Additional organizational details
    "foundingDate": "2013",
    "employee": [
      {
        "@type": "Person",
        "@id": "https://dramitashukla.com/#person"
      }
    ],
    "department": [
      {
        "@type": "MedicalOrganization",
        "name": "Gynecology & Obstetrics Department",
        "medicalSpecialty": ["Gynecology", "Obstetrics"],
        "employee": {
          "@id": "https://dramitashukla.com/#person"
        }
      }
    ],
    
    // Insurance and payment information
    "healthPlanNetworkTier": "Tier 1",
    "acceptedPaymentMethod": [
      "http://purl.org/goodrelations/v1#Cash",
      "http://purl.org/goodrelations/v1#PaymentMethodCreditCard",
      "http://purl.org/goodrelations/v1#MobilePayment"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://dramitashukla.com/#person",
    "name": "Dr. Amita Shukla",
    "alternateName": "Amita Shukla",
    "description": "Best gynaecologist in Lucknow with 10+ years experience specializing in high-risk pregnancy and women's health",
    "image": {
      "@type": "ImageObject",
      "url": "https://dramitashukla.com/images/dr-amita-shukla.jpg",
      "width": 400,
      "height": 400
    },
    "jobTitle": "Gynecologist & Obstetrician",
    "worksFor": {
      "@id": "https://dramitashukla.com/#organization"
    },
    "url": "https://dramitashukla.com/about",
    "sameAs": [
      "https://www.practo.com/dr-amita-shukla",
      "https://www.justdial.com/dr-amita-shukla"
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "King George's Medical University",
        "address": "Lucknow, Uttar Pradesh"
      }
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Gynecologist",
      "occupationLocation": {
        "@type": "City",
        "name": "Lucknow"
      },
      "experienceRequirements": "10+ years",
      "skills": [
        "High-Risk Pregnancy Management",
        "PCOS Treatment", 
        "Infertility Treatment",
        "Laparoscopic Surgery",
        "Hysteroscopy"
      ]
    },
    "award": [
      "Gold Medalist - MBBS",
      "Best Gynecologist Award 2023"
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dramitashukla.com/#website",
    "url": "https://dramitashukla.com",
    "name": "Dr. Amita Shukla - Best Gynaecologist in Lucknow",
    "description": "Leading gynecologist in Lucknow providing comprehensive women's healthcare services",
    "publisher": {
      "@id": "https://dramitashukla.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dramitashukla.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-IN"
  };

  // Additional schemas for enhanced SEO
  const medicalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://dramitashukla.com/#medical-clinic",
    "name": "Dr. Amita Shukla - Gynecology Clinic",
    "description": "Premier gynecology and obstetrics clinic in Lucknow specializing in women's health, high-risk pregnancy, PCOS treatment, and fertility care",
    "url": "https://dramitashukla.com",
    "telephone": "+91-8303222222",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SCT Trust Hospital, Sector-2, Viraj Khand",
      "addressLocality": "Gomti Nagar", 
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226010",
      "addressCountry": "IN"
    },
    "medicalSpecialty": [
      "Gynecology",
      "Obstetrics",
      "Reproductive Medicine",
      "Maternal-Fetal Medicine",
      "Reproductive Endocrinology"
    ],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "High-Risk Pregnancy Care"
      },
      {
        "@type": "MedicalTherapy",
        "name": "PCOS/PCOD Treatment"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Laparoscopic Surgery"
      },
      {
        "@type": "MedicalTherapy", 
        "name": "Infertility Treatment"
      }
    ],
    "physician": {
      "@id": "https://dramitashukla.com/#person"
    },
    "openingHours": [
      "Mo-Sa 09:00-18:00",
      "Su 10:00-14:00"
    ],
    "priceRange": "₹₹",
    "acceptsReservations": true,
    "hasMap": "https://maps.google.com/?q=SCT+Trust+Hospital+Lucknow"
  };

  const healthAndMedicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness", 
    "@id": "https://dramitashukla.com/#health-business",
    "name": "Dr. Amita Shukla - Women's Health Specialist",
    "description": "Leading women's health specialist in Lucknow providing comprehensive gynecological and obstetric care",
    "url": "https://dramitashukla.com",
    "image": "https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png",
    "founder": {
      "@id": "https://dramitashukla.com/#person"
    },
    "specialty": [
      "Women's Health",
      "Reproductive Health", 
      "Maternal Health",
      "Hormonal Health"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 26.8467,
        "longitude": 80.9462
      },
      "geoRadius": "50000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gynecological Consultation",
          "category": "Medical Consultation"
        },
        "price": "1500",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Pregnancy Care Package",
          "category": "Prenatal Care"
        },
        "price": "25000",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalClinicSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(healthAndMedicalBusinessSchema),
        }}
      />
    </>
  );
}