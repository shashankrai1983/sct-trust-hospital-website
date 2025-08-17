'use client';

// Water Intake Calculator - Base requirement + pregnancy factors
// Following Linus Torvalds methodology: simple lookup tables eliminate complexity

import React, { useState } from 'react';
import { Droplets, Target, Trophy, Users, Flame, Heart, Zap, Calendar } from 'lucide-react';
import CalculatorTemplate from '../components/CalculatorTemplate';
import {
  ForestNumberInput,
  ForestSelect,
  ForestButton,
  ForestFormGroup,
} from '../components/ForestThemeInputs';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from '../components/animations/ForestAnimations';

// Core data structures - eliminate conditionals
interface WaterInputs {
  weight: number | '';
  pregnancyStatus: 'not_pregnant' | 'trimester_1' | 'trimester_2' | 'trimester_3';
  breastfeedingStatus: 'no' | 'yes';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
  climate: 'cool' | 'moderate' | 'hot' | 'very_hot';
}

interface WaterResult {
  baseRequirement: number;
  pregnancyExtra: number;
  breastfeedingExtra: number;
  activityExtra: number;
  climateExtra: number;
  totalIntake: number;
  glassesPerDay: number;
  gamificationData: {
    level: number;
    title: string;
    streak: number;
    achievements: string[];
    nextGoal: string;
    badge: string;
  };
  hydrationSchedule: {
    time: string;
    glasses: number;
    reminder: string;
  }[];
  benefits: string[];
  reminders: string[];
}

// Base water requirement - 35ml per kg body weight (medical standard)
const BASE_ML_PER_KG = 35;

// Activity level water additions - simple lookup
const ACTIVITY_WATER_ADDITION = {
  sedentary: 0,
  light: 350,      // Light exercise
  moderate: 500,   // Moderate exercise
  very_active: 750, // Intense exercise
  extra_active: 1000 // Very intense/long exercise
};

// Climate water additions
const CLIMATE_WATER_ADDITION = {
  cool: 0,
  moderate: 200,
  hot: 400,
  very_hot: 600
};

// Pregnancy water additions per trimester
const PREGNANCY_WATER_ADDITION = {
  not_pregnant: 0,
  trimester_1: 300,   // First trimester
  trimester_2: 500,   // Second trimester  
  trimester_3: 700    // Third trimester
};

const BREASTFEEDING_WATER_ADDITION = 1000; // Extra 1L for breastfeeding

// Hydration Hero levels - gamification system
const HYDRATION_HERO_LEVELS = [
  { level: 1, title: 'Hydration Newbie', streakRequired: 0, badge: '💧' },
  { level: 2, title: 'Water Warrior', streakRequired: 3, badge: '🌊' },
  { level: 3, title: 'Aqua Angel', streakRequired: 7, badge: '✨' },
  { level: 4, title: 'Hydration Hero', streakRequired: 14, badge: '🏆' },
  { level: 5, title: 'H2O Master', streakRequired: 30, badge: '👑' },
];

// Hydration schedule template
const HYDRATION_SCHEDULE_TEMPLATE = [
  { time: '7:00 AM', portion: 0.15, reminder: 'Start your day with hydration!' },
  { time: '9:00 AM', portion: 0.10, reminder: 'Mid-morning hydration boost' },
  { time: '12:00 PM', portion: 0.15, reminder: 'Lunch time hydration' },
  { time: '3:00 PM', portion: 0.15, reminder: 'Afternoon energy drink' },
  { time: '6:00 PM', portion: 0.15, reminder: 'Evening hydration check' },
  { time: '8:00 PM', portion: 0.10, reminder: 'Wind down with water' },
  { time: '10:00 PM', portion: 0.20, reminder: 'Night hydration (stop 2hrs before sleep)' }
];

// Health benefits based on water intake
const HYDRATION_BENEFITS = [
  'Maintains healthy blood pressure during pregnancy',
  'Supports baby\'s development and amniotic fluid levels',
  'Prevents pregnancy constipation and UTIs',
  'Improves energy levels and reduces fatigue',
  'Supports healthy skin and reduces pregnancy acne',
  'Aids in nutrient transport to baby',
  'Helps regulate body temperature',
  'Supports kidney function and waste elimination',
  'Reduces morning sickness and nausea',
  'Improves milk production during breastfeeding'
];

// Calculate total water requirement
const calculateWaterIntake = (inputs: WaterInputs): WaterResult => {
  const weight = inputs.weight as number;
  
  // Base requirement: 35ml per kg
  const baseRequirement = weight * BASE_ML_PER_KG;
  
  // Add extras based on conditions
  const pregnancyExtra = PREGNANCY_WATER_ADDITION[inputs.pregnancyStatus];
  const breastfeedingExtra = inputs.breastfeedingStatus === 'yes' ? BREASTFEEDING_WATER_ADDITION : 0;
  const activityExtra = ACTIVITY_WATER_ADDITION[inputs.activityLevel];
  const climateExtra = CLIMATE_WATER_ADDITION[inputs.climate];
  
  const totalIntake = baseRequirement + pregnancyExtra + breastfeedingExtra + activityExtra + climateExtra;
  const glassesPerDay = Math.round(totalIntake / 250); // 250ml per glass
  
  // Calculate gamification data (simulate streak)
  const currentStreak = Math.floor(Math.random() * 20) + 1; // Simulate streak
  const currentLevel = HYDRATION_HERO_LEVELS.find((level, index) => 
    currentStreak >= level.streakRequired && 
    (HYDRATION_HERO_LEVELS[index + 1]?.streakRequired > currentStreak || !HYDRATION_HERO_LEVELS[index + 1])
  ) || HYDRATION_HERO_LEVELS[0];
  
  const nextLevel = HYDRATION_HERO_LEVELS[HYDRATION_HERO_LEVELS.indexOf(currentLevel) + 1];
  
  const achievements = [];
  if (currentStreak >= 3) achievements.push('3-Day Streak Champion 🔥');
  if (currentStreak >= 7) achievements.push('Week-Long Warrior 💪');
  if (inputs.pregnancyStatus !== 'not_pregnant') achievements.push('Pregnancy Hydration Star ⭐');
  if (inputs.breastfeedingStatus === 'yes') achievements.push('Breastfeeding Hero 🍼');
  if (currentStreak >= 14) achievements.push('Two-Week Titan 🏅');
  
  // Generate hydration schedule
  const hydrationSchedule = HYDRATION_SCHEDULE_TEMPLATE.map(slot => ({
    time: slot.time,
    glasses: Math.round((totalIntake * slot.portion) / 250),
    reminder: slot.reminder
  }));
  
  // Select relevant benefits
  const benefits = HYDRATION_BENEFITS.slice(0, 5);
  
  // Generate reminders based on status
  const reminders = [];
  if (inputs.pregnancyStatus !== 'not_pregnant') {
    reminders.push('Extra hydration supports your baby\'s healthy development');
    reminders.push('Proper hydration reduces pregnancy complications');
  }
  if (inputs.breastfeedingStatus === 'yes') {
    reminders.push('Stay hydrated to maintain healthy milk production');
  }
  if (inputs.activityLevel === 'very_active' || inputs.activityLevel === 'extra_active') {
    reminders.push('Intense exercise requires extra hydration for recovery');
  }
  reminders.push('Set phone reminders to drink water every 2 hours');
  reminders.push('Carry a water bottle to track your daily intake');
  
  return {
    baseRequirement: Math.round(baseRequirement),
    pregnancyExtra,
    breastfeedingExtra,
    activityExtra,
    climateExtra,
    totalIntake: Math.round(totalIntake),
    glassesPerDay,
    gamificationData: {
      level: currentLevel.level,
      title: currentLevel.title,
      streak: currentStreak,
      achievements,
      nextGoal: nextLevel ? `Reach ${nextLevel.streakRequired} day streak for ${nextLevel.title}` : 'Maximum level achieved!',
      badge: currentLevel.badge
    },
    hydrationSchedule,
    benefits,
    reminders
  };
};

// Simple validation
const validateInputs = (inputs: WaterInputs): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!inputs.weight || inputs.weight < 30 || inputs.weight > 200) {
    errors.weight = 'Weight must be between 30-200 kg';
  }
  
  return errors;
};

export default function WaterIntakeCalculatorPage() {
  const [inputs, setInputs] = useState<WaterInputs>({
    weight: '',
    pregnancyStatus: 'not_pregnant',
    breastfeedingStatus: 'no',
    activityLevel: 'moderate',
    climate: 'moderate',
  });
  
  const [result, setResult] = useState<WaterResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof WaterInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalculate = async () => {
    const validationErrors = validateInputs(inputs);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsCalculating(true);
    setErrors({});
    
    setTimeout(() => {
      const calculationResult = calculateWaterIntake(inputs);
      setResult(calculationResult);
      setIsCalculating(false);
      
      setTimeout(() => {
        const resultElement = document.querySelector('.result-display');
        if (resultElement) {
          presets.resultsReveal(resultElement as HTMLElement);
        }
      }, 100);
    }, 600);
  };

  const handleReset = () => {
    setInputs({
      weight: '',
      pregnancyStatus: 'not_pregnant',
      breastfeedingStatus: 'no',
      activityLevel: 'moderate',
      climate: 'moderate',
    });
    setResult(null);
    setErrors({});
  };

  return (
    <CalculatorTemplate
      title="Water Intake Calculator"
      description="Calculate your daily water requirements based on weight, pregnancy status, activity level, and climate. Track your hydration with the Hydration Hero streak system."
      relatedCalculators={[
        {
          title: 'Calorie Needs Calculator',
          href: '/calculators/calorie-needs-calculator',
          description: 'Calculate daily calorie requirements',
        },
        {
          title: 'BMI Calculator',
          href: '/calculators/bmi-calculator',
          description: 'Check your body mass index',
        },
        {
          title: 'Prenatal Vitamin Calculator',
          href: '/calculators/prenatal-vitamin-calculator',
          description: 'Get vitamin recommendations',
        },
      ]}
    >
      <div className="space-y-8">
        {/* Input Form */}
        <div>
          <h2 className={calculatorTheme.classes.subtitle}>
            <Droplets className="w-5 h-5 inline-block mr-2 text-primary-green" />
            Personal Information
          </h2>
          
          <ForestFormGroup>
            <ForestNumberInput
              label="Weight"
              value={inputs.weight}
              onChange={(value) => handleInputChange('weight', value)}
              unit="kg"
              min={30}
              max={200}
              step={0.5}
              placeholder="Current weight"
              error={errors.weight}
              required
              helpText="Your current weight in kilograms"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestSelect
                label="Pregnancy Status"
                value={inputs.pregnancyStatus}
                onChange={(value) => handleInputChange('pregnancyStatus', value)}
                options={[
                  { value: 'not_pregnant', label: 'Not pregnant' },
                  { value: 'trimester_1', label: 'First trimester (0-13 weeks)' },
                  { value: 'trimester_2', label: 'Second trimester (14-27 weeks)' },
                  { value: 'trimester_3', label: 'Third trimester (28+ weeks)' },
                ]}
                required
                helpText="Current pregnancy status"
              />
              
              <ForestSelect
                label="Breastfeeding"
                value={inputs.breastfeedingStatus}
                onChange={(value) => handleInputChange('breastfeedingStatus', value)}
                options={[
                  { value: 'no', label: 'Not breastfeeding' },
                  { value: 'yes', label: 'Currently breastfeeding' },
                ]}
                required
                helpText="Current breastfeeding status"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestSelect
                label="Activity Level"
                value={inputs.activityLevel}
                onChange={(value) => handleInputChange('activityLevel', value)}
                options={[
                  { value: 'sedentary', label: 'Sedentary (desk job, no exercise)' },
                  { value: 'light', label: 'Light activity (light exercise 1-3 days/week)' },
                  { value: 'moderate', label: 'Moderate activity (exercise 3-5 days/week)' },
                  { value: 'very_active', label: 'Very active (intense exercise 6-7 days/week)' },
                  { value: 'extra_active', label: 'Extra active (very intense exercise)' },
                ]}
                required
                helpText="Your typical daily activity level"
              />
              
              <ForestSelect
                label="Climate/Environment"
                value={inputs.climate}
                onChange={(value) => handleInputChange('climate', value)}
                options={[
                  { value: 'cool', label: 'Cool (Below 20°C)' },
                  { value: 'moderate', label: 'Moderate (20-30°C)' },
                  { value: 'hot', label: 'Hot (30-40°C)' },
                  { value: 'very_hot', label: 'Very hot (Above 40°C)' },
                ]}
                required
                helpText="Your current climate or environment"
              />
            </div>
          </ForestFormGroup>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ForestButton
            onClick={handleCalculate}
            loading={isCalculating}
            disabled={isCalculating}
            className="flex-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Droplets className="w-5 h-5" />
              <span>{isCalculating ? 'Calculating...' : 'Calculate Water Needs'}</span>
            </div>
          </ForestButton>
          
          <ForestButton
            onClick={handleReset}
            variant="outline"
            disabled={isCalculating}
          >
            Reset
          </ForestButton>
        </div>

        {/* Results */}
        {result && (
          <div className="result-display space-y-6" style={{ opacity: 0 }}>
            {/* Gamification Header */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-brown flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-blue-500" />
                    {result.gamificationData.title}
                  </h3>
                  <p className="text-text-brown/70">Level {result.gamificationData.level} • {result.gamificationData.streak} day streak</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-1">{result.gamificationData.badge}</div>
                  <p className="text-sm text-text-brown/60 flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Hydration Hero
                  </p>
                </div>
              </div>
              
              {result.gamificationData.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-brown mb-2">Achievements:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.gamificationData.achievements.map((achievement, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-text-brown/80">
                <Target className="w-4 h-4 inline mr-1" />
                Next Goal: {result.gamificationData.nextGoal}
              </p>
            </div>

            {/* Water Intake Summary */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <h3 className={calculatorTheme.classes.subtitle}>Daily Water Requirements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-text-brown/60">Total Daily Intake</p>
                  <p className="text-3xl font-bold text-blue-600">{result.totalIntake}</p>
                  <p className="text-xs text-text-brown/60">ml per day</p>
                </div>
                
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <p className="text-sm text-text-brown/60">Glasses per Day</p>
                  <p className="text-3xl font-bold text-cyan-600">{result.glassesPerDay}</p>
                  <p className="text-xs text-text-brown/60">250ml glasses</p>
                </div>
                
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-text-brown/60">Base Requirement</p>
                  <p className="text-xl font-bold text-teal-600">{result.baseRequirement}</p>
                  <p className="text-xs text-text-brown/60">ml (35ml/kg)</p>
                </div>
              </div>

              {/* Water Addition Breakdown */}
              {(result.pregnancyExtra > 0 || result.breastfeedingExtra > 0 || result.activityExtra > 0 || result.climateExtra > 0) && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-text-brown mb-3">Additional Water Requirements:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {result.pregnancyExtra > 0 && (
                      <div className="text-center">
                        <p className="text-pink-600 font-medium">+{result.pregnancyExtra}ml</p>
                        <p className="text-text-brown/60">Pregnancy</p>
                      </div>
                    )}
                    {result.breastfeedingExtra > 0 && (
                      <div className="text-center">
                        <p className="text-purple-600 font-medium">+{result.breastfeedingExtra}ml</p>
                        <p className="text-text-brown/60">Breastfeeding</p>
                      </div>
                    )}
                    {result.activityExtra > 0 && (
                      <div className="text-center">
                        <p className="text-orange-600 font-medium">+{result.activityExtra}ml</p>
                        <p className="text-text-brown/60">Activity</p>
                      </div>
                    )}
                    {result.climateExtra > 0 && (
                      <div className="text-center">
                        <p className="text-red-600 font-medium">+{result.climateExtra}ml</p>
                        <p className="text-text-brown/60">Climate</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Hydration Schedule */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <h3 className={calculatorTheme.classes.subtitle}>
                <Calendar className="w-5 h-5 inline-block mr-2 text-primary-green" />
                Recommended Hydration Schedule
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {result.hydrationSchedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-text-brown">{slot.time}</p>
                      <p className="text-sm text-text-brown/60">{slot.reminder}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{slot.glasses}</p>
                      <p className="text-xs text-text-brown/60">glasses</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Benefits */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary-green" />
                Hydration Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-text-brown/80">
                    <Zap className="w-4 h-4 text-primary-green mt-0.5 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Caring Reminders */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Caring Hydration Reminders
              </h4>
              <div className="space-y-2">
                {result.reminders.map((reminder, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-text-brown/80">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {reminder}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Challenge CTA */}
            <div className="bg-gradient-to-r from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-green mx-auto mb-3" />
                <h4 className="font-semibold text-text-brown mb-2">Start a Hydration Challenge</h4>
                <p className="text-sm text-text-brown/80 mb-4">
                  Challenge friends and family to maintain healthy hydration habits together. 
                  Share your daily streak and motivate each other to stay hydrated!
                </p>
                <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-forest-green transition-colors">
                  Start Challenge
                </button>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Medical Disclaimer:</strong> This calculator provides general hydration guidelines. 
                Individual needs may vary based on health conditions, medications, and other factors. 
                Consult Dr. Amita Shukla for personalized hydration advice, especially during pregnancy and breastfeeding.
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}