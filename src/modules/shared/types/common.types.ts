import { ObjectId } from 'mongodb';

/**
 * Base document interface for all MongoDB documents
 */
export interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
  timestamp: string;
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination result metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Service operation result
 */
export interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ValidationError[];
}

/**
 * Database query filters
 */
export interface QueryFilters {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

/**
 * Healthcare-specific types
 */
export interface HealthcareProvider {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  isActive: boolean;
}

/**
 * Patient information
 */
export interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  emergencyContact?: EmergencyContact;
}

/**
 * Emergency contact information
 */
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

/**
 * Medical service types
 */
export type MedicalService = 
  | 'High Risk Pregnancy'
  | 'Infertility Treatment'
  | 'PCOS/PCOD Treatment'
  | 'Laparoscopy'
  | 'Antenatal Care'
  | 'Well Women Health'
  | 'General Consultation'
  | 'Other';

/**
 * Appointment status types
 */
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

/**
 * User roles
 */
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

/**
 * Priority levels
 */
export type Priority = 'low' | 'medium' | 'high' | 'urgent' | 'emergency';

/**
 * Audit log entry
 */
export interface AuditLog extends BaseDocument {
  userId?: ObjectId;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * System health status
 */
export interface HealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: Date;
  responseTime?: number;
  error?: string;
}

/**
 * Configuration interface
 */
export interface AppConfig {
  database: {
    uri: string;
    name: string;
  };
  security: {
    jwtSecret: string;
    sessionTimeout: number;
  };
  email: {
    provider: string;
    apiKey: string;
  };
  features: {
    enableBooking: boolean;
    enableNotifications: boolean;
    maintenanceMode: boolean;
  };
}

/**
 * File upload types
 */
export interface FileUpload {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadedAt: Date;
  uploadedBy?: ObjectId;
}

/**
 * Email template data
 */
export interface EmailTemplate {
  to: string;
  subject: string;
  templateId: string;
  data: Record<string, any>;
}

/**
 * Notification types
 */
export interface Notification extends BaseDocument {
  userId: ObjectId;
  type: 'appointment' | 'reminder' | 'system' | 'marketing';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
}

/**
 * Authentication context
 */
export interface AuthContext {
  user: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Request context for APIs
 */
export interface RequestContext {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}

/**
 * Cache entry
 */
export interface CacheEntry<T = any> {
  key: string;
  value: T;
  expiresAt: Date;
  tags?: string[];
}

/**
 * Search result
 */
export interface SearchResult<T = any> {
  items: T[];
  total: number;
  took: number;
  facets?: Record<string, any>;
}