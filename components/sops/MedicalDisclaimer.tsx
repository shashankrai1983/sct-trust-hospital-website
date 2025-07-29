"use client";

import { AlertTriangle } from 'lucide-react';
import EmergencyContacts from './EmergencyContacts';

interface EmergencyContact {
  type: 'primary' | 'hospital' | 'specialist' | 'emergency';
  name: string;
  phone: string;
  description: string;
}

interface MedicalDisclaimerProps {
  title?: string;
  content: string;
  emergencyContacts?: EmergencyContact[];
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export default function MedicalDisclaimer({ 
  title = "Important Medical Disclaimer",
  content,
  emergencyContacts,
  variant = 'full',
  className = ''
}: MedicalDisclaimerProps) {
  if (variant === 'minimal') {
    return (
      <div className={`p-4 bg-secondary-brown/10 rounded-xl border border-secondary-brown/20 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-secondary-brown flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-brown/80 leading-relaxed">
            <strong>Important:</strong> {content}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-gradient-to-r from-secondary-brown/10 to-primary-green/10 rounded-2xl border border-secondary-brown/20 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-secondary-brown rounded-full flex-shrink-0">
            <AlertTriangle className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-brown mb-2">{title}</h4>
            <p className="text-xs text-text-brown/80 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-gradient-to-r from-secondary-brown/10 via-primary-green/5 to-forest-green/10 rounded-2xl border-l-4 border-secondary-brown shadow-warm backdrop-blur-sm ${className}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-secondary-brown rounded-full flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-brown mb-2">{title}</h3>
          <p className="text-text-brown/80 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}