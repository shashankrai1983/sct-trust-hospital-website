/**
 * Enhanced Sanity configuration with better error handling and validation for deployment
 */
import { createClient, ClientConfig } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Validate environment variables for deployment
function validateSanityEnvironment() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  if (!projectId && process.env.NODE_ENV === "production") {
    console.error("NEXT_PUBLIC_SANITY_PROJECT_ID is required for production");
  }
  
  if (!dataset && process.env.NODE_ENV === "production") {
    console.error("NEXT_PUBLIC_SANITY_DATASET is required for production");
  }
  
  return {
    projectId: projectId || "missing-project-id",
    dataset: dataset || "production"
  };
}

const env = validateSanityEnvironment();

const config: ClientConfig = {
  dataset: env.dataset,
  projectId: env.projectId,
  apiVersion: "2023-10-01", // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: process.env.NODE_ENV === "production", // set to `false` to bypass the edge cache
  // Add timeout and retry configuration for more reliable deployments
  requestTagPrefix: 'sanity',
  ignoreBrowserTokenWarning: true,
};

// Set up the client for fetching data
export const client = createClient(config);

// Set up a helper function for generating image URLs with validation
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  try {
    if (!source) {
      console.warn("No image source provided to urlFor");
      return builder.image("");
    }
    return builder.image(source);
  } catch (error) {
    console.warn("Error generating image URL:", error);
    return builder.image("");
  }
}