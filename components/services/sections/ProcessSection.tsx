"use client";

import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Heart,
  Users,
  CheckCircle
} from 'lucide-react';
import { getIcon } from '@/lib/icons';
import { ProcessSection as ProcessSectionType, ServiceInfo } from '@/types/services';

interface ProcessSectionProps {
  data: ProcessSectionType;
  service: ServiceInfo;
}

export default function ProcessSection({ data, service }: ProcessSectionProps) {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(96,108,56,0.1)_50%,transparent_100%)] transform -skew-y-1"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green/10 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-warm"
            variants={itemVariants}
          >
            <div className="p-2 bg-primary-green rounded-full">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">YOUR CARE JOURNEY</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-brown"
            variants={itemVariants}
          >
            {data.title}
          </motion.h2>
          
          {data.description && (
            <motion.p 
              className="text-xl text-text-brown/70 leading-relaxed"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>
          )}
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Enhanced Connecting Line with Gradient */}
            <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
              <div className="relative h-1 bg-gradient-to-r from-transparent via-primary-green/40 to-transparent rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-green/20 via-forest-green/60 to-primary-green/20 rounded-full animate-pulse-light"></div>
              </div>
            </div>

            {/* Timeline Steps */}
            <motion.div 
              className={`grid grid-cols-1 md:grid-cols-2 ${data.steps.length > 2 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-8 lg:gap-6 relative z-10`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {data.steps.map((step, index) => {
                const IconComponent = step.icon ? getIcon(step.icon) : CheckCircle;
                
                return (
                  <motion.div 
                    key={step.step} 
                    className="relative group"
                    variants={itemVariants}
                  >
                    <div className="text-center">
                      {/* Enhanced Timeline Circle */}
                      <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green via-forest-green to-primary-green rounded-full shadow-warm mb-6 border-4 border-white/90 group-hover:scale-105 transition-all duration-300">
                        <span className="text-white font-bold text-xl">{step.step}</span>
                        {/* Animated Progress Ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-forest-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        {/* Connection Dots */}
                        {index < data.steps.length - 1 && (
                          <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                        )}
                        {index > 0 && (
                          <div className="hidden lg:block absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Enhanced Step Content */}
                      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-warm border border-primary-green/10 group-hover:shadow-warm-lg group-hover:border-primary-green/30 transition-all duration-300">
                        <h3 className="text-lg font-bold text-text-brown mb-3 group-hover:text-primary-green transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-text-brown/70 text-sm leading-relaxed mb-4">
                          {step.description}
                        </p>
                        
                        {step.duration && (
                          <div className="inline-flex items-center gap-2 text-xs text-white font-semibold bg-primary-green px-3 py-1.5 rounded-full shadow-sm mb-3">
                            <Clock className="h-3 w-3" />
                            <span>{step.duration}</span>
                          </div>
                        )}

                        {step.includes && step.includes.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-text-brown/80 mb-2">Includes:</p>
                            <div className="space-y-1">
                              {step.includes.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-text-brown/70">
                                  <CheckCircle className="h-3 w-3 text-primary-green mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Timeline Overview Box */}
          {data.timeline && (
            <motion.div 
              className="mt-20 max-w-5xl mx-auto"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="relative">
                {/* Connection Line from Timeline */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-primary-green/40 to-transparent"></div>
                
                {/* Enhanced Box Design */}
                <div className="bg-gradient-to-br from-white via-accent-cream/20 to-primary-green/5 backdrop-blur-sm rounded-3xl border-2 border-primary-green/20 shadow-warm-lg overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-primary-green to-forest-green p-6 text-center">
                    <div className="inline-flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Clock className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-lg tracking-wide">Timeline Overview</span>
                    </div>
                  </div>
                  
                  {/* Content Grid */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                          <Calendar className="h-6 w-6 text-primary-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Total Duration</h4>
                        <p className="text-text-brown/70 leading-relaxed">{data.timeline.totalDuration}</p>
                      </div>
                      
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-forest-green/10 rounded-full mb-4 group-hover:bg-forest-green/20 transition-colors">
                          <Heart className="h-6 w-6 text-forest-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Visit Frequency</h4>
                        <p className="text-text-brown/70 leading-relaxed">{data.timeline.frequency}</p>
                      </div>
                      
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                          <Users className="h-6 w-6 text-primary-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Follow-up Care</h4>
                        <p className="text-text-brown/70 leading-relaxed">{data.timeline.followUp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}