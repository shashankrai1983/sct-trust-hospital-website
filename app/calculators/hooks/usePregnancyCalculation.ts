// Linus-Style Pregnancy Calculation Hook
// "Good taste: eliminate special cases through better data structures"

import { useMemo } from 'react';
import { calculateDueDate, DueDateResult } from '../utils/dateCalculations';

export interface PregnancyState {
  isValid: boolean;
  data: DueDateResult | null;
  error: string | null;
}

/**
 * Pure calculation hook - no side effects, no async nonsense
 * Input: LMP date string
 * Output: Calculated pregnancy data or null
 * 
 * Linus principle: "If you need async for simple math, you're doing it wrong"
 */
export const usePregnancyCalculation = (lmpDateString: string): PregnancyState => {
  return useMemo(() => {
    if (!lmpDateString) {
      return { isValid: false, data: null, error: null };
    }

    try {
      const lmpDate = new Date(lmpDateString);
      const data = calculateDueDate(lmpDate);
      return { isValid: true, data, error: null };
    } catch (error) {
      return { 
        isValid: false, 
        data: null, 
        error: error instanceof Error ? error.message : 'Invalid date'
      };
    }
  }, [lmpDateString]);
};

/**
 * Animation state derivation - separate concern
 * No conditionals in render, just data transformation
 */
export interface AnimationState {
  showResults: boolean;
  showCelebration: boolean;
  showMilestones: boolean;
  celebrationDelay: number;
  milestonesDelay: number;
}

export const useAnimationState = (hasValidData: boolean, isCalculating: boolean): AnimationState => {
  return useMemo(() => {
    if (!hasValidData || isCalculating) {
      return {
        showResults: false,
        showCelebration: false,
        showMilestones: false,
        celebrationDelay: 0,
        milestonesDelay: 0,
      };
    }

    return {
      showResults: true,
      showCelebration: true,
      showMilestones: true,
      celebrationDelay: 1000,
      milestonesDelay: 1500,
    };
  }, [hasValidData, isCalculating]);
};