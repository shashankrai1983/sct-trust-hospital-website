import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPageTemplate from '@/components/templates/LocationPageTemplate';
import { BreadcrumbSchema, generateLocationBreadcrumb } from '@/components/seo/rich-snippets/breadcrumb-schema';
import { MedicalServiceSchema } from '@/components/seo/rich-snippets/medical-service-schema';
import type { LocationSEOData } from '@/types/location';

// Get location data using registry-driven imports for automatic location support
const getLocationData = async (locationSlug: string): Promise<LocationSEOData | null> => {
  console.log('🔍 Loading location data for:', locationSlug);
  
  // Validate location slug first
  if (!locationSlug || typeof locationSlug !== 'string') {
    console.error('Invalid location slug provided:', locationSlug);
    return null;
  }

  try {
    // Import registry to validate location exists
    const { isValidLocationSlug } = await import('@/data/locations/registry');
    
    // Check if location exists in registry
    if (!isValidLocationSlug(locationSlug)) {
      console.error(`Location not found in registry: ${locationSlug}`);
      return null;
    }

    // Dynamic import based on location slug
    const locationModule = await import(`@/data/locations/${locationSlug}`);
    const locationData = locationModule.default as LocationSEOData;
    
    if (!locationData || !locationData.slug) {
      console.error(`Invalid location data for: ${locationSlug}`);
      return null;
    }
    
    console.log('✅ Location data loaded successfully:', locationData.displayName);
    return locationData;
  } catch (error) {
    console.error(`Location data not found for: ${locationSlug}`, error);
    return null;
  }
};

// Generate static params for all locations (for static generation)
export async function generateStaticParams() {
  // In development, return empty array to allow dynamic routing
  if (process.env.NODE_ENV === 'development') {
    return [];
  }
  
  try {
    // Import registry and get all active location slugs
    const { getLocationSlugsForStaticGeneration } = await import('@/data/locations/registry');
    const locationSlugs = getLocationSlugsForStaticGeneration();
    
    // Return dynamic location parameters from registry
    return locationSlugs.map(slug => ({
      location: slug
    }));
  } catch (error) {
    console.error('Failed to generate static params from registry:', error);
    
    // Fallback to existing locations if registry fails
    return [
      { location: 'gomti-nagar' },
      { location: 'hazratganj' },
      { location: 'jankipuram-extension' }
    ];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { location: string } 
}): Promise<Metadata> {
  const locationData = await getLocationData(params.location);

  if (!locationData) {
    return {
      title: 'Location Not Found - Dr. Amita Shukla',
      description: 'The requested location page was not found.'
    };
  }

  const pageUrl = `https://dramitashukla.com/gynecologist-in/${params.location}`;

  return {
    title: locationData.seoData.title,
    description: locationData.seoData.description,
    keywords: locationData.seoData.keywords.join(', '),
    
    // Open Graph for social sharing
    openGraph: {
      title: locationData.seoData.title,
      description: locationData.seoData.description,
      url: pageUrl,
      siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
      images: [{
        url: '/images/dr-amita-shukla-og.jpg',
        width: 1200,
        height: 630,
        alt: `Dr. Amita Shukla - Best Gynaecologist in ${locationData.displayName}`,
      }],
      locale: 'en_IN',
      type: 'website',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: locationData.seoData.title,
      description: locationData.seoData.description,
      images: ['/images/dr-amita-shukla-twitter.jpg'],
      creator: '@DrAmitaShukla',
    },

    // Robots and indexing
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Local SEO
    other: {
      'geo.region': 'IN-UP',
      'geo.placename': 'Lucknow',
      'geo.position': `${locationData.coordinates.latitude};${locationData.coordinates.longitude}`,
      'ICBM': `${locationData.coordinates.latitude}, ${locationData.coordinates.longitude}`,
      'og:locality': locationData.displayName,
      'og:region': 'Uttar Pradesh',
      'og:country-name': 'India',
    },

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function LocationPage({ 
  params 
}: { 
  params: { location: string } 
}) {
  console.log('🚀 LocationPage component called with params:', params);
  
  const locationData = await getLocationData(params.location);

  if (!locationData) {
    console.log('❌ Location data not found, showing 404');
    notFound();
  }

  const pageUrl = `https://dramitashukla.com/gynecologist-in/${params.location}`;
  const breadcrumbItems = generateLocationBreadcrumb(locationData.displayName, params.location);

  // Generate structured data for the page
  const generateLocationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "@id": `${pageUrl}#organization`,
      "name": `Dr. Amita Shukla - Best Gynaecologist in ${locationData.displayName}`,
      "alternateName": `Dr. Amita Shukla ${locationData.displayName}`,
      "description": locationData.seoData.description,
      "url": pageUrl,
      "image": {
        "@type": "ImageObject",
        "url": "https://dramitashukla.com/images/dr-amita-shukla.jpg",
        "width": 400,
        "height": 400
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
        "latitude": locationData.coordinates.latitude,
        "longitude": locationData.coordinates.longitude
      },
      "telephone": "+91-8303222222",
      "email": "amitaobg@gmail.com",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": locationData.coordinates.latitude,
          "longitude": locationData.coordinates.longitude
        },
        "geoRadius": locationData.seoData.schema.serviceArea.geoRadius
      },
      "medicalSpecialty": [
        "Gynecology",
        "Obstetrics",
        "Reproductive Medicine",
        "Maternal-Fetal Medicine"
      ],
      "availableService": locationData.serviceFocus.primary.map(service => ({
        "@type": "MedicalProcedure",
        "name": service
      })),
      "areaServed": [
        {
          "@type": "City",
          "name": locationData.displayName,
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      ],
      "physician": {
        "@type": "Person",
        "name": "Dr. Amita Shukla",
        "jobTitle": "Gynecologist & Obstetrician",
        "telephone": "+91-8303222222",
        "email": "amitaobg@gmail.com"
      },
      "openingHours": [
        "Mo-Sa 09:00-18:00",
        "Su 10:00-14:00"
      ],
      "priceRange": "₹₹",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 150,
        "bestRating": 5,
        "worstRating": 1
      }
    };
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocationSchema()),
        }}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={breadcrumbItems}
        currentPageName={`Gynecologist in ${locationData.displayName}`}
        currentPageUrl={pageUrl}
      />

      {/* Medical Service Schema */}
      <MedicalServiceSchema
        serviceName={`Gynecological Care in ${locationData.displayName}`}
        description={`Comprehensive gynecological and obstetric services for residents of ${locationData.displayName}, Lucknow`}
        provider={{
          name: "Dr. Amita Shukla",
          telephone: "+91-8303222222",
          address: {
            streetAddress: "SCT Trust Hospital, Sector-2, Viraj Khand",
            addressLocality: "Gomti Nagar",
            addressRegion: "Uttar Pradesh",
            postalCode: "226010",
            addressCountry: "IN"
          }
        }}
        areaServed={locationData.displayName}
        availableServices={locationData.serviceFocus.primary}
        url={pageUrl}
      />

      {/* Main Content */}
      <LocationPageTemplate 
        location={locationData}
        nearbyLocations={[]} // This could be populated with nearby areas
        relatedServices={[]} // This could be populated with related service pages
      />
    </>
  );
}