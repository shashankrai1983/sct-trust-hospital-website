"use client";

import { motion } from 'framer-motion';
import { 
  Award,
  CheckCircle,
  Star
} from 'lucide-react';
import { getIcon } from '@/lib/icons';
import { DifferentiatorSection as DifferentiatorSectionType, ServiceInfo } from '@/types/services';

interface DifferentiatorsSectionProps {
  data: DifferentiatorSectionType;
  service: ServiceInfo;
}

export default function DifferentiatorsSection({ data, service }: DifferentiatorsSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-accent-cream/30 to-white relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(96,108,56,0.05)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,139,34,0.05)_0%,transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-warm"
            variants={itemVariants}
          >
            <div className="p-2 bg-primary-green rounded-full">
              <Award className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">SPECIALIZED EXCELLENCE</span>
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

        {/* Differentiators Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.items.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            
            return (
              <motion.div 
                key={index} 
                className="group relative"
                variants={itemVariants}
              >
                <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                  <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-brown/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-primary-green/10">
                      {item.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-primary-green font-semibold text-sm">
                          <Star className="h-4 w-4" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Statistics */}
        {data.trustStatistics && data.trustStatistics.length > 0 && (
          <motion.div 
            className="mt-20 max-w-5xl mx-auto"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="p-8 bg-gradient-to-r from-white/80 to-accent-cream/50 rounded-3xl border border-primary-green/10 shadow-warm backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {data.trustStatistics.map((stat, index) => {
                  const IconComponent = stat.icon ? getIcon(stat.icon) : Award;
                  
                  return (
                    <div key={index}>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-green/10 rounded-full mb-4">
                        <IconComponent className="h-6 w-6 text-primary-green" />
                      </div>
                      <div className="text-3xl font-bold text-primary-green mb-2">{stat.value}</div>
                      <div className="text-text-brown font-medium mb-1">{stat.label}</div>
                      {stat.description && (
                        <div className="text-text-brown/70 text-sm">{stat.description}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}