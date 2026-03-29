import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const patchSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(10).max(15),
  shippingLine1: z.string().min(1).max(500),
  shippingLine2: z.string().max(500).optional(),
  shippingCity: z.string().min(1).max(100),
  shippingState: z.string().min(1).max(100),
  shippingPincode: z.string().regex(/^[0-9]{6}$/)
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { savedAddress: true }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.savedAddress
      ? {
          shippingLine1: user.savedAddress.shippingLine1,
          shippingLine2: user.savedAddress.shippingLine2,
          shippingCity: user.savedAddress.shippingCity,
          shippingState: user.savedAddress.shippingState,
          shippingPincode: user.savedAddress.shippingPincode
        }
      : null
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid address', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: d.name.trim(),
          phone: d.phone.replace(/\s/g, '')
        }
      }),
      prisma.savedAddress.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          shippingLine1: d.shippingLine1.trim(),
          shippingLine2: d.shippingLine2?.trim() || null,
          shippingCity: d.shippingCity.trim(),
          shippingState: d.shippingState.trim(),
          shippingPincode: d.shippingPincode
        },
        update: {
          shippingLine1: d.shippingLine1.trim(),
          shippingLine2: d.shippingLine2?.trim() || null,
          shippingCity: d.shippingCity.trim(),
          shippingState: d.shippingState.trim(),
          shippingPincode: d.shippingPincode
        }
      })
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[ME_ADDRESS_PATCH]', e);
    return NextResponse.json(
      { error: 'Could not save address.' },
      { status: 500 }
    );
  }
}
