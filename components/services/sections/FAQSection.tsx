"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQSection as FAQSectionType, ServiceInfo } from '@/types/services';

interface FAQSectionProps {
  data: FAQSectionType;
  service: ServiceInfo;
}

export default function FAQSection({ data, service }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Group FAQs by category if categories exist
  const categorizedFAQs = data.faqs.reduce((acc, faq, index) => {
    const category = faq.category || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...faq, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<typeof data.faqs[0] & { originalIndex: number }>>);

  const categoryTitles = {
    general: 'General Information',
    treatment: 'Treatment & Procedures',
    cost: 'Cost & Insurance',
    recovery: 'Recovery & Aftercare',
    risk: 'Risks & Safety'
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent-cream/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-lg"
              variants={itemVariants}
            >
              <div className="p-2 bg-primary-green rounded-full">
                <HelpCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-primary-green font-bold text-sm tracking-wide">EXPERT ANSWERS</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="text-primary-green">
                {data.title || 'Frequently Asked Questions'}
              </span>
            </motion.h2>
            
            {data.description && (
              <motion.p 
                className="text-xl text-text-brown/80 leading-relaxed"
                variants={itemVariants}
              >
                {data.description}
              </motion.p>
            )}
            
            <motion.div 
              className="w-24 h-1.5 bg-primary-green rounded-full mx-auto mt-8 shadow-lg"
              variants={itemVariants}
            ></motion.div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-8">
            {Object.entries(categorizedFAQs).map(([category, faqs]) => (
              <motion.div key={category} variants={itemVariants}>
                {/* Category Header (if more than one category) */}
                {Object.keys(categorizedFAQs).length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-text-brown mb-2">
                      {categoryTitles[category as keyof typeof categoryTitles] || category}
                    </h3>
                    <div className="w-16 h-0.5 bg-primary-green rounded-full"></div>
                  </div>
                )}

                {/* FAQ Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {faqs.map((faq) => (
                    <motion.div 
                      key={faq.originalIndex} 
                      className="group"
                      variants={faqVariants}
                    >
                      <div className="bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <button
                          onClick={() => setOpenFAQ(openFAQ === faq.originalIndex ? null : faq.originalIndex)}
                          className="w-full p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-accent-cream/30 hover:to-primary-green/5 transition-all duration-300"
                        >
                          <h3 className="text-lg font-bold text-text-brown pr-6 group-hover:text-primary-green transition-colors">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0 p-2 bg-primary-green rounded-full">
                            {openFAQ === faq.originalIndex ? (
                              <ChevronUp className="h-5 w-5 text-white" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-white" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openFAQ === faq.originalIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8 pt-2 bg-gradient-to-r from-accent-cream/20 to-primary-green/5 border-t border-primary-green/20">
                                <p className="text-text-brown/80 leading-relaxed text-lg">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Note */}
          {data.contactNote && (
            <motion.div 
              className="mt-16 p-8 bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-2xl border border-primary-green/20"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-green rounded-full">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-3">
                  Still Have Questions?
                </h3>
                <p className="text-text-brown/80 mb-6 leading-relaxed">
                  {data.contactNote}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="bg-primary-green hover:bg-forest-green text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <a href="tel:+918303222222" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <a href="/contact" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Send Message
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Default Contact Section */}
          {!data.contactNote && (
            <motion.div 
              className="mt-16 text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-warm border border-white/50"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 rounded-full mb-4">
                <MessageCircle className="h-4 w-4 text-primary-green" />
                <span className="text-primary-green font-semibold text-sm">Need More Information?</span>
              </div>
              <h3 className="text-xl font-bold text-text-brown mb-3">
                Get Personalized Answers
              </h3>
              <p className="text-text-brown/80 mb-6">
                Every medical situation is unique. Contact Dr. Amita Shukla for personalized advice about your {service.name.toLowerCase()}.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-gradient-to-r from-primary-green to-forest-green hover:from-forest-green hover:to-primary-green text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href="tel:+918303222222" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call +91 8303222222
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href="/contact" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Book Consultation
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}