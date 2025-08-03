import { z } from 'zod';

/**
 * Common validation schemas
 */
export const commonSchemas = {
  /**
   * Name validation schema
   */
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  /**
   * Email validation schema
   */
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),

  /**
   * Phone validation schema (Indian numbers)
   */
  phone: z.string()
    .regex(/^[6-9]\d{9}$|^0[6-9]\d{9}$|^91[6-9]\d{9}$/, 'Please enter a valid Indian phone number')
    .transform(phone => {
      // Normalize to 10-digit format
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return cleaned.slice(2);
      }
      if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return cleaned.slice(1);
      }
      return cleaned;
    }),

  /**
   * Date validation schema (future dates only)
   */
  futureDate: z.string()
    .datetime()
    .refine(date => new Date(date) > new Date(), 'Date must be in the future'),

  /**
   * Time slot validation schema
   */
  timeSlot: z.string()
    .regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, 'Invalid time format'),

  /**
   * ObjectId validation schema
   */
  objectId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),

  /**
   * Status validation schema
   */
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'], {
    errorMap: () => ({ message: 'Status must be pending, confirmed, cancelled, or completed' })
  }),
};

/**
 * Sanitization utilities
 */
export const sanitize = {
  /**
   * Sanitize HTML content
   */
  html: (content: string): string => {
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  },

  /**
   * Sanitize user input
   */
  userInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  },

  /**
   * Sanitize filename
   */
  filename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
  },
};

/**
 * Custom validation functions
 */
export const validators = {
  /**
   * Check if date is a business day (Monday to Saturday)
   */
  isBusinessDay: (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 6; // Monday (1) to Saturday (6)
  },

  /**
   * Check if time is within business hours
   */
  isBusinessHours: (time: string): boolean => {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    const totalMinutes = hour * 60 + minute;
    
    // Business hours: 9:00 AM (540 minutes) to 7:00 PM (1140 minutes)
    return totalMinutes >= 540 && totalMinutes <= 1140;
  },

  /**
   * Check if appointment slot is available (basic check)
   */
  isValidAppointmentSlot: (date: Date, time: string): boolean => {
    return validators.isBusinessDay(date) && validators.isBusinessHours(time);
  },

  /**
   * Validate Indian medical license number
   */
  isMedicalLicense: (license: string): boolean => {
    // Basic pattern for Indian medical license (state code + number)
    return /^[A-Z]{2}-\d{4,6}$/.test(license);
  },

  /**
   * Check password strength
   */
  isStrongPassword: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  },
};

/**
 * Error formatting utilities
 */
export const errorUtils = {
  /**
   * Format Zod errors for API responses
   */
  formatZodError: (error: z.ZodError) => {
    return error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
  },

  /**
   * Create validation error response
   */
  createValidationError: (message: string, errors: any[] = []) => {
    return {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Create success response
   */
  createSuccessResponse: (data: any, message: string = 'Success') => {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  },
};

/**
 * Healthcare-specific validation schemas
 */
export const healthcareSchemas = {
  /**
   * Patient age validation
   */
  patientAge: z.number()
    .min(0, 'Age cannot be negative')
    .max(150, 'Age must be realistic'),

  /**
   * Medical condition description
   */
  medicalCondition: z.string()
    .min(5, 'Please provide more details about your condition')
    .max(500, 'Description is too long')
    .transform(sanitize.userInput),

  /**
   * Emergency contact validation
   */
  emergencyContact: z.object({
    name: commonSchemas.name,
    phone: commonSchemas.phone,
    relationship: z.string().min(1, 'Please specify relationship'),
  }),

  /**
   * Medical appointment priority
   */
  appointmentPriority: z.enum(['routine', 'urgent', 'emergency'], {
    errorMap: () => ({ message: 'Priority must be routine, urgent, or emergency' })
  }),
};