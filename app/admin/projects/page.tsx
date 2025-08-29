"use client";
import { useCallback, useEffect, useState } from "react";
import { useRequireAdminSession } from "../_hooks/useRequireAdminSession";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
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
  const [projects, setProjects] = useState<Project[]>([]);
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

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, "projects"));
    setProjects(
      snap.docs.map((d) => {
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
      })
    );
  }, [normalize]);

  useEffect(() => {
    load();
  }, [load]);

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

      const ref = await addDoc(collection(db, "projects"), payload);
      setProjects((prev) => [
        {
          id: ref.id,
          title: payload.title,
          description: payload.description,
          imgUrl1: normalize(payload.imgUrl1 || ""),
          imgUrl2: normalize(payload.imgUrl2 || ""),
          imgUrl3: normalize(payload.imgUrl3 || ""),
          uploadDate: undefined,
        },
        ...prev,
      ]);

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
    setProjects((p) => p.filter((x) => x.id !== id));
    setMessage({ type: "success", text: "Project deleted" });
  }

  return (
    <div className="relative w-screen box-border ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Projects Admin</h2>

      {/* Create Project Section */}
      <div className="bg-white shadow-md rounded-xl p-8 md:p-10 lg:p-12 mb-10 flex flex-col items-center justify-center gap-6 mx-auto w-full text-left">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {files.map((f, i) => (
                <label
                  key={i}
                  className="w-full h-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition"
                  title={`Image ${i + 1}`}
                >
                  <span className="text-gray-600 text-xs">
                    {f ? f.name : `Image ${i + 1}`}
                  </span>
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
                style={{ padding: "0px 1rem" }}
                onClick={createProject}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2.5 px-7 md:px-9 py-3 md:py-3.5 whitespace-nowrap bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:to-blue-900 text-white rounded-full shadow-lg ring-1 ring-blue-500/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 tracking-wide leading-6 font-medium"
              >
                {saving ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M3 16.5A4.5 4.5 0 017.5 12H9a1 1 0 010 2H7.5A2.5 2.5 0 005 16.5V17a1 1 0 01-2 0v-.5zM15 6a1 1 0 011-1 5 5 0 014.995 4.783L21 10v.126A4 4 0 0119 21H9a4 4 0 01-3.995-3.8L5 17h2a1 1 0 010 2H9a2 2 0 001.995-1.85L11 17h2l.001.15A2 2 0 0015 19h4a2 2 0 001.995-1.85L21 17a2 2 0 00-1.85-1.995L19 15H9a4 4 0 01-3.995-3.8L5 11V10a7 7 0 016.293-6.965L12 3a1 1 0 011 1v2z" />
                    <path d="M12 13a1 1 0 01-1-1V7.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01-1.414 1.414L13 7.414V12a1 1 0 01-1 1z" />
                  </svg>
                )}
                <span className="text-sm md:text-base">
                  {saving ? "Saving..." : "Create Project"}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
    </div>
  );
}


