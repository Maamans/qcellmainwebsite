import { NextResponse } from 'next/server';

/**
 * GET /api/public/homepage
 * Returns all homepage content in one call
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET() {
  try {
    // TODO: Replace with actual database queries
    // For now, returning mock data structure
    
    const homepageData = {
      heroSlides: [
        {
          id: '1',
          page: '/',
          title: 'Expand Your World',
          description: '',
          image: '/images/expand your world.jpg',
          ctaText: '',
          ctaLink: '',
          order: 0,
          isActive: true,
        },
      ],
      devices: [
        {
          id: '1',
          title: 'QSmart',
          description: 'Affordable smartphones packed with smart features',
          image: '/images/QSMART_.jpg',
          category: 'smartphone',
          price: null,
          features: [],
          detailsTitle: '',
          detailsDescription: '',
          detailsBenefits: [],
          ctaText: 'Learn More',
          ctaAction: '/devices',
          order: 0,
          isActive: true,
        },
      ],
      tariffs: [],
      promotions: [],
      internetPlans: [],
      services: [],
    };

    return NextResponse.json(homepageData, { status: 200 });
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    );
  }
}

