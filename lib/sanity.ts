/**
 * Modified: Fixed the project ID placeholder to use a valid format that only contains lowercase letters, numbers, and dashes.
 * This addresses the runtime error when using the Sanity client.
 */
import { createClient, ClientConfig } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id", // Using a valid format placeholder
  apiVersion: "2023-10-01", // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: process.env.NODE_ENV === "production", // set to `false` to bypass the edge cache
};

// Set up the client for fetching data
export const client = createClient(config);

// Set up a helper function for generating image URLs with only the asset reference data in your documents
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}