// Linus-Style Animation Manager
// "Eliminate special cases through clean interfaces"

import { useEffect, useRef } from 'react';
import { presets } from '../components/animations/ForestAnimations';

export interface AnimationRefs {
  header: React.RefObject<HTMLDivElement>;
  calculator: React.RefObject<HTMLDivElement>;
  results: React.RefObject<HTMLDivElement>;
  visualizer: React.RefObject<HTMLDivElement>;
  particles: React.RefObject<HTMLDivElement>;
}

export interface AnimationControls {
  refs: AnimationRefs;
  triggerEntry: () => void;
  triggerResults: (weekData: number) => void;
  triggerCelebration: (particleCount?: number) => void;
}

/**
 * Animation control hook - single responsibility
 * No conditionals, no complex state, just clean interface
 */
export const useCalculatorAnimations = (): AnimationControls => {
  const refs: AnimationRefs = {
    header: useRef<HTMLDivElement>(null),
    calculator: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    visualizer: useRef<HTMLDivElement>(null),
    particles: useRef<HTMLDivElement>(null),
  };

  // Entry animations on mount - simple, no conditionals
  useEffect(() => {
    triggerEntry();
  }, []);

  const triggerEntry = () => {
    if (refs.header.current) {
      presets.cardEntry?.(refs.header.current);
    }
    if (refs.calculator.current) {
      setTimeout(() => {
        presets.cardEntry?.(refs.calculator.current!, 300);
      }, 200);
    }
  };

  const triggerResults = (weekData: number) => {
    if (refs.results.current) {
      presets.resultsReveal?.(refs.results.current);
    }
    if (refs.visualizer.current) {
      presets.babyGrowth?.(refs.visualizer.current, 0, weekData);
    }
  };

  const triggerCelebration = (particleCount = 15) => {
    if (refs.particles.current) {
      presets.confettiBurst?.(refs.particles.current, particleCount);
    }
  };

  return {
    refs,
    triggerEntry,
    triggerResults,
    triggerCelebration,
  };
};