import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

function getRazorpay(): Razorpay | null {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: NextRequest) {
  const razorpay = getRazorpay();
  if (!razorpay) {
    return NextResponse.json(
      {
        error:
          'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local (see .env.example).'
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const amountInPaise: number = body.amountInPaise;
    const receiptId: string | undefined = body.receiptId;

    if (!amountInPaise || amountInPaise <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId ?? `receipt-${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('[RAZORPAY_ORDER_ERROR]', error);
    return NextResponse.json(
      { error: 'Unable to create order' },
      { status: 500 }
    );
  }
}
