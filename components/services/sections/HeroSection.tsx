"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Phone, 
  Calendar, 
  Star, 
  Heart,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';
import { getIcon } from '@/lib/icons';
import { HeroSection as HeroSectionType, ServiceInfo } from '@/types/services';

interface HeroSectionProps {
  data: HeroSectionType;
  service: ServiceInfo;
}

export default function HeroSection({ data, service }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 flex items-center">
      {/* Elegant background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-offwhite via-accent-cream to-primary-green/5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-primary-green/10"></div>
      
      {/* Premium decorative elements */}
      <div className="absolute top-32 left-10 w-72 h-72 rounded-full bg-primary-green/10 blur-3xl"></div>
      <div className="absolute bottom-32 right-10 w-96 h-96 rounded-full bg-forest-green/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[700px]"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Top Section - Service Category Badge */}
            <motion.div 
              className="text-center lg:text-left space-y-4"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green/10 rounded-full border border-primary-green/20 backdrop-blur-sm">
                <Star className="h-5 w-5 text-primary-green" />
                <span className="text-primary-green font-semibold">{service.category} Care Excellence</span>
              </div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-warm">
                <Heart className="h-5 w-5 text-primary-green" />
                <span className="text-primary-green font-semibold text-sm">Compassionate Expert Care</span>
              </div>
            </motion.div>

            {/* Main heading with luxury styling */}
            <motion.div 
              className="text-center lg:text-left space-y-4"
              variants={itemVariants}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary-green">
                  {data.title.split(' ').slice(0, -1).join(' ')}
                </span>
                <br />
                <span className="text-secondary-brown">
                  {data.title.split(' ').slice(-1)[0]}
                </span>
              </h1>
              <div className="w-24 h-1 bg-primary-green rounded-full mx-auto lg:mx-0"></div>
            </motion.div>
            
            {/* Premium description */}
            <motion.p 
              className="text-xl text-text-brown/80 leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>

            {/* Doctor info - Compact */}
            <motion.div 
              className="text-center lg:text-left space-y-2"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-secondary-brown">Dr. Amita Shukla</h3>
              <p className="text-text-brown/70">
                Gynecologist, Obstetrician & Laparoscopic Surgeon | Lucknow, UP
              </p>
            </motion.div>
            
            {/* Feature badges - Based on data.badges */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              variants={itemVariants}
            >
              {data.badges.map((badge, i) => {
                const icons = [
                  <CheckCircle className="h-5 w-5" key="check" />, 
                  <Shield className="h-5 w-5" key="shield" />, 
                  <Award className="h-5 w-5" key="award" />, 
                  <Heart className="h-5 w-5" key="heart" />
                ];
                
                return (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-primary-green">{icons[i] || icons[0]}</div>
                    <span className="text-text-brown font-medium text-sm">{badge}</span>
                  </div>
                );
              })}
            </motion.div>
            
            {/* Trust Indicators */}
            {data.trustIndicators && (
              <motion.div 
                className="grid grid-cols-3 gap-4 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/50"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-green">{data.trustIndicators.experience}</div>
                  <div className="text-xs text-text-brown/70">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-green">{data.trustIndicators.successRate}</div>
                  <div className="text-xs text-text-brown/70">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-green">{data.trustIndicators.specialization}</div>
                  <div className="text-xs text-text-brown/70">Specialization</div>
                </div>
              </motion.div>
            )}
            
            {/* Premium CTA buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button asChild className="bg-gradient-to-r from-primary-green to-forest-green hover:from-forest-green hover:to-primary-green text-white px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link href={data.primaryCTA.href} className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = data.primaryCTA.icon ? getIcon(data.primaryCTA.icon) : Calendar;
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                  {data.primaryCTA.text}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href={data.secondaryCTA.href} className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = data.secondaryCTA.icon ? getIcon(data.secondaryCTA.icon) : Phone;
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                  {data.secondaryCTA.text}
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Premium image section */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Elegant frame */}
              <div className="absolute -inset-4 bg-primary-green/10 rounded-3xl blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-white/50 to-accent-cream/50 rounded-2xl"></div>
              
              {/* Main image */}
              <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Premium floating badges */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-primary-green to-forest-green rounded-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-text-brown">10+ Years</p>
                    <p className="text-xs text-text-brown/70">Specialized Care</p>
                  </div>
                </div>
              </div>
              
              {/* Additional floating element for trust */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-forest-green to-primary-green rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-text-brown">24/7</p>
                    <p className="text-xs text-text-brown/70">Emergency Care</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant grid pattern */}
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        strokeDasharray={"0.5 3"}
        className="text-primary-green/5 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"
      />
    </section>
  );
}