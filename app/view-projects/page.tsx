"use client";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDoc { id: string; title: string; description?: string; images: string[]; createdAt?: Date }

const PAGE_SIZE = 8;

export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // index in projects array
  const [slideIdx, setSlideIdx] = useState(0); // image index inside selected project
  const publicBase = process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL || '';

  const normalize = useCallback((url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/uploads/')) return url;
    if (publicBase) {
      const base = publicBase.replace(/\/$/,'');
      const cleaned = url.replace(/^\//,'');
      return `${base}/${cleaned}`;
    }
    if (url.startsWith('projects/')) return '/uploads/' + url.split('/').pop();
    return url.startsWith('/') ? url : '/' + url;
  }, [publicBase]);

  useEffect(() => { (async () => {
    try {
      setLoading(true);
      const qy = query(collection(db,'projects'), orderBy('title','asc'));
      const snap = await getDocs(qy);
      interface RawProject { title?: string; description?: string; imgUrl1?: string; imgUrl2?: string; imgUrl3?: string }
      const mapped: ProjectDoc[] = snap.docs.map(d => {
        const data = d.data() as RawProject;
        const imgs: string[] = [data.imgUrl1, data.imgUrl2, data.imgUrl3].filter(Boolean).map(u=> normalize(u!));
        return { id: d.id, title: data.title || 'Project', description: data.description, images: imgs, createdAt: undefined };
      });
      setProjects(mapped);
    } catch { setError('Failed to load projects'); }
    finally { setLoading(false); setMounted(true); }
  })(); }, [normalize]);

  // Pagination derived values (used by effects below)
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  // Close modal with ESC and lock scroll; allow Left/Right navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelectedIdx(null); return; }
      const globalIndex = (currentPage - 1) * PAGE_SIZE + selectedIdx;
      const len = projects[globalIndex]?.images?.length ?? 0;
      if (len > 1) {
        if (e.key === 'ArrowRight') setSlideIdx(i => (i + 1) % len);
        else if (e.key === 'ArrowLeft') setSlideIdx(i => (i - 1 + len) % len);
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selectedIdx, currentPage, projects]);

  const pageProjects = useMemo(()=> projects.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE), [projects, currentPage]);
  const pageNumbers = useMemo(()=>{
    const win=5; let start=Math.max(1,currentPage-Math.floor(win/2)); let end=start+win-1; if(end>totalPages){ end=totalPages; start=Math.max(1,end-win+1);} return Array.from({length:end-start+1},(_,i)=>start+i);
  },[currentPage,totalPages]);

  const variants = { enterLeft:{opacity:0,x:-90,y:-20}, enterRight:{opacity:0,x:90,y:-20}, enterTop:{opacity:0,y:-120}, visible:{opacity:1,x:0,y:0} };

  const openModal = (globalIndex: number) => {
    setSelectedIdx(globalIndex);
    setSlideIdx(0);
  };
  const closeModal = () => setSelectedIdx(null);
  const currentProject: ProjectDoc | null = selectedIdx !== null ? projects[(currentPage-1)*PAGE_SIZE + selectedIdx] ?? null : null;
  const slides = currentProject?.images ?? [];
  const nextSlide = useCallback(() => {
    const len = slides.length; if (len <= 1) return; setSlideIdx(i => (i + 1) % len);
  }, [slides.length]);
  const prevSlide = useCallback(() => {
    const len = slides.length; if (len <= 1) return; setSlideIdx(i => (i - 1 + len) % len);
  }, [slides.length]);

  return (
  <div className="min-h-screen bg-[url('/concrete_texture.webp'),_url('/concrete_texture.jpg')] bg-fixed bg-cover bg-center relative">
  <div className="absolute inset-0 bg-slate-900/90" />
  <div style={{padding: "5rem"}} className="relative w-screen box-border ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-24 md:pt-28 pb-28">
        <div style={{marginBottom: "3rem" , padding: "2rem"}} className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl mb-12">
          <h1 style={{marginBottom: "1rem"}} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Our Precast Project Portfolio</h1>
          <p style={{color: "grey"}} className="text-lg max-w-3xl leading-relaxed">Browse selected precast infrastructure projects highlighting modular efficiency, faster deployment, and long-term performance. Each project card shows up to three representative images.</p>
        </div>

        {loading && <div className="py-32 text-center text-gray-300">Loading projects...</div>}
        {error && !loading && <div className="py-10 text-center text-red-400">{error}</div>}
        {!loading && !error && (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <AnimatePresence>
                {pageProjects.map((proj, idx)=>{
                  const which = idx % 3; const initial = which===0?'enterTop': which===1?'enterLeft':'enterRight';
                  return (
                    <motion.div
                      key={proj.id}
                      variants={variants}
                      initial={mounted?undefined:(initial as keyof typeof variants)}
                      animate="visible"
                      transition={{ duration:.7, ease:'easeOut', delay: mounted?0: idx*0.07 }}
                      className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden shadow-[0_4px_18px_-4px_rgba(0,0,0,.45)] ring-1 ring-white/5 hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,.55)] flex flex-col cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${proj.title}`}
                      onClick={() => openModal(idx)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(idx); } }}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        {proj.images[0] && (
                          <Image src={proj.images[0]} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px)100vw,(max-width:1200px)33vw,25vw" unoptimized={proj.images[0].startsWith('/uploads/')} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {proj.images.length>1 && (
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            {proj.images.slice(0,3).map((im,i)=>(
                              <div key={i} className="relative h-8 w-8 rounded-md overflow-hidden ring-1 ring-white/20 bg-slate-700">
                                <Image src={im} alt="thumb" fill className="object-cover" sizes="32px" unoptimized={im.startsWith('/uploads/')} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{proj.title}</h3>
                        {proj.description && <p className="text-sm text-slate-300 line-clamp-3 flex-1">{proj.description}</p>}
                        <div className="mt-4 text-[11px] text-slate-400">{proj.images.length} image{proj.images.length!==1 && 's'}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {projects.length === 0 && <div className="text-center py-32 text-gray-400">No projects available yet.</div>}
      {/* Modal */}
      <AnimatePresence>
        {selectedIdx !== null && currentProject && (
          <motion.div
            key="proj-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              key="proj-modal"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button onClick={closeModal} className="absolute -top-12 right-0 text-white/90 hover:text-white focus:outline-none" aria-label="Close">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                {slides[slideIdx] && (
                  <Image src={slides[slideIdx]} alt={currentProject.title} fill className="object-contain" sizes="100vw" unoptimized={slides[slideIdx].startsWith('/uploads/')} />
                )}
                {slides.length > 1 && (
                  <>
                    <button onClick={(e)=>{e.stopPropagation(); prevSlide();}} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center" aria-label="Previous image">
                      ‹
                    </button>
                    <button onClick={(e)=>{e.stopPropagation(); nextSlide();}} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center" aria-label="Next image">
                      ›
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/90 text-sm bg-black/40 px-2 py-0.5 rounded-md">
                      {slideIdx + 1} / {slides.length}
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{currentProject.title}</h3>
                {currentProject.description && (
                  <p className="text-slate-200 text-sm leading-relaxed">{currentProject.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

            {totalPages>1 && (
              <div className="flex justify-center mt-14">
                <div className="inline-flex items-center gap-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-2">
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className="px-3 h-9 rounded-md text-sm font-medium text-white/70 disabled:opacity-30 hover:bg-white/10 transition">‹</button>
                  {pageNumbers.map(n => (
                    <button key={n} onClick={()=>setPage(n)} className={`w-9 h-9 rounded-md text-sm font-semibold transition relative ${n===currentPage? 'bg-amber-500 text-white shadow-inner':'text-white/70 hover:bg-white/10'}`}>{n}</button>
                  ))}
                  <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className="px-3 h-9 rounded-md text-sm font-medium text-white/70 disabled:opacity-30 hover:bg-white/10 transition">›</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
