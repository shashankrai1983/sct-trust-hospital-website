"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  Shield, 
  Users, 
  CheckCircle2, 
  Stethoscope,
  Apple,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';

interface GuidelineCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
}

interface ComprehensiveGuidelinesSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  guidelines: GuidelineCategory[];
  backgroundColor?: 'white' | 'cream' | 'green';
}

export default function ComprehensiveGuidelinesSection({
  title,
  subtitle,
  description,
  guidelines,
  backgroundColor = 'white'
}: ComprehensiveGuidelinesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const backgroundClasses = {
    white: 'bg-white',
    cream: 'bg-accent-cream/30',
    green: 'bg-primary-green/10'
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-primary-beige',
    low: 'bg-primary-green'
  };

  const priorityBorders = {
    high: 'border-red-200',
    medium: 'border-primary-beige/30',
    low: 'border-primary-green/30'
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 ${backgroundClasses[backgroundColor]} relative overflow-hidden`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 green-title-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="text-lg text-primary-green font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p 
              className="text-lg text-text-brown/80 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {guidelines.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={`glass-card p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 ${priorityBorders[category.priority]}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1 }}
            >
              {/* Priority Indicator */}
              <div className={`absolute top-0 left-0 w-1 h-full ${priorityColors[category.priority]}`}></div>
              
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-brown mb-2 group-hover:text-primary-green transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-text-brown/70 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {category.steps.map((step, stepIndex) => (
                  <motion.div
                    key={stepIndex}
                    className="flex items-start gap-3 group/step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + categoryIndex * 0.1 + stepIndex * 0.05 
                    }}
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-green text-white text-xs font-bold flex items-center justify-center group-hover/step:scale-110 transition-transform duration-200">
                      {stepIndex + 1}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <p className="text-text-brown/80 leading-relaxed group-hover/step:text-text-brown transition-colors duration-200">
                        {step}
                      </p>
                    </div>

                    {/* Check Icon */}
                    <div className="flex-shrink-0 opacity-0 group-hover/step:opacity-100 transition-opacity duration-200">
                      <CheckCircle2 className="w-4 h-4 text-primary-green" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-green/10 px-6 py-3 rounded-full">
            <AlertCircle className="w-5 h-5 text-primary-green" />
            <p className="text-primary-green font-medium">
              Following these guidelines significantly improves pregnancy outcomes
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Background Pattern */}
      <GridPattern
        width={40}
        height={40}
        strokeDasharray={"1 3"}
        className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"
      />
    </section>
  );
}