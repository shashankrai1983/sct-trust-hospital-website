// Registry Manager - Automatic Location Registry Management
// Handles automatic addition of new locations to the central registry

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { LocationRegistryEntry } from '@/data/locations/registry';
import type { ResearchResult } from './research-module';

export interface RegistryEntryConfig {
  slug: string;
  displayName: string;
  priority: 'high' | 'medium' | 'low';
  searchVolume: 'high' | 'medium' | 'low';
  competitionLevel: 'high' | 'medium' | 'low';
  createdAt: string;
  lastUpdated: string;
}

export interface RegistryUpdateResult {
  success: boolean;
  action: 'created' | 'updated' | 'skipped';
  entry: LocationRegistryEntry | null;
  backupPath: string | null;
  errors: string[];
  warnings: string[];
}

/**
 * Registry Manager Class
 * Manages automatic updates to the location registry
 */
export class RegistryManager {
  private static readonly REGISTRY_FILE_PATH = 'data/locations/registry.ts';
  
  /**
   * Add a new location to the registry based on research data
   */
  static async addLocationToRegistry(
    location: string,
    research: ResearchResult,
    projectRoot: string,
    options: { dryRun?: boolean; backupExisting?: boolean } = {}
  ): Promise<RegistryUpdateResult> {
    
    console.log(`📋 Adding ${location} to location registry...`);
    
    const result: RegistryUpdateResult = {
      success: false,
      action: 'skipped',
      entry: null,
      backupPath: null,
      errors: [],
      warnings: []
    };

    try {
      const registryPath = join(projectRoot, this.REGISTRY_FILE_PATH);
      
      // Check if registry file exists
      if (!existsSync(registryPath)) {
        result.errors.push(`Registry file not found: ${registryPath}`);
        return result;
      }

      // Read current registry
      const currentRegistry = await this.readRegistryFile(registryPath);
      if (!currentRegistry) {
        result.errors.push('Failed to read registry file');
        return result;
      }

      // Generate new registry entry
      const newEntry = this.generateRegistryEntry(location, research);
      
      // Check if entry already exists
      const existingEntryIndex = currentRegistry.entries.findIndex(
        entry => entry.slug === newEntry.slug
      );

      if (existingEntryIndex >= 0) {
        // Update existing entry
        currentRegistry.entries[existingEntryIndex] = {
          ...currentRegistry.entries[existingEntryIndex],
          ...newEntry,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        result.action = 'updated';
        result.entry = currentRegistry.entries[existingEntryIndex];
        console.log(`📝 Updated existing registry entry for ${location}`);
      } else {
        // Add new entry
        currentRegistry.entries.push(newEntry);
        result.action = 'created';
        result.entry = newEntry;
        console.log(`✨ Created new registry entry for ${location}`);
      }

      // Create backup if requested
      if (options.backupExisting) {
        result.backupPath = await this.createRegistryBackup(registryPath);
        if (result.backupPath) {
          console.log(`💾 Created registry backup: ${result.backupPath}`);
        } else {
          result.warnings.push('Failed to create registry backup');
        }
      }

      // Write updated registry
      if (options.dryRun) {
        console.log(`[DRY RUN] Would update registry with entry for ${location}`);
        console.log(`[DRY RUN] Entry:`, JSON.stringify(newEntry, null, 2));
        result.success = true;
      } else {
        const success = await this.writeRegistryFile(registryPath, currentRegistry);
        if (success) {
          result.success = true;
          console.log(`✅ Registry updated successfully for ${location}`);
        } else {
          result.errors.push('Failed to write updated registry file');
        }
      }

      return result;

    } catch (error) {
      result.errors.push(`Registry update failed: ${error}`);
      console.error(`❌ Registry update failed for ${location}:`, error);
      return result;
    }
  }

  /**
   * Generate a registry entry from research data
   */
  private static generateRegistryEntry(
    location: string,
    research: ResearchResult
  ): LocationRegistryEntry {
    const slug = this.generateLocationSlug(location);
    const currentDate = new Date().toISOString().split('T')[0];

    return {
      slug,
      displayName: location,
      status: 'active',
      priority: this.determineLocationPriority(research),
      searchVolume: this.determineSearchVolume(research),
      competitionLevel: this.determineCompetitionLevel(research),
      createdAt: currentDate,
      lastUpdated: currentDate
    };
  }

  /**
   * Determine location priority based on research data
   */
  private static determineLocationPriority(research: ResearchResult): 'high' | 'medium' | 'low' {
    let priorityScore = 0;

    // Population factor (30%)
    const populationStr = research.demographic.population.toLowerCase();
    if (populationStr.includes('lakh') || populationStr.includes('100000')) {
      priorityScore += 3;
    } else if (populationStr.includes('000+') || populationStr.includes('k+')) {
      priorityScore += 2;
    } else {
      priorityScore += 1;
    }

    // Economic profile factor (25%)
    const economicProfile = research.demographic.economicProfile;
    if (economicProfile === 'upper-middle-class' || economicProfile === 'upper-class') {
      priorityScore += 2.5;
    } else if (economicProfile === 'middle-class' || economicProfile === 'mixed') {
      priorityScore += 2;
    } else {
      priorityScore += 1;
    }

    // Connectivity factor (25%)
    const distance = parseFloat(research.geographic.distanceFromHospital);
    if (distance <= 10) {
      priorityScore += 2.5;
    } else if (distance <= 15) {
      priorityScore += 2;
    } else {
      priorityScore += 1;
    }

    // Competition factor (20%) - inverse relationship
    const competitionCount = research.competitive.competitors.length;
    if (competitionCount <= 2) {
      priorityScore += 2;
    } else if (competitionCount <= 5) {
      priorityScore += 1.5;
    } else {
      priorityScore += 1;
    }

    // Convert score to priority
    if (priorityScore >= 8.5) {
      return 'high';
    } else if (priorityScore >= 6.5) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Determine search volume based on research data
   */
  private static determineSearchVolume(research: ResearchResult): 'high' | 'medium' | 'low' {
    // Base on population and economic profile
    const populationStr = research.demographic.population.toLowerCase();
    const economicProfile = research.demographic.economicProfile;

    if (
      (populationStr.includes('lakh') || populationStr.includes('100000')) &&
      (economicProfile === 'upper-middle-class' || economicProfile === 'upper-class')
    ) {
      return 'high';
    } else if (
      populationStr.includes('000+') || 
      economicProfile === 'middle-class' || 
      economicProfile === 'mixed'
    ) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Determine competition level based on research data
   */
  private static determineCompetitionLevel(research: ResearchResult): 'high' | 'medium' | 'low' {
    const competitionCount = research.competitive.competitors.length;
    
    if (competitionCount >= 5) {
      return 'high';
    } else if (competitionCount >= 3) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Generate location slug from location name
   */
  private static generateLocationSlug(location: string): string {
    return location
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Read and parse registry file
   */
  private static async readRegistryFile(registryPath: string): Promise<{
    entries: LocationRegistryEntry[];
    imports: string[];
    exports: string[];
  } | null> {
    try {
      const content = readFileSync(registryPath, 'utf8');
      
      // Extract entries array
      const entriesMatch = content.match(/export const LOCATION_REGISTRY: LocationRegistryEntry\[\] = (\[[\s\S]*?\]);/);
      if (!entriesMatch) {
        console.error('Could not find LOCATION_REGISTRY array in registry file');
        return null;
      }

      // Parse the entries (this is a simplified approach - in production you might want more robust parsing)
      const entriesString = entriesMatch[1];
      const entries: LocationRegistryEntry[] = eval(`(${entriesString})`);

      // Extract imports and exports for reconstruction
      const imports = content.match(/^import.*$/gm) || [];
      const exports = content.match(/^export.*$/gm) || [];

      return { entries, imports, exports };

    } catch (error) {
      console.error('Failed to read registry file:', error);
      return null;
    }
  }

  /**
   * Write updated registry file
   */
  private static async writeRegistryFile(
    registryPath: string,
    registry: { entries: LocationRegistryEntry[]; imports: string[]; exports: string[] }
  ): Promise<boolean> {
    try {
      // Sort entries by priority (high first), then by displayName
      const sortedEntries = [...registry.entries].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return a.displayName.localeCompare(b.displayName);
      });

      // Generate registry content
      const registryContent = this.generateRegistryFileContent(sortedEntries);
      
      // Write file
      writeFileSync(registryPath, registryContent, 'utf8');
      console.log(`📝 Registry file updated: ${registryPath}`);
      return true;

    } catch (error) {
      console.error('Failed to write registry file:', error);
      return false;
    }
  }

  /**
   * Generate complete registry file content
   */
  private static generateRegistryFileContent(entries: LocationRegistryEntry[]): string {
    const entriesContent = entries.map(entry => `  {
    slug: '${entry.slug}',
    displayName: '${entry.displayName}',
    status: '${entry.status}',
    priority: '${entry.priority}',
    searchVolume: '${entry.searchVolume}',
    competitionLevel: '${entry.competitionLevel}',
    createdAt: '${entry.createdAt}',
    lastUpdated: '${entry.lastUpdated}'
  }`).join(',\n');

    return `// Location Registry - Central registry for all location pages
// This ensures consistent location management across the application

export interface LocationRegistryEntry {
  slug: string;
  displayName: string;
  status: 'active' | 'draft' | 'archived';
  priority: 'high' | 'medium' | 'low';
  searchVolume: 'high' | 'medium' | 'low';
  competitionLevel: 'high' | 'medium' | 'low';
  createdAt: string;
  lastUpdated: string;
}

export const LOCATION_REGISTRY: LocationRegistryEntry[] = [
${entriesContent}
];

// Helper functions for location management
export const getActiveLocations = (): LocationRegistryEntry[] => {
  return LOCATION_REGISTRY.filter(location => location.status === 'active');
};

export const getLocationBySlug = (slug: string): LocationRegistryEntry | undefined => {
  return LOCATION_REGISTRY.find(location => location.slug === slug);
};

export const getHighPriorityLocations = (): LocationRegistryEntry[] => {
  return LOCATION_REGISTRY.filter(location => 
    location.status === 'active' && location.priority === 'high'
  );
};

export const getAllLocationSlugs = (): string[] => {
  return getActiveLocations().map(location => location.slug);
};

// SEO and static generation helpers
export const getLocationSlugsForStaticGeneration = (): string[] => {
  return getActiveLocations().map(location => location.slug);
};

export const isValidLocationSlug = (slug: string): boolean => {
  return getAllLocationSlugs().includes(slug);
};

// Export for Next.js generateStaticParams
export const locationParams = getLocationSlugsForStaticGeneration().map(slug => ({
  location: slug
}));

export default LOCATION_REGISTRY;`;
  }

  /**
   * Create backup of registry file
   */
  private static async createRegistryBackup(registryPath: string): Promise<string | null> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${registryPath}.backup.${timestamp}`;
      
      const content = readFileSync(registryPath, 'utf8');
      writeFileSync(backupPath, content, 'utf8');
      
      return backupPath;
    } catch (error) {
      console.error('Failed to create registry backup:', error);
      return null;
    }
  }

  /**
   * Validate registry entry
   */
  static validateRegistryEntry(entry: LocationRegistryEntry): string[] {
    const errors: string[] = [];

    if (!entry.slug || typeof entry.slug !== 'string') {
      errors.push('Slug is required and must be a string');
    }

    if (!entry.displayName || typeof entry.displayName !== 'string') {
      errors.push('Display name is required and must be a string');
    }

    if (!['active', 'draft', 'archived'].includes(entry.status)) {
      errors.push('Status must be one of: active, draft, archived');
    }

    if (!['high', 'medium', 'low'].includes(entry.priority)) {
      errors.push('Priority must be one of: high, medium, low');
    }

    if (!['high', 'medium', 'low'].includes(entry.searchVolume)) {
      errors.push('Search volume must be one of: high, medium, low');
    }

    if (!['high', 'medium', 'low'].includes(entry.competitionLevel)) {
      errors.push('Competition level must be one of: high, medium, low');
    }

    if (!entry.createdAt || !this.isValidDate(entry.createdAt)) {
      errors.push('Created date is required and must be a valid date (YYYY-MM-DD)');
    }

    if (!entry.lastUpdated || !this.isValidDate(entry.lastUpdated)) {
      errors.push('Last updated date is required and must be a valid date (YYYY-MM-DD)');
    }

    return errors;
  }

  /**
   * Check if date string is valid
   */
  private static isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date.getFullYear().toString() === dateString.split('-')[0];
  }

  /**
   * Get registry statistics
   */
  static async getRegistryStats(projectRoot: string): Promise<{
    totalLocations: number;
    activeLocations: number;
    highPriorityLocations: number;
    lastUpdated: string;
  } | null> {
    try {
      const registryPath = join(projectRoot, this.REGISTRY_FILE_PATH);
      const registry = await this.readRegistryFile(registryPath);
      
      if (!registry) return null;

      const activeLocations = registry.entries.filter(entry => entry.status === 'active');
      const highPriorityLocations = activeLocations.filter(entry => entry.priority === 'high');
      
      const lastUpdatedDates = registry.entries.map(entry => new Date(entry.lastUpdated));
      const mostRecentUpdate = new Date(Math.max(...lastUpdatedDates.map(d => d.getTime())));

      return {
        totalLocations: registry.entries.length,
        activeLocations: activeLocations.length,
        highPriorityLocations: highPriorityLocations.length,
        lastUpdated: mostRecentUpdate.toISOString().split('T')[0]
      };

    } catch (error) {
      console.error('Failed to get registry stats:', error);
      return null;
    }
  }
}

export default RegistryManager;