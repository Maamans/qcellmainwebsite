import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/about/:section
 * Get About Us section content
 * @param section - 'mission', 'vision', 'values', 'history'
 * NO AUTH NEEDED - Public endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;

    // TODO: Replace with actual database queries
    // For now, returning mock data
    
    const aboutData: Record<string, { title: string; content: string }> = {
      mission: {
        title: 'Our Mission',
        content: 'To connect Sierra Leone through innovative telecommunications solutions.',
      },
      vision: {
        title: 'Our Vision',
        content: 'To be the leading telecommunications provider in Sierra Leone.',
      },
      values: {
        title: 'Our Values',
        content: 'Innovation, Integrity, Customer Focus.',
      },
      history: {
        title: 'Our History',
        content: 'Founded with a vision to transform telecommunications in Sierra Leone.',
      },
    };

    const data = aboutData[section] || { error: 'Section not found' };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about section' },
      { status: 500 }
    );
  }
}

