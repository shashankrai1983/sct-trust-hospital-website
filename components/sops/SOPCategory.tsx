"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SOPCategory as SOPCategoryType, RiskLevel, Season } from '@/types/sops';
import SOPItem from './SOPItem';

interface SOPCategoryProps {
  category: SOPCategoryType;
  activeRiskLevel: RiskLevel;
  activeSeason: Season;
  showSeasonalOnly: boolean;
}

export default function SOPCategory({ 
  category, 
  activeRiskLevel, 
  activeSeason, 
  showSeasonalOnly 
}: SOPCategoryProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleCategory = () => {
    setIsExpanded(prev => !prev);
  };

  const filterItemsByRiskLevel = (items: any[]) => {
    return items.filter(item => 
      !item.riskLevel || item.riskLevel.includes(activeRiskLevel)
    );
  };

  const filterItemsBySeason = (items: any[]) => {
    if (!showSeasonalOnly) return items;
    return items.filter(item => 
      !item.season || item.season.includes(activeSeason)
    );
  };

  const filteredItems = filterItemsBySeason(filterItemsByRiskLevel(category.items));
  
  if (filteredItems.length === 0) return null;

  return (
    <div className="group relative">
      {/* Minimal Card Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 overflow-hidden transition-all duration-200">
        
        {/* Minimal Category Header */}
        <div 
          className="p-3 cursor-pointer hover:bg-gray-50/50 transition-all duration-200"
          onClick={toggleCategory}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {/* Minimal Icon */}
              <div className="p-1.5 bg-gray-100 rounded-md">
                <category.icon className="h-3 w-3 text-gray-600" />
              </div>
              
              {/* Minimal Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 mb-0.5">
                  {category.name}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-1">
                  {category.description}
                </p>
                
                {/* Minimal Badge */}
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 rounded-md">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-medium text-xs">
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Minimal Expand Button */}
            <div className="p-1 bg-gray-100 rounded-md">
              {isExpanded ? (
                <ChevronUp className="h-3 w-3 text-gray-600" />
              ) : (
                <ChevronDown className="h-3 w-3 text-gray-600" />
              )}
            </div>
          </div>
        </div>

        {/* Minimal Items Layout */}
        {isExpanded && (
          <div className="border-t border-gray-100 bg-gray-50/30">
            <div className="p-2">
              {/* Minimal Items Grid */}
              <div className="space-y-1">
                {filteredItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="transition-all duration-200"
                  >
                    <div className="bg-white/60 rounded-md border border-gray-100">
                      <SOPItem
                        item={item}
                        activeSeason={activeSeason}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Minimal Filter Notice */}
              {(filteredItems.length < category.items.length || showSeasonalOnly) && (
                <div className="mt-2 p-1.5 bg-gray-100 rounded-md">
                  <p className="text-gray-600 text-xs text-center">
                    Showing {filteredItems.length} of {category.items.length} items
                    {showSeasonalOnly ? ` for ${activeSeason}` : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}