import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    const ref = doc(db, 'users', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return NextResponse.json({ found: false });
    const data = snap.data() as { email?: string; role?: string; password?: string };
    return NextResponse.json({ found: true, id: snap.id, email: data.email || null, role: data.role || null });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
