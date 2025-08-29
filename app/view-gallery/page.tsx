"use client";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryDoc { id: string; imageUrl: string; uploadedAt?: Date }

const PAGE_SIZE = 12;

export default function ViewGalleryPage() {
  const [images, setImages] = useState<GalleryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false); // trigger entrance animation once
  const [selected, setSelected] = useState<GalleryDoc | null>(null);

  const publicBase = process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL || '';

  const normalize = useCallback((key: string) => {
    if (!key) return '';
    if (key.startsWith('http://') || key.startsWith('https://')) return key;
    if (key.startsWith('/uploads/')) return key; // local fallback
    if (publicBase) {
      const base = publicBase.replace(/\/$/, '');
      const cleaned = key.replace(/^\//, '');
      return `${base}/${cleaned}`;
    }
    const stripped = key.replace(/^\//,'');
    if (stripped.startsWith('gallery/')) {
      const baseName = stripped.split('/').pop() || stripped.substring('gallery/'.length);
      return '/uploads/' + baseName;
    }
    return key.startsWith('/') ? key : '/' + key;
  }, [publicBase]);

  useEffect(()=>{ (async() => {
    try {
      setLoading(true);
      const qy = query(collection(db,'gallery'), orderBy('uploadDate','desc'));
      const snap = await getDocs(qy);
      const mapped: GalleryDoc[] = snap.docs.map(d => {
        const data = d.data() as { imageUrl?: string; url?: string; uploadDate?: { toDate?: () => Date } };
        let raw = (data.imageUrl || data.url || '').trim();
        if (raw && !raw.startsWith('http') && !raw.startsWith('/')) raw = '/' + raw;
        if (raw.startsWith('/gallery/')) raw = raw.slice(1);
        return { id: d.id, imageUrl: normalize(raw), uploadedAt: data.uploadDate?.toDate?.() };
      });
      setImages(mapped);
  } catch { setError('Failed to load images'); }
    finally { setLoading(false); setMounted(true); }
  })(); }, [normalize]);

  // Close modal with ESC and lock scroll when open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const totalPages = Math.max(1, Math.ceil(images.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageImages = useMemo(()=> images.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE), [images, currentPage]);

  const pageNumbers = useMemo(() => {
    // simple windowed pagination (max 5 numbers)
    const windowSize = 5;
    let start = Math.max(1, currentPage - Math.floor(windowSize/2));
    let end = start + windowSize - 1;
    if (end > totalPages) { end = totalPages; start = Math.max(1, end - windowSize + 1); }
    return Array.from({ length: end - start + 1 }, (_,i)=> start + i);
  }, [currentPage, totalPages]);

  const variants = {
    enterLeft: { opacity: 0, x: -80, y: -20 },
    enterRight: { opacity: 0, x: 80, y: -20 },
    enterTop: { opacity: 0, y: -120 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
  <div className="min-h-screen bg-[url('/concrete_texture.webp'),_url('/concrete_texture.jpg')] bg-fixed bg-cover bg-center relative">
      <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]" />
  <div style={{padding: "5rem"}} className="relative w-screen box-border ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-24 md:pt-28 pb-28">
        {/* Intro */}
        <div style={{marginBottom: "5rem" , padding: "3rem"}} className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl mb-12">
          <h1 style={{marginBottom: "1rem"}} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Our Precast Construction Gallery
          </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              Explore a curated selection of our precast concrete solutions showcasing precision engineering, durability, and aesthetic integration across infrastructure projects. Each image reflects our commitment to quality and innovation in modern construction.
            </p>
        </div>

        {/* Grid */}
        {loading && (
          <div className="py-32 text-center text-gray-300">Loading images...</div>
        )}
        {error && !loading && <div className="py-10 text-center text-red-400">{error}</div>}
        {!loading && !error && (
          <>
            <div style={{marginBottom: "2rem"}} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
              <AnimatePresence>
                {pageImages.map((img, idx) => {
                  const which = idx % 3;
                  const initial = which === 0 ? 'enterTop' : which === 1 ? 'enterLeft' : 'enterRight';
                  return (
                    <motion.div
                      key={img.id}
                      variants={variants}
                      // If mounted, skip entrance initial state for rerenders
                      initial={mounted ? undefined : (initial as keyof typeof variants)}
                      animate="visible"
                      transition={{ duration: 0.65, ease: 'easeOut', delay: mounted ? 0 : idx * 0.06 }}
                      className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.45)] ring-1 ring-white/5 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.55)] transition-shadow cursor-zoom-in"
                      role="button"
                      tabIndex={0}
                      aria-label="Open image in modal"
                      onClick={() => setSelected(img)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(img); } }}
                    >
                      <div className="relative aspect-[4/3]">
                        {img.imageUrl && (
                          <Image
                            src={img.imageUrl}
                            alt="Precast construction image"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
                            unoptimized={img.imageUrl.startsWith('/uploads/')}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-3">
                        {img.uploadedAt && <p className="text-[11px] mt-1 text-slate-400">{img.uploadedAt.toLocaleDateString()}</p>}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-14">
                <div className="inline-flex items-center gap-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-2">
                  <button
                    onClick={()=> setPage(p=> Math.max(1, p-1))}
                    disabled={currentPage===1}
                    className="px-3 h-9 rounded-md text-sm font-medium text-white/70 disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    ‹
                  </button>
                  {pageNumbers.map(n => (
                    <button
                      key={n}
                      onClick={()=> setPage(n)}
                      className={`w-9 h-9 rounded-md text-sm font-semibold transition relative ${n===currentPage ? 'bg-amber-500 text-white shadow-inner' : 'text-white/70 hover:bg-white/10'}`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={()=> setPage(p=> Math.min(totalPages, p+1))}
                    disabled={currentPage===totalPages}
                    className="px-3 h-9 rounded-md text-sm font-medium text-white/70 disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-32 text-gray-400">No images available yet.</div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                key="modal-content"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-12 right-0 text-white/90 hover:text-white focus:outline-none"
                  aria-label="Close"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                  {selected.imageUrl && (
                    <Image
                      src={selected.imageUrl}
                      alt="Selected gallery image"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      unoptimized={selected.imageUrl.startsWith('/uploads/')}
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between text-slate-200 text-sm">
                  <span>Tap outside or press Esc to close</span>
                  {selected.uploadedAt && (
                    <span className="text-slate-400">{selected.uploadedAt.toLocaleDateString()}</span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
