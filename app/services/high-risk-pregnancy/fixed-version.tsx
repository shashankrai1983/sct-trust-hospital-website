"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Phone, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FixedHighRiskPregnancy() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const riskFactors = [
    {
      category: "Age Factors",
      description: "Maternal age significantly impacts pregnancy risk levels",
      items: ["Under 17 years old", "Over 35 years old"]
    },
    {
      category: "Medical Conditions", 
      description: "Underlying health conditions requiring specialized monitoring",
      items: ["Diabetes", "High blood pressure", "Heart disease", "Autoimmune disorders"]
    },
    {
      category: "Lifestyle Factors",
      description: "Personal choices that can affect pregnancy safety", 
      items: ["Smoking", "Alcohol consumption", "Illegal drug use"]
    }
  ];

  const warningSigns = [
    "Vaginal bleeding",
    "Fever, diarrhea, or persistent vomiting", 
    "Pain or burning sensation during urination",
    "Decreased fetal movement",
    "Vision changes, such as blurred vision",
    "Persistent headaches"
  ];

  const faqs = [
    {
      question: "What exactly is a high-risk pregnancy?",
      answer: "A high-risk pregnancy is one where the mother or baby has an increased chance of health problems during pregnancy, labor, or delivery. The term &apos;high-risk&apos; doesn&apos;t mean something will definitely go wrong, but rather indicates that closer monitoring and specialized care are needed."
    },
    {
      question: "Does having a high-risk pregnancy mean my baby will have problems?",
      answer: "No, being classified as high-risk doesn&apos;t mean your baby will definitely have problems. Many women with high-risk pregnancies deliver healthy babies with proper care and monitoring."
    },
    {
      question: "How often will I need to visit the doctor?",
      answer: "High-risk pregnancies typically require more frequent antenatal visits for closer monitoring. The exact frequency depends on your specific risk factors and how your pregnancy progresses."
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-bg-offwhite via-accent-cream/50 to-primary-green/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <p className="text-primary-green font-medium mb-2">Dr. Amita Shukla</p>
                <p className="text-text-brown/70 text-sm mb-4">
                  Specializes in: High-Risk Pregnancy, Infertility, PCOS/PCOD, Advanced Laparoscopy
                </p>
              </div>
              
              <p className="text-primary-green font-medium mb-3">Specialized Maternal Care</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 green-title-text">
                High Risk Pregnancy
              </h1>
              
              <p className="text-xl text-text-brown/80 mb-8 leading-relaxed">
                Dr. Amita Shukla is one of the best Gynecologist Obstetricians & Laparoscopic Surgeons in Lucknow, Uttar Pradesh. She specializes in comprehensive care for high-risk pregnancies, ensuring the best outcomes for both mother and baby.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-brown/70">
                  <CheckCircle className="h-5 w-5 text-primary-green" />
                  <span className="text-sm">Expert Maternal-Fetal Medicine</span>
                </div>
                <div className="flex items-center gap-2 text-text-brown/70">
                  <CheckCircle className="h-5 w-5 text-primary-green" />
                  <span className="text-sm">Advanced Monitoring Technology</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="ghost" className="btn-green">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="btn-outline">
                  <a href="tel:+918303222222">
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-warm-lg">
                <Image 
                  src="https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png"
                  alt="High Risk Pregnancy Care by Dr. Amita Shukla"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
              Understanding High-Risk Pregnancy
            </h2>
            <p className="text-lg text-text-brown/80 leading-relaxed">
              Pregnancies can range from straightforward and low-risk, requiring routine antenatal care, to high-risk, which necessitates more intensive monitoring and care. The term &quot;high-risk&quot; is used to indicate that the pregnancy needs extra attention to ensure the health and safety of both mother and baby, not to alarm the parents.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Factors */}
      <section className="py-20 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
              What Constitutes a High-Risk Pregnancy?
            </h2>
            <p className="text-lg text-text-brown/80">
              A pregnancy is considered high-risk if the mother has any of the following conditions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {riskFactors.map((factor, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-text-brown text-lg mb-2">{factor.category}</h3>
                    <p className="text-text-brown/70 text-sm leading-relaxed">{factor.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {factor.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                      <span className="text-text-brown/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-700">
                Warning Signs to Watch For
              </h2>
              
              <p className="text-lg text-text-brown/80 leading-relaxed">
                It is crucial to report the following signs to your doctor immediately.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-warm-lg p-8 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-text-brown mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Critical Warning Signs
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {warningSigns.map((sign, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <span className="text-text-brown font-medium">{sign}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-red-600 font-semibold mb-4">
                  If you experience any of these symptoms, contact your doctor immediately!
                </p>
                
                <Button asChild variant="ghost" className="bg-red-600 hover:bg-red-700 text-white">
                  <a href="tel:+918303222222">
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency Contact: +91 8303222222
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-green/10 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary-green" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
              Frequently Asked Questions
            </h2>
            
            <p className="text-lg text-text-brown/80">
              Common questions about high-risk pregnancy care
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-white rounded-xl shadow-warm overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-accent-cream/20 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-text-brown pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-primary-green" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary-green" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-6 pt-2 border-t border-accent-cream/30">
                      <p className="text-text-brown/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-green/20 to-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
              Ready to Receive Expert High-Risk Pregnancy Care?
            </h2>
            
            <p className="text-lg text-text-brown/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t wait to get the specialized care you and your baby deserve. Schedule your consultation with Dr. Amita Shukla today and take the first step towards a healthy pregnancy journey.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <a href="tel:+918303222222">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-text-brown/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Specialized Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}