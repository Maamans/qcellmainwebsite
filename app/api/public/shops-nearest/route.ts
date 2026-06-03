import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lat = Number(body.lat);
    const lng = Number(body.lng);
    const limit = Number(body.limit || 1);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json({ error: 'Invalid lat/lng' }, { status: 400 });
    }

    // Attempt to use Prisma if available (professional setup).
    try {
      // Build the package path at runtime to avoid Next.js trying to resolve it at build time
      const prismaPackage = '@' + 'prisma/client'
      const prismaModule = await import(prismaPackage)
      const { PrismaClient } = prismaModule as typeof import('@prisma/client')
      const prisma = new PrismaClient();

      // Haversine formula in SQL (works in MySQL and Postgres as plain math)
      const sql = `SELECT id, name, address, latitude, longitude,
        (6371 * acos(
          cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) +
          sin(radians(${lat})) * sin(radians(latitude))
        )) AS distance
        FROM \"Shop\"
        ORDER BY distance
        LIMIT ${limit};`;

      const rows = await prisma.$queryRawUnsafe(sql);
      await prisma.$disconnect();
      return NextResponse.json(rows || []);
    } catch (prismaErr) {
      // Fallback: read local JSON and compute distances in JS
      const dataPath = path.join(process.cwd(), 'data', 'shops.json');
      const raw = fs.readFileSync(dataPath, 'utf-8');
      const shops = JSON.parse(raw);

      const withDistance = shops.map((s: any) => ({
        ...s,
        distance_km: Number(haversineDistance(lat, lng, s.latitude, s.longitude).toFixed(3)),
      }));

      withDistance.sort((a: any, b: any) => a.distance_km - b.distance_km);

      return NextResponse.json(withDistance.slice(0, limit));
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}
