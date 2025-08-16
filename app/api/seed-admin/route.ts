import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
import { collection, addDoc, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Temporary seeding endpoint to create an admin user in Firestore 'users' collection.
// Protect with SEED_SECRET. Remove after first use.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD env vars' }, { status: 500 });
  }
  try {
    const usersRef = collection(db, 'users');
    const existingQ = query(usersRef, where('email', '==', email), limit(1));
    const existingSnap = await getDocs(existingQ);
    if (!existingSnap.empty) {
      return NextResponse.json({ created: false, message: 'User already exists', email });
    }
    const ref = await addDoc(usersRef, { email, password, role: 'admin' });
    return NextResponse.json({ created: true, id: ref.id, email });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
