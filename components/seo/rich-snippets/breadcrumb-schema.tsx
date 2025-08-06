interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  currentPageName: string;
  currentPageUrl: string;
}

export function BreadcrumbSchema({ 
  items, 
  currentPageName, 
  currentPageUrl 
}: BreadcrumbSchemaProps) {
  // Ensure Home is always first if not provided
  const breadcrumbItems = [
    {
      name: "Home",
      url: "https://dramitashukla.com/",
      position: 1
    },
    ...items.filter(item => item.name !== "Home"), // Avoid duplicates
    {
      name: currentPageName,
      url: currentPageUrl,
      position: items.length + 2
    }
  ];

  // Re-index positions to be sequential
  const indexedItems = breadcrumbItems.map((item, index) => ({
    ...item,
    position: index + 1
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentPageUrl}#breadcrumb`,
    "name": "Breadcrumb Navigation",
    "description": `Navigation path to ${currentPageName}`,
    "itemListElement": indexedItems.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.url,
        "name": item.name,
        "url": item.url,
        "inLanguage": "en-IN",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://dramitashukla.com/#website"
        }
      }
    })),
    "numberOfItems": indexedItems.length
  };

  // Enhanced navigation schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${currentPageUrl}#navigation`,
    "name": "Site Navigation",
    "url": currentPageUrl,
    "inLanguage": "en-IN",
    "hasPart": indexedItems.map(item => ({
      "@type": "WebPage",
      "name": item.name,
      "url": item.url,
      "position": item.position
    })),
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://dramitashukla.com/#website"
    }
  };

  // Create WebPage hierarchy schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${currentPageUrl}#webpage`,
    "name": currentPageName,
    "url": currentPageUrl,
    "description": `${currentPageName} - Dr. Amita Shukla, Gynecologist & Obstetrician at SCT Trust Hospital, Lucknow`,
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://dramitashukla.com/#website",
      "name": "Dr. Amita Shukla - Gynecologist & Obstetrician",
      "url": "https://dramitashukla.com/"
    },
    "about": {
      "@type": "MedicalBusiness",
      "@id": "https://dramitashukla.com/#organization"
    },
    "author": {
      "@type": "Person", 
      "@id": "https://dramitashukla.com/#person"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://dramitashukla.com/#organization"
    },
    "breadcrumb": {
      "@id": `${currentPageUrl}#breadcrumb`
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "main"
    },
    "significantLink": indexedItems.map(item => item.url),
    "relatedLink": [
      "https://dramitashukla.com/services/",
      "https://dramitashukla.com/about/",
      "https://dramitashukla.com/contact/"
    ],
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": currentPageUrl
      },
      {
        "@type": "ShareAction", 
        "target": currentPageUrl
      }
    ],
    "accessibilityAPI": "ARIA",
    "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
    "accessMode": ["textual", "visual"],
    "accessModeSufficient": "textual"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  );
}

// Utility function to generate common breadcrumb patterns
export const generateServiceBreadcrumb = (serviceName: string, serviceSlug: string) => [
  {
    name: "Services",
    url: "https://dramitashukla.com/services/",
    position: 2
  }
];

export const generateAboutBreadcrumb = () => [];

export const generateContactBreadcrumb = () => [];