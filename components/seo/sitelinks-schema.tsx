interface SitelinkItem {
  name: string;
  url: string;
  description: string;
}

interface SitelinksSchemaProps {
  siteUrl?: string;
  siteName?: string;
}

export function SitelinksSchema({ 
  siteUrl = "https://dramitashukla.com",
  siteName = "Dr. Amita Shukla - Best Gynaecologist in Lucknow"
}: SitelinksSchemaProps = {}) {
  
  const sitelinks: SitelinkItem[] = [
    {
      name: "About Dr. Amita Shukla",
      url: `${siteUrl}/about`,
      description: "Learn about Dr. Amita Shukla's qualifications, experience, and expertise in gynecology and obstetrics."
    },
    {
      name: "Our Services",
      url: `${siteUrl}/services`,
      description: "Comprehensive gynecological services including high-risk pregnancy, PCOS treatment, and infertility care."
    },
    {
      name: "Contact Us",
      url: `${siteUrl}/contact`,
      description: "Book an appointment or contact Dr. Amita Shukla at SCT Trust Hospital. Call: +91-8303222222"
    },
    {
      name: "Infertility Treatment",
      url: `${siteUrl}/services/infertility-treatment`,
      description: "Expert fertility evaluation and personalized treatment options for couples trying to conceive."
    },
    {
      name: "Gynecology Treatment",
      url: `${siteUrl}/services`,
      description: "Complete range of gynecological treatments and women's health services by experienced specialists."
    },
    {
      name: "Hysterectomy",
      url: `${siteUrl}/services/laparoscopy`,
      description: "Advanced laparoscopic and minimally invasive gynecological procedures including hysterectomy."
    }
  ];

  // Enhanced Website Schema with Sitelinks
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": siteName,
    "alternateName": "SCT Trust Hospital - Dr. Amita Shukla",
    "url": siteUrl,
    "description": "Best Gynaecologist in Lucknow - Dr. Amita Shukla provides expert gynecological and obstetric care with 10+ years experience at SCT Trust Hospital.",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Dr. Amita Shukla - SCT Trust Hospital",
      "url": siteUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "MedicalOrganization",
      "@id": `${siteUrl}/#organization`
    },
    "sameAs": [
      "https://www.facebook.com/DrAmitaShukla",
      "https://www.instagram.com/dramitashukla",
      "https://www.linkedin.com/in/dramitashukla"
    ]
  };

  // Site Navigation Element Schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${siteUrl}/#sitenavigation`,
    "name": "Main Navigation",
    "url": siteUrl,
    "inLanguage": "en-IN",
    "about": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`
    },
    "hasPart": sitelinks.map((link, index) => ({
      "@type": "WebPage",
      "@id": `${link.url}#webpage`,
      "name": link.name,
      "description": link.description,
      "url": link.url,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`
      },
      "position": index + 1,
      "potentialAction": {
        "@type": "ReadAction",
        "target": link.url
      }
    }))
  };

  // Medical Business Schema with Enhanced Contact Info
  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteUrl}/#medicalbusiness`,
    "name": "Dr. Amita Shukla - SCT Trust Hospital",
    "alternateName": "Best Gynaecologist in Lucknow",
    "description": "Leading gynecologist and obstetrician in Lucknow providing comprehensive women's healthcare services",
    "url": siteUrl,
    "telephone": "+91-8303222222",
    "email": "amitaobg@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SCT Trust Hospital, A-1/7, Sector-H, Aliganj",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226024",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "priceRange": "₹₹",
    "medicalSpecialty": [
      "Gynecology",
      "Obstetrics",
      "Reproductive Medicine",
      "Maternal-Fetal Medicine"
    ],
    "availableService": sitelinks.slice(3).map(link => ({
      "@type": "MedicalService",
      "name": link.name,
      "description": link.description,
      "url": link.url,
      "provider": {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": "Dr. Amita Shukla"
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Services",
      "itemListElement": sitelinks.slice(3).map((link, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "MedicalService",
          "name": link.name,
          "description": link.description,
          "url": link.url
        },
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31"
      }))
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8303222222",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN",
        "url": `${siteUrl}/contact`
      }
    ],
    "sameAs": [
      "https://www.practo.com/lucknow/doctor/dr-amita-shukla-gynecologist",
      "https://www.justdial.com/lucknow/dr-amita-shukla-gynecologist"
    ]
  };

  // Breadcrumb List for Main Navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/#breadcrumb`,
    "name": "Site Navigation",
    "numberOfItems": sitelinks.length,
    "itemListElement": sitelinks.map((link, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": link.name,
      "item": {
        "@type": "WebPage",
        "@id": link.url,
        "name": link.name,
        "description": link.description,
        "url": link.url
      }
    }))
  };

  return (
    <>
      {/* Enhanced Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      
      {/* Site Navigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
      
      {/* Medical Business Schema with Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalBusinessSchema),
        }}
      />
      
      {/* Breadcrumb Navigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}