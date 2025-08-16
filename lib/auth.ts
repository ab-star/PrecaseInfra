import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';

export interface UserRecord { id: string; email: string; password: string; role?: string; }
interface FirestoreUser { email: string; password: string; role?: string; }

// NOTE: This is intentionally simple (plain-text password match) pending a move to hashed passwords.
// It should only be called from a server environment (API route / server action), not directly in a client component.
export async function validateUser(email: string, password: string): Promise<UserRecord | null> {
  try {
    // Look up user in Firestore by email only (simpler + easier to debug)
    const usersRef = collection(db, 'users');
    const qy = query(usersRef, where('email', '==', email), limit(1));
    const snap = await getDocs(qy);
    if (!snap.empty) {
      const docSnap = snap.docs[0];
      const data = docSnap.data() as FirestoreUser;
      const pwdMatch = data.password === password; // plain-text comparison for now
      if (process.env.DEBUG_AUTH) {
        console.log('[auth] user doc found', { email: data.email, pwdMatch, storedPasswordLength: data.password?.length });
      }
      if (pwdMatch) {
        return { id: docSnap.id, email: data.email, password: '***', role: data.role };
      }
      if (process.env.DEBUG_AUTH) console.log('[auth] password mismatch', { inputPasswordLength: password.length });
      return null; // wrong password
    } else if (process.env.DEBUG_AUTH) {
      console.log('[auth] no user doc for email', email);
    }

  // No fallback credentials: must exist in Firestore users collection.
  return null;
  } catch (e) {
    console.error('validateUser error', e);
    return null;
  }
}
