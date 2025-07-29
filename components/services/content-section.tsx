"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  content: string[];
  backgroundColor?: 'white' | 'cream' | 'green';
  centerText?: boolean;
  listItems?: string[];
  listTitle?: string;
}

export default function ContentSection({
  title,
  subtitle,
  content,
  backgroundColor = 'white',
  centerText = false,
  listItems = [],
  listTitle
}: ContentSectionProps) {
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
        <div className={`max-w-4xl ${centerText ? 'mx-auto text-center' : ''} mb-12`}>
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
              className="text-lg text-primary-green font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className={`max-w-4xl ${centerText ? 'mx-auto' : ''}`}>
          {content.map((paragraph, index) => (
            <motion.p 
              key={index}
              className="text-lg text-text-brown/80 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}

          {listItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {listTitle && (
                <h3 className="text-xl font-bold text-text-brown mb-4">{listTitle}</h3>
              )}
              <ul className="space-y-3">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                    <span className="text-text-brown/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
      
      <GridPattern
        width={40}
        height={40}
        strokeDasharray={"1 3"}
        className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"
      />
    </section>
  );
}