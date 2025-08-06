"use client";

import { motion } from 'framer-motion';
import { 
  Stethoscope,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { TreatmentSection as TreatmentSectionType, ServiceInfo } from '@/types/services';

interface TreatmentSectionProps {
  data: TreatmentSectionType;
  service: ServiceInfo;
}

export default function TreatmentSection({ data, service }: TreatmentSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-white to-accent-cream/20 relative">
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
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-green font-semibold text-sm tracking-wide">TREATMENT OPTIONS</span>
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

        {/* Treatment Options Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.options.map((treatment, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              variants={itemVariants}
            >
              {/* Treatment Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary-green to-forest-green rounded-xl">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-brown mb-2">
                      {treatment.name}
                    </h3>
                    <p className="text-text-brown/70 leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>
                </div>

                {/* Treatment Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {treatment.successRate && (
                    <div className="text-center p-4 bg-primary-green/10 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-primary-green mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary-green">{treatment.successRate}</div>
                      <div className="text-xs text-text-brown/70">Success Rate</div>
                    </div>
                  )}
                  {treatment.duration && (
                    <div className="text-center p-4 bg-forest-green/10 rounded-xl">
                      <Clock className="h-6 w-6 text-forest-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-forest-green">{treatment.duration}</div>
                      <div className="text-xs text-text-brown/70">Duration</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Treatment Details */}
              <div className="px-8 pb-8">
                {/* Suitable For */}
                {treatment.suitableFor && treatment.suitableFor.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-brown mb-3">Suitable For:</h4>
                    <div className="space-y-2">
                      {treatment.suitableFor.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                          <span className="text-text-brown/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {treatment.benefits && treatment.benefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-brown mb-3">Benefits:</h4>
                    <div className="space-y-2">
                      {treatment.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green mt-0.5 flex-shrink-0" />
                          <span className="text-text-brown/80 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risks (if any) */}
                {treatment.risks && treatment.risks.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-brown mb-3">Considerations:</h4>
                    <div className="space-y-2">
                      {treatment.risks.map((risk, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-text-brown/80 text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recovery */}
                {treatment.recovery && (
                  <div className="p-4 bg-accent-cream/30 rounded-xl">
                    <h4 className="font-semibold text-text-brown mb-2">Recovery:</h4>
                    <p className="text-text-brown/80 text-sm leading-relaxed">{treatment.recovery}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Consultation Note */}
        {data.consultationNote && (
          <motion.div 
            className="max-w-4xl mx-auto mt-16 text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="p-8 bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-2xl border border-primary-green/20">
              <div className="inline-flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-primary-green" />
                <span className="font-semibold text-primary-green">Personalized Treatment Plan</span>
              </div>
              <p className="text-text-brown/80 leading-relaxed">
                {data.consultationNote}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}