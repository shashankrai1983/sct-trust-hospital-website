"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { IndexNowService } from '@/lib/indexnow';
import { getAvailableSlots, isDateDisabled, isDateDisabledCached, SlotState } from '@/lib/availability';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  service: z.string().min(1, {
    message: 'Please select a service.',
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time slot.",
  }),
  message: z.string().optional(),
  captchaToken: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotState[]>([]);
  const [loading, setLoading] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Map<string, { reason: string; timeSlots: string[]; isFullDayBlocked: boolean }>>(new Map());
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      captchaToken: '',
    },
  });

  // Load reCAPTCHA V3 script
  React.useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== 'undefined' && !window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };
    loadRecaptcha();
  }, []);

  // Preload blocked dates efficiently - good taste: single API call, extended range
  React.useEffect(() => {
    const preloadBlockedDates = async () => {
      const today = new Date();
      
      // Expanded range: current month + next 3 months for better UX
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 4, 0); // +3 months
      
      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');
      
      try {
        // Single efficient API call instead of individual date checks
        const response = await fetch(`/api/admin/blocked-dates/range?startDate=${startDateStr}&endDate=${endDateStr}`);
        const data = await response.json();
        
        if (data.success) {
          // Convert response to enhanced Map for fast lookups with partial block support
          const newBlockedDates = new Map();
          
          Object.entries(data.data).forEach(([dateStr, info]: [string, any]) => {
            newBlockedDates.set(dateStr, {
              reason: info.reason,
              timeSlots: info.timeSlots || [],
              isFullDayBlocked: info.isFullDayBlocked
            });
          });
          
          setBlockedDates(newBlockedDates);
          console.log(`✅ Loaded ${newBlockedDates.size} blocked dates for ${startDateStr} to ${endDateStr}`);
        } else {
          console.warn('Failed to load blocked dates:', data.message);
        }
      } catch (error) {
        console.warn('Failed to preload blocked dates:', error);
        
        // Fallback: try to load at least the basic disabled dates
        try {
          const fallbackDates = new Map();
          // Check a few key dates manually as fallback
          const checkDates = [
            new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            new Date(today.getFullYear(), today.getMonth() + 1, 1),
            new Date(today.getFullYear(), today.getMonth() + 2, 1),
          ];
          
          for (const checkDate of checkDates) {
            const result = await isDateDisabledCached(checkDate);
            if (result.disabled && result.reason) {
              const dateStr = format(checkDate, 'yyyy-MM-dd');
              fallbackDates.set(dateStr, {
                reason: result.reason,
                timeSlots: [],
                isFullDayBlocked: true // Fallback assumes full day block
              });
            }
          }
          
          setBlockedDates(fallbackDates);
        } catch (fallbackError) {
          console.warn('Fallback loading also failed:', fallbackError);
        }
      }
    };
    
    preloadBlockedDates();
  }, []);

  // Enhanced date disabled function - good taste: single source of truth
  const isDateDisabledEnhanced = React.useCallback(async (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Check cache first
    if (blockedDates.has(dateStr)) {
      return true;
    }
    
    // Check async disabled status
    const result = await isDateDisabledCached(date);
    
    // Cache blocked dates with enhanced structure
    if (result.disabled && result.reason) {
      setBlockedDates(prev => new Map(prev).set(dateStr, {
        reason: result.reason,
        timeSlots: [],
        isFullDayBlocked: true // Async check assumes full day block
      }));
    }
    
    return result.disabled;
  }, [blockedDates]);

  // Sync version for react-day-picker (enhanced with partial block support)
  const isDateDisabledSync = React.useCallback((date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Check cached blocked dates - only disable if FULL DAY blocked
    if (blockedDates.has(dateStr)) {
      const blockInfo = blockedDates.get(dateStr)!;
      return blockInfo.isFullDayBlocked; // Key fix: only disable if full day blocked
    }
    
    // Fall back to basic disabled check (past dates, Sundays)
    const basicDisabled = isDateDisabled(date);
    return basicDisabled;
  }, [blockedDates]);

  // Load slots when date changes - good taste approach
  const loadSlots = async (date: Date) => {
    setLoading(true);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    try {
      // Load slots - simple, no special cases
      const slots = await getAvailableSlots(dateStr);
      
      setSlots(slots);
      
      // Clear time if no longer available
      const currentTime = form.getValues('time');
      if (currentTime && !slots.find(s => s.time === currentTime)?.available) {
        form.setValue('time', '');
      }
    } catch (error) {
      setSlots([]);
      toast({
        title: "Error",
        description: "Failed to load availability",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const executeRecaptcha = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'appointment_booking' })
            .then((token: string) => {
              resolve(token);
            })
            .catch(() => {
              resolve(null);
            });
        });
      } else {
        resolve(null);
      }
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Skip reCAPTCHA in localhost development
    const isLocalhost = typeof window !== 'undefined' && 
                       (window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1');
    
    let recaptchaToken = null;
    
    if (!isLocalhost) {
      // Execute reCAPTCHA V3 for staging/production only
      recaptchaToken = await executeRecaptcha();
      
      if (!recaptchaToken) {
        form.setError('captchaToken', {
          type: 'manual',
          message: 'reCAPTCHA verification failed. Please try again.',
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    setCaptchaToken(recaptchaToken);
    
    try {
      // Prepare the data for API submission
      const appointmentData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'), // Convert date to string format
        captchaToken: recaptchaToken || undefined, // Convert null to undefined for Zod
      };

      // Make API call to submit appointment
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to book appointment');
      }

      // Success
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been scheduled for ${format(data.date, 'PPP')} at ${data.time}. We'll contact you soon to confirm.`,
      });

      // Submit to IndexNow for instant indexing of updated contact page
      try {
        if (result.appointmentId) {
          await IndexNowService.submitAppointmentConfirmation(result.appointmentId);
        } else {
          // Fallback: submit contact page
          await IndexNowService.submitUrl('https://dramitashukla.com/contact');
        }
      } catch (indexError) {
        // IndexNow failure shouldn't affect user experience
        console.log('IndexNow submission failed:', indexError);
      }
      
      // Reset form after showing success for a moment
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        setCaptchaToken(null);
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to book appointment';
      
      toast({
        title: "Booking Failed",
        description: errorMessage + ". Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const services = [
    'High Risk Pregnancy',
    'Infertility Treatment',
    'PCOS/PCOD Treatment',
    'Laparoscopy',
    'Antenatal Care',
    'Well Women Health',
    'General Consultation',
    'Other',
  ];


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Needed</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Appointment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        if (date) loadSlots(date);
                      }}
                      disabled={isDateDisabledSync}
                      initialFocus
                    />
                    {/* Show enhanced blocked date information */}
                    {field.value && blockedDates.has(format(field.value, 'yyyy-MM-dd')) && (() => {
                      const blockInfo = blockedDates.get(format(field.value, 'yyyy-MM-dd'))!;
                      const isPartialBlock = !blockInfo.isFullDayBlocked;
                      
                      return (
                        <div className={`mt-2 p-2 border rounded-md ${
                          isPartialBlock 
                            ? 'bg-orange-50 border-orange-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className={`flex items-center text-sm ${
                            isPartialBlock ? 'text-orange-800' : 'text-red-800'
                          }`}>
                            {isPartialBlock ? (
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="font-medium">
                              {isPartialBlock ? 'Partially Available' : 'Date Unavailable'}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            isPartialBlock ? 'text-orange-700' : 'text-red-700'
                          }`}>
                            {blockInfo.reason}
                            {isPartialBlock && (
                              <span className="block mt-1">
                                Blocked times: {blockInfo.timeSlots.join(', ')}
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    })()}
                  </PopoverContent>
                </Popover>
                {slots.length > 0 && slots.every(s => !s.available) && slots[0].reason && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {slots[0].reason}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Preferred Time
                  {loading && (
                    <span className="ml-2 text-sm text-blue-600">Loading...</span>
                  )}
                </FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    disabled={!form.watch('date') || loading}
                  >
                    <option value="">
                      {!form.watch('date') 
                        ? "Please select a date first" 
                        : loading 
                        ? "Loading..." 
                        : slots.filter(s => s.available).length === 0 
                        ? "No slots available"
                        : "Select a time slot"
                      }
                    </option>
                    {slots.map((slot) => (
                      <option 
                        key={slot.time} 
                        value={slot.time} 
                        disabled={!slot.available}
                        className={!slot.available ? 'text-gray-400' : ''}
                      >
                        {slot.time} {!slot.available ? '(Unavailable)' : ''}
                      </option>
                    ))}
                    <option value="" disabled>-- Break Time 2:00 PM - 6:00 PM --</option>
                  </select>
                </FormControl>
                {form.watch('date') && !loading && slots.length > 0 && (
                  <p className={`text-sm mt-1 ${
                    slots.filter(s => s.available).length === 0 
                      ? 'text-orange-600' 
                      : 'text-green-600'
                  }`}>
                    {slots.filter(s => s.available).length} slot{slots.filter(s => s.available).length !== 1 ? 's' : ''} available
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide any additional information about your condition" 
                  className="min-h-[80px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        {/* reCAPTCHA V3 - Invisible, runs automatically */}
        <div className="text-center text-sm text-muted-foreground">
          <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
        </div>
        
        {/* Show reCAPTCHA errors only during submission */}
        {form.formState.errors.captchaToken && (
          <div className="text-center text-sm text-red-600">
            {form.formState.errors.captchaToken.message}
          </div>
        )}
        
        <Button 
          type="submit" 
          variant="ghost"
          className="btn-green w-full" 
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Appointment Booked
            </>
          ) : (
            'Book Appointment'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;