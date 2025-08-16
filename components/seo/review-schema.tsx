'use client';

import { useEffect } from 'react';

interface ReviewData {
  reviewerName: string;
  rating: number; // 1-5 stars
  reviewText: string;
  datePublished: string; // ISO date format
  location?: string;
}

interface ReviewSchemaProps {
  reviews: ReviewData[];
  doctorName?: string;
  organizationName?: string;
}

export function ReviewSchema({ 
  reviews, 
  doctorName = "Dr. Amita Shukla",
  organizationName = "SCT Trust Hospital"
}: ReviewSchemaProps) {
  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    // Calculate aggregate rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const reviewCount = reviews.length;

    // Create comprehensive review and aggregate rating schema
    const reviewSchemas = reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.reviewerName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewText,
      "datePublished": review.datePublished,
      "publisher": {
        "@type": "Organization",
        "name": organizationName
      }
    }));

    // Doctor with aggregate rating schema
    const doctorWithRatingSchema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": doctorName,
      "medicalSpecialty": "Gynecology",
      "worksFor": {
        "@type": "Hospital",
        "name": organizationName,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-1/7, Chandrapath Road, near Kendriya Bhavan",
          "addressLocality": "Aliganj",
          "addressRegion": "Lucknow",
          "postalCode": "226024",
          "addressCountry": "IN"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Number(averageRating.toFixed(1)),
        "reviewCount": reviewCount,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": reviewSchemas
    };

    // Remove existing review schema
    const existingScript = document.querySelector('script[data-schema="reviews"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new review schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'reviews');
    script.textContent = JSON.stringify(doctorWithRatingSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="reviews"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [reviews, doctorName, organizationName]);

  return null;
}

// Sample patient reviews data for Dr. Amita Shukla
export const patientReviews: ReviewData[] = [
  {
    reviewerName: "Priya Sharma",
    rating: 5,
    reviewText: "Dr. Amita Shukla is exceptional! She handled my high-risk pregnancy with utmost care and expertise. Her calm demeanor and professional approach gave me confidence throughout my pregnancy journey. Highly recommended for all gynecological needs in Lucknow.",
    datePublished: "2024-12-15",
    location: "Gomti Nagar, Lucknow"
  },
  {
    reviewerName: "Anita Verma",
    rating: 5,
    reviewText: "Excellent experience with Dr. Amita Shukla for PCOS treatment. She explained everything clearly, provided effective treatment, and was always available for questions. The best gynecologist in Lucknow without a doubt.",
    datePublished: "2024-11-28",
    location: "Aliganj, Lucknow"
  },
  {
    reviewerName: "Meera Gupta",
    rating: 5,
    reviewText: "Dr. Amita Shukla helped us with our infertility issues and we are now blessed with a healthy baby. Her expertise in reproductive health is outstanding. SCT Trust Hospital provides excellent facilities too.",
    datePublished: "2024-11-10",
    location: "Indira Nagar, Lucknow"
  },
  {
    reviewerName: "Sunita Singh",
    rating: 5,
    reviewText: "Had a wonderful experience during my delivery under Dr. Amita Shukla's care. She made the entire process smooth and comfortable. Her 20+ years of experience really shows. Grateful for her excellent care.",
    datePublished: "2024-10-22",
    location: "Hazratganj, Lucknow"
  },
  {
    reviewerName: "Ritu Agarwal",
    rating: 5,
    reviewText: "Dr. Amita Shukla performed my laparoscopic surgery with great skill. Minimal pain, quick recovery, and excellent post-operative care. She is truly the best gynecological surgeon in Lucknow.",
    datePublished: "2024-10-05",
    location: "Mahanagar, Lucknow"
  },
  {
    reviewerName: "Kavita Mishra",
    rating: 5,
    reviewText: "Compassionate, knowledgeable, and highly skilled - Dr. Amita Shukla is everything you want in a gynecologist. She took great care during my pregnancy and delivery. The entire team at SCT Trust Hospital is professional.",
    datePublished: "2024-09-18",
    location: "Chowk, Lucknow"
  },
  {
    reviewerName: "Deepika Yadav",
    rating: 5,
    reviewText: "Dr. Amita Shukla's expertise in managing complex gynecological issues is remarkable. She provided personalized care for my condition and the results exceeded expectations. Highly recommend to all women in Lucknow.",
    datePublished: "2024-09-02",
    location: "Aminabad, Lucknow"
  },
  {
    reviewerName: "Neha Pandey",
    rating: 5,
    reviewText: "Outstanding care from Dr. Amita Shukla throughout my pregnancy journey. Her attention to detail and caring nature made all the difference. The best choice for gynecological care in Lucknow.",
    datePublished: "2024-08-20",
    location: "Kaiserbagh, Lucknow"
  }
];

// Helper function to filter reviews by rating
export function getReviewsByRating(reviews: ReviewData[], minRating: number = 4): ReviewData[] {
  return reviews.filter(review => review.rating >= minRating);
}

// Helper function to get recent reviews
export function getRecentReviews(reviews: ReviewData[], count: number = 5): ReviewData[] {
  return reviews
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, count);
}