import { z } from 'zod';

export const shippingSchema = z.object({
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email().max(320),
  customerPhone: z.string().min(10).max(15),
  shippingLine1: z.string().min(1).max(500),
  shippingLine2: z.string().max(500).optional(),
  shippingCity: z.string().min(1).max(100),
  shippingState: z.string().min(1).max(100),
  shippingPincode: z.string().regex(/^[0-9]{6}$/, 'Expected 6-digit PIN code')
});

export const cartLineSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
  unitPrice: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  discountPercent: z.number().min(0).max(100).optional()
});

export const codOrderBodySchema = z.object({
  paymentMethod: z.literal('cod'),
  shipping: shippingSchema,
  items: z.array(cartLineSchema).min(1)
});

export const prepareOnlineBodySchema = z.object({
  shipping: shippingSchema,
  items: z.array(cartLineSchema).min(1)
});

export const verifyOnlineBodySchema = z.object({
  orderId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1)
});
