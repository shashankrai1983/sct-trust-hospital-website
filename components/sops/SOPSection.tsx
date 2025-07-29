"use client";

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle
} from 'lucide-react';
import { SOPSection as SOPSectionType, RiskLevel, Season } from '@/types/sops';
import SOPCategory from './SOPCategory';
import MedicalDisclaimer from './MedicalDisclaimer';

interface SOPSectionProps {
  section: SOPSectionType;
  isExpanded: boolean;
  onToggle: () => void;
  activeRiskLevel: RiskLevel;
  activeSeason: Season;
  showSeasonalOnly: boolean;
}

export default function SOPSection({ 
  section, 
  isExpanded, 
  onToggle, 
  activeRiskLevel, 
  activeSeason,
  showSeasonalOnly 
}: SOPSectionProps) {

  // When used as tab content, always show expanded content
  const showContent = isExpanded;

  return (
    <div className="group">
      {/* Minimal Section Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <section.icon className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              {section.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      {/* Section Content */}
      {showContent && (
        <div className="bg-white">
          {/* Minimal Disclaimer */}
          {section.disclaimer && (
            <div className="p-3 border-b border-gray-100">
              <div className="bg-gray-50/50 rounded-lg p-2 border border-gray-100">
                <MedicalDisclaimer
                  content={section.disclaimer}
                  variant="minimal"
                />
              </div>
            </div>
          )}

          {/* Minimal Categories */}
          <div className="p-3">
            <div className="grid grid-cols-1 gap-2">
              {section.categories.map((category, index) => (
                <div 
                  key={category.id}
                  className="transition-all duration-200"
                >
                  <SOPCategory
                    category={category}
                    activeRiskLevel={activeRiskLevel}
                    activeSeason={activeSeason}
                    showSeasonalOnly={showSeasonalOnly}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}