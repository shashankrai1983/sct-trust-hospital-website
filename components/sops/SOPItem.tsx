"use client";

import { 
  CheckCircle, 
  AlertTriangle, 
  Info
} from 'lucide-react';
import { SOPItem as SOPItemType, Season } from '@/types/sops';
import FilterBadges from './FilterBadges';

interface SOPItemProps {
  item: SOPItemType;
  activeSeason: Season;
}

export default function SOPItem({ item, activeSeason }: SOPItemProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-md p-2 border border-gray-100 transition-all duration-200">
      {/* Minimal Item Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h5 className="text-sm font-medium text-gray-800 mb-1 flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3 text-gray-600" />
            {item.title}
          </h5>
          <p className="text-gray-600 leading-relaxed mb-2 text-xs">
            {item.description}
          </p>
        </div>
        
        {/* Minimal Season & Category Badges */}
        <FilterBadges 
          season={item.season} 
          category={item.category} 
        />
      </div>

      {/* Minimal Recommendations */}
      {item.recommendations.length > 0 && (
        <div className="mb-2">
          <h6 className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Info className="h-2.5 w-2.5" />
            Recommendations
          </h6>
          <ul className="space-y-1">
            {item.recommendations.map((rec: string, recIndex: number) => (
              <li key={recIndex} className="flex items-start gap-1.5">
                <CheckCircle className="h-2.5 w-2.5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Minimal Warnings */}
      {item.warnings && item.warnings.length > 0 && (
        <div className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-100">
          <h6 className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
            <AlertTriangle className="h-2.5 w-2.5" />
            Important Warnings
          </h6>
          <ul className="space-y-1">
            {item.warnings.map((warning: string, warnIndex: number) => (
              <li key={warnIndex} className="flex items-start gap-1.5">
                <AlertTriangle className="h-2.5 w-2.5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 leading-relaxed">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Minimal Benefits */}
      {item.benefits && item.benefits.length > 0 && (
        <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
          <h6 className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
            <CheckCircle className="h-2.5 w-2.5" />
            Benefits
          </h6>
          <ul className="space-y-1">
            {item.benefits.map((benefit: string, benIndex: number) => (
              <li key={benIndex} className="flex items-start gap-1.5">
                <CheckCircle className="h-2.5 w-2.5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}