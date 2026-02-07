import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, inMemoryPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Basic validation to surface missing env vars early (dev only)
const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missing.length) {
  console.warn('[firebase] Missing config values:', missing.join(', '));
}

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with long polling to avoid SSR / network shim issues causing "client is offline".
let dbInternal;
try {
  dbInternal = initializeFirestore(app, { experimentalForceLongPolling: true });
} catch {
  dbInternal = getFirestore(app);
}
export const db = dbInternal;
export const storage = getStorage(app);

// Initialize Auth with in-memory persistence only (no persistence across page refresh/reload)
const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);
export { auth };

export default app;
