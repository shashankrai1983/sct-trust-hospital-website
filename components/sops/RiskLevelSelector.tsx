"use client";

import { RiskLevel } from '@/types/sops';

interface RiskLevelSelectorProps {
  activeRiskLevel: RiskLevel;
  onRiskLevelChange: (level: RiskLevel) => void;
  className?: string;
}

export default function RiskLevelSelector({ 
  activeRiskLevel, 
  onRiskLevelChange, 
  className = '' 
}: RiskLevelSelectorProps) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">Risk</span>
        
        <div className="flex bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 p-0.5">
          {(['low', 'moderate', 'high'] as RiskLevel[]).map((level) => {
            const isActive = activeRiskLevel === level;
            return (
              <button
                key={level}
                onClick={() => onRiskLevelChange(level)}
                className={`
                  relative px-2 py-1 rounded-md text-xs font-medium capitalize transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }
                `}
                aria-label={`Select ${level} risk level`}
                role="radio"
                aria-checked={isActive}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}