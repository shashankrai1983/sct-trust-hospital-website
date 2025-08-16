'use client';

// Milestone Badge Component - Professional Achievement Animations
// Medical milestone achievements with forest green color scheme

import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Award, Heart, Calendar, Baby, Sparkles } from 'lucide-react';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from './animations/ForestAnimations';

interface MilestoneBadgeProps {
  milestone: string;
  description?: string;
  icon?: 'check' | 'award' | 'heart' | 'calendar' | 'baby' | 'sparkles';
  delay?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const MilestoneBadge: React.FC<MilestoneBadgeProps> = ({
  milestone,
  description,
  icon = 'check',
  delay = 0,
  className = '',
  size = 'md',
  animated = true
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    check: CheckCircle2,
    award: Award,
    heart: Heart,
    calendar: Calendar,
    baby: Baby,
    sparkles: Sparkles
  };

  const IconComponent = iconMap[icon];

  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  useEffect(() => {
    if (animated && badgeRef.current) {
      setTimeout(() => {
        presets.milestoneBadge && presets.milestoneBadge(badgeRef.current!, 0);
      }, delay);
    }
  }, [animated, delay]);

  return (
    <div
      ref={badgeRef}
      className={`
        inline-flex items-center gap-3 
        bg-gradient-to-r from-white to-accent-cream
        border-2 border-primary-green/20
        rounded-xl shadow-warm
        transition-all duration-300
        hover:shadow-warm-lg hover:border-primary-green/40
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        transform: animated ? 'translateX(100px) scale(0.8)' : 'translateX(0) scale(1)',
        opacity: animated ? 0 : 1
      }}
    >
      {/* Icon with glow effect */}
      <div className="flex-shrink-0">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full blur-sm opacity-30"
            style={{ backgroundColor: calculatorTheme.primary }}
          />
          <div 
            className={`
              relative rounded-full p-2
              ${iconSizes[size]}
            `}
            style={{ backgroundColor: calculatorTheme.primary + '20' }}
          >
            <IconComponent 
              className={`${iconSizes[size]} text-primary-green`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-text-brown truncate">
          {milestone}
        </h4>
        {description && (
          <p className="text-xs text-text-brown/70 mt-1 truncate">
            {description}
          </p>
        )}
      </div>

      {/* Achievement sparkle */}
      <div className="flex-shrink-0">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 12 12" 
          fill="none"
          className="animate-pulse"
        >
          <path 
            d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" 
            fill={calculatorTheme.highlight}
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};

interface MilestoneGroupProps {
  milestones: Array<{
    milestone: string;
    description?: string;
    icon?: MilestoneBadgeProps['icon'];
  }>;
  title?: string;
  className?: string;
  staggerDelay?: number;
  animated?: boolean;
}

export const MilestoneGroup: React.FC<MilestoneGroupProps> = ({
  milestones,
  title,
  className = '',
  staggerDelay = 200,
  animated = true
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-green" />
          {title}
        </h3>
      )}
      
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <MilestoneBadge
            key={index}
            milestone={milestone.milestone}
            description={milestone.description}
            icon={milestone.icon}
            delay={animated ? index * staggerDelay : 0}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );
};

// Pre-configured milestone badges for Due Date Calculator
export const DueDateMilestones: React.FC<{
  week: number;
  trimester: number;
  animated?: boolean;
}> = ({ week, trimester, animated = true }) => {
  const milestones = [];

  // Add milestones based on pregnancy progress
  if (week >= 1) {
    milestones.push({
      milestone: "Pregnancy Confirmed",
      description: "Journey begins with accurate calculation",
      icon: 'calendar' as const
    });
  }

  if (week >= 6) {
    milestones.push({
      milestone: "Heartbeat Development",
      description: "Baby's heart begins to beat",
      icon: 'heart' as const
    });
  }

  if (week >= 12) {
    milestones.push({
      milestone: "First Trimester Complete",
      description: "Major organ development finished",
      icon: 'check' as const
    });
  }

  if (week >= 20) {
    milestones.push({
      milestone: "Halfway Milestone",
      description: "Half way to meeting your baby",
      icon: 'baby' as const
    });
  }

  if (week >= 24) {
    milestones.push({
      milestone: "Viability Reached",
      description: "Baby can survive outside the womb",
      icon: 'sparkles' as const
    });
  }

  if (week >= 28) {
    milestones.push({
      milestone: "Third Trimester",
      description: "Final preparation phase begins",
      icon: 'award' as const
    });
  }

  if (week >= 37) {
    milestones.push({
      milestone: "Full Term",
      description: "Baby is considered full term",
      icon: 'award' as const
    });
  }

  return (
    <MilestoneGroup
      milestones={milestones}
      title="Pregnancy Milestones"
      animated={animated}
      staggerDelay={300}
    />
  );
};

// Professional Achievement Badge for Calculator Results
export const CalculatorAchievement: React.FC<{
  type: 'accuracy' | 'completion' | 'guidance';
  animated?: boolean;
  delay?: number;
}> = ({ type, animated = true, delay = 0 }) => {
  const achievements = {
    accuracy: {
      milestone: "Medical Accuracy Certified",
      description: "Results based on established medical standards",
      icon: 'check' as const
    },
    completion: {
      milestone: "Calculation Complete",
      description: "Professional medical calculation successful",
      icon: 'award' as const
    },
    guidance: {
      milestone: "Professional Guidance Available",
      description: "Consult with Dr. Amita Shukla for personalized care",
      icon: 'heart' as const
    }
  };

  const achievement = achievements[type];

  return (
    <MilestoneBadge
      milestone={achievement.milestone}
      description={achievement.description}
      icon={achievement.icon}
      animated={animated}
      delay={delay}
      size="lg"
      className="w-full"
    />
  );
};

export default MilestoneBadge;