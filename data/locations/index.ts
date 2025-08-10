// Location Data Index - Central export point for all location data
// This ensures clean imports and consistent data structure validation

import type { LocationSEOData } from '@/types/location';
import { validateLocationData } from './location-schema';

// Import all location data
import gomtiNagarData from './gomti-nagar';
import hazratganjData from './hazratganj';
import jankipuramExtensionData from './jankipuram-extension';
import aliganjData from './aliganj';
import mahanagarData from './mahanagar';
import indiraNagarData from './indira-nagar';

// Location data mapping for easy access
export const LOCATION_DATA: Record<string, LocationSEOData> = {
  'gomti-nagar': gomtiNagarData,
  'hazratganj': hazratganjData,
  'jankipuram-extension': jankipuramExtensionData,
  'aliganj': aliganjData,
  'mahanagar': mahanagarData,
  'indira-nagar': indiraNagarData,
};

// Validation check for all location data
const validateAllLocations = () => {
  const errors: string[] = [];
  
  Object.entries(LOCATION_DATA).forEach(([slug, data]) => {
    if (!validateLocationData(data)) {
      errors.push(`Invalid data structure for location: ${slug}`);
    }
    
    // Check if slug matches
    if (data.slug !== slug) {
      errors.push(`Slug mismatch for location: ${slug} (expected: ${slug}, got: ${data.slug})`);
    }
  });
  
  if (errors.length > 0) {
    console.warn('Location data validation warnings:', errors);
  }
  
  return errors.length === 0;
};

// Run validation in development
if (process.env.NODE_ENV === 'development') {
  validateAllLocations();
}

// Helper functions
export const getLocationData = (slug: string): LocationSEOData | null => {
  return LOCATION_DATA[slug] || null;
};

export const getAllLocationSlugs = (): string[] => {
  return Object.keys(LOCATION_DATA);
};

export const getAllLocations = (): LocationSEOData[] => {
  return Object.values(LOCATION_DATA);
};

export const getLocationNames = (): Array<{slug: string; name: string}> => {
  return Object.entries(LOCATION_DATA).map(([slug, data]) => ({
    slug,
    name: data.displayName
  }));
};

// Export individual location data for direct imports
export { gomtiNagarData, hazratganjData, jankipuramExtensionData, aliganjData, mahanagarData, indiraNagarData };

// Export schemas and templates
export { locationSchemaTemplate, validateLocationData } from './location-schema';
export { LOCATION_REGISTRY, getActiveLocations, isValidLocationSlug } from './registry';