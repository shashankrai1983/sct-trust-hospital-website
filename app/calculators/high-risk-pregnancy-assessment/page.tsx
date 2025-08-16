'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Heart, AlertTriangle, Activity, Award, TrendingUp, Phone, Calendar } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { calculatorTheme } from '../utils/calculatorTheme';

const riskAssessmentSchema = z.object({
  age: z.number()
    .min(15, "Age must be at least 15")
    .max(50, "Age must be at most 50"),
  previousPregnancies: z.number().min(0).max(10),
  medicalHistory: z.array(z.string()),
  lifestyle: z.array(z.string()),
  familyHistory: z.array(z.string()),
  currentPregnancy: z.array(z.string()),
});

type RiskAssessmentFormData = z.infer<typeof riskAssessmentSchema>;

interface RiskFactor {
  id: string;
  label: string;
  points: number;
  category: 'medical' | 'lifestyle' | 'family' | 'current';
}

interface RiskLevel {
  level: 'Low' | 'Moderate' | 'High' | 'Very High';
  range: string;
  color: string;
  bgColor: string;
  description: string;
  monitoring: string;
  urgency: string;
}

interface AssessmentResult {
  totalScore: number;
  riskLevel: RiskLevel;
  activatedFactors: RiskFactor[];
  recommendations: string[];
  monitoringPlan: string[];
  specialistReferrals: string[];
  emergencyWarnings: string[];
}

// Evidence-based risk factors with clinical scoring
const RISK_FACTORS: RiskFactor[] = [
  // Medical History (Major factors)
  { id: 'diabetes', label: 'Diabetes (Type 1 or 2)', points: 15, category: 'medical' },
  { id: 'hypertension', label: 'Chronic Hypertension', points: 12, category: 'medical' },
  { id: 'heart_disease', label: 'Heart Disease', points: 20, category: 'medical' },
  { id: 'kidney_disease', label: 'Kidney Disease', points: 15, category: 'medical' },
  { id: 'autoimmune', label: 'Autoimmune Disorders', points: 12, category: 'medical' },
  { id: 'thyroid', label: 'Thyroid Disorders', points: 8, category: 'medical' },
  { id: 'blood_disorders', label: 'Blood Clotting Disorders', points: 15, category: 'medical' },
  { id: 'mental_health', label: 'Severe Mental Health Conditions', points: 10, category: 'medical' },
  
  // Previous Pregnancy Complications
  { id: 'preeclampsia', label: 'Previous Preeclampsia', points: 15, category: 'medical' },
  { id: 'gestational_diabetes', label: 'Previous Gestational Diabetes', points: 10, category: 'medical' },
  { id: 'preterm_birth', label: 'Previous Preterm Birth', points: 12, category: 'medical' },
  { id: 'pregnancy_loss', label: 'Recurrent Pregnancy Loss', points: 10, category: 'medical' },
  { id: 'stillbirth', label: 'Previous Stillbirth', points: 15, category: 'medical' },
  
  // Lifestyle Factors
  { id: 'smoking', label: 'Smoking During Pregnancy', points: 12, category: 'lifestyle' },
  { id: 'alcohol', label: 'Alcohol Use', points: 10, category: 'lifestyle' },
  { id: 'drug_use', label: 'Substance Use', points: 15, category: 'lifestyle' },
  { id: 'underweight', label: 'Underweight (BMI < 18.5)', points: 8, category: 'lifestyle' },
  { id: 'obese', label: 'Obesity (BMI > 30)', points: 10, category: 'lifestyle' },
  
  // Family History
  { id: 'family_diabetes', label: 'Family History of Diabetes', points: 5, category: 'family' },
  { id: 'family_hypertension', label: 'Family History of Hypertension', points: 5, category: 'family' },
  { id: 'family_preeclampsia', label: 'Family History of Preeclampsia', points: 8, category: 'family' },
  { id: 'genetic_disorders', label: 'Genetic Disorders in Family', points: 10, category: 'family' },
  
  // Current Pregnancy
  { id: 'multiple_pregnancy', label: 'Twin/Multiple Pregnancy', points: 15, category: 'current' },
  { id: 'assisted_reproduction', label: 'IVF/Assisted Reproduction', points: 8, category: 'current' },
  { id: 'pregnancy_complications', label: 'Current Pregnancy Complications', points: 12, category: 'current' },
];

// Risk level classification
const RISK_LEVELS: RiskLevel[] = [
  {
    level: 'Low',
    range: '0-15 points',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Standard pregnancy care appropriate',
    monitoring: 'Routine prenatal care',
    urgency: 'Continue regular appointments',
  },
  {
    level: 'Moderate',
    range: '16-30 points',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Enhanced monitoring recommended',
    monitoring: 'More frequent checkups',
    urgency: 'Discuss with healthcare provider',
  },
  {
    level: 'High',
    range: '31-50 points',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Specialist care required',
    monitoring: 'High-risk pregnancy management',
    urgency: 'Schedule specialist consultation',
  },
  {
    level: 'Very High',
    range: '51+ points',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Immediate specialist intervention needed',
    monitoring: 'Intensive medical supervision',
    urgency: 'Contact Dr. Amita Shukla immediately',
  },
];

// Simple scoring function
const calculateRiskScore = (factors: string[]): number => {
  return RISK_FACTORS
    .filter(factor => factors.includes(factor.id))
    .reduce((sum, factor) => sum + factor.points, 0);
};

// Age-based risk scoring
const getAgeRiskPoints = (age: number): number => {
  if (age < 18) return 8;
  if (age >= 35 && age < 40) return 10;
  if (age >= 40) return 15;
  return 0;
};

// Previous pregnancy risk
const getPregnancyHistoryPoints = (count: number): number => {
  if (count === 0) return 5; // First pregnancy
  if (count >= 5) return 8; // Grand multiparity
  return 0;
};

const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 15) return RISK_LEVELS[0];
  if (score <= 30) return RISK_LEVELS[1];
  if (score <= 50) return RISK_LEVELS[2];
  return RISK_LEVELS[3];
};

export default function HighRiskPregnancyAssessment() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<RiskAssessmentFormData>({
    resolver: zodResolver(riskAssessmentSchema),
    defaultValues: {
      previousPregnancies: 0,
      medicalHistory: [],
      lifestyle: [],
      familyHistory: [],
      currentPregnancy: [],
    },
  });

  const onSubmit = (data: RiskAssessmentFormData) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Calculate risk score
      const allFactors = [
        ...data.medicalHistory,
        ...data.lifestyle,
        ...data.familyHistory,
        ...data.currentPregnancy,
      ];
      
      let totalScore = calculateRiskScore(allFactors);
      totalScore += getAgeRiskPoints(data.age);
      totalScore += getPregnancyHistoryPoints(data.previousPregnancies);
      
      const riskLevel = getRiskLevel(totalScore);
      const activatedFactors = RISK_FACTORS.filter(factor => allFactors.includes(factor.id));
      
      // Age factor if applicable
      const agePoints = getAgeRiskPoints(data.age);
      if (agePoints > 0) {
        activatedFactors.push({
          id: 'age_risk',
          label: data.age < 18 ? 'Teenage Pregnancy' : data.age >= 35 ? 'Advanced Maternal Age' : 'Very Advanced Maternal Age',
          points: agePoints,
          category: 'medical'
        });
      }
      
      // Pregnancy history factor
      const pregnancyPoints = getPregnancyHistoryPoints(data.previousPregnancies);
      if (pregnancyPoints > 0) {
        activatedFactors.push({
          id: 'pregnancy_history',
          label: data.previousPregnancies === 0 ? 'First Pregnancy' : 'Grand Multiparity (5+ pregnancies)',
          points: pregnancyPoints,
          category: 'medical'
        });
      }

      // Generate recommendations based on risk level
      const recommendations = generateRecommendations(riskLevel.level, activatedFactors);
      const monitoringPlan = generateMonitoringPlan(riskLevel.level);
      const specialistReferrals = generateSpecialistReferrals(activatedFactors);
      const emergencyWarnings = generateEmergencyWarnings(riskLevel.level, activatedFactors);

      setResult({
        totalScore,
        riskLevel,
        activatedFactors,
        recommendations,
        monitoringPlan,
        specialistReferrals,
        emergencyWarnings,
      });
      setIsCalculating(false);
    }, 1000);
  };

  const resetAssessment = () => {
    setResult(null);
    form.reset({
      previousPregnancies: 0,
      medicalHistory: [],
      lifestyle: [],
      familyHistory: [],
      currentPregnancy: [],
    });
  };

  return (
    <CalculatorTemplate
      title="High-Risk Pregnancy Assessment"
      description="Professional risk assessment tool for identifying pregnancy complications early. Evidence-based scoring system with specialized guidance from Dr. Amita Shukla."
      relatedCalculators={[
        {
          title: "Due Date Calculator",
          href: "/calculators/due-date-calculator",
          description: "Calculate your expected delivery date"
        },
        {
          title: "Weight Gain Calculator",
          href: "/calculators/weight-gain-calculator",
          description: "Monitor healthy pregnancy weight gain"
        }
      ]}
    >
      <div className="space-y-8">
        {!result ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-green" />
              </div>
              <h2 className="text-2xl font-semibold text-text-brown mb-2">
                Pregnancy Risk Assessment
              </h2>
              <p className="text-text-brown/70">
                Professional evaluation to ensure optimal maternal and fetal health
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-green" />
                    Basic Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="15"
                              max="50"
                              className="h-12 border-primary-green/20"
                              placeholder="28"
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
                      name="previousPregnancies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Pregnancies</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              className="h-12 border-primary-green/20"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Medical History */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-green" />
                    Medical History
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="medicalHistory"
                    render={() => (
                      <FormItem>
                        <div className="grid md:grid-cols-2 gap-4">
                          {RISK_FACTORS.filter(f => f.category === 'medical').map((factor) => (
                            <FormField
                              key={factor.id}
                              control={form.control}
                              name="medicalHistory"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(factor.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), factor.id]
                                          : field.value?.filter((value) => value !== factor.id) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-5">
                                    {factor.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Lifestyle Factors */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-green" />
                    Lifestyle Factors
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="lifestyle"
                    render={() => (
                      <FormItem>
                        <div className="grid md:grid-cols-2 gap-4">
                          {RISK_FACTORS.filter(f => f.category === 'lifestyle').map((factor) => (
                            <FormField
                              key={factor.id}
                              control={form.control}
                              name="lifestyle"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(factor.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), factor.id]
                                          : field.value?.filter((value) => value !== factor.id) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-5">
                                    {factor.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Family History */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-green" />
                    Family History
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="familyHistory"
                    render={() => (
                      <FormItem>
                        <div className="grid md:grid-cols-2 gap-4">
                          {RISK_FACTORS.filter(f => f.category === 'family').map((factor) => (
                            <FormField
                              key={factor.id}
                              control={form.control}
                              name="familyHistory"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(factor.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), factor.id]
                                          : field.value?.filter((value) => value !== factor.id) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-5">
                                    {factor.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Current Pregnancy */}
                <div className="bg-white rounded-xl p-6 border border-primary-green/20">
                  <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-green" />
                    Current Pregnancy
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="currentPregnancy"
                    render={() => (
                      <FormItem>
                        <div className="grid md:grid-cols-2 gap-4">
                          {RISK_FACTORS.filter(f => f.category === 'current').map((factor) => (
                            <FormField
                              key={factor.id}
                              control={form.control}
                              name="currentPregnancy"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(factor.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), factor.id]
                                          : field.value?.filter((value) => value !== factor.id) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-5">
                                    {factor.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full h-12 ${calculatorTheme.classes.button}`}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Assessing Risk...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Complete Risk Assessment
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <AssessmentResults 
            result={result} 
            onReset={resetAssessment}
          />
        )}
      </div>
    </CalculatorTemplate>
  );
}

// Assessment Results Component
const AssessmentResults: React.FC<{ 
  result: AssessmentResult; 
  onReset: () => void;
}> = ({ result, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${result.riskLevel.bgColor} border-2 border-opacity-30`}>
          <Shield className={`w-8 h-8 ${result.riskLevel.color}`} />
        </div>
        <h2 className="text-2xl font-semibold text-text-brown mb-2">
          Risk Assessment Complete
        </h2>
        <p className="text-text-brown/70">
          Professional medical guidance for your pregnancy
        </p>
      </div>

      {/* Risk Score & Level */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-primary-green/10 to-forest-green/10 rounded-xl p-6 border border-primary-green/20">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-primary-green" />
            <h3 className="text-lg font-semibold text-text-brown">Risk Score</h3>
          </div>
          <p className="text-4xl font-bold text-primary-green mb-2">
            {result.totalScore}
          </p>
          <p className="text-text-brown/70">points</p>
        </div>

        <div className={`rounded-xl p-6 border ${result.riskLevel.bgColor} border-opacity-30`}>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className={`w-6 h-6 ${result.riskLevel.color}`} />
            <h3 className="text-lg font-semibold text-text-brown">Risk Level</h3>
          </div>
          <p className={`text-2xl font-bold mb-1 ${result.riskLevel.color}`}>
            {result.riskLevel.level} Risk
          </p>
          <p className="text-sm text-text-brown/70 mb-2">
            {result.riskLevel.range}
          </p>
          <p className="text-sm text-text-brown/80">
            {result.riskLevel.description}
          </p>
        </div>
      </div>

      {/* Risk Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-primary-green/20">
        <h3 className="text-lg font-semibold text-text-brown mb-4">Risk Assessment Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-brown/70">Risk Level</span>
            <span className={`font-bold ${result.riskLevel.color}`}>{result.riskLevel.level}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${
                result.riskLevel.level === 'Low' ? 'bg-green-500' :
                result.riskLevel.level === 'Moderate' ? 'bg-yellow-500' :
                result.riskLevel.level === 'High' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((result.totalScore / 60) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-text-brown/80">
          {result.riskLevel.urgency}
        </p>
      </div>

      {/* Activated Risk Factors */}
      {result.activatedFactors.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-primary-green/20">
          <h3 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Identified Risk Factors
          </h3>
          <div className="space-y-3">
            {result.activatedFactors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-text-brown">{factor.label}</span>
                <span className="text-orange-600 font-medium">{factor.points} points</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Warnings */}
      {result.emergencyWarnings.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Important Medical Alerts</h3>
          </div>
          <div className="space-y-2">
            {result.emergencyWarnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-red-800">{warning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monitoring Plan */}
      <div className="bg-white rounded-xl p-6 border border-primary-green/20">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-primary-green" />
          <h3 className="text-lg font-semibold text-text-brown">Monitoring Plan</h3>
        </div>
        <div className="space-y-2">
          {result.monitoringPlan.map((plan, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-text-brown/80">{plan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialist Referrals */}
      {result.specialistReferrals.length > 0 && (
        <div className="bg-gradient-to-r from-forest-green/10 to-secondary-brown/10 rounded-xl p-6 border border-forest-green/20">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-forest-green" />
            <h3 className="text-lg font-semibold text-text-brown">Specialist Consultations</h3>
          </div>
          <div className="space-y-2">
            {result.specialistReferrals.map((referral, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-forest-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-brown/80">{referral}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-primary-beige/20 to-secondary-brown/20 rounded-xl p-6 border border-primary-beige/30">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-6 h-6 text-secondary-brown" />
          <h3 className="text-lg font-semibold text-text-brown">Professional Support</h3>
        </div>
        <p className="text-text-brown/80 mb-4">
          Dr. Amita Shukla specializes in high-risk pregnancy management at SCT Trust Hospital, Lucknow. 
          Professional monitoring and specialized care for optimal pregnancy outcomes.
        </p>
        <div className="flex items-center gap-2 text-secondary-brown font-medium">
          <Heart className="w-4 h-4" />
          <span>24/7 emergency support available</span>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 h-12 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
        >
          New Assessment
        </Button>
        <Button
          className={`flex-1 h-12 ${calculatorTheme.classes.button}`}
          asChild
        >
          <a href="/contact">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </a>
        </Button>
      </div>
    </div>
  );
};

// Helper functions for generating recommendations
const generateRecommendations = (riskLevel: string, factors: RiskFactor[]): string[] => {
  const base = [
    'Take prenatal vitamins daily (folic acid, iron, calcium)',
    'Maintain a balanced, nutritious diet',
    'Stay physically active as recommended by your doctor',
    'Avoid alcohol, smoking, and recreational drugs',
    'Get adequate sleep (7-9 hours per night)',
  ];

  if (riskLevel === 'Moderate' || riskLevel === 'High' || riskLevel === 'Very High') {
    base.push(
      'Monitor blood pressure regularly',
      'Track fetal movements daily after 28 weeks',
      'Attend all scheduled prenatal appointments',
      'Consider stress management techniques'
    );
  }

  if (riskLevel === 'High' || riskLevel === 'Very High') {
    base.push(
      'Keep a pregnancy diary with symptoms',
      'Have emergency contact numbers readily available',
      'Consider home monitoring devices as prescribed'
    );
  }

  return base;
};

const generateMonitoringPlan = (riskLevel: string): string[] => {
  const plans = {
    'Low': [
      'Monthly checkups until 28 weeks',
      'Bi-weekly visits from 28-36 weeks',
      'Weekly visits from 36 weeks to delivery',
      'Standard prenatal screening tests',
    ],
    'Moderate': [
      'More frequent prenatal visits',
      'Additional ultrasound monitoring',
      'Blood pressure monitoring',
      'Glucose screening tests',
      'Fetal growth assessments',
    ],
    'High': [
      'Weekly to bi-weekly specialist visits',
      'Serial ultrasounds for fetal growth',
      'Antenatal testing (NST, BPP)',
      'Blood pressure monitoring',
      'Laboratory monitoring as indicated',
    ],
    'Very High': [
      'Intensive specialist supervision',
      'Hospital-based monitoring may be required',
      'Daily fetal monitoring in some cases',
      'Frequent laboratory assessments',
      'Possible hospitalization for observation',
    ],
  };

  return plans[riskLevel as keyof typeof plans] || plans['Low'];
};

const generateSpecialistReferrals = (factors: RiskFactor[]): string[] => {
  const referrals: string[] = [];
  
  if (factors.some(f => ['diabetes', 'gestational_diabetes'].includes(f.id))) {
    referrals.push('Endocrinologist for diabetes management');
  }
  if (factors.some(f => ['heart_disease'].includes(f.id))) {
    referrals.push('Cardiologist for cardiac evaluation');
  }
  if (factors.some(f => ['hypertension', 'preeclampsia'].includes(f.id))) {
    referrals.push('Hypertension specialist');
  }
  if (factors.some(f => ['multiple_pregnancy'].includes(f.id))) {
    referrals.push('Maternal-fetal medicine specialist');
  }
  if (factors.some(f => ['genetic_disorders'].includes(f.id))) {
    referrals.push('Genetic counselor');
  }

  return referrals;
};

const generateEmergencyWarnings = (riskLevel: string, factors: RiskFactor[]): string[] => {
  const warnings: string[] = [];

  if (riskLevel === 'High' || riskLevel === 'Very High') {
    warnings.push(
      'Contact your healthcare provider immediately for severe headaches',
      'Report sudden swelling of face, hands, or feet',
      'Seek immediate care for severe abdominal pain',
      'Monitor for decreased fetal movement'
    );
  }

  if (factors.some(f => ['heart_disease'].includes(f.id))) {
    warnings.push('Report any chest pain or shortness of breath immediately');
  }

  if (factors.some(f => ['hypertension', 'preeclampsia'].includes(f.id))) {
    warnings.push('Monitor blood pressure daily and report elevated readings');
  }

  return warnings;
};