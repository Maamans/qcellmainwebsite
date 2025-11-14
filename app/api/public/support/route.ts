import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/support
 * Get support items with optional category filter
 * Query param: ?category=category-name (optional)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // TODO: Replace with actual database queries
    // For now, returning empty array
    
    const supportItems: unknown[] = [];

    // Filter by category if provided
    const filteredItems = category
      ? supportItems.filter((s) => (s as { category?: string }).category === category)
      : supportItems;

    return NextResponse.json(filteredItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching support:', error);
    return NextResponse.json(
      { error: 'Failed to fetch support' },
      { status: 500 }
    );
  }
}

