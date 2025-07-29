"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Phone, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';

interface ServiceCTAProps {
  title: string;
  description: string;
  features?: string[];
  phoneNumber?: string;
  backgroundColor?: 'gradient' | 'green' | 'cream';
}

export default function ServiceCTA({
  title,
  description,
  features = ["24/7 Emergency Support", "Confidential Care", "Expert Consultation"],
  phoneNumber = "+918303222222",
  backgroundColor = 'gradient'
}: ServiceCTAProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ctaRef, { once: true });

  const backgroundClasses = {
    gradient: 'bg-gradient-to-r from-primary-green/20 to-accent-cream/30',
    green: 'bg-primary-green/10',
    cream: 'bg-accent-cream/30'
  };

  return (
    <section 
      ref={ctaRef}
      className={`py-20 ${backgroundClasses[backgroundColor]} relative`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 green-title-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-text-brown/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild variant="ghost" className="btn-green">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button asChild variant="outline" className="btn-outline">
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 text-text-brown/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {features.map((feature, index) => {
              const icons = [Clock, Shield, CheckCircle];
              const Icon = icons[index % icons.length];
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{feature}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
      
      <GridPattern
        width={50}
        height={50}
        strokeDasharray={"1 2"}
        className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,white_80%)]"
      />
    </section>
  );
}