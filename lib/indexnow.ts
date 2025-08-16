/**
 * IndexNow utility service for instant URL indexing
 * Automatically notifies search engines when content changes
 */

export interface IndexNowResponse {
  success: boolean;
  submitted?: number;
  urls?: string[];
  error?: string;
  status?: number;
}

export class IndexNowService {
  private static readonly API_ENDPOINT = '/api/indexnow';
  private static readonly DOMAIN = 'dramitashukla.com';

  /**
   * Submit single URL for indexing
   */
  static async submitUrl(url: string): Promise<IndexNowResponse> {
    return this.submitUrls([url]);
  }

  /**
   * Submit multiple URLs for indexing
   */
  static async submitUrls(urls: string[]): Promise<IndexNowResponse> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ IndexNow: Successfully submitted ${data.submitted} URLs`);
        return data;
      } else {
        console.error(`❌ IndexNow Error:`, data);
        return {
          success: false,
          error: data.error || 'Unknown error',
          status: response.status,
        };
      }
    } catch (error) {
      console.error('IndexNow submission failed:', error);
      return {
        success: false,
        error: 'Network error or service unavailable',
      };
    }
  }

  /**
   * Submit blog post URLs (new posts, updates)
   */
  static async submitBlogPost(slug: string): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/blog/${slug}`,
      `https://${this.DOMAIN}/blog`, // Blog listing page
    ];
    return this.submitUrls(urls);
  }

  /**
   * Submit service page URLs
   */
  static async submitServicePage(serviceSlug: string): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/services/${serviceSlug}`,
      `https://${this.DOMAIN}/services`, // Services listing page
    ];
    return this.submitUrls(urls);
  }

  /**
   * Submit location pages
   */
  static async submitLocationPage(locationSlug: string): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/gynecologist-in/${locationSlug}`,
    ];
    return this.submitUrls(urls);
  }

  /**
   * Submit appointment confirmation pages
   */
  static async submitAppointmentConfirmation(appointmentId: string): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/appointment/confirmation/${appointmentId}`,
      `https://${this.DOMAIN}/contact`, // Contact page for bookings
    ];
    return this.submitUrls(urls);
  }

  /**
   * Submit homepage and main pages after major updates
   */
  static async submitMainPages(): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/`,
      `https://${this.DOMAIN}/about`,
      `https://${this.DOMAIN}/contact`,
      `https://${this.DOMAIN}/services`,
      `https://${this.DOMAIN}/blog`,
    ];
    return this.submitUrls(urls);
  }

  /**
   * Submit sitemap URLs for comprehensive indexing
   */
  static async submitSitemaps(): Promise<IndexNowResponse> {
    const urls = [
      `https://${this.DOMAIN}/sitemap.xml`,
      `https://${this.DOMAIN}/sitemap-pages.xml`,
      `https://${this.DOMAIN}/sitemap-services.xml`,
      `https://${this.DOMAIN}/sitemap-locations.xml`,
      `https://${this.DOMAIN}/sitemap-blog.xml`,
    ];
    return this.submitUrls(urls);
  }

  /**
   * Batch submit multiple content types
   */
  static async submitBatch(submissions: {
    blogPosts?: string[];
    services?: string[];
    locations?: string[];
    customUrls?: string[];
  }): Promise<IndexNowResponse> {
    const allUrls: string[] = [];

    // Add blog post URLs
    if (submissions.blogPosts) {
      submissions.blogPosts.forEach(slug => {
        allUrls.push(`https://${this.DOMAIN}/blog/${slug}`);
      });
    }

    // Add service URLs
    if (submissions.services) {
      submissions.services.forEach(slug => {
        allUrls.push(`https://${this.DOMAIN}/services/${slug}`);
      });
    }

    // Add location URLs
    if (submissions.locations) {
      submissions.locations.forEach(slug => {
        allUrls.push(`https://${this.DOMAIN}/gynecologist-in/${slug}`);
      });
    }

    // Add custom URLs
    if (submissions.customUrls) {
      allUrls.push(...submissions.customUrls);
    }

    return this.submitUrls(allUrls);
  }

  /**
   * Validate if URL belongs to this domain
   */
  static isValidDomainUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === this.DOMAIN || parsedUrl.hostname === `www.${this.DOMAIN}`;
    } catch {
      return false;
    }
  }

  /**
   * Get service status
   */
  static async getStatus(): Promise<any> {
    try {
      const response = await fetch(this.API_ENDPOINT);
      return response.json();
    } catch (error) {
      return { error: 'Service unavailable' };
    }
  }
}

/**
 * Utility hooks for common IndexNow operations
 */
export const useIndexNow = () => {
  const submitUrl = async (url: string) => {
    return IndexNowService.submitUrl(url);
  };

  const submitBlogPost = async (slug: string) => {
    return IndexNowService.submitBlogPost(slug);
  };

  const submitServiceUpdate = async (serviceSlug: string) => {
    return IndexNowService.submitServicePage(serviceSlug);
  };

  return {
    submitUrl,
    submitBlogPost,
    submitServiceUpdate,
  };
};

/**
 * Auto-submit URLs when content changes
 * Use this in your content management workflows
 */
export const autoSubmitToIndexNow = {
  onBlogPublish: (slug: string) => IndexNowService.submitBlogPost(slug),
  onServiceUpdate: (serviceSlug: string) => IndexNowService.submitServicePage(serviceSlug),
  onLocationAdd: (locationSlug: string) => IndexNowService.submitLocationPage(locationSlug),
  onAppointmentBook: (appointmentId: string) => IndexNowService.submitAppointmentConfirmation(appointmentId),
  onMajorUpdate: () => IndexNowService.submitMainPages(),
};