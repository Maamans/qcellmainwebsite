import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/page-content/:pagePath
 * Get page content sections
 * @param pagePath - Page path (e.g., '/about-us', '/careers/apply')
 * NO AUTH NEEDED - Public endpoint
 * 
 * This endpoint proxies requests to the backend API at http://localhost:4000/api/public/page-content/{pagePath}
 * Falls back to empty array if backend is unavailable
 * 
 * Format: Path parameter (not query parameter)
 * Example: /api/public/page-content/%2Fcareers%2Fapply
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pagePath: string }> }
) {
  try {
    const { pagePath } = await params;

    // Decode the page path (it comes encoded from the URL)
    const decodedPagePath = decodeURIComponent(pagePath);

    // Build backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${backendUrl}/api/public/page-content/${encodeURIComponent(decodedPagePath)}`;

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
        // Backend should return an array, but handle object format too
        if (Array.isArray(data)) {
          return NextResponse.json(data, { status: 200 });
        }
        // If backend returns object with sections property, extract sections
        if (data && Array.isArray(data.sections)) {
          return NextResponse.json(data.sections, { status: 200 });
        }
        // If no sections, return empty array
        return NextResponse.json([], { status: 200 });
      }

      // If backend returns 404, return empty array (frontend will use fallback)
      if (response.status === 404) {
        return NextResponse.json([], { status: 200 });
      }

      // For other errors, return empty array
      console.warn(`Backend API returned ${response.status} for /api/public/page-content/${decodedPagePath}`);
      return NextResponse.json([], { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Network error or timeout - return empty array (frontend will use fallback)
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn(`Backend API timeout for /api/public/page-content/${decodedPagePath}`);
      } else {
        console.warn(`Backend API error for /api/public/page-content/${decodedPagePath}:`, fetchError);
      }
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.error('Error in page-content API route:', error);
    // Return empty array on any error (frontend will use fallback)
    return NextResponse.json([], { status: 200 });
  }
}

