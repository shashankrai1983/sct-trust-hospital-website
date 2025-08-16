'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scale, Heart, Activity, TrendingUp, Award, Shield, Target, AlertTriangle } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { calculatorTheme } from '../utils/calculatorTheme';

const bmiSchema = z.object({
  height: z.number()
    .min(120, "Height must be at least 120 cm")
    .max(220, "Height must be at most 220 cm"),
  weight: z.number()
    .min(30, "Weight must be at least 30 kg")
    .max(200, "Weight must be at most 200 kg"),
  unit: z.enum(['metric', 'imperial']),
  heightFeet: z.number().optional(),
  heightInches: z.number().optional(),
  weightLbs: z.number().optional(),
});

type BMIFormData = z.infer<typeof bmiSchema>;

interface BMICategory {
  name: string;
  range: string;
  color: string;
  bgColor: string;
  description: string;
  healthLevel: string;
  risks: string[];
  recommendations: string[];
}

interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthScore: number;
  idealWeightRange: { min: number; max: number };
  recommendations: string[];
  medicalConsiderations: string[];
}

// BMI categories focused on women's health
const BMI_CATEGORIES: BMICategory[] = [
  {
    name: 'Underweight',
    range: 'Below 18.5',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'May indicate nutritional deficiency',
    healthLevel: 'Needs Attention',
    risks: ['Nutritional deficiency', 'Fertility issues', 'Bone health concerns', 'Immune system weakness'],
    recommendations: ['Consult nutritionist', 'Focus on healthy weight gain', 'Monitor vitamin levels', 'Regular health checkups']
  },
  {
    name: 'Normal Weight',
    range: '18.5 - 24.9',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Healthy weight range for optimal wellness',
    healthLevel: 'Excellent',
    risks: ['Maintain current health habits', 'Focus on preventive care'],
    recommendations: ['Continue balanced diet', 'Regular exercise routine', 'Annual health screenings', 'Stress management']
  },
  {
    name: 'Overweight',
    range: '25.0 - 29.9',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Increased risk for health complications',
    healthLevel: 'Moderate Risk',
    risks: ['PCOS risk', 'Pregnancy complications', 'Heart disease', 'Type 2 diabetes'],
    recommendations: ['Medical weight management', 'Nutrition counseling', 'Regular exercise', 'Health monitoring']
  },
  {
    name: 'Obese Class I',
    range: '30.0 - 34.9',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Significant health risks requiring intervention',
    healthLevel: 'High Risk',
    risks: ['Fertility complications', 'Gestational diabetes', 'Cardiovascular disease', 'Sleep apnea'],
    recommendations: ['Medical supervision', 'Structured weight loss program', 'Hormone evaluation', 'Cardiac assessment']
  },
  {
    name: 'Obese Class II',
    range: '35.0 - 39.9',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Severe obesity requiring immediate medical attention',
    healthLevel: 'Very High Risk',
    risks: ['Pregnancy complications', 'Insulin resistance', 'Joint problems', 'Mental health impact'],
    recommendations: ['Immediate medical consultation', 'Comprehensive health evaluation', 'Specialized treatment plan', 'Support system']
  },
  {
    name: 'Obese Class III',
    range: '40.0+',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    description: 'Morbid obesity requiring urgent medical intervention',
    healthLevel: 'Critical Risk',
    risks: ['Life-threatening complications', 'Severe fertility issues', 'Multiple organ stress', 'Reduced life expectancy'],
    recommendations: ['Urgent medical care', 'Bariatric evaluation', 'Multidisciplinary treatment', 'Continuous monitoring']
  }
];

// Simple BMI calculation - no special cases
const calculateBMI = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

// Get BMI category
const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  if (bmi < 35) return BMI_CATEGORIES[3];
  if (bmi < 40) return BMI_CATEGORIES[4];
  return BMI_CATEGORIES[5];
};

// Calculate ideal weight range (BMI 20-24)
const calculateIdealWeight = (heightCm: number): { min: number; max: number } => {
  const heightM = heightCm / 100;
  const min = 20 * heightM * heightM;
  const max = 24 * heightM * heightM;
  return { min: Math.round(min), max: Math.round(max) };
};

// Health score based on BMI (0-100)
const calculateHealthScore = (bmi: number): number => {
  if (bmi >= 18.5 && bmi <= 24.9) return 95; // Normal
  if (bmi >= 17 && bmi < 18.5) return 75; // Mild underweight
  if (bmi >= 25 && bmi < 27) return 80; // Mild overweight
  if (bmi >= 27 && bmi < 30) return 65; // Moderate overweight
  if (bmi >= 30 && bmi < 35) return 45; // Obese Class I
  if (bmi >= 35 && bmi < 40) return 25; // Obese Class II
  return 15; // Severe
};

export default function BMICalculator() {
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<BMIFormData>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      unit: 'metric',
    },
  });

  const watchUnit = form.watch('unit');

  const onSubmit = (data: BMIFormData) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let heightCm: number;
      let weightKg: number;

      if (data.unit === 'metric') {
        heightCm = data.height;
        weightKg = data.weight;
      } else {
        // Convert imperial to metric
        heightCm = ((data.heightFeet || 0) * 12 + (data.heightInches || 0)) * 2.54;
        weightKg = (data.weightLbs || 0) * 0.453592;
      }

      const bmi = calculateBMI(heightCm, weightKg);
      const category = getBMICategory(bmi);
      const healthScore = calculateHealthScore(bmi);
      const idealWeightRange = calculateIdealWeight(heightCm);

      // Women's health specific recommendations
      const recommendations = [
        'Schedule regular gynecological checkups',
        'Monitor hormonal health and PCOS risk',
        'Focus on bone density maintenance',
        'Consider pregnancy planning implications',
        'Maintain reproductive health awareness',
      ];

      const medicalConsiderations = [
        'BMI may not account for muscle mass differences',
        'Consult Dr. Amita Shukla for personalized assessment',
        'Consider body composition analysis',
        'Factor in individual health history and genetics',
        'Regular monitoring is more important than single measurements',
      ];

      setResult({
        bmi: Math.round(bmi * 10) / 10,
        category,
        healthScore,
        idealWeightRange,
        recommendations,
        medicalConsiderations,
      });
      setIsCalculating(false);
    }, 600);
  };

  const resetCalculator = () => {
    setResult(null);
    form.reset({ unit: 'metric' });
  };

  return (
    <CalculatorTemplate
      title="BMI Calculator"
      description="Calculate your Body Mass Index with women's health focused insights and medical recommendations from Dr. Amita Shukla at SCT Trust Hospital, Lucknow."
      relatedCalculators={[
        {
          title: "Weight Gain Calculator",
          href: "/calculators/weight-gain-calculator",
          description: "Monitor healthy pregnancy weight gain"
        },
        {
          title: "Ovulation Calculator",
          href: "/calculators/ovulation-calculator", 
          description: "Calculate ovulation for family planning"
        }
      ]}
    >
      <div className="space-y-8">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-primary-green" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Calculate Your BMI
              </h2>
              <p className="text-text-brown/70">
                Professional health assessment with women's wellness focus
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-text-brown">
                        Measurement System
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 border-primary-green/20">
                            <SelectValue placeholder="Select measurement system" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                          <SelectItem value="imperial">Imperial (ft, lbs)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchUnit === 'metric' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-text-brown">
                            Height (cm)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="120"
                              max="220"
                              className="h-12 border-primary-green/20 focus:border-primary-green"
                              placeholder="165"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-text-brown">
                            Weight (kg)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="30"
                              max="200"
                              className="h-12 border-primary-green/20 focus:border-primary-green"
                              placeholder="65"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="heightFeet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-text-brown">
                              Height (feet)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="4"
                                max="7"
                                className="h-12 border-primary-green/20 focus:border-primary-green"
                                placeholder="5"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="heightInches"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-text-brown">
                              Height (inches)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="11"
                                className="h-12 border-primary-green/20 focus:border-primary-green"
                                placeholder="5"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="weightLbs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-text-brown">
                            Weight (lbs)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="66"
                              max="440"
                              className="h-12 border-primary-green/20 focus:border-primary-green"
                              placeholder="143"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

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
                      <Scale className="w-5 h-5 mr-2" />
                      Calculate BMI
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
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Your BMI Results
              </h2>
              <p className="text-text-brown/70">
                Professional health assessment and recommendations
              </p>
            </div>

            {/* BMI Score & Health Level */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-6 h-6 text-primary-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Your BMI</h3>
                </div>
                <p className="text-4xl font-bold text-primary-green mb-2">
                  {result.bmi}
                </p>
                <p className="text-text-brown/70">Body Mass Index</p>
              </div>

              <div className={`rounded-xl p-6 border ${result.category.bgColor} border-opacity-30`}>
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6" style={{ color: result.category.color.replace('text-', '') }} />
                  <h3 className="text-lg font-semibold text-text-brown">Health Category</h3>
                </div>
                <p className={`text-xl font-semibold mb-1 ${result.category.color}`}>
                  {result.category.name}
                </p>
                <p className="text-sm text-text-brown/70 mb-2">
                  BMI Range: {result.category.range}
                </p>
                <p className="text-sm text-text-brown/80">
                  {result.category.description}
                </p>
              </div>
            </div>

            {/* Health Score Meter */}
            <div className="bg-white rounded-xl p-6 border border-primary-green/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary-green" />
                <h3 className="text-lg font-semibold text-text-brown">Health Score</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-brown/70">Overall Health Score</span>
                  <span className="text-xl font-bold text-primary-green">{result.healthScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary-green to-forest-green h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${result.healthScore}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-text-brown/80">
                Health Level: <span className="font-medium">{result.category.healthLevel}</span>
              </p>
            </div>

            {/* Ideal Weight Range */}
            <div className="bg-gradient-to-r from-forest-green/10 to-secondary-brown/10 rounded-xl p-6 border border-forest-green/20">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-forest-green" />
                <h3 className="text-lg font-semibold text-text-brown">Ideal Weight Range</h3>
              </div>
              <p className="text-xl font-semibold text-forest-green mb-2">
                {result.idealWeightRange.min} - {result.idealWeightRange.max} kg
              </p>
              <p className="text-text-brown/70">
                Healthy weight range for your height (BMI 20-24)
              </p>
            </div>

            {/* Health Risks & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Health Risks */}
              <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-text-brown">Health Considerations</h3>
                </div>
                <div className="space-y-2">
                  {result.category.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-text-brown/80">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-primary-green" />
                  <h3 className="text-lg font-semibold text-text-brown">Recommendations</h3>
                </div>
                <div className="space-y-2">
                  {result.category.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-text-brown/80">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Medical Considerations */}
            <div className="bg-gradient-to-r from-primary-beige/20 to-secondary-brown/20 rounded-xl p-6 border border-primary-beige/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-secondary-brown" />
                <h3 className="text-lg font-semibold text-text-brown">Medical Considerations</h3>
              </div>
              <div className="space-y-2">
                {result.medicalConsiderations.map((consideration, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary-brown rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-text-brown/80">{consideration}</p>
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