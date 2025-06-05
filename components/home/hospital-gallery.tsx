"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  X,
  ZoomIn,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface HospitalGalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showAll?: boolean;
}

const HospitalGallery = ({ 
  images,
  title = "Our Hospital Gallery",
  subtitle = "Take a tour of our modern facilities and comfortable environment",
  limit = 6,
  showAll = false
}: HospitalGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true });

  // Only show the first 'limit' images if showAll is false
  const displayedImages = showAll ? images : images.slice(0, limit);
  const hasMoreImages = !showAll && images.length > limit;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setCurrentImageIndex(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (currentImageIndex === null) return;

    if (e.key === 'ArrowRight') nextImage();
    else if (e.key === 'ArrowLeft') prevImage();
    else if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div 
      ref={galleryRef}
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      className="focus:outline-none"
    >
      {/* Gallery Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 green-title-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg text-text-brown/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-video rounded-xl overflow-hidden shadow-warm cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1.5) }}
            whileHover={{ y: -5 }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-text-brown/5 group-hover:bg-text-brown/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-2">
                <ZoomIn className="w-6 h-6 text-text-brown" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMoreImages && (
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button asChild variant="outline" className="btn-outline">
              <Link href="/gallery" className="inline-flex items-center">
                View All Gallery Images <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      {currentImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6 text-text-brown" />
            </button>

            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6 text-text-brown" />
            </button>

            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6 text-text-brown" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <p className="text-text-brown">
                {currentImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalGallery;
