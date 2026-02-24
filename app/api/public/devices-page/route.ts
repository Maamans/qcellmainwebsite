import { NextResponse } from 'next/server';

/**
 * GET /api/public/devices-page
 * Returns devices page content: heroSlides, sections, devices, featuredDevices
 * Proxies to backend when available, falls back to local data when backend is down
 */
const FALLBACK_PAYLOAD = {
  heroSlides: [
    { id: 'devices-hero-1', title: 'Devices that keep you connected.', description: '', image: '/images/devc1.png', ctaText: 'See all devices', ctaLink: '#devices', order: 0, isActive: true },
    { id: 'devices-hero-2', title: 'Devices that keep you connected.', description: '', image: '/images/devc2.png', ctaText: 'See all devices', ctaLink: '#devices', order: 1, isActive: true },
    { id: 'devices-hero-3', title: 'Devices that keep you connected.', description: '', image: '/images/devc3.png', ctaText: 'See all devices', ctaLink: '#devices', order: 2, isActive: true },
    { id: 'devices-hero-4', title: 'Devices that keep you connected.', description: '', image: '/images/devc4.jpg', ctaText: 'See all devices', ctaLink: '#devices', order: 3, isActive: true },
  ],
  sections: [],
  imageOnlyHeroSlides: [],
  devices: [
    { id: 'qsmart', title: 'QSmart', description: 'Affordable smartphones packed with smart features', image: '/images/device1.jpg', features: ['Android OS', 'Dual SIM', 'Long battery life'], ctaText: 'Explore QSmart', ctaAction: '/devices/qsmart', price: 'Le 1,799', benefits: ['Affordable pricing', 'User-friendly interface', 'Built-in QCell apps', 'Reliable performance', 'Perfect for daily use'], isActive: true },
    { id: 'qsmart-plus', title: 'QSmart Plus', description: 'Performance-enhanced smartphones for power users', image: '/images/device2.jpg', features: ['HD Display', 'Fingerprint unlock', 'Large storage'], ctaText: 'Discover QSmart Plus', ctaAction: '/devices/qsmart-plus', price: 'Le 2,499', benefits: ['High-resolution display', 'Smooth app experience', 'Great for social media and work', 'Durable build', 'Access to latest Android features'], isActive: true },
    { id: 'qmobile', title: 'QMobile', description: 'Simple and durable feature phones for everyone', image: '/images/device3.jpg', features: ['Long battery life', 'FM Radio', 'Dual SIM'], ctaText: 'View QMobile', ctaAction: '/devices/qmobile', price: 'Le 799', benefits: ['Affordable and reliable', 'Compact design', 'Long standby battery', 'Easy to use', 'Torchlight and FM radio'], isActive: true },
    { id: 'mifi', title: 'MiFi Device', description: 'Portable internet device for fast connectivity on the go', image: '/images/device4.jpg', features: ['4G LTE', 'Connect up to 10 devices', 'Rechargeable battery'], ctaText: 'Get MiFi', ctaAction: '/devices/mifi', price: 'Le 1,199', benefits: ['Portable and lightweight', 'Long battery backup', 'Supports multiple users', 'Secure internet access', 'Plug-and-play setup'], isActive: true },
    { id: 'tariff', title: 'Tariff', description: 'Explore our flexible tariff plans for every need.', image: '/images/device5.jpg', features: ['Voice & Data', 'Affordable rates', 'Easy activation'], ctaText: 'View Tariffs', ctaAction: '/tariffs', price: 'From Le 50/mo', benefits: ['Flexible options', 'Best value', 'Simple activation', 'Great for individuals and families', '24/7 support'], isActive: true },
  ],
  featuredDevices: [],
};

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    // If no backend URL is configured, immediately return fallback payload.
    // This avoids slow timeouts in local/dev environments and still works with static data.
    if (!backendUrl) {
      return NextResponse.json(FALLBACK_PAYLOAD, { status: 200 });
    }

    const url = `${backendUrl}/api/public/devices-page/`;

    const controller = new AbortController();
    // Keep the timeout short so navigation is never blocked for long if backend is slow/unreachable.
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn('[Devices Page API] Backend timeout');
      } else {
        console.warn('[Devices Page API] Backend unavailable, using fallback:', fetchError instanceof Error ? fetchError.message : fetchError);
      }
    }

    return NextResponse.json(FALLBACK_PAYLOAD, { status: 200 });
  } catch (error) {
    console.error('[Devices Page API] Error:', error);
    return NextResponse.json(FALLBACK_PAYLOAD, { status: 200 });
  }
}

