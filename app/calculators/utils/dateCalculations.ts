// Medical Date Calculation Utilities
// Professional pregnancy and fertility calculations following medical standards

import { addDays, differenceInDays, differenceInWeeks, format, isValid, isFuture, subMonths } from 'date-fns';

// Types for calculator results
export interface DueDateResult {
  dueDate: Date;
  currentWeek: number;
  trimester: number;
  daysRemaining: number;
  gestationalAge: string;
  conceptionDate: Date;
}

export interface PregnancyWeekResult {
  week: number;
  trimester: number;
  daysIntoWeek: number;
  remainingDays: number;
  milestones: string[];
}

export interface ConceptionResult {
  estimatedConception: Date;
  conceptionRange: {
    earliest: Date;
    latest: Date;
  };
  fertilityWindow: {
    start: Date;
    end: Date;
  };
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Constants for medical calculations
export const PREGNANCY_CONSTANTS = {
  AVERAGE_PREGNANCY_DAYS: 280, // 40 weeks
  AVERAGE_CYCLE_LENGTH: 28,
  OVULATION_DAY: 14, // Days before next period
  CONCEPTION_WINDOW: 6, // Days of fertility window
  MAX_PREGNANCY_WEEKS: 42,
  TRIMESTER_BOUNDARIES: [13, 27, 40], // Weeks
} as const;

// Validation Functions
export const validateLMPDate = (date: Date): ValidationResult => {
  if (!isValid(date)) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  const today = new Date();
  const maxPastDate = subMonths(today, 10); // 10 months ago

  if (isFuture(date)) {
    return { isValid: false, error: 'Last Menstrual Period date cannot be in the future' };
  }

  if (date < maxPastDate) {
    return { isValid: false, error: 'Date is too far in the past for accurate calculation' };
  }

  return { isValid: true };
};

export const validateDueDate = (date: Date): ValidationResult => {
  if (!isValid(date)) {
    return { isValid: false, error: 'Please enter a valid due date' };
  }

  const today = new Date();
  const maxFutureDate = addDays(today, PREGNANCY_CONSTANTS.MAX_PREGNANCY_WEEKS * 7);
  const minFutureDate = today;

  if (date < minFutureDate) {
    return { isValid: false, error: 'Due date should be in the future' };
  }

  if (date > maxFutureDate) {
    return { isValid: false, error: 'Due date is too far in the future' };
  }

  return { isValid: true };
};

// Core Calculation Functions

/**
 * Calculate due date from Last Menstrual Period (LMP)
 * Medical standard: LMP + 280 days (40 weeks)
 */
export const calculateDueDate = (lmpDate: Date): DueDateResult => {
  const validation = validateLMPDate(lmpDate);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const dueDate = addDays(lmpDate, PREGNANCY_CONSTANTS.AVERAGE_PREGNANCY_DAYS);
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmpDate);
  const currentWeek = Math.floor(daysSinceLMP / 7);
  const daysRemaining = differenceInDays(dueDate, today);
  const trimester = getTrimester(currentWeek);
  
  // Calculate estimated conception date (LMP + 14 days)
  const conceptionDate = addDays(lmpDate, PREGNANCY_CONSTANTS.OVULATION_DAY);
  
  // Format gestational age
  const weeksComplete = Math.floor(daysSinceLMP / 7);
  const daysIntoWeek = daysSinceLMP % 7;
  const gestationalAge = `${weeksComplete}w ${daysIntoWeek}d`;

  return {
    dueDate,
    currentWeek,
    trimester,
    daysRemaining: Math.max(0, daysRemaining),
    gestationalAge,
    conceptionDate,
  };
};

/**
 * Calculate pregnancy week and details from LMP
 */
export const calculatePregnancyWeek = (lmpDate: Date): PregnancyWeekResult => {
  const validation = validateLMPDate(lmpDate);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmpDate);
  const week = Math.floor(daysSinceLMP / 7);
  const daysIntoWeek = daysSinceLMP % 7;
  const trimester = getTrimester(week);
  const totalPregnancyDays = PREGNANCY_CONSTANTS.AVERAGE_PREGNANCY_DAYS;
  const remainingDays = Math.max(0, totalPregnancyDays - daysSinceLMP);

  // Get pregnancy milestones for current week
  const milestones = getPregnancyMilestones(week);

  return {
    week,
    trimester,
    daysIntoWeek,
    remainingDays,
    milestones,
  };
};

/**
 * Calculate conception date from LMP or due date
 */
export const calculateConceptionDate = (referenceDate: Date, isLMP: boolean = true): ConceptionResult => {
  let lmpDate: Date;

  if (isLMP) {
    const validation = validateLMPDate(referenceDate);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    lmpDate = referenceDate;
  } else {
    // Reference date is due date, calculate LMP
    const validation = validateDueDate(referenceDate);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    lmpDate = addDays(referenceDate, -PREGNANCY_CONSTANTS.AVERAGE_PREGNANCY_DAYS);
  }

  // Estimated conception is typically LMP + 14 days
  const estimatedConception = addDays(lmpDate, PREGNANCY_CONSTANTS.OVULATION_DAY);
  
  // Conception range (fertility window)
  const earliest = addDays(lmpDate, PREGNANCY_CONSTANTS.OVULATION_DAY - 5);
  const latest = addDays(lmpDate, PREGNANCY_CONSTANTS.OVULATION_DAY + 1);

  return {
    estimatedConception,
    conceptionRange: { earliest, latest },
    fertilityWindow: { start: earliest, end: latest },
  };
};

/**
 * Determine trimester based on pregnancy week
 */
export const getTrimester = (week: number): number => {
  if (week <= PREGNANCY_CONSTANTS.TRIMESTER_BOUNDARIES[0]) return 1;
  if (week <= PREGNANCY_CONSTANTS.TRIMESTER_BOUNDARIES[1]) return 2;
  return 3;
};

/**
 * Get pregnancy milestones for a specific week
 */
export const getPregnancyMilestones = (week: number): string[] => {
  const milestones: Record<number, string[]> = {
    4: ['Missed period', 'Home pregnancy test may be positive'],
    6: ['Heart begins to beat', 'Neural tube development'],
    8: ['First prenatal appointment recommended', 'Organ development begins'],
    12: ['End of first trimester', 'Risk of miscarriage decreases'],
    16: ['Gender may be determined via ultrasound', 'Amniocentesis possible'],
    20: ['Anatomy scan ultrasound', 'You may feel baby\'s movements'],
    24: ['Viability milestone', 'Glucose screening test'],
    28: ['Third trimester begins', 'Regular prenatal visits increase'],
    32: ['Baby\'s bones hardening', 'Consider childbirth classes'],
    36: ['Baby considered full-term soon', 'Final preparations'],
    40: ['Due date reached', 'Labor may begin any time'],
  };

  return milestones[week] || [];
};

/**
 * Format date for display in calculator results
 */
export const formatCalculatorDate = (date: Date): string => {
  return format(date, 'MMMM dd, yyyy');
};

/**
 * Format date range for display
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`;
};

/**
 * Calculate gestational age in weeks and days
 */
export const formatGestationalAge = (lmpDate: Date): string => {
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmpDate);
  const weeks = Math.floor(daysSinceLMP / 7);
  const days = daysSinceLMP % 7;
  
  return `${weeks} weeks, ${days} days`;
};

/**
 * Get trimester name and description
 */
export const getTrimesterInfo = (trimester: number): { name: string; description: string; weeks: string } => {
  const trimesterData = {
    1: {
      name: 'First Trimester',
      description: 'Early pregnancy development and organ formation',
      weeks: 'Weeks 1-12',
    },
    2: {
      name: 'Second Trimester',
      description: 'Often called the "golden period" of pregnancy',
      weeks: 'Weeks 13-27',
    },
    3: {
      name: 'Third Trimester',
      description: 'Final growth and preparation for birth',
      weeks: 'Weeks 28-40+',
    },
  };

  return trimesterData[trimester] || trimesterData[1];
};