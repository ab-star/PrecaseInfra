"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRequireAdminSession } from "../_hooks/useRequireAdminSession";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  limit,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

interface GalleryItem {
  id: string;
  imageUrl: string;
  createdAt?: Date;
}

function hasToDate(x: unknown): x is { toDate?: () => Date } {
  return !!x && typeof x === 'object' && 'toDate' in (x as Record<string, unknown>);
}

export default function GalleryAdminPage() {
  useRequireAdminSession();
  const [file, setFile] = useState<File | null>(null);
  // Pagination state
  const [pages, setPages] = useState<GalleryItem[][]>([]);
  const [page, setPage] = useState(0);
  const [cursors, setCursors] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasMore, setHasMore] = useState<boolean[]>([]);
  const pageSize = 12;
  const items = pages[page] || [];
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const publicBase =
    process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL || "";

  const normalize = useCallback(
    (key: string) => {
      if (!key) return "";
      if (key.startsWith("http://") || key.startsWith("https://")) return key;
      if (key.startsWith("/uploads/")) return key;
      if (publicBase) {
        const base = publicBase.replace(/\/$/, "");
        const cleaned = key.replace(/^\//, "");
        return `${base}/${cleaned}`;
      }
      const stripped = key.replace(/^\//, "");
      return stripped.startsWith("gallery/")
        ? "/uploads/" + stripped.split("/").pop()
        : key.startsWith("/")
        ? key
        : "/" + key;
    },
    [publicBase]
  );

  const baseQuery = useMemo(
    () => query(collection(db, "gallery"), orderBy("uploadDate", "desc")),
    []
  );

  const toItem = useCallback(
    (d: QueryDocumentSnapshot<DocumentData>): GalleryItem => {
      const data = d.data() as {
        imageUrl?: string;
        url?: string;
        uploadDate?: { toDate?: () => Date } | Date;
      };
      let raw = (data.imageUrl || data.url || "").trim();
      if (raw && !raw.startsWith("http://") && !raw.startsWith("https://") && !raw.startsWith("/")) raw = "/" + raw;
      if (raw.startsWith("/gallery/")) raw = raw.slice(1);
      return {
        id: d.id,
        imageUrl: normalize(raw),
        createdAt: hasToDate(data.uploadDate) ? data.uploadDate.toDate?.() : (data.uploadDate as Date | undefined),
      };
    },
    [normalize]
  );

  const loadFirstPage = useCallback(async () => {
    try {
      const snap = await getDocs(query(baseQuery, limit(pageSize)));
      const docs = snap.docs;
      setPages([docs.map(toItem)]);
      setCursors(docs.length ? [docs[docs.length - 1]] : []);
      setHasMore([docs.length === pageSize]);
      setPage(0);
    } catch {
      // Fallback if some docs miss uploadDate
      const fallback = query(collection(db, "gallery"), orderBy("imageUrl", "asc"));
      const snap = await getDocs(query(fallback, limit(pageSize)));
      const docs = snap.docs;
      setPages([docs.map(toItem)]);
      setCursors(docs.length ? [docs[docs.length - 1]] : []);
      setHasMore([docs.length === pageSize]);
      setPage(0);
    }
  }, [baseQuery, pageSize, toItem]);

  const loadNextPage = useCallback(async () => {
    if (pages[page + 1]) {
      setPage((p) => p + 1);
      return;
    }
    const last = cursors[page];
    if (!last) return;
    const snap = await getDocs(query(baseQuery, startAfter(last), limit(pageSize)));
    const docs = snap.docs;
    if (!docs.length) return;
    setPages((prev) => [...prev, docs.map(toItem)]);
    setCursors((prev) => [...prev, docs[docs.length - 1]]);
    setHasMore((prev) => {
      const copy = [...prev];
      copy[page] = true;
      copy[page + 1] = docs.length === pageSize;
      return copy;
    });
    setPage((p) => p + 1);
  }, [baseQuery, cursors, page, pageSize, pages, toItem]);

  const loadPrevPage = useCallback(() => {
    if (page > 0) setPage((p) => p - 1);
  }, [page]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      setMessage(null);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("prefix", "gallery");

      const res = await fetch("/api/r2-upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      let storeValue = url;

      if (publicBase && url.startsWith(publicBase)) {
        storeValue = url.substring(publicBase.length).replace(/^\//, "");
      }

  await addDoc(collection(db, "gallery"), {
        imageUrl: storeValue,
        uploadDate: serverTimestamp(),
      });

  setFile(null);
  setMessage({ type: "success", text: "Image uploaded successfully" });
  await loadFirstPage();
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this image?")) {
      await deleteDoc(doc(db, "gallery", id));
      await loadFirstPage();
      setMessage({ type: "success", text: "Image deleted successfully" });
    }
  };

  return (
    <div
      className="relative w-screen box-border ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 text-center"
    >
  <h1 className="text-3xl font-semibold text-gray-900 mb-6">Admin Portal</h1>

      {/* Upload Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 mb-10 flex flex-col items-center justify-center gap-6 mx-auto w-full max-w-4xl">
        <div className="w-full flex flex-col items-center gap-6">
          <label className="w-full max-w-3xl self-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 md:p-12 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition mx-auto">
            <span className="text-gray-600 text-sm md:text-base">{file ? file.name : "Click or drag an image here"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          <button
      style={{ padding: "0px 1rem" }}
          disabled={!file || uploading}
          onClick={handleUpload}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide self-center"
        >
          {uploading ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 16.5A4.5 4.5 0 017.5 12H9a1 1 0 010 2H7.5A2.5 2.5 0 005 16.5V17a1 1 0 01-2 0v-.5zM15 6a1 1 0 011-1 5 5 0 014.995 4.783L21 10v.126A4 4 0 0119 21H9a4 4 0 01-3.995-3.8L5 17h2a1 1 0 010 2H9a2 2 0 001.995-1.85L11 17h2l.001.15A2 2 0 0015 19h4a2 2 0 001.995-1.85L21 17a2 2 0 00-1.85-1.995L19 15H9a4 4 0 01-3.995-3.8L5 11V10a7 7 0 016.293-6.965L12 3a1 1 0 011 1v2z" />
              <path d="M12 13a1 1 0 01-1-1V7.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01-1.414 1.414L13 7.414V12a1 1 0 01-1 1z" />
            </svg>
          )}
      <span className="text-sm md:text-base">{uploading ? "Uploading..." : "Upload"}</span>
          </button>
        </div>
        {message && (
          <p

            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {/* Gallery Grid */}
  <div className="w-full mt-6">
        {items.length === 0 ? (
          <div className="bg-gray-50 border border-dashed rounded-lg p-10 text-gray-500">
            No images yet
          </div>
        ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {items.map((it) => (
              <div
                key={it.id}
        className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden relative group w-full"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={it.imageUrl}
                    alt="Gallery item"
                    fill
                    className="object-cover"
                    sizes="100%"
                    unoptimized={it.imageUrl.startsWith("/uploads/")}
                  />
                  <button
                    onClick={() => handleDelete(it.id)}
                    title="Delete image"
                    aria-label="Delete image"
                    className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 active:scale-95 shadow-md ring-1 ring-white/40 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2H6v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9zm2 2h2V4h-2v1zM8 7h10v11a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V7zm2 3a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7zm6 0a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7z" />
                    </svg>
                    <span className="sr-only">Delete image</span>
                  </button>
                </div>
            <div className="p-2 text-xs text-gray-500 flex items-center justify-between">
              <span>Gallery item</span>
              <span>{it.createdAt ? it.createdAt.toLocaleDateString() : ""}</span>
            </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={loadPrevPage}
          disabled={page === 0}
          className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <span className="text-lg">‹</span>
        </button>
        <span className="text-gray-800 font-medium">{page + 1}</span>
        <button
          onClick={loadNextPage}
          disabled={!hasMore[page]}
          className="h-10 w-10 rounded-full bg-white text-gray-900 ring-1 ring-gray-300 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}
