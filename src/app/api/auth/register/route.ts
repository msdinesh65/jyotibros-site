import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(200),
  phone: z.string().max(20).optional()
});

export async function POST(req: NextRequest) {
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

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password, name, phone } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name.trim(),
        phone: phone?.replace(/\s/g, '') || null
      }
    });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    if (
      e &&
      typeof e === 'object' &&
      'code' in e &&
      e.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }
    console.error('[REGISTER]', e);
    return NextResponse.json(
      { error: 'Could not create account.' },
      { status: 500 }
    );
  }
}
