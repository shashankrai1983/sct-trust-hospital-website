// Base interfaces for common elements
export interface ContactInfo {
  type: 'primary' | 'hospital' | 'emergency';
  name: string;
  phone: string;
  description: string;
}

export interface Statistic {
  label: string;
  value: string;
  description?: string;
  icon?: string; // Icon name as string
}

export interface Badge {
  text: string;
  icon?: string; // Icon name as string
  variant?: 'default' | 'success' | 'warning' | 'info';
}

// SEO and metadata interfaces
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: {
    '@type': string;
    name: string;
    description: string;
    provider?: {
      '@type': string;
      name: string;
    };
    availableService?: {
      '@type': string;
      name: string;
    };
  };
}

// Service information
export interface ServiceInfo {
  name: string;
  slug: string;
  category: 'Fertility' | 'Pregnancy' | 'Surgery' | 'Wellness' | 'Consultation';
  description: string;
  shortDescription?: string;
  icon?: string; // Icon name as string
  featured?: boolean;
}

// Section interfaces
export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  badges: string[];
  primaryCTA: {
    text: string;
    href: string;
    icon?: string; // Icon name as string
  };
  secondaryCTA: {
    text: string;
    href: string;
    icon?: string; // Icon name as string
  };
  trustIndicators?: {
    experience: string;
    successRate: string;
    specialization: string;
  };
}

export interface OverviewSection {
  introduction: string;
  keyPoints: string[];
  statistics?: Statistic[];
  benefits?: string[];
  whoCanBenefit?: string[];
  disclaimer?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  includes?: string[];
  icon?: string; // Icon name as string
  details?: string[];
}

export interface ProcessSection {
  title: string;
  subtitle?: string;
  description?: string;
  steps: ProcessStep[];
  timeline?: {
    totalDuration: string;
    frequency: string;
    followUp: string;
  };
}

export interface RiskFactor {
  category: string;
  description: string;
  factors: string[];
  riskLevel: 'low' | 'moderate' | 'high';
  prevention: string[];
}

export interface RiskFactorSection {
  title: string;
  subtitle?: string;
  description: string;
  factors: RiskFactor[];
  generalGuidance?: string;
}

export interface TreatmentOption {
  name: string;
  description: string;
  suitableFor: string[];
  successRate?: string;
  duration?: string;
  procedure?: string[];
  recovery?: string;
  risks?: string[];
  benefits?: string[];
  cost?: {
    range: string;
    factors: string[];
  };
}

export interface TreatmentSection {
  title: string;
  subtitle?: string;
  description: string;
  options: TreatmentOption[];
  consultationNote?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category?: 'general' | 'treatment' | 'cost' | 'recovery' | 'risk';
}

export interface FAQSection {
  title: string;
  subtitle?: string;
  description?: string;
  faqs: FAQ[];
  contactNote?: string;
}

export interface WarningSign {
  text: string;
  severity: 'critical' | 'high' | 'moderate';
  action: 'immediate' | 'urgent' | 'scheduled';
}

export interface WarningSection {
  title: string;
  subtitle?: string;
  description: string;
  signs: WarningSign[];
  emergencyContact: ContactInfo;
  generalGuidance: string;
}

export interface SOPItem {
  id: string;
  title: string;
  description: string;
  season?: ('winter' | 'summer' | 'monsoon' | 'post-monsoon')[];
  category: 'general' | 'vegetarian' | 'non-vegetarian';
  riskLevel: ('low' | 'moderate' | 'high')[];
  recommendations: string[];
  warnings?: string[];
  benefits?: string[];
}

export interface SOPCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon name as string
  bgColor: string;
  borderColor: string;
  accentColor: string;
  items: SOPItem[];
}

export interface SOPSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // Icon name as string
  description: string;
  disclaimer: string;
  categories: SOPCategory[];
  globalDisclaimer?: string;
  emergencyContacts?: ContactInfo[];
}

export interface Differentiator {
  title: string;
  description: string;
  features: string[];
  icon: string; // Icon name as string
  bgColor?: string;
  highlights?: string[];
}

export interface DifferentiatorSection {
  title: string;
  subtitle?: string;
  description: string;
  items: Differentiator[];
  trustStatistics?: Statistic[];
}

export interface Testimonial {
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
  image?: string;
}

export interface TestimonialSection {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  totalCount?: number;
  averageRating?: number;
}

export interface CTASection {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
    icon?: string; // Icon name as string
  };
  secondaryAction: {
    text: string;
    href: string;
    icon?: string; // Icon name as string
  };
  features: string[];
  urgencyNote?: string;
  trustIndicators?: Badge[];
}

// Main service page data interface
export interface ServicePageData {
  // Basic service information
  service: ServiceInfo;
  
  // Required sections
  hero: HeroSection;
  overview: OverviewSection;
  faqs: FAQSection;
  cta: CTASection;
  
  // Optional sections - allows service-specific customization
  process?: ProcessSection;
  riskFactors?: RiskFactorSection;
  treatments?: TreatmentSection;
  warnings?: WarningSection;
  sops?: SOPSection;
  differentiators?: DifferentiatorSection;
  testimonials?: TestimonialSection;
  
  // SEO and metadata
  seo: SEOData;
  
  // Additional configuration
  config?: {
    theme?: 'primary' | 'forest' | 'brown';
    showEmergencyBanner?: boolean;
    customSections?: string[];
  };
}

// Shared data interfaces
export interface DoctorInfo {
  name: string;
  title: string;
  qualifications: string[];
  experience: string;
  specializations: string[];
  image: string;
  bio: string;
  achievements?: string[];
  memberships?: string[];
}

export interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  facilities: string[];
  accreditations?: string[];
  timings: {
    days: string;
    hours: string;
  }[];
}

export interface SharedData {
  doctor: DoctorInfo;
  hospital: HospitalInfo;
  emergency: ContactInfo[];
  legal: {
    disclaimer: string;
    privacy: string;
    terms: string;
  };
}

// Utility types for working with service data
export type ServiceSlug = 
  | 'high-risk-pregnancy'
  | 'infertility-treatment'
  | 'pcos-pcod-treatment'
  | 'advanced-laparoscopy'
  | 'antenatal-care'
  | 'well-women-health'
  | 'general-consultation'
  | 'ovarian-cysts'
  | 'menstrual-disorders'
  | 'pregnancy-complications'
  | 'contraception-counseling'
  | 'menopause-management'
  | 'adolescent-gynecology'
  | 'fertility-preservation'
  | 'recurrent-pregnancy-loss'
  | 'gynecological-surgery';

export type SectionType = 
  | 'hero'
  | 'overview'
  | 'process'
  | 'riskFactors'
  | 'treatments'
  | 'faqs'
  | 'warnings'
  | 'sops'
  | 'differentiators'
  | 'testimonials'
  | 'cta';

// Template configuration interface
export interface TemplateConfig {
  enabledSections: SectionType[];
  theme: 'primary' | 'forest' | 'brown';
  layout: 'standard' | 'compact' | 'detailed';
  customizations?: {
    heroLayout?: 'standard' | 'centered' | 'split';
    showStatistics?: boolean;
    enableAnimations?: boolean;
    mobileOptimized?: boolean;
  };
}

// Validation interfaces
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ContentValidation {
  checkRequired: (data: ServicePageData) => ValidationResult;
  checkSEO: (seo: SEOData) => ValidationResult;
  checkAccessibility: (data: ServicePageData) => ValidationResult;
  checkMedicalCompliance: (data: ServicePageData) => ValidationResult;
}

// Export utility functions type
export interface ServiceUtils {
  generateMetadata: (data: ServicePageData) => any;
  validateContent: (data: ServicePageData) => ValidationResult;
  generateStructuredData: (data: ServicePageData) => object;
  optimizeForSEO: (data: ServicePageData) => ServicePageData;
}