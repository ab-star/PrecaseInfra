"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface GalleryItem { id: string; imageUrl: string; createdAt?: Date }

export default function GalleryAdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth handled by middleware + httpOnly cookie; optional client fallback could be added.

  const publicBase = process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL || '';

  const normalize = useCallback((key: string) => {
    if (!key) return '';
    if (key.startsWith('http://') || key.startsWith('https://')) return key;
    if (key.startsWith('/uploads/')) return key; // local fallback
    if (publicBase) {
      const base = publicBase.replace(/\/$/, '');
      const cleaned = key.replace(/^\//,'');
      return `${base}/${cleaned}`;
    }
    // No public base: map legacy gallery/ paths (stored as keys) to local /uploads/ filenames
    const stripped = key.replace(/^\//,'');
    if (stripped.startsWith('gallery/')) {
      const baseName = stripped.split('/').pop() || stripped.substring('gallery/'.length);
      return '/uploads/' + baseName;
    }
    // default relative
    return key.startsWith('/') ? key : '/' + key;
  }, [publicBase]);

  const load = useCallback(async () => {
    const qy = query(collection(db, 'gallery'), orderBy('uploadDate', 'desc'));
    const snap = await getDocs(qy);
    const mapped: GalleryItem[] = snap.docs.map(d => {
      const data = d.data() as { imageUrl?: string; url?: string; uploadDate?: { toDate?: () => Date } };
      let raw = (data.imageUrl || data.url || '').trim();
      if (raw && !raw.startsWith('http://') && !raw.startsWith('https://') && !raw.startsWith('/')) {
        // Treat as key path (e.g., gallery/filename.jpg) -> make it relative so browser can load if in public/ or served via rewrite
        raw = '/' + raw;
      }
      // If it points to /gallery/ but we only saved the basename in /uploads/, rewrite
      if (raw.startsWith('/gallery/')) {
        // treat as key
        raw = raw.slice(1); // remove leading slash for consistency
      }
      return { id: d.id, imageUrl: normalize(raw), createdAt: data.uploadDate?.toDate?.() };
    });
    setItems(mapped);
  }, [normalize]);
  useEffect(() => { load(); }, [load]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true); setError(null);
      const fd = new FormData(); fd.append('file', file); fd.append('prefix', 'gallery');
      const res = await fetch('/api/r2-upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      // Ensure we store just the key if it's an R2 URL we can reconstruct
      let storeValue = url;
      if (publicBase && url.startsWith(publicBase)) {
        // strip base for portability
        storeValue = url.substring(publicBase.length).replace(/^\//,'');
      }
      await addDoc(collection(db, 'gallery'), { imageUrl: storeValue, uploadDate: serverTimestamp() });
      setFile(null); await load();
  } catch (e) { setError(e instanceof Error ? e.message : 'Upload failed'); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'gallery', id)); setItems(items.filter(i => i.id !== id)); };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gallery Management</h2>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm mb-1">Select Image</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <button
          disabled={!file || uploading}
          onClick={handleUpload}
          className="bg-gray-800 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          title={!file ? 'Select an image file first' : uploading ? 'Uploading...' : 'Ready'}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {file && <span className="text-xs text-gray-600">{file.name}</span>}
        {!file && !uploading && <span className="text-xs text-orange-600">No file selected</span>}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(it => (
          <li key={it.id} className="border rounded p-2 relative group">
            <div className="relative w-full h-32">
              {it.imageUrl ? (
                it.imageUrl.startsWith('http') || it.imageUrl.startsWith('/') ? (
                  <Image src={it.imageUrl} alt="Gallery item" fill className="object-cover rounded" sizes="200px" unoptimized={it.imageUrl.startsWith('/uploads/')} />
                ) : null
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 border border-dashed rounded">No image URL</div>
              )}
            </div>
            <button onClick={() => handleDelete(it.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Delete</button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="text-sm text-gray-500">No images yet.</p>}
    </div>
  );
}


