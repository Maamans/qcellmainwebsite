import { NextRequest, NextResponse } from 'next/server';
import { sanitizeCategory, isValidOrigin } from '@/lib/security';
import { validateQueryParams } from '@/lib/validation';

/**
 * GET /api/public/support
 * Get support items with optional category filter
 * Query param: ?category=category-name (optional)
 * NO AUTH NEEDED - Public endpoint
 * 
 * This endpoint proxies requests to the backend API at http://localhost:4000/api/public/support
 * Falls back to empty array if backend is unavailable
 */
export async function GET(request: NextRequest) {
  try {
    // Security: Validate origin
    const origin = request.headers.get('origin');
    if (origin && !isValidOrigin(origin)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // Security: Validate and sanitize query parameters
    const validation = validateQueryParams(request.nextUrl.searchParams);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validation.errors },
        { status: 400 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    // Security: Sanitize category
    const sanitizedCategory = category ? sanitizeCategory(category) : undefined;

    // Build backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    let url = `${backendUrl}/api/public/support`;
    
    if (sanitizedCategory) {
      url += `?category=${encodeURIComponent(sanitizedCategory)}`;
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
        return NextResponse.json(data, { status: 200 });
      }

      // If backend returns 404, return empty array (frontend will use fallback)
      if (response.status === 404) {
        return NextResponse.json([], { status: 200 });
      }

      // For other errors, return empty array
      console.warn(`Backend API returned ${response.status} for /api/public/support`);
      return NextResponse.json([], { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Network error or timeout - return empty array (frontend will use fallback)
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('Backend API timeout for /api/public/support');
      } else {
        console.warn('Backend API error for /api/public/support:', fetchError);
      }
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.error('Error in support API route:', error);
    // Return empty array on any error (frontend will use fallback)
    return NextResponse.json([], { status: 200 });
  }
}

