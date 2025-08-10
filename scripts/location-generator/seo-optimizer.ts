// SEO Optimization and Validation Pipeline
// Ensures generated content meets SEO best practices and search engine guidelines

import type { LocationSEOData } from '@/types/location';
import type { GeneratedContent } from './content-generator';
import type { ResearchResult } from './research-module';

export interface SEOValidationConfig {
  targetKeywordDensity: { min: number; max: number };
  minContentLength: number;
  maxContentLength: number;
  readabilityTarget: { min: number; max: number };
  schemaValidation: boolean;
  metaTagLimits: {
    titleMin: number;
    titleMax: number;
    descriptionMin: number;
    descriptionMax: number;
  };
}

export interface SEOMetrics {
  keywordDensity: {
    primary: number;
    secondary: number[];
    total: number;
  };
  contentLength: number;
  readabilityScore: number;
  metaTagScores: {
    title: SEOMetaScore;
    description: SEOMetaScore;
  };
  schemaValidation: SchemaValidationResult;
  internalLinking: InternalLinkingAnalysis;
  competitiveAnalysis: CompetitiveAnalysisResult;
}

export interface SEOMetaScore {
  length: number;
  isOptimal: boolean;
  keywordPresence: boolean;
  locationMention: boolean;
  score: number;
}

export interface SchemaValidationResult {
  isValid: boolean;
  schemas: string[];
  errors: string[];
  warnings: string[];
}

export interface InternalLinkingAnalysis {
  totalLinks: number;
  serviceLinks: number;
  locationLinks: number;
  recommendedLinks: string[];
}

export interface CompetitiveAnalysisResult {
  competitorMentions: number;
  differentiationCoverage: number;
  uniqueValuePropositions: string[];
}

export interface SEOOptimizationResult {
  overallScore: number;
  passesValidation: boolean;
  metrics: SEOMetrics;
  recommendations: SEORecommendation[];
  warnings: string[];
  errors: string[];
}

export interface SEORecommendation {
  type: 'critical' | 'high' | 'medium' | 'low';
  category: 'keyword' | 'content' | 'meta' | 'schema' | 'linking';
  issue: string;
  recommendation: string;
  impact: string;
}

/**
 * Keyword Analysis and Optimization
 */
export class KeywordAnalyzer {
  
  static analyzeKeywordDensity(content: string, keywords: string[]): { primary: number; secondary: number[]; total: number } {
    const totalWords = content.toLowerCase().split(/\s+/).length;
    const primaryKeyword = keywords[0]?.toLowerCase() || '';
    const secondaryKeywords = keywords.slice(1, 6).map(k => k.toLowerCase()); // Top 5 secondary
    
    // Count primary keyword density
    const primaryCount = this.countKeywordOccurrences(content, primaryKeyword);
    const primaryDensity = (primaryCount / totalWords) * 100;
    
    // Count secondary keyword densities
    const secondaryDensities = secondaryKeywords.map(keyword => {
      const count = this.countKeywordOccurrences(content, keyword);
      return (count / totalWords) * 100;
    });
    
    // Total keyword density
    const totalKeywordCount = primaryCount + secondaryKeywords.reduce((total, keyword) => {
      return total + this.countKeywordOccurrences(content, keyword);
    }, 0);
    const totalDensity = (totalKeywordCount / totalWords) * 100;
    
    return {
      primary: Math.round(primaryDensity * 100) / 100,
      secondary: secondaryDensities.map(d => Math.round(d * 100) / 100),
      total: Math.round(totalDensity * 100) / 100
    };
  }
  
  static countKeywordOccurrences(content: string, keyword: string): number {
    if (!keyword) return 0;
    
    const normalizedContent = content.toLowerCase();
    const normalizedKeyword = keyword.toLowerCase();
    
    // Count exact matches and variations
    const exactMatches = (normalizedContent.match(new RegExp(`\\b${this.escapeRegex(normalizedKeyword)}\\b`, 'g')) || []).length;
    
    // Count partial matches for multi-word keywords
    if (normalizedKeyword.includes(' ')) {
      const words = normalizedKeyword.split(' ');
      const partialMatches = words.reduce((count, word) => {
        return count + (normalizedContent.match(new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'g')) || []).length;
      }, 0);
      return exactMatches + (partialMatches * 0.3); // Weight partial matches less
    }
    
    return exactMatches;
  }
  
  static escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  static optimizeKeywordPlacement(content: string, keywords: string[], location: string): string {
    const primaryKeyword = keywords[0];
    if (!primaryKeyword) return content;
    
    let optimizedContent = content;
    
    // Ensure primary keyword appears in first paragraph
    const firstParagraphEnd = optimizedContent.indexOf('\n\n');
    if (firstParagraphEnd > 0) {
      const firstParagraph = optimizedContent.substring(0, firstParagraphEnd);
      if (!firstParagraph.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        // Insert keyword naturally into first paragraph
        const insertion = this.createNaturalKeywordInsertion(primaryKeyword, location);
        optimizedContent = optimizedContent.replace('\n\n', `. ${insertion}\n\n`);
      }
    }
    
    return optimizedContent;
  }
  
  private static createNaturalKeywordInsertion(keyword: string, location: string): string {
    const templates = [
      `As the ${keyword}, our focus is on comprehensive women's health`,
      `Residents of ${location} trust our expertise as the ${keyword}`,
      `Our practice stands out as the ${keyword} through personalized care`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }
}

/**
 * Content Quality and Readability Analysis
 */
export class ContentQualityAnalyzer {
  
  static calculateReadabilityScore(content: string): number {
    const sentences = this.countSentences(content);
    const words = this.countWords(content);
    const syllables = this.countSyllables(content);
    
    if (sentences === 0 || words === 0) return 0;
    
    // Flesch Reading Ease formula
    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    // Normalize to 0-100 scale
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  
  private static countSentences(content: string): number {
    const sentences = content.match(/[.!?]+/g);
    return sentences ? sentences.length : 1;
  }
  
  private static countWords(content: string): number {
    const words = content.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }
  
  private static countSyllables(content: string): number {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    return words.reduce((total, word) => {
      return total + this.syllablesInWord(word);
    }, 0);
  }
  
  private static syllablesInWord(word: string): number {
    const vowels = 'aeiouy';
    let count = 0;
    let previousWasVowel = false;
    
    for (const char of word) {
      const isVowel = vowels.includes(char);
      if (isVowel && !previousWasVowel) {
        count++;
      }
      previousWasVowel = isVowel;
    }
    
    // Handle silent 'e'
    if (word.endsWith('e') && count > 1) {
      count--;
    }
    
    return Math.max(1, count);
  }
  
  static analyzeContentStructure(content: string): {
    headingCount: number;
    paragraphCount: number;
    listCount: number;
    averageParagraphLength: number;
    hasIntroduction: boolean;
    hasConclusion: boolean;
  } {
    const headings = (content.match(/^#+\s+/gm) || []).length;
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const lists = (content.match(/^\s*[-*+]\s+/gm) || []).length;
    
    const avgParagraphLength = paragraphs.length > 0 
      ? paragraphs.reduce((sum, p) => sum + p.split(' ').length, 0) / paragraphs.length 
      : 0;
    
    const hasIntroduction = paragraphs.length > 0 && paragraphs[0].length > 200;
    const hasConclusion = paragraphs.length > 1 && 
      paragraphs[paragraphs.length - 1].toLowerCase().includes('appointment');
    
    return {
      headingCount: headings,
      paragraphCount: paragraphs.length,
      listCount: lists,
      averageParagraphLength: Math.round(avgParagraphLength),
      hasIntroduction,
      hasConclusion
    };
  }
}

/**
 * Meta Tag Optimization
 */
export class MetaTagOptimizer {
  
  static validateTitle(title: string, primaryKeyword: string, location: string, limits: { min: number; max: number }): SEOMetaScore {
    const length = title.length;
    const isOptimal = length >= limits.min && length <= limits.max;
    const keywordPresence = title.toLowerCase().includes(primaryKeyword.toLowerCase());
    const locationMention = title.toLowerCase().includes(location.toLowerCase());
    
    let score = 0;
    if (isOptimal) score += 40;
    if (keywordPresence) score += 30;
    if (locationMention) score += 20;
    if (title.includes('Dr. Amita Shukla')) score += 10;
    
    return {
      length,
      isOptimal,
      keywordPresence,
      locationMention,
      score
    };
  }
  
  static validateDescription(description: string, primaryKeyword: string, location: string, limits: { min: number; max: number }): SEOMetaScore {
    const length = description.length;
    const isOptimal = length >= limits.min && length <= limits.max;
    const keywordPresence = description.toLowerCase().includes(primaryKeyword.toLowerCase());
    const locationMention = description.toLowerCase().includes(location.toLowerCase());
    
    let score = 0;
    if (isOptimal) score += 30;
    if (keywordPresence) score += 25;
    if (locationMention) score += 20;
    if (description.includes('Dr. Amita Shukla')) score += 15;
    if (description.includes('book appointment')) score += 10;
    
    return {
      length,
      isOptimal,
      keywordPresence,
      locationMention,
      score
    };
  }
  
  static optimizeTitle(currentTitle: string, primaryKeyword: string, location: string, limits: { min: number; max: number }): string {
    // If current title is already optimal, return it
    const validation = this.validateTitle(currentTitle, primaryKeyword, location, limits);
    if (validation.score >= 80) {
      return currentTitle;
    }
    
    // Generate optimized title
    const templates = [
      `Best Gynaecologist in ${location}, Lucknow - Dr. Amita Shukla | SCT Trust`,
      `${primaryKeyword} - Dr. Amita Shukla | Expert Care in ${location}`,
      `Dr. Amita Shukla - Leading Gynecologist in ${location}, Lucknow | Book Now`
    ];
    
    // Choose template that fits length limits
    for (const template of templates) {
      if (template.length >= limits.min && template.length <= limits.max) {
        return template;
      }
    }
    
    // Fallback: trim current title to fit
    return currentTitle.length > limits.max 
      ? currentTitle.substring(0, limits.max - 3) + '...'
      : currentTitle;
  }
  
  static optimizeDescription(currentDescription: string, primaryKeyword: string, location: string, limits: { min: number; max: number }): string {
    const validation = this.validateDescription(currentDescription, primaryKeyword, location, limits);
    if (validation.score >= 70) {
      return currentDescription;
    }
    
    const template = `Dr. Amita Shukla - Leading gynecologist serving ${location}, Lucknow with comprehensive women's health services including pregnancy care, PCOS treatment, fertility consultation. Book appointment today.`;
    
    // Ensure it fits limits
    if (template.length > limits.max) {
      return template.substring(0, limits.max - 3) + '...';
    }
    
    return template.length >= limits.min ? template : currentDescription;
  }
}

/**
 * Schema Markup Validator
 */
export class SchemaValidator {
  
  static validateLocationSchema(locationData: LocationSEOData): SchemaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const schemas: string[] = [];
    
    // Required fields validation
    if (!locationData.coordinates.latitude || !locationData.coordinates.longitude) {
      errors.push('Missing geographic coordinates');
    }
    
    if (!locationData.seoData.title || !locationData.seoData.description) {
      errors.push('Missing essential SEO data');
    }
    
    if (!locationData.serviceFocus.primary || locationData.serviceFocus.primary.length === 0) {
      errors.push('No primary services defined');
    }
    
    // Schema completeness
    schemas.push('LocalBusiness');
    schemas.push('MedicalOrganization');
    
    if (locationData.patientStories && locationData.patientStories.length > 0) {
      schemas.push('Review');
    }
    
    if (locationData.serviceFocus.primary.length > 0) {
      schemas.push('MedicalProcedure');
    }
    
    // Warnings for optional but recommended fields
    if (!locationData.communityInitiatives.healthCamps.length) {
      warnings.push('No community initiatives defined - consider adding for better local relevance');
    }
    
    if (!locationData.competitors || locationData.competitors.length === 0) {
      warnings.push('No competitor analysis - may miss differentiation opportunities');
    }
    
    return {
      isValid: errors.length === 0,
      schemas,
      errors,
      warnings
    };
  }
  
  static generateSchemaMarkup(locationData: LocationSEOData): object {
    return {
      "@context": "https://schema.org",
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "@id": `https://www.dramitashukla.com/gynecologist-in-${locationData.slug}#organization`,
      "name": `Dr. Amita Shukla - Best Gynaecologist in ${locationData.displayName}`,
      "alternateName": `Dr. Amita Shukla ${locationData.displayName}`,
      "description": locationData.seoData.description,
      "url": `https://www.dramitashukla.com/gynecologist-in-${locationData.slug}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SCT Trust Hospital, Sector-2, Viraj Khand",
        "addressLocality": "Gomti Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": locationData.coordinates.latitude,
        "longitude": locationData.coordinates.longitude
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": locationData.coordinates.latitude,
          "longitude": locationData.coordinates.longitude
        },
        "geoRadius": locationData.seoData.schema.serviceArea.geoRadius
      },
      "availableService": locationData.serviceFocus.primary.map(service => ({
        "@type": "MedicalProcedure",
        "name": service
      })),
      "physician": {
        "@type": "Person",
        "name": "Dr. Amita Shukla",
        "jobTitle": "Gynecologist & Obstetrician"
      }
    };
  }
}

/**
 * Internal Linking Analyzer
 */
export class InternalLinkingAnalyzer {
  
  static analyzeInternalLinks(content: string, locationData: LocationSEOData): InternalLinkingAnalysis {
    const serviceLinks = this.countServiceLinks(content);
    const locationLinks = this.countLocationLinks(content);
    const totalLinks = serviceLinks + locationLinks;
    
    const recommendedLinks = this.generateRecommendedLinks(locationData);
    
    return {
      totalLinks,
      serviceLinks,
      locationLinks,
      recommendedLinks
    };
  }
  
  private static countServiceLinks(content: string): number {
    const serviceLinkPatterns = [
      /\/services\//g,
      /high-risk-pregnancy/g,
      /pcos-pcod-treatment/g,
      /infertility-treatment/g,
      /laparoscopy/g
    ];
    
    return serviceLinkPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);
  }
  
  private static countLocationLinks(content: string): number {
    const locationLinkPatterns = [
      /\/about/g,
      /\/contact/g,
      /\/gallery/g
    ];
    
    return locationLinkPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);
  }
  
  private static generateRecommendedLinks(locationData: LocationSEOData): string[] {
    const recommendations: string[] = [];
    
    // Service-based recommendations
    if (locationData.serviceFocus.primary.includes('High-Risk Pregnancy Management')) {
      recommendations.push('/services/high-risk-pregnancy - Link to specialized pregnancy care page');
    }
    
    if (locationData.serviceFocus.primary.includes('PCOS/PCOD Treatment')) {
      recommendations.push('/services/pcos-pcod-treatment - Link to PCOS treatment information');
    }
    
    // Location-based recommendations
    recommendations.push('/about - Link to Dr. Amita\'s profile for credibility');
    recommendations.push('/contact - Link to appointment booking');
    
    // Nearby locations (if applicable)
    const nearbyAreas = ['gomti-nagar', 'hazratganj', 'indira-nagar'];
    const currentSlug = locationData.slug;
    
    nearbyAreas.forEach(area => {
      if (area !== currentSlug) {
        recommendations.push(`/gynecologist-in-${area} - Cross-reference nearby areas`);
      }
    });
    
    return recommendations;
  }
}

/**
 * Competitive Analysis for SEO
 */
export class CompetitiveAnalyzer {
  
  static analyzeCompetitiveMentions(content: string, competitors: any[]): CompetitiveAnalysisResult {
    const competitorNames = competitors.map(comp => comp.name.toLowerCase());
    const contentLower = content.toLowerCase();
    
    const competitorMentions = competitorNames.reduce((count, name) => {
      return count + (contentLower.includes(name) ? 1 : 0);
    }, 0);
    
    // Analyze differentiation coverage
    const differentiationKeywords = [
      'personalized care', 'individual attention', 'comprehensive',
      'experienced', 'convenient', 'accessible', 'quality',
      'affordable', 'specialized', 'expert'
    ];
    
    const differentiationCoverage = differentiationKeywords.filter(keyword => 
      contentLower.includes(keyword)
    ).length / differentiationKeywords.length * 100;
    
    const uniqueValuePropositions = this.extractValuePropositions(content);
    
    return {
      competitorMentions,
      differentiationCoverage: Math.round(differentiationCoverage),
      uniqueValuePropositions
    };
  }
  
  private static extractValuePropositions(content: string): string[] {
    const propositions: string[] = [];
    const content_lower = content.toLowerCase();
    
    if (content_lower.includes('10+ years')) {
      propositions.push('Extensive experience (10+ years)');
    }
    
    if (content_lower.includes('personalized')) {
      propositions.push('Personalized care approach');
    }
    
    if (content_lower.includes('convenient') || content_lower.includes('accessible')) {
      propositions.push('Convenient accessibility');
    }
    
    if (content_lower.includes('cost-effective') || content_lower.includes('affordable')) {
      propositions.push('Cost-effective quality care');
    }
    
    if (content_lower.includes('comprehensive')) {
      propositions.push('Comprehensive women\'s health services');
    }
    
    return propositions;
  }
}

/**
 * Main SEO Optimization Engine
 */
export class SEOOptimizer {
  
  static getDefaultConfig(): SEOValidationConfig {
    return {
      targetKeywordDensity: { min: 1.5, max: 3.5 },
      minContentLength: 2000,
      maxContentLength: 4000,
      readabilityTarget: { min: 60, max: 80 },
      schemaValidation: true,
      metaTagLimits: {
        titleMin: 50,
        titleMax: 60,
        descriptionMin: 150,
        descriptionMax: 160
      }
    };
  }
  
  static async optimizeAndValidate(
    locationData: LocationSEOData,
    content: GeneratedContent,
    research: ResearchResult,
    config: SEOValidationConfig = this.getDefaultConfig()
  ): Promise<SEOOptimizationResult> {
    
    console.log(`🔍 Starting SEO optimization for ${locationData.displayName}`);
    
    const recommendations: SEORecommendation[] = [];
    const warnings: string[] = [];
    const errors: string[] = [];
    
    try {
      // Combine all content for analysis
      const allContent = Object.values(content.sections).join(' ');
      const primaryKeyword = content.seoData.keywords[0] || '';
      
      // 1. Keyword Analysis
      const keywordDensity = KeywordAnalyzer.analyzeKeywordDensity(allContent, content.seoData.keywords);
      
      if (keywordDensity.primary < config.targetKeywordDensity.min) {
        recommendations.push({
          type: 'high',
          category: 'keyword',
          issue: `Primary keyword density too low: ${keywordDensity.primary}%`,
          recommendation: `Increase primary keyword "${primaryKeyword}" usage to ${config.targetKeywordDensity.min}-${config.targetKeywordDensity.max}%`,
          impact: 'May reduce search ranking potential'
        });
      } else if (keywordDensity.primary > config.targetKeywordDensity.max) {
        recommendations.push({
          type: 'medium',
          category: 'keyword',
          issue: `Primary keyword density too high: ${keywordDensity.primary}%`,
          recommendation: `Reduce primary keyword density to avoid over-optimization`,
          impact: 'Risk of keyword stuffing penalties'
        });
      }
      
      // 2. Content Length Validation
      const contentLength = allContent.split(' ').length;
      
      if (contentLength < config.minContentLength) {
        recommendations.push({
          type: 'critical',
          category: 'content',
          issue: `Content too short: ${contentLength} words`,
          recommendation: `Expand content to at least ${config.minContentLength} words`,
          impact: 'Insufficient content for SEO ranking'
        });
      }
      
      // 3. Readability Analysis
      const readabilityScore = ContentQualityAnalyzer.calculateReadabilityScore(allContent);
      
      if (readabilityScore < config.readabilityTarget.min || readabilityScore > config.readabilityTarget.max) {
        recommendations.push({
          type: 'medium',
          category: 'content',
          issue: `Readability score: ${readabilityScore} (target: ${config.readabilityTarget.min}-${config.readabilityTarget.max})`,
          recommendation: readabilityScore < config.readabilityTarget.min ? 'Simplify language and sentence structure' : 'Add more complex sentences for variety',
          impact: 'User experience and engagement affected'
        });
      }
      
      // 4. Meta Tag Analysis
      const titleScore = MetaTagOptimizer.validateTitle(content.seoData.title, primaryKeyword, locationData.displayName, config.metaTagLimits);
      const descriptionScore = MetaTagOptimizer.validateDescription(content.seoData.description, primaryKeyword, locationData.displayName, config.metaTagLimits);
      
      if (titleScore.score < 80) {
        recommendations.push({
          type: 'high',
          category: 'meta',
          issue: `Title tag optimization needed (score: ${titleScore.score}/100)`,
          recommendation: 'Optimize title for length, keyword presence, and location mention',
          impact: 'Search result click-through rate affected'
        });
      }
      
      if (descriptionScore.score < 70) {
        recommendations.push({
          type: 'medium',
          category: 'meta',
          issue: `Meta description needs improvement (score: ${descriptionScore.score}/100)`,
          recommendation: 'Optimize description for length, keywords, and call-to-action',
          impact: 'Search result attractiveness and CTR affected'
        });
      }
      
      // 5. Schema Validation
      const schemaValidation = SchemaValidator.validateLocationSchema(locationData);
      
      if (!schemaValidation.isValid) {
        recommendations.push({
          type: 'critical',
          category: 'schema',
          issue: 'Schema markup validation failed',
          recommendation: `Fix schema errors: ${schemaValidation.errors.join(', ')}`,
          impact: 'Reduced rich snippet opportunities'
        });
      }
      
      schemaValidation.warnings.forEach(warning => {
        warnings.push(warning);
      });
      
      // 6. Internal Linking Analysis
      const linkingAnalysis = InternalLinkingAnalyzer.analyzeInternalLinks(allContent, locationData);
      
      if (linkingAnalysis.totalLinks < 5) {
        recommendations.push({
          type: 'medium',
          category: 'linking',
          issue: `Limited internal links: ${linkingAnalysis.totalLinks}`,
          recommendation: 'Add more internal links to services and related pages',
          impact: 'Reduced page authority and user navigation'
        });
      }
      
      // 7. Competitive Analysis
      const competitiveAnalysis = CompetitiveAnalyzer.analyzeCompetitiveMentions(allContent, locationData.competitors);
      
      if (competitiveAnalysis.differentiationCoverage < 60) {
        recommendations.push({
          type: 'medium',
          category: 'content',
          issue: `Low differentiation coverage: ${competitiveAnalysis.differentiationCoverage}%`,
          recommendation: 'Strengthen unique value propositions and competitive advantages',
          impact: 'Reduced competitive positioning'
        });
      }
      
      // Compile metrics
      const metrics: SEOMetrics = {
        keywordDensity,
        contentLength,
        readabilityScore,
        metaTagScores: {
          title: titleScore,
          description: descriptionScore
        },
        schemaValidation,
        internalLinking: linkingAnalysis,
        competitiveAnalysis
      };
      
      // Calculate overall score
      const overallScore = this.calculateOverallScore(metrics, recommendations);
      const passesValidation = overallScore >= 75 && recommendations.filter(r => r.type === 'critical').length === 0;
      
      console.log(`✅ SEO optimization completed for ${locationData.displayName}`);
      console.log(`📊 Overall Score: ${overallScore}/100`);
      console.log(`🎯 Passes Validation: ${passesValidation ? 'Yes' : 'No'}`);
      
      return {
        overallScore,
        passesValidation,
        metrics,
        recommendations,
        warnings,
        errors
      };
      
    } catch (error) {
      errors.push(`SEO optimization failed: ${error}`);
      console.error(`❌ SEO optimization failed for ${locationData.displayName}:`, error);
      
      return {
        overallScore: 0,
        passesValidation: false,
        metrics: {} as SEOMetrics,
        recommendations,
        warnings,
        errors
      };
    }
  }
  
  private static calculateOverallScore(metrics: SEOMetrics, recommendations: SEORecommendation[]): number {
    let score = 100;
    
    // Deduct points based on recommendations
    recommendations.forEach(rec => {
      switch (rec.type) {
        case 'critical':
          score -= 25;
          break;
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 8;
          break;
        case 'low':
          score -= 3;
          break;
      }
    });
    
    // Ensure minimum score
    return Math.max(0, Math.min(100, score));
  }
  
  static generateSEOReport(result: SEOOptimizationResult, location: string): string {
    const report = `
# SEO Optimization Report - ${location}

## Overall Performance
- **Score**: ${result.overallScore}/100
- **Validation Status**: ${result.passesValidation ? '✅ PASSED' : '❌ NEEDS IMPROVEMENT'}

## Content Metrics
- **Length**: ${result.metrics.contentLength} words
- **Readability**: ${result.metrics.readabilityScore}/100
- **Primary Keyword Density**: ${result.metrics.keywordDensity?.primary}%

## Meta Tags
- **Title Score**: ${result.metrics.metaTagScores?.title.score}/100
- **Description Score**: ${result.metrics.metaTagScores?.description.score}/100

## Recommendations (${result.recommendations.length})
${result.recommendations.map((rec, i) => 
  `${i + 1}. **${rec.type.toUpperCase()}** - ${rec.issue}\n   *Solution*: ${rec.recommendation}\n   *Impact*: ${rec.impact}`
).join('\n\n')}

## Warnings (${result.warnings.length})
${result.warnings.map((warning, i) => `${i + 1}. ${warning}`).join('\n')}

## Schema Validation
- **Status**: ${result.metrics.schemaValidation?.isValid ? '✅ Valid' : '❌ Invalid'}
- **Schemas**: ${result.metrics.schemaValidation?.schemas.join(', ') || 'None'}

## Internal Linking
- **Total Links**: ${result.metrics.internalLinking?.totalLinks}
- **Service Links**: ${result.metrics.internalLinking?.serviceLinks}
- **Recommended Additions**: ${result.metrics.internalLinking?.recommendedLinks.length}

---
*Generated by SEO Optimization Pipeline*
    `;
    
    return report.trim();
  }
}

export default SEOOptimizer;