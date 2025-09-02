"use client";
import { useEffect, useMemo, useState } from "react";

interface Certification {
  id: number;
  title: string;
  filePath: string;
  badge?: string;
}

const CertificationsPage = () => {
  const [selected, setSelected] = useState<Certification | null>(null);
  const [open, setOpen] = useState(false);

  // Sample data (replace with API/CMS later)
  const certifications: Certification[] = useMemo(
    () => [
      { id: 1, title: "ISO 9001:2015 Quality Management", filePath: "/certifications/iso-9001.pdf", badge: "PDF" },
      { id: 2, title: "ISO 27001 Information Security", filePath: "/certifications/iso-27001.pdf", badge: "PDF" },
      { id: 3, title: "SOC 2 Type II Compliance", filePath: "/certifications/soc2.pdf", badge: "PDF" },
      { id: 4, title: "GDPR Compliance Certificate", filePath: "/certifications/gdpr.pdf", badge: "PDF" },
      { id: 5, title: "AWS Cloud Security", filePath: "/certifications/aws-security.pdf", badge: "PDF" },
      { id: 6, title: "Microsoft Gold Partner", filePath: "/certifications/microsoft-gold.pdf", badge: "PDF" },
    ],
    []
  );

  // Scroll lock and ESC to close when modal is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  const openPreview = (c: Certification) => {
    setSelected(c);
    setOpen(true);
  };
  const closePreview = () => setOpen(false);

  return (
    <main className="min-h-screen w-[100dvw] ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Our Certifications</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Verified credentials that reflect our commitment to quality, security, and compliance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-md bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 ring-1 ring-inset ring-blue-200">
                    {cert.badge || "PDF"}
                  </span>
                  <div className="h-4 w-px bg-slate-200" />
                  <svg className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H18" />
                    <path d="M14 22a4 4 0 0 0 4-4V7a2 2 0 0 0-2-2h-5l-3-3H6a2 2 0 0 0-2 2v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Official certificate (PDF). Preview in-browser or download a copy.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => openPreview(cert)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    </svg>
                    Preview
                  </button>
                  <a
                    href={cert.filePath}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={closePreview}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-transform duration-300 ${open ? "scale-100" : "scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/60">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 truncate pr-6">{selected.title}</h2>
              <div className="flex items-center gap-2">
                <a
                  href={selected.filePath}
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium shadow hover:bg-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download PDF
                </a>
                <button
                  onClick={closePreview}
                  aria-label="Close"
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="h-[70vh] w-full">
                <iframe
                  src={selected.filePath}
                  title={`Preview of ${selected.title}`}
                  className="w-full h-full rounded-lg border border-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CertificationsPage;