import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/tariffs
 * Get tariffs with optional type filter
 * Query param: ?type=voice (optional)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    // TODO: Replace with actual database queries
    // For now, returning empty array
    
    const tariffs: unknown[] = [];

    // Filter by type if provided
    const filteredTariffs = type
      ? tariffs.filter((t) => (t as { type?: string }).type === type)
      : tariffs;

    return NextResponse.json(filteredTariffs, { status: 200 });
  } catch (error) {
    console.error('Error fetching tariffs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tariffs' },
      { status: 500 }
    );
  }
}

