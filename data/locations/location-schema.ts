// Base schema structure for location data
// This serves as a template for creating new location pages

import type { LocationSEOData } from '@/types/location';

export const locationSchemaTemplate: Partial<LocationSEOData> = {
  // Basic location info
  slug: 'location-slug',
  name: 'Location Name',
  displayName: 'Location Display Name',
  coordinates: {
    latitude: 26.8467,
    longitude: 80.9462
  },
  pinCode: '226010',

  // Demographics template
  demographics: {
    population: 'Population size',
    averageAge: 'Age range',
    economicProfile: 'middle-class',
    primaryProfessions: [
      'Profession 1',
      'Profession 2',
      'Profession 3'
    ],
    lifestyle: [
      'Lifestyle factor 1',
      'Lifestyle factor 2'
    ],
    healthcareExpectations: [
      'Expectation 1',
      'Expectation 2'
    ]
  },

  // Health profile template
  healthProfile: {
    commonConcerns: [
      'Health concern 1',
      'Health concern 2',
      'Health concern 3'
    ],
    lifestyleFactors: [
      'Lifestyle factor 1',
      'Lifestyle factor 2'
    ],
    environmentalFactors: [
      'Environmental factor 1',
      'Environmental factor 2'
    ],
    ageGroupFocus: 'Primary age group served'
  },

  // Competitors template
  competitors: [
    {
      name: 'Dr. Competitor Name',
      hospital: 'Hospital Name',
      specialties: ['Specialty 1', 'Specialty 2'],
      advantages: ['Their advantage 1', 'Their advantage 2'],
      disadvantages: ['Their limitation 1', 'Their limitation 2'],
      distance: '2.5 km'
    }
  ],

  // Service focus template
  serviceFocus: {
    primary: [
      'Primary service 1',
      'Primary service 2',
      'Primary service 3'
    ],
    secondary: [
      'Secondary service 1',
      'Secondary service 2'
    ],
    unique: [
      'Unique offering 1',
      'Unique offering 2'
    ],
    packages: [
      'Package 1',
      'Package 2'
    ]
  },

  // Patient stories template
  patientStories: [
    {
      id: 'story-1',
      patientProfile: {
        age: 32,
        profession: 'Professional title',
        background: 'Brief background'
      },
      initialConcern: 'Initial health concern',
      treatmentApproach: 'Treatment approach used',
      journey: 'Patient journey description',
      outcome: 'Successful outcome achieved',
      locationBenefit: 'How location proximity helped',
      testimonialQuote: 'Patient testimonial quote',
      patientName: 'First Name'
    }
  ],

  // Accessibility template
  accessibility: {
    distanceFromHospital: 'X km',
    travelTime: {
      peakHours: 'X minutes',
      offPeakHours: 'X minutes'
    },
    publicTransport: {
      metro: ['Metro line 1', 'Metro line 2'],
      bus: ['Bus route 1', 'Bus route 2'],
      autoRickshaw: '₹XX-XX fare'
    },
    drivingRoutes: {
      primary: 'Primary route description',
      alternative: 'Alternative route description'
    },
    landmarks: [
      'Landmark 1',
      'Landmark 2',
      'Landmark 3'
    ],
    parking: {
      available: true,
      capacity: 'XX spots',
      cost: 'Free/₹XX per hour',
      valetService: false
    },
    bestVisitingHours: [
      '10:00 AM - 12:00 PM',
      '3:00 PM - 5:00 PM'
    ]
  },

  // Community initiatives template
  communityInitiatives: {
    healthCamps: [
      'Health camp 1',
      'Health camp 2'
    ],
    partnerships: [
      'Partnership 1',
      'Partnership 2'
    ],
    awarenessPrograms: [
      'Awareness program 1',
      'Awareness program 2'
    ],
    preventiveCare: [
      'Preventive care initiative 1',
      'Preventive care initiative 2'
    ],
    corporateTieups: [
      'Corporate tie-up 1',
      'Corporate tie-up 2'
    ]
  },

  // Insurance and costs template
  insuranceAndCosts: {
    popularInsurance: [
      'Insurance provider 1',
      'Insurance provider 2',
      'Insurance provider 3'
    ],
    consultationFee: '₹1500',
    packageDeals: [
      'Package deal 1',
      'Package deal 2'
    ],
    paymentOptions: [
      'Cash',
      'Card (Credit/Debit)',
      'UPI',
      'Net Banking'
    ],
    corporatePackages: false,
    emiOptions: false,
    costComparison: 'Competitive with area standards'
  },

  // Unique positioning template
  uniquePositioning: {
    tagline: 'Location-specific tagline',
    keyFeatures: [
      'Key feature 1',
      'Key feature 2',
      'Key feature 3'
    ],
    contentTone: 'professional',
    differentiators: [
      'Differentiator 1',
      'Differentiator 2',
      'Differentiator 3'
    ]
  },

  // SEO data template
  seoData: {
    title: 'Best Gynaecologist in [Location], Lucknow - Dr. Amita Shukla',
    description: 'Dr. Amita Shukla - Leading gynecologist serving [Location], Lucknow with [specific services]. Book appointment. Just X km from [Location].',
    keywords: [
      'best gynaecologist in [location] lucknow',
      'gynecologist [location]',
      'dr amita shukla [location]',
      '[location] gynecologist doctor',
      'women doctor [location] lucknow'
    ],
    schema: {
      serviceArea: {
        geoRadius: '5000'
      }
    }
  }
};

// Helper functions for location data validation
export const validateLocationData = (data: LocationSEOData): boolean => {
  const requiredFields = [
    'slug',
    'name',
    'displayName',
    'demographics',
    'healthProfile',
    'serviceFocus',
    'accessibility',
    'seoData'
  ];

  return requiredFields.every(field => {
    const value = data[field as keyof LocationSEOData];
    return value !== undefined && value !== null;
  });
};

// Location data processing helpers
export const processLocationName = (locationName: string): string => {
  return locationName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export const generateLocationSlug = (locationName: string): string => {
  return processLocationName(locationName);
};

export const generateSEOTitle = (locationName: string): string => {
  return `Best Gynaecologist in ${locationName}, Lucknow - Dr. Amita Shukla`;
};

export const generateSEODescription = (locationName: string, distance: string, keyServices: string[]): string => {
  const services = keyServices.slice(0, 2).join(', ');
  return `Dr. Amita Shukla - Leading gynecologist serving ${locationName}, Lucknow with ${services}. Book appointment. Just ${distance} from ${locationName}.`;
};

export const generateKeywords = (locationName: string): string[] => {
  const baseKeywords = [
    `best gynaecologist in ${locationName.toLowerCase()} lucknow`,
    `gynecologist ${locationName.toLowerCase()}`,
    `dr amita shukla ${locationName.toLowerCase()}`,
    `${locationName.toLowerCase()} gynecologist doctor`,
    `women doctor ${locationName.toLowerCase()} lucknow`,
    `${locationName.toLowerCase()} pregnancy care`,
    `${locationName.toLowerCase()} women health`,
    `gynecologist near ${locationName.toLowerCase()}`
  ];

  return baseKeywords;
};

// Content generation helpers
export const generateUniqueTagline = (locationName: string, economicProfile: string): string => {
  const taglines = {
    'upper-class': `Premium Gynecological Care for ${locationName}`,
    'upper-middle-class': `Executive Gynecological Care for Modern Women in ${locationName}`,
    'middle-class': `Comprehensive Women's Health for ${locationName} Families`,
    'lower-middle-class': `Accessible Quality Care for ${locationName} Community`,
    'mixed': `Complete Women's Healthcare for ${locationName} Residents`
  };

  return taglines[economicProfile as keyof typeof taglines] || `Quality Gynecological Care in ${locationName}`;
};

export const generateKeyFeatures = (economicProfile: string, primaryProfessions: string[]): string[] => {
  const baseFeatures = ['10+ Years Experience', 'Personalized Care', '24/7 Emergency Support'];
  
  const profileFeatures = {
    'upper-class': ['VIP Treatment Packages', 'Flexible Premium Scheduling'],
    'upper-middle-class': ['Executive Health Packages', 'Corporate Wellness Programs'],
    'middle-class': ['Family-Friendly Approach', 'Affordable Care Plans'],
    'lower-middle-class': ['Community Health Programs', 'Insurance Support'],
    'mixed': ['Diverse Care Options', 'Flexible Payment Plans']
  };

  const features = profileFeatures[economicProfile as keyof typeof profileFeatures] || ['Quality Care', 'Patient-Focused'];
  return [...baseFeatures, ...features];
};

// Export the complete schema for easy access
export default locationSchemaTemplate;