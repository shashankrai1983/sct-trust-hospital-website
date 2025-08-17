'use client';

// Prenatal Vitamin Calculator - Personalized Nutrition Recommendations
// Following Linus Torvalds methodology: simple data structures eliminate complexity

import React, { useState, useEffect } from 'react';
import { Pill, Heart, Star, Trophy, Users, Sparkles, Target, Award } from 'lucide-react';
import CalculatorTemplate from '../components/CalculatorTemplate';
import {
  ForestNumberInput,
  ForestSelect,
  ForestButton,
  ForestFormGroup,
} from '../components/ForestThemeInputs';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from '../components/animations/ForestAnimations';

// Core data structures - eliminate conditionals through better organization
interface VitaminInputs {
  pregnancyWeek: number | '';
  breastfeeding: 'no' | 'planning' | 'currently';
  age: number | '';
  weight: number | '';
  dietaryRestrictions: string[];
  currentSupplements: string[];
  medicalConditions: string[];
}

interface NutrientRequirement {
  name: string;
  unit: string;
  recommended: number;
  tolerable?: number;
  importance: 'critical' | 'essential' | 'beneficial';
  sources: string[];
  indianAlternatives: string[];
}

interface VitaminResult {
  trimester: number;
  stage: string;
  requirements: NutrientRequirement[];
  recommendations: string[];
  warnings: string[];
  gamificationData: {
    level: number;
    title: string;
    points: number;
    achievements: string[];
    nextGoal: string;
  };
  indianSuperfoodSpotlight: {
    food: string;
    benefits: string;
    howToUse: string;
  };
}

// Nutrient database - single source of truth eliminates inconsistencies
const NUTRIENT_DATABASE: Record<string, Omit<NutrientRequirement, 'recommended'>> = {
  'folic_acid': {
    name: 'Folic Acid',
    unit: 'mcg',
    tolerable: 1000,
    importance: 'critical',
    sources: ['Fortified cereals', 'Leafy greens', 'Legumes', 'Citrus fruits'],
    indianAlternatives: ['Methi leaves', 'Palak', 'Masoor dal', 'Amla'],
  },
  'iron': {
    name: 'Iron',
    unit: 'mg',
    tolerable: 45,
    importance: 'critical',
    sources: ['Red meat', 'Poultry', 'Beans', 'Fortified cereals'],
    indianAlternatives: ['Jaggery', 'Bajra', 'Til seeds', 'Drumstick leaves'],
  },
  'calcium': {
    name: 'Calcium',
    unit: 'mg',
    tolerable: 2500,
    importance: 'critical',
    sources: ['Dairy products', 'Fortified foods', 'Sardines', 'Kale'],
    indianAlternatives: ['Sesame seeds', 'Ragi', 'Mustard greens', 'Curd'],
  },
  'vitamin_d': {
    name: 'Vitamin D',
    unit: 'IU',
    tolerable: 4000,
    importance: 'essential',
    sources: ['Sunlight', 'Fatty fish', 'Fortified milk', 'Egg yolks'],
    indianAlternatives: ['Morning sunlight', 'Fish curry', 'Ghee', 'Mushrooms'],
  },
  'dha': {
    name: 'DHA',
    unit: 'mg',
    importance: 'essential',
    sources: ['Fish oil', 'Fatty fish', 'Algae supplements', 'Walnuts'],
    indianAlternatives: ['Fish curry', 'Chia seeds', 'Flax seeds', 'Walnuts'],
  },
  'vitamin_b12': {
    name: 'Vitamin B12',
    unit: 'mcg',
    importance: 'essential',
    sources: ['Meat', 'Fish', 'Dairy', 'Fortified cereals'],
    indianAlternatives: ['Paneer', 'Curd', 'Fish', 'Fortified foods'],
  },
  'choline': {
    name: 'Choline',
    unit: 'mg',
    tolerable: 3500,
    importance: 'beneficial',
    sources: ['Eggs', 'Meat', 'Fish', 'Beans'],
    indianAlternatives: ['Eggs', 'Fish', 'Soy beans', 'Groundnuts'],
  },
};

// RDA lookup table - eliminates nested conditionals
const RDA_TABLE: Record<string, { trimester1: number; trimester2: number; trimester3: number; breastfeeding: number }> = {
  'folic_acid': { trimester1: 600, trimester2: 600, trimester3: 600, breastfeeding: 500 },
  'iron': { trimester1: 27, trimester2: 27, trimester3: 27, breastfeeding: 9 },
  'calcium': { trimester1: 1000, trimester2: 1000, trimester3: 1000, breastfeeding: 1000 },
  'vitamin_d': { trimester1: 600, trimester2: 600, trimester3: 600, breastfeeding: 600 },
  'dha': { trimester1: 200, trimester2: 200, trimester3: 200, breastfeeding: 200 },
  'vitamin_b12': { trimester1: 2.6, trimester2: 2.6, trimester3: 2.6, breastfeeding: 2.8 },
  'choline': { trimester1: 450, trimester2: 450, trimester3: 450, breastfeeding: 550 },
};

// Gamification system - Yu-Kai Chou Framework implementation
const GAMIFICATION_LEVELS = [
  { level: 1, title: 'Nutrition Newbie', pointsRequired: 0, badge: '🌱' },
  { level: 2, title: 'Healthy Starter', pointsRequired: 100, badge: '🌿' },
  { level: 3, title: 'Wellness Warrior', pointsRequired: 300, badge: '💪' },
  { level: 4, title: 'Nutrition Ninja Maa', pointsRequired: 600, badge: '🥷' },
  { level: 5, title: 'Superfood Sage', pointsRequired: 1000, badge: '🧘‍♀️' },
  { level: 6, title: 'Complete Nutrition Master', pointsRequired: 1500, badge: '👑' },
];

const INDIAN_SUPERFOODS = [
  { food: 'Moringa (Drumstick leaves)', benefits: 'Rich in iron, calcium, and vitamins', howToUse: 'Add to dal or make sabzi' },
  { food: 'Amaranth (Rajgira)', benefits: 'High protein, iron, and folate', howToUse: 'Make laddoos or kheer' },
  { food: 'Ragi (Finger millet)', benefits: 'Calcium powerhouse, fiber rich', howToUse: 'Ragi roti or porridge' },
  { food: 'Methi seeds', benefits: 'Folic acid and iron', howToUse: 'Soak overnight, eat with water' },
  { food: 'Sesame seeds (Til)', benefits: 'Calcium and healthy fats', howToUse: 'Make til laddu or sprinkle on food' },
];

// Calculate trimester from pregnancy week - simple lookup
const getTrimester = (week: number): number => {
  return week <= 13 ? 1 : week <= 27 ? 2 : 3;
};

// Get RDA for specific stage - eliminates if/else chains
const getRDA = (nutrient: string, stage: 'trimester1' | 'trimester2' | 'trimester3' | 'breastfeeding'): number => {
  return RDA_TABLE[nutrient]?.[stage] || 0;
};

// Calculate gamification data - progressive achievement system
const calculateGamificationData = (inputs: VitaminInputs, completedAssessments: number = 1): any => {
  const basePoints = completedAssessments * 50;
  const bonusPoints = inputs.dietaryRestrictions.length * 20; // Empowerment points for managing restrictions
  const totalPoints = basePoints + bonusPoints;
  
  const currentLevel = GAMIFICATION_LEVELS.find(level => 
    totalPoints >= level.pointsRequired && 
    (GAMIFICATION_LEVELS[GAMIFICATION_LEVELS.indexOf(level) + 1]?.pointsRequired > totalPoints || !GAMIFICATION_LEVELS[GAMIFICATION_LEVELS.indexOf(level) + 1])
  ) || GAMIFICATION_LEVELS[0];
  
  const nextLevel = GAMIFICATION_LEVELS[GAMIFICATION_LEVELS.indexOf(currentLevel) + 1];
  
  const achievements = [];
  if (totalPoints >= 100) achievements.push('First Nutrition Assessment 🎯');
  if (inputs.dietaryRestrictions.length > 0) achievements.push('Dietary Restriction Manager 🌟');
  if (totalPoints >= 300) achievements.push('Wellness Streak Champion 🏆');
  if (totalPoints >= 600) achievements.push('Nutrition Ninja Maa 🥷');
  
  return {
    level: currentLevel.level,
    title: currentLevel.title,
    points: totalPoints,
    achievements,
    nextGoal: nextLevel ? `Reach ${nextLevel.pointsRequired} points to become ${nextLevel.title}` : 'Maximum level reached!',
  };
};

// Main calculation function - clean data flow
const calculateVitaminNeeds = (inputs: VitaminInputs): VitaminResult => {
  const { pregnancyWeek, breastfeeding } = inputs;
  
  const trimester = typeof pregnancyWeek === 'number' ? getTrimester(pregnancyWeek) : 1;
  const stage = breastfeeding === 'currently' ? 'breastfeeding' : `trimester${trimester}` as any;
  
  const requirements: NutrientRequirement[] = Object.entries(NUTRIENT_DATABASE).map(([key, data]) => ({
    ...data,
    recommended: getRDA(key, stage),
  }));
  
  // Generate recommendations based on restrictions - data-driven approach
  const recommendations = [];
  const warnings = [];
  
  if (inputs.dietaryRestrictions.includes('vegetarian')) {
    recommendations.push('Focus on iron-rich plant foods like jaggery and bajra');
    recommendations.push('Combine vitamin C foods with iron for better absorption');
  }
  
  if (inputs.dietaryRestrictions.includes('vegan')) {
    warnings.push('B12 supplementation is essential for vegan diets');
    recommendations.push('Include fortified foods and B12 supplements');
  }
  
  if (inputs.medicalConditions.includes('anemia')) {
    warnings.push('Iron supplementation requires medical supervision');
    recommendations.push('Regular iron level monitoring recommended');
  }
  
  recommendations.push('Include variety of colorful Indian vegetables daily');
  recommendations.push('Consult Dr. Amita Shukla for personalized supplement plan');
  
  const gamificationData = calculateGamificationData(inputs);
  const randomSuperfood = INDIAN_SUPERFOODS[Math.floor(Math.random() * INDIAN_SUPERFOODS.length)];
  
  return {
    trimester,
    stage: breastfeeding === 'currently' ? 'Breastfeeding' : `Trimester ${trimester}`,
    requirements,
    recommendations,
    warnings,
    gamificationData,
    indianSuperfoodSpotlight: randomSuperfood,
  };
};

// Validation - simple and clear
const validateInputs = (inputs: VitaminInputs): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!inputs.pregnancyWeek || inputs.pregnancyWeek < 4 || inputs.pregnancyWeek > 42) {
    errors.pregnancyWeek = 'Pregnancy week must be between 4-42';
  }
  
  if (!inputs.age || inputs.age < 15 || inputs.age > 50) {
    errors.age = 'Age must be between 15-50 years';
  }
  
  if (!inputs.weight || inputs.weight < 35 || inputs.weight > 150) {
    errors.weight = 'Weight must be between 35-150 kg';
  }
  
  return errors;
};

// Main component
export default function PrenatalVitaminCalculatorPage() {
  const [inputs, setInputs] = useState<VitaminInputs>({
    pregnancyWeek: '',
    breastfeeding: 'no',
    age: '',
    weight: '',
    dietaryRestrictions: [],
    currentSupplements: [],
    medicalConditions: [],
  });
  
  const [result, setResult] = useState<VitaminResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof VitaminInputs, value: any) => {
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
      const calculationResult = calculateVitaminNeeds(inputs);
      setResult(calculationResult);
      setIsCalculating(false);
      
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
      pregnancyWeek: '',
      breastfeeding: 'no',
      age: '',
      weight: '',
      dietaryRestrictions: [],
      currentSupplements: [],
      medicalConditions: [],
    });
    setResult(null);
    setErrors({});
  };

  return (
    <CalculatorTemplate
      title="Prenatal Vitamin Calculator"
      description="Get personalized vitamin and mineral recommendations for your pregnancy journey. Discover Indian superfood alternatives and track your nutrition progress with our Nutrition Ninja Maa system."
      relatedCalculators={[
        {
          title: 'Weight Gain Calculator',
          href: '/calculators/weight-gain-calculator',
          description: 'Track healthy pregnancy weight gain',
        },
        {
          title: 'Due Date Calculator',
          href: '/calculators/due-date-calculator',
          description: 'Calculate your expected delivery date',
        },
        {
          title: 'BMI Calculator',
          href: '/calculators/bmi-calculator',
          description: 'Assess your body mass index',
        },
      ]}
    >
      <div className="space-y-8">
        {/* Input Form */}
        <div>
          <h2 className={calculatorTheme.classes.subtitle}>
            <Pill className="w-5 h-5 inline-block mr-2 text-primary-green" />
            Pregnancy & Health Information
          </h2>
          
          <ForestFormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestNumberInput
                label="Pregnancy Week"
                value={inputs.pregnancyWeek}
                onChange={(value) => handleInputChange('pregnancyWeek', value)}
                unit="weeks"
                min={4}
                max={42}
                step={1}
                placeholder="Current pregnancy week"
                error={errors.pregnancyWeek}
                required
                helpText="Current week of pregnancy (4-42)"
              />
              
              <ForestSelect
                label="Breastfeeding Status"
                value={inputs.breastfeeding}
                onChange={(value) => handleInputChange('breastfeeding', value)}
                options={[
                  { value: 'no', label: 'Not planning to breastfeed' },
                  { value: 'planning', label: 'Planning to breastfeed' },
                  { value: 'currently', label: 'Currently breastfeeding' },
                ]}
                required
                helpText="Current or planned breastfeeding status"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ForestNumberInput
                label="Age"
                value={inputs.age}
                onChange={(value) => handleInputChange('age', value)}
                unit="years"
                min={15}
                max={50}
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
                min={35}
                max={150}
                step={0.5}
                placeholder="Current weight"
                error={errors.weight}
                required
                helpText="Your current weight"
              />
            </div>
            
            {/* Dietary Restrictions */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-brown">
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'vegan', label: 'Vegan' },
                  { value: 'gluten_free', label: 'Gluten-free' },
                  { value: 'dairy_free', label: 'Dairy-free' },
                  { value: 'no_fish', label: 'No fish/seafood' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputs.dietaryRestrictions.includes(option.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...inputs.dietaryRestrictions, option.value]
                          : inputs.dietaryRestrictions.filter(v => v !== option.value);
                        handleInputChange('dietaryRestrictions', newValue);
                      }}
                      className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green focus:ring-2"
                    />
                    <span className="text-sm text-text-brown">{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-text-brown/60">Select any dietary restrictions</p>
            </div>
            
            {/* Medical Conditions */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-brown">
                Medical Conditions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'anemia', label: 'Iron deficiency/Anemia' },
                  { value: 'diabetes', label: 'Gestational diabetes' },
                  { value: 'thyroid', label: 'Thyroid conditions' },
                  { value: 'hypertension', label: 'High blood pressure' },
                  { value: 'allergies', label: 'Food allergies' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputs.medicalConditions.includes(option.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...inputs.medicalConditions, option.value]
                          : inputs.medicalConditions.filter(v => v !== option.value);
                        handleInputChange('medicalConditions', newValue);
                      }}
                      className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green focus:ring-2"
                    />
                    <span className="text-sm text-text-brown">{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-text-brown/60">Select any relevant medical conditions</p>
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
              <Pill className="w-5 h-5" />
              <span>{isCalculating ? 'Calculating...' : 'Get Vitamin Plan'}</span>
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
                  <div className="text-2xl mb-1">{GAMIFICATION_LEVELS[result.gamificationData.level - 1]?.badge}</div>
                  <p className="text-sm text-text-brown/60">Nutrition Ninja</p>
                </div>
              </div>
              
              {result.gamificationData.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-brown mb-2">Recent Achievements:</p>
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

            <h3 className={calculatorTheme.classes.subtitle}>
              Vitamin Requirements - {result.stage}
            </h3>
            
            {/* Nutrient Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.requirements.map((nutrient, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-primary-green/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-text-brown">{nutrient.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      nutrient.importance === 'critical' ? 'bg-red-100 text-red-700' :
                      nutrient.importance === 'essential' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {nutrient.importance}
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-primary-green mb-2">
                    {nutrient.recommended} {nutrient.unit}
                    {nutrient.tolerable && (
                      <span className="text-sm text-text-brown/60 font-normal">
                        {' '}(max: {nutrient.tolerable})
                      </span>
                    )}
                  </p>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-text-brown/70 mb-1">Food Sources:</p>
                      <p className="text-xs text-text-brown/60">{nutrient.sources.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-brown/70 mb-1">Indian Alternatives:</p>
                      <p className="text-xs text-forest-green">{nutrient.indianAlternatives.join(', ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indian Superfood Spotlight */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <h4 className="font-semibold text-text-brown mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Indian Superfood Spotlight
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-text-brown">{result.indianSuperfoodSpotlight.food}</p>
                </div>
                <div>
                  <p className="text-sm text-text-brown/80">{result.indianSuperfoodSpotlight.benefits}</p>
                </div>
                <div>
                  <p className="text-sm text-forest-green font-medium">{result.indianSuperfoodSpotlight.howToUse}</p>
                </div>
              </div>
            </div>

            {/* Recommendations & Warnings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              {result.warnings.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Important Notes
                  </h4>
                  <ul className="space-y-2">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-yellow-700">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Social Sharing CTA */}
            <div className="bg-gradient-to-r from-primary-green/5 to-forest-green/5 rounded-xl p-6 border border-primary-green/10">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-green mx-auto mb-3" />
                <h4 className="font-semibold text-text-brown mb-2">Join the Healthy Moms Community</h4>
                <p className="text-sm text-text-brown/80 mb-4">
                  Share your nutrition journey and discover healthy recipes with other pregnant women in Lucknow
                </p>
                <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-forest-green transition-colors">
                  Share My Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}