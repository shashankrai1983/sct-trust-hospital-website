// This file manages the API functions to fetch data from Sanity
import { client } from './sanity';
import { PortableText } from '@portabletext/react';
import { ReactNode } from 'react';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: any; // Portable Text format
  content?: string; // HTML content
  mainImage: string;
  publishedAt: string;
  readTime: number;
  categories?: any[];
  author?: {
    name: string;
    avatar?: string;
    bio?: any;
  };
}

/**
 * Fetches all blog posts from Sanity
 * Fixed to handle potential errors when Sanity API is not configured
 */
export async function getPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)  {
        _id,
        title,
        slug,
        excerpt,
        "mainImage": mainImage.asset->url,
        publishedAt,
        "author": author->name,
        "category": categories[0]->title,
        readTime
      }
    `);
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 * @param slug - The slug of the post to fetch
 * @returns The post data or null if not found
 */
export async function getPostBySlug(slug: string) {
  try {
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        body,
        "mainImage": mainImage.asset->url,
        publishedAt,
        readTime,
        categories[]->,
        "author": author-> {
          name,
          "avatar": image.asset->url,
          bio
        }
      }
    `, { slug });
    
    return post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all post slugs from Sanity for static generation
 * @returns Array of slug objects for generateStaticParams
 */
export async function getAllPostSlugs() {
  try {
    const slugs = await client.fetch(`
      *[_type == "post"].slug.current
    `);
    return slugs.map((slug: string) => ({ slug }));
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

/**
 * Fetches the featured post from Sanity
 * Fixed to handle potential errors when Sanity API is not configured
 */
export async function getFeaturedPost() {
  try {
    const posts = await client.fetch(`
      *[_type == "post" && featured == true][0] {
        _id,
        title,
        slug,
        excerpt,
        "mainImage": mainImage.asset->url,
        publishedAt,
        "author": author->name,
        "category": categories[0]->title,
        readTime
      }
    `);
    return posts;
  } catch (error) {
    console.error("Error fetching featured post:", error);
    // Return null as fallback
    return null;
  }
}

/**
 * Fetches all categories from Sanity
 * Fixed to handle potential errors when Sanity API is not configured
 */
export async function getAllCategories() {
  try {
    return await client.fetch(`
      *[_type == "category"] {
        _id,
        title,
        slug,
        "count": count(*[_type == "post" && references(^._id)])
      }
    `);
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetches posts by category from Sanity
 * @param categorySlug - The slug of the category to filter by
 * @returns Array of posts in the category
 */
export async function getPostsByCategory(categorySlug: string) {
  try {
    return await client.fetch(`
      *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        "mainImage": mainImage.asset->url,
        publishedAt,
        "author": author->name,
        "category": categories[0]->title,
        readTime
      }
    `, { categorySlug });
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}