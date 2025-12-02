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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
    // Forward request to backend API
    const response = await fetch(`${API_URL}/api/public/promotions-offerings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      // If backend is not available, return empty array (will use fallback)
      if (response.status === 404 || response.status >= 500) {
        return NextResponse.json([], { status: 200 });
      }
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data (could be array or object with promotions array)
    const promotions = Array.isArray(data) ? data : (data.promotions || data.offerings || []);
    
    return NextResponse.json(promotions, { status: 200 });
  } catch (error) {
    console.error('Error fetching promotions offerings:', error);
    // Return empty array on error so frontend can use fallback
    return NextResponse.json([], { status: 200 });
  }
}

