// Validation Schemas for Calculator Forms
// Using Zod for type-safe form validation with medical accuracy

import { z } from 'zod';
import { isValid, isFuture, subMonths, addDays } from 'date-fns';

// Custom date validation helpers
const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && isValid(date);
};

const createDateSchema = (errorMessage: string) => {
  return z.union([z.date(), z.string().transform((str) => new Date(str))])
    .refine(isValidDate, { message: errorMessage });
};

// Due Date Calculator Schema
export const dueDateCalculatorSchema = z.object({
  lmpDate: createDateSchema('Please enter a valid Last Menstrual Period date')
    .refine((date) => {
      const today = new Date();
      const maxPastDate = subMonths(today, 10); // 10 months ago
      return date >= maxPastDate && !isFuture(date);
    }, {
      message: 'LMP date must be within the last 10 months and not in the future',
    }),
});

export type DueDateCalculatorInput = z.infer<typeof dueDateCalculatorSchema>;

// Pregnancy Week Calculator Schema
export const pregnancyWeekCalculatorSchema = z.object({
  lmpDate: createDateSchema('Please enter a valid Last Menstrual Period date')
    .refine((date) => {
      const today = new Date();
      const maxPastDate = subMonths(today, 10);
      return date >= maxPastDate && !isFuture(date);
    }, {
      message: 'LMP date must be within the last 10 months and not in the future',
    }),
});

export type PregnancyWeekCalculatorInput = z.infer<typeof pregnancyWeekCalculatorSchema>;

// Conception Date Calculator Schema
export const conceptionDateCalculatorSchema = z.discriminatedUnion('calculationType', [
  z.object({
    calculationType: z.literal('fromLMP'),
    lmpDate: createDateSchema('Please enter a valid Last Menstrual Period date')
      .refine((date) => {
        const today = new Date();
        const maxPastDate = subMonths(today, 10);
        return date >= maxPastDate && !isFuture(date);
      }, {
        message: 'LMP date must be within the last 10 months and not in the future',
      }),
  }),
  z.object({
    calculationType: z.literal('fromDueDate'),
    dueDate: createDateSchema('Please enter a valid due date')
      .refine((date) => {
        const today = new Date();
        const maxFutureDate = addDays(today, 294); // 42 weeks from today
        return date >= today && date <= maxFutureDate;
      }, {
        message: 'Due date must be between today and 42 weeks in the future',
      }),
  }),
]);

export type ConceptionDateCalculatorInput = z.infer<typeof conceptionDateCalculatorSchema>;

// Weight Gain Calculator Schema
export const weightGainCalculatorSchema = z.object({
  prePregnancyWeight: z.number()
    .min(35, 'Weight must be at least 35 kg')
    .max(200, 'Weight must be less than 200 kg'),
  height: z.number()
    .min(120, 'Height must be at least 120 cm')
    .max(220, 'Height must be less than 220 cm'),
  currentWeight: z.number()
    .min(35, 'Current weight must be at least 35 kg')
    .max(250, 'Current weight must be less than 250 kg'),
  pregnancyWeek: z.number()
    .min(1, 'Pregnancy week must be at least 1')
    .max(42, 'Pregnancy week must be less than 42'),
}).refine((data) => data.currentWeight >= data.prePregnancyWeight - 5, {
  message: 'Current weight seems too low compared to pre-pregnancy weight',
  path: ['currentWeight'],
});

export type WeightGainCalculatorInput = z.infer<typeof weightGainCalculatorSchema>;

// BMI Calculator Schema
export const bmiCalculatorSchema = z.object({
  weight: z.number()
    .min(20, 'Weight must be at least 20 kg')
    .max(300, 'Weight must be less than 300 kg'),
  height: z.number()
    .min(100, 'Height must be at least 100 cm')
    .max(250, 'Height must be less than 250 cm'),
  age: z.number()
    .min(12, 'Age must be at least 12 years')
    .max(80, 'Age must be less than 80 years')
    .optional(),
});

export type BMICalculatorInput = z.infer<typeof bmiCalculatorSchema>;

// Ovulation Calculator Schema
export const ovulationCalculatorSchema = z.object({
  lastPeriodDate: createDateSchema('Please enter a valid last period date')
    .refine((date) => {
      const today = new Date();
      const maxPastDate = subMonths(today, 3); // 3 months ago
      return date >= maxPastDate && !isFuture(date);
    }, {
      message: 'Last period date must be within the last 3 months and not in the future',
    }),
  cycleLength: z.number()
    .min(21, 'Cycle length must be at least 21 days')
    .max(35, 'Cycle length must be less than 35 days')
    .default(28),
});

export type OvulationCalculatorInput = z.infer<typeof ovulationCalculatorSchema>;

// Fertile Window Calculator Schema
export const fertileWindowCalculatorSchema = z.object({
  lastPeriodDate: createDateSchema('Please enter a valid last period date')
    .refine((date) => {
      const today = new Date();
      const maxPastDate = subMonths(today, 3);
      return date >= maxPastDate && !isFuture(date);
    }, {
      message: 'Last period date must be within the last 3 months and not in the future',
    }),
  cycleLength: z.number()
    .min(21, 'Average cycle length must be at least 21 days')
    .max(35, 'Average cycle length must be less than 35 days')
    .default(28),
});

export type FertileWindowCalculatorInput = z.infer<typeof fertileWindowCalculatorSchema>;

// Prenatal Vitamin Calculator Schema
export const prenatalVitaminCalculatorSchema = z.object({
  pregnancyWeek: z.number()
    .min(0, 'Pregnancy week cannot be negative')
    .max(42, 'Pregnancy week must be less than 42'),
  isBreastfeeding: z.boolean().default(false),
  dietaryRestrictions: z.array(z.enum([
    'vegetarian',
    'vegan',
    'dairy-free',
    'gluten-free',
    'nut-free',
    'none',
  ])).default(['none']),
  currentSupplements: z.array(z.string()).default([]),
});

export type PrenatalVitaminCalculatorInput = z.infer<typeof prenatalVitaminCalculatorSchema>;

// Common validation utilities
export const commonValidations = {
  positiveNumber: (min: number = 0, max: number = Infinity) => 
    z.number().min(min, `Value must be at least ${min}`).max(max, `Value must be less than ${max}`),
    
  recentDate: (monthsBack: number = 3) => 
    createDateSchema('Please enter a valid date')
      .refine((date) => {
        const today = new Date();
        const maxPastDate = subMonths(today, monthsBack);
        return date >= maxPastDate && !isFuture(date);
      }, {
        message: `Date must be within the last ${monthsBack} months and not in the future`,
      }),
      
  futureDate: (weeksAhead: number = 42) =>
    createDateSchema('Please enter a valid date')
      .refine((date) => {
        const today = new Date();
        const maxFutureDate = addDays(today, weeksAhead * 7);
        return date >= today && date <= maxFutureDate;
      }, {
        message: `Date must be between today and ${weeksAhead} weeks in the future`,
      }),
};

// Form validation error messages
export const validationMessages = {
  required: 'This field is required',
  invalidDate: 'Please enter a valid date',
  dateInFuture: 'Date cannot be in the future',
  dateTooOld: 'Date is too far in the past',
  numberTooSmall: (min: number) => `Value must be at least ${min}`,
  numberTooLarge: (max: number) => `Value must be less than ${max}`,
  invalidRange: (min: number, max: number) => `Value must be between ${min} and ${max}`,
} as const;

// Helper function to format Zod errors for display
export const formatValidationErrors = (error: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
};

// Type guard for validation results
export const isValidationError = (error: unknown): error is z.ZodError => {
  return error instanceof z.ZodError;
};