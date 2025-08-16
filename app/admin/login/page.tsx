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
      router.push('/admin');
  } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border px-3 py-2 rounded" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full border px-3 py-2 rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm disabled:opacity-50" type="submit">{loading? 'Logging in...' : 'Login'}</button>
      </form>
      <p className="text-xs text-gray-500 mt-4">Authentication checks Firestore users collection only.</p>
    </div>
  );
}
