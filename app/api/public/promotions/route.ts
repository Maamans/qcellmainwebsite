import { NextResponse } from 'next/server';

/**
 * GET /api/public/promotions
 * Get active promotions (automatically filters by active dates)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET() {
  try {
    // TODO: Replace with actual database queries
    // For now, returning empty array
    
    const promotions: unknown[] = [];

    return NextResponse.json(promotions, { status: 200 });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}

