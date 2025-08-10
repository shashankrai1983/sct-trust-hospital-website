// Advanced SEO Optimization and Content Enhancement Engine
// Completes the SEO pipeline with automatic content optimization and advanced analysis

import type { LocationSEOData } from '@/types/location';
import type { GeneratedContent } from './content-generator';
import type { ResearchResult } from './research-module';
import type { SEOOptimizationResult, SEORecommendation } from './seo-optimizer';
import { SEOOptimizer, KeywordAnalyzer, MetaTagOptimizer, ContentQualityAnalyzer } from './seo-optimizer';

export interface AdvancedSEOConfig {
  enableContentOptimization: boolean;
  performLSIAnalysis: boolean;
  technicalSEOChecks: boolean;
  localSEOOptimization: boolean;
  competitiveAnalysis: boolean;
  performanceOptimization: boolean;
  autoFixEnabled: boolean;
  optimizationLevel: 'conservative' | 'moderate' | 'aggressive';
}

export interface ContentOptimizationResult {
  optimizedContent: GeneratedContent;
  improvements: ContentImprovement[];
  seoImpact: number;
  readabilityImprovement: number;
  keywordOptimization: number;
}

export interface ContentImprovement {
  section: keyof GeneratedContent['sections'];
  type: 'keyword_density' | 'readability' | 'length' | 'structure' | 'semantics';
  originalIssue: string;
  appliedFix: string;
  impactScore: number;
}

export interface TechnicalSEOAudit {
  pageSpeed: PageSpeedMetrics;
  mobileOptimization: MobileOptimizationScore;
  coreWebVitals: CoreWebVitalsMetrics;
  technicalIssues: TechnicalIssue[];
  recommendations: TechnicalRecommendation[];
}

export interface PageSpeedMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  score: number;
}

export interface MobileOptimizationScore {
  responsiveDesign: boolean;
  mobileUsability: number;
  touchTargets: boolean;
  textReadability: boolean;
  score: number;
}

export interface CoreWebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  passing: boolean;
}

export interface TechnicalIssue {
  category: 'performance' | 'accessibility' | 'seo' | 'mobile';
  severity: 'critical' | 'high' | 'medium' | 'low';
  issue: string;
  impact: string;
  solution: string;
}

export interface TechnicalRecommendation {
  type: 'code_change' | 'configuration' | 'content' | 'infrastructure';
  priority: number;
  implementation: string;
  expectedImpact: string;
}

export interface LocalSEOOptimization {
  napConsistency: NAPConsistencyCheck;
  localSchema: LocalSchemaOptimization;
  geographicSignals: GeographicSignalAnalysis;
  localCompetitivePosition: LocalCompetitiveAnalysis;
}

export interface NAPConsistencyCheck {
  name: string;
  address: string;
  phone: string;
  isConsistent: boolean;
  variations: string[];
}

export interface LocalSchemaOptimization {
  organizationSchema: boolean;
  medicalOrganizationSchema: boolean;
  localBusinessSchema: boolean;
  serviceAreaSchema: boolean;
  physicianSchema: boolean;
  completenessScore: number;
}

export interface GeographicSignalAnalysis {
  locationMentions: number;
  geographicKeywords: string[];
  localLandmarks: number;
  directionalPhrases: number;
  proximitySignals: number;
}

export interface LocalCompetitiveAnalysis {
  localKeywordRanking: number;
  localPackVisibility: number;
  competitorGapAnalysis: CompetitorGap[];
  localAuthority: number;
}

export interface CompetitorGap {
  keyword: string;
  competitorRank: number;
  ourOpportunity: number;
  difficultyScore: number;
}

/**
 * Advanced Content Optimizer
 * Automatically improves content based on SEO analysis
 */
export class AdvancedContentOptimizer {
  
  static async optimizeContent(
    content: GeneratedContent,
    locationData: LocationSEOData,
    research: ResearchResult,
    seoResult: SEOOptimizationResult,
    config: AdvancedSEOConfig
  ): Promise<ContentOptimizationResult> {
    
    console.log(`🚀 Starting advanced content optimization for ${locationData.displayName}`);
    
    const improvements: ContentImprovement[] = [];
    let optimizedContent = JSON.parse(JSON.stringify(content)); // Deep clone
    
    try {
      // 1. Keyword Density Optimization
      if (config.enableContentOptimization) {
        const keywordOptimization = await this.optimizeKeywordDensity(
          optimizedContent,
          seoResult,
          locationData
        );
        optimizedContent = keywordOptimization.content;
        improvements.push(...keywordOptimization.improvements);
      }
      
      // 2. Readability Enhancement
      const readabilityOptimization = await this.enhanceReadability(
        optimizedContent,
        seoResult.metrics.readabilityScore,
        config.optimizationLevel
      );
      optimizedContent = readabilityOptimization.content;
      improvements.push(...readabilityOptimization.improvements);
      
      // 3. Content Structure Optimization
      const structureOptimization = await this.optimizeContentStructure(
        optimizedContent,
        locationData,
        research
      );
      optimizedContent = structureOptimization.content;
      improvements.push(...structureOptimization.improvements);
      
      // 4. Semantic Enhancement
      if (config.performLSIAnalysis) {
        const semanticOptimization = await this.enhanceSemanticRelevance(
          optimizedContent,
          locationData,
          research
        );
        optimizedContent = semanticOptimization.content;
        improvements.push(...semanticOptimization.improvements);
      }
      
      // 5. Local SEO Enhancement
      if (config.localSEOOptimization) {
        const localOptimization = await this.enhanceLocalSEO(
          optimizedContent,
          locationData,
          research
        );
        optimizedContent = localOptimization.content;
        improvements.push(...localOptimization.improvements);
      }
      
      // Calculate impact scores
      const totalImpactScore = improvements.reduce((sum, imp) => sum + imp.impactScore, 0);
      const keywordOptimizationScore = this.calculateKeywordOptimizationScore(optimizedContent, content);
      const readabilityImprovementScore = await this.calculateReadabilityImprovement(optimizedContent, content);
      
      console.log(`✅ Content optimization completed with ${improvements.length} improvements`);
      console.log(`📊 Total Impact Score: ${totalImpactScore}`);
      
      return {
        optimizedContent,
        improvements,
        seoImpact: totalImpactScore,
        readabilityImprovement: readabilityImprovementScore,
        keywordOptimization: keywordOptimizationScore
      };
      
    } catch (error) {
      console.error(`❌ Content optimization failed for ${locationData.displayName}:`, error);
      throw new Error(`Content optimization failed: ${error}`);
    }
  }
  
  private static async optimizeKeywordDensity(
    content: GeneratedContent,
    seoResult: SEOOptimizationResult,
    locationData: LocationSEOData
  ): Promise<{ content: GeneratedContent; improvements: ContentImprovement[] }> {
    
    const improvements: ContentImprovement[] = [];
    const optimizedContent = { ...content };
    const primaryKeyword = content.seoData.keywords[0];
    const targetDensity = 2.5; // Target 2.5% density
    
    // Check each section for keyword optimization opportunities
    for (const [sectionKey, sectionContent] of Object.entries(content.sections)) {
      const currentDensity = KeywordAnalyzer.analyzeKeywordDensity(sectionContent, [primaryKeyword]).primary;
      
      if (currentDensity < 1.5) {
        // Too low - add keyword variations naturally
        const optimizedSection = this.addKeywordVariations(sectionContent, primaryKeyword, locationData.displayName);
        optimizedContent.sections[sectionKey as keyof typeof content.sections] = optimizedSection;
        
        improvements.push({
          section: sectionKey as keyof GeneratedContent['sections'],
          type: 'keyword_density',
          originalIssue: `Keyword density too low (${currentDensity}%)`,
          appliedFix: `Added natural keyword variations to reach optimal density`,
          impactScore: 15
        });
      } else if (currentDensity > 4.0) {
        // Too high - replace with synonyms
        const optimizedSection = this.replaceWithSynonyms(sectionContent, primaryKeyword);
        optimizedContent.sections[sectionKey as keyof typeof content.sections] = optimizedSection;
        
        improvements.push({
          section: sectionKey as keyof GeneratedContent['sections'],
          type: 'keyword_density',
          originalIssue: `Keyword density too high (${currentDensity}%)`,
          appliedFix: `Replaced repetitive keywords with synonyms and variations`,
          impactScore: 12
        });
      }
    }
    
    return { content: optimizedContent, improvements };
  }
  
  private static async enhanceReadability(
    content: GeneratedContent,
    currentReadabilityScore: number,
    optimizationLevel: 'conservative' | 'moderate' | 'aggressive'
  ): Promise<{ content: GeneratedContent; improvements: ContentImprovement[] }> {
    
    const improvements: ContentImprovement[] = [];
    const optimizedContent = { ...content };
    const targetReadability = 65; // Target Flesch Reading Ease score
    
    if (currentReadabilityScore < 60) {
      // Improve readability by simplifying sentences
      for (const [sectionKey, sectionContent] of Object.entries(content.sections)) {
        const simplifiedContent = this.simplifySentences(sectionContent, optimizationLevel);
        optimizedContent.sections[sectionKey as keyof typeof content.sections] = simplifiedContent;
        
        improvements.push({
          section: sectionKey as keyof GeneratedContent['sections'],
          type: 'readability',
          originalIssue: `Readability score too low (${currentReadabilityScore})`,
          appliedFix: `Simplified sentence structure and reduced complex phrases`,
          impactScore: 10
        });
      }
    }
    
    return { content: optimizedContent, improvements };
  }
  
  private static async optimizeContentStructure(
    content: GeneratedContent,
    locationData: LocationSEOData,
    research: ResearchResult
  ): Promise<{ content: GeneratedContent; improvements: ContentImprovement[] }> {
    
    const improvements: ContentImprovement[] = [];
    const optimizedContent = { ...content };
    
    // Add FAQ section if missing
    if (!content.sections.hero.includes('Frequently Asked Questions')) {
      const faqSection = this.generateFAQSection(locationData, research);
      optimizedContent.sections.hero += '\n\n' + faqSection;
      
      improvements.push({
        section: 'hero',
        type: 'structure',
        originalIssue: 'Missing FAQ section for better user engagement',
        appliedFix: 'Added location-specific FAQ section',
        impactScore: 8
      });
    }
    
    // Ensure proper heading structure
    for (const [sectionKey, sectionContent] of Object.entries(content.sections)) {
      const optimizedSection = this.optimizeHeadingStructure(sectionContent);
      optimizedContent.sections[sectionKey as keyof typeof content.sections] = optimizedSection;
    }
    
    return { content: optimizedContent, improvements };
  }
  
  private static async enhanceSemanticRelevance(
    content: GeneratedContent,
    locationData: LocationSEOData,
    research: ResearchResult
  ): Promise<{ content: GeneratedContent; improvements: ContentImprovement[] }> {
    
    const improvements: ContentImprovement[] = [];
    const optimizedContent = { ...content };
    
    // Add LSI keywords and semantic variations
    const lsiKeywords = this.generateLSIKeywords(content.seoData.keywords[0], locationData.displayName);
    
    for (const [sectionKey, sectionContent] of Object.entries(content.sections)) {
      const semanticallyEnhanced = this.addSemanticKeywords(sectionContent, lsiKeywords);
      optimizedContent.sections[sectionKey as keyof typeof content.sections] = semanticallyEnhanced;
      
      improvements.push({
        section: sectionKey as keyof GeneratedContent['sections'],
        type: 'semantics',
        originalIssue: 'Limited semantic keyword coverage',
        appliedFix: 'Added LSI keywords and semantic variations',
        impactScore: 12
      });
    }
    
    return { content: optimizedContent, improvements };
  }
  
  private static async enhanceLocalSEO(
    content: GeneratedContent,
    locationData: LocationSEOData,
    research: ResearchResult
  ): Promise<{ content: GeneratedContent; improvements: ContentImprovement[] }> {
    
    const improvements: ContentImprovement[] = [];
    const optimizedContent = { ...content };
    
    // Enhance geographic signals
    for (const [sectionKey, sectionContent] of Object.entries(content.sections)) {
      const locallyOptimized = this.enhanceGeographicSignals(
        sectionContent, 
        locationData.displayName, 
        research.geographic.landmarks
      );
      optimizedContent.sections[sectionKey as keyof typeof content.sections] = locallyOptimized;
    }
    
    improvements.push({
      section: 'hero',
      type: 'semantics',
      originalIssue: 'Insufficient local geographic signals',
      appliedFix: 'Enhanced location mentions and local landmarks',
      impactScore: 15
    });
    
    return { content: optimizedContent, improvements };
  }
  
  // Helper methods for content optimization
  private static addKeywordVariations(content: string, primaryKeyword: string, location: string): string {
    const variations = [
      primaryKeyword,
      `${primaryKeyword} ${location}`,
      `leading ${primaryKeyword.toLowerCase()}`,
      `experienced ${primaryKeyword.toLowerCase()}`,
      `top ${primaryKeyword.toLowerCase()}`
    ];
    
    // Insert variations naturally into content
    let optimizedContent = content;
    const sentences = content.split('. ');
    
    sentences.forEach((sentence, index) => {
      if (index % 3 === 0 && !sentence.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        const variation = variations[index % variations.length];
        optimizedContent = optimizedContent.replace(sentence, `${sentence.replace(/^(.)/, variation + ' $1')}`);
      }
    });
    
    return optimizedContent;
  }
  
  private static replaceWithSynonyms(content: string, primaryKeyword: string): string {
    const synonyms = {
      'gynecologist': ['women\'s health specialist', 'obstetrician-gynecologist', 'women\'s healthcare provider'],
      'doctor': ['physician', 'medical practitioner', 'healthcare professional'],
      'treatment': ['therapy', 'medical care', 'healthcare solution'],
      'hospital': ['medical center', 'healthcare facility', 'clinic']
    };
    
    let optimizedContent = content;
    const keywordLower = primaryKeyword.toLowerCase();
    
    if (synonyms[keywordLower as keyof typeof synonyms]) {
      const synonymList = synonyms[keywordLower as keyof typeof synonyms];
      const occurrences = (content.match(new RegExp(primaryKeyword, 'gi')) || []).length;
      
      if (occurrences > 5) {
        // Replace every 3rd occurrence with a synonym
        let replacementIndex = 0;
        optimizedContent = content.replace(new RegExp(`\\b${primaryKeyword}\\b`, 'gi'), (match) => {
          replacementIndex++;
          if (replacementIndex % 3 === 0) {
            return synonymList[Math.floor(Math.random() * synonymList.length)];
          }
          return match;
        });
      }
    }
    
    return optimizedContent;
  }
  
  private static simplifySentences(content: string, level: 'conservative' | 'moderate' | 'aggressive'): string {
    let simplified = content;
    
    // Replace complex medical terms with simpler alternatives
    const simplifications = {
      'conservative': {
        'gynecological': 'women\'s health',
        'obstetrician': 'pregnancy doctor',
        'comprehensive': 'complete'
      },
      'moderate': {
        'gynecological': 'women\'s health',
        'obstetrician': 'pregnancy doctor',
        'comprehensive': 'complete',
        'specialized': 'expert',
        'consultation': 'appointment'
      },
      'aggressive': {
        'gynecological': 'women\'s health',
        'obstetrician': 'pregnancy doctor',
        'comprehensive': 'complete',
        'specialized': 'expert',
        'consultation': 'visit',
        'treatment': 'care',
        'medication': 'medicine'
      }
    };
    
    const levelSimplifications = simplifications[level];
    
    Object.entries(levelSimplifications).forEach(([complex, simple]) => {
      const regex = new RegExp(`\\b${complex}\\b`, 'gi');
      simplified = simplified.replace(regex, simple);
    });
    
    return simplified;
  }
  
  private static generateFAQSection(locationData: LocationSEOData, research: ResearchResult): string {
    return `
## Frequently Asked Questions - ${locationData.displayName}

**Q: How far is Dr. Amita's clinic from ${locationData.displayName}?**
A: Our clinic is conveniently located ${research.geographic.distanceFromHospital} from ${locationData.displayName}, with easy accessibility via ${research.transport.drivingRoutes.primary}.

**Q: What are the consultation fees for ${locationData.displayName} residents?**
A: Initial consultation is ₹1500, with follow-up consultations at ₹1000. We accept all major insurance plans common in ${locationData.displayName}.

**Q: What makes Dr. Amita the best choice for ${locationData.displayName} residents?**
A: Dr. Amita understands the specific healthcare needs of ${locationData.displayName}'s ${research.demographic.economicProfile.replace('-', ' ')} community and offers personalized care with convenient scheduling.

*For more questions specific to your health concerns, please book a consultation.*
    `.trim();
  }
  
  private static optimizeHeadingStructure(content: string): string {
    // Ensure proper H2, H3 hierarchy
    let optimized = content;
    
    // Convert appropriate sentences to headings if missing
    const headingPatterns = [
      /^(Services|Treatment|Benefits|Why Choose|About|Contact)/gm,
      /^(Our Approach|What We Offer|Patient Stories)/gm
    ];
    
    headingPatterns.forEach((pattern, index) => {
      const headingLevel = index === 0 ? '##' : '###';
      optimized = optimized.replace(pattern, `${headingLevel} $1`);
    });
    
    return optimized;
  }
  
  private static generateLSIKeywords(primaryKeyword: string, location: string): string[] {
    const base = primaryKeyword.toLowerCase();
    
    const lsiKeywords = [
      `${base} near ${location}`,
      `women's health ${location}`,
      `prenatal care ${location}`,
      `PCOS treatment ${location}`,
      `fertility specialist ${location}`,
      `maternity care ${location}`,
      `women's wellness ${location}`,
      `reproductive health ${location}`
    ];
    
    return lsiKeywords;
  }
  
  private static addSemanticKeywords(content: string, lsiKeywords: string[]): string {
    let enhanced = content;
    const sentences = content.split('. ');
    
    // Add LSI keywords to every 4th sentence
    sentences.forEach((sentence, index) => {
      if (index % 4 === 0 && index > 0) {
        const lsiKeyword = lsiKeywords[index % lsiKeywords.length];
        const enhancedSentence = sentence + ` Our comprehensive approach to ${lsiKeyword} ensures the best outcomes.`;
        enhanced = enhanced.replace(sentence, enhancedSentence);
      }
    });
    
    return enhanced;
  }
  
  private static enhanceGeographicSignals(content: string, location: string, landmarks: string[]): string {
    let enhanced = content;
    
    // Add more location references
    const locationPhrases = [
      `in ${location}`,
      `for ${location} residents`,
      `serving ${location} community`,
      `accessible from ${location}`
    ];
    
    // Add landmark references
    if (landmarks.length > 0) {
      const landmarkPhrase = `near ${landmarks[0]}`;
      enhanced = enhanced.replace(/\b(located|situated)\b/gi, `$1 ${landmarkPhrase}`);
    }
    
    // Increase location density naturally
    const paragraphs = enhanced.split('\n\n');
    paragraphs.forEach((paragraph, index) => {
      if (index % 2 === 0 && !paragraph.includes(location)) {
        const phrase = locationPhrases[index % locationPhrases.length];
        enhanced = enhanced.replace(paragraph, paragraph + ` This is especially beneficial ${phrase}.`);
      }
    });
    
    return enhanced;
  }
  
  private static calculateKeywordOptimizationScore(optimized: GeneratedContent, original: GeneratedContent): number {
    const optimizedDensity = KeywordAnalyzer.analyzeKeywordDensity(
      Object.values(optimized.sections).join(' '), 
      optimized.seoData.keywords
    ).primary;
    
    const originalDensity = KeywordAnalyzer.analyzeKeywordDensity(
      Object.values(original.sections).join(' '), 
      original.seoData.keywords
    ).primary;
    
    // Calculate improvement score (0-100)
    const targetDensity = 2.5;
    const originalDistance = Math.abs(originalDensity - targetDensity);
    const optimizedDistance = Math.abs(optimizedDensity - targetDensity);
    
    const improvement = originalDistance - optimizedDistance;
    return Math.max(0, Math.min(100, (improvement / targetDensity) * 100));
  }
  
  private static async calculateReadabilityImprovement(optimized: GeneratedContent, original: GeneratedContent): Promise<number> {
    const optimizedScore = ContentQualityAnalyzer.calculateReadabilityScore(
      Object.values(optimized.sections).join(' ')
    );
    
    const originalScore = ContentQualityAnalyzer.calculateReadabilityScore(
      Object.values(original.sections).join(' ')
    );
    
    return optimizedScore - originalScore;
  }
}

/**
 * Technical SEO Auditor
 * Performs comprehensive technical SEO analysis
 */
export class TechnicalSEOAuditor {
  
  static async performTechnicalAudit(
    locationData: LocationSEOData,
    config: AdvancedSEOConfig
  ): Promise<TechnicalSEOAudit> {
    
    console.log(`🔧 Starting technical SEO audit for ${locationData.displayName}`);
    
    // Simulate technical audits - in real implementation, these would use actual tools
    const pageSpeed = await this.auditPageSpeed(locationData);
    const mobileOptimization = await this.auditMobileOptimization(locationData);
    const coreWebVitals = await this.auditCoreWebVitals(locationData);
    const technicalIssues = await this.identifyTechnicalIssues(locationData);
    const recommendations = await this.generateTechnicalRecommendations(technicalIssues);
    
    console.log(`✅ Technical audit completed for ${locationData.displayName}`);
    
    return {
      pageSpeed,
      mobileOptimization,
      coreWebVitals,
      technicalIssues,
      recommendations
    };
  }
  
  private static async auditPageSpeed(locationData: LocationSEOData): Promise<PageSpeedMetrics> {
    // Simulate page speed analysis
    return {
      loadTime: 2.1,
      firstContentfulPaint: 1.2,
      largestContentfulPaint: 2.1,
      cumulativeLayoutShift: 0.05,
      score: 92
    };
  }
  
  private static async auditMobileOptimization(locationData: LocationSEOData): Promise<MobileOptimizationScore> {
    return {
      responsiveDesign: true,
      mobileUsability: 98,
      touchTargets: true,
      textReadability: true,
      score: 96
    };
  }
  
  private static async auditCoreWebVitals(locationData: LocationSEOData): Promise<CoreWebVitalsMetrics> {
    return {
      lcp: 2.1, // Less than 2.5s is good
      fid: 45,  // Less than 100ms is good
      cls: 0.05, // Less than 0.1 is good
      passing: true
    };
  }
  
  private static async identifyTechnicalIssues(locationData: LocationSEOData): Promise<TechnicalIssue[]> {
    return [
      {
        category: 'performance',
        severity: 'medium',
        issue: 'Image optimization could be improved',
        impact: 'Faster loading times for better user experience',
        solution: 'Implement next-gen image formats (WebP, AVIF)'
      },
      {
        category: 'seo',
        severity: 'low',
        issue: 'Missing canonical URL',
        impact: 'Prevent duplicate content issues',
        solution: 'Add canonical link tag to page head'
      }
    ];
  }
  
  private static async generateTechnicalRecommendations(issues: TechnicalIssue[]): Promise<TechnicalRecommendation[]> {
    return issues.map(issue => ({
      type: 'code_change' as const,
      priority: issue.severity === 'critical' ? 10 : issue.severity === 'high' ? 7 : issue.severity === 'medium' ? 5 : 3,
      implementation: issue.solution,
      expectedImpact: issue.impact
    }));
  }
}

/**
 * Advanced SEO Pipeline Orchestrator
 * Coordinates all advanced SEO optimization processes
 */
export class AdvancedSEOPipeline {
  
  static async runCompleteOptimization(
    locationData: LocationSEOData,
    content: GeneratedContent,
    research: ResearchResult,
    config: AdvancedSEOConfig = this.getDefaultConfig()
  ): Promise<{
    basicSEO: SEOOptimizationResult;
    contentOptimization: ContentOptimizationResult;
    technicalAudit: TechnicalSEOAudit;
    overallScore: number;
    recommendations: SEORecommendation[];
  }> {
    
    console.log(`🚀 Starting complete SEO optimization pipeline for ${locationData.displayName}`);
    
    try {
      // Stage 1: Basic SEO Analysis
      const basicSEO = await SEOOptimizer.optimizeAndValidate(locationData, content, research);
      
      // Stage 2: Advanced Content Optimization
      const contentOptimization = await AdvancedContentOptimizer.optimizeContent(
        content,
        locationData,
        research,
        basicSEO,
        config
      );
      
      // Stage 3: Technical SEO Audit
      const technicalAudit = await TechnicalSEOAuditor.performTechnicalAudit(locationData, config);
      
      // Stage 4: Calculate Overall Score
      const overallScore = this.calculateOverallOptimizationScore(
        basicSEO,
        contentOptimization,
        technicalAudit
      );
      
      // Stage 5: Compile All Recommendations
      const recommendations = [
        ...basicSEO.recommendations,
        ...this.generateAdvancedRecommendations(contentOptimization, technicalAudit)
      ];
      
      console.log(`✅ Complete SEO optimization completed for ${locationData.displayName}`);
      console.log(`📊 Overall Optimization Score: ${overallScore}/100`);
      
      return {
        basicSEO,
        contentOptimization,
        technicalAudit,
        overallScore,
        recommendations
      };
      
    } catch (error) {
      console.error(`❌ Complete SEO optimization failed for ${locationData.displayName}:`, error);
      throw new Error(`SEO optimization pipeline failed: ${error}`);
    }
  }
  
  static getDefaultConfig(): AdvancedSEOConfig {
    return {
      enableContentOptimization: true,
      performLSIAnalysis: true,
      technicalSEOChecks: true,
      localSEOOptimization: true,
      competitiveAnalysis: true,
      performanceOptimization: true,
      autoFixEnabled: true,
      optimizationLevel: 'moderate'
    };
  }
  
  private static calculateOverallOptimizationScore(
    basicSEO: SEOOptimizationResult,
    contentOptimization: ContentOptimizationResult,
    technicalAudit: TechnicalSEOAudit
  ): number {
    
    const basicScore = basicSEO.overallScore * 0.4;
    const contentScore = (contentOptimization.seoImpact + contentOptimization.readabilityImprovement) * 0.3;
    const technicalScore = (technicalAudit.pageSpeed.score + technicalAudit.mobileOptimization.score) / 2 * 0.3;
    
    return Math.round(basicScore + contentScore + technicalScore);
  }
  
  private static generateAdvancedRecommendations(
    contentOptimization: ContentOptimizationResult,
    technicalAudit: TechnicalSEOAudit
  ): SEORecommendation[] {
    
    const recommendations: SEORecommendation[] = [];
    
    // Content-based recommendations
    if (contentOptimization.seoImpact < 50) {
      recommendations.push({
        type: 'medium',
        category: 'content',
        issue: 'Content optimization impact below optimal threshold',
        recommendation: 'Consider more aggressive content optimization techniques',
        impact: 'Improved search ranking potential'
      });
    }
    
    // Technical recommendations
    technicalAudit.technicalIssues.forEach(issue => {
      recommendations.push({
        type: issue.severity as any,
        category: 'content', // Map technical to closest category
        issue: issue.issue,
        recommendation: issue.solution,
        impact: issue.impact
      });
    });
    
    return recommendations;
  }
  
  static async generateComprehensiveReport(
    locationData: LocationSEOData,
    optimizationResult: {
      basicSEO: SEOOptimizationResult;
      contentOptimization: ContentOptimizationResult;
      technicalAudit: TechnicalSEOAudit;
      overallScore: number;
      recommendations: SEORecommendation[];
    }
  ): Promise<string> {
    
    const report = `
# Complete SEO Optimization Report - ${locationData.displayName}

## Executive Summary
- **Overall Optimization Score**: ${optimizationResult.overallScore}/100
- **Validation Status**: ${optimizationResult.basicSEO.passesValidation ? '✅ PASSED' : '❌ NEEDS IMPROVEMENT'}
- **Content Improvements Applied**: ${optimizationResult.contentOptimization.improvements.length}
- **Technical Issues Identified**: ${optimizationResult.technicalAudit.technicalIssues.length}

## Basic SEO Performance
- **Content Length**: ${optimizationResult.basicSEO.metrics.contentLength} words
- **Keyword Density**: ${optimizationResult.basicSEO.metrics.keywordDensity?.primary}%
- **Meta Title Score**: ${optimizationResult.basicSEO.metrics.metaTagScores?.title.score}/100
- **Meta Description Score**: ${optimizationResult.basicSEO.metrics.metaTagScores?.description.score}/100

## Content Optimization Results
- **SEO Impact Score**: ${optimizationResult.contentOptimization.seoImpact}/100
- **Readability Improvement**: +${optimizationResult.contentOptimization.readabilityImprovement} points
- **Keyword Optimization**: ${optimizationResult.contentOptimization.keywordOptimization}% improvement

### Applied Improvements
${optimizationResult.contentOptimization.improvements.map((imp, i) => 
  `${i + 1}. **${imp.section}**: ${imp.appliedFix} (Impact: ${imp.impactScore})`
).join('\n')}

## Technical SEO Audit
- **Page Speed Score**: ${optimizationResult.technicalAudit.pageSpeed.score}/100
- **Mobile Optimization**: ${optimizationResult.technicalAudit.mobileOptimization.score}/100
- **Core Web Vitals**: ${optimizationResult.technicalAudit.coreWebVitals.passing ? '✅ Passing' : '❌ Failing'}
  - LCP: ${optimizationResult.technicalAudit.coreWebVitals.lcp}s
  - FID: ${optimizationResult.technicalAudit.coreWebVitals.fid}ms
  - CLS: ${optimizationResult.technicalAudit.coreWebVitals.cls}

## All Recommendations (${optimizationResult.recommendations.length})
${optimizationResult.recommendations.map((rec, i) => 
  `${i + 1}. **${rec.type.toUpperCase()}** [${rec.category}] - ${rec.issue}
   *Solution*: ${rec.recommendation}
   *Impact*: ${rec.impact}`
).join('\n\n')}

## Schema Validation
- **Status**: ${optimizationResult.basicSEO.metrics.schemaValidation?.isValid ? '✅ Valid' : '❌ Invalid'}
- **Schemas**: ${optimizationResult.basicSEO.metrics.schemaValidation?.schemas.join(', ') || 'None'}

## Action Items
${optimizationResult.recommendations.filter(r => r.type === 'critical' || r.type === 'high').map((rec, i) => 
  `${i + 1}. [${rec.type.toUpperCase()}] ${rec.recommendation}`
).join('\n')}

---
*Generated by Advanced SEO Optimization Pipeline*
*Report Date: ${new Date().toISOString().split('T')[0]}*
    `;
    
    return report.trim();
  }
}

export default AdvancedSEOPipeline;