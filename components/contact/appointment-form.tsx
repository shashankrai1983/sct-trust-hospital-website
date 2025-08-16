"use client";

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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
    
    // Execute reCAPTCHA V3
    const recaptchaToken = await executeRecaptcha();
    
    if (!recaptchaToken) {
      form.setError('captchaToken', {
        type: 'manual',
        message: 'reCAPTCHA verification failed. Please try again.',
      });
      setIsSubmitting(false);
      return;
    }
    
    setCaptchaToken(recaptchaToken);
    
    try {
      // Prepare the data for API submission
      const appointmentData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'), // Convert date to string format
        captchaToken: recaptchaToken,
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

  const timeSlots = [
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', 
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', 
    '08:00 PM', '08:30 PM', '09:00 PM'
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
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date.getDay() === 0 // Disable Sundays
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                    <option value="" disabled>-- Break Time 2:00 PM - 6:00 PM --</option>
                  </select>
                </FormControl>
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