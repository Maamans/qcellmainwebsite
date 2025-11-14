import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/services
 * Get services with optional category filter
 * Query param: ?category=category-name (optional)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // TODO: Replace with actual database queries
    // For now, returning empty array
    
    const services: unknown[] = [];

    // Filter by category if provided
    const filteredServices = category
      ? services.filter((s) => (s as { category?: string }).category === category)
      : services;

    return NextResponse.json(filteredServices, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

