'use client';

// Calorie Needs Calculator - Harris-Benedict + Pregnancy Factors
// Following Linus Torvalds methodology: eliminate complexity through simple data structures

import React, { useState } from 'react';
import { Calculator, Target, Trophy, Users, Sparkles, Utensils } from 'lucide-react';
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
interface CalorieInputs {
  age: number | '';
  weight: number | '';
  height: number | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
  pregnancyStatus: 'not_pregnant' | 'trimester_1' | 'trimester_2' | 'trimester_3';
  breastfeedingStatus: 'no' | 'yes';
}

interface CalorieResult {
  bmr: number;
  dailyCalories: number;
  pregnancyExtra: number;
  breastfeedingExtra: number;
  totalCalories: number;
  gamificationData: {
    level: number;
    title: string;
    points: number;
    achievements: string[];
    nextGoal: string;
  };
  mealPlan: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
  lucknowFoods: {
    category: string;
    foods: string[];
    calories: string;
  }[];
}

// Activity multipliers - Harris-Benedict formula
const ACTIVITY_MULTIPLIERS = {
  sedentary: { value: 1.2, label: 'Sedentary (desk job, no exercise)' },
  light: { value: 1.375, label: 'Light activity (light exercise 1-3 days/week)' },
  moderate: { value: 1.55, label: 'Moderate activity (moderate exercise 3-5 days/week)' },
  very_active: { value: 1.725, label: 'Very active (hard exercise 6-7 days/week)' },
  extra_active: { value: 1.9, label: 'Extra active (very hard exercise, physical job)' }
};

// Pregnancy calorie additions - evidence-based
const PREGNANCY_CALORIES = {
  not_pregnant: 0,
  trimester_1: 0,     // No additional calories needed
  trimester_2: 340,   // Second trimester
  trimester_3: 450    // Third trimester
};

const BREASTFEEDING_CALORIES = 500; // Additional calories for breastfeeding

// Gamification levels - Yu-Kai Chou Framework
const ENERGY_EXPERT_LEVELS = [
  { level: 1, title: 'Energy Newbie', pointsRequired: 0, badge: '🌱' },
  { level: 2, title: 'Calorie Counter', pointsRequired: 100, badge: '🧮' },
  { level: 3, title: 'Nutrition Navigator', pointsRequired: 300, badge: '🧭' },
  { level: 4, title: 'Energy Expert', pointsRequired: 600, badge: '⚡' },
  { level: 5, title: 'Traditional Food Master', pointsRequired: 1000, badge: '👑' },
];

// Lucknow traditional foods database
const LUCKNOW_TRADITIONAL_FOODS = [
  {
    category: 'Breakfast (25% of calories)',
    foods: ['Poha with vegetables', 'Paratha with curd', 'Upma with curry leaves', 'Idli-sambhar'],
    calories: 'Rich in carbs for morning energy'
  },
  {
    category: 'Lunch (35% of calories)',
    foods: ['Dal-chawal with sabzi', 'Roti with paneer curry', 'Biryani (small portion)', 'Khichdi with ghee'],
    calories: 'Balanced proteins and carbs'
  },
  {
    category: 'Dinner (30% of calories)',
    foods: ['Light roti with dal', 'Vegetable curry with rice', 'Soup with bread', 'Kheer (small bowl)'],
    calories: 'Lighter, easier to digest'
  },
  {
    category: 'Snacks (10% of calories)',
    foods: ['Roasted chana', 'Seasonal fruits', 'Lassi', 'Dry fruits mix'],
    calories: 'Healthy energy boosters'
  }
];

// Calculate BMR using Harris-Benedict equation
const calculateBMR = (age: number, weight: number, height: number): number => {
  // Women: BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
};

// Calculate gamification data
const calculateGamificationData = (inputs: CalorieInputs, assessments: number = 1) => {
  const basePoints = assessments * 75;
  const pregnancyBonus = inputs.pregnancyStatus !== 'not_pregnant' ? 50 : 0;
  const breastfeedingBonus = inputs.breastfeedingStatus === 'yes' ? 50 : 0;
  const totalPoints = basePoints + pregnancyBonus + breastfeedingBonus;
  
  const currentLevel = ENERGY_EXPERT_LEVELS.find((level, index) => 
    totalPoints >= level.pointsRequired && 
    (ENERGY_EXPERT_LEVELS[index + 1]?.pointsRequired > totalPoints || !ENERGY_EXPERT_LEVELS[index + 1])
  ) || ENERGY_EXPERT_LEVELS[0];
  
  const nextLevel = ENERGY_EXPERT_LEVELS[ENERGY_EXPERT_LEVELS.indexOf(currentLevel) + 1];
  
  const achievements = [];
  if (totalPoints >= 100) achievements.push('First Calorie Assessment 🎯');
  if (inputs.pregnancyStatus !== 'not_pregnant') achievements.push('Pregnancy Nutrition Tracker 🤱');
  if (inputs.breastfeedingStatus === 'yes') achievements.push('Breastfeeding Energy Expert 🍼');
  if (totalPoints >= 600) achievements.push('Traditional Food Lover 🥘');
  
  return {
    level: currentLevel.level,
    title: currentLevel.title,
    points: totalPoints,
    achievements,
    nextGoal: nextLevel ? `Reach ${nextLevel.pointsRequired} points for ${nextLevel.title}` : 'Max level achieved!',
  };
};

// Main calculation function
const calculateCalorieNeeds = (inputs: CalorieInputs): CalorieResult => {
  const { age, weight, height, activityLevel, pregnancyStatus, breastfeedingStatus } = inputs;
  
  const bmr = calculateBMR(age as number, weight as number, height as number);
  const dailyCalories = bmr * ACTIVITY_MULTIPLIERS[activityLevel].value;
  const pregnancyExtra = PREGNANCY_CALORIES[pregnancyStatus];
  const breastfeedingExtra = breastfeedingStatus === 'yes' ? BREASTFEEDING_CALORIES : 0;
  const totalCalories = dailyCalories + pregnancyExtra + breastfeedingExtra;
  
  // Meal distribution - Indian eating pattern
  const mealPlan = {
    breakfast: Math.round(totalCalories * 0.25),
    lunch: Math.round(totalCalories * 0.35),
    dinner: Math.round(totalCalories * 0.30),
    snacks: Math.round(totalCalories * 0.10),
  };
  
  const gamificationData = calculateGamificationData(inputs);
  
  return {
    bmr: Math.round(bmr),
    dailyCalories: Math.round(dailyCalories),
    pregnancyExtra,
    breastfeedingExtra,
    totalCalories: Math.round(totalCalories),
    gamificationData,
    mealPlan,
    lucknowFoods: LUCKNOW_TRADITIONAL_FOODS,
  };
};

// Simple validation
const validateInputs = (inputs: CalorieInputs): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!inputs.age || inputs.age < 15 || inputs.age > 65) {
    errors.age = 'Age must be between 15-65 years';
  }
  
  if (!inputs.weight || inputs.weight < 30 || inputs.weight > 200) {
    errors.weight = 'Weight must be between 30-200 kg';
  }
  
  if (!inputs.height || inputs.height < 130 || inputs.height > 220) {
    errors.height = 'Height must be between 130-220 cm';
  }
  
  return errors;
};

export default function CalorieNeedsCalculatorPage() {
  const [inputs, setInputs] = useState<CalorieInputs>({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    pregnancyStatus: 'not_pregnant',
    breastfeedingStatus: 'no',
  });
  
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof CalorieInputs, value: any) => {
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
      const calculationResult = calculateCalorieNeeds(inputs);
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
      age: '',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      pregnancyStatus: 'not_pregnant',
      breastfeedingStatus: 'no',
    });
    setResult(null);
    setErrors({});
  };

  return (
    <CalculatorTemplate
      title="Calorie Needs Calculator"
      description="Calculate your daily calorie requirements using the Harris-Benedict equation with pregnancy and breastfeeding factors. Get personalized meal plans with traditional Lucknow foods."
      relatedCalculators={[
        {
          title: 'BMI Calculator',
          href: '/calculators/bmi-calculator',
          description: 'Check your body mass index',
        },
        {
          title: 'Weight Gain Calculator',
          href: '/calculators/weight-gain-calculator',
          description: 'Track healthy pregnancy weight gain',
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
            <Calculator className="w-5 h-5 inline-block mr-2 text-primary-green" />
            Personal Information
          </h2>
          
          <ForestFormGroup>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ForestNumberInput
                label="Age"
                value={inputs.age}
                onChange={(value) => handleInputChange('age', value)}
                unit="years"
                min={15}
                max={65}
                step={1}
                placeholder="Your age"
                error={errors.age}
                required
                helpText="Your current age"
              />
              
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
                helpText="Your current weight"
              />
              
              <ForestNumberInput
                label="Height"
                value={inputs.height}
                onChange={(value) => handleInputChange('height', value)}
                unit="cm"
                min={130}
                max={220}
                step={1}
                placeholder="Your height"
                error={errors.height}
                required
                helpText="Your height in centimeters"
              />
            </div>
            
            <ForestSelect
              label="Activity Level"
              value={inputs.activityLevel}
              onChange={(value) => handleInputChange('activityLevel', value)}
              options={Object.entries(ACTIVITY_MULTIPLIERS).map(([key, data]) => ({
                value: key,
                label: data.label,
              }))}
              required
              helpText="Choose your typical daily activity level"
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
              <Calculator className="w-5 h-5" />
              <span>{isCalculating ? 'Calculating...' : 'Calculate Calorie Needs'}</span>
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
            <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-6 border border-primary-green/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-brown flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    {result.gamificationData.title}
                  </h3>
                  <p className="text-text-brown/70">Level {result.gamificationData.level} • {result.gamificationData.points} points</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">{ENERGY_EXPERT_LEVELS[result.gamificationData.level - 1]?.badge}</div>
                  <p className="text-sm text-text-brown/60">Energy Expert</p>
                </div>
              </div>
              
              {result.gamificationData.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-brown mb-2">Achievements:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.gamificationData.achievements.map((achievement, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-primary-green">
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

            {/* Calorie Breakdown */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <h3 className={calculatorTheme.classes.subtitle}>Daily Calorie Requirements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-4 bg-primary-green/5 rounded-lg">
                  <p className="text-sm text-text-brown/60">Base Metabolic Rate</p>
                  <p className="text-2xl font-bold text-primary-green">{result.bmr}</p>
                  <p className="text-xs text-text-brown/60">calories</p>
                </div>
                
                <div className="text-center p-4 bg-forest-green/5 rounded-lg">
                  <p className="text-sm text-text-brown/60">With Activity</p>
                  <p className="text-2xl font-bold text-forest-green">{result.dailyCalories}</p>
                  <p className="text-xs text-text-brown/60">calories</p>
                </div>
                
                {(result.pregnancyExtra > 0 || result.breastfeedingExtra > 0) && (
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-text-brown/60">Extra Needs</p>
                    <p className="text-2xl font-bold text-orange-600">
                      +{result.pregnancyExtra + result.breastfeedingExtra}
                    </p>
                    <p className="text-xs text-text-brown/60">calories</p>
                  </div>
                )}
                
                <div className="text-center p-4 bg-gradient-to-r from-primary-green to-forest-green text-white rounded-lg">
                  <p className="text-sm opacity-90">Total Daily Goal</p>
                  <p className="text-2xl font-bold">{result.totalCalories}</p>
                  <p className="text-xs opacity-90">calories</p>
                </div>
              </div>
            </div>

            {/* Meal Plan */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <h3 className={calculatorTheme.classes.subtitle}>
                <Utensils className="w-5 h-5 inline-block mr-2 text-primary-green" />
                Daily Meal Distribution
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Breakfast</p>
                  <p className="text-xl font-bold text-yellow-600">{result.mealPlan.breakfast}</p>
                  <p className="text-xs text-yellow-600">25% of total</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">Lunch</p>
                  <p className="text-xl font-bold text-orange-600">{result.mealPlan.lunch}</p>
                  <p className="text-xs text-orange-600">35% of total</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Dinner</p>
                  <p className="text-xl font-bold text-blue-600">{result.mealPlan.dinner}</p>
                  <p className="text-xs text-blue-600">30% of total</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Snacks</p>
                  <p className="text-xl font-bold text-green-600">{result.mealPlan.snacks}</p>
                  <p className="text-xs text-green-600">10% of total</p>
                </div>
              </div>
            </div>

            {/* Lucknow Traditional Foods */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Traditional Lucknow Meal Ideas
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.lucknowFoods.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-text-brown mb-2">{category.category}</h5>
                    <p className="text-sm text-forest-green font-medium mb-2">{category.calories}</p>
                    <p className="text-sm text-text-brown/80">{category.foods.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Sharing CTA */}
            <div className="bg-gradient-to-r from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-green mx-auto mb-3" />
                <h4 className="font-semibold text-text-brown mb-2">Share Your Healthy Meal Plan</h4>
                <p className="text-sm text-text-brown/80 mb-4">
                  Connect with other health-conscious women in Lucknow and share traditional healthy recipes
                </p>
                <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-forest-green transition-colors">
                  Join Community
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Medical Disclaimer:</strong> This calculator provides estimates based on general formulas. 
                Individual caloric needs may vary. Consult Dr. Amita Shukla for personalized nutrition guidance, 
                especially during pregnancy and breastfeeding.
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}