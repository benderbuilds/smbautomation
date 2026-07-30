import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { path, referrer } = await req.json();
    console.warn(`[404] path=${String(path).slice(0, 500)} referrer=${String(referrer ?? '').slice(0, 500)}`);
  } catch {
    // a malformed beacon is not worth an error
  }
  return NextResponse.json({ ok: true });
}
