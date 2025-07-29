"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HospitalGallery from '@/components/home/hospital-gallery';
import { GridPattern } from '@/components/ui/grid-pattern';

export default function GalleryPage() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isGalleryInView = useInView(galleryRef, { once: true });

  // Comprehensive gallery with many more images
  const allGalleryImages = [
    {
      src: "https://i.ibb.co/8gGt9HFG/1.png",
      alt: "Hospital Gallery Image 1",
    },
    {
      src: "https://i.ibb.co/W4zLWNP2/3.jpg",
      alt: "Hospital Gallery Image 2",
    },
    {
      src: "https://i.ibb.co/rRgGgfzF/2.jpg",
      alt: "Hospital Gallery Image 3",
    },
    {
      src: "https://i.ibb.co/cK4m5zrD/Whats-App-Image-2025-05-02-at-2-15-39-PM.jpg",
      alt: "Hospital Gallery Image 4",
    },
    {
      src: "https://i.ibb.co/Tq2DgD8F/t3.jpg",
      alt: "Hospital Gallery Image 5",
    },
    {
      src: "https://i.ibb.co/G4C9tm8g/30-3.jpg",
      alt: "Hospital Gallery Image 6",
    },
    {
      src: "https://i.ibb.co/Df5wnLg1/30-2.jpg",
      alt: "Hospital Gallery Image 7",
    },
    {
      src: "https://i.ibb.co/Z1NtY7M3/17-May2025-3.jpg",
      alt: "Hospital Gallery Image 8",
    },
    {
      src: "https://i.ibb.co/0y8mnc5C/17-May2025-2.jpg",
      alt: "Hospital Gallery Image 9",
    },
    {
      src: "https://i.ibb.co/tPPZwQJv/14may2025-1.jpg",
      alt: "Hospital Gallery Image 10",
    },
    {
      src: "https://i.ibb.co/bgjcwJZg/9may2025-3.jpg",
      alt: "Hospital Gallery Image 11",
    },
    {
      src: "https://i.ibb.co/2YfJfp59/3may2025-3.jpg",
      alt: "Hospital Gallery Image 12",
    },
    {
      src: "https://i.ibb.co/TBqLVrn3/3may2025-2.jpg",
      alt: "Hospital Gallery Image 13",
    },
    {
      src: "https://i.ibb.co/TDbpQ4Pv/4june2025-6.jpg",
      alt: "Hospital Gallery Image 14",
    },
    {
      src: "https://i.ibb.co/6chtWg6y/4-June2025-4.jpg",
      alt: "Hospital Gallery Image 15",
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
              Hospital Gallery
            </h1>
            <p className="text-lg text-text-brown/80 mb-6">
              Explore our state-of-the-art facilities and modern infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        ref={galleryRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-lg text-text-brown/80">
              Take a virtual tour of SCT Trust Hospital, where we combine advanced medical technology with a comfortable, healing environment.
            </p>
          </div>
          
          <HospitalGallery 
            images={allGalleryImages}
            title="Our Complete Gallery"
            subtitle="Explore our facilities and see where we provide exceptional care"
            showAll={true}
          />
        </div>
        
        {/* Grid Pattern background */}
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"1 3"}
          className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"
        />
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-text-brown hover:text-primary-green">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-text-brown/50" />
                <span className="ms-1 text-sm font-medium text-text-brown md:ms-2">Gallery</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}