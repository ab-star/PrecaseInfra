export interface UserRecord { id: string; email: string; password: string; role?: string; }
interface FirestoreUser { email: string; password: string; role?: string; }

export async function validateUser(email: string, password: string): Promise<UserRecord | null> {
  try {
    // 1) Fast path admin via env (Edge-safe)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@infrastire.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (email === adminEmail && password === adminPassword) {
      return { id: 'admin', email: adminEmail, password: '***', role: 'admin' };
    }

    // 2) Firestore lookup only in Node runtime and if configured
    const hasFirebaseConfig = Boolean(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    const isNodeRuntime = ((): boolean => {
      try {
        // Consider Node present whenever process.versions.node exists, even if an Edge flag is set
        // (Cloudflare nodejs_compat exposes Node APIs alongside Edge globals).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = (process as any);
        return !!p?.versions?.node;
      } catch {
        return false;
      }
    })();

    if (hasFirebaseConfig && isNodeRuntime) {
      try {
        const { collection, getDocs, query, where, limit } = await import('firebase/firestore');
        const { db } = await import('./firebase');
        const usersRef = collection(db, 'users');
        const qy = query(usersRef, where('email', '==', email), limit(1));
        const snap = await getDocs(qy);
        if (!snap.empty) {
          const docSnap = snap.docs[0];
          const data = docSnap.data() as FirestoreUser;
          const pwdMatch = data.password === password;
          if (pwdMatch) {
            return { id: docSnap.id, email: data.email, password: '***', role: data.role };
          }
          return null;
        }
      } catch (err) {
        console.warn('[auth] Firestore lookup failed/skipped:', err);
      }
    }

    return null;
  } catch (e) {
    console.error('validateUser error', e);
    return null;
  }
}
