'use client';

// Due Date Calculator Page - Linus-Style Simplification 
// "Good taste: eliminate special cases through better data structures"
// Fixed compilation errors

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Baby, Calculator, Calendar, Clock, Heart, Sparkles, ArrowLeft, AlertCircle, CheckCircle2, Share2, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { isValid, isFuture, subMonths, format } from 'date-fns';
import { MilestoneBadge, DueDateMilestones, CalculatorAchievement } from '../components/MilestoneBadge';
import { usePregnancyCalculation, useAnimationState } from '../hooks/usePregnancyCalculation';
import { useCalculatorAnimations } from '../hooks/useCalculatorAnimations';

// Validation Schema - keep the good parts
const dueDateCalculatorSchema = z.object({
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

type DueDateCalculatorInput = z.infer<typeof dueDateCalculatorSchema>;

export default function DueDateCalculatorPage() {
  // Linus principle: "Most state is derived state"
  const [isCalculating, setIsCalculating] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid: formIsValid },
  } = useForm<DueDateCalculatorInput>({
    resolver: zodResolver(dueDateCalculatorSchema),
    mode: 'onChange',
  });

  const lmpDate = watch('lmpDate');
  
  // Pure calculation - no async nonsense for simple math
  const pregnancy = usePregnancyCalculation(lmpDate);
  
  // Animation state derivation - no conditionals in render
  const animationState = useAnimationState(pregnancy.isValid && !!pregnancy.data, isCalculating);
  
  // Clean animation interface
  const animations = useCalculatorAnimations();

  // Linus: "If you need async for simple math, you're doing it wrong"
  const handleCalculation = (data: DueDateCalculatorInput) => {
    setIsCalculating(true);
    
    // Simulate processing for UX - but calculation is instant
    setTimeout(() => {
      if (pregnancy.data) {
        animations.triggerResults(pregnancy.data.currentWeek);
        // Removed baby visualization animation
        setTimeout(() => {
          animations.triggerCelebration();
        }, animationState.celebrationDelay);
      }
      setIsCalculating(false);
    }, 800);
  };

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
            <span className="text-text-brown">Due Date Calculator</span>
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
              <Baby className="w-6 h-6 text-primary-green" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-brown">
              Due Date Calculator
            </h1>
          </div>
          <p className="text-text-brown/80 max-w-xl mx-auto">
            Calculate your expected delivery date with medical precision using your Last Menstrual Period (LMP).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div ref={animations.refs.calculator} className="bg-white rounded-xl shadow-lg p-6">
              {/* Calculator Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-brown mb-2">
                  Calculate Your Expected Delivery Date
                </h2>
                <p className="text-text-brown/70 text-sm">
                  Enter your Last Menstrual Period (LMP) date to calculate your expected due date and current pregnancy progress.
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
                        <Calendar className="w-4 h-4" />
                        Calculate Due Date
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Results - Linus: "No special cases, just data transformation" */}
              {pregnancy.data && animationState.showResults && (
                <div ref={animations.refs.results} className="mt-8 space-y-6 relative">
                  {/* Particles Container */}
                  <div ref={animations.refs.particles} className="absolute inset-0 pointer-events-none z-10"></div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-brown flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary-green" />
                      Your Results
                    </h3>
                    <button className="text-primary-green hover:text-forest-green transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-6 h-6 text-primary-green" />
                        <h4 className="font-semibold text-text-brown">Expected Due Date</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary-green mb-1">
                        {format(pregnancy.data.dueDate, 'MMMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-text-brown/70">
                        {pregnancy.data.daysRemaining} days to go
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Baby className="w-6 h-6 text-forest-green" />
                        <h4 className="font-semibold text-text-brown">Current Progress</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-text-brown/70">Gestational Age</p>
                          <p className="text-lg font-semibold text-forest-green">
                            {pregnancy.data.currentWeek} weeks
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-text-brown/60">Trimester</p>
                            <p className="font-medium text-text-brown">{pregnancy.data.trimester}</p>
                            <p className="text-xs text-text-brown/60">
                              {pregnancy.data.trimester === 1 ? 'First Trimester' : 
                               pregnancy.data.trimester === 2 ? 'Second Trimester' : 'Third Trimester'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-text-brown/60">Conception</p>
                            <p className="text-sm font-medium text-text-brown">
                              {format(pregnancy.data.conceptionDate, 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Achievement Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CalculatorAchievement 
                      type="accuracy" 
                      animated={animationState.showMilestones}
                      delay={0}
                    />
                    <CalculatorAchievement 
                      type="completion" 
                      animated={animationState.showMilestones}
                      delay={300}
                    />
                    <CalculatorAchievement 
                      type="guidance" 
                      animated={animationState.showMilestones}
                      delay={600}
                    />
                  </div>
                  
                  {/* Pregnancy Milestones */}
                  {animationState.showMilestones && pregnancy.data.currentWeek > 0 && (
                    <div className="mt-8">
                      <DueDateMilestones 
                        week={pregnancy.data.currentWeek}
                        trimester={pregnancy.data.trimester}
                        animated={animationState.showMilestones}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Processing Progress Indicator - Linus: "Keep the UX, simplify the logic" */}
              {isCalculating && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-primary-green/20">
                    <Clock className="w-6 h-6 animate-spin text-primary-green" />
                    <span className="text-text-brown font-medium">Processing your pregnancy timeline...</span>
                  </div>
                </div>
              )}

              {/* Information Cards */}
              {!pregnancy.data && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-10 h-10 bg-primary-green/10 rounded-full p-2 text-primary-green" />
                      <h3 className="font-semibold text-text-brown">Medical Accuracy</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      Our due date calculator uses the standard medical formula of adding 280 days (40 weeks) to your Last Menstrual Period date, 
                      following guidelines used by healthcare professionals worldwide.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-forest-green/5 to-primary-beige/10 rounded-xl p-6 border border-forest-green/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-10 h-10 bg-forest-green/10 rounded-full p-2 text-forest-green" />
                      <h3 className="font-semibold text-text-brown">Personalized Care</h3>
                    </div>
                    <p className="text-sm text-text-brown/80 leading-relaxed">
                      While calculators provide estimates, every pregnancy is unique. Dr. Amita Shukla at SCT Trust Hospital provides 
                      personalized care to monitor your pregnancy journey with professional expertise.
                    </p>
                  </div>
                </div>
              )}

              {/* Educational Content */}
              <div className="mt-12 bg-white rounded-xl p-6 border border-primary-green/20">
                <h3 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-green" />
                  Understanding Your Due Date
                </h3>
                <div className="prose prose-sm text-text-brown/80 max-w-none">
                  <p className="mb-4">
                    Your due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period. 
                    This method, known as Naegele's Rule, is the standard used by healthcare providers worldwide.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">Important to Know:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Only 5% of babies are born on their exact due date</li>
                        <li>• Most babies are born within 2 weeks of the due date</li>
                        <li>• First pregnancies often go 1-2 days past the due date</li>
                        <li>• Ultrasound dating may adjust your initial calculation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-brown mb-2">When to Contact Dr. Amita:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• For your first prenatal appointment</li>
                        <li>• If you have irregular menstrual cycles</li>
                        <li>• For ultrasound dating confirmation</li>
                        <li>• To discuss your pregnancy timeline</li>
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
                Get personalized medical guidance from Dr. Amita Shukla at SCT Trust Hospital, Lucknow.
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
                <Link href="/calculators/pregnancy-week-calculator" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-text-brown">Pregnancy Week Calculator</h4>
                  <p className="text-sm text-text-brown/70">Track your current pregnancy week and trimester</p>
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
                  The results provided by this due date calculator are mathematical estimates based on established medical formulas 
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
                  and personalized medical guidance.
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