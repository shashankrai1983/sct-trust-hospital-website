"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WarningSection as WarningSectionType, ServiceInfo } from '@/types/services';

interface WarningSectionProps {
  data: WarningSectionType;
  service: ServiceInfo;
}

export default function WarningSection({ data, service }: WarningSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-accent-cream/30 via-bg-offwhite to-accent-cream/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green rounded-full shadow-xl mb-8">
              <div className="p-2 bg-white/20 rounded-full">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Critical Alert</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-brown">
              {data.title}
            </h2>
            
            <p className="text-xl text-text-brown/80 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Warning Signs Grid */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {data.signs.map((sign, index) => (
                <div 
                  key={index} 
                  className={`group p-6 rounded-xl border-l-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    sign.severity === 'critical' 
                      ? 'bg-red-50 border-red-500 hover:bg-red-100' 
                      : 'bg-amber-50 border-amber-500 hover:bg-amber-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      sign.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                    }`}>
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-text-brown font-semibold group-hover:text-gray-900 transition-colors">
                        {sign.text}
                      </span>
                      {sign.severity === 'critical' && (
                        <span className="inline-block ml-2 px-2 py-1 text-white text-xs rounded-full bg-red-500">
                          Critical
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="text-center p-8 bg-primary-green rounded-2xl text-white">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Emergency Protocol</span>
                </div>
                <p className="text-xl font-bold mb-2">If you experience any of these symptoms</p>
                <p className="text-white/90">Contact your doctor immediately - Don't wait!</p>
              </div>
              
              <Button asChild className="bg-white text-secondary-brown hover:bg-gray-100 px-8 py-4 rounded-full shadow-xl font-bold text-lg">
                <a href={`tel:${data.emergencyContact.phone}`} className="flex items-center gap-3">
                  <Phone className="h-6 w-6" />
                  Emergency: {data.emergencyContact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}