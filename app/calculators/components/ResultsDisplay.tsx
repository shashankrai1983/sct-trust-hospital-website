'use client';

// Results Display Component
// Animated results display with forest green theme and medical accuracy

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Heart, Baby, Star, Share2, Download, BookOpen } from 'lucide-react';
import { formatCalculatorDate, formatDateRange, getTrimesterInfo } from '../utils/dateCalculations';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets, animateNumberCounter } from './animations/ForestAnimations';
import { PregnancyVisualizer } from './canvas/PregnancyVisualizer';

interface BaseResultProps {
  className?: string;
  animated?: boolean;
  showVisualizer?: boolean;
}

interface DueDateResultProps extends BaseResultProps {
  type: 'dueDate';
  result: {
    dueDate: Date;
    currentWeek: number;
    trimester: number;
    daysRemaining: number;
    gestationalAge: string;
    conceptionDate: Date;
  };
}

interface PregnancyWeekResultProps extends BaseResultProps {
  type: 'pregnancyWeek';
  result: {
    week: number;
    trimester: number;
    daysIntoWeek: number;
    remainingDays: number;
    milestones: string[];
  };
}

interface ConceptionResultProps extends BaseResultProps {
  type: 'conception';
  result: {
    estimatedConception: Date;
    conceptionRange: {
      earliest: Date;
      latest: Date;
    };
    fertilityWindow: {
      start: Date;
      end: Date;
    };
  };
}

type ResultsDisplayProps = DueDateResultProps | PregnancyWeekResultProps | ConceptionResultProps;

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  type,
  result,
  className = '',
  animated = true,
  showVisualizer = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedWeek, setAnimatedWeek] = useState(0);

  // Animate on mount
  useEffect(() => {
    if (animated && !hasAnimated && containerRef.current) {
      presets.resultReveal(containerRef.current);
      setHasAnimated(true);

      // Animate number counting for week display
      if (type === 'dueDate' || type === 'pregnancyWeek') {
        const week = type === 'dueDate' ? result.currentWeek : result.week;
        animateNumberCounter('.week-counter', 0, week, setAnimatedWeek);
      }
    }
  }, [animated, hasAnimated, type, result]);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pregnancy Calculator Results',
          text: getShareText(),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(getShareText());
        // Could show a toast notification here
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const getShareText = (): string => {
    switch (type) {
      case 'dueDate':
        return `My due date is ${formatCalculatorDate(result.dueDate)}! Currently ${result.gestationalAge} pregnant. 💕`;
      case 'pregnancyWeek':
        return `I'm ${result.week} weeks pregnant, in the ${getTrimesterInfo(result.trimester).name}! 👶`;
      case 'conception':
        return `Estimated conception date: ${formatCalculatorDate(result.estimatedConception)} 💕`;
      default:
        return 'Check out my pregnancy calculator results!';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${calculatorTheme.classes.result} ${className}`}
      style={{ opacity: animated ? 0 : 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center">
            {type === 'dueDate' && <Calendar className="w-5 h-5 text-primary-green" />}
            {type === 'pregnancyWeek' && <Clock className="w-5 h-5 text-primary-green" />}
            {type === 'conception' && <Heart className="w-5 h-5 text-primary-green" />}
          </div>
          <h3 className="text-xl font-semibold text-text-brown">
            Your Results
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-primary-green hover:bg-primary-green/10 rounded-lg transition-colors"
            title="Share results"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Results Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results Panel */}
        <div className="space-y-4">
          {type === 'dueDate' && (
            <DueDateResults result={result} animatedWeek={animatedWeek} />
          )}
          {type === 'pregnancyWeek' && (
            <PregnancyWeekResults result={result} animatedWeek={animatedWeek} />
          )}
          {type === 'conception' && (
            <ConceptionResults result={result} />
          )}
        </div>

        {/* Visualizer Panel */}
        {showVisualizer && (type === 'dueDate' || type === 'pregnancyWeek') && (
          <div className="flex flex-col items-center">
            <PregnancyVisualizer
              week={type === 'dueDate' ? result.currentWeek : result.week}
              className="w-full max-w-sm"
              animated={animated}
            />
            <p className="text-sm text-text-brown/60 mt-3 text-center">
              Visual representation of your baby's development
            </p>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-6 pt-6 border-t border-primary-green/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-text-brown/70">
            <Star className="w-4 h-4 text-primary-beige" />
            <span>Results calculated using medical standards</span>
          </div>
          <div className="flex items-center gap-2 text-text-brown/70">
            <Heart className="w-4 h-4 text-forest-green" />
            <span>Personalized for your unique pregnancy</span>
          </div>
          <div className="flex items-center gap-2 text-text-brown/70">
            <BookOpen className="w-4 h-4 text-primary-green" />
            <span>Educational purposes only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Due Date Results Component
const DueDateResults: React.FC<{
  result: DueDateResultProps['result'];
  animatedWeek: number;
}> = ({ result, animatedWeek }) => {
  const trimesterInfo = getTrimesterInfo(result.trimester);

  return (
    <div className="space-y-4">
      {/* Due Date */}
      <div className="bg-accent-cream rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Baby className="w-5 h-5 text-primary-green" />
          <span className="font-medium text-text-brown">Expected Due Date</span>
        </div>
        <p className="text-2xl font-bold text-primary-green">
          {formatCalculatorDate(result.dueDate)}
        </p>
        <p className="text-sm text-text-brown/70 mt-1">
          {result.daysRemaining > 0 ? `${result.daysRemaining} days to go` : 'Due date has passed'}
        </p>
      </div>

      {/* Current Progress */}
      <div className="bg-white rounded-lg p-4 border border-primary-green/20">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-forest-green" />
          <span className="font-medium text-text-brown">Current Progress</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-text-brown">Gestational Age</span>
              <span className="text-sm font-medium text-primary-green">
                <span className="week-counter">{animatedWeek}</span> weeks
              </span>
            </div>
            <div className="w-full bg-accent-cream rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-green to-forest-green h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((result.currentWeek / 40) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-primary-green/5 rounded-lg p-3">
              <p className="text-sm text-text-brown/70">Trimester</p>
              <p className="font-semibold text-primary-green">{result.trimester}</p>
              <p className="text-xs text-text-brown/60">{trimesterInfo.name}</p>
            </div>
            <div className="bg-forest-green/5 rounded-lg p-3">
              <p className="text-sm text-text-brown/70">Conception</p>
              <p className="font-semibold text-forest-green">
                {formatCalculatorDate(result.conceptionDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pregnancy Week Results Component
const PregnancyWeekResults: React.FC<{
  result: PregnancyWeekResultProps['result'];
  animatedWeek: number;
}> = ({ result, animatedWeek }) => {
  const trimesterInfo = getTrimesterInfo(result.trimester);

  return (
    <div className="space-y-4">
      {/* Week Display */}
      <div className="bg-accent-cream rounded-lg p-4 text-center">
        <p className="text-sm text-text-brown/70 mb-2">You are currently</p>
        <p className="text-4xl font-bold text-primary-green">
          <span className="week-counter">{animatedWeek}</span>
        </p>
        <p className="text-lg font-medium text-text-brown">
          weeks, {result.daysIntoWeek} days pregnant
        </p>
        <p className="text-sm text-forest-green mt-2">
          {trimesterInfo.name} • {trimesterInfo.description}
        </p>
      </div>

      {/* Milestones */}
      {result.milestones.length > 0 && (
        <div className="bg-white rounded-lg p-4 border border-primary-green/20">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-primary-beige" />
            <span className="font-medium text-text-brown">This Week's Milestones</span>
          </div>
          <ul className="space-y-2">
            {result.milestones.map((milestone, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-text-brown">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Days Remaining */}
      <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm text-text-brown/70">Approximately</p>
          <p className="text-2xl font-bold text-primary-green">
            {Math.ceil(result.remainingDays)}
          </p>
          <p className="text-sm text-text-brown">days until due date</p>
        </div>
      </div>
    </div>
  );
};

// Conception Results Component
const ConceptionResults: React.FC<{
  result: ConceptionResultProps['result'];
}> = ({ result }) => {
  return (
    <div className="space-y-4">
      {/* Estimated Conception */}
      <div className="bg-accent-cream rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-primary-green" />
          <span className="font-medium text-text-brown">Estimated Conception Date</span>
        </div>
        <p className="text-2xl font-bold text-primary-green">
          {formatCalculatorDate(result.estimatedConception)}
        </p>
      </div>

      {/* Conception Range */}
      <div className="bg-white rounded-lg p-4 border border-primary-green/20">
        <h4 className="font-medium text-text-brown mb-3">Fertility Window</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text-brown/70">Most likely conception period</p>
            <p className="font-medium text-forest-green">
              {formatDateRange(result.conceptionRange.earliest, result.conceptionRange.latest)}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-brown/70">Fertile window</p>
            <p className="font-medium text-primary-green">
              {formatDateRange(result.fertilityWindow.start, result.fertilityWindow.end)}
            </p>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="bg-primary-green/5 rounded-lg p-4">
        <p className="text-sm text-text-brown leading-relaxed">
          <strong>Note:</strong> Conception typically occurs during ovulation, approximately 14 days after the last menstrual period in a 28-day cycle. The exact timing can vary based on individual cycle length and ovulation patterns.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;