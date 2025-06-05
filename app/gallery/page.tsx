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
      src: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Building",
    },
    {
      src: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Lobby",
    },
    {
      src: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Consultation Room",
    },
    {
      src: "https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Examination Room",
    },
    {
      src: "https://images.pexels.com/photos/163714/hospital-laboratory-analysis-medical-163714.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Laboratory",
    },
    {
      src: "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Waiting Area",
    },
    {
      src: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Reception",
    },
    {
      src: "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Maternity Ward",
    },
    {
      src: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Nursing Station",
    },
    {
      src: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Private Patient Room",
    },
    {
      src: "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Corridor",
    },
    {
      src: "https://images.pexels.com/photos/3845152/pexels-photo-3845152.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Ultrasound Room",
    },
    {
      src: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Medical Equipment",
    },
    {
      src: "https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Recovery Room",
    },
    {
      src: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Exterior View",
    },
    {
      src: "https://images.pexels.com/photos/935869/pexels-photo-935869.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Garden",
    },
    {
      src: "https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Medical Consultation",
    },
    {
      src: "https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Patient Checkup",
    },
    {
      src: "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Doctor's Office",
    },
    {
      src: "https://images.pexels.com/photos/5725516/pexels-photo-5725516.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "NICU Facility",
    },
    {
      src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Cafeteria",
    },
    {
      src: "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Waiting Lounge",
    },
    {
      src: "https://images.pexels.com/photos/2466444/pexels-photo-2466444.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Administration Office",
    },
    {
      src: "https://images.pexels.com/photos/3769151/pexels-photo-3769151.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Modern Hospital Wing",
    },
    {
      src: "https://images.pexels.com/photos/905874/pexels-photo-905874.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Patient Room",
    },
    {
      src: "https://images.pexels.com/photos/1250665/pexels-photo-1250665.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Equipment",
    },
    {
      src: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Nursing Staff",
    },
    {
      src: "https://images.pexels.com/photos/5327916/pexels-photo-5327916.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Patient Care",
    },
    {
      src: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Medication Dispensary",
    },
    {
      src: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Medical Lab",
    },
    {
      src: "https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "X-Ray Department",
    },
    {
      src: "https://images.pexels.com/photos/4098761/pexels-photo-4098761.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Pharmacy",
    },
    {
      src: "https://images.pexels.com/photos/3771098/pexels-photo-3771098.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Staff Meeting Room",
    },
    {
      src: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Information Desk",
    },
    {
      src: "https://images.pexels.com/photos/5327870/pexels-photo-5327870.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Birthing Suite",
    },
    {
      src: "https://images.pexels.com/photos/5327869/pexels-photo-5327869.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Gynecology Department",
    },
    {
      src: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Sonography Room",
    },
    {
      src: "https://images.pexels.com/photos/7089614/pexels-photo-7089614.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Labor Room",
    },
    {
      src: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Prenatal Checkup Room",
    },
    {
      src: "https://images.pexels.com/photos/3846035/pexels-photo-3846035.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Entrance",
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