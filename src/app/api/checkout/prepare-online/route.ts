import { getServerSession } from 'next-auth';
import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { prepareOnlineBodySchema } from '@/lib/order-validators';
import { computeOrderTotalsRupee, rupeeToPaise } from '@/lib/order-totals';

function getRazorpay(): Razorpay | null {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}

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

  const razorpay = getRazorpay();
  if (!razorpay) {
    return NextResponse.json(
      {
        error:
          'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
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

  const parsed = prepareOnlineBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid checkout', details: parsed.error.flatten() },
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
  const totalPaise = rupeeToPaise(totals.saleTotalRupee);
  const discountPaise = rupeeToPaise(totals.discountTotalRupee);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? undefined;

  try {
    const rzOrder = await razorpay.orders.create({
      amount: totalPaise,
      currency: 'INR',
      receipt: `web-${Date.now()}`
    });

    const order = await prisma.order.create({
      data: {
        userId,
        status: 'pending_payment',
        paymentMethod: 'razorpay',
        subtotalPaise: totalPaise,
        discountTotalPaise: discountPaise,
        totalPaise: totalPaise,
        razorpayOrderId: rzOrder.id,
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
      razorpayOrderId: rzOrder.id,
      amount: rzOrder.amount,
      currency: rzOrder.currency
    });
  } catch (e) {
    console.error('[CHECKOUT_PREPARE]', e);
    return NextResponse.json(
      { error: 'Could not start checkout. Try again later.' },
      { status: 500 }
    );
  }
}
