"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface RiskFactor {
  category: string;
  description: string;
  items?: string[];
}

interface RiskFactorsListProps {
  title: string;
  subtitle?: string;
  riskFactors: RiskFactor[];
  backgroundColor?: 'white' | 'cream' | 'green';
  showIcons?: boolean;
}

export default function RiskFactorsList({
  title,
  subtitle,
  riskFactors,
  backgroundColor = 'cream',
  showIcons = true
}: RiskFactorsListProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const backgroundClasses = {
    white: 'bg-white',
    cream: 'bg-accent-cream/30',
    green: 'bg-primary-green/10'
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 ${backgroundClasses[backgroundColor]} relative`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
              className="text-lg text-text-brown/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {riskFactors.map((factor, index) => (
            <motion.div
              key={factor.category}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-start gap-3 mb-4">
                {showIcons && (
                  <AlertTriangle className="h-6 w-6 text-primary-green mt-1 flex-shrink-0" />
                )}
                <div>
                  <h3 className="font-bold text-text-brown text-lg mb-2">{factor.category}</h3>
                  <p className="text-text-brown/70 text-sm leading-relaxed">{factor.description}</p>
                </div>
              </div>
              
              {factor.items && factor.items.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {factor.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                      <span className="text-text-brown/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}