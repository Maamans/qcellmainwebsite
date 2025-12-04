import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/hero-slides
 * Get hero slides for a specific page
 * Query param: ?page=/about-us (optional, defaults to homepage)
 * NO AUTH NEEDED - Public endpoint
 * 
 * This endpoint proxies requests to the backend API at http://localhost:4000/api/public/hero-slides
 * Falls back to empty array if backend is unavailable
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '/';

    // Build backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    let url = `${backendUrl}/api/public/hero-slides`;
    
    if (page && page !== '/') {
      url += `?page=${encodeURIComponent(page)}`;
    }

    // Fetch from backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // Backend should return an array
        return NextResponse.json(Array.isArray(data) ? data : [], { status: 200 });
      }

      // If backend returns 404, return empty array (frontend will use fallback)
      if (response.status === 404) {
        return NextResponse.json([], { status: 200 });
      }

      // For other errors, return empty array
      console.warn(`Backend API returned ${response.status} for /api/public/hero-slides${page !== '/' ? `?page=${page}` : ''}`);
      return NextResponse.json([], { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Network error or timeout - return empty array (frontend will use fallback)
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn(`Backend API timeout for /api/public/hero-slides${page !== '/' ? `?page=${page}` : ''}`);
      } else {
        console.warn(`Backend API error for /api/public/hero-slides${page !== '/' ? `?page=${page}` : ''}:`, fetchError);
      }
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.error('Error in hero-slides API route:', error);
    // Return empty array on any error (frontend will use fallback)
    return NextResponse.json([], { status: 200 });
  }
}

