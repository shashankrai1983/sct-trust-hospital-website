/**
 * Simple appointment types - Linux kernel style
 * No over-engineering, just what we need
 */

import { ObjectId } from 'mongodb';

// Basic appointment - what goes in the database
export interface Appointment {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Booked slot - prevent conflicts
export interface BookedSlot {
  _id?: ObjectId;
  date: string;
  time: string;
  appointmentId: ObjectId;
  patientName: string;
  patientEmail: string;
  service: string;
  status: 'active' | 'cancelled';
  expiresAt?: Date; // For temp holds
  createdAt: Date;
  updatedAt: Date;
}

// Admin blocked dates
export interface BlockedDate {
  _id?: ObjectId;
  date: string;
  timeSlots?: string[]; // Empty = entire day blocked
  reason: string;
  blockedBy: ObjectId | string; // Support both admin user (string) and regular user (ObjectId)
  blockedByName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Ticker notification
export interface TickerNotification {
  _id?: ObjectId;
  message: string;
  type: 'blocked_date' | 'emergency';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}