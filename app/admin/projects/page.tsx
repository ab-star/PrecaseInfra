"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequireAdminSession } from "../_hooks/useRequireAdminSession";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  imgUrl1?: string;
  imgUrl2?: string;
  imgUrl3?: string;
  uploadDate?: Date;
}

type ProjectDoc = {
  title?: string;
  description?: string;
  imgUrl1?: string;
  imgUrl2?: string;
  imgUrl3?: string;
  uploadDate?: { toDate?: () => Date } | Date;
};

export default function ProjectsAdminPage() {
  useRequireAdminSession();
  // Pagination state
  const [pages, setPages] = useState<Project[][]>([]);
  const [page, setPage] = useState(0);
  const [cursors, setCursors] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasMore, setHasMore] = useState<boolean[]>([]);
  const pageSize = 8;

  // Derived list for current page
  const projects = pages[page] || [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

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
      return "/" + stripped;
    },
    [publicBase]
  );

  const baseQuery = useMemo(
    () => query(collection(db, "projects"), orderBy("uploadDate", "desc")),
    []
  );

  const toProject = useCallback(
    (d: QueryDocumentSnapshot<DocumentData>): Project => {
      const data = d.data() as ProjectDoc;
      return {
        id: d.id,
        title: (data.title || "Untitled").toString(),
        description: (data.description || "").toString(),
        imgUrl1: normalize((data.imgUrl1 || "").trim()),
        imgUrl2: normalize((data.imgUrl2 || "").trim()),
        imgUrl3: normalize((data.imgUrl3 || "").trim()),
        uploadDate:
          typeof data.uploadDate === "object" &&
          data.uploadDate &&
          "toDate" in data.uploadDate
            ? (data.uploadDate as { toDate?: () => Date }).toDate?.()
            : (data.uploadDate as Date | undefined),
      };
    },
    [normalize]
  );

  const loadFirstPage = useCallback(async () => {
    try {
      const snap = await getDocs(query(baseQuery, limit(pageSize)));
      const docs = snap.docs;
      setPages([docs.map(toProject)]);
      setCursors(docs.length ? [docs[docs.length - 1]] : []);
      setHasMore([docs.length === pageSize]);
      setPage(0);
    } catch {
      // Fallback ordering if "uploadDate" is missing on older docs
      const fallback = query(collection(db, "projects"), orderBy("title", "asc"));
      const snap = await getDocs(query(fallback, limit(pageSize)));
      const docs = snap.docs;
      setPages([docs.map(toProject)]);
      setCursors(docs.length ? [docs[docs.length - 1]] : []);
      setHasMore([docs.length === pageSize]);
      setPage(0);
    }
  }, [baseQuery, pageSize, toProject]);

  const loadNextPage = useCallback(async () => {
    // If we already fetched next page, just move cursor
    if (pages[page + 1]) {
      setPage((p) => p + 1);
      return;
    }
    const last = cursors[page];
    if (!last) return;
    const snap = await getDocs(query(baseQuery, startAfter(last), limit(pageSize)));
    const docs = snap.docs;
    if (!docs.length) return; // no next page
    setPages((prev) => [...prev, docs.map(toProject)]);
    setCursors((prev) => [...prev, docs[docs.length - 1]]);
    setHasMore((prev) => {
      const copy = [...prev];
      copy[page] = true; // we could navigate here, so current had more
      copy[page + 1] = docs.length === pageSize; // next page may or may not have more
      return copy;
    });
    setPage((p) => p + 1);
  }, [baseQuery, cursors, page, pageSize, pages, toProject]);

  const loadPrevPage = useCallback(() => {
    if (page > 0) setPage((p) => p - 1);
  }, [page]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  async function createProject() {
    if (!title.trim()) {
      setMessage({ type: "error", text: "Title is required" });
      return;
    }
    try {
      setSaving(true);
      setMessage(null);

      const urls: string[] = [];
      for (const f of files) {
        if (f) {
          const fd = new FormData();
          fd.append("file", f);
          fd.append("prefix", "projects");
          const res = await fetch("/api/r2-upload", { method: "POST", body: fd });
          if (!res.ok) {
            try {
              const err = await res.json();
              const detail = err?.details
                ? ` (details: ${JSON.stringify(err.details)})`
                : "";
              throw new Error(
                err?.error ? `${err.error}${detail}` : `Image upload failed${detail}`
              );
            } catch {
              throw new Error("Image upload failed");
            }
          }
          const { url } = await res.json();
          let storeValue = url as string;
          if (publicBase && storeValue.startsWith(publicBase)) {
            storeValue = storeValue
              .substring(publicBase.length)
              .replace(/^\//, "");
          }
          urls.push(storeValue);
        } else {
          urls.push("");
        }
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        imgUrl1: urls[0] || undefined,
        imgUrl2: urls[1] || undefined,
        imgUrl3: urls[2] || undefined,
        uploadDate: serverTimestamp(),
      };

  await addDoc(collection(db, "projects"), payload);
  // After creating, reload the first page to reflect newest item
  await loadFirstPage();

      setTitle("");
      setDescription("");
      setFiles([null, null, null]);
      setMessage({ type: "success", text: "Project created" });
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
  // Reload from the first page to keep ordering consistent
  await loadFirstPage();
  setMessage({ type: "success", text: "Project deleted" });
  }

  return (
    <div style={{padding: "3rem"}} className="relative w-screen box-border ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 text-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">Admin Portal</h1>

      {/* Create Project Section */}
      <div style={{marginBottom: "3rem"}} className="bg-white shadow-md rounded-2xl p-6 md:p-8 mb-10 mx-auto w-full max-w-5xl text-left">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects Admin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-700">Title</label>
            <input
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <label className="text-sm text-gray-700 mt-3">Description</label>
            <textarea
              placeholder="A short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {files.map((f, i) => (
                <label
                  key={i}
                  className="inline-flex h-14 w-20 md:w-24 items-center justify-center rounded-xl border border-gray-300 bg-white px-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition"
                  title={`Image ${i + 1}`}
                >
                  {f ? f.name : `Image ${i + 1}`}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const copy = [...files];
                      copy[i] = e.target.files?.[0] || null;
                      setFiles(copy);
                    }}
                  />
                </label>
              ))}
            </div>
      <div className="flex justify-start">
              <button
                onClick={createProject}
                disabled={saving}
                style={{padding: "0.5rem"}}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {saving ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : null}
                <span className="text-sm font-medium">
                  {saving ? "Creating..." : "Create Project"}
                </span>
              </button>
            </div>
          </div>
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

      {/* Projects Grid */}
      <div className="w-full mt-6">
        {projects.length === 0 ? (
          <div className="bg-gray-50 border border-dashed rounded-lg p-10 text-gray-500">
            No projects yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((p) => {
              const thumbs = [p.imgUrl1, p.imgUrl2, p.imgUrl3].filter(Boolean) as string[];
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden relative group w-full text-left"
                >
                  <div className="relative h-48 w-full">
                    {thumbs.length > 0 ? (
                      <Image
                        src={thumbs[0]}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="100%"
                        unoptimized={thumbs[0].startsWith("/uploads/")}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    <button
                      onClick={() => deleteProject(p.id)}
                      title="Delete project"
                      aria-label="Delete project"
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
                      <span className="sr-only">Delete project</span>
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 truncate" title={p.title}>
                      {p.title}
                    </h4>
                    {p.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2" title={p.description}>
                        {p.description}
                      </p>
                    )}
                    {thumbs.length > 1 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {thumbs.slice(1, 3).map((t, i) => (
                          <div key={i} className="relative h-14 w-full">
                            <Image
                              src={t}
                              alt={`${p.title} extra ${i + 1}`}
                              fill
                              className="object-cover rounded"
                              sizes="100%"
                              unoptimized={t.startsWith("/uploads/")}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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


