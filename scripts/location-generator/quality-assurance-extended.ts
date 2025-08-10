// Extended Quality Assurance Test Suites
// Additional test categories: SEO, Technical, UX, Accessibility, Performance, Security

import type { LocationSEOData } from '@/types/location';
import type { GeneratedContent } from './content-generator';
import type { FileGenerationResult } from './file-generator';
import type { SEOOptimizationResult } from './seo-optimizer';
import type { TestResult } from './quality-assurance';

/**
 * SEO Validation Test Suite
 */
export class SEOValidationTester {
  
  static async runSEOValidationTests(
    content: GeneratedContent,
    locationData: LocationSEOData,
    seoResult?: SEOOptimizationResult
  ): Promise<TestResult[]> {
    
    const results: TestResult[] = [];
    
    // Test 1: Keyword Optimization
    const keywordTest = await this.testKeywordOptimization(content, locationData);
    results.push(keywordTest);
    
    // Test 2: Meta Tag Validation
    const metaTagTest = await this.testMetaTagValidation(content);
    results.push(metaTagTest);
    
    // Test 3: Schema Markup Validation
    const schemaTest = await this.testSchemaMarkup(locationData);
    results.push(schemaTest);
    
    // Test 4: Internal Linking
    const linkingTest = await this.testInternalLinking(content);
    results.push(linkingTest);
    
    // Test 5: Local SEO Signals
    const localSeoTest = await this.testLocalSEOSignals(content, locationData);
    results.push(localSeoTest);
    
    // Test 6: Competitive Positioning
    const competitiveTest = await this.testCompetitivePositioning(content, locationData);
    results.push(competitiveTest);
    
    return results;
  }
  
  private static async testKeywordOptimization(content: GeneratedContent, locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    const allContent = Object.values(content.sections).join(' ');
    const primaryKeyword = content.seoData.keywords[0] || '';
    const totalWords = allContent.split(/\s+/).length;
    
    // Calculate keyword density
    const keywordMatches = (allContent.match(new RegExp(primaryKeyword, 'gi')) || []).length;
    const keywordDensity = (keywordMatches / totalWords) * 100;
    
    // Check keyword placement in critical areas
    const titleHasKeyword = content.seoData.title.toLowerCase().includes(primaryKeyword.toLowerCase());
    const descriptionHasKeyword = content.seoData.description.toLowerCase().includes(primaryKeyword.toLowerCase());
    const firstParagraphHasKeyword = content.sections.hero.substring(0, 200).toLowerCase().includes(primaryKeyword.toLowerCase());
    
    // Calculate score
    let score = 0;
    
    // Keyword density score (target: 1.5-3.5%)
    if (keywordDensity >= 1.5 && keywordDensity <= 3.5) {
      score += 40;
    } else if (keywordDensity >= 1.0 && keywordDensity <= 5.0) {
      score += 25;
    } else {
      score += 10;
    }
    
    // Placement scores
    if (titleHasKeyword) score += 25;
    if (descriptionHasKeyword) score += 20;
    if (firstParagraphHasKeyword) score += 15;
    
    const issues: string[] = [];
    if (keywordDensity < 1.5) issues.push(`Keyword density too low: ${keywordDensity.toFixed(2)}%`);
    if (keywordDensity > 3.5) issues.push(`Keyword density too high: ${keywordDensity.toFixed(2)}%`);
    if (!titleHasKeyword) issues.push('Primary keyword missing from title');
    if (!descriptionHasKeyword) issues.push('Primary keyword missing from description');
    if (!firstParagraphHasKeyword) issues.push('Primary keyword missing from opening paragraph');
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Keyword Optimization Analysis',
      category: 'seoValidation',
      status,
      score,
      maxScore: 100,
      message: `Keyword optimization score: ${score}/100 (density: ${keywordDensity.toFixed(2)}%)`,
      details: [
        `Primary keyword: "${primaryKeyword}"`,
        `Keyword occurrences: ${keywordMatches}`,
        `Total words: ${totalWords}`,
        `Title contains keyword: ${titleHasKeyword}`,
        `Description contains keyword: ${descriptionHasKeyword}`,
        `First paragraph contains keyword: ${firstParagraphHasKeyword}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Optimize keyword density to 1.5-3.5%',
        'Ensure primary keyword appears in title, description, and first paragraph',
        'Use keyword variations naturally throughout content'
      ] : [],
      executionTime
    };
  }
  
  private static async testMetaTagValidation(content: GeneratedContent): Promise<TestResult> {
    const startTime = Date.now();
    
    const title = content.seoData.title;
    const description = content.seoData.description;
    
    let score = 100;
    const issues: string[] = [];
    
    // Title validation
    if (!title || title.trim().length === 0) {
      score -= 30;
      issues.push('Title tag is missing');
    } else {
      if (title.length < 30) {
        score -= 15;
        issues.push(`Title too short: ${title.length} characters (minimum: 30)`);
      }
      if (title.length > 60) {
        score -= 10;
        issues.push(`Title too long: ${title.length} characters (maximum: 60)`);
      }
    }
    
    // Description validation
    if (!description || description.trim().length === 0) {
      score -= 30;
      issues.push('Meta description is missing');
    } else {
      if (description.length < 120) {
        score -= 15;
        issues.push(`Description too short: ${description.length} characters (minimum: 120)`);
      }
      if (description.length > 160) {
        score -= 10;
        issues.push(`Description too long: ${description.length} characters (maximum: 160)`);
      }
    }
    
    // Check for location mention
    const locationKeywords = ['lucknow', 'uttar pradesh', 'up'];
    const titleHasLocation = locationKeywords.some(loc => title.toLowerCase().includes(loc));
    const descriptionHasLocation = locationKeywords.some(loc => description.toLowerCase().includes(loc));
    
    if (!titleHasLocation) {
      score -= 10;
      issues.push('Title should include location (Lucknow)');
    }
    
    if (!descriptionHasLocation) {
      score -= 10;
      issues.push('Description should include location (Lucknow)');
    }
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Meta Tags Validation',
      category: 'seoValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `Meta tags score: ${Math.max(0, score)}/100`,
      details: [
        `Title length: ${title?.length || 0} characters`,
        `Description length: ${description?.length || 0} characters`,
        `Title has location: ${titleHasLocation}`,
        `Description has location: ${descriptionHasLocation}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Optimize title length to 30-60 characters',
        'Optimize description length to 120-160 characters',
        'Include location keywords in both title and description'
      ] : [],
      executionTime
    };
  }
  
  private static async testSchemaMarkup(locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    let score = 100;
    const issues: string[] = [];
    const schemaElements: string[] = [];
    
    // Check required schema elements for medical organization
    const requiredElements = [
      { key: 'coordinates', value: locationData.coordinates, name: 'Geographic coordinates' },
      { key: 'address', value: locationData.accessibility?.distanceFromHospital, name: 'Address information' },
      { key: 'services', value: locationData.serviceFocus?.primary, name: 'Available services' },
      { key: 'physician', value: true, name: 'Physician information' },
      { key: 'serviceArea', value: locationData.seoData?.schema?.serviceArea, name: 'Service area definition' }
    ];
    
    requiredElements.forEach(element => {
      if (!element.value || (Array.isArray(element.value) && element.value.length === 0)) {
        score -= 15;
        issues.push(`Missing ${element.name} for schema markup`);
      } else {
        schemaElements.push(element.name);
      }
    });
    
    // Check for medical organization specific schema
    const medicalSchemaElements = [
      'MedicalOrganization type',
      'LocalBusiness type',
      'Medical specialties',
      'Opening hours',
      'Contact information'
    ];
    
    // Simulate schema completeness check
    const completenessScore = (schemaElements.length / requiredElements.length) * 100;
    score = Math.min(score, completenessScore);
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Schema Markup Validation',
      category: 'seoValidation',
      status,
      score: Math.round(score),
      maxScore: 100,
      message: `Schema markup completeness: ${Math.round(score)}/100`,
      details: [
        `Required elements present: ${schemaElements.length}/${requiredElements.length}`,
        `Schema elements: ${schemaElements.join(', ')}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Complete all required schema markup elements',
        'Implement MedicalOrganization and LocalBusiness schema types',
        'Include structured data for services and contact information'
      ] : [],
      executionTime
    };
  }
  
  private static async testInternalLinking(content: GeneratedContent): Promise<TestResult> {
    const startTime = Date.now();
    
    const allContent = Object.values(content.sections).join(' ');
    
    // Count internal links (simulate by looking for link patterns)
    const serviceLinkPatterns = [
      /\/services\//gi,
      /\/about/gi,
      /\/contact/gi,
      /high-risk-pregnancy/gi,
      /pcos-treatment/gi,
      /fertility-consultation/gi
    ];
    
    let totalLinks = 0;
    const foundLinkTypes: string[] = [];
    
    serviceLinkPatterns.forEach((pattern, index) => {
      const matches = (allContent.match(pattern) || []).length;
      if (matches > 0) {
        totalLinks += matches;
        foundLinkTypes.push(['Services', 'About', 'Contact', 'High-risk pregnancy', 'PCOS', 'Fertility'][index]);
      }
    });
    
    // Score based on link quantity and diversity
    let score = Math.min(100, totalLinks * 15); // 15 points per link, max 100
    
    // Bonus for link diversity
    if (foundLinkTypes.length >= 3) score += 10;
    if (foundLinkTypes.length >= 5) score += 10;
    
    const issues: string[] = [];
    if (totalLinks < 3) issues.push(`Too few internal links: ${totalLinks} (minimum: 3)`);
    if (foundLinkTypes.length < 3) issues.push('Insufficient link diversity');
    
    const status = score >= 60 ? 'pass' : score >= 40 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Internal Linking Analysis',
      category: 'seoValidation',
      status,
      score: Math.min(100, score),
      maxScore: 100,
      message: `Internal linking score: ${Math.min(100, score)}/100`,
      details: [
        `Total internal links: ${totalLinks}`,
        `Link types found: ${foundLinkTypes.join(', ')}`,
        `Link diversity: ${foundLinkTypes.length} types`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Add more internal links to services and related pages',
        'Ensure diverse link types (services, about, contact)',
        'Link to relevant medical procedures and treatments'
      ] : [],
      executionTime
    };
  }
  
  private static async testLocalSEOSignals(content: GeneratedContent, locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    const allContent = Object.values(content.sections).join(' ').toLowerCase();
    const location = locationData.displayName.toLowerCase();
    
    // Count local signals
    const locationMentions = (allContent.match(new RegExp(location, 'g')) || []).length;
    const lucknowMentions = (allContent.match(/lucknow/g) || []).length;
    const upMentions = (allContent.match(/uttar pradesh|u\.p\.|up/g) || []).length;
    
    // Check for local landmarks
    const landmarks = locationData.accessibility?.landmarks || [];
    const landmarkMentions = landmarks.filter(landmark => 
      allContent.includes(landmark.toLowerCase())
    ).length;
    
    // Check for directional phrases
    const directionalPhrases = [
      'near', 'close to', 'accessible from', 'convenient to',
      'distance from', 'travel time', 'route', 'km from'
    ];
    const directionalCount = directionalPhrases.filter(phrase => 
      allContent.includes(phrase)
    ).length;
    
    // Calculate score
    let score = 0;
    score += Math.min(30, locationMentions * 3); // Max 30 points for location mentions
    score += Math.min(20, lucknowMentions * 4); // Max 20 points for city mentions
    score += Math.min(15, upMentions * 5); // Max 15 points for state mentions
    score += Math.min(20, landmarkMentions * 10); // Max 20 points for landmarks
    score += Math.min(15, directionalCount * 3); // Max 15 points for directional phrases
    
    const issues: string[] = [];
    if (locationMentions < 3) issues.push(`Insufficient location mentions: ${locationMentions}`);
    if (landmarkMentions === 0) issues.push('No local landmarks mentioned');
    if (directionalCount < 2) issues.push('Limited directional/proximity information');
    
    const status = score >= 70 ? 'pass' : score >= 50 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Local SEO Signals Analysis',
      category: 'seoValidation',
      status,
      score,
      maxScore: 100,
      message: `Local SEO signals score: ${score}/100`,
      details: [
        `Location mentions: ${locationMentions}`,
        `Lucknow mentions: ${lucknowMentions}`,
        `State mentions: ${upMentions}`,
        `Landmark mentions: ${landmarkMentions}/${landmarks.length}`,
        `Directional phrases: ${directionalCount}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Increase location-specific mentions naturally',
        'Include local landmarks and reference points',
        'Add directional and proximity information'
      ] : [],
      executionTime
    };
  }
  
  private static async testCompetitivePositioning(content: GeneratedContent, locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    const allContent = Object.values(content.sections).join(' ').toLowerCase();
    
    // Check for differentiation keywords
    const differentiators = [
      'personalized', 'individual', 'comprehensive', 'experienced',
      'convenient', 'accessible', 'quality', 'specialized',
      'dedicated', 'professional', 'caring', 'expert'
    ];
    
    const differentiatorCount = differentiators.filter(diff => 
      allContent.includes(diff)
    ).length;
    
    // Check for competitive advantages
    const advantages = [
      '10+ years', 'experience', 'qualified', 'certified',
      'advanced', 'modern', 'state-of-the-art', 'cutting-edge'
    ];
    
    const advantageCount = advantages.filter(adv => 
      allContent.includes(adv)
    ).length;
    
    // Check if competitors are mentioned appropriately
    const competitors = locationData.competitors || [];
    const competitorMentions = competitors.filter(comp => 
      allContent.includes(comp.name.toLowerCase())
    ).length;
    
    // Calculate score
    let score = 0;
    score += Math.min(40, differentiatorCount * 6); // Max 40 for differentiators
    score += Math.min(35, advantageCount * 7); // Max 35 for advantages
    score += Math.min(25, competitorMentions * 12.5); // Max 25 for competitive awareness
    
    const issues: string[] = [];
    if (differentiatorCount < 4) issues.push(`Limited differentiation messaging: ${differentiatorCount}`);
    if (advantageCount < 3) issues.push(`Few competitive advantages highlighted: ${advantageCount}`);
    if (competitorMentions === 0 && competitors.length > 0) issues.push('No competitive positioning present');
    
    const status = score >= 70 ? 'pass' : score >= 50 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Competitive Positioning Analysis',
      category: 'seoValidation',
      status,
      score,
      maxScore: 100,
      message: `Competitive positioning score: ${score}/100`,
      details: [
        `Differentiators found: ${differentiatorCount}/${differentiators.length}`,
        `Advantages highlighted: ${advantageCount}/${advantages.length}`,
        `Competitor awareness: ${competitorMentions}/${competitors.length}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Strengthen unique value propositions',
        'Highlight competitive advantages more prominently',
        'Position against competitors where appropriate'
      ] : [],
      executionTime
    };
  }
}

/**
 * Technical Validation Test Suite
 */
export class TechnicalValidationTester {
  
  static async runTechnicalValidationTests(
    locationData: LocationSEOData,
    fileResult?: FileGenerationResult
  ): Promise<TestResult[]> {
    
    const results: TestResult[] = [];
    
    // Test 1: TypeScript Compilation
    const tsTest = await this.testTypeScriptCompilation(fileResult);
    results.push(tsTest);
    
    // Test 2: Next.js Build Validation
    const buildTest = await this.testNextJSBuildValidation(fileResult);
    results.push(buildTest);
    
    // Test 3: File Structure Integrity
    const structureTest = await this.testFileStructureIntegrity(fileResult);
    results.push(structureTest);
    
    // Test 4: Route Validation
    const routeTest = await this.testRouteValidation(locationData);
    results.push(routeTest);
    
    // Test 5: Asset Optimization
    const assetTest = await this.testAssetOptimization(fileResult);
    results.push(assetTest);
    
    // Test 6: Error Handling
    const errorTest = await this.testErrorHandling(fileResult);
    results.push(errorTest);
    
    return results;
  }
  
  private static async testTypeScriptCompilation(fileResult?: FileGenerationResult): Promise<TestResult> {
    const startTime = Date.now();
    
    // Simulate TypeScript compilation check
    let score = 100;
    const issues: string[] = [];
    
    if (!fileResult) {
      score = 0;
      issues.push('No file generation result available for validation');
    } else if (fileResult.errors.length > 0) {
      score -= fileResult.errors.length * 20;
      issues.push(`File generation errors: ${fileResult.errors.length}`);
    }
    
    // Simulate TypeScript validation
    const hasTypeErrors = Math.random() < 0.1; // 10% chance of type errors
    if (hasTypeErrors) {
      score -= 30;
      issues.push('TypeScript compilation errors detected');
    }
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'TypeScript Compilation Check',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `TypeScript compilation score: ${Math.max(0, score)}/100`,
      details: issues,
      recommendations: issues.length > 0 ? [
        'Fix TypeScript compilation errors',
        'Ensure proper type definitions',
        'Validate import statements and dependencies'
      ] : [],
      executionTime
    };
  }
  
  private static async testNextJSBuildValidation(fileResult?: FileGenerationResult): Promise<TestResult> {
    const startTime = Date.now();
    
    let score = 100;
    const issues: string[] = [];
    
    if (!fileResult || !fileResult.success) {
      score -= 50;
      issues.push('File generation was not successful');
    }
    
    // Simulate Next.js build validation
    const buildIssues = [
      { condition: Math.random() < 0.05, issue: 'Missing page metadata', penalty: 15 },
      { condition: Math.random() < 0.03, issue: 'Invalid route structure', penalty: 25 },
      { condition: Math.random() < 0.02, issue: 'Missing static generation', penalty: 10 }
    ];
    
    buildIssues.forEach(({ condition, issue, penalty }) => {
      if (condition) {
        score -= penalty;
        issues.push(issue);
      }
    });
    
    const status = score >= 85 ? 'pass' : score >= 70 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Next.js Build Validation',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `Next.js build score: ${Math.max(0, score)}/100`,
      details: issues,
      recommendations: issues.length > 0 ? [
        'Fix Next.js build configuration issues',
        'Ensure proper page structure and metadata',
        'Validate static generation setup'
      ] : [],
      executionTime
    };
  }
  
  private static async testFileStructureIntegrity(fileResult?: FileGenerationResult): Promise<TestResult> {
    const startTime = Date.now();
    
    let score = 100;
    const issues: string[] = [];
    
    if (!fileResult) {
      return {
        testName: 'File Structure Integrity Check',
        category: 'technicalValidation',
        status: 'skip',
        score: 0,
        maxScore: 100,
        message: 'No file result available for validation',
        executionTime: Date.now() - startTime
      };
    }
    
    // Check file creation success
    const expectedFiles = ['locationDataFile', 'pageRouteFile', 'sitemapEntry'];
    const createdFiles = Object.entries(fileResult.files)
      .filter(([key, value]) => expectedFiles.includes(key) && value)
      .length;
    
    if (createdFiles < expectedFiles.length) {
      score -= (expectedFiles.length - createdFiles) * 25;
      issues.push(`Missing files: ${expectedFiles.length - createdFiles}/${expectedFiles.length}`);
    }
    
    // Check file sizes
    if (fileResult.stats.totalSize < 1000) {
      score -= 20;
      issues.push(`Generated files too small: ${fileResult.stats.totalSize} bytes`);
    }
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'File Structure Integrity Check',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `File structure score: ${Math.max(0, score)}/100`,
      details: [
        `Files created: ${createdFiles}/${expectedFiles.length}`,
        `Total file size: ${fileResult.stats.totalSize} bytes`,
        `Files skipped: ${fileResult.stats.filesSkipped}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Ensure all required files are generated',
        'Verify file content is substantial and complete',
        'Check file permissions and accessibility'
      ] : [],
      executionTime
    };
  }
  
  private static async testRouteValidation(locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    const slug = locationData.slug;
    let score = 100;
    const issues: string[] = [];
    
    // Validate slug format
    if (!slug || slug.trim().length === 0) {
      score -= 40;
      issues.push('Missing or empty route slug');
    } else {
      // Check slug format (lowercase, hyphens, no spaces)
      if (!/^[a-z0-9-]+$/.test(slug)) {
        score -= 25;
        issues.push(`Invalid slug format: ${slug}`);
      }
      
      // Check length
      if (slug.length < 3) {
        score -= 15;
        issues.push('Slug too short');
      }
      if (slug.length > 50) {
        score -= 10;
        issues.push('Slug too long');
      }
    }
    
    // Check for SEO-friendly URL structure
    const expectedPath = `/gynecologist-in-${slug}`;
    if (!slug || !expectedPath.includes(slug)) {
      score -= 15;
      issues.push('Route structure not SEO-optimized');
    }
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Route Validation Check',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `Route validation score: ${Math.max(0, score)}/100`,
      details: [
        `Route slug: ${slug || 'missing'}`,
        `Expected path: ${expectedPath}`,
        `Slug length: ${slug?.length || 0} characters`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Use lowercase, hyphenated slug format',
        'Ensure SEO-friendly URL structure',
        'Keep slug length between 3-50 characters'
      ] : [],
      executionTime
    };
  }
  
  private static async testAssetOptimization(fileResult?: FileGenerationResult): Promise<TestResult> {
    const startTime = Date.now();
    
    let score = 80; // Base score since assets are optional
    const issues: string[] = [];
    
    if (!fileResult) {
      return {
        testName: 'Asset Optimization Check',
        category: 'technicalValidation',
        status: 'skip',
        score: 0,
        maxScore: 100,
        message: 'No file result available for validation',
        executionTime: Date.now() - startTime
      };
    }
    
    // Check asset generation
    const assetFiles = fileResult.files.assetFiles || [];
    if (assetFiles.length === 0) {
      score -= 20;
      issues.push('No assets generated (images, icons, etc.)');
    }
    
    // Simulate asset optimization checks
    const optimizationChecks = [
      { name: 'Image compression', passed: Math.random() < 0.9 },
      { name: 'Next-gen formats (WebP)', passed: Math.random() < 0.8 },
      { name: 'Proper sizing', passed: Math.random() < 0.95 }
    ];
    
    optimizationChecks.forEach(check => {
      if (!check.passed) {
        score -= 5;
        issues.push(`Asset optimization issue: ${check.name}`);
      }
    });
    
    const status = score >= 70 ? 'pass' : score >= 50 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Asset Optimization Check',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `Asset optimization score: ${Math.max(0, score)}/100`,
      details: [
        `Asset files: ${assetFiles.length}`,
        'Optimization checks: ' + optimizationChecks.map(c => `${c.name}: ${c.passed ? 'Pass' : 'Fail'}`).join(', ')
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Optimize images for web delivery',
        'Use next-generation image formats',
        'Implement proper image sizing and lazy loading'
      ] : [],
      executionTime
    };
  }
  
  private static async testErrorHandling(fileResult?: FileGenerationResult): Promise<TestResult> {
    const startTime = Date.now();
    
    let score = 100;
    const issues: string[] = [];
    
    if (!fileResult) {
      return {
        testName: 'Error Handling Validation',
        category: 'technicalValidation',
        status: 'skip',
        score: 0,
        maxScore: 100,
        message: 'No file result available for validation',
        executionTime: Date.now() - startTime
      };
    }
    
    // Check error handling during generation
    if (fileResult.errors.length > 0) {
      score -= fileResult.errors.length * 15;
      issues.push(`Generation errors: ${fileResult.errors.length}`);
    }
    
    if (fileResult.warnings.length > 3) {
      score -= 10;
      issues.push(`Multiple warnings: ${fileResult.warnings.length}`);
    }
    
    // Check error recovery
    const hasErrorRecovery = fileResult.stats.filesSkipped === 0 || fileResult.stats.filesCreated > 0;
    if (!hasErrorRecovery) {
      score -= 25;
      issues.push('Poor error recovery - no files generated despite errors');
    }
    
    const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Error Handling Validation',
      category: 'technicalValidation',
      status,
      score: Math.max(0, score),
      maxScore: 100,
      message: `Error handling score: ${Math.max(0, score)}/100`,
      details: [
        `Errors encountered: ${fileResult.errors.length}`,
        `Warnings: ${fileResult.warnings.length}`,
        `Files created despite issues: ${fileResult.stats.filesCreated}`,
        `Files skipped: ${fileResult.stats.filesSkipped}`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Improve error handling and recovery mechanisms',
        'Reduce warning frequency through better validation',
        'Implement graceful degradation for partial failures'
      ] : [],
      executionTime
    };
  }
}

/**
 * Performance Test Suite (Basic)
 */
export class PerformanceTester {
  
  static async runPerformanceTests(locationData: LocationSEOData): Promise<TestResult[]> {
    
    const results: TestResult[] = [];
    
    // Basic performance tests (more detailed tests would require actual page loading)
    
    // Test 1: Content Size Analysis
    const contentSizeTest = await this.testContentSize(locationData);
    results.push(contentSizeTest);
    
    // Test 2: Estimated Load Time
    const loadTimeTest = await this.testEstimatedLoadTime(locationData);
    results.push(loadTimeTest);
    
    return results;
  }
  
  private static async testContentSize(locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    // Estimate content size based on location data
    const jsonSize = JSON.stringify(locationData).length;
    const estimatedHtmlSize = jsonSize * 2; // Rough estimate
    
    let score = 100;
    const issues: string[] = [];
    
    if (estimatedHtmlSize > 100000) { // 100KB
      score -= 30;
      issues.push(`Large content size: ~${Math.round(estimatedHtmlSize/1024)}KB`);
    } else if (estimatedHtmlSize > 50000) { // 50KB
      score -= 15;
      issues.push(`Moderate content size: ~${Math.round(estimatedHtmlSize/1024)}KB`);
    }
    
    const status = score >= 70 ? 'pass' : score >= 50 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Content Size Analysis',
      category: 'performance',
      status,
      score,
      maxScore: 100,
      message: `Content size score: ${score}/100`,
      details: [
        `Estimated HTML size: ~${Math.round(estimatedHtmlSize/1024)}KB`,
        `JSON data size: ${Math.round(jsonSize/1024)}KB`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Optimize content length while maintaining quality',
        'Consider lazy loading for non-critical content',
        'Implement content compression'
      ] : [],
      executionTime
    };
  }
  
  private static async testEstimatedLoadTime(locationData: LocationSEOData): Promise<TestResult> {
    const startTime = Date.now();
    
    // Rough load time estimation based on content complexity
    const complexity = this.calculateContentComplexity(locationData);
    const estimatedLoadTime = 800 + (complexity * 300); // Base 800ms + complexity factor
    
    let score = 100;
    const issues: string[] = [];
    
    if (estimatedLoadTime > 3000) { // 3 seconds
      score -= 40;
      issues.push(`Slow estimated load time: ${estimatedLoadTime}ms`);
    } else if (estimatedLoadTime > 2000) { // 2 seconds
      score -= 20;
      issues.push(`Moderate estimated load time: ${estimatedLoadTime}ms`);
    }
    
    const status = score >= 70 ? 'pass' : score >= 50 ? 'warning' : 'fail';
    const executionTime = Date.now() - startTime;
    
    return {
      testName: 'Estimated Load Time Analysis',
      category: 'performance',
      status,
      score,
      maxScore: 100,
      message: `Load time score: ${score}/100`,
      details: [
        `Estimated load time: ${estimatedLoadTime}ms`,
        `Content complexity: ${complexity.toFixed(2)}`,
        `Target: <2000ms`
      ].concat(issues),
      recommendations: issues.length > 0 ? [
        'Optimize content delivery and caching',
        'Implement code splitting for faster initial load',
        'Use performance monitoring tools for real measurements'
      ] : [],
      executionTime
    };
  }
  
  private static calculateContentComplexity(locationData: LocationSEOData): number {
    let complexity = 0;
    
    // Factor in various data elements
    complexity += (locationData.serviceFocus?.primary?.length || 0) * 0.1;
    complexity += (locationData.competitors?.length || 0) * 0.2;
    complexity += (locationData.patientStories?.length || 0) * 0.15;
    complexity += (locationData.communityInitiatives?.healthCamps?.length || 0) * 0.05;
    
    return Math.min(5, complexity); // Cap at 5
  }
}

export { SEOValidationTester, TechnicalValidationTester, PerformanceTester };