"use client";

import { Season } from '@/types/sops';

interface SeasonSelectorProps {
  activeSeason: Season;
  onSeasonChange: (season: Season) => void;
  className?: string;
}

export default function SeasonSelector({ 
  activeSeason, 
  onSeasonChange, 
  className = '' 
}: SeasonSelectorProps) {
  const seasonData = {
    winter: { label: 'Winter' },
    summer: { label: 'Summer' },
    monsoon: { label: 'Monsoon' },
    'post-monsoon': { label: 'Post-Monsoon' }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">Season</span>
        
        <div className="flex bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 p-0.5">
          {(['winter', 'summer', 'monsoon', 'post-monsoon'] as Season[]).map((season) => {
            const isActive = activeSeason === season;
            const data = seasonData[season];
            
            return (
              <button
                key={season}
                onClick={() => onSeasonChange(season)}
                className={`
                  relative px-2 py-1 rounded-md text-xs font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }
                `}
                aria-label={`Select ${data.label} season`}
                role="radio"
                aria-checked={isActive}
              >
                {season === 'post-monsoon' ? 'Post' : data.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}