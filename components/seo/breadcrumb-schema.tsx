'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  customBreadcrumbs?: BreadcrumbItem[];
}

export function BreadcrumbSchema({ customBreadcrumbs }: BreadcrumbSchemaProps) {
  const pathname = usePathname();

  useEffect(() => {
    let breadcrumbs: BreadcrumbItem[];

    if (customBreadcrumbs) {
      breadcrumbs = customBreadcrumbs;
    } else {
      // Auto-generate breadcrumbs from pathname
      breadcrumbs = generateBreadcrumbsFromPath(pathname);
    }

    if (breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map(item => ({
          "@type": "ListItem",
          "position": item.position,
          "name": item.name,
          "item": `https://dramitashukla.com${item.url}`
        }))
      };

      // Remove existing breadcrumb schema
      const existingScript = document.querySelector('script[data-schema="breadcrumb"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new breadcrumb schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'breadcrumb');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    return () => {
      const schemaScript = document.querySelector('script[data-schema="breadcrumb"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [pathname, customBreadcrumbs]);

  return null;
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: "Home",
      url: "/",
      position: 1
    }
  ];

  if (pathname === '/') {
    return breadcrumbs;
  }

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const breadcrumbName = getBreadcrumbName(segment, pathSegments, index);
    
    breadcrumbs.push({
      name: breadcrumbName,
      url: currentPath,
      position: index + 2
    });
  });

  return breadcrumbs;
}

function getBreadcrumbName(segment: string, pathSegments: string[], index: number): string {
  // Custom mappings for better breadcrumb names
  const segmentMappings: Record<string, string> = {
    'about': 'About Dr. Amita Shukla',
    'services': 'Gynecology Services',
    'contact': 'Contact & Location',
    'book-appointment': 'Book Appointment',
    'patient-resources': 'Patient Resources',
    'faq': 'Frequently Asked Questions',
    'reviews': 'Patient Reviews',
    'high-risk-pregnancy': 'High-Risk Pregnancy Care',
    'pcos-treatment': 'PCOS/PCOD Treatment',
    'infertility-care': 'Infertility Treatment',
    'normal-delivery': 'Normal Delivery Services',
    'cesarean-section': 'Cesarean Section',
    'laparoscopic-surgery': 'Laparoscopic Surgery',
    'hysteroscopy': 'Hysteroscopy',
    'menopause-management': 'Menopause Management',
    'prenatal-care': 'Prenatal Care',
    'postnatal-care': 'Postnatal Care',
    'family-planning': 'Family Planning',
    'gynecologic-oncology': 'Gynecologic Oncology',
    'aliganj': 'Aliganj Location',
    'gomti-nagar': 'Gomti Nagar Area',
    'indira-nagar': 'Indira Nagar Area',
    'hazratganj': 'Hazratganj Area',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service'
  };

  // Check if we have a custom mapping
  if (segmentMappings[segment]) {
    return segmentMappings[segment];
  }

  // For location pages
  if (pathSegments[index - 1] === 'location' || pathSegments[index - 1] === 'gynecologist-in') {
    return `Gynecologist in ${segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')}`;
  }

  // For service pages
  if (pathSegments[index - 1] === 'services') {
    return segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  // Default: capitalize and replace hyphens with spaces
  return segment.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Predefined breadcrumbs for specific pages
export const predefinedBreadcrumbs = {
  about: [
    { name: "Home", url: "/", position: 1 },
    { name: "About Dr. Amita Shukla", url: "/about", position: 2 }
  ],
  services: [
    { name: "Home", url: "/", position: 1 },
    { name: "Gynecology Services", url: "/services", position: 2 }
  ],
  contact: [
    { name: "Home", url: "/", position: 1 },
    { name: "Contact & Location", url: "/contact", position: 2 }
  ],
  highRiskPregnancy: [
    { name: "Home", url: "/", position: 1 },
    { name: "Services", url: "/services", position: 2 },
    { name: "High-Risk Pregnancy Care", url: "/services/high-risk-pregnancy", position: 3 }
  ],
  pcosGynecologist: [
    { name: "Home", url: "/", position: 1 },
    { name: "Services", url: "/services", position: 2 },
    { name: "PCOS/PCOD Treatment", url: "/services/pcos-treatment", position: 3 }
  ]
};