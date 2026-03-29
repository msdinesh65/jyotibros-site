import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyOnlineBodySchema } from '@/lib/order-validators';

function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return expected === signature;
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Server payment configuration missing.' },
      { status: 503 }
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'Database not configured.' },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = verifyOnlineBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    parsed.data;

  if (
    !verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret
    )
  ) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.paymentMethod !== 'razorpay') {
      return NextResponse.json({ error: 'Invalid order type' }, { status: 400 });
    }

    if (order.status !== 'pending_payment') {
      return NextResponse.json({
        orderId: order.id,
        message: 'Order already processed.'
      });
    }

    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json(
        { error: 'Payment does not match this order' },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'confirmed',
        razorpayPaymentId: razorpay_payment_id
      }
    });

    return NextResponse.json({
      orderId,
      message: 'Payment successful. Thank you for your order.'
    });
  } catch (e) {
    console.error('[CHECKOUT_VERIFY]', e);
    return NextResponse.json(
      { error: 'Could not confirm payment.' },
      { status: 500 }
    );
  }
}
