'use client';

// Women's Health Calculators Landing Page
// Professional calculator overview with forest green theme

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calculator, Calendar, Heart, Activity, Scale, Droplets, Pill, Baby, Target, Star, ArrowRight, Shield, Users, Award } from 'lucide-react';
import { calculatorTheme } from './utils/calculatorTheme';
import { presets } from './components/animations/ForestAnimations';
import MedicalDisclaimer from './components/MedicalDisclaimer';

interface CalculatorCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  category: string;
  popular?: boolean;
  comingSoon?: boolean;
}

export default function CalculatorsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate page entry
    if (headerRef.current) {
      presets.cardEntry(headerRef.current);
    }
    if (cardsRef.current) {
      setTimeout(() => {
        presets.cardEntry(cardsRef.current!);
      }, 300);
    }
  }, []);

  const calculators: CalculatorCard[] = [
    // Pregnancy Calculators
    {
      title: 'Due Date Calculator',
      description: 'Calculate your expected delivery date using your Last Menstrual Period (LMP)',
      href: '/calculators/due-date-calculator',
      icon: Calendar,
      category: 'Pregnancy',
      popular: true,
    },
    {
      title: 'Pregnancy Week Calculator',
      description: 'Track your current pregnancy week, trimester, and development milestones',
      href: '/calculators/pregnancy-week-calculator',
      icon: Baby,
      category: 'Pregnancy',
      comingSoon: true,
    },
    {
      title: 'Conception Date Calculator',
      description: 'Estimate when conception occurred based on your due date or LMP',
      href: '/calculators/conception-date-calculator',
      icon: Heart,
      category: 'Pregnancy',
      comingSoon: true,
    },
    {
      title: 'Weight Gain Calculator',
      description: 'Monitor healthy weight gain during pregnancy based on your BMI',
      href: '/calculators/weight-gain-calculator',
      icon: Scale,
      category: 'Pregnancy',
    },
    {
      title: 'High-Risk Pregnancy Assessment',
      description: 'Professional risk evaluation for pregnancy complications and specialized care',
      href: '/calculators/high-risk-pregnancy-assessment',
      icon: Shield,
      category: 'Pregnancy',
      popular: true,
    },

    // Fertility & Ovulation
    {
      title: 'Ovulation Calculator',
      description: 'Predict your ovulation date and fertile window for conception planning',
      href: '/calculators/ovulation-calculator',
      icon: Target,
      category: 'Fertility',
      popular: true,
    },
    {
      title: 'Fertile Window Calculator',
      description: 'Calculate your 6-day fertility window for optimal conception timing',
      href: '/calculators/fertile-window-calculator',
      icon: Activity,
      category: 'Fertility',
    },

    // Health Assessment
    {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and get health recommendations',
      href: '/calculators/bmi-calculator',
      icon: Scale,
      category: 'Health',
    },
    {
      title: 'Prenatal Vitamin Calculator',
      description: 'Get personalized vitamin and mineral recommendations for pregnancy',
      href: '/calculators/prenatal-vitamin-calculator',
      icon: Pill,
      category: 'Nutrition',
      comingSoon: true,
    },
  ];

  const categories = Array.from(new Set(calculators.map(calc => calc.category)));

  return (
    <div className="theme-forest min-h-screen bg-accent-cream">
      {/* Header Section */}
      <div ref={headerRef} className="bg-white border-b border-primary-green/10" style={{ opacity: 0 }}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-10 h-10 text-primary-green" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-text-brown mb-6">
              Women's Health
              <span className="text-primary-green"> Calculators</span>
            </h1>
            
            <p className="text-xl text-text-brown/80 leading-relaxed mb-8">
              Professional pregnancy and women's health calculators with medical accuracy. 
              Calculate due dates, track pregnancy progress, monitor ovulation, and more with 
              expert guidance from <strong>Dr. Amita Shukla</strong> at SCT Trust Hospital, Lucknow.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-primary-green mb-2" />
                <h3 className="font-semibold text-text-brown">Medical Accuracy</h3>
                <p className="text-sm text-text-brown/70">Standard medical formulas</p>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-8 h-8 text-forest-green mb-2" />
                <h3 className="font-semibold text-text-brown">Professional Guidance</h3>
                <p className="text-sm text-text-brown/70">Expert medical oversight</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-primary-beige mb-2" />
                <h3 className="font-semibold text-text-brown">Trusted by Thousands</h3>
                <p className="text-sm text-text-brown/70">Reliable health tools</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-secondary-brown mb-2" />
                <h3 className="font-semibold text-text-brown">Dr. Amita Shukla</h3>
                <p className="text-sm text-text-brown/70">Expert gynecologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="container mx-auto px-4 py-16">
        <div ref={cardsRef} style={{ opacity: 0 }}>
          {categories.map(category => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-text-brown mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary-green rounded-full"></div>
                {category} Calculators
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators
                  .filter(calc => calc.category === category)
                  .map((calculator, index) => (
                    <CalculatorCard key={calculator.href} calculator={calculator} index={index} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-8 border border-primary-green/20">
            <Star className="w-12 h-12 text-primary-green mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-brown mb-3">
              More Calculators Coming Soon
            </h3>
            <p className="text-text-brown/80 mb-6 max-w-2xl mx-auto">
              We're continuously expanding our collection of professional health calculators. 
              Each tool is developed with medical accuracy and validated by Dr. Amita Shukla 
              to provide you with reliable health insights.
            </p>
            <Link
              href="/contact"
              className={`${calculatorTheme.classes.button} inline-flex items-center gap-2`}
            >
              Request a Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Professional Consultation CTA */}
        <div className="mt-16">
          <div className="bg-white rounded-xl p-8 border border-primary-green/20 text-center">
            <Heart className="w-12 h-12 text-primary-green mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-text-brown mb-4">
              Need Professional Medical Guidance?
            </h3>
            <p className="text-text-brown/80 mb-6 max-w-3xl mx-auto">
              While our calculators provide valuable estimates, every pregnancy and health journey is unique. 
              Schedule a consultation with Dr. Amita Shukla for personalized care, comprehensive health assessments, 
              and professional guidance throughout your pregnancy journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={`${calculatorTheme.classes.button} inline-flex items-center justify-center gap-2`}
              >
                Book Consultation
                <Calendar className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-6 py-3 border-2 border-primary-green text-primary-green font-medium rounded-lg hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-16">
          <MedicalDisclaimer variant="detailed" calculatorType="health calculators" />
        </div>
      </div>
    </div>
  );
}

// Calculator Card Component
const CalculatorCard: React.FC<{ 
  calculator: CalculatorCard; 
  index: number;
}> = ({ calculator, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = calculator.icon;

  const handleCardClick = () => {
    if (cardRef.current && !calculator.comingSoon) {
      presets.buttonPress(cardRef.current);
    }
  };

  if (calculator.comingSoon) {
    return (
      <div
        ref={cardRef}
        className="bg-white rounded-xl p-6 border border-primary-green/20 opacity-60 cursor-not-allowed"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary-green/5 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-green/60" />
          </div>
          <span className="bg-primary-beige/20 text-primary-beige text-xs font-medium px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-text-brown/60 mb-2">
          {calculator.title}
        </h3>
        <p className="text-sm text-text-brown/50 leading-relaxed">
          {calculator.description}
        </p>
      </div>
    );
  }

  return (
    <Link href={calculator.href} onClick={handleCardClick}>
      <div
        ref={cardRef}
        className="bg-white rounded-xl p-6 border border-primary-green/20 hover:border-primary-green/40 hover:shadow-warm transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center group-hover:bg-primary-green/20 transition-colors">
            <Icon className="w-6 h-6 text-primary-green" />
          </div>
          {calculator.popular && (
            <span className="bg-forest-green text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Popular
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-text-brown mb-2 group-hover:text-primary-green transition-colors">
          {calculator.title}
        </h3>
        <p className="text-sm text-text-brown/70 leading-relaxed mb-4">
          {calculator.description}
        </p>
        
        <div className="flex items-center text-primary-green text-sm font-medium group-hover:gap-2 transition-all">
          <span>Use Calculator</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};