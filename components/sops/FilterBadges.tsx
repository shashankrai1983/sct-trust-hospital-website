"use client";

import { 
  Leaf,
  Snowflake,
  Sun,
  Cloud
} from 'lucide-react';
import { Season } from '@/types/sops';

interface FilterBadgesProps {
  season?: Season[];
  category?: 'vegetarian' | 'non-vegetarian' | 'general';
}

export default function FilterBadges({ season, category }: FilterBadgesProps) {
  const getSeasonLabel = (season: Season) => {
    switch (season) {
      case 'winter': return 'Win';
      case 'summer': return 'Sum';
      case 'monsoon': return 'Mon';
      case 'post-monsoon': return 'Post';
    }
  };

  return (
    <div className="flex flex-col gap-1 ml-2">
      {/* Minimal Season Badges */}
      {season && (
        <div className="flex flex-wrap gap-0.5">
          {season.map((s: Season) => (
            <span 
              key={s}
              className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium text-gray-600 bg-gray-100"
            >
              {getSeasonLabel(s)}
            </span>
          ))}
        </div>
      )}
      
      {/* Minimal Category Badge */}
      {category && (
        <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium text-gray-600 bg-gray-100">
          {category.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}