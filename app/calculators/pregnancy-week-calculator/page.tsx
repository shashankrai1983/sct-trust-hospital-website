'use client';

// Pregnancy Week Calculator Page - Linus-Style Implementation
// "Good taste: eliminate special cases through better data structures"
// Reuse existing patterns, change only the calculation logic

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Baby, Calculator, Calendar, Clock, Heart, Sparkles, ArrowLeft, AlertCircle, CheckCircle2, Share2, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import { isValid, isFuture, subMonths, format } from 'date-fns';
import { MilestoneBadge, DueDateMilestones, CalculatorAchievement } from '../components/MilestoneBadge';
import { useCalculatorAnimations } from '../hooks/useCalculatorAnimations';
import { calculatePregnancyWeek, getTrimesterInfo, getPregnancyMilestones } from '../utils/dateCalculations';

// Validation Schema - reuse the good parts
const pregnancyWeekCalculatorSchema = z.object({
  lmpDate: z.string()
    .min(1, 'Please enter a valid Last Menstrual Period date')
    .refine((dateString) => {
      const date = new Date(dateString);
      if (!isValid(date)) return false;
      
      const today = new Date();
      const maxPastDate = subMonths(today, 10);
      return date >= maxPastDate && !isFuture(date);
    }, {
      message: 'LMP date must be within the last 10 months and not in the future',
    }),
});

type PregnancyWeekCalculatorInput = z.infer<typeof pregnancyWeekCalculatorSchema>;

// Linus principle: "Most state is derived state"
interface PregnancyWeekState {
  isValid: boolean;
  data: {
    week: number;
    trimester: number;
    daysIntoWeek: number;
    remainingDays: number;
    milestones: string[];
    trimesterInfo: {
      name: string;
      description: string;
      weeks: string;
    };
  } | null;
  error: string | null;
}

const usePregnancyWeekCalculation = (lmpDateString: string): PregnancyWeekState => {
  if (!lmpDateString) {
    return { isValid: false, data: null, error: null };
  }

  try {
    const lmpDate = new Date(lmpDateString);
    const weekData = calculatePregnancyWeek(lmpDate);
    const trimesterInfo = getTrimesterInfo(weekData.trimester);
    
    return { 
      isValid: true, 
      data: {
        ...weekData,
        trimesterInfo
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

export default function PregnancyWeekCalculatorPage() {
  // Linus principle: "Most state is derived state"
  const [isCalculating, setIsCalculating] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid: formIsValid },
  } = useForm<PregnancyWeekCalculatorInput>({
    resolver: zodResolver(pregnancyWeekCalculatorSchema),
    mode: 'onChange',
  });

  const lmpDate = watch('lmpDate');
  
  // Pure calculation - no async nonsense for simple math
  const pregnancy = usePregnancyWeekCalculation(lmpDate);
  
  // Clean animation interface
  const animations = useCalculatorAnimations();

  // Linus: "If you need async for simple math, you're doing it wrong"
  const handleCalculation = (data: PregnancyWeekCalculatorInput) => {
    setIsCalculating(true);
    
    // Simulate processing for UX - but calculation is instant
    setTimeout(() => {
      if (pregnancy.data) {
        animations.triggerResults(pregnancy.data.week);
        setTimeout(() => {
          animations.triggerCelebration();
        }, 1000);
      }
      setIsCalculating(false);
    }, 800);
  };

  const showResults = pregnancy.isValid && pregnancy.data && !isCalculating;
  const showMilestones = showResults && pregnancy.data!.week > 0;

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
            <span className="text-text-brown">Pregnancy Week Calculator</span>
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
              <TrendingUp className="w-6 h-6 text-primary-green" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-brown">
              Pregnancy Week Calculator
            </h1>
          </div>
          <p className="text-text-brown/80 max-w-xl mx-auto">
            Track your current pregnancy week, trimester, and view weekly development milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div ref={animations.refs.calculator} className="bg-white rounded-xl shadow-lg p-6">
              {/* Calculator Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-brown mb-2">
                  Calculate Your Current Pregnancy Week
                </h2>
                <p className="text-text-brown/70 text-sm">
                  Enter your Last Menstrual Period (LMP) date to track your current pregnancy week and trimester progress.
                </p>
              </div>

              {/* Calculator Form */}
              <form onSubmit={handleSubmit(handleCalculation)} className="space-y-4">
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
                        ${errors.lmpDate ? 'border-red-500' : 'border-gray-300 hover:border-primary-green/40'}
                      `}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-green/60" />
                    
                    {errors.lmpDate && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                    )}
                    {!errors.lmpDate && lmpDate && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  
                  {!errors.lmpDate && (
                    <p className="text-xs text-text-brown/60">
                      Select the first day of your last menstrual period
                    </p>
                  )}
                  
                  {errors.lmpDate && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.lmpDate.message}
                    </p>
                  )}
                </div>

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
                        <TrendingUp className="w-4 h-4" />
                        Calculate Week
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
                      Your Pregnancy Progress
                    </h3>
                    <button className="text-primary-green hover:text-forest-green transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Week Display */}
                    <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-6 h-6 text-primary-green" />
                        <h4 className="font-semibold text-text-brown">Current Week</h4>
                      </div>
                      <p className="text-3xl font-bold text-primary-green mb-1">
                        Week {pregnancy.data.week}
                      </p>
                      <p className="text-sm text-text-brown/70 mb-2">
                        {pregnancy.data.daysIntoWeek} {pregnancy.data.daysIntoWeek === 1 ? 'day' : 'days'} into this week
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-green h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(pregnancy.data.daysIntoWeek / 7) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Trimester Info */}
                    <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Baby className="w-6 h-6 text-forest-green" />
                        <h4 className="font-semibold text-text-brown">Trimester Progress</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-text-brown/70">Current Trimester</p>
                          <p className="text-lg font-semibold text-forest-green">
                            {pregnancy.data.trimesterInfo.name}
                          </p>
                          <p className="text-xs text-text-brown/60">
                            {pregnancy.data.trimesterInfo.weeks}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-brown/60">Description</p>
                          <p className="text-sm text-text-brown">
                            {pregnancy.data.trimesterInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pregnancy Timeline */}
                  <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                    <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-green" />
                      Pregnancy Timeline
                    </h4>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-gradient-to-r from-primary-green to-forest-green h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${(pregnancy.data.week / 40) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-text-brown/60">
                        <span>0 weeks</span>
                        <span className="font-medium text-primary-green">Week {pregnancy.data.week}</span>
                        <span>40 weeks</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                        <div className={`p-2 rounded-lg ${pregnancy.data.trimester >= 1 ? 'bg-primary-green/10' : 'bg-gray-100'}`}>
                          <p className="text-xs font-medium">1st Trimester</p>
                          <p className="text-xs text-text-brown/60">Weeks 1-12</p>
                        </div>
                        <div className={`p-2 rounded-lg ${pregnancy.data.trimester >= 2 ? 'bg-forest-green/10' : 'bg-gray-100'}`}>
                          <p className="text-xs font-medium">2nd Trimester</p>
                          <p className="text-xs text-text-brown/60">Weeks 13-27</p>
                        </div>
                        <div className={`p-2 rounded-lg ${pregnancy.data.trimester >= 3 ? 'bg-primary-beige/20' : 'bg-gray-100'}`}>
                          <p className="text-xs font-medium">3rd Trimester</p>
                          <p className="text-xs text-text-brown/60">Weeks 28-40</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CalculatorAchievement 
                      type="accuracy" 
                      animated={showMilestones}
                      delay={0}
                    />
                    <CalculatorAchievement 
                      type="completion" 
                      animated={showMilestones}
                      delay={300}
                    />
                    <CalculatorAchievement 
                      type="guidance" 
                      animated={showMilestones}
                      delay={600}
                    />
                  </div>
                  
                  {/* This Week's Milestones */}
                  {showMilestones && pregnancy.data.milestones.length > 0 && (
                    <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
                      <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary-green" />
                        Week {pregnancy.data.week} Milestones
                      </h4>
                      <div className="space-y-2">
                        {pregnancy.data.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-primary-green mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-text-brown">{milestone}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Processing Progress Indicator - Linus: "Keep the UX, simplify the logic" */}
              {isCalculating && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-primary-green/20">
                    <Clock className="w-6 h-6 animate-spin text-primary-green" />
                    <span className="text-text-brown font-medium">Calculating your pregnancy progress...</span>
                  </div>
                </div>
              )}

              {/* Information Cards */}
              {!showResults && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-10 h-10 bg-primary-green/10 rounded-full p-2 text-primary-green" />
                      <h3 className="font-semibold text-text-brown">Week Tracking</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      Our pregnancy week calculator helps you track your exact gestational age and current trimester, 
                      providing weekly milestones and development information.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-10 h-10 bg-forest-green/10 rounded-full p-2 text-forest-green" />
                      <h3 className="font-semibold text-text-brown">Professional Guidance</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      Track your pregnancy journey with Dr. Amita Shukla at SCT Trust Hospital. 
                      Weekly monitoring ensures optimal care throughout your pregnancy.
                    </p>
                  </div>
                </div>
              )}

              {/* Educational Content */}
              <div className="mt-12 bg-white rounded-xl p-6 border border-primary-green/20">
                <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-green" />
                  Understanding Pregnancy Weeks
                </h3>
                <div className="prose prose-sm text-text-brown/80 max-w-none">
                  <p className="mb-4">
                    Pregnancy weeks are calculated from the first day of your last menstrual period (LMP), 
                    not from conception. This dating method is the medical standard used worldwide.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">Pregnancy Trimesters:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• First Trimester: Weeks 1-12</li>
                        <li>• Second Trimester: Weeks 13-27</li>
                        <li>• Third Trimester: Weeks 28-40+</li>
                        <li>• Full-term: 37-42 weeks</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">Weekly Monitoring with Dr. Amita:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Track baby's development milestones</li>
                        <li>• Monitor maternal health changes</li>
                        <li>• Schedule appropriate screenings</li>
                        <li>• Plan for upcoming trimester changes</li>
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
                Get personalized weekly monitoring from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.
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
                <Link href="/calculators/conception-date-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Conception Date Calculator</h4>
                  <p className="text-sm text-text-brown/70">Estimate when conception occurred</p>
                </Link>
                <Link href="/calculators/weight-gain-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Weight Gain Calculator</h4>
                  <p className="text-sm text-text-brown/70">Monitor healthy pregnancy weight gain</p>
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
            <Sparkles className="w-5 h-5 text-forest-green mx-auto mb-1" />
            <div className="text-xs font-medium text-text-brown">Professional Guidance</div>
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
                  The results provided by this pregnancy week calculator are mathematical estimates based on established medical formulas 
                  and should be used for educational and informational purposes only.
                </p>
                <p>
                  These calculations are not a substitute for professional medical advice, diagnosis, or treatment. 
                  Every pregnancy and individual is unique, and actual results may vary significantly.
                </p>
                <p>
                  For personalized medical guidance, accurate assessments, and professional healthcare advice, 
                  please schedule a consultation with Dr. Amita Shukla at SCT Trust Hospital in Lucknow.
                </p>
                <p>
                  If you have any concerns about your health or pregnancy, please contact your healthcare provider immediately.
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="font-medium text-yellow-800 mb-1">Professional Medical Consultation</p>
                <p className="text-yellow-700 mb-3">
                  Book an appointment with Dr. Amita Shukla at SCT Trust Hospital, Lucknow for comprehensive prenatal care 
                  and personalized weekly pregnancy monitoring.
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