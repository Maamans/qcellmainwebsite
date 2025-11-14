import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/hero-slides
 * Get hero slides for a specific page
 * Query param: ?page=/about-us (optional, defaults to homepage)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '/';

    // TODO: Replace with actual database queries
    // For now, returning mock data
    
    const heroSlides = [
      {
        id: '1',
        page: page === '/' ? '/' : page,
        title: page === '/' ? 'Expand Your World' : 'Welcome',
        description: '',
        image: page === '/' ? '/images/expand your world.jpg' : '/images/logo.jpg',
        ctaText: '',
        ctaLink: '',
        order: 0,
        isActive: true,
      },
    ];

    return NextResponse.json(heroSlides, { status: 200 });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero slides' },
      { status: 500 }
    );
  }
}

