'use client';

// Conception Date Calculator Page - Linus-Style Implementation
// "Good taste: eliminate special cases through better data structures"
// Reuse existing patterns, change only the calculation logic

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Calculator, Calendar, Clock, Target, Sparkles, ArrowLeft, AlertCircle, CheckCircle2, Share2, Activity, Award } from 'lucide-react';
import Link from 'next/link';
import { isValid, isFuture, subMonths, addDays, format } from 'date-fns';
import { MilestoneBadge, CalculatorAchievement } from '../components/MilestoneBadge';
import { useCalculatorAnimations } from '../hooks/useCalculatorAnimations';
import { calculateConceptionDate, validateLMPDate, validateDueDate, formatCalculatorDate, formatDateRange } from '../utils/dateCalculations';

// Validation Schema - dual input flexibility
const conceptionCalculatorSchema = z.object({
  inputType: z.enum(['lmp', 'dueDate'], {
    required_error: 'Please select either LMP date or Due date',
  }),
  lmpDate: z.string().optional(),
  dueDate: z.string().optional(),
}).refine((data) => {
  if (data.inputType === 'lmp') {
    if (!data.lmpDate) return false;
    const date = new Date(data.lmpDate);
    if (!isValid(date)) return false;
    const today = new Date();
    const maxPastDate = subMonths(today, 10);
    return date >= maxPastDate && !isFuture(date);
  } else {
    if (!data.dueDate) return false;
    const date = new Date(data.dueDate);
    if (!isValid(date)) return false;
    const today = new Date();
    const maxFutureDate = addDays(today, 42 * 7); // 42 weeks
    return date > today && date <= maxFutureDate;
  }
}, {
  message: 'Please enter a valid date for the selected input type',
});

type ConceptionCalculatorInput = z.infer<typeof conceptionCalculatorSchema>;

// Linus principle: "Most state is derived state"
interface ConceptionState {
  isValid: boolean;
  data: {
    estimatedConception: Date;
    conceptionRange: {
      earliest: Date;
      latest: Date;
    };
    fertilityWindow: {
      start: Date;
      end: Date;
    };
    calculationMethod: string;
    confidenceLevel: string;
  } | null;
  error: string | null;
}

const useConceptionCalculation = (input: ConceptionCalculatorInput): ConceptionState => {
  if (!input.inputType || (!input.lmpDate && !input.dueDate)) {
    return { isValid: false, data: null, error: null };
  }

  try {
    let referenceDate: Date;
    let isLMP: boolean;
    let method: string;

    if (input.inputType === 'lmp' && input.lmpDate) {
      referenceDate = new Date(input.lmpDate);
      isLMP = true;
      method = 'Based on Last Menstrual Period (LMP)';
    } else if (input.inputType === 'dueDate' && input.dueDate) {
      referenceDate = new Date(input.dueDate);
      isLMP = false;
      method = 'Based on Expected Due Date';
    } else {
      return { isValid: false, data: null, error: 'Invalid input' };
    }

    const conceptionData = calculateConceptionDate(referenceDate, isLMP);
    
    return { 
      isValid: true, 
      data: {
        ...conceptionData,
        calculationMethod: method,
        confidenceLevel: 'Medical Standard ±6 days'
      }, 
      error: null 
    };
  } catch (error) {
    return { 
      isValid: false, 
      data: null, 
      error: error instanceof Error ? error.message : 'Invalid date'
    };
  }
};

export default function ConceptionDateCalculatorPage() {
  // Linus principle: "Most state is derived state"
  const [isCalculating, setIsCalculating] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid: formIsValid },
  } = useForm<ConceptionCalculatorInput>({
    resolver: zodResolver(conceptionCalculatorSchema),
    mode: 'onChange',
    defaultValues: {
      inputType: 'lmp'
    }
  });

  const inputType = watch('inputType');
  const lmpDate = watch('lmpDate');
  const dueDate = watch('dueDate');
  
  // Pure calculation - no async nonsense for simple math
  const conception = useConceptionCalculation({ inputType, lmpDate, dueDate });
  
  // Clean animation interface
  const animations = useCalculatorAnimations();

  // Linus: "If you need async for simple math, you're doing it wrong"
  const handleCalculation = (data: ConceptionCalculatorInput) => {
    setIsCalculating(true);
    
    // Simulate processing for UX - but calculation is instant
    setTimeout(() => {
      if (conception.data) {
        animations.triggerResults(1); // Trigger animation
        setTimeout(() => {
          animations.triggerCelebration();
        }, 1000);
      }
      setIsCalculating(false);
    }, 800);
  };

  const showResults = conception.isValid && conception.data && !isCalculating;

  return (
    <div className="min-h-screen bg-accent-cream">
      {/* Header Navigation */}
      <div className="bg-white border-b border-primary-green/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-text-brown/60">
            <Link href="/" className="hover:text-primary-green transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/calculators" className="hover:text-primary-green transition-colors">Calculators</Link>
            <span className="mx-2">/</span>
            <span className="text-text-brown">Conception Date Calculator</span>
          </nav>
          
          <Link 
            href="/calculators"
            className="inline-flex items-center gap-2 text-primary-green hover:text-forest-green transition-colors mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Compact Page Header */}
        <div ref={animations.refs.header} className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-green" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-brown">
              Conception Date Calculator
            </h1>
          </div>
          <p className="text-text-brown/80 max-w-xl mx-auto">
            Calculate your estimated conception date using either your Last Menstrual Period or Expected Due Date.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div ref={animations.refs.calculator} className="bg-white rounded-xl shadow-lg p-6">
              {/* Calculator Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-brown mb-2">
                  Calculate Your Estimated Conception Date
                </h2>
                <p className="text-text-brown/70 text-sm">
                  Choose your preferred calculation method and enter the corresponding date for accurate conception timing.
                </p>
              </div>

              {/* Calculator Form */}
              <form onSubmit={handleSubmit(handleCalculation)} className="space-y-6">
                {/* Input Type Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-text-brown">
                    Choose Calculation Method
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`
                      relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${inputType === 'lmp' 
                        ? 'border-primary-green bg-primary-green/5' 
                        : 'border-gray-200 hover:border-primary-green/40'
                      }
                    `}>
                      <input
                        {...register('inputType')}
                        type="radio"
                        value="lmp"
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-all
                          ${inputType === 'lmp' 
                            ? 'border-primary-green bg-primary-green' 
                            : 'border-gray-300'
                          }
                        `}>
                          {inputType === 'lmp' && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-brown">Last Menstrual Period</p>
                          <p className="text-xs text-text-brown/60">Most common method</p>
                        </div>
                      </div>
                    </label>

                    <label className={`
                      relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${inputType === 'dueDate' 
                        ? 'border-primary-green bg-primary-green/5' 
                        : 'border-gray-200 hover:border-primary-green/40'
                      }
                    `}>
                      <input
                        {...register('inputType')}
                        type="radio"
                        value="dueDate"
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-all
                          ${inputType === 'dueDate' 
                            ? 'border-primary-green bg-primary-green' 
                            : 'border-gray-300'
                          }
                        `}>
                          {inputType === 'dueDate' && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-brown">Expected Due Date</p>
                          <p className="text-xs text-text-brown/60">If you know your due date</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Date Input - Dynamic based on selection */}
                {inputType === 'lmp' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-brown">
                      Last Menstrual Period (LMP) Date
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        {...register('lmpDate')}
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        className={`
                          w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200
                          focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none
                          ${errors.root ? 'border-red-500' : 'border-gray-300 hover:border-primary-green/40'}
                        `}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-green/60" />
                      
                      {lmpDate && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-xs text-text-brown/60">
                      Select the first day of your last menstrual period
                    </p>
                  </div>
                )}

                {inputType === 'dueDate' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-brown">
                      Expected Due Date
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        {...register('dueDate')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className={`
                          w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200
                          focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none
                          ${errors.root ? 'border-red-500' : 'border-gray-300 hover:border-primary-green/40'}
                        `}
                      />
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-green/60" />
                      
                      {dueDate && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-xs text-text-brown/60">
                      Enter your expected delivery date
                    </p>
                  </div>
                )}

                {errors.root && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.root.message}
                  </p>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!formIsValid || isCalculating}
                    className={`
                      px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 min-w-40
                      focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:ring-offset-2
                      ${!formIsValid || isCalculating 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-primary-green text-white hover:bg-forest-green shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isCalculating ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" />
                        Calculating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Calculate Conception Date
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Results - Linus: "No special cases, just data transformation" */}
              {showResults && (
                <div ref={animations.refs.results} className="mt-8 space-y-6 relative">
                  {/* Particles Container */}
                  <div ref={animations.refs.particles} className="absolute inset-0 pointer-events-none z-10"></div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-brown flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary-green" />
                      Your Conception Results
                    </h3>
                    <button className="text-primary-green hover:text-forest-green transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Estimated Conception Date */}
                    <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-6 h-6 text-primary-green" />
                        <h4 className="font-semibold text-text-brown">Estimated Conception Date</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary-green mb-1">
                        {formatCalculatorDate(conception.data.estimatedConception)}
                      </p>
                      <p className="text-sm text-text-brown/70">
                        {conception.data.calculationMethod}
                      </p>
                    </div>

                    {/* Confidence Level */}
                    <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-6 h-6 text-forest-green" />
                        <h4 className="font-semibold text-text-brown">Medical Accuracy</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-text-brown/70">Confidence Level</p>
                          <p className="text-lg font-semibold text-forest-green">
                            {conception.data.confidenceLevel}
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-forest-green h-2 rounded-full w-4/5"></div>
                        </div>
                        <p className="text-xs text-text-brown/60">
                          Based on medical standard calculations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conception Range */}
                  <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                    <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary-green" />
                      Conception Window
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-primary-green/10 rounded-lg p-4 mb-2">
                          <Calendar className="w-6 h-6 text-primary-green mx-auto" />
                        </div>
                        <p className="text-sm text-text-brown/70">Earliest Possible</p>
                        <p className="font-semibold text-text-brown">
                          {format(conception.data.conceptionRange.earliest, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-forest-green/10 rounded-lg p-4 mb-2">
                          <Target className="w-6 h-6 text-forest-green mx-auto" />
                        </div>
                        <p className="text-sm text-text-brown/70">Most Likely</p>
                        <p className="font-semibold text-text-brown">
                          {format(conception.data.estimatedConception, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-primary-beige/20 rounded-lg p-4 mb-2">
                          <Calendar className="w-6 h-6 text-secondary-brown mx-auto" />
                        </div>
                        <p className="text-sm text-text-brown/70">Latest Possible</p>
                        <p className="font-semibold text-text-brown">
                          {format(conception.data.conceptionRange.latest, 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-accent-cream rounded-lg">
                      <p className="text-sm text-text-brown text-center">
                        <strong>Fertile Window:</strong> {formatDateRange(conception.data.fertilityWindow.start, conception.data.fertilityWindow.end)}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CalculatorAchievement 
                      type="accuracy" 
                      animated={showResults}
                      delay={0}
                    />
                    <CalculatorAchievement 
                      type="completion" 
                      animated={showResults}
                      delay={300}
                    />
                    <CalculatorAchievement 
                      type="guidance" 
                      animated={showResults}
                      delay={600}
                    />
                  </div>
                </div>
              )}
              
              {/* Processing Progress Indicator - Linus: "Keep the UX, simplify the logic" */}
              {isCalculating && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-primary-green/20">
                    <Clock className="w-6 h-6 animate-spin text-primary-green" />
                    <span className="text-text-brown font-medium">Calculating conception timing...</span>
                  </div>
                </div>
              )}

              {/* Information Cards */}
              {!showResults && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-10 h-10 bg-primary-green/10 rounded-full p-2 text-primary-green" />
                      <h3 className="font-semibold text-text-brown">Scientific Precision</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      Our conception calculator uses medical standard formulas: LMP + 14 days for ovulation timing, 
                      or Due Date - 266 days for reverse calculation, providing accurate scientific estimates.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-10 h-10 bg-forest-green/10 rounded-full p-2 text-forest-green" />
                      <h3 className="font-semibold text-text-brown">Medical Guidance</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      While calculators provide estimates, Dr. Amita Shukla at SCT Trust Hospital provides 
                      professional medical guidance for conception planning and pregnancy care in Lucknow.
                    </p>
                  </div>
                </div>
              )}

              {/* Educational Content */}
              <div className="mt-12 bg-white rounded-xl p-6 border border-primary-green/20">
                <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-green" />
                  Understanding Conception Timing
                </h3>
                <div className="prose prose-sm text-text-brown/80 max-w-none">
                  <p className="mb-4">
                    Conception typically occurs during ovulation, approximately 14 days after the start of your last menstrual period. 
                    However, sperm can survive in the reproductive tract for up to 5 days, creating a fertile window.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">Key Facts:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Ovulation occurs ~14 days before next period</li>
                        <li>• Fertile window is typically 6 days long</li>
                        <li>• Conception can occur 5 days before ovulation</li>
                        <li>• Accurate dating helps with prenatal care planning</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">Consult Dr. Amita for:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Conception planning and timing guidance</li>
                        <li>• Irregular cycle considerations</li>
                        <li>• Fertility counseling and support</li>
                        <li>• Professional prenatal care planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professional Care */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary-green" />
                Professional Care
              </h3>
              <p className="text-text-brown/80 mb-4">
                Get personalized conception planning guidance from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-forest-green transition-colors"
              >
                Schedule Consultation
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            {/* Related Calculators */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-green" />
                Related Calculators
              </h3>
              <div className="space-y-3">
                <Link href="/calculators/due-date-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Due Date Calculator</h4>
                  <p className="text-sm text-text-brown/70">Calculate your expected delivery date</p>
                </Link>
                <Link href="/calculators/pregnancy-week-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Pregnancy Week Calculator</h4>
                  <p className="text-sm text-text-brown/70">Track your current pregnancy week</p>
                </Link>
                <Link href="/calculators/ovulation-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Ovulation Calculator</h4>
                  <p className="text-sm text-text-brown/70">Find your fertile window and ovulation date</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          <div className="bg-white rounded-lg p-3 text-center border border-primary-green/10">
            <Heart className="w-5 h-5 text-primary-green mx-auto mb-1" />
            <div className="text-xs font-medium text-text-brown">Medical Accuracy</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-primary-green/10">
            <Award className="w-5 h-5 text-forest-green mx-auto mb-1" />
            <div className="text-xs font-medium text-text-brown">Scientific Method</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-primary-green/10">
            <CheckCircle2 className="w-5 h-5 text-primary-green mx-auto mb-1" />
            <div className="text-xs font-medium text-text-brown">Trusted by Thousands</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-primary-green/10">
            <Heart className="w-5 h-5 text-forest-green mx-auto mb-1" />
            <div className="text-xs font-medium text-text-brown">Dr. Amita Shukla</div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-yellow-200 shadow-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h4>
              <p className="text-yellow-700 mb-2">Important Information About Your Results</p>
              <div className="space-y-3 text-sm text-yellow-700">
                <p>
                  The results provided by this conception date calculator are mathematical estimates based on established medical formulas 
                  and should be used for educational and informational purposes only.
                </p>
                <p>
                  These calculations are not a substitute for professional medical advice, diagnosis, or treatment. 
                  Every individual and cycle is unique, and actual conception timing may vary significantly.
                </p>
                <p>
                  For personalized medical guidance, fertility planning, and professional healthcare advice, 
                  please schedule a consultation with Dr. Amita Shukla at SCT Trust Hospital in Lucknow.
                </p>
                <p>
                  If you have any concerns about fertility or conception planning, please contact your healthcare provider immediately.
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="font-medium text-yellow-800 mb-1">Professional Medical Consultation</p>
                <p className="text-yellow-700 mb-3">
                  Book an appointment with Dr. Amita Shukla at SCT Trust Hospital, Lucknow for comprehensive fertility guidance 
                  and personalized conception planning.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Schedule Consultation
                  <Calendar className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}