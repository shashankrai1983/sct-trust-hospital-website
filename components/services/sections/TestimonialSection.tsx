"use client";

import { motion } from 'framer-motion';
import { Star, Quote, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { TestimonialSection as TestimonialSectionType, ServiceInfo } from '@/types/services';

interface TestimonialSectionProps {
  data: TestimonialSectionType;
  service: ServiceInfo;
}

export default function TestimonialSection({ data, service }: TestimonialSectionProps) {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent-cream/20 relative">
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
              <Quote className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">PATIENT STORIES</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-brown"
            variants={itemVariants}
          >
            {data.title}
          </motion.h2>
          
          {data.subtitle && (
            <motion.p 
              className="text-xl text-text-brown/70 leading-relaxed"
              variants={itemVariants}
            >
              {data.subtitle}
            </motion.p>
          )}

          {/* Overall Statistics */}
          {(data.totalCount || data.averageRating) && (
            <motion.div 
              className="flex justify-center items-center gap-8 mt-8 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-warm"
              variants={itemVariants}
            >
              {data.averageRating && (
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {renderStars(Math.round(data.averageRating))}
                  </div>
                  <div className="text-2xl font-bold text-primary-green">{data.averageRating}</div>
                  <div className="text-text-brown/70 text-sm">Average Rating</div>
                </div>
              )}
              
              {data.totalCount && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-green">{data.totalCount}+</div>
                  <div className="text-text-brown/70 text-sm">Happy Patients</div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {data.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              variants={itemVariants}
            >
              {/* Testimonial Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-forest-green rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-text-brown">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 text-text-brown/70 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-text-brown/70 text-sm">({testimonial.rating}/5)</span>
                </div>

                {/* Service */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-green/10 rounded-full mb-4">
                  <span className="text-primary-green text-sm font-medium">{testimonial.service}</span>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="px-8 pb-8">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary-green/20" />
                  <p className="text-text-brown/80 leading-relaxed italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Date */}
                {testimonial.date && (
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-primary-green/10">
                    <Calendar className="h-4 w-4 text-text-brown/50" />
                    <span className="text-text-brown/50 text-sm">{testimonial.date}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="p-8 bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-2xl border border-primary-green/20">
            <Quote className="h-12 w-12 text-primary-green mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-text-brown mb-4">
              Your Success Story Awaits
            </h3>
            <p className="text-text-brown/80 leading-relaxed mb-6">
              Join hundreds of satisfied patients who have experienced exceptional care with Dr. Amita Shukla. 
              Your journey to better health starts with a single consultation.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 rounded-full">
              <Star className="h-4 w-4 text-primary-green" />
              <span className="text-primary-green font-semibold text-sm">Trusted by 5000+ patients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}