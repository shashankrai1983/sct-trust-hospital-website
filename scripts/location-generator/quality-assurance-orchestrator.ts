// Quality Assurance Orchestrator
// Comprehensive QA pipeline integration and test execution coordination

import type { LocationSEOData } from '@/types/location';
import type { GeneratedContent } from './content-generator';
import type { FileGenerationResult } from './file-generator';
import type { SEOOptimizationResult } from './seo-optimizer';
import type { SEOIntegratedResult } from './seo-integration';
import type { QAReport, TestResult, QARecommendation } from './quality-assurance';

import { QualityAssuranceEngine, ContentQualityTester, MedicalAccuracyTester } from './quality-assurance';
import { SEOValidationTester, TechnicalValidationTester, PerformanceTester } from './quality-assurance-extended';

export interface ComprehensiveQAConfig {
  enableAllTests: boolean;
  testCategories: {
    contentQuality: boolean;
    medicalAccuracy: boolean;
    seoValidation: boolean;
    technicalValidation: boolean;
    userExperience: boolean;
    accessibility: boolean;
    performance: boolean;
    security: boolean;
  };
  qualityThresholds: {
    overall: number;
    category: number;
    critical: number;
  };
  failFast: boolean;
  generateDetailedReport: boolean;
  saveReports: boolean;
  reportFormat: 'markdown' | 'json' | 'both';
}

export interface ComprehensiveQAResult {
  overallReport: QAReport;
  categoryReports: Map<string, TestResult[]>;
  complianceMatrix: ComplianceMatrix;
  qualityGates: QualityGateResult[];
  executionMetrics: ExecutionMetrics;
  recommendations: PrioritizedRecommendations;
  certificationStatus: CertificationStatus;
}

export interface ComplianceMatrix {
  medical: {
    factualAccuracy: boolean;
    disclaimers: boolean;
    professionalStandards: boolean;
    regulatoryCompliance: boolean;
    overall: boolean;
  };
  technical: {
    codeQuality: boolean;
    buildValidation: boolean;
    routeIntegrity: boolean;
    errorHandling: boolean;
    overall: boolean;
  };
  seo: {
    keywordOptimization: boolean;
    metaTags: boolean;
    schemaMarkup: boolean;
    localSEO: boolean;
    overall: boolean;
  };
  content: {
    quality: boolean;
    uniqueness: boolean;
    readability: boolean;
    structure: boolean;
    overall: boolean;
  };
}

export interface QualityGateResult {
  gateName: string;
  category: string;
  threshold: number;
  actualScore: number;
  passed: boolean;
  blockers: string[];
  recommendations: string[];
}

export interface ExecutionMetrics {
  totalExecutionTime: number;
  testsPerSecond: number;
  categoryExecutionTimes: Record<string, number>;
  parallelEfficiency: number;
  resourceUtilization: number;
}

export interface PrioritizedRecommendations {
  critical: QARecommendation[];
  high: QARecommendation[];
  medium: QARecommendation[];
  low: QARecommendation[];
  quickWins: QARecommendation[];
  longTerm: QARecommendation[];
}

export interface CertificationStatus {
  medicalContentCertified: boolean;
  seoOptimizationCertified: boolean;
  technicalQualityCertified: boolean;
  accessibilityCertified: boolean;
  performanceCertified: boolean;
  overallCertified: boolean;
  certificationLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'none';
  validUntil: Date;
}

/**
 * Comprehensive Quality Assurance Orchestrator
 * Manages the complete QA pipeline with all test categories
 */
export class ComprehensiveQAOrchestrator {
  
  static getDefaultConfig(): ComprehensiveQAConfig {
    return {
      enableAllTests: true,
      testCategories: {
        contentQuality: true,
        medicalAccuracy: true,
        seoValidation: true,
        technicalValidation: true,
        userExperience: false, // Not implemented yet
        accessibility: false,  // Not implemented yet
        performance: true,
        security: false        // Not implemented yet
      },
      qualityThresholds: {
        overall: 80,
        category: 70,
        critical: 90
      },
      failFast: false,
      generateDetailedReport: true,
      saveReports: true,
      reportFormat: 'both'
    };
  }
  
  static async runComprehensiveQA(
    content: GeneratedContent,
    locationData: LocationSEOData,
    seoResult?: SEOOptimizationResult,
    fileResult?: FileGenerationResult,
    config: ComprehensiveQAConfig = this.getDefaultConfig()
  ): Promise<ComprehensiveQAResult> {
    
    const startTime = Date.now();
    console.log(`🧪 Starting comprehensive QA for ${locationData.displayName}`);
    
    try {
      const allResults: TestResult[] = [];
      const categoryReports = new Map<string, TestResult[]>();
      const categoryExecutionTimes: Record<string, number> = {};
      
      // Execute test categories in parallel or sequential based on config
      const testPromises: Promise<void>[] = [];
      
      // Content Quality Tests
      if (config.testCategories.contentQuality) {
        const promise = this.executeTestCategory(
          'Content Quality',
          () => ContentQualityTester.runContentQualityTests(content, locationData),
          allResults,
          categoryReports,
          categoryExecutionTimes,
          config.failFast
        );
        testPromises.push(promise);
      }
      
      // Medical Accuracy Tests
      if (config.testCategories.medicalAccuracy) {
        const promise = this.executeTestCategory(
          'Medical Accuracy',
          () => MedicalAccuracyTester.runMedicalAccuracyTests(content, locationData),
          allResults,
          categoryReports,
          categoryExecutionTimes,
          config.failFast
        );
        testPromises.push(promise);
      }
      
      // SEO Validation Tests
      if (config.testCategories.seoValidation) {
        const promise = this.executeTestCategory(
          'SEO Validation',
          () => SEOValidationTester.runSEOValidationTests(content, locationData, seoResult),
          allResults,
          categoryReports,
          categoryExecutionTimes,
          config.failFast
        );
        testPromises.push(promise);
      }
      
      // Technical Validation Tests
      if (config.testCategories.technicalValidation) {
        const promise = this.executeTestCategory(
          'Technical Validation',
          () => TechnicalValidationTester.runTechnicalValidationTests(locationData, fileResult),
          allResults,
          categoryReports,
          categoryExecutionTimes,
          config.failFast
        );
        testPromises.push(promise);
      }
      
      // Performance Tests
      if (config.testCategories.performance) {
        const promise = this.executeTestCategory(
          'Performance',
          () => PerformanceTester.runPerformanceTests(locationData),
          allResults,
          categoryReports,
          categoryExecutionTimes,
          config.failFast
        );
        testPromises.push(promise);
      }
      
      // Execute all test categories
      await Promise.all(testPromises);
      
      // Generate comprehensive analysis
      const overallReport = await this.generateOverallReport(
        allResults,
        locationData,
        config
      );
      
      const complianceMatrix = this.generateComplianceMatrix(allResults);
      const qualityGates = this.evaluateQualityGates(allResults, config);
      const executionMetrics = this.calculateExecutionMetrics(
        startTime,
        allResults.length,
        categoryExecutionTimes
      );
      const recommendations = this.prioritizeRecommendations(allResults, overallReport);
      const certificationStatus = this.evaluateCertificationStatus(
        overallReport,
        complianceMatrix
      );
      
      const result: ComprehensiveQAResult = {
        overallReport,
        categoryReports,
        complianceMatrix,
        qualityGates,
        executionMetrics,
        recommendations,
        certificationStatus
      };
      
      // Save reports if configured
      if (config.saveReports) {
        await this.saveQAReports(result, locationData, config);
      }
      
      const executionTime = Date.now() - startTime;
      
      console.log(`✅ Comprehensive QA completed for ${locationData.displayName}`);
      console.log(`📊 Overall Score: ${overallReport.overallScore}/100`);
      console.log(`🏆 Certification Level: ${certificationStatus.certificationLevel}`);
      console.log(`⏱️  Execution Time: ${executionTime}ms`);
      
      return result;
      
    } catch (error) {
      console.error(`❌ Comprehensive QA failed for ${locationData.displayName}:`, error);
      throw new Error(`Comprehensive QA failed: ${error}`);
    }
  }
  
  private static async executeTestCategory(
    categoryName: string,
    testFunction: () => Promise<TestResult[]>,
    allResults: TestResult[],
    categoryReports: Map<string, TestResult[]>,
    executionTimes: Record<string, number>,
    failFast: boolean
  ): Promise<void> {
    
    const startTime = Date.now();
    
    try {
      console.log(`🔍 Running ${categoryName} tests...`);
      const results = await testFunction();
      
      // Add results to collections
      allResults.push(...results);
      categoryReports.set(categoryName, results);
      executionTimes[categoryName] = Date.now() - startTime;
      
      // Check for critical failures if fail-fast is enabled
      if (failFast) {
        const criticalFailures = results.filter(r => r.status === 'fail' && r.score < 30);
        if (criticalFailures.length > 0) {
          throw new Error(`Critical failure in ${categoryName}: ${criticalFailures[0].message}`);
        }
      }
      
      console.log(`✅ ${categoryName}: ${results.filter(r => r.status === 'pass').length}/${results.length} passed`);
      
    } catch (error) {
      console.error(`❌ ${categoryName} tests failed:`, error);
      executionTimes[categoryName] = Date.now() - startTime;
      
      if (failFast) {
        throw error;
      }
      
      // Add error result if category fails
      allResults.push({
        testName: `${categoryName} Execution`,
        category: categoryName.toLowerCase().replace(/\s+/g, '') as any,
        status: 'fail',
        score: 0,
        maxScore: 100,
        message: `Category execution failed: ${error}`,
        executionTime: Date.now() - startTime
      });
    }
  }
  
  private static async generateOverallReport(
    allResults: TestResult[],
    locationData: LocationSEOData,
    config: ComprehensiveQAConfig
  ): Promise<QAReport> {
    
    // Use the existing QualityAssuranceEngine to generate base report
    // then enhance it with our comprehensive analysis
    
    const passedTests = allResults.filter(r => r.status === 'pass').length;
    const failedTests = allResults.filter(r => r.status === 'fail').length;
    const warningTests = allResults.filter(r => r.status === 'warning').length;
    const skippedTests = allResults.filter(r => r.status === 'skip').length;
    
    const overallScore = this.calculateOverallScore(allResults);
    const passRate = (passedTests / allResults.length) * 100;
    
    const categoryScores = this.calculateCategoryScores(allResults);
    const complianceStatus = this.calculateComplianceStatus(categoryScores);
    const criticalIssues = allResults.filter(r => r.status === 'fail' || (r.status === 'warning' && r.score < 50));
    const recommendations = this.generateRecommendations(allResults);
    
    return {
      overallScore,
      passRate,
      totalTests: allResults.length,
      passedTests,
      failedTests,
      warningTests,
      skippedTests,
      categoryScores,
      testResults: allResults,
      criticalIssues,
      recommendations,
      complianceStatus,
      executionTime: allResults.reduce((sum, r) => sum + r.executionTime, 0),
      timestamp: new Date()
    };
  }
  
  private static generateComplianceMatrix(results: TestResult[]): ComplianceMatrix {
    
    // Medical compliance
    const medicalResults = results.filter(r => r.category === 'medicalAccuracy');
    const medicalScores = {
      factualAccuracy: medicalResults.find(r => r.testName.includes('Factual'))?.score || 0,
      disclaimers: medicalResults.find(r => r.testName.includes('Disclaimer'))?.score || 0,
      professionalStandards: medicalResults.find(r => r.testName.includes('Professional'))?.score || 0,
      regulatoryCompliance: medicalResults.find(r => r.testName.includes('Regulatory'))?.score || 0
    };
    
    // Technical compliance
    const technicalResults = results.filter(r => r.category === 'technicalValidation');
    const technicalScores = {
      codeQuality: technicalResults.find(r => r.testName.includes('TypeScript'))?.score || 0,
      buildValidation: technicalResults.find(r => r.testName.includes('Build'))?.score || 0,
      routeIntegrity: technicalResults.find(r => r.testName.includes('Route'))?.score || 0,
      errorHandling: technicalResults.find(r => r.testName.includes('Error'))?.score || 0
    };
    
    // SEO compliance
    const seoResults = results.filter(r => r.category === 'seoValidation');
    const seoScores = {
      keywordOptimization: seoResults.find(r => r.testName.includes('Keyword'))?.score || 0,
      metaTags: seoResults.find(r => r.testName.includes('Meta'))?.score || 0,
      schemaMarkup: seoResults.find(r => r.testName.includes('Schema'))?.score || 0,
      localSEO: seoResults.find(r => r.testName.includes('Local'))?.score || 0
    };
    
    // Content compliance
    const contentResults = results.filter(r => r.category === 'contentQuality');
    const contentScores = {
      quality: contentResults.find(r => r.testName.includes('Grammar'))?.score || 0,
      uniqueness: contentResults.find(r => r.testName.includes('Uniqueness'))?.score || 0,
      readability: contentResults.find(r => r.testName.includes('Readability'))?.score || 0,
      structure: contentResults.find(r => r.testName.includes('Structure'))?.score || 0
    };
    
    const threshold = 70; // Compliance threshold
    
    return {
      medical: {
        factualAccuracy: medicalScores.factualAccuracy >= threshold,
        disclaimers: medicalScores.disclaimers >= threshold,
        professionalStandards: medicalScores.professionalStandards >= threshold,
        regulatoryCompliance: medicalScores.regulatoryCompliance >= threshold,
        overall: Object.values(medicalScores).every(score => score >= threshold)
      },
      technical: {
        codeQuality: technicalScores.codeQuality >= threshold,
        buildValidation: technicalScores.buildValidation >= threshold,
        routeIntegrity: technicalScores.routeIntegrity >= threshold,
        errorHandling: technicalScores.errorHandling >= threshold,
        overall: Object.values(technicalScores).every(score => score >= threshold)
      },
      seo: {
        keywordOptimization: seoScores.keywordOptimization >= threshold,
        metaTags: seoScores.metaTags >= threshold,
        schemaMarkup: seoScores.schemaMarkup >= threshold,
        localSEO: seoScores.localSEO >= threshold,
        overall: Object.values(seoScores).every(score => score >= threshold)
      },
      content: {
        quality: contentScores.quality >= threshold,
        uniqueness: contentScores.uniqueness >= threshold,
        readability: contentScores.readability >= threshold,
        structure: contentScores.structure >= threshold,
        overall: Object.values(contentScores).every(score => score >= threshold)
      }
    };
  }
  
  private static evaluateQualityGates(results: TestResult[], config: ComprehensiveQAConfig): QualityGateResult[] {
    
    const gates: QualityGateResult[] = [];
    
    // Overall quality gate
    const overallScore = this.calculateOverallScore(results);
    gates.push({
      gateName: 'Overall Quality',
      category: 'general',
      threshold: config.qualityThresholds.overall,
      actualScore: overallScore,
      passed: overallScore >= config.qualityThresholds.overall,
      blockers: overallScore < config.qualityThresholds.overall ? ['Overall score below threshold'] : [],
      recommendations: overallScore < config.qualityThresholds.overall ? ['Focus on failing test categories'] : []
    });
    
    // Category-specific gates
    const categoryScores = this.calculateCategoryScores(results);
    Object.entries(categoryScores).forEach(([category, score]) => {
      gates.push({
        gateName: `${category} Quality Gate`,
        category,
        threshold: config.qualityThresholds.category,
        actualScore: score,
        passed: score >= config.qualityThresholds.category,
        blockers: score < config.qualityThresholds.category ? [`${category} score below threshold`] : [],
        recommendations: score < config.qualityThresholds.category ? [`Improve ${category} standards`] : []
      });
    });
    
    // Critical tests gate
    const criticalFailures = results.filter(r => r.status === 'fail' && r.score < 50);
    gates.push({
      gateName: 'Critical Issues Gate',
      category: 'critical',
      threshold: 0,
      actualScore: criticalFailures.length,
      passed: criticalFailures.length === 0,
      blockers: criticalFailures.map(f => f.testName),
      recommendations: criticalFailures.length > 0 ? ['Fix all critical issues before proceeding'] : []
    });
    
    return gates;
  }
  
  private static calculateExecutionMetrics(
    startTime: number,
    totalTests: number,
    categoryTimes: Record<string, number>
  ): ExecutionMetrics {
    
    const totalExecutionTime = Date.now() - startTime;
    const testsPerSecond = totalTests / (totalExecutionTime / 1000);
    
    // Calculate parallel efficiency (rough estimate)
    const sequentialTime = Object.values(categoryTimes).reduce((sum, time) => sum + time, 0);
    const parallelEfficiency = sequentialTime > 0 ? (sequentialTime / totalExecutionTime) : 1;
    
    return {
      totalExecutionTime,
      testsPerSecond: Math.round(testsPerSecond * 100) / 100,
      categoryExecutionTimes: categoryTimes,
      parallelEfficiency: Math.min(1, Math.round(parallelEfficiency * 100) / 100),
      resourceUtilization: 0.85 // Placeholder - would be calculated from actual system metrics
    };
  }
  
  private static prioritizeRecommendations(results: TestResult[], report: QAReport): PrioritizedRecommendations {
    
    const critical = report.recommendations.filter(r => r.priority === 'critical');
    const high = report.recommendations.filter(r => r.priority === 'high');
    const medium = report.recommendations.filter(r => r.priority === 'medium');
    const low = report.recommendations.filter(r => r.priority === 'low');
    
    // Identify quick wins (high impact, low effort)
    const quickWins = report.recommendations.filter(r => 
      r.estimatedEffort === 'low' && (r.priority === 'high' || r.priority === 'critical')
    );
    
    // Identify long-term improvements
    const longTerm = report.recommendations.filter(r => 
      r.estimatedEffort === 'high' && r.priority !== 'critical'
    );
    
    return {
      critical,
      high,
      medium,
      low,
      quickWins,
      longTerm
    };
  }
  
  private static evaluateCertificationStatus(
    report: QAReport,
    compliance: ComplianceMatrix
  ): CertificationStatus {
    
    const medicalContentCertified = compliance.medical.overall && report.overallScore >= 80;
    const seoOptimizationCertified = compliance.seo.overall && report.overallScore >= 75;
    const technicalQualityCertified = compliance.technical.overall && report.overallScore >= 80;
    const accessibilityCertified = true; // Placeholder - not implemented yet
    const performanceCertified = report.overallScore >= 70;
    
    const overallCertified = medicalContentCertified && seoOptimizationCertified && technicalQualityCertified;
    
    // Determine certification level
    let certificationLevel: CertificationStatus['certificationLevel'] = 'none';
    
    if (report.overallScore >= 95 && overallCertified) {
      certificationLevel = 'platinum';
    } else if (report.overallScore >= 90 && overallCertified) {
      certificationLevel = 'gold';
    } else if (report.overallScore >= 80 && overallCertified) {
      certificationLevel = 'silver';
    } else if (report.overallScore >= 70) {
      certificationLevel = 'bronze';
    }
    
    // Certification valid for 6 months
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 6);
    
    return {
      medicalContentCertified,
      seoOptimizationCertified,
      technicalQualityCertified,
      accessibilityCertified,
      performanceCertified,
      overallCertified,
      certificationLevel,
      validUntil
    };
  }
  
  private static async saveQAReports(
    result: ComprehensiveQAResult,
    locationData: LocationSEOData,
    config: ComprehensiveQAConfig
  ): Promise<void> {
    
    const fs = require('fs');
    const path = require('path');
    
    const reportsDir = path.join(process.cwd(), 'reports', 'qa');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFileName = `${locationData.slug}-qa-${timestamp}`;
    
    // Save markdown report
    if (config.reportFormat === 'markdown' || config.reportFormat === 'both') {
      const markdownReport = this.generateMarkdownReport(result, locationData);
      const mdPath = path.join(reportsDir, `${baseFileName}.md`);
      fs.writeFileSync(mdPath, markdownReport, 'utf8');
      console.log(`📄 Markdown QA report saved: ${mdPath}`);
    }
    
    // Save JSON report
    if (config.reportFormat === 'json' || config.reportFormat === 'both') {
      const jsonReport = JSON.stringify(result, null, 2);
      const jsonPath = path.join(reportsDir, `${baseFileName}.json`);
      fs.writeFileSync(jsonPath, jsonReport, 'utf8');
      console.log(`📄 JSON QA report saved: ${jsonPath}`);
    }
  }
  
  private static generateMarkdownReport(result: ComprehensiveQAResult, locationData: LocationSEOData): string {
    
    const report = `
# Comprehensive Quality Assurance Report
## ${locationData.displayName} - ${result.overallReport.timestamp.toISOString().split('T')[0]}

## Executive Summary
- **Overall Score**: ${result.overallReport.overallScore}/100
- **Pass Rate**: ${result.overallReport.passRate.toFixed(1)}%
- **Certification Level**: 🏆 ${result.certificationStatus.certificationLevel.toUpperCase()}
- **Overall Certified**: ${result.certificationStatus.overallCertified ? '✅ YES' : '❌ NO'}

## Performance Metrics
- **Total Tests**: ${result.overallReport.totalTests}
- **Execution Time**: ${result.executionMetrics.totalExecutionTime}ms
- **Tests/Second**: ${result.executionMetrics.testsPerSecond}
- **Parallel Efficiency**: ${(result.executionMetrics.parallelEfficiency * 100).toFixed(1)}%

## Compliance Matrix

### Medical Compliance ${result.complianceMatrix.medical.overall ? '✅' : '❌'}
- Factual Accuracy: ${result.complianceMatrix.medical.factualAccuracy ? '✅' : '❌'}
- Disclaimers: ${result.complianceMatrix.medical.disclaimers ? '✅' : '❌'}
- Professional Standards: ${result.complianceMatrix.medical.professionalStandards ? '✅' : '❌'}
- Regulatory Compliance: ${result.complianceMatrix.medical.regulatoryCompliance ? '✅' : '❌'}

### Technical Compliance ${result.complianceMatrix.technical.overall ? '✅' : '❌'}
- Code Quality: ${result.complianceMatrix.technical.codeQuality ? '✅' : '❌'}
- Build Validation: ${result.complianceMatrix.technical.buildValidation ? '✅' : '❌'}
- Route Integrity: ${result.complianceMatrix.technical.routeIntegrity ? '✅' : '❌'}
- Error Handling: ${result.complianceMatrix.technical.errorHandling ? '✅' : '❌'}

### SEO Compliance ${result.complianceMatrix.seo.overall ? '✅' : '❌'}
- Keyword Optimization: ${result.complianceMatrix.seo.keywordOptimization ? '✅' : '❌'}
- Meta Tags: ${result.complianceMatrix.seo.metaTags ? '✅' : '❌'}
- Schema Markup: ${result.complianceMatrix.seo.schemaMarkup ? '✅' : '❌'}
- Local SEO: ${result.complianceMatrix.seo.localSEO ? '✅' : '❌'}

### Content Compliance ${result.complianceMatrix.content.overall ? '✅' : '❌'}
- Quality: ${result.complianceMatrix.content.quality ? '✅' : '❌'}
- Uniqueness: ${result.complianceMatrix.content.uniqueness ? '✅' : '❌'}
- Readability: ${result.complianceMatrix.content.readability ? '✅' : '❌'}
- Structure: ${result.complianceMatrix.content.structure ? '✅' : '❌'}

## Quality Gates
${result.qualityGates.map(gate => `
### ${gate.gateName} ${gate.passed ? '✅' : '❌'}
- **Threshold**: ${gate.threshold}
- **Actual**: ${gate.actualScore}
- **Status**: ${gate.passed ? 'PASSED' : 'FAILED'}
${gate.blockers.length > 0 ? `- **Blockers**: ${gate.blockers.join(', ')}` : ''}
${gate.recommendations.length > 0 ? `- **Recommendations**: ${gate.recommendations.join(', ')}` : ''}
`).join('')}

## Category Results
${Array.from(result.categoryReports.entries()).map(([category, tests]) => `
### ${category}
- **Tests**: ${tests.length}
- **Passed**: ${tests.filter(t => t.status === 'pass').length}
- **Failed**: ${tests.filter(t => t.status === 'fail').length}
- **Warnings**: ${tests.filter(t => t.status === 'warning').length}

${tests.map(test => `
#### ${test.testName} ${test.status === 'pass' ? '✅' : test.status === 'warning' ? '⚠️' : '❌'}
- **Score**: ${test.score}/${test.maxScore}
- **Message**: ${test.message}
- **Time**: ${test.executionTime}ms
${test.recommendations && test.recommendations.length > 0 ? `- **Recommendations**: ${test.recommendations.join(', ')}` : ''}
`).join('')}
`).join('')}

## Prioritized Recommendations

### 🔥 Critical (${result.recommendations.critical.length})
${result.recommendations.critical.map((rec, i) => `${i + 1}. **${rec.issue}**\n   Solution: ${rec.recommendation}\n   Impact: ${rec.expectedImpact}`).join('\n')}

### ⚡ Quick Wins (${result.recommendations.quickWins.length})
${result.recommendations.quickWins.map((rec, i) => `${i + 1}. **${rec.issue}**\n   Solution: ${rec.recommendation}\n   Effort: ${rec.estimatedEffort}`).join('\n')}

### 📈 High Priority (${result.recommendations.high.length})
${result.recommendations.high.map((rec, i) => `${i + 1}. **${rec.issue}**\n   Solution: ${rec.recommendation}`).join('\n')}

## Certification Details
- **Medical Content**: ${result.certificationStatus.medicalContentCertified ? '✅ Certified' : '❌ Not Certified'}
- **SEO Optimization**: ${result.certificationStatus.seoOptimizationCertified ? '✅ Certified' : '❌ Not Certified'}
- **Technical Quality**: ${result.certificationStatus.technicalQualityCertified ? '✅ Certified' : '❌ Not Certified'}
- **Performance**: ${result.certificationStatus.performanceCertified ? '✅ Certified' : '❌ Not Certified'}

**Certificate Valid Until**: ${result.certificationStatus.validUntil.toDateString()}

---
*Generated by Comprehensive Quality Assurance System*
*Execution Time: ${result.executionMetrics.totalExecutionTime}ms*
    `;
    
    return report.trim();
  }
  
  // Helper methods (reused from base QA engine)
  private static calculateOverallScore(results: TestResult[]): number {
    if (results.length === 0) return 0;
    
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const maxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
    
    return Math.round((totalScore / maxScore) * 100);
  }
  
  private static calculateCategoryScores(results: TestResult[]): Record<string, number> {
    const categories = [...new Set(results.map(r => r.category))];
    const scores: Record<string, number> = {};
    
    categories.forEach(category => {
      const categoryResults = results.filter(r => r.category === category);
      if (categoryResults.length > 0) {
        const totalScore = categoryResults.reduce((sum, r) => sum + r.score, 0);
        const maxScore = categoryResults.reduce((sum, r) => sum + r.maxScore, 0);
        scores[category] = Math.round((totalScore / maxScore) * 100);
      }
    });
    
    return scores;
  }
  
  private static calculateComplianceStatus(categoryScores: Record<string, number>): any {
    return {
      medicalCompliance: categoryScores.medicalAccuracy >= 80,
      seoCompliance: categoryScores.seoValidation >= 80,
      accessibilityCompliance: true, // Placeholder
      performanceCompliance: categoryScores.performance >= 70,
      securityCompliance: true, // Placeholder
      overallCompliance: Object.values(categoryScores).every(score => score >= 70)
    };
  }
  
  private static generateRecommendations(results: TestResult[]): QARecommendation[] {
    const recommendations: QARecommendation[] = [];
    
    const failedTests = results.filter(r => r.status === 'fail');
    failedTests.forEach(test => {
      if (test.recommendations && test.recommendations.length > 0) {
        recommendations.push({
          priority: test.score < 30 ? 'critical' : 'high',
          category: test.category,
          issue: test.message,
          recommendation: test.recommendations[0],
          estimatedEffort: test.score < 30 ? 'high' : 'medium',
          expectedImpact: 'Improved test score and compliance'
        });
      }
    });
    
    return recommendations;
  }
}

export default ComprehensiveQAOrchestrator;