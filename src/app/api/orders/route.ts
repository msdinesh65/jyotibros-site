import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { codOrderBodySchema } from '@/lib/order-validators';
import { computeOrderTotalsRupee, rupeeToPaise } from '@/lib/order-totals';

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error:
          'Database not configured. Set DATABASE_URL in .env.local (see .env.example).'
      },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = codOrderBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid order', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { shipping, items } = parsed.data;

  const lines = items.map((i) => ({
    quantity: i.quantity,
    unitPrice: i.unitPrice,
    originalPrice: i.originalPrice
  }));
  const totals = computeOrderTotalsRupee(lines);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? undefined;

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        status: 'confirmed',
        paymentMethod: 'cod',
        subtotalPaise: rupeeToPaise(totals.saleTotalRupee),
        discountTotalPaise: rupeeToPaise(totals.discountTotalRupee),
        totalPaise: rupeeToPaise(totals.saleTotalRupee),
        customerName: shipping.customerName.trim(),
        customerEmail: shipping.customerEmail.trim().toLowerCase(),
        customerPhone: shipping.customerPhone.replace(/\s/g, ''),
        shippingLine1: shipping.shippingLine1.trim(),
        shippingLine2: shipping.shippingLine2?.trim() || null,
        shippingCity: shipping.shippingCity.trim(),
        shippingState: shipping.shippingState.trim(),
        shippingPincode: shipping.shippingPincode,
        items: {
          create: items.map((i) => ({
            productSlug: i.slug,
            name: i.name,
            image: i.image,
            quantity: i.quantity,
            unitPricePaise: rupeeToPaise(i.unitPrice),
            originalPricePaise:
              i.originalPrice && i.originalPrice > i.unitPrice
                ? rupeeToPaise(i.originalPrice)
                : null,
            discountPercent: i.discountPercent ?? null
          }))
        }
      }
    });

    return NextResponse.json({
      orderId: order.id,
      message: 'Order placed. Pay cash when your order is delivered.'
    });
  } catch (e) {
    console.error('[ORDER_COD]', e);
    return NextResponse.json(
      { error: 'Could not save order. Try again later.' },
      { status: 500 }
    );
  }
}
