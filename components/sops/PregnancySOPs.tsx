"use client";

import { useState } from 'react';
import { 
  Info,
  Shield,
  Star,
  BookOpen
} from 'lucide-react';
import { PregnancySOPsProps, RiskLevel, Season } from '@/types/sops';
import SOPSection from './SOPSection';
import RiskLevelSelector from './RiskLevelSelector';
import SeasonSelector from './SeasonSelector';
import MedicalDisclaimer from './MedicalDisclaimer';
import SOPTabNavigation from './SOPTabNavigation';
import QuickAccessPanel from './QuickAccessPanel';

export default function PregnancySOPs({ 
  data, 
  selectedRiskLevel = 'moderate',
  showSeasonalOnly = false,
  currentSeason = 'winter',
  className = '' 
}: PregnancySOPsProps) {
  const [activeTab, setActiveTab] = useState<string>(data.sections[0]?.id || '');
  const [activeRiskLevel, setActiveRiskLevel] = useState<RiskLevel>(selectedRiskLevel);
  const [activeSeason, setActiveSeason] = useState<Season>(currentSeason);
  const [seasonalFilterEnabled, setSeasonalFilterEnabled] = useState<boolean>(true);

  const activeSection = data.sections.find(section => section.id === activeTab);

  return (
    <>
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-subtle {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .8;
          }
        }
      `}</style>
    
    <section className={`py-6 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden ${className}`}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.02)_0%,transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Elegant Minimal Header */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-lg mb-4 shadow-sm">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600 font-medium text-xs tracking-wide uppercase">Care Guidelines</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light mb-3 leading-tight text-gray-800">
            High-Risk Pregnancy Care Standards
          </h2>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Evidence-based guidelines for comprehensive pregnancy care
          </p>

          {/* Minimal Control Panel */}
          <div className="flex flex-wrap gap-2 justify-center items-center mb-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-100">
              <RiskLevelSelector
                activeRiskLevel={activeRiskLevel}
                onRiskLevelChange={setActiveRiskLevel}
              />
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-100">
              <SeasonSelector
                activeSeason={activeSeason}
                onSeasonChange={setActiveSeason}
              />
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600">Seasonal</span>
                <button
                  onClick={() => setSeasonalFilterEnabled(!seasonalFilterEnabled)}
                  className={`
                    relative w-8 h-4 rounded-full transition-all duration-300 focus:outline-none
                    ${seasonalFilterEnabled ? 'bg-gray-800' : 'bg-gray-300'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300
                    ${seasonalFilterEnabled ? 'translate-x-4' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Compact Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="sticky top-4">
              <QuickAccessPanel 
                emergencyContacts={data.emergencyContacts}
              />
            </div>
          </div>

          {/* Minimal Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {/* Minimal Disclaimer */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-3">
              <MedicalDisclaimer
                content={data.globalDisclaimer}
                emergencyContacts={data.emergencyContacts}
                variant="compact"
              />
            </div>

            {/* Minimal Tab Navigation */}
            <SOPTabNavigation
              sections={data.sections}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Minimal Tab Content */}
            {activeSection && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <SOPSection
                  section={activeSection}
                  isExpanded={true}
                  onToggle={() => {}}
                  activeRiskLevel={activeRiskLevel}
                  activeSeason={activeSeason}
                  showSeasonalOnly={seasonalFilterEnabled}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
    </>
  );
}