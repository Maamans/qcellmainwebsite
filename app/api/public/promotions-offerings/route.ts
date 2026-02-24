import { NextResponse } from 'next/server';

/**
 * GET /api/public/promotions-offerings
 * Get active promotions offerings for carousel
 * NO AUTH NEEDED - Public endpoint
 * 
 * Returns promotions filtered by:
 * - isActive: true
 * - Active date range (if dates are set)
 * Ordered by 'order' field
 */
export async function GET() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // If no backend URL is configured, return empty array and let frontend use fallback data
    if (!API_URL) {
      return NextResponse.json([], { status: 200 });
    }
    
    // Fetch from backend with timeout (short, to avoid Netlify edge function timeouts)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    try {
      const response = await fetch(`${API_URL}/api/public/promotions-offerings`, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Return the data (could be array or object with promotions array)
        const promotions = Array.isArray(data) ? data : (data.promotions || data.offerings || []);
        
        return NextResponse.json(promotions, { status: 200 });
      }

      // If backend is not available, return empty array (will use fallback)
      if (response.status === 404 || response.status >= 500) {
        return NextResponse.json([], { status: 200 });
      }
      
      console.warn(`[Promotions Offerings API] Backend returned ${response.status}`);
      return NextResponse.json([], { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Network error or timeout - return empty array (frontend will use fallback)
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('[Promotions Offerings API] Backend timeout');
      } else {
        console.warn('[Promotions Offerings API] Backend unavailable, using fallback:', fetchError instanceof Error ? fetchError.message : fetchError);
      }
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.error('[Promotions Offerings API] Error:', error);
    // Silently return empty array on error so frontend can use fallback
    return NextResponse.json([], { status: 200 });
  }
}

