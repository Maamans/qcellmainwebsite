import { NextResponse } from 'next/server';

/**
 * GET /api/public/internet-plans
 * Get internet plans
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET() {
  try {
    // TODO: Replace with actual database queries
    // For now, returning empty array
    
    const internetPlans: unknown[] = [];

    return NextResponse.json(internetPlans, { status: 200 });
  } catch (error) {
    console.error('Error fetching internet plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internet plans' },
      { status: 500 }
    );
  }
}

