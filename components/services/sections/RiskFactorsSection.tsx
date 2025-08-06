"use client";

import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  CheckCircle,
  Heart
} from 'lucide-react';
import { RiskFactorSection as RiskFactorSectionType, ServiceInfo } from '@/types/services';

interface RiskFactorsSectionProps {
  data: RiskFactorSectionType;
  service: ServiceInfo;
}

export default function RiskFactorsSection({ data, service }: RiskFactorsSectionProps) {
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
    <section className="py-16 bg-gradient-to-b from-bg-offwhite via-accent-cream/30 to-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,108,56,0.03)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,108,37,0.03)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-primary-green/15 rounded-full mb-6 shadow-warm"
            variants={itemVariants}
          >
            <div className="p-2 bg-gradient-to-br from-primary-green to-forest-green rounded-full">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">Risk Assessment</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-text-brown"
            variants={itemVariants}
          >
            {data.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-text-brown/70 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Risk Factor Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.factors.map((factor, index) => {
            // Determine colors based on risk level
            const getRiskColors = (riskLevel: string) => {
              switch (riskLevel) {
                case 'high':
                  return {
                    bgColor: 'bg-red-500',
                    borderColor: 'border-red-200',
                    accentColor: 'text-red-600'
                  };
                case 'moderate':
                  return {
                    bgColor: 'bg-amber-500',
                    borderColor: 'border-amber-200',
                    accentColor: 'text-amber-600'
                  };
                case 'low':
                  return {
                    bgColor: 'bg-green-500',
                    borderColor: 'border-green-200',
                    accentColor: 'text-green-600'
                  };
                default:
                  return {
                    bgColor: 'bg-primary-green',
                    borderColor: 'border-primary-green/20',
                    accentColor: 'text-primary-green'
                  };
              }
            };

            const colors = getRiskColors(factor.riskLevel);
            
            return (
              <motion.div 
                key={index} 
                className="group relative"
                variants={itemVariants}
              >                
                {/* Risk Factor Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-warm hover:shadow-warm-lg border border-white/50 overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${colors.bgColor} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 text-white`}>
                        <AlertTriangle className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-text-brown group-hover:text-primary-green transition-colors duration-300">
                            {factor.category}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-semibold ${colors.accentColor} bg-white rounded-full border ${colors.borderColor}`}>
                            {factor.riskLevel.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-text-brown/70 text-sm leading-relaxed">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Risk Factors */}
                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-semibold text-text-brown mb-3">Risk Factors:</h4>
                    <div className="space-y-2">
                      {factor.factors.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-cream/20 to-transparent hover:from-accent-cream/40 transition-all duration-300 border-l-2 border-transparent hover:border-primary-green/30"
                        >
                          <div className={`p-1 ${colors.bgColor} rounded-full flex-shrink-0 mt-1`}>
                            <AlertTriangle className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-text-brown font-medium text-sm leading-relaxed hover:text-primary-green transition-colors duration-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Prevention Strategies */}
                  {factor.prevention && factor.prevention.length > 0 && (
                    <div className="px-6 pb-6">
                      <h4 className="text-sm font-semibold text-text-brown mb-3">Prevention Strategies:</h4>
                      <div className="space-y-2">
                        {factor.prevention.map((prevention, preventionIndex) => (
                          <div 
                            key={preventionIndex} 
                            className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-green/10 to-transparent hover:from-primary-green/20 transition-all duration-300"
                          >
                            <div className="p-1 bg-primary-green rounded-full flex-shrink-0 mt-1">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-text-brown font-medium text-sm leading-relaxed">
                              {prevention}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Bottom accent */}
                  <div className={`h-0.5 ${colors.bgColor} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Comfort Message */}
        {data.generalGuidance && (
          <motion.div 
            className="max-w-3xl mx-auto mt-12 text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-warm">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-primary-green to-forest-green rounded-full">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-brown">You're in Expert Hands</h3>
              </div>
              <p className="text-base text-text-brown/80 leading-relaxed">
                {data.generalGuidance}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}