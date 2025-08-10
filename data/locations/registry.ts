// Location Registry - Central registry for all location pages
// This ensures consistent location management across the application

export interface LocationRegistryEntry {
  slug: string;
  displayName: string;
  status: 'active' | 'draft' | 'archived';
  priority: 'high' | 'medium' | 'low';
  searchVolume: 'high' | 'medium' | 'low';
  competitionLevel: 'high' | 'medium' | 'low';
  createdAt: string;
  lastUpdated: string;
}

export const LOCATION_REGISTRY: LocationRegistryEntry[] = [
  {
    slug: 'gomti-nagar',
    displayName: 'Gomti Nagar',
    status: 'active',
    priority: 'high',
    searchVolume: 'high',
    competitionLevel: 'high',
    createdAt: '2024-01-01',
    lastUpdated: '2024-08-09'
  },
  {
    slug: 'hazratganj',
    displayName: 'Hazratganj', 
    status: 'active',
    priority: 'high',
    searchVolume: 'high',
    competitionLevel: 'high',
    createdAt: '2024-08-09',
    lastUpdated: '2024-08-09'
  },
  {
    slug: 'jankipuram-extension',
    displayName: 'Jankipuram Extension',
    status: 'active',
    priority: 'high',
    searchVolume: 'medium',
    competitionLevel: 'medium',
    createdAt: '2025-08-10',
    lastUpdated: '2025-08-10'
  },
  {
    slug: 'aliganj',
    displayName: 'Aliganj',
    status: 'active',
    priority: 'high',
    searchVolume: 'medium',
    competitionLevel: 'medium',
    createdAt: '2025-08-10',
    lastUpdated: '2025-08-10'
  }
];

// Helper functions for location management
export const getActiveLocations = (): LocationRegistryEntry[] => {
  return LOCATION_REGISTRY.filter(location => location.status === 'active');
};

export const getLocationBySlug = (slug: string): LocationRegistryEntry | undefined => {
  return LOCATION_REGISTRY.find(location => location.slug === slug);
};

export const getHighPriorityLocations = (): LocationRegistryEntry[] => {
  return LOCATION_REGISTRY.filter(location => 
    location.status === 'active' && location.priority === 'high'
  );
};

export const getAllLocationSlugs = (): string[] => {
  return getActiveLocations().map(location => location.slug);
};

// SEO and static generation helpers
export const getLocationSlugsForStaticGeneration = (): string[] => {
  return getActiveLocations().map(location => location.slug);
};

export const isValidLocationSlug = (slug: string): boolean => {
  return getAllLocationSlugs().includes(slug);
};

// Export for Next.js generateStaticParams
export const locationParams = getLocationSlugsForStaticGeneration().map(slug => ({
  location: slug
}));

export default LOCATION_REGISTRY;