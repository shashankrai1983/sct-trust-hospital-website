// Location-specific data types for SEO location pages

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Demographics {
  population: string;
  averageAge: string;
  economicProfile: 'upper-class' | 'upper-middle-class' | 'middle-class' | 'lower-middle-class' | 'mixed';
  primaryProfessions: string[];
  lifestyle: string[];
  healthcareExpectations: string[];
}

export interface HealthProfile {
  commonConcerns: string[];
  lifestyleFactors: string[];
  environmentalFactors: string[];
  ageGroupFocus: string;
}

export interface CompetitorInfo {
  name: string;
  hospital?: string;
  specialties: string[];
  advantages: string[];
  disadvantages: string[];
  distance: string;
}

export interface ServiceFocus {
  primary: string[];
  secondary: string[];
  unique: string[];
  packages: string[];
}

export interface PatientStory {
  id: string;
  patientProfile: {
    age: number;
    profession: string;
    background: string;
  };
  initialConcern: string;
  treatmentApproach: string;
  journey: string;
  outcome: string;
  locationBenefit: string;
  testimonialQuote: string;
  patientName: string; // First name only for privacy
}

export interface AccessibilityInfo {
  publicTransport: {
    metro: string[];
    bus: string[];
  };
  drivingRoutes: {
    primary: string;
    alternative: string;
  };
  landmarks: string[];
  parking: {
    available: boolean;
    capacity: string;
    cost: string;
    valetService: boolean;
  };
  bestVisitingHours: string[];
}

export interface CommunityInitiatives {
  healthCamps: string[];
  partnerships: string[];
  awarenessPrograms: string[];
  preventiveCare: string[];
  corporateTieups: string[];
}

export interface InsuranceAndCosts {
  popularInsurance: string[];
  consultationFee: string;
  packageDeals: string[];
  paymentOptions: string[];
  corporatePackages: boolean;
  emiOptions: boolean;
  costComparison: string;
}

export interface LocationSEOData {
  slug: string;
  name: string;
  displayName: string;
  coordinates: LocationCoordinates;
  pinCode: string;
  demographics: Demographics;
  healthProfile: HealthProfile;
  competitors: CompetitorInfo[];
  serviceFocus: ServiceFocus;
  patientStories: PatientStory[];
  accessibility: AccessibilityInfo;
  communityInitiatives: CommunityInitiatives;
  insuranceAndCosts: InsuranceAndCosts;
  uniquePositioning: {
    tagline: string;
    keyFeatures: string[];
    contentTone: string;
    differentiators: string[];
  };
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    schema: {
      serviceArea: {
        geoRadius: string;
      };
    };
  };
}

export interface LocationPageProps {
  location: LocationSEOData;
  nearbyLocations?: string[];
  relatedServices?: string[];
}

// Helper types for component props
export interface HeroSectionProps {
  locationName: string;
  tagline: string;
  keyFeatures: string[];
}

export interface DemographicsSectionProps {
  demographics: Demographics;
  healthProfile: HealthProfile;
  locationName: string;
}

export interface CompetitiveSectionProps {
  competitors: CompetitorInfo[];
  locationName: string;
  differentiators: string[];
}

export interface ServicesSectionProps {
  serviceFocus: ServiceFocus;
  locationName: string;
  demographics: Demographics;
}

export interface PatientStoriesSectionProps {
  patientStories: PatientStory[];
  locationName: string;
}

export interface AccessibilitySectionProps {
  accessibility: AccessibilityInfo;
  locationName: string;
}

export interface CommunitySectionProps {
  communityInitiatives: CommunityInitiatives;
  locationName: string;
}

export interface CostsSectionProps {
  insuranceAndCosts: InsuranceAndCosts;
  locationName: string;
}

// Template configuration types
export interface LocationPageConfig {
  showAllSections: boolean;
  sectionsToShow: ('hero' | 'demographics' | 'competitive' | 'services' | 'stories' | 'accessibility' | 'community' | 'costs')[];
  customCTA: string;
  emergencyContact: boolean;
}