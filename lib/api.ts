/**
 * API Client for Frontend
 * 
 * Copy this file to your frontend project: lib/api.ts or utils/api.ts
 * 
 * This provides all the functions needed to fetch content from the CMS backend.
 */

// Backend API URL - defaults to localhost:4000
// Set NEXT_PUBLIC_API_URL in .env.local to override
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper to build image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  // If image is from backend uploads, prepend API_URL
  if (imagePath.startsWith('/uploads/') && API_URL) {
    return `${API_URL}${imagePath}`;
  }
  // If it's a public image path (starts with /images/), use as-is
  if (imagePath.startsWith('/images/')) {
    return imagePath;
  }
  // For other relative paths, prepend API_URL if available
  if (imagePath.startsWith('/') && API_URL) {
    return `${API_URL}${imagePath}`;
  }
  return imagePath;
};

// Helper to build video URL (same logic as images)
export const getVideoUrl = (videoPath: string): string => {
  if (!videoPath) return '';
  // Videos can be in /uploads/, /videos/, or external URLs
  return getImageUrl(videoPath);
};

// API Client - All endpoints are PUBLIC (no authentication required)
const normalizePageParam = (page?: string | null) => {
  if (page === undefined || page === null) return undefined
  if (page === "") return "/"
  return page
}

export const api = {
  /**
   * Get all homepage content in one call (NO AUTH NEEDED)
   * Returns: { heroSlides, devices, tariffs, promotions, internetPlans, services }
   */
  getHomepage: async () => {
    // Try /api/public/homepage first, fallback to /api/homepage
    let response = await fetch(`${API_URL}/api/public/homepage`);
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/homepage`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get offerings for the homepage carousel (NO AUTH NEEDED)
   */
  getOfferings: async () => {
    // Try /api/public/offerings first, fallback to /api/offerings
    let response = await fetch(`${API_URL}/api/public/offerings`)
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/offerings`)
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch offerings: ${response.status} ${response.statusText}`)
    }
    return response.json()
  },

  /**
   * Get hero slides for a specific page (NO AUTH NEEDED)
   * @param page - Page path (e.g., '/about-us', '/devices', '/careers/apply'). Use '/' or null for homepage
   * Returns empty array if no slides found or backend unavailable (frontend uses fallback)
   */
  getHeroSlides: async (page?: string | null) => {
    try {
      const pageParam = normalizePageParam(page);
      // Try /api/public/hero-slides first, fallback to /api/hero-slides
      let url = pageParam
        ? `${API_URL}/api/public/hero-slides?page=${encodeURIComponent(pageParam)}`
        : `${API_URL}/api/public/hero-slides`;
      
      let response = await fetch(url);
      if (!response.ok && response.status === 404) {
        url = pageParam
          ? `${API_URL}/api/hero-slides?page=${encodeURIComponent(pageParam)}`
          : `${API_URL}/api/hero-slides`;
        response = await fetch(url);
      }
      
      // If still 404 or error, return empty array (frontend will use fallback)
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        // For other errors, log but return empty array
        console.warn(`Failed to fetch hero slides for ${pageParam || '/'}: ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Network errors or other issues - return empty array (frontend uses fallback)
      console.warn(`Error fetching hero slides for ${page || '/'}:`, error);
      return [];
    }
  },

  /**
   * Get devices (NO AUTH NEEDED)
   * @param category - Optional: 'smartphone', 'feature-phone', 'mifi', 'router'
   */
  getDevices: async (category?: string) => {
    // Try /api/public/devices first, fallback to /api/devices
    let url = category
      ? `${API_URL}/api/public/devices?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/public/devices`;
    
    let response = await fetch(url);
    if (!response.ok && response.status === 404) {
      url = category
        ? `${API_URL}/api/devices?category=${encodeURIComponent(category)}`
        : `${API_URL}/api/devices`;
      response = await fetch(url);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch devices: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get tariffs (NO AUTH NEEDED)
   * @param type - Optional: 'voice', 'data', 'combo', 'voice-tariff'
   */
  getTariffs: async (type?: string) => {
    // Try /api/public/tariffs first, fallback to /api/tariffs
    let url = type
      ? `${API_URL}/api/public/tariffs?type=${encodeURIComponent(type)}`
      : `${API_URL}/api/public/tariffs`;
    
    let response = await fetch(url);
    if (!response.ok && response.status === 404) {
      url = type
        ? `${API_URL}/api/tariffs?type=${encodeURIComponent(type)}`
        : `${API_URL}/api/tariffs`;
      response = await fetch(url);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch tariffs: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get promotions - automatically filters by active dates (NO AUTH NEEDED)
   */
  getPromotions: async () => {
    // Try /api/public/promotions first, fallback to /api/promotions
    let response = await fetch(`${API_URL}/api/public/promotions`);
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/promotions`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch promotions: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get promotions offerings for carousel (NO AUTH NEEDED)
   * Returns active promotions ordered by order field
   */
  getPromotionsOfferings: async () => {
    try {
      // Try frontend API route first (which proxies to backend)
      // Use relative URL to ensure it goes through Next.js API route
      const response = await fetch('/api/public/promotions-offerings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        // Return empty array on any error - allows fallback to work
        return [];
      }
      
      const data = await response.json();
      // Handle both array and object responses
      return Array.isArray(data) ? data : (data.promotions || data.offerings || []);
    } catch {
      // Return empty array on any error to allow fallback
      return [];
    }
  },

  /**
   * Get internet plans (NO AUTH NEEDED)
   */
  getInternetPlans: async () => {
    // Try /api/public/internet-plans first, fallback to /api/internet-plans
    let response = await fetch(`${API_URL}/api/public/internet-plans`);
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/internet-plans`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch internet plans: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get services (NO AUTH NEEDED)
   * @param category - Optional category filter
   */
  getServices: async (category?: string) => {
    // Try /api/public/services first, fallback to /api/services
    let url = category
      ? `${API_URL}/api/public/services?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/public/services`;
    
    let response = await fetch(url);
    if (!response.ok && response.status === 404) {
      url = category
        ? `${API_URL}/api/services?category=${encodeURIComponent(category)}`
        : `${API_URL}/api/services`;
      response = await fetch(url);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get About Us section (NO AUTH NEEDED)
   * @param section - 'mission', 'vision', 'values', 'history'
   */
  getAboutSection: async (section: string) => {
    // Try /api/public/about/:section first, fallback to /api/about/:section
    let response = await fetch(`${API_URL}/api/public/about/${section}`);
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/about/${section}`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch about section: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get impact/CSR content (NO AUTH NEEDED)
   */
  getImpact: async () => {
    // Try /api/public/impact first, fallback to /api/impact
    let response = await fetch(`${API_URL}/api/public/impact`);
    if (!response.ok && response.status === 404) {
      response = await fetch(`${API_URL}/api/impact`);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch impact: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get support items (NO AUTH NEEDED)
   * @param category - Optional category filter
   * Returns empty array if no items found or backend unavailable (frontend uses fallback)
   */
  getSupport: async (category?: string) => {
    try {
      // Try /api/public/support first, fallback to /api/support
      let url = category
        ? `${API_URL}/api/public/support?category=${encodeURIComponent(category)}`
        : `${API_URL}/api/public/support`;
      
      let response = await fetch(url);
      if (!response.ok && response.status === 404) {
        url = category
          ? `${API_URL}/api/support?category=${encodeURIComponent(category)}`
          : `${API_URL}/api/support`;
        response = await fetch(url);
      }
      
      // If still 404 or error, return empty array (frontend will use fallback)
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        // For other errors, log but return empty array
        console.warn(`Failed to fetch support items${category ? ` for category ${category}` : ''}: ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Network errors or other issues - return empty array (frontend uses fallback)
      console.warn(`Error fetching support items${category ? ` for category ${category}` : ''}:`, error);
      return [];
    }
  },

  /**
   * Get page content sections (NO AUTH NEEDED)
   * @param pagePath - Page path (e.g., '/about-us', '/careers/apply')
   * Returns empty array if no content found or backend unavailable (frontend uses fallback)
   * 
   * API Endpoint Format: /api/public/page-content/{pagePath} (path parameter, not query)
   * Example: /api/public/page-content/%2Fcareers%2Fapply
   */
  getPageContent: async (pagePath: string) => {
    try {
      // Use path parameter format (correct): /api/public/page-content/{pagePath}
      // encodeURIComponent ensures proper encoding (e.g., /careers/apply becomes %2Fcareers%2Fapply)
      let response = await fetch(
        `${API_URL}/api/public/page-content/${encodeURIComponent(pagePath)}`
      );
      if (!response.ok && response.status === 404) {
        response = await fetch(
          `${API_URL}/api/page-content/${encodeURIComponent(pagePath)}`
        );
      }
      
      // If still 404 or error, return empty array (frontend will use fallback)
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        // For other errors, log but return empty array
        console.warn(`Failed to fetch page content for ${pagePath}: ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Network errors or other issues - return empty array (frontend uses fallback)
      console.warn(`Error fetching page content for ${pagePath}:`, error);
      return [];
    }
  },

  /**
   * Get the complete Devices page payload (NO AUTH NEEDED)
   * Returns heroSlides, sections, devices, featuredDevices
   */
  getDevicesPage: async () => {
    const response = await fetch(`${API_URL}/api/public/devices-page/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch devices page: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
};

