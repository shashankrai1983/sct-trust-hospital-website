"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar,
  Phone,
  Clock,
  Shield,
  Award,
  Star,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icons';
import { CTASection as CTASectionType } from '@/types/services';
import { useService } from '@/contexts/service-context';

interface CTASectionProps {
  data: CTASectionType;
}

export default function CTASection({ data }: CTASectionProps) {
  const service = useService();
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

  const featureIcons = [Clock, Shield, Award];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-forest-green"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      {/* Elegant decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center text-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-12 space-y-8">
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
              variants={itemVariants}
            >
              <Star className="h-5 w-5" />
              <span className="font-semibold">Premium Healthcare Excellence</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              variants={itemVariants}
            >
              {data.title}<br />
              <span className="text-white">
                {data.subtitle || `${service.name}?`}
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>

            {/* Urgency Note */}
            {data.urgencyNote && (
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                variants={itemVariants}
              >
                <Heart className="h-4 w-4 text-accent-cream" />
                <span className="text-white/90 font-medium text-sm">{data.urgencyNote}</span>
              </motion.div>
            )}
          </div>
          
          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            <Button asChild className="bg-white text-primary-green hover:bg-gray-100 px-10 py-6 rounded-full shadow-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300">
              <Link href={data.primaryAction.href} className="flex items-center gap-3">
                {(() => {
                  const IconComponent = data.primaryAction.icon ? getIcon(data.primaryAction.icon) : Calendar;
                  return <IconComponent className="h-6 w-6" />;
                })()}
                {data.primaryAction.text}
              </Link>
            </Button>
            <Button asChild className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white/70 backdrop-blur-md px-10 py-6 rounded-full shadow-xl hover:shadow-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300">
              <Link href={data.secondaryAction.href} className="flex items-center gap-3">
                {(() => {
                  const IconComponent = data.secondaryAction.icon ? getIcon(data.secondaryAction.icon) : Phone;
                  return <IconComponent className="h-6 w-6" />;
                })()}
                {data.secondaryAction.text}
              </Link>
            </Button>
          </motion.div>
          
          {/* Features/Trust Indicators */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 text-white/80"
            variants={containerVariants}
          >
            {data.features.map((feature, i) => {
              const IconComponent = featureIcons[i] || featureIcons[0];
              return (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  variants={itemVariants}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Indicators Badges */}
          {data.trustIndicators && data.trustIndicators.length > 0 && (
            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-4"
              variants={containerVariants}
            >
              {data.trustIndicators.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/25"
                  variants={itemVariants}
                >
                  {badge.icon && (() => {
                    const IconComponent = getIcon(badge.icon);
                    return <IconComponent className="h-4 w-4" />;
                  })()}
                  <span className="text-white/90 font-medium text-sm">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Emergency Contact Section */}
          <motion.div 
            className="mt-16 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            variants={itemVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Medical Emergency?
              </h3>
              <p className="text-white/90 mb-6">
                For urgent medical concerns, don't wait for an appointment
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-white/20 hover:bg-white/30 text-white border border-white/50 px-6 py-3 rounded-full font-semibold">
                  <a href="tel:+918303222222" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency: +91 8303222222
                  </a>
                </Button>
                <Button asChild className="bg-white/20 hover:bg-white/30 text-white border border-white/50 px-6 py-3 rounded-full font-semibold">
                  <a href="tel:+915224242424" className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Hospital: +91 522-4242424
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Doctor Information Footer */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-white/80">
              <span className="font-semibold">Dr. Amita Shukla</span> - 
              Gynecologist, Obstetrician & Laparoscopic Surgeon<br />
              SCT Trust Hospital, Lucknow | 10+ Years Experience
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}