"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';

interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  features?: string[];
  doctorName?: string;
  specializations?: string[];
}

export default function ServiceHero({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  features = [],
  doctorName = "Dr. Amita Shukla",
  specializations = []
}: ServiceHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-bg-offwhite via-accent-cream/50 to-primary-green/10">
      <div 
        ref={heroRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <p className="text-primary-green font-medium mb-2">{doctorName}</p>
              {specializations.length > 0 && (
                <p className="text-text-brown/70 text-sm mb-4">
                  Specializes in: {specializations.join(', ')}
                </p>
              )}
            </div>
            
            {subtitle && (
              <p className="text-primary-green font-medium mb-3">{subtitle}</p>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 green-title-text">
              {title}
            </h1>
            
            <p className="text-xl text-text-brown/80 mb-8 leading-relaxed">
              {description}
            </p>
            
            {features.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-text-brown/70">
                    <CheckCircle className="h-5 w-5 text-primary-green" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <a href="tel:+918303222222">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-warm-lg">
              <Image 
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        strokeDasharray={"0.5 3"}
        className="text-primary-green/10 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"
      />
    </section>
  );
}