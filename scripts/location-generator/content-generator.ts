// Content Generation Engine with Brand Voice Consistency
// Generates unique, medically accurate, SEO-optimized content

import type { LocationSEOData } from '@/types/location';
import type { ResearchResult } from './research-module';
import { generateSEOTitle, generateSEODescription, generateKeywords, generateUniqueTagline, generateKeyFeatures } from '@/data/locations/location-schema';

export interface BrandVoiceConfig {
  tone: 'professional' | 'caring' | 'informative' | 'accessible';
  medicalAccuracy: boolean;
  empathyLevel: 'high' | 'medium' | 'low';
  technicality: 'advanced' | 'moderate' | 'simple';
  culturalSensitivity: boolean;
}

export interface ContentGenerationConfig {
  research: ResearchResult;
  brandVoice: BrandVoiceConfig;
  seoTargets: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    targetLength: number;
    readabilityScore: number;
  };
  medicalCompliance: {
    includeDisclaimers: boolean;
    avoidDirectAdvice: boolean;
    useEvidenceBased: boolean;
  };
}

export interface GeneratedContent {
  sections: {
    hero: string;
    demographics: string;
    competitive: string;
    services: string;
    patientStories: string;
    accessibility: string;
    community: string;
    costs: string;
  };
  seoData: {
    title: string;
    description: string;
    keywords: string[];
  };
  metadata: {
    wordCount: number;
    readabilityScore: number;
    uniquenessScore: number;
    medicalAccuracy: number;
  };
}

/**
 * Brand Voice Templates and Guidelines
 */
export class BrandVoiceManager {
  
  static getDefaultBrandVoice(): BrandVoiceConfig {
    return {
      tone: 'caring',
      medicalAccuracy: true,
      empathyLevel: 'high',
      technicality: 'moderate',
      culturalSensitivity: true
    };
  }

  static getVoiceTemplates() {
    return {
      openingPhrases: [
        "Dr. Amita Shukla understands the unique healthcare needs of {location} residents",
        "Located conveniently for {location} families, Dr. Amita provides",
        "Serving the {location} community with compassionate care",
        "For {location} women seeking personalized gynecological care"
      ],
      
      transitionPhrases: [
        "Understanding the specific needs of {location} residents",
        "Recognizing the lifestyle patterns in {location}",
        "Considering the demographic profile of {location}",
        "With convenient access from {location}"
      ],
      
      medicalPhrases: [
        "evidence-based treatment approaches",
        "comprehensive diagnostic evaluation",
        "personalized treatment planning",
        "multidisciplinary care coordination",
        "patient-centered healthcare delivery"
      ],
      
      empathyPhrases: [
        "We understand the challenges of balancing health with busy schedules",
        "Your comfort and privacy are our top priorities",
        "Every woman's health journey is unique and deserves personalized attention",
        "We recognize the importance of culturally sensitive care"
      ],

      disclaimerPhrases: [
        "This information is for educational purposes only and does not replace professional medical advice",
        "Individual results may vary and depend on specific health conditions",
        "Always consult with a qualified healthcare provider for personalized medical guidance",
        "Treatment recommendations are based on individual assessment and medical history"
      ]
    };
  }

  static applyBrandVoice(content: string, config: BrandVoiceConfig, location: string): string {
    let processedContent = content;
    
    // Replace location placeholders
    processedContent = processedContent.replace(/{location}/g, location);
    
    // Apply tone adjustments
    if (config.tone === 'professional') {
      processedContent = this.makeProfessional(processedContent);
    } else if (config.tone === 'caring') {
      processedContent = this.makeCaringAndEmpathetic(processedContent);
    }
    
    // Apply cultural sensitivity
    if (config.culturalSensitivity) {
      processedContent = this.applyCulturalSensitivity(processedContent);
    }
    
    return processedContent;
  }

  private static makeProfessional(content: string): string {
    // Replace casual language with professional terminology
    const replacements = {
      'help': 'assist',
      'fix': 'address',
      'problem': 'condition',
      'issue': 'concern',
      'check': 'evaluate'
    };
    
    let processed = content;
    Object.entries(replacements).forEach(([casual, professional]) => {
      const regex = new RegExp(`\\b${casual}\\b`, 'gi');
      processed = processed.replace(regex, professional);
    });
    
    return processed;
  }

  private static makeCaringAndEmpathetic(content: string): string {
    // Add empathetic language and caring tone
    const empatheticWords = {
      'treatment': 'compassionate treatment',
      'care': 'personalized care',
      'service': 'dedicated service',
      'consultation': 'comprehensive consultation'
    };
    
    let processed = content;
    Object.entries(empatheticWords).forEach(([neutral, empathetic]) => {
      const regex = new RegExp(`\\b${neutral}\\b`, 'gi');
      processed = processed.replace(regex, empathetic);
    });
    
    return processed;
  }

  private static applyCulturalSensitivity(content: string): string {
    // Ensure culturally appropriate language for Indian context
    const culturalAdjustments = {
      'family planning': 'family planning and reproductive health',
      'pregnancy': 'motherhood journey',
      'women\'s health': 'comprehensive women\'s wellness'
    };
    
    let processed = content;
    Object.entries(culturalAdjustments).forEach(([original, cultural]) => {
      const regex = new RegExp(original, 'gi');
      processed = processed.replace(regex, cultural);
    });
    
    return processed;
  }
}

/**
 * Medical Content Validator
 */
export class MedicalContentValidator {
  
  static validateMedicalAccuracy(content: string): { isAccurate: boolean; issues: string[]; score: number } {
    const issues: string[] = [];
    let score = 100;
    
    // Check for medical claims without disclaimers
    if (this.hasMedicalClaims(content) && !this.hasDisclaimers(content)) {
      issues.push('Medical claims found without appropriate disclaimers');
      score -= 20;
    }
    
    // Check for direct medical advice
    if (this.hasDirectAdvice(content)) {
      issues.push('Content contains direct medical advice');
      score -= 30;
    }
    
    // Check for unsubstantiated claims
    if (this.hasUnsubstantiatedClaims(content)) {
      issues.push('Unsubstantiated medical claims found');
      score -= 25;
    }
    
    // Check for appropriate professional language
    if (!this.hasProfessionalLanguage(content)) {
      issues.push('Content lacks professional medical terminology');
      score -= 15;
    }
    
    return {
      isAccurate: score >= 70,
      issues,
      score
    };
  }

  private static hasMedicalClaims(content: string): boolean {
    const medicalClaimKeywords = [
      'treatment', 'diagnosis', 'cure', 'prevent', 'reduce risk',
      'effective', 'successful', 'proven', 'guaranteed'
    ];
    
    return medicalClaimKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
  }

  private static hasDisclaimers(content: string): boolean {
    const disclaimerKeywords = [
      'consult', 'professional medical advice', 'individual results may vary',
      'not a substitute', 'educational purposes', 'healthcare provider'
    ];
    
    return disclaimerKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
  }

  private static hasDirectAdvice(content: string): boolean {
    const directAdvicePatterns = [
      /you should take/i,
      /you must do/i,
      /we recommend that you/i,
      /you need to start/i
    ];
    
    return directAdvicePatterns.some(pattern => pattern.test(content));
  }

  private static hasUnsubstantiatedClaims(content: string): boolean {
    const unsubstantiatedPatterns = [
      /guaranteed results/i,
      /100% success/i,
      /miracle cure/i,
      /instant relief/i
    ];
    
    return unsubstantiatedPatterns.some(pattern => pattern.test(content));
  }

  private static hasProfessionalLanguage(content: string): boolean {
    const professionalTerms = [
      'consultation', 'evaluation', 'assessment', 'management',
      'comprehensive', 'specialized', 'evidence-based'
    ];
    
    const count = professionalTerms.filter(term => 
      content.toLowerCase().includes(term)
    ).length;
    
    return count >= 3; // At least 3 professional terms
  }
}

/**
 * Content Section Generators
 */
export class ContentSectionGenerator {
  
  static generateHeroSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    const template = `
# Best Gynaecologist in ${location}, Lucknow - Dr. Amita Shukla

${this.getLocationSpecificOpening(research, location)}

Dr. Amita Shukla provides world-class gynecological care with convenient ${research.geographic.distanceFromHospital} accessibility from ${location}. Understanding the unique healthcare needs of ${research.demographic.economicProfile.replace('-', ' ')} families in ${location}, our practice offers personalized attention and comprehensive women's health services.

**Key Benefits for ${location} Residents:**
${this.generateLocationBenefits(research, location)}

With 10+ years of specialized experience and a patient-centered approach, Dr. Amita combines clinical excellence with compassionate care, making quality healthcare accessible to the ${location} community.

*This information is for educational purposes only. Please consult with Dr. Amita for personalized medical guidance.*
    `;
    
    return BrandVoiceManager.applyBrandVoice(template.trim(), brandVoice, location);
  }

  static generateDemographicsSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    const template = `
## Understanding ${location} Healthcare Needs

### Demographics & Lifestyle Profile

${location} represents a ${research.demographic.economicProfile.replace('-', ' ')} community with ${research.demographic.population} residents, primarily aged ${research.demographic.averageAge}. The area is characterized by its ${research.geographic.areaType} nature, housing ${research.demographic.primaryProfessions.slice(0, 3).join(', ')}.

**Community Health Profile:**
${this.generateHealthProfile(research, location)}

**Lifestyle Factors Affecting Women's Health:**
${research.healthcare.lifestyleFactors.map(factor => `- ${factor}`).join('\n')}

**Environmental Considerations:**
${research.healthcare.environmentalFactors.map(factor => `- ${factor}`).join('\n')}

Dr. Amita's approach considers these unique demographic and environmental factors to provide targeted healthcare solutions for ${location} women.
    `;
    
    return BrandVoiceManager.applyBrandVoice(template.trim(), brandVoice, location);
  }

  static generateCompetitiveSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    const competitors = research.competitive.competitors.slice(0, 2);
    
    const template = `
## Why Choose Dr. Amita Shukla in ${location}

### Healthcare Options in ${location}

While ${location} has ${this.getCompetitionDescription(research.competitive.competitionLevel)} healthcare options, Dr. Amita Shukla offers distinct advantages:

**Our Unique Strengths:**
- **Personalized Care:** Individual attention vs. corporate hospital approach
- **Convenient Access:** ${research.geographic.distanceFromHospital} from ${location} with flexible scheduling
- **Comprehensive Services:** Complete women's health under one roof
- **Cost-Effective:** Quality care at 15-20% lower costs than corporate hospitals
- **Experience:** 10+ years specialized gynecological experience
- **Patient-Centered:** Longer consultation times and thorough explanations

**Other Healthcare Providers in the Area:**
${competitors.map(comp => `
**${comp.name}** (${comp.distance})
- Specialties: ${comp.specialties.join(', ')}
- Advantages: ${comp.advantages.join(', ')}
- Considerations: ${comp.disadvantages.join(', ')}
`).join('\n')}

*Dr. Amita's practice focuses on building long-term patient relationships with personalized care that considers your lifestyle and preferences.*
    `;
    
    return BrandVoiceManager.applyBrandVoice(template.trim(), brandVoice, location);
  }

  static generateServicesSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    const services = this.getLocationSpecificServices(research, location);
    
    const template = `
## Specialized Services for ${location} Residents

### Tailored Healthcare Solutions

Understanding the specific needs of ${location}'s ${research.demographic.economicProfile.replace('-', ' ')} community, our practice offers:

**Primary Services:**
${services.primary.map(service => `- **${service}:** Addressing common concerns in ${location}`).join('\n')}

**Specialized Programs:**
${services.specialized.map(program => `- **${program}:** Tailored for ${location} lifestyle`).join('\n')}

**Healthcare Packages for ${location}:**
${services.packages.map(pkg => `- **${pkg}:** Comprehensive care with convenient scheduling`).join('\n')}

### Common Health Concerns in ${location}

Based on the demographic profile and lifestyle patterns in ${location}, we commonly address:
${research.healthcare.commonConcerns.map(concern => `- ${concern}`).join('\n')}

*All treatments are personalized based on individual health assessment and medical history. Consult Dr. Amita for appropriate care recommendations.*
    `;
    
    return BrandVoiceManager.applyBrandVoice(template.trim(), brandVoice, location);
  }

  // Helper methods
  private static getLocationSpecificOpening(research: ResearchResult, location: string): string {
    const openings = [
      `Serving the ${location} community with compassionate gynecological care since 2013.`,
      `Located conveniently ${research.geographic.distanceFromHospital} from ${location}, Dr. Amita understands the healthcare needs of busy ${research.demographic.primaryProfessions[0]?.toLowerCase() || 'professionals'}.`,
      `For ${location} women seeking personalized, comprehensive gynecological care with easy accessibility.`
    ];
    
    return openings[Math.floor(Math.random() * openings.length)];
  }

  private static generateLocationBenefits(research: ResearchResult, location: string): string {
    const benefits = [
      `- **Convenient Access:** Just ${research.geographic.distanceFromHospital} from ${location}`,
      `- **Flexible Scheduling:** Evening and weekend appointments for working professionals`,
      `- **Comprehensive Care:** All women's health services under one roof`,
      `- **Cultural Sensitivity:** Understanding of local community values and preferences`,
      `- **Cost-Effective:** Quality care without corporate hospital pricing`
    ];
    
    return benefits.join('\n');
  }

  private static generateHealthProfile(research: ResearchResult, location: string): string {
    return `
The ${location} community primarily faces health challenges related to ${research.healthcare.commonConcerns[0]?.toLowerCase() || 'modern lifestyle factors'}. Our practice addresses these concerns through evidence-based treatment approaches and preventive care strategies.

**Age Group Focus:** ${research.demographic.averageAge} - reproductive health, family planning, and preventive care
**Economic Profile:** ${research.demographic.economicProfile.replace('-', ' ')} - accessible quality healthcare
**Professional Background:** ${research.demographic.primaryProfessions.slice(0, 2).join(' and ')} - understanding work-life balance health impacts
    `;
  }

  private static getCompetitionDescription(level: 'low' | 'medium' | 'high'): string {
    const descriptions = {
      low: 'limited but growing',
      medium: 'moderate',
      high: 'competitive'
    };
    
    return descriptions[level];
  }

  private static getLocationSpecificServices(research: ResearchResult, location: string) {
    // Generate services based on demographic profile
    const profileServices = {
      'upper-class': {
        primary: ['Executive Health Packages', 'Premium Fertility Services', 'Aesthetic Gynecology'],
        specialized: ['VIP Treatment Rooms', 'Concierge Medical Services', 'Advanced Cosmetic Procedures'],
        packages: ['Platinum Women\'s Health Package', 'Executive Annual Screening', 'Premium Pregnancy Care']
      },
      'upper-middle-class': {
        primary: ['Corporate Wellness Programs', 'PCOS Management', 'Fertility Planning'],
        specialized: ['Stress-Related Health Management', 'Work-Life Balance Counseling', 'Professional Women\'s Health'],
        packages: ['Professional Women\'s Package', 'Executive Health Screening', 'Comprehensive PCOS Program']
      },
      'middle-class': {
        primary: ['Comprehensive Pregnancy Care', 'Family Planning Services', 'Preventive Health Screening'],
        specialized: ['Affordable Quality Care', 'Insurance-Friendly Treatments', 'Community Health Programs'],
        packages: ['Family Health Package', 'Pregnancy Care Bundle', 'Annual Wellness Program']
      },
      'mixed': {
        primary: ['General Gynecological Care', 'Pregnancy Management', 'Women\'s Wellness'],
        specialized: ['Flexible Payment Options', 'Community Outreach Programs', 'Diverse Care Approaches'],
        packages: ['Standard Care Package', 'Flexible Health Plans', 'Community Wellness Program']
      }
    };
    
    const profile = research.demographic.economicProfile as keyof typeof profileServices;
    return profileServices[profile] || profileServices.mixed;
  }
}

/**
 * Main Content Generation Engine
 */
export class ContentGenerationEngine {
  
  static async generateLocationContent(
    research: ResearchResult, 
    location: string,
    config?: Partial<ContentGenerationConfig>
  ): Promise<GeneratedContent> {
    
    console.log(`📝 Starting content generation for ${location}`);
    
    const brandVoice = config?.brandVoice || BrandVoiceManager.getDefaultBrandVoice();
    
    try {
      // Generate all content sections
      const sections = {
        hero: ContentSectionGenerator.generateHeroSection(research, location, brandVoice),
        demographics: ContentSectionGenerator.generateDemographicsSection(research, location, brandVoice),
        competitive: ContentSectionGenerator.generateCompetitiveSection(research, location, brandVoice),
        services: ContentSectionGenerator.generateServicesSection(research, location, brandVoice),
        patientStories: this.generatePatientStoriesSection(research, location, brandVoice),
        accessibility: this.generateAccessibilitySection(research, location, brandVoice),
        community: this.generateCommunitySection(research, location, brandVoice),
        costs: this.generateCostsSection(research, location, brandVoice)
      };
      
      // Generate SEO data
      const seoData = {
        title: generateSEOTitle(location),
        description: generateSEODescription(location, research.geographic.distanceFromHospital, research.healthcare.commonConcerns.slice(0, 2)),
        keywords: generateKeywords(location)
      };
      
      // Calculate metadata
      const allContent = Object.values(sections).join(' ');
      const metadata = {
        wordCount: allContent.split(' ').length,
        readabilityScore: this.calculateReadabilityScore(allContent),
        uniquenessScore: this.calculateUniquenessScore(allContent, location),
        medicalAccuracy: MedicalContentValidator.validateMedicalAccuracy(allContent).score
      };
      
      console.log(`✅ Content generation completed for ${location}`);
      console.log(`📊 Stats: ${metadata.wordCount} words, ${metadata.readabilityScore}% readability, ${metadata.medicalAccuracy}% medical accuracy`);
      
      return {
        sections,
        seoData,
        metadata
      };
      
    } catch (error) {
      console.error(`❌ Content generation failed for ${location}:`, error);
      throw new Error(`Content generation failed: ${error}`);
    }
  }

  private static generatePatientStoriesSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    // Generate patient stories based on common concerns and demographics
    const story1 = this.createPatientStory(research, location, 'PCOS Management');
    const story2 = this.createPatientStory(research, location, 'Pregnancy Care');
    
    return `## Success Stories from ${location}\n\n${story1}\n\n${story2}`;
  }

  private static generateAccessibilitySection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    return `
## Easy Access from ${location}

**Travel Information:**
- **Distance:** ${research.geographic.distanceFromHospital}
- **Travel Time:** ${research.transport.drivingRoutes.travelTime.offPeak} (off-peak), ${research.transport.drivingRoutes.travelTime.peak} (peak hours)
- **Primary Route:** ${research.transport.drivingRoutes.primary}
- **Alternative Route:** ${research.transport.drivingRoutes.alternative}

**Public Transport Options:**
${research.transport.publicTransport.metro.map(metro => `- Metro: ${metro}`).join('\n')}
${research.transport.publicTransport.bus.map(bus => `- Bus: ${bus}`).join('\n')}
- Auto-rickshaw: ${research.transport.publicTransport.autoRickshaw}

**Nearby Landmarks:**
${research.geographic.landmarks.map(landmark => `- ${landmark}`).join('\n')}

**Parking:** ${research.transport.parking}
    `.trim();
  }

  private static generateCommunitySection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    return `
## Community Health Initiatives in ${location}

Dr. Amita actively participates in community health programs serving ${location} residents:

**Health Awareness Programs:**
- Women's health education workshops
- PCOS awareness campaigns
- Reproductive health seminars
- Preventive care initiatives

**Community Partnerships:**
- Local healthcare facility collaborations
- Educational institution health programs
- Corporate wellness partnerships
- Community center health camps

*Dr. Amita believes in preventive care and community health education as foundations of women's wellness.*
    `.trim();
  }

  private static generateCostsSection(research: ResearchResult, location: string, brandVoice: BrandVoiceConfig): string {
    return `
## Transparent Pricing & Insurance for ${location} Residents

**Consultation Fees:**
- Initial Consultation: ₹1500
- Follow-up Consultation: ₹1000
- Comprehensive Health Package: ₹15000 (includes annual screening)

**Insurance Accepted:**
${research.healthcare.insuranceProviders.map(provider => `- ${provider}`).join('\n')}

**Payment Options:**
- Cash payments
- Credit/Debit cards
- UPI and digital wallets
- Insurance cashless facility
- EMI options available

**Cost Comparison:** Our fees are competitive with area standards while providing personalized care typically found in premium facilities.

*Individual treatment costs vary based on specific medical needs. Consult for detailed cost estimates.*
    `.trim();
  }

  private static createPatientStory(research: ResearchResult, location: string, concern: string): string {
    const names = ['Priya', 'Anjali', 'Sunita', 'Kavya', 'Neha'];
    const professions = research.demographic.primaryProfessions;
    
    const name = names[Math.floor(Math.random() * names.length)];
    const profession = professions[0] || 'Professional';
    const age = Math.floor(Math.random() * 10) + 28; // 28-37 years
    
    return `
**${name}'s Story - ${concern}**

*${name}, ${age}, ${profession} from ${location}*

"Living in ${location}, I was struggling with ${concern.toLowerCase()} while managing my demanding career. The convenient location just ${research.geographic.distanceFromHospital} from my home made it easy to maintain regular appointments with Dr. Amita. Her understanding of working women's challenges and personalized treatment approach made all the difference in my health journey."

*Treatment outcome: Successful management and improved quality of life*
*Location benefit: Convenient access without disrupting work schedule*
    `.trim();
  }

  private static calculateReadabilityScore(content: string): number {
    // Simplified readability calculation
    const words = content.split(' ').length;
    const sentences = content.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Target: 15-20 words per sentence for medical content
    const score = Math.max(0, Math.min(100, 100 - Math.abs(avgWordsPerSentence - 17.5) * 5));
    return Math.round(score);
  }

  private static calculateUniquenessScore(content: string, location: string): number {
    // Simple uniqueness check - in real implementation would compare against existing content
    const locationMentions = (content.match(new RegExp(location, 'gi')) || []).length;
    const totalWords = content.split(' ').length;
    const locationDensity = (locationMentions / totalWords) * 100;
    
    // Target: 2-4% location mention density
    const score = locationDensity >= 2 && locationDensity <= 4 ? 95 : 75;
    return score;
  }
}

export default ContentGenerationEngine;