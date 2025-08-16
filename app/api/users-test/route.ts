import { NextResponse } from 'next/server';
export const runtime = 'edge';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Simple diagnostic endpoint to verify Firestore connectivity and the 'users' collection.
// DO NOT expose in production. Remove or guard with auth once verified.
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ ok: false, error: 'Firestore not initialized' }, { status: 500 });
    }
    const usersRef = collection(db, 'users');
    const qy = query(usersRef, limit(5));
    const snap = await getDocs(qy);
    const users = snap.docs.map(d => {
      const data = d.data() as { email?: string; role?: string; password?: string };
      return { id: d.id, email: data.email || null, role: data.role || null };
    }); // redact password
    return NextResponse.json({ ok: true, count: snap.size, sample: users });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('[users-test] error', e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
