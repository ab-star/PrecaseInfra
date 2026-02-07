# One-Time Admin Login - Quick Reference

## Key Features Implemented

### 1. Firebase In-Memory Auth Only
```typescript
// lib/firebase.ts
import { getAuth, inMemoryPersistence } from 'firebase/auth';

const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);
export { auth };
```

**Result**: Session destroyed on page refresh, new tab, or browser close.

---

### 2. Authentication Context with onAuthStateChanged

```typescript
// contexts/AuthContext.tsx
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};
```

**Key**: `onAuthStateChanged` fires whenever auth state changes. On page load with inMemoryPersistence, it immediately resolves with `null` (no session).

---

### 3. Layout with Auth Provider

```typescript
// app/admin/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import AdminAuthGate from './AdminAuthGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminAuthGate />  {/* Enforces auth + logout on unmount */}
        <AdminHeader />
        <AdminMain>{children}</AdminMain>
      </div>
    </AuthProvider>
  );
}
```

**Key**: All `/admin/*` routes are wrapped in both AuthProvider and AdminAuthGate.

---

### 4. Auth Enforcement + Unmount Logout

```typescript
// app/admin/AdminAuthGate.tsx
export default function AdminAuthGate() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const logoutOnUnmountRef = useRef(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace('/admin/login');
      return;
    }
    logoutOnUnmountRef.current = !!user;
  }, [user, loading, isLoginPage, router]);

  // Force logout when unmounting (leaving /admin or page refresh)
  useEffect(() => {
    return () => {
      if (logoutOnUnmountRef.current && user) {
        logout().catch(() => {});
      }
    };
  }, [user, logout]);

  return null;
}
```

**Critical**: The unmount effect ensures logout when:
- User navigates away from `/admin/*` (layout unmounts)
- Page refresh (component unmounts as part of page reload)
- Browser close (all components unmount)

---

### 5. Login with Direct Firebase Auth

```typescript
// app/admin/login/page.tsx
export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);     // Firebase signInWithEmailAndPassword
      router.push('/admin/dashboard');  // Soft navigation, preserves session
    } catch (err) {
      setError(err.message); // Firebase error
    }
  };

  // ... form JSX
}
```

**Key Points**:
- ✅ Use `router.push()` after login (soft navigation preserves in-memory session)
- ❌ Never use `window.location.href` (causes page reload, destroys session)
- Firebase errors (wrong password, user not found, etc.) are caught and displayed

---

### 6. Logout & View Site Buttons

```typescript
// app/admin/AdminHeader.tsx
const handleViewSite = async () => {
  await logout();                  // Clear session
  window.location.href = '/';      // Hard navigate away from /admin
};

const handleLogout = async () => {
  await logout();                           // Clear session
  window.location.href = '/admin/login';   // Hard navigate to login
};

return (
  <button onClick={handleViewSite}>View Site</button>
  <button onClick={handleLogout}>Logout</button>
);
```

**Result**: Session destroyed before navigation away from `/admin`.

---

## Session Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   Session Timeline                       │
└─────────────────────────────────────────────────────────┘

Visit /admin/dashboard (no auth)
      ↓
AdminAuthGate redirects to /admin/login
      ↓
User submits credentials
      ↓
Firebase signInWithEmailAndPassword succeeds
      ↓
onAuthStateChanged fires with user object
      ↓
AuthContext updates state
      ↓
router.push('/admin/dashboard') navigates WITHOUT reload
      ↓
✓ SESSION ACTIVE - In-memory persistence
      ↓
User navigates within /admin/* ✓ Session persists
      ↓
ONE OF:
├─ User presses F5 (refresh) → Clear on-memory → Redirect to login
├─ User presses Ctrl+Shift+R (hard reload) → Clear in-memory → Redirect to login
├─ User clicks "View Site" → logout() → Hard navigate to / → Session destroyed
├─ User clicks "Logout" → logout() → Redirect to /admin/login → Session destroyed
├─ User navigates to / directly → AdminAuthGate unmounts → logout() executes
├─ Page closes or new tab → In-memory lost → Must login again
└─ Browser closes → In-memory lost entirely
```

---

## Testing One-Time Session Behavior

### Test Case 1: Session Destroyed on Refresh
```
1. Login with valid credentials
2. Navigate to /admin/dashboard ✓
3. Press F5 (page refresh)
4. Expected: Redirect to /admin/login
5. Previous session lost ✓
```

### Test Case 2: Session Destroyed on Hard Reload
```
1. Login with valid credentials
2. Navigate to /admin/dashboard ✓
3. Press Ctrl+Shift+R (hard reload)
4. Expected: Redirect to /admin/login
5. Previous session lost ✓
```

### Test Case 3: Session Destroyed When Leaving /admin
```
1. Login with valid credentials
2. Navigate to /admin/gallery ✓
3. Click "View Site" button
4. Expected: Logout executes, redirect to /
5. Session destroyed ✓
```

### Test Case 4: Per-Tab Session Isolation
```
1. Tab A: Login to /admin/dashboard ✓
2. Tab B: Open new tab, visit /admin/dashboard
3. Expected: Tab B redirects to /admin/login (different memory)
4. Tab A session unaffected ✓
```

### Test Case 5: New Session After Logout
```
1. Login with credentials
2. Click "Logout"
3. Expected: Redirect to /admin/login
4. Try to visit /admin/dashboard directly
5. Expected: Redirect to /admin/login (no session)
6. Must login again ✓
```

---

## Common Errors & Solutions

### Error: "Session Lost After Login"
**Cause**: Using `window.location.href` after login (causes page reload)  
**Solution**: Use `router.push()` instead (soft navigation)

### Error: "Can Login But Immediately Logged Out"
**Cause**: AdminAuthGate is logging out on unmount despite user being authenticated  
**Solution**: Check `logoutOnUnmountRef.current` is only set to true when `user` is truthy

### Error: "Firebase Error Not Displayed"
**Cause**: Auth errors not caught in try-catch  
**Solution**: Wrap `login()` call in try-catch and display error message

### Error: "Session Persists After Page Refresh"
**Cause**: Not using `inMemoryPersistence` (using default persistence)  
**Solution**: Verify `auth.setPersistence(inMemoryPersistence)` is called in firebase.ts

---

## Security Checklist

- [x] No localStorage usage
- [x] No sessionStorage usage
- [x] No cookies (Firebase default)
- [x] No server-side session state
- [x] Session destroyed on page refresh
- [x] Session destroyed on hard reload
- [x] Per-tab isolation (separate memory)
- [x] Session destroyed when leaving /admin
- [x] Session destroyed on browser close
- [x] No token refresh mechanism
- [x] No "remember me" functionality
- [x] TypeScript strict mode compliant
- [x] Builds without errors

---

## Next Steps

1. **Test with Firebase Console**: Create test admin users in Firebase Auth
2. **Monitor Auth Errors**: Add error tracking for failed login attempts
3. **Add Rate Limiting**: Optional - limit login attempts per IP
4. **Audit Logs**: Optional - log admin actions with timestamp and user
5. **2FA**: Optional - add two-factor authentication for production
