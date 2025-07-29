import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface SOPItem {
  id: string;
  title: string;
  description: string;
  recommendations: string[];
  warnings?: string[];
  benefits?: string[];
  season?: Season[];
  riskLevel?: RiskLevel[];
  category?: 'vegetarian' | 'non-vegetarian' | 'general';
}

export interface SOPCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: SOPItem[];
  seasonal?: SeasonalRecommendations;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

export interface SOPSection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  categories: SOPCategory[];
  disclaimer: string;
  medicalSources?: string[];
}

export interface SeasonalRecommendations {
  winter: SOPItem[];
  summer: SOPItem[];
  monsoon: SOPItem[];
  postMonsoon: SOPItem[];
}

export interface PregnancySOPsData {
  sections: SOPSection[];
  globalDisclaimer: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  type: 'primary' | 'emergency' | 'hospital';
  name: string;
  phone: string;
  description: string;
}

export type Season = 'winter' | 'summer' | 'monsoon' | 'post-monsoon';
export type RiskLevel = 'low' | 'moderate' | 'high';

export interface PregnancySOPsProps {
  data: PregnancySOPsData;
  selectedRiskLevel?: RiskLevel;
  showSeasonalOnly?: boolean;
  currentSeason?: Season;
  className?: string;
}