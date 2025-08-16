'use client';

// Calculator Template Component
// Reusable template for all calculator pages with forest green theme

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Heart, Shield, Users, Award } from 'lucide-react';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from './animations/ForestAnimations';
import MedicalDisclaimer from './MedicalDisclaimer';

interface CalculatorTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showDisclaimer?: boolean;
  disclaimerVariant?: 'default' | 'compact' | 'detailed';
  relatedCalculators?: Array<{ title: string; href: string; description: string }>;
  className?: string;
}

export const CalculatorTemplate: React.FC<CalculatorTemplateProps> = ({
  title,
  description,
  children,
  breadcrumbs = [],
  showDisclaimer = true,
  disclaimerVariant = 'default',
  relatedCalculators = [],
  className = '',
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate page entry
    if (headerRef.current) {
      presets.cardEntry(headerRef.current);
    }
    if (contentRef.current) {
      setTimeout(() => {
        presets.cardEntry(contentRef.current!);
      }, 200);
    }
  }, []);

  const defaultBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: title },
  ];

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <div className={`theme-forest min-h-screen bg-accent-cream ${className}`}>
      {/* Header Section */}
      <div ref={headerRef} className="bg-white border-b border-primary-green/10" style={{ opacity: 0 }}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              {finalBreadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-text-brown/40">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-primary-green hover:text-forest-green transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-text-brown/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Back Button */}
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 text-primary-green hover:text-forest-green transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Calculators</span>
          </Link>

          {/* Title Section */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calculator className="w-6 h-6 text-primary-green" />
            </div>
            <div>
              <h1 className={calculatorTheme.classes.title}>
                {title}
              </h1>
              <p className="text-lg text-text-brown/80 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-text-brown/70">
              <Shield className="w-4 h-4 text-primary-green" />
              <span>Medical Accuracy</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-brown/70">
              <Heart className="w-4 h-4 text-forest-green" />
              <span>Professional Guidance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-brown/70">
              <Users className="w-4 h-4 text-primary-beige" />
              <span>Trusted by Thousands</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-brown/70">
              <Award className="w-4 h-4 text-secondary-brown" />
              <span>Dr. Amita Shukla</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Content */}
            <div className="lg:col-span-2">
              <div ref={contentRef} style={{ opacity: 0 }}>
                <div className={calculatorTheme.classes.card}>
                  {children}
                </div>
              </div>

              {/* Medical Disclaimer */}
              {showDisclaimer && (
                <div className="mt-8">
                  <MedicalDisclaimer
                    variant={disclaimerVariant}
                    calculatorType={title.toLowerCase()}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-green" />
                    Professional Care
                  </h3>
                  <p className="text-sm text-text-brown/80 mb-4">
                    Get personalized medical guidance from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-green hover:text-forest-green transition-colors"
                  >
                    Schedule Consultation
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>

                {/* Related Calculators */}
                {relatedCalculators.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                    <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary-green" />
                      Related Calculators
                    </h3>
                    <div className="space-y-3">
                      {relatedCalculators.map((calc, index) => (
                        <Link
                          key={index}
                          href={calc.href}
                          className="block p-3 rounded-lg hover:bg-accent-cream/50 transition-colors group"
                        >
                          <h4 className="font-medium text-text-brown group-hover:text-primary-green transition-colors">
                            {calc.title}
                          </h4>
                          <p className="text-sm text-text-brown/70 mt-1">
                            {calc.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educational Content */}
                <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
                  <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-green" />
                    Educational Resources
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/services/antenatal-care"
                      className="block text-sm text-primary-green hover:text-forest-green transition-colors"
                    >
                      → Comprehensive Antenatal Care
                    </Link>
                    <Link
                      href="/services/high-risk-pregnancy"
                      className="block text-sm text-primary-green hover:text-forest-green transition-colors"
                    >
                      → High-Risk Pregnancy Management
                    </Link>
                    <Link
                      href="/blog"
                      className="block text-sm text-primary-green hover:text-forest-green transition-colors"
                    >
                      → Pregnancy Health Articles
                    </Link>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Emergency Contact
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    If you're experiencing severe symptoms or have urgent concerns, contact your healthcare provider immediately.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800 transition-colors"
                  >
                    Contact Dr. Amita Shukla
                    <Heart className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-primary-green/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-text-brown mb-3">
              Need Professional Medical Guidance?
            </h3>
            <p className="text-text-brown/80 mb-6">
              Schedule a consultation with Dr. Amita Shukla for personalized care and comprehensive prenatal guidance at SCT Trust Hospital, Lucknow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={`${calculatorTheme.classes.button} inline-flex items-center justify-center gap-2`}
              >
                Book Appointment
                <Heart className="w-4 h-4" />
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
      </div>
    </div>
  );
};

export default CalculatorTemplate;