"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';

interface WarningSignsAlertProps {
  title: string;
  subtitle?: string;
  warningMessage: string;
  signs: string[];
  emergencyNumber?: string;
}

export default function WarningSignsAlert({
  title,
  subtitle,
  warningMessage,
  signs,
  emergencyNumber = "+918303222222"
}: WarningSignsAlertProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-red-50 to-orange-50 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-700">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-lg text-red-600 font-medium mb-4">
                {subtitle}
              </p>
            )}
            
            <p className="text-lg text-text-brown/80 leading-relaxed">
              {warningMessage}
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-warm-lg p-8 border-l-4 border-red-500"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-text-brown mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Warning Signs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {signs.map((sign, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-text-brown font-medium">{sign}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-red-600 font-semibold mb-4">
                If you experience any of these symptoms, contact your doctor immediately!
              </p>
              
              <Button asChild variant="ghost" className="bg-red-600 hover:bg-red-700 text-white">
                <a href={`tel:${emergencyNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Contact: {emergencyNumber}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <GridPattern
        width={50}
        height={50}
        strokeDasharray={"1 2"}
        className="text-red-200/30 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,white_80%)]"
      />
    </section>
  );
}