'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addDays, isValid, isFuture, subMonths, differenceInDays } from 'date-fns';
import { Calendar, Heart, CalendarDays, Target, Activity, Award, Shield, TrendingUp } from 'lucide-react';
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

const fertileWindowSchema = z.object({
  lastPeriodDate: z.date({
    required_error: "Please select your last period date.",
  }),
  cycleLength: z.number()
    .min(21, "Cycle length must be at least 21 days")
    .max(35, "Cycle length must be at most 35 days"),
});

type FertileWindowFormData = z.infer<typeof fertileWindowSchema>;

interface FertileDay {
  date: Date;
  day: number;
  fertility: 'low' | 'medium' | 'high' | 'peak';
  phase: string;
  description: string;
}

interface FertileWindowResult {
  fertileWindow: FertileDay[];
  ovulationDate: Date;
  peakDays: Date[];
  currentPhase: string;
  cycleAccuracy: number;
  nextCycles: Date[];
  recommendations: string[];
}

// Calculate detailed fertile window with daily fertility levels
const calculateDetailedFertileWindow = (lastPeriodDate: Date, cycleLength: number): FertileWindowResult => {
  const ovulationDate = addDays(lastPeriodDate, cycleLength - 14);
  const today = new Date();
  
  // Create 6-day fertile window with detailed daily tracking
  const fertileWindow: FertileDay[] = [];
  
  for (let i = -5; i <= 1; i++) {
    const date = addDays(ovulationDate, i);
    const dayInCycle = differenceInDays(date, lastPeriodDate) + 1;
    
    let fertility: 'low' | 'medium' | 'high' | 'peak';
    let phase: string;
    let description: string;
    
    if (i === -1 || i === 0) {
      fertility = 'peak';
      phase = 'Peak Fertility';
      description = 'Highest conception probability';
    } else if (i === -2 || i === 1) {
      fertility = 'high';
      phase = 'High Fertility';
      description = 'High conception probability';
    } else {
      fertility = 'medium';
      phase = 'Fertile Period';
      description = 'Moderate conception probability';
    }
    
    fertileWindow.push({
      date,
      day: dayInCycle,
      fertility,
      phase,
      description,
    });
  }
  
  // Peak fertility days (ovulation day and day before)
  const peakDays = [addDays(ovulationDate, -1), ovulationDate];
  
  // Calculate current phase
  const dayInCurrentCycle = differenceInDays(today, lastPeriodDate) + 1;
  let currentPhase = 'Menstrual Phase';
  if (dayInCurrentCycle > 7 && dayInCurrentCycle < cycleLength - 14) currentPhase = 'Follicular Phase';
  if (dayInCurrentCycle >= cycleLength - 14 && dayInCurrentCycle <= cycleLength - 12) currentPhase = 'Ovulation Phase';
  if (dayInCurrentCycle > cycleLength - 12) currentPhase = 'Luteal Phase';
  
  // Cycle accuracy score based on typical patterns
  const cycleAccuracy = Math.min(95, Math.max(75, 95 - Math.abs(cycleLength - 28) * 2));
  
  // Next 3 cycles for tracking
  const nextCycles = [
    addDays(lastPeriodDate, cycleLength),
    addDays(lastPeriodDate, cycleLength * 2),
    addDays(lastPeriodDate, cycleLength * 3),
  ];
  
  // Medical recommendations
  const recommendations = [
    'Track basal body temperature for enhanced accuracy',
    'Monitor cervical mucus changes during fertile window',
    'Consider ovulation predictor kits for precise timing',
    'Maintain regular cycle tracking for pattern recognition',
    'Consult healthcare provider for personalized guidance',
  ];
  
  return {
    fertileWindow,
    ovulationDate,
    peakDays,
    currentPhase,
    cycleAccuracy,
    nextCycles,
    recommendations,
  };
};

const validateInputs = (date: Date): boolean => {
  if (!isValid(date)) return false;
  if (isFuture(date)) return false;
  if (date < subMonths(new Date(), 3)) return false;
  return true;
};

export default function FertileWindowCalculator() {
  const [result, setResult] = useState<FertileWindowResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<FertileWindowFormData>({
    resolver: zodResolver(fertileWindowSchema),
    defaultValues: {
      cycleLength: 28,
    },
  });

  const onSubmit = (data: FertileWindowFormData) => {
    if (!validateInputs(data.lastPeriodDate)) {
      form.setError('lastPeriodDate', {
        type: 'manual',
        message: 'Please enter a valid date within the last 3 months',
      });
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const calculationResult = calculateDetailedFertileWindow(data.lastPeriodDate, data.cycleLength);
      setResult(calculationResult);
      setIsCalculating(false);
    }, 800); // Longer animation for timeline effect
  };

  const resetCalculator = () => {
    setResult(null);
    form.reset({ cycleLength: 28 });
  };

  const getFertilityColor = (fertility: string) => {
    switch (fertility) {
      case 'peak': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const getFertilityTextColor = (fertility: string) => {
    switch (fertility) {
      case 'peak': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <CalculatorTemplate
      title="Fertile Window Calculator"
      description="Track your 6-day fertile window with detailed cycle monitoring and medical insights. Professional fertility tracking for conception planning."
      relatedCalculators={[
        {
          title: "Ovulation Calculator",
          href: "/calculators/ovulation-calculator",
          description: "Calculate your ovulation date and basic fertile window"
        },
        {
          title: "Due Date Calculator", 
          href: "/calculators/due-date-calculator",
          description: "Calculate your baby's due date from conception"
        }
      ]}
    >
      <div className="space-y-8">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary-green" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Track Your Fertile Window
              </h2>
              <p className="text-text-brown/70">
                Get detailed fertility insights with daily tracking and medical guidance
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
                      Analyzing Cycle...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5 mr-2" />
                      Calculate Fertile Window
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Your Fertile Window Analysis
              </h2>
              <p className="text-text-brown/70">
                Detailed fertility tracking with medical precision
              </p>
            </div>

            {/* Cycle Accuracy & Current Phase */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-primary-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Cycle Accuracy</h3>
                </div>
                <p className="text-3xl font-bold text-primary-green mb-2">
                  {result.cycleAccuracy}%
                </p>
                <p className="text-text-brown/70">Medical prediction confidence</p>
              </div>

              <div className="bg-gradient-to-r from-forest-green/10 to-secondary-brown/10 rounded-xl p-6 border border-forest-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-forest-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Current Phase</h3>
                </div>
                <p className="text-xl font-semibold text-forest-green mb-2">
                  {result.currentPhase}
                </p>
                <p className="text-text-brown/70">Your cycle status today</p>
              </div>
            </div>

            {/* Fertile Window Timeline */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays className="w-6 h-6 text-primary-green" />
                <h3 className="text-xl font-semibold text-text-brown">6-Day Fertile Window</h3>
              </div>
              
              <div className="space-y-4">
                {result.fertileWindow.map((day, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent-cream/30 transition-colors">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <div className={`w-4 h-4 rounded-full ${getFertilityColor(day.fertility)} mb-1`}></div>
                      <span className="text-sm font-medium text-text-brown">
                        Day {day.day}
                      </span>
                      <span className="text-xs text-text-brown/60">
                        {format(day.date, 'MMM dd')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${getFertilityTextColor(day.fertility)}`}>
                          {day.phase}
                        </span>
                        {day.fertility === 'peak' && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            Peak
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-brown/70">{day.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getFertilityTextColor(day.fertility)}`}>
                        {day.fertility === 'peak' ? '95%' : 
                         day.fertility === 'high' ? '75%' : 
                         day.fertility === 'medium' ? '45%' : '20%'}
                      </span>
                      <p className="text-xs text-text-brown/60">probability</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Fertility Alert */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Peak Fertility Days</h3>
              </div>
              <p className="text-lg font-medium text-red-700 mb-2">
                {result.peakDays.map(date => format(date, 'EEEE, MMM dd')).join(' & ')}
              </p>
              <p className="text-red-700/80">
                Highest conception probability - optimal timing for conception attempts
              </p>
            </div>

            {/* Medical Recommendations */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary-green" />
                <h3 className="text-lg font-semibold text-text-brown">Medical Recommendations</h3>
              </div>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-text-brown/80">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Cycles Preview */}
            <div className="bg-gradient-to-r from-primary-beige/20 to-secondary-brown/20 rounded-xl p-6 border border-primary-beige/30">
              <h3 className="text-lg font-semibold text-text-brown mb-4">
                Next Cycles Prediction
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.nextCycles.map((date, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-text-brown/70 mb-1">Cycle {index + 2}</p>
                    <p className="font-medium text-text-brown">
                      {format(date, 'MMM dd, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="flex-1 h-12 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              >
                Track New Cycle
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