"use client";

import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { SOPSection as SOPSectionType, ServiceInfo } from '@/types/services';

interface SOPSectionProps {
  data: SOPSectionType;
  service: ServiceInfo;
}

export default function SOPSection({ data, service }: SOPSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-bg-offwhite to-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green/10 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-warm"
            variants={itemVariants}
          >
            <div className="p-2 bg-primary-green rounded-full">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">CARE GUIDELINES</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-brown"
            variants={itemVariants}
          >
            {data.title}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-text-brown/70 leading-relaxed"
            variants={itemVariants}
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* SOP Categories */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {data.categories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 overflow-hidden transition-all duration-300"
                variants={itemVariants}
              >
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 ${category.bgColor} rounded-xl shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-brown mb-2">
                        {category.name}
                      </h3>
                      <p className="text-text-brown/70 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SOP Items */}
                <div className="px-8 pb-8">
                  <div className="space-y-6">
                    {category.items.slice(0, 2).map((item) => ( // Show first 2 items as preview
                      <div key={item.id} className="border-l-4 border-primary-green/30 pl-6">
                        <h4 className="text-lg font-semibold text-text-brown mb-3">
                          {item.title}
                        </h4>
                        <p className="text-text-brown/70 text-sm mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Key Recommendations Preview */}
                        <div className="space-y-2">
                          {item.recommendations.slice(0, 3).map((rec, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                              <span className="text-text-brown/80 text-sm leading-relaxed">
                                {rec}
                              </span>
                            </div>
                          ))}
                          {item.recommendations.length > 3 && (
                            <p className="text-text-brown/60 text-xs italic">
                              +{item.recommendations.length - 3} more guidelines...
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {category.items.length > 2 && (
                      <div className="text-center p-4 bg-primary-green/5 rounded-xl">
                        <p className="text-text-brown/70 text-sm">
                          <span className="font-semibold">{category.items.length - 2} more detailed guidelines</span> available during consultation
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global Disclaimer */}
        {data.globalDisclaimer && (
          <motion.div 
            className="max-w-4xl mx-auto mt-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-3">Important Medical Disclaimer</h4>
                  <p className="text-amber-700 leading-relaxed">
                    {data.globalDisclaimer}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}