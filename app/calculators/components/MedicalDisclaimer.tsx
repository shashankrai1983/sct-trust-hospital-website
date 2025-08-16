'use client';

// Medical Disclaimer Component
// Professional medical disclaimer for calculator results

import React from 'react';
import { AlertTriangle, Heart } from 'lucide-react';
import { calculatorTheme } from '../utils/calculatorTheme';

interface MedicalDisclaimerProps {
  doctor?: string;
  hospital?: string;
  calculatorType?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  doctor = 'Dr. Amita Shukla',
  hospital = 'SCT Trust Hospital',
  calculatorType = 'calculator',
  className = '',
  variant = 'default',
}) => {
  const getDisclaimerContent = () => {
    const baseContent = {
      title: 'Medical Disclaimer',
      subtitle: 'Important Information About Your Results',
    };

    switch (variant) {
      case 'compact':
        return {
          ...baseContent,
          content: `These ${calculatorType} results are estimates for educational purposes only. Please consult with ${doctor} at ${hospital} for personalized medical advice.`,
        };

      case 'detailed':
        return {
          ...baseContent,
          content: [
            `The results provided by this ${calculatorType} are mathematical estimates based on established medical formulas and should be used for educational and informational purposes only.`,
            `These calculations are not a substitute for professional medical advice, diagnosis, or treatment. Every pregnancy and individual is unique, and actual results may vary significantly.`,
            `For personalized medical guidance, accurate assessments, and professional healthcare advice, please schedule a consultation with ${doctor} at ${hospital} in Lucknow.`,
            `If you have any concerns about your health or pregnancy, please contact your healthcare provider immediately.`,
          ],
        };

      default:
        return {
          ...baseContent,
          content: `These results are estimates for educational purposes only and should not replace professional medical advice. Please consult with ${doctor} at ${hospital} for personalized medical guidance and care. Every pregnancy is unique, and individual results may vary.`,
        };
    }
  };

  const disclaimerContent = getDisclaimerContent();

  if (variant === 'compact') {
    return (
      <div className={`${calculatorTheme.classes.disclaimer} ${className}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-brown font-medium">
              {disclaimerContent.title}
            </p>
            <p className="text-xs text-text-brown/80 mt-1">
              {disclaimerContent.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${calculatorTheme.classes.disclaimer} ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-green" />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-base font-semibold text-text-brown mb-2">
            {disclaimerContent.title}
          </h4>
          
          {variant === 'detailed' && (
            <p className="text-sm font-medium text-primary-green mb-3">
              {disclaimerContent.subtitle}
            </p>
          )}
          
          {Array.isArray(disclaimerContent.content) ? (
            <div className="space-y-3">
              {disclaimerContent.content.map((paragraph, index) => (
                <p key={index} className="text-sm text-text-brown leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-brown leading-relaxed">
              {disclaimerContent.content}
            </p>
          )}
          
          {/* Contact information for detailed variant */}
          {variant === 'detailed' && (
            <div className="mt-4 pt-4 border-t border-primary-green/20">
              <div className="bg-accent-cream/50 rounded-lg p-3">
                <p className="text-sm font-medium text-text-brown mb-1">
                  Professional Medical Consultation
                </p>
                <p className="text-sm text-text-brown/80">
                  Book an appointment with {doctor} at {hospital}, Lucknow for comprehensive prenatal care and personalized medical guidance.
                </p>
                <div className="mt-2">
                  <a
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-primary-green hover:text-forest-green transition-colors"
                  >
                    Schedule Consultation
                    <Heart className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick facts for default variant */}
      {variant === 'default' && (
        <div className="mt-4 pt-4 border-t border-primary-green/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-brown/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-green rounded-full"></div>
              <span>Results based on medical standards</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest-green rounded-full"></div>
              <span>Individual results may vary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-beige rounded-full"></div>
              <span>Educational purposes only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-brown rounded-full"></div>
              <span>Consult your healthcare provider</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simplified version for forms
export const QuickDisclaimer: React.FC<Pick<MedicalDisclaimerProps, 'className'>> = ({ className = '' }) => (
  <p className={`text-xs text-text-brown/60 text-center ${className}`}>
    Results are estimates. Consult Dr. Amita Shukla for medical advice.
  </p>
);

// Emergency contact disclaimer
export const EmergencyDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-800 mb-1">
          Emergency Medical Attention
        </p>
        <p className="text-sm text-red-700">
          If you are experiencing severe symptoms, bleeding, severe pain, or have concerns about your immediate health, please contact your healthcare provider immediately or visit the nearest emergency room.
        </p>
      </div>
    </div>
  </div>
);

export default MedicalDisclaimer;