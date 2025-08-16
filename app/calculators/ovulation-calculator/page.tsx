'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addDays, isValid, isFuture, subMonths } from 'date-fns';
import { Calendar, Heart, CalendarDays } from 'lucide-react';
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { calculatorTheme } from '../utils/calculatorTheme';

// Simple validation schema - no over-engineering
const ovulationSchema = z.object({
  lastPeriodDate: z.date({
    required_error: "Please select your last period date.",
  }),
  cycleLength: z.number()
    .min(21, "Cycle length must be at least 21 days")
    .max(35, "Cycle length must be at most 35 days"),
});

type OvulationFormData = z.infer<typeof ovulationSchema>;

interface OvulationResult {
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodDate: Date;
  daysUntilOvulation: number;
  currentPhase: string;
}

// Pure calculation function - simple and testable
const calculateOvulation = (lastPeriodDate: Date, cycleLength: number): OvulationResult => {
  // Core formula: Next ovulation = LMP + (cycle length - 14)
  const ovulationDate = addDays(lastPeriodDate, cycleLength - 14);
  
  // Fertile window: ovulation ± 5 days (medical standard)
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);
  
  // Next period: LMP + cycle length
  const nextPeriodDate = addDays(lastPeriodDate, cycleLength);
  
  // Days until ovulation
  const today = new Date();
  const daysUntilOvulation = Math.max(0, Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Current phase calculation
  const dayInCycle = Math.ceil((today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24));
  let currentPhase = 'Menstrual';
  if (dayInCycle > 7 && dayInCycle < cycleLength - 14) currentPhase = 'Follicular';
  if (dayInCycle >= cycleLength - 14 && dayInCycle <= cycleLength - 12) currentPhase = 'Ovulation';
  if (dayInCycle > cycleLength - 12) currentPhase = 'Luteal';
  
  return {
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    nextPeriodDate,
    daysUntilOvulation,
    currentPhase,
  };
};

// Simple validation function
const validateInputs = (date: Date): boolean => {
  if (!isValid(date)) return false;
  if (isFuture(date)) return false;
  if (date < subMonths(new Date(), 3)) return false; // Not older than 3 months
  return true;
};

export default function OvulationCalculator() {
  const [result, setResult] = useState<OvulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<OvulationFormData>({
    resolver: zodResolver(ovulationSchema),
    defaultValues: {
      cycleLength: 28, // Medical average
    },
  });

  const onSubmit = (data: OvulationFormData) => {
    if (!validateInputs(data.lastPeriodDate)) {
      form.setError('lastPeriodDate', {
        type: 'manual',
        message: 'Please enter a valid date within the last 3 months',
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate brief calculation (for UX)
    setTimeout(() => {
      const calculationResult = calculateOvulation(data.lastPeriodDate, data.cycleLength);
      setResult(calculationResult);
      setIsCalculating(false);
    }, 500);
  };

  const resetCalculator = () => {
    setResult(null);
    form.reset({ cycleLength: 28 });
  };

  return (
    <CalculatorTemplate
      title="Ovulation Calculator"
      description="Calculate your ovulation date and fertile window using medical-grade accuracy. Essential for family planning and understanding your menstrual cycle."
      relatedCalculators={[
        {
          title: "Due Date Calculator",
          href: "/calculators/due-date-calculator",
          description: "Calculate your baby's due date from conception"
        },
        {
          title: "Pregnancy Week Calculator", 
          href: "/calculators/pregnancy-week-calculator",
          description: "Track your pregnancy week by week"
        }
      ]}
    >
      <div className="space-y-8">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-green" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Calculate Your Ovulation Date
              </h2>
              <p className="text-text-brown/70">
                Enter your last period date and cycle length for accurate ovulation prediction
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="lastPeriodDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-medium text-text-brown">
                        Last Menstrual Period (LMP) Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal h-12",
                                !field.value && "text-muted-foreground",
                                "border-primary-green/20 hover:border-primary-green/40"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMMM dd, yyyy")
                              ) : (
                                <span>Pick your last period date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date > new Date() || 
                              date < subMonths(new Date(), 3)
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
                  name="cycleLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-text-brown">
                        Average Cycle Length (days)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="21"
                          max="35"
                          className="h-12 border-primary-green/20 focus:border-primary-green"
                          placeholder="28"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 28)}
                        />
                      </FormControl>
                      <p className="text-sm text-text-brown/60">
                        Normal cycle length is 21-35 days (average is 28 days)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={`w-full h-12 ${calculatorTheme.classes.button}`}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-5 h-5 mr-2" />
                      Calculate Ovulation
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Your Ovulation Results
              </h2>
              <p className="text-text-brown/70">
                Based on your cycle, here are your fertility insights
              </p>
            </div>

            <div className="grid gap-6">
              {/* Ovulation Date */}
              <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarDays className="w-6 h-6 text-primary-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Next Ovulation Date</h3>
                </div>
                <p className="text-2xl font-bold text-primary-green mb-2">
                  {format(result.ovulationDate, 'EEEE, MMMM dd, yyyy')}
                </p>
                <p className="text-text-brown/70">
                  {result.daysUntilOvulation === 0 
                    ? "Ovulation is today!" 
                    : result.daysUntilOvulation === 1 
                    ? "Ovulation is tomorrow" 
                    : `${result.daysUntilOvulation} days until ovulation`}
                </p>
              </div>

              {/* Fertile Window */}
              <div className="bg-gradient-to-r from-forest-green/10 to-secondary-brown/10 rounded-xl p-6 border border-forest-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-forest-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Fertile Window</h3>
                </div>
                <p className="text-xl font-semibold text-forest-green mb-2">
                  {format(result.fertileWindowStart, 'MMM dd')} - {format(result.fertileWindowEnd, 'MMM dd, yyyy')}
                </p>
                <p className="text-text-brown/70">
                  6-day window for highest conception probability
                </p>
              </div>

              {/* Current Phase and Next Period */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h4 className="font-semibold text-text-brown mb-2">Current Phase</h4>
                  <p className="text-lg text-primary-green font-medium">{result.currentPhase}</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h4 className="font-semibold text-text-brown mb-2">Next Period</h4>
                  <p className="text-lg text-primary-green font-medium">
                    {format(result.nextPeriodDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="flex-1 h-12 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              >
                Calculate Again
              </Button>
              <Button
                className={`flex-1 h-12 ${calculatorTheme.classes.button}`}
                asChild
              >
                <a href="/contact">
                  <Heart className="w-4 h-4 mr-2" />
                  Consult Dr. Amita Shukla
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}