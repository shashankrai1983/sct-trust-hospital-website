'use client';

// Weight Gain Calculator - Pregnancy Weight Gain Tracking
// Following Linus Torvalds methodology: simplicity, good taste, pragmatic solutions

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { Scale, TrendingUp, Heart, AlertTriangle } from 'lucide-react';
import CalculatorTemplate from '../components/CalculatorTemplate';
import {
  ForestNumberInput,
  ForestButton,
  ForestFormGroup,
} from '../components/ForestThemeInputs';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from '../components/animations/ForestAnimations';

// Types
interface WeightGainInputs {
  prePregnancyWeight: number | '';
  height: number | '';
  currentWeight: number | '';
  pregnancyWeek: number | '';
}

interface WeightGainResult {
  bmi: number;
  bmiCategory: string;
  recommendedTotalGain: { min: number; max: number };
  currentGain: number;
  remainingGain: { min: number; max: number };
  weeklyTarget: number;
  status: 'below' | 'normal' | 'above';
  statusMessage: string;
  recommendations: string[];
}

interface ValidationErrors {
  prePregnancyWeight?: string;
  height?: string;
  currentWeight?: string;
  pregnancyWeek?: string;
}

// BMI Categories and Weight Gain Recommendations (IOM Guidelines)
const getWeightGainRecommendations = (bmi: number): { min: number; max: number; category: string } => {
  if (bmi < 18.5) {
    return { min: 12.5, max: 18, category: 'Underweight' };
  } else if (bmi >= 18.5 && bmi < 25) {
    return { min: 11.5, max: 16, category: 'Normal weight' };
  } else if (bmi >= 25 && bmi < 30) {
    return { min: 7, max: 11.5, category: 'Overweight' };
  } else {
    return { min: 5, max: 9, category: 'Obese' };
  }
};

// Calculate BMI
const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Validate inputs following Linus principle: simple, clear validation
const validateInputs = (inputs: WeightGainInputs): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!inputs.prePregnancyWeight || inputs.prePregnancyWeight <= 0) {
    errors.prePregnancyWeight = 'Pre-pregnancy weight is required and must be positive';
  } else if (inputs.prePregnancyWeight < 30 || inputs.prePregnancyWeight > 200) {
    errors.prePregnancyWeight = 'Weight must be between 30-200 kg';
  }

  if (!inputs.height || inputs.height <= 0) {
    errors.height = 'Height is required and must be positive';
  } else if (inputs.height < 120 || inputs.height > 220) {
    errors.height = 'Height must be between 120-220 cm';
  }

  if (!inputs.currentWeight || inputs.currentWeight <= 0) {
    errors.currentWeight = 'Current weight is required and must be positive';
  } else if (inputs.currentWeight < 30 || inputs.currentWeight > 250) {
    errors.currentWeight = 'Weight must be between 30-250 kg';
  }

  if (!inputs.pregnancyWeek || inputs.pregnancyWeek <= 0) {
    errors.pregnancyWeek = 'Pregnancy week is required and must be positive';
  } else if (inputs.pregnancyWeek < 4 || inputs.pregnancyWeek > 42) {
    errors.pregnancyWeek = 'Pregnancy week must be between 4-42 weeks';
  }

  // Additional validation: current weight should be reasonable compared to pre-pregnancy
  if (inputs.prePregnancyWeight && inputs.currentWeight && inputs.pregnancyWeek) {
    const weightDifference = Number(inputs.currentWeight) - Number(inputs.prePregnancyWeight);
    if (weightDifference < -10) {
      errors.currentWeight = 'Current weight seems too low compared to pre-pregnancy weight';
    } else if (weightDifference > 30) {
      errors.currentWeight = 'Current weight seems too high. Please verify';
    }
  }

  return errors;
};

// Calculate weight gain status and recommendations
const calculateWeightGain = (inputs: WeightGainInputs): WeightGainResult => {
  const { prePregnancyWeight, height, currentWeight, pregnancyWeek } = inputs;
  
  const bmi = calculateBMI(Number(prePregnancyWeight), Number(height));
  const recommendations = getWeightGainRecommendations(bmi);
  const currentGain = Number(currentWeight) - Number(prePregnancyWeight);
  
  // Expected gain by week (rough approximation)
  // First trimester: 1-4.5 lbs total, Second/Third: 1-2 lbs per week based on BMI
  const week = Number(pregnancyWeek);
  let expectedGain = 0;
  
  if (week <= 13) {
    // First trimester: minimal gain
    expectedGain = Math.min(2, recommendations.max * 0.1);
  } else {
    // After first trimester
    const weeksAfter13 = week - 13;
    const weeklyRate = recommendations.max / 27; // Distribute over remaining weeks
    expectedGain = 2 + (weeksAfter13 * weeklyRate);
  }
  
  const remainingWeeks = Math.max(0, 40 - week);
  const remainingGainMin = Math.max(0, recommendations.min - currentGain);
  const remainingGainMax = Math.max(0, recommendations.max - currentGain);
  const weeklyTarget = remainingWeeks > 0 ? (remainingGainMin + remainingGainMax) / 2 / remainingWeeks : 0;
  
  // Determine status
  let status: 'below' | 'normal' | 'above';
  let statusMessage: string;
  
  if (currentGain < expectedGain - 2) {
    status = 'below';
    statusMessage = 'Weight gain is below recommended range';
  } else if (currentGain > expectedGain + 3) {
    status = 'above';
    statusMessage = 'Weight gain is above recommended range';
  } else {
    status = 'normal';
    statusMessage = 'Weight gain is within healthy range';
  }
  
  // Generate recommendations based on status
  const recList: string[] = [];
  
  if (status === 'below') {
    recList.push('Focus on nutrient-dense foods');
    recList.push('Eat frequent, smaller meals');
    recList.push('Include healthy fats like nuts and avocados');
  } else if (status === 'above') {
    recList.push('Monitor portion sizes');
    recList.push('Increase physical activity (with doctor approval)');
    recList.push('Choose lower-calorie, nutrient-rich foods');
  } else {
    recList.push('Continue current healthy eating patterns');
    recList.push('Maintain regular prenatal check-ups');
    recList.push('Stay active with doctor-approved exercises');
  }
  
  recList.push('Consult Dr. Amita Shukla for personalized guidance');
  
  return {
    bmi,
    bmiCategory: recommendations.category,
    recommendedTotalGain: { min: recommendations.min, max: recommendations.max },
    currentGain,
    remainingGain: { min: remainingGainMin, max: remainingGainMax },
    weeklyTarget,
    status,
    statusMessage,
    recommendations: recList,
  };
};

// Main component
export default function WeightGainCalculatorPage() {
  const [inputs, setInputs] = useState<WeightGainInputs>({
    prePregnancyWeight: '',
    height: '',
    currentWeight: '',
    pregnancyWeek: '',
  });
  
  const [result, setResult] = useState<WeightGainResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof WeightGainInputs, value: number | '') => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      const calculationResult = calculateWeightGain(inputs);
      setResult(calculationResult);
      setIsCalculating(false);
      
      // Trigger result animation
      setTimeout(() => {
        const resultElement = document.querySelector('.result-display');
        if (resultElement) {
          presets.resultsReveal(resultElement as HTMLElement);
        }
      }, 100);
    }, 800);
  };

  const handleReset = () => {
    setInputs({
      prePregnancyWeight: '',
      height: '',
      currentWeight: '',
      pregnancyWeek: '',
    });
    setResult(null);
    setErrors({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'below':
        return 'text-orange-600';
      case 'above':
        return 'text-red-600';
      default:
        return 'text-forest-green';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'below':
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case 'above':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Heart className="w-5 h-5 text-forest-green" />;
    }
  };

  return (
    <CalculatorTemplate
      title="Weight Gain Calculator"
      description="Track your pregnancy weight gain with medical precision. Get personalized recommendations based on your BMI and pregnancy stage, following professional guidelines from Dr. Amita Shukla."
      relatedCalculators={[
        {
          title: 'BMI Calculator',
          href: '/calculators/bmi-calculator',
          description: 'Calculate your Body Mass Index for health assessment',
        },
        {
          title: 'Due Date Calculator',
          href: '/calculators/due-date-calculator',
          description: 'Calculate your expected delivery date',
        },
        {
          title: 'Pregnancy Week Calculator',
          href: '/calculators/pregnancy-week-calculator',
          description: 'Track your current pregnancy week and trimester',
        },
      ]}
    >
      <div className="space-y-8">
        {/* Input Form */}
        <div>
          <h2 className={calculatorTheme.classes.subtitle}>
            <Scale className="w-5 h-5 inline-block mr-2 text-primary-green" />
            Weight Information
          </h2>
          
          <ForestFormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestNumberInput
                label="Pre-pregnancy Weight"
                value={inputs.prePregnancyWeight}
                onChange={(value) => handleInputChange('prePregnancyWeight', value)}
                unit="kg"
                min={30}
                max={200}
                step={0.1}
                placeholder="Enter weight before pregnancy"
                error={errors.prePregnancyWeight}
                required
                helpText="Your weight before becoming pregnant"
              />
              
              <ForestNumberInput
                label="Height"
                value={inputs.height}
                onChange={(value) => handleInputChange('height', value)}
                unit="cm"
                min={120}
                max={220}
                step={0.5}
                placeholder="Enter your height"
                error={errors.height}
                required
                helpText="Your height in centimeters"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestNumberInput
                label="Current Weight"
                value={inputs.currentWeight}
                onChange={(value) => handleInputChange('currentWeight', value)}
                unit="kg"
                min={30}
                max={250}
                step={0.1}
                placeholder="Enter current weight"
                error={errors.currentWeight}
                required
                helpText="Your current weight during pregnancy"
              />
              
              <ForestNumberInput
                label="Pregnancy Week"
                value={inputs.pregnancyWeek}
                onChange={(value) => handleInputChange('pregnancyWeek', value)}
                unit="weeks"
                min={4}
                max={42}
                step={1}
                placeholder="Enter current week"
                error={errors.pregnancyWeek}
                required
                helpText="Current week of pregnancy (4-42)"
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
              <Scale className="w-5 h-5" />
              <span>{isCalculating ? 'Calculating...' : 'Calculate Weight Gain'}</span>
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
            <h3 className={calculatorTheme.classes.subtitle}>
              Weight Gain Analysis
            </h3>
            
            {/* Main Status */}
            <div className={`${calculatorTheme.classes.result} text-center`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {getStatusIcon(result.status)}
                <span className={`text-xl font-semibold ${getStatusColor(result.status)}`}>
                  {result.statusMessage}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-text-brown/70 mb-1">Current Weight Gain</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {result.currentGain > 0 ? '+' : ''}{result.currentGain.toFixed(1)} kg
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-text-brown/70 mb-1">BMI Category</p>
                  <p className="text-lg font-semibold text-text-brown">
                    {result.bmiCategory}
                  </p>
                  <p className="text-sm text-text-brown/60">
                    BMI: {result.bmi.toFixed(1)}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-text-brown/70 mb-1">Recommended Total</p>
                  <p className="text-lg font-semibold text-forest-green">
                    {result.recommendedTotalGain.min}-{result.recommendedTotalGain.max} kg
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress */}
              <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-green" />
                  Progress Tracking
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-text-brown/70">Remaining Gain Needed</p>
                    <p className="font-semibold text-text-brown">
                      {result.remainingGain.min.toFixed(1)} - {result.remainingGain.max.toFixed(1)} kg
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-text-brown/70">Target Weekly Gain</p>
                    <p className="font-semibold text-primary-green">
                      {result.weeklyTarget.toFixed(2)} kg/week
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                <h4 className="font-semibold text-text-brown mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary-green" />
                  Recommendations
                </h4>
                
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-brown/80">
                      <span className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800 mb-1">Important Note</p>
                  <p className="text-sm text-yellow-700">
                    Weight gain patterns vary for each individual. These recommendations are based on general guidelines. 
                    Always consult with Dr. Amita Shukla for personalized advice based on your specific health condition and pregnancy needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}