"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Shield
} from 'lucide-react';
import { getIcon } from '@/lib/icons';
import { OverviewSection as OverviewSectionType } from '@/types/services';
import { useService } from '@/contexts/service-context';

interface OverviewSectionProps {
  data: OverviewSectionType;
}

export default function OverviewSection({ data }: OverviewSectionProps) {
  const service = useService();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mark as hydrated after a short delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: isMobile && !isHydrated ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: isMobile && !isHydrated ? 1 : 0, y: isMobile && !isHydrated ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.4 : 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: isMobile && !isHydrated ? 1 : 0, scale: isMobile && !isHydrated ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: isMobile ? 0.3 : 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent-cream/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isMobile && !isHydrated ? "visible" : undefined}
          whileInView="visible"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
          data-hydrated={isHydrated}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 rounded-full mb-6"
              variants={itemVariants}
            >
              <Heart className="h-4 w-4 text-primary-green" />
              <span className="text-primary-green font-semibold text-sm">Understanding Your Care</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-secondary-brown"
              variants={itemVariants}
            >
              {service.name} Overview
            </motion.h2>
            
            <motion.div 
              className="w-32 h-1 bg-primary-green rounded-full mx-auto mb-8"
              variants={itemVariants}
            ></motion.div>
            
            <motion.p 
              className="text-xl text-text-brown/80 leading-relaxed max-w-4xl mx-auto"
              variants={itemVariants}
            >
              {data.introduction}
            </motion.p>
          </div>

          {/* Key Points Grid */}
          {data.keyPoints && data.keyPoints.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
              variants={containerVariants}
            >
              {data.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-300 hover:-translate-y-1"
                  variants={cardVariants}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-green rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-text-brown/90 leading-relaxed group-hover:text-text-brown transition-colors">
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Statistics Section */}
          {data.statistics && data.statistics.length > 0 && (
            <motion.div 
              className="bg-gradient-to-r from-white/80 to-accent-cream/50 rounded-3xl p-8 md:p-12 shadow-warm border border-primary-green/10 mb-16"
              variants={cardVariants}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-text-brown mb-4">
                  Our Track Record
                </h3>
                <p className="text-text-brown/70">
                  Numbers that reflect our commitment to excellence
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.statistics.map((stat, index) => {
                  const icons = [TrendingUp, Users, Award, Shield];
                  const IconComponent = stat.icon ? getIcon(stat.icon) : icons[index % icons.length];
                  
                  return (
                    <div key={index} className="text-center group">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary-green" />
                      </div>
                      <div className="text-3xl font-bold text-primary-green mb-2">{stat.value}</div>
                      <div className="text-text-brown font-semibold mb-1">{stat.label}</div>
                      {stat.description && (
                        <div className="text-text-brown/70 text-sm">{stat.description}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Benefits Section */}
          {data.benefits && data.benefits.length > 0 && (
            <motion.div 
              className="mb-16"
              variants={containerVariants}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-text-brown mb-4">
                  Benefits of Our {service.name}
                </h3>
                <p className="text-text-brown/70 text-lg">
                  Comprehensive care designed for optimal outcomes
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-gradient-to-br from-white to-primary-green/5 rounded-2xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-300 hover:-translate-y-1"
                    variants={cardVariants}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-forest-green rounded-lg flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-text-brown/90 leading-relaxed text-sm">
                        {benefit}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Who Can Benefit Section */}
          {data.whoCanBenefit && data.whoCanBenefit.length > 0 && (
            <motion.div 
              className="mb-16"
              variants={containerVariants}
            >
              <div className="bg-gradient-to-br from-accent-cream/50 to-primary-green/10 rounded-3xl p-8 md:p-12 border border-primary-green/20">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-text-brown mb-4">
                    Who Can Benefit?
                  </h3>
                  <p className="text-text-brown/70 text-lg">
                    Our {service.name.toLowerCase()} is particularly beneficial for:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.whoCanBenefit.map((group, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50"
                      variants={cardVariants}
                    >
                      <div className="p-1 bg-primary-green rounded-full flex-shrink-0 mt-1">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-text-brown/90 leading-relaxed">
                        {group}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Medical Disclaimer */}
          {data.disclaimer && (
            <motion.div 
              className="p-6 bg-amber-50 border border-amber-200 rounded-2xl"
              variants={itemVariants}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Medical Disclaimer</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    {data.disclaimer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}