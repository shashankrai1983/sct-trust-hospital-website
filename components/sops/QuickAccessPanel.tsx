"use client";

import { Phone, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyContact {
  type: string;
  name: string;
  phone: string;
  description: string;
}

interface QuickAccessPanelProps {
  emergencyContacts: EmergencyContact[];
  className?: string;
}

export default function QuickAccessPanel({ 
  emergencyContacts, 
  className = '' 
}: QuickAccessPanelProps) {
  return (
    <div className={`space-y-3 ${className}`}>

      {/* Minimal Quick Guidelines */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <h3 className="text-sm font-medium text-gray-800">
            Quick Reference
          </h3>
        </div>

        <div className="space-y-1.5">
          {[
            "Never ignore warning signs - call immediately",
            "Take prescribed medications as directed",
            "Attend all scheduled appointments",
            "Monitor fetal movements daily", 
            "Stay hydrated and maintain proper nutrition"
          ].map((guideline, index) => (
            <div key={index} className="flex items-start gap-1.5 p-1.5 bg-gray-50/50 rounded-md">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-700 text-xs leading-relaxed">
                {guideline}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Support Hours */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <h4 className="text-sm font-medium text-gray-800">Support Hours</h4>
        </div>
        
        <div className="space-y-1.5 text-xs">
          <div>
            <div className="font-medium text-gray-700">Emergency Care</div>
            <div className="text-gray-600">24/7 Available</div>
          </div>
          <div>
            <div className="font-medium text-gray-700">Consultations</div>
            <div className="text-gray-600">9 AM - 8 PM Daily</div>
          </div>
        </div>
      </div>
    </div>
  );
}