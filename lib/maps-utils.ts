/**
 * Google Maps Utilities for Location Pages
 * Generates API-free Google Maps embed URLs for directions
 */

import type { LocationSEOData } from '@/types/location';

// Dr. Amita Shukla at SCT Trust Hospital - Official Google Maps location
const SCT_TRUST_HOSPITAL = {
  name: 'Dr. Amita Shukla (SCT TRUST HOSPITAL)',
  address: 'Dr. Amita Shukla (SCT TRUST HOSPITAL)- Best Gynaecologist in Lucknow, A1/7, Purania Rd Sector H, Sector-A, Aliganj Lucknow, Uttar Pradesh 226024',
  placeId: 'ChIJizYzW3lXmTkRvXRNIL0sj1s', // Google Maps Place ID
  coordinates: {
    latitude: 26.8915325,
    longitude: 80.9465172
  },
  googleMapsURL: 'https://www.google.com/maps/place/Dr.+Amita+Shukla+(SCT+TRUST+HOSPITAL)-+Best+Gynaecologist+in+Lucknow/@26.8915325,80.9439423,17z/data=!3m1!4b1!4m6!3m5!1s0x39995779b534628b:0x3b80d7bd20d574bd!8m2!3d26.8915325!4d80.9465172!16s%2Fg%2F11hdjc98t9'
};

/**
 * Generates Google Maps directions URL without API key
 * Uses Google Maps URL API format for embedding in iframes
 * Routes FROM location TO Dr. Amita Shukla's hospital
 * 
 * @param locationData - Location data from location files
 * @returns Google Maps embed URL for directions
 */
export function generateDirectionsURL(locationData: LocationSEOData): string {
  const origin = encodeURIComponent(`${locationData.displayName}, Lucknow, Uttar Pradesh, India`);
  // Use the exact Google Maps place name for accurate routing
  const destination = encodeURIComponent('Dr. Amita Shukla (SCT TRUST HOSPITAL)- Best Gynaecologist in Lucknow');
  
  // Using Google Maps URL API format - no API key required
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

/**
 * Generates Google Maps embed URL for iframe embedding
 * Alternative method using simple embed format that works reliably
 * 
 * @param locationData - Location data from location files
 * @returns Google Maps embed URL for iframe
 */
export function generateEmbedDirectionsURL(locationData: LocationSEOData): string {
  // Simple embed format that works in iframes
  const query = encodeURIComponent(`Directions from ${locationData.displayName} to Dr. Amita Shukla SCT Trust Hospital Lucknow`);
  
  return `https://maps.google.com/maps?width=100%&height=400&hl=en&q=${query}&t=&z=13&ie=UTF8&iwloc=B&output=embed`;
}

/**
 * Generates a simple Google Maps search URL for Dr. Amita Shukla's hospital location
 * Used as fallback or for "Open in Maps" functionality
 * 
 * @returns Google Maps search URL for Dr. Amita Shukla's location
 */
export function getHospitalMapURL(): string {
  // Return the exact Google Maps URL for Dr. Amita Shukla's location
  return SCT_TRUST_HOSPITAL.googleMapsURL;
}

/**
 * Generates directions URL with specific travel mode
 * Routes FROM location TO Dr. Amita Shukla's hospital
 * 
 * @param locationData - Location data from location files
 * @param travelMode - Travel mode: 'driving', 'walking', 'bicycling', 'transit'
 * @returns Google Maps directions URL with specified travel mode
 */
export function generateDirectionsURLWithMode(
  locationData: LocationSEOData, 
  travelMode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
): string {
  const origin = encodeURIComponent(`${locationData.displayName}, Lucknow, Uttar Pradesh, India`);
  // Use the exact Google Maps place name for Dr. Amita Shukla's location
  const destination = encodeURIComponent('Dr. Amita Shukla (SCT TRUST HOSPITAL)- Best Gynaecologist in Lucknow');
  
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${travelMode}`;
}

/**
 * Generates a comprehensive embed URL for iframe with fallback support
 * Primary method for location page templates
 * Uses iframe-compatible Google Maps embed format
 * 
 * @param locationData - Location data from location files
 * @returns Optimized Google Maps embed URL for iframe
 */
export function getLocationDirectionsEmbedURL(locationData: LocationSEOData): string {
  try {
    // Try the alternative embed format that's more iframe-friendly
    return generateEmbedDirectionsURL(locationData);
  } catch (error) {
    console.error('Error generating embed URL:', error);
    // Ultimate fallback to just hospital location
    return generateHospitalLocationEmbed();
  }
}

/**
 * Gets Dr. Amita Shukla's hospital information for display
 * @returns Hospital details object with correct Google Maps data
 */
export function getHospitalInfo() {
  return SCT_TRUST_HOSPITAL;
}

/**
 * Gets comprehensive location information including dynamic routing data
 * @param locationData - Location data from location files
 * @returns Combined static and dynamic location information
 */
export function getLocationInfo(locationData: LocationSEOData) {
  const routeInfo = getDynamicRouteInfo(locationData);
  
  return {
    ...locationData,
    dynamicRouteInfo: routeInfo,
    hospitalInfo: SCT_TRUST_HOSPITAL
  };
}

/**
 * Generates directions specifically using Google Place ID for maximum accuracy
 * @param locationData - Location data from location files
 * @returns Google Maps URL using place ID for precise routing
 */
export function generateDirectionsWithPlaceID(locationData: LocationSEOData): string {
  const origin = encodeURIComponent(`${locationData.displayName}, Lucknow, Uttar Pradesh, India`);
  // Use place ID for most accurate routing to Dr. Amita Shukla's location
  const destinationPlaceId = SCT_TRUST_HOSPITAL.placeId;
  
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination_place_id=${destinationPlaceId}&travelmode=driving`;
}

/**
 * Generates a simple hospital location embed as ultimate fallback
 * Shows just the hospital location when directions fail
 * @returns Simple Google Maps embed showing hospital location
 */
export function generateHospitalLocationEmbed(): string {
  return `https://maps.google.com/maps?width=100%&height=400&hl=en&q=Dr.%20Amita%20Shukla%20SCT%20Trust%20Hospital%20Aliganj%20Lucknow&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
}

/**
 * Calculates realistic driving distance between two coordinates 
 * Uses Haversine formula with urban driving multipliers for Lucknow
 * @param lat1 - Origin latitude
 * @param lon1 - Origin longitude  
 * @param lat2 - Destination latitude
 * @param lon2 - Destination longitude
 * @returns Realistic driving distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLineDistance = R * c;
  
  // Apply realistic driving distance multipliers for Lucknow urban environment
  let drivingMultiplier: number;
  if (straightLineDistance <= 5) {
    drivingMultiplier = 1.5; // Short distances have higher multipliers due to road network
  } else if (straightLineDistance <= 10) {
    drivingMultiplier = 1.4; // Medium distances  
  } else {
    drivingMultiplier = 1.3; // Longer distances have more direct routes
  }
  
  const drivingDistance = straightLineDistance * drivingMultiplier;
  return Math.round(drivingDistance * 10) / 10; // Round to 1 decimal place
}

/**
 * Converts degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Estimates travel time based on distance and traffic conditions
 * @param distance - Distance in kilometers
 * @param trafficCondition - Traffic condition: 'light', 'moderate', 'heavy'
 * @returns Estimated travel time range as string
 */
export function estimateTravelTime(distance: number, trafficCondition: 'light' | 'moderate' | 'heavy' = 'moderate'): string {
  // Average speeds in km/h based on realistic traffic conditions in Lucknow
  const speeds = {
    light: 45,    // Early morning, late evening - faster on clearer roads
    moderate: 35, // Normal hours - realistic urban speed  
    heavy: 20     // Peak hours - moderate congestion
  };
  
  const baseSpeed = speeds[trafficCondition];
  const timeInHours = distance / baseSpeed;
  const timeInMinutes = Math.round(timeInHours * 60);
  
  // More realistic buffer for traffic variations
  const minTime = Math.max(timeInMinutes - 2, Math.round(timeInMinutes * 0.85));
  const maxTime = timeInMinutes + 3;
  
  if (minTime === maxTime) {
    return `${minTime} minutes`;
  }
  
  return `${minTime}-${maxTime} minutes`;
}

/**
 * Calculates dynamic cab fare based on distance
 * @param distance - Distance in kilometers
 * @returns Cab fare range string
 */
export function calculateCabFare(distance: number): string {
  const baseRate = 24; // ₹24 per km
  const minimumFare = 170; // ₹170 minimum
  const baseFare = distance * baseRate;
  const actualFare = Math.max(baseFare, minimumFare);
  
  // Add 10-15% variation for range
  const lowerFare = Math.round(actualFare * 0.95);
  const upperFare = Math.round(actualFare * 1.15);
  
  return `Ola/Uber/Rapido: ₹${lowerFare}-${upperFare}`;
}

/**
 * Gets dynamic distance and time for a location with automatic fare calculation
 * @param locationData - Location data with coordinates
 * @returns Object with distance, travel time, and pricing information
 */
export function getDynamicRouteInfo(locationData: LocationSEOData) {
  const distance = calculateDistance(
    locationData.coordinates.latitude,
    locationData.coordinates.longitude,
    SCT_TRUST_HOSPITAL.coordinates.latitude,
    SCT_TRUST_HOSPITAL.coordinates.longitude
  );
  
  const currentHour = new Date().getHours();
  let trafficCondition: 'light' | 'moderate' | 'heavy' = 'moderate';
  
  // Determine traffic condition based on time of day
  if (currentHour >= 7 && currentHour <= 10 || currentHour >= 17 && currentHour <= 20) {
    trafficCondition = 'heavy'; // Peak hours
  } else if (currentHour >= 22 || currentHour <= 6) {
    trafficCondition = 'light'; // Off-peak hours
  }
  
  const travelTime = estimateTravelTime(distance, trafficCondition);
  const peakTravelTime = estimateTravelTime(distance, 'heavy');
  const offPeakTravelTime = estimateTravelTime(distance, 'light');
  const cabFare = calculateCabFare(distance);
  
  return {
    distance: `${distance} km`,
    currentTravelTime: travelTime,
    peakTravelTime,
    offPeakTravelTime,
    trafficCondition,
    cabServices: cabFare,
    autoRickshawRange: `₹${Math.round(distance * 12)}-${Math.round(distance * 18)} depending on traffic and exact pickup point`
  };
}