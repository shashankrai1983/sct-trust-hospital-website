import { ObjectId } from 'mongodb';
import { BaseDocument, MedicalService, AppointmentStatus, Priority, PatientInfo } from './common.types';

/**
 * Appointment document interface
 */
export interface Appointment extends BaseDocument {
  // Patient information
  patientInfo: PatientInfo;
  
  // Appointment details
  service: MedicalService;
  date: Date;
  time: string;
  duration?: number; // in minutes
  
  // Status and priority
  status: AppointmentStatus;
  priority: Priority;
  
  // Provider information
  providerId?: ObjectId;
  providerName?: string;
  
  // Additional information
  message?: string;
  symptoms?: string[];
  medicalHistory?: string;
  
  // Internal tracking
  confirmationCode?: string;
  remindersSent?: Date[];
  cancelledAt?: Date;
  cancelledBy?: ObjectId;
  cancellationReason?: string;
  
  // Payment information
  paymentStatus?: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentAmount?: number;
  paymentMethod?: string;
  
  // Metadata
  source?: 'website' | 'phone' | 'walk-in' | 'referral';
  referenceNumber?: string;
  notes?: AppointmentNote[];
}

/**
 * Appointment creation request
 */
export interface AppointmentRequest {
  name: string;
  email: string;
  phone: string;
  service: MedicalService;
  date: string; // ISO date string
  time: string;
  message?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

/**
 * Appointment update request
 */
export interface AppointmentUpdateRequest {
  date?: string;
  time?: string;
  status?: AppointmentStatus;
  priority?: Priority;
  message?: string;
  providerId?: string;
  notes?: string;
}

/**
 * Appointment note
 */
export interface AppointmentNote {
  id: string;
  content: string;
  authorId: ObjectId;
  authorName: string;
  type: 'general' | 'medical' | 'administrative';
  createdAt: Date;
  isPrivate: boolean;
}

/**
 * Time slot availability
 */
export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
  providerId?: ObjectId;
  providerName?: string;
}

/**
 * Daily schedule
 */
export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
  totalSlots: number;
  availableSlots: number;
  bookedSlots: number;
}

/**
 * Appointment filters for queries
 */
export interface AppointmentFilters {
  status?: AppointmentStatus | AppointmentStatus[];
  service?: MedicalService | MedicalService[];
  dateFrom?: string;
  dateTo?: string;
  providerId?: string;
  priority?: Priority;
  patientEmail?: string;
  patientPhone?: string;
  search?: string; // Search across patient name, email, phone
}

/**
 * Appointment statistics
 */
export interface AppointmentStats {
  total: number;
  byStatus: Record<AppointmentStatus, number>;
  byService: Record<MedicalService, number>;
  byPriority: Record<Priority, number>;
  todaysAppointments: number;
  weeklyTrend: {
    date: string;
    count: number;
  }[];
  monthlyRevenue: number;
  averageWaitTime: number; // in minutes
  cancellationRate: number; // percentage
  noShowRate: number; // percentage
}

/**
 * Appointment reminder
 */
export interface AppointmentReminder {
  appointmentId: ObjectId;
  type: 'sms' | 'email' | 'call';
  scheduledAt: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  retryCount: number;
  error?: string;
}

/**
 * Appointment validation result
 */
export interface AppointmentValidationResult {
  isValid: boolean;
  errors: {
    field: string;
    message: string;
  }[];
  warnings: {
    field: string;
    message: string;
  }[];
}

/**
 * Provider availability
 */
export interface ProviderAvailability {
  providerId: ObjectId;
  providerName: string;
  specialization: string;
  schedule: {
    [day: string]: {
      isAvailable: boolean;
      startTime: string;
      endTime: string;
      breaks: {
        startTime: string;
        endTime: string;
      }[];
    };
  };
  blockedDates: string[]; // ISO date strings
  blockedSlots: {
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }[];
}

/**
 * Appointment conflict
 */
export interface AppointmentConflict {
  type: 'time_overlap' | 'provider_unavailable' | 'holiday' | 'maintenance';
  message: string;
  suggestedAlternatives: {
    date: string;
    time: string;
    providerId?: ObjectId;
  }[];
}

/**
 * Appointment export configuration
 */
export interface AppointmentExportConfig {
  format: 'csv' | 'excel' | 'pdf';
  dateRange: {
    from: string;
    to: string;
  };
  filters: AppointmentFilters;
  fields: (keyof Appointment)[];
  groupBy?: 'date' | 'provider' | 'service' | 'status';
}

/**
 * Bulk appointment operation
 */
export interface BulkAppointmentOperation {
  action: 'confirm' | 'cancel' | 'reschedule' | 'delete';
  appointmentIds: string[];
  reason?: string;
  newDate?: string;
  newTime?: string;
  notifyPatients: boolean;
}

/**
 * Appointment service configuration
 */
export interface AppointmentServiceConfig {
  service: MedicalService;
  duration: number; // in minutes
  price: number;
  requiresPreparation: boolean;
  preparationInstructions?: string;
  followUpRequired: boolean;
  allowOnlineBooking: boolean;
  advanceBookingDays: number;
  cancellationDeadlineHours: number;
}