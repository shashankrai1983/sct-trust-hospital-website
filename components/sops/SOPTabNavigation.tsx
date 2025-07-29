"use client";

import { useState } from 'react';
import { SOPSection } from '@/types/sops';

interface SOPTabNavigationProps {
  sections: SOPSection[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SOPTabNavigation({ 
  sections, 
  activeTab, 
  onTabChange 
}: SOPTabNavigationProps) {
  return (
    <div className="relative">
      {/* Minimal Tab Container */}
      <div className="relative bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-1">
        {/* Full Width Tab Buttons */}
        <div className="flex w-full">
          {sections.map((section, index) => {
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onTabChange(section.id)}
                className={`
                  group relative flex items-center justify-center flex-1 px-3 py-2 font-medium text-xs
                  transition-all duration-200 border-r border-gray-200 last:border-r-0
                  ${isActive 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }
                  ${index === 0 ? 'rounded-l-lg' : ''}
                  ${index === sections.length - 1 ? 'rounded-r-lg' : ''}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                aria-selected={isActive}
                role="tab"
              >
                <span className="leading-tight text-center">
                  {section.title}
                </span>

              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}