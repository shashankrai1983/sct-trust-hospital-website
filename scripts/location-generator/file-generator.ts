// Automated File Generation System
// Creates all necessary files for location pages automatically

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { LocationSEOData } from '@/types/location';
import type { ResearchResult } from './research-module';
import type { GeneratedContent } from './content-generator';
import { processLocationName, generateLocationSlug, generateSEOTitle, generateSEODescription, generateKeywords } from '@/data/locations/location-schema';
import { RegistryManager, type RegistryUpdateResult } from './registry-manager';

export interface FileGenerationConfig {
  projectRoot: string;
  dryRun: boolean;
  overwriteExisting: boolean;
  backupExisting: boolean;
  generateAssets: boolean;
  updateRegistry: boolean;
}

export interface GeneratedFiles {
  locationDataFile: string;
  pageRouteFile: string;
  sitemapEntry: string;
  assetFiles: string[];
  backupFiles: string[];
  registryEntry: string | null;
}

export interface FileGenerationResult {
  success: boolean;
  files: GeneratedFiles;
  errors: string[];
  warnings: string[];
  stats: {
    filesCreated: number;
    filesUpdated: number;
    filesSkipped: number;
    totalSize: number;
  };
  registryResult: RegistryUpdateResult | null;
}

/**
 * Location Data File Generator
 * Creates TypeScript location data files
 */
export class LocationDataGenerator {
  
  static generateLocationDataFile(
    location: string,
    research: ResearchResult,
    content: GeneratedContent
  ): string {
    const locationSlug = generateLocationSlug(location);
    
    const template = `// ${location} Location Data - Auto-generated
import type { LocationSEOData } from '@/types/location';

const ${this.toCamelCase(location)}Data: LocationSEOData = {
  slug: '${locationSlug}',
  name: '${location}',
  displayName: '${location}',
  coordinates: {
    latitude: ${research.geographic.coordinates.latitude},
    longitude: ${research.geographic.coordinates.longitude}
  },
  pinCode: '${research.geographic.pinCode}',

  demographics: {
    population: '${research.demographic.population}',
    averageAge: '${research.demographic.averageAge}',
    economicProfile: '${research.demographic.economicProfile}',
    primaryProfessions: ${JSON.stringify(research.demographic.primaryProfessions, null, 6)},
    lifestyle: ${JSON.stringify(research.demographic.lifestyle, null, 6)},
    healthcareExpectations: [
      'Quality medical care',
      'Convenient accessibility',
      'Personalized attention',
      'Modern facilities'
    ]
  },

  healthProfile: {
    commonConcerns: ${JSON.stringify(research.healthcare.commonConcerns, null, 6)},
    lifestyleFactors: ${JSON.stringify(research.healthcare.lifestyleFactors, null, 6)},
    environmentalFactors: ${JSON.stringify(research.healthcare.environmentalFactors, null, 6)},
    ageGroupFocus: 'Women aged ${research.demographic.averageAge}, focus on comprehensive health'
  },

  competitors: ${JSON.stringify(this.formatCompetitors(research.competitive.competitors), null, 2)},

  serviceFocus: {
    primary: ${JSON.stringify(this.generatePrimaryServices(research, location), null, 6)},
    secondary: ${JSON.stringify(this.generateSecondaryServices(research, location), null, 6)},
    unique: ${JSON.stringify(this.generateUniqueServices(research, location), null, 6)},
    packages: ${JSON.stringify(this.generatePackages(research, location), null, 6)}
  },

  patientStories: ${JSON.stringify(this.generatePatientStories(research, location), null, 2)},

  accessibility: {
    publicTransport: {
      metro: ${JSON.stringify(research.transport.publicTransport.metro, null, 8)},
      bus: ${JSON.stringify(research.transport.publicTransport.bus, null, 8)}
    },
    drivingRoutes: {
      primary: '${research.transport.drivingRoutes.primary}',
      alternative: '${research.transport.drivingRoutes.alternative}'
    },
    landmarks: ${JSON.stringify(research.geographic.landmarks, null, 6)},
    parking: {
      available: true,
      capacity: '50+ vehicles',
      cost: 'Free for patients',
      valetService: false
    },
    bestVisitingHours: [
      '10:00 AM - 12:00 PM',
      '3:00 PM - 5:00 PM',
      '6:00 PM - 7:00 PM'
    ]
  },

  communityInitiatives: {
    healthCamps: [
      'Monthly women\\'s health awareness programs in ${location}',
      'PCOS screening camps for ${location} residents',
      'Preventive care workshops'
    ],
    partnerships: [
      'Local healthcare facility collaborations',
      'Educational institution health programs',
      'Community center partnerships'
    ],
    awarenessPrograms: [
      'Reproductive health education for ${location} women',
      'Lifestyle disease prevention seminars',
      'Maternal health awareness drives'
    ],
    preventiveCare: [
      'Annual health screening packages',
      'Pre-marital counseling programs',
      'Family planning education'
    ],
    corporateTieups: [
      'Local company employee wellness programs',
      'Corporate health screening initiatives'
    ]
  },

  insuranceAndCosts: {
    popularInsurance: ${JSON.stringify(research.healthcare.insuranceProviders, null, 6)},
    consultationFee: '₹1500 (First consultation), ₹1000 (Follow-up)',
    packageDeals: ${JSON.stringify(this.generatePackageDeals(research, location), null, 6)},
    paymentOptions: [
      'Cash payments accepted',
      'Credit/Debit cards (Visa, Mastercard, RuPay)',
      'UPI payments (GPay, PhonePe, Paytm)',
      'Net Banking',
      'Insurance cashless facilities'
    ],
    corporatePackages: ${this.shouldHaveCorporatePackages(research.demographic.economicProfile)},
    emiOptions: true,
    costComparison: 'Competitive with area standards while maintaining premium quality'
  },

  uniquePositioning: {
    tagline: '${this.generateTagline(research, location)}',
    keyFeatures: ${JSON.stringify(this.generateKeyFeatures(research, location), null, 6)},
    contentTone: '${this.getContentTone(research.demographic.economicProfile)}',
    differentiators: ${JSON.stringify(this.generateDifferentiators(research, location), null, 6)}
  },

  seoData: {
    title: '${content.seoData.title}',
    description: '${content.seoData.description}',
    keywords: ${JSON.stringify(content.seoData.keywords, null, 6)},
    schema: {
      serviceArea: {
        geoRadius: '5000'
      }
    }
  }
};

export default ${this.toCamelCase(location)}Data;`;

    return template;
  }

  // Helper methods for data transformation
  private static toCamelCase(str: string): string {
    return str.replace(/[-\s](.)/g, (_, char) => char.toUpperCase())
              .replace(/^(.)/, char => char.toLowerCase());
  }

  private static formatCompetitors(competitors: any[]): any[] {
    return competitors.map(comp => ({
      name: comp.name,
      hospital: comp.hospital || undefined,
      specialties: comp.specialties,
      advantages: comp.advantages,
      disadvantages: comp.disadvantages,
      distance: comp.distance
    }));
  }

  private static generatePrimaryServices(research: ResearchResult, location: string): string[] {
    const baseServices = [
      'Comprehensive Gynecological Consultations',
      'High-Risk Pregnancy Management',
      'PCOS/PCOD Treatment and Management',
      'Fertility Evaluation and Treatment',
      'Advanced Laparoscopic Procedures'
    ];

    // Add services based on demographics
    if (research.demographic.economicProfile === 'upper-middle-class') {
      baseServices.push('Executive Health Packages for Professional Women');
    }

    return baseServices;
  }

  private static generateSecondaryServices(research: ResearchResult, location: string): string[] {
    return [
      'Antenatal and Postnatal Care',
      'Family Planning Consultations',
      'Menstrual Disorder Treatment',
      'Contraception Counseling',
      'Well Women Health Screenings'
    ];
  }

  private static generateUniqueServices(research: ResearchResult, location: string): string[] {
    const unique = [
      `Flexible scheduling for ${location} residents`,
      'Personalized treatment plans',
      'Comprehensive follow-up care'
    ];

    if (research.demographic.economicProfile.includes('upper')) {
      unique.push('Premium consultation experiences');
    }

    return unique;
  }

  private static generatePackages(research: ResearchResult, location: string): string[] {
    const packages = [
      'Comprehensive Women\'s Health Package (₹12,000)',
      'Pregnancy Care Package (₹20,000)',
      'PCOS Management Program (₹10,000)'
    ];

    if (research.demographic.economicProfile === 'upper-middle-class') {
      packages.push('Executive Health Package (₹25,000)');
    }

    return packages;
  }

  private static generatePatientStories(research: ResearchResult, location: string): any[] {
    const stories = [
      {
        id: `story-${location.toLowerCase().replace(/\s+/g, '-')}-1`,
        patientProfile: {
          age: 32,
          profession: research.demographic.primaryProfessions[0] || 'Professional',
          background: `Working professional from ${location} with health concerns`
        },
        initialConcern: 'Irregular menstrual cycles and reproductive health issues',
        treatmentApproach: 'Comprehensive evaluation and personalized treatment plan',
        journey: `The convenient location in ${location} made regular follow-ups manageable despite busy schedule`,
        outcome: 'Successful treatment and improved quality of life',
        locationBenefit: `Easy accessibility from ${location} without disrupting work schedule`,
        testimonialQuote: `Dr. Amita's care and the convenient location made my treatment journey smooth and successful.`,
        patientName: 'Priya'
      },
      {
        id: `story-${location.toLowerCase().replace(/\s+/g, '-')}-2`,
        patientProfile: {
          age: 28,
          profession: research.demographic.primaryProfessions[1] || 'Professional',
          background: `Young woman from ${location} seeking preventive care`
        },
        initialConcern: 'Preventive health screening and family planning guidance',
        treatmentApproach: 'Comprehensive health assessment and counseling',
        journey: `Living in ${location}, the proximity to Dr. Amita's clinic was perfect for regular check-ups`,
        outcome: 'Well-informed health decisions and preventive care plan',
        locationBenefit: `Close proximity to ${location} ensured consistent preventive care`,
        testimonialQuote: `The accessible location and comprehensive care gave me confidence in my health decisions.`,
        patientName: 'Anjali'
      }
    ];

    return stories;
  }

  private static generatePackageDeals(research: ResearchResult, location: string): string[] {
    return [
      `${location} Residents Special - 10% discount on annual packages`,
      'Family Health Package - Comprehensive care for mother and daughter',
      'Preventive Care Bundle - Annual screening with follow-up consultations'
    ];
  }

  private static shouldHaveCorporatePackages(economicProfile: string): boolean {
    return economicProfile.includes('upper') || economicProfile === 'mixed';
  }

  private static generateTagline(research: ResearchResult, location: string): string {
    const taglines = {
      'upper-class': `Premium Gynecological Care for ${location}`,
      'upper-middle-class': `Executive Women's Health Services in ${location}`,
      'middle-class': `Comprehensive Women's Healthcare for ${location} Families`,
      'mixed': `Quality Gynecological Care for ${location} Community`
    };

    return taglines[research.demographic.economicProfile as keyof typeof taglines] || 
           `Quality Women's Healthcare in ${location}`;
  }

  private static generateKeyFeatures(research: ResearchResult, location: string): string[] {
    const base = [
      '10+ Years Specialized Experience',
      `Conveniently Located for ${location} Residents`,
      'Personalized Care Approach',
      'Comprehensive Women\'s Health Services'
    ];

    if (research.demographic.economicProfile.includes('upper')) {
      base.push('Premium Care Experience');
    }

    return base;
  }

  private static getContentTone(economicProfile: string): string {
    const tones = {
      'upper-class': 'professional',
      'upper-middle-class': 'professional',
      'middle-class': 'caring',
      'mixed': 'accessible'
    };

    return tones[economicProfile as keyof typeof tones] || 'caring';
  }

  private static generateDifferentiators(research: ResearchResult, location: string): string[] {
    return [
      'Personalized care vs. corporate hospital approach',
      `Convenient accessibility from ${location}`,
      'Comprehensive women\'s health focus',
      'Flexible scheduling for working professionals',
      'Cost-effective quality care',
      'Experienced specialist with proven track record'
    ];
  }
}

/**
 * Page Route Generator
 * Creates Next.js dynamic route pages
 */
export class PageRouteGenerator {
  
  static generatePageRoute(location: string): string {
    const locationSlug = generateLocationSlug(location);
    
    const template = `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPageTemplate from '@/components/templates/LocationPageTemplate';
import { BreadcrumbSchema, generateLocationBreadcrumb } from '@/components/seo/rich-snippets/breadcrumb-schema';
import { MedicalServiceSchema } from '@/components/seo/rich-snippets/medical-service-schema';
import ${this.toCamelCase(location)}Data from '@/data/locations/${locationSlug}';

// Metadata for ${location} page
export const metadata: Metadata = {
  title: ${this.toCamelCase(location)}Data.seoData.title,
  description: ${this.toCamelCase(location)}Data.seoData.description,
  keywords: ${this.toCamelCase(location)}Data.seoData.keywords.join(', '),
  
  // Open Graph for social sharing
  openGraph: {
    title: ${this.toCamelCase(location)}Data.seoData.title,
    description: ${this.toCamelCase(location)}Data.seoData.description,
    url: \`https://www.dramitashukla.com/gynecologist-in-${locationSlug}\`,
    siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
    images: [{
      url: '/images/dr-amita-shukla-og.jpg',
      width: 1200,
      height: 630,
      alt: \`Dr. Amita Shukla - Best Gynaecologist in ${location}\`,
    }],
    locale: 'en_IN',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: ${this.toCamelCase(location)}Data.seoData.title,
    description: ${this.toCamelCase(location)}Data.seoData.description,
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
    'geo.position': \`\${${this.toCamelCase(location)}Data.coordinates.latitude};\${${this.toCamelCase(location)}Data.coordinates.longitude}\`,
    'ICBM': \`\${${this.toCamelCase(location)}Data.coordinates.latitude}, \${${this.toCamelCase(location)}Data.coordinates.longitude}\`,
    'og:locality': '${location}',
    'og:region': 'Uttar Pradesh',
    'og:country-name': 'India',
  },

  // Canonical URL
  alternates: {
    canonical: \`https://www.dramitashukla.com/gynecologist-in-${locationSlug}\`,
  },
};

export default function ${this.toPascalCase(location)}GynecologistPage() {
  const pageUrl = \`https://www.dramitashukla.com/gynecologist-in-${locationSlug}\`;
  const breadcrumbItems = generateLocationBreadcrumb('${location}', '${locationSlug}');

  // Generate structured data for the page
  const generateLocationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "@id": \`\${pageUrl}#organization\`,
      "name": \`Dr. Amita Shukla - Best Gynaecologist in ${location}\`,
      "alternateName": \`Dr. Amita Shukla ${location}\`,
      "description": ${this.toCamelCase(location)}Data.seoData.description,
      "url": pageUrl,
      "image": {
        "@type": "ImageObject",
        "url": "https://www.dramitashukla.com/images/dr-amita-shukla.jpg",
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
        "latitude": ${this.toCamelCase(location)}Data.coordinates.latitude,
        "longitude": ${this.toCamelCase(location)}Data.coordinates.longitude
      },
      "telephone": "+91-8303222222",
      "email": "amitaobg@gmail.com",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": ${this.toCamelCase(location)}Data.coordinates.latitude,
          "longitude": ${this.toCamelCase(location)}Data.coordinates.longitude
        },
        "geoRadius": ${this.toCamelCase(location)}Data.seoData.schema.serviceArea.geoRadius
      },
      "medicalSpecialty": [
        "Gynecology",
        "Obstetrics", 
        "Reproductive Medicine",
        "Maternal-Fetal Medicine"
      ],
      "availableService": ${this.toCamelCase(location)}Data.serviceFocus.primary.map(service => ({
        "@type": "MedicalProcedure",
        "name": service
      })),
      "areaServed": [
        {
          "@type": "City",
          "name": "${location}",
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
        currentPageName={\`Gynecologist in ${location}\`}
        currentPageUrl={pageUrl}
      />

      {/* Medical Service Schema */}
      <MedicalServiceSchema
        serviceName={\`Gynecological Care in ${location}\`}
        description={\`Comprehensive gynecological and obstetric services for residents of ${location}, Lucknow\`}
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
        areaServed="${location}"
        availableServices={${this.toCamelCase(location)}Data.serviceFocus.primary}
        url={pageUrl}
      />

      {/* Main Content */}
      <LocationPageTemplate 
        location={${this.toCamelCase(location)}Data}
        nearbyLocations={[]}
        relatedServices={[]}
      />
    </>
  );
}`;

    return template;
  }

  private static toCamelCase(str: string): string {
    return str.replace(/[-\s](.)/g, (_, char) => char.toUpperCase())
              .replace(/^(.)/, char => char.toLowerCase());
  }

  private static toPascalCase(str: string): string {
    return str.replace(/[-\s](.)/g, (_, char) => char.toUpperCase())
              .replace(/^(.)/, char => char.toUpperCase());
  }
}

/**
 * Sitemap Generator
 * Creates sitemap entries for new pages
 */
export class SitemapGenerator {
  
  static generateSitemapEntry(location: string): string {
    const locationSlug = generateLocationSlug(location);
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>https://www.dramitashukla.com/gynecologist-in-${locationSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  static updateSitemapFile(projectRoot: string, entries: string[]): void {
    const sitemapPath = join(projectRoot, 'public', 'sitemap-locations.xml');
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

    writeFileSync(sitemapPath, sitemapContent, 'utf8');
    
    // Update main sitemap index
    this.updateMainSitemap(projectRoot);
  }

  private static updateMainSitemap(projectRoot: string): void {
    const mainSitemapPath = join(projectRoot, 'public', 'sitemap.xml');
    const currentDate = new Date().toISOString().split('T')[0];
    
    const mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.dramitashukla.com/sitemap-pages.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.dramitashukla.com/sitemap-services.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.dramitashukla.com/sitemap-blog.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.dramitashukla.com/sitemap-locations.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

    writeFileSync(mainSitemapPath, mainSitemapContent, 'utf8');
  }
}

/**
 * File System Manager
 * Handles all file operations safely
 */
export class FileSystemManager {
  
  static ensureDirectoryExists(dirPath: string): void {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  }

  static createBackup(filePath: string): string | null {
    if (!existsSync(filePath)) {
      return null;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.backup.${timestamp}`;
    
    try {
      const content = require('fs').readFileSync(filePath, 'utf8');
      writeFileSync(backupPath, content, 'utf8');
      return backupPath;
    } catch (error) {
      console.error(`Failed to create backup for ${filePath}:`, error);
      return null;
    }
  }

  static writeFileSafely(filePath: string, content: string, config: FileGenerationConfig): boolean {
    try {
      // Create backup if file exists and backup is enabled
      let backupPath: string | null = null;
      if (config.backupExisting && existsSync(filePath)) {
        backupPath = this.createBackup(filePath);
      }

      // Check if file exists and overwrite is disabled
      if (existsSync(filePath) && !config.overwriteExisting) {
        console.warn(`File ${filePath} already exists and overwrite is disabled`);
        return false;
      }

      // Ensure directory exists
      const dirPath = require('path').dirname(filePath);
      this.ensureDirectoryExists(dirPath);

      // Write file (or simulate for dry run)
      if (config.dryRun) {
        console.log(`[DRY RUN] Would write file: ${filePath}`);
        console.log(`[DRY RUN] Content length: ${content.length} characters`);
        return true;
      } else {
        writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Created file: ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error(`❌ Failed to write file ${filePath}:`, error);
      return false;
    }
  }

  static getFileSize(content: string): number {
    return Buffer.byteLength(content, 'utf8');
  }
}

/**
 * Main Automated File Generation System
 */
export class AutomatedFileGenerator {
  
  static async generateLocationFiles(
    location: string,
    research: ResearchResult,
    content: GeneratedContent,
    config: FileGenerationConfig
  ): Promise<FileGenerationResult> {
    
    console.log(`🗂️  Starting file generation for ${location}`);
    
    const result: FileGenerationResult = {
      success: false,
      files: {
        locationDataFile: '',
        pageRouteFile: '',
        sitemapEntry: '',
        assetFiles: [],
        backupFiles: [],
        registryEntry: null
      },
      errors: [],
      warnings: [],
      stats: {
        filesCreated: 0,
        filesUpdated: 0,
        filesSkipped: 0,
        totalSize: 0
      },
      registryResult: null
    };

    try {
      const locationSlug = generateLocationSlug(location);
      
      // Generate location data file
      const locationDataContent = LocationDataGenerator.generateLocationDataFile(location, research, content);
      const locationDataPath = join(config.projectRoot, 'data', 'locations', `${locationSlug}.ts`);
      
      if (FileSystemManager.writeFileSafely(locationDataPath, locationDataContent, config)) {
        result.files.locationDataFile = locationDataPath;
        result.stats.filesCreated++;
        result.stats.totalSize += FileSystemManager.getFileSize(locationDataContent);
      } else {
        result.errors.push(`Failed to create location data file: ${locationDataPath}`);
      }

      // Generate page route file
      const pageRouteContent = PageRouteGenerator.generatePageRoute(location);
      const pageRoutePath = join(config.projectRoot, 'app', `gynecologist-in-${locationSlug}`, 'page.tsx');
      
      if (FileSystemManager.writeFileSafely(pageRoutePath, pageRouteContent, config)) {
        result.files.pageRouteFile = pageRoutePath;
        result.stats.filesCreated++;
        result.stats.totalSize += FileSystemManager.getFileSize(pageRouteContent);
      } else {
        result.errors.push(`Failed to create page route file: ${pageRoutePath}`);
      }

      // Generate sitemap entry
      const sitemapEntry = SitemapGenerator.generateSitemapEntry(location);
      result.files.sitemapEntry = sitemapEntry;
      
      if (!config.dryRun) {
        try {
          // Read existing sitemap entries
          const existingSitemapPath = join(config.projectRoot, 'public', 'sitemap-locations.xml');
          let existingEntries: string[] = [];
          
          if (existsSync(existingSitemapPath)) {
            const existingContent = require('fs').readFileSync(existingSitemapPath, 'utf8');
            const matches = existingContent.match(/<url>[\s\S]*?<\/url>/g);
            if (matches) {
              existingEntries = matches;
            }
          }
          
          // Add new entry if not exists
          if (!existingEntries.some(entry => entry.includes(`gynecologist-in-${locationSlug}`))) {
            existingEntries.push(sitemapEntry);
            SitemapGenerator.updateSitemapFile(config.projectRoot, existingEntries);
            result.stats.filesUpdated++;
          }
        } catch (error) {
          result.warnings.push(`Failed to update sitemap: ${error}`);
        }
      }

      // Generate additional assets if enabled
      if (config.generateAssets) {
        // This could include generating images, icons, etc.
        // For now, we'll skip this but the structure is here
        result.warnings.push('Asset generation not implemented yet');
      }

      // Update location registry if enabled and files were created successfully
      if (config.updateRegistry && result.stats.filesCreated > 0 && result.errors.length === 0) {
        console.log(`📋 Updating location registry for ${location}...`);
        
        try {
          const registryResult = await RegistryManager.addLocationToRegistry(
            location,
            research,
            config.projectRoot,
            {
              dryRun: config.dryRun,
              backupExisting: config.backupExisting
            }
          );
          
          result.registryResult = registryResult;
          
          if (registryResult.success) {
            result.files.registryEntry = `${registryResult.action}: ${registryResult.entry?.displayName}`;
            if (registryResult.action === 'created') {
              result.stats.filesUpdated++; // Registry file was updated
            }
            console.log(`✅ Registry updated successfully for ${location} (${registryResult.action})`);
          } else {
            result.warnings.push(`Registry update failed: ${registryResult.errors.join(', ')}`);
            console.warn(`⚠️  Registry update failed for ${location}:`, registryResult.errors);
          }

          // Add any registry warnings to our warnings
          if (registryResult.warnings.length > 0) {
            result.warnings.push(...registryResult.warnings);
          }
          
        } catch (registryError) {
          const errorMessage = `Registry update error: ${registryError}`;
          result.warnings.push(errorMessage);
          console.error(`❌ Registry update failed for ${location}:`, registryError);
        }
      } else if (config.updateRegistry) {
        console.log(`📋 Registry update skipped for ${location} (files creation failed or disabled)`);
      }

      // Calculate success
      result.success = result.errors.length === 0 && result.stats.filesCreated > 0;
      
      if (result.success) {
        console.log(`✅ File generation completed for ${location}`);
        console.log(`📊 Stats: ${result.stats.filesCreated} files created, ${result.stats.totalSize} bytes total`);
      } else {
        console.log(`❌ File generation failed for ${location}`);
        console.log(`❌ Errors: ${result.errors.join(', ')}`);
      }
      
      return result;

    } catch (error) {
      result.errors.push(`File generation failed: ${error}`);
      result.success = false;
      console.error(`❌ File generation failed for ${location}:`, error);
      return result;
    }
  }

  static getDefaultConfig(projectRoot: string): FileGenerationConfig {
    return {
      projectRoot,
      dryRun: false,
      overwriteExisting: false,
      backupExisting: true,
      generateAssets: false,
      updateRegistry: true
    };
  }

  static validateConfig(config: FileGenerationConfig): string[] {
    const errors: string[] = [];
    
    if (!config.projectRoot) {
      errors.push('Project root path is required');
    }
    
    if (!existsSync(config.projectRoot)) {
      errors.push(`Project root path does not exist: ${config.projectRoot}`);
    }
    
    // Check required directories exist
    const requiredDirs = ['data', 'app', 'public'];
    for (const dir of requiredDirs) {
      const dirPath = join(config.projectRoot, dir);
      if (!existsSync(dirPath)) {
        errors.push(`Required directory does not exist: ${dirPath}`);
      }
    }
    
    return errors;
  }
}

export default AutomatedFileGenerator;