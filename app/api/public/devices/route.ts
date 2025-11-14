import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/devices
 * Get devices with optional category filter
 * Query param: ?category=smartphone (optional)
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // TODO: Replace with actual database queries
    // For now, returning mock data based on current hardcoded devices
    
    const allDevices = [
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
      {
        id: '2',
        title: 'QSmart Plus',
        description: 'Premium smartphones with advanced features',
        image: '/images/QSMART PLUS.jpg',
        category: 'smartphone',
        price: null,
        features: [],
        detailsTitle: '',
        detailsDescription: '',
        detailsBenefits: [],
        ctaText: 'Learn More',
        ctaAction: '/devices',
        order: 1,
        isActive: true,
      },
      {
        id: '3',
        title: 'QMobile',
        description: 'Feature phones for everyone',
        image: '/images/Qmobile_.jpg',
        category: 'feature-phone',
        price: null,
        features: [],
        detailsTitle: '',
        detailsDescription: '',
        detailsBenefits: [],
        ctaText: 'Learn More',
        ctaAction: '/devices',
        order: 2,
        isActive: true,
      },
      {
        id: '4',
        title: 'MiFi Device',
        description: 'Portable internet connectivity',
        image: '/images/mifi.jpg',
        category: 'mifi',
        price: null,
        features: [],
        detailsTitle: '',
        detailsDescription: '',
        detailsBenefits: [],
        ctaText: 'Learn More',
        ctaAction: '/devices',
        order: 3,
        isActive: true,
      },
      {
        id: '5',
        title: 'Tariff',
        description: 'Explore our flexible tariff plans',
        image: '/images/tiktok bundle.jpg',
        category: 'tariff',
        price: null,
        features: [],
        detailsTitle: '',
        detailsDescription: '',
        detailsBenefits: [],
        ctaText: 'View Tariffs',
        ctaAction: '/tariffs',
        order: 4,
        isActive: true,
      },
    ];

    // Filter by category if provided
    const devices = category
      ? allDevices.filter((d) => d.category === category)
      : allDevices;

    return NextResponse.json(devices, { status: 200 });
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}

