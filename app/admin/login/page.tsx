'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Hard navigation used after login so middleware runs on target route

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
  const params = new URLSearchParams(window.location.search);
  const nextParam = params.get('next') || '/admin/gallery';
  const res = await fetch('/api/admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, next: nextParam }) });
      if (!res.ok) {
        const data = await res.json().catch(()=>({ error: 'Invalid credentials'}));
        setError(data.error || 'Login failed');
        return;
      }
  const { user } = await res.json();
  sessionStorage.setItem('adminUser', JSON.stringify(user));
  const next = nextParam;
  // Use hard navigation so middleware executes on the new route reliably
  window.location.href = next;
  } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left illustration (hidden on small screens) */}
      <div className="relative hidden md:block bg-white">
        <Image src="/groupPeople.png" alt="Illustration" fill className="object-contain object-center" priority />
      </div>

      {/* Right: Blue panel with centered login card */}
      <div className="relative flex items-center justify-center bg-[#0A66FF] p-6">
        <div className="w-full max-w-md">
          <div style={{padding: "1rem" }} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900">Hello!</h1>
            <p style={{marginBottom: "1rem"}} className="text-gray-600 mt-1">Log in to get started</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div style={{marginBottom: "1rem"}}>
                <label className="sr-only">Email Address</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.318-.75 7.432 5.097a.75.75 0 0 0 .84 0L19.522 6h-15.704Z"/></svg>
                  </span>
                  <input
                  style={{paddingLeft: "2.5rem"}}
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="sr-only">Password</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 1.5a4.5 4.5 0 0 0-4.5 4.5v3H6a1.5 1.5 0 0 0-1.5 1.5v7.5A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5V10.5A1.5 1.5 0 0 0 18 9h-1.5v-3A4.5 4.5 0 0 0 12 1.5Zm-3 4.5A3 3 0 0 1 12 3a3 3 0 0 1 3 3v3H9v-3Z"/></svg>
                  </span>
                  <input
                  style={{paddingLeft: "2.5rem"}}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-16 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={()=>setShowPassword(s=>!s)} className="absolute inset-y-0 right-2 px-3 flex items-center text-gray-500 hover:text-gray-700 text-xs select-none">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && <div className="text-xs text-red-600 -mt-1">{error}</div>}

              <button
                style={{marginTop: "1rem"}}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-3 transition-colors"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center mt-2">
                <button type="button" className="text-[12px] text-gray-500 hover:text-gray-700">Forgot Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
