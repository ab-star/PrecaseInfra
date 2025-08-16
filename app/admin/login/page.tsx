'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      if (!res.ok) {
        const data = await res.json().catch(()=>({ error: 'Invalid credentials'}));
        setError(data.error || 'Login failed');
        return;
      }
      const { user } = await res.json();
      sessionStorage.setItem('adminUser', JSON.stringify(user));
  router.push('/admin/gallery');
  } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[60vh] flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur rounded-md shadow border border-gray-200 p-6">
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={()=>setShowPassword(s=>!s)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 text-xs select-none">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && <div className="text-xs text-red-600 -mt-2">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center rounded-md bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-blue-700 text-white text-sm font-medium py-2 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center mt-2">
            <button type="button" className="text-[11px] text-gray-500 hover:text-gray-700">Forgot password?</button>
          </div>
        </form>
      </div>
    </div>
  );
}
