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
// MUI
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState<(number | null)[]>([null, null, null]);
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

  async function uploadOne(file: File, prefix: string, idx: number): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("prefix", prefix);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/r2-upload");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setProgress((prev) => {
            const copy = [...prev];
            copy[idx] = pct;
            return copy;
          });
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText) as { url: string };
            resolve(data.url);
          } catch {
            reject(new Error("Invalid upload response"));
          }
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(fd);
    });
  }

  async function createProject() {
    if (!title.trim()) {
      setMessage({ type: "error", text: "Title is required" });
      return;
    }
    try {
      setSaving(true);
      setMessage(null);

      setProgress([null, null, null]);
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f) {
          const url = await uploadOne(f, "projects", i);
          let storeValue = url;
          if (publicBase && storeValue.startsWith(publicBase)) {
            storeValue = storeValue.substring(publicBase.length).replace(/^\//, "");
          }
          urls.push(storeValue);
        } else {
          urls.push("");
        }
      }

      // Require at least one image
      const hasAtLeastOne = urls.some((u) => u && u.trim().length > 0);
      if (!hasAtLeastOne) {
        setMessage({ type: "error", text: "Please upload at least one image" });
        return;
      }

      // Build payload without undefined fields (Firestore rejects undefined)
      const payload: { title: string; description: string; uploadDate: ReturnType<typeof serverTimestamp>; imgUrl1?: string; imgUrl2?: string; imgUrl3?: string } = {
        title: title.trim(),
        description: description.trim(),
        uploadDate: serverTimestamp(),
      };
      if (urls[0]) payload.imgUrl1 = urls[0];
      if (urls[1]) payload.imgUrl2 = urls[1];
      if (urls[2]) payload.imgUrl3 = urls[2];

      await addDoc(collection(db, "projects"), payload);
      // After creating, reload the first page to reflect newest item
      await loadFirstPage();

  setTitle("");
  setDescription("");
  setFiles([null, null, null]);
  setProgress([null, null, null]);
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

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  async function doDeleteProject(id: string) {
    await deleteDoc(doc(db, "projects", id));
    await loadFirstPage();
    setMessage({ type: "success", text: "Project deleted" });
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        width: '100dvw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        position: 'relative',
        backgroundImage: "linear-gradient(120deg, rgba(248,250,252,0.94), rgba(241,245,249,0.94)), url('/concrete3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.12)', pointerEvents: 'none' }} />
      <Paper elevation={8} sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, borderRadius: 4, overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight={800}>Projects Admin</Typography>
            <Typography variant="body2" color="text.secondary">Create and manage projects</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<NavigateBeforeIcon />} disabled={page === 0} onClick={loadPrevPage} sx={{ textTransform: 'none', borderRadius: 10 }}>Prev</Button>
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>{page + 1}</Typography>
            <Button variant="contained" endIcon={<NavigateNextIcon />} disabled={!hasMore[page]} onClick={loadNextPage} sx={{ textTransform: 'none', borderRadius: 10 }}>Next</Button>
          </Box>
        </Box>

        {/* Create Project */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter project title" size="small" sx={{ mb: 2 }} />
                <TextField fullWidth multiline minRows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description" size="small" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Images (up to 3)</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {files.map((f, i) => (
                    <Paper key={i} variant="outlined" sx={{ p: 2, borderRadius: 2, minWidth: 220, flex: '1 1 220px', position: 'relative' }}>
                      <Box
                        onDragOver={(e) => { e.preventDefault(); setDragOverIdx(i); }}
                        onDragLeave={() => setDragOverIdx((cur) => cur === i ? null : cur)}
                        onDrop={(e) => { e.preventDefault(); setDragOverIdx(null); const file = e.dataTransfer.files?.[0]; if (file) { const copy = [...files]; copy[i] = file; setFiles(copy); } }}
                        sx={{
                          border: '2px dashed',
                          borderColor: dragOverIdx === i ? 'primary.main' : 'divider',
                          borderRadius: 2,
                          p: 2,
                          textAlign: 'center',
                          bgcolor: dragOverIdx === i ? 'action.hover' : 'background.paper',
                          transition: 'all .2s ease',
                          position: 'relative'
                        }}
                      >
                        <AddPhotoAlternateIcon color="action" />
                        <Typography variant="body2" sx={{ mt: 1 }}>{f ? f.name : `Image ${i + 1}`}</Typography>
                        <input type="file" accept="image/*" onChange={(e) => { const copy = [...files]; copy[i] = e.target.files?.[0] || null; setFiles(copy); }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                      </Box>
                      {progress[i] !== null && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress variant="determinate" value={progress[i] ?? 0} />
                          <Typography variant="caption" color="text.secondary">{progress[i]}%</Typography>
                        </Box>
                      )}
                      {f && (
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Button size="small" onClick={() => { const copy = [...files]; copy[i] = null; setFiles(copy); }} sx={{ textTransform: 'none' }}>Clear</Button>
                          <Typography variant="caption" color="text.secondary">{Math.round((f.size/1024/1024)*100)/100} MB</Typography>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button onClick={createProject} disabled={saving} variant="contained" startIcon={<CloudUploadIcon />} sx={{ textTransform: 'none' }}>
                    {saving ? 'Creating...' : 'Create Project'}
                  </Button>
                </Box>
              </Box>
            </Box>
            {message && (
              <Typography variant="body2" sx={{ mt: 2 }} color={message.type === 'success' ? 'success.main' : 'error.main'}>
                {message.text}
              </Typography>
            )}
          </Paper>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 6, mt: 3, borderRadius: 3, textAlign: 'center', color: 'text.secondary' }}>
              No projects yet
            </Paper>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2, mt: 3 }}>
              {projects.map((p) => {
                const thumbs = [p.imgUrl1, p.imgUrl2, p.imgUrl3].filter(Boolean) as string[];
                return (
                  <Card key={p.id} sx={{ borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setPreviewProject(p)}>
                    <CardActionArea>
                      <Box sx={{ position: 'relative', height: 180 }}>
                        {thumbs.length > 0 ? (
                          <Image src={thumbs[0]} alt={p.title} fill className="object-cover" sizes="(max-width: 600px) 100vw, 25vw" unoptimized={thumbs[0].startsWith('/uploads/')} />
                        ) : (
                          <Box sx={{ height: '100%', width: '100%', bgcolor: 'grey.100', color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No image</Box>
                        )}
                      </Box>
                    </CardActionArea>
                    <CardContent sx={{ pt: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" noWrap title={p.title}>{p.title}</Typography>
                        <IconButton aria-label="Delete" color="error" onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(p.id); }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      {p.description && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }} noWrap title={p.description}>
                          {p.description}
                        </Typography>
                      )}
                      {thumbs.length > 1 && (
                        <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                          {thumbs.slice(1, 3).map((t, i) => (
                            <Box key={i} sx={{ position: 'relative', height: 56, borderRadius: 1, overflow: 'hidden' }}>
                              <Image src={t} alt={`${p.title} extra ${i + 1}`} fill className="object-cover" sizes="100%" unoptimized={t.startsWith('/uploads/')} />
                            </Box>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>

        {/* Footer pagination */}
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" startIcon={<NavigateBeforeIcon />} disabled={page === 0} onClick={loadPrevPage} sx={{ textTransform: 'none', borderRadius: 10 }}>Prev</Button>
          <Typography variant="body2" color="text.secondary">Page {page + 1}</Typography>
          <Button variant="contained" endIcon={<NavigateNextIcon />} disabled={!hasMore[page]} onClick={loadNextPage} sx={{ textTransform: 'none', borderRadius: 10 }}>Next</Button>
        </Box>
      </Paper>

      {/* Preview Dialog */}
      <Dialog open={!!previewProject} onClose={() => setPreviewProject(null)} maxWidth="md" fullWidth>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent dividers>
          {previewProject?.imgUrl1 && (
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image src={previewProject.imgUrl1} alt={previewProject.title} fill className="object-contain" sizes="100vw" unoptimized={previewProject.imgUrl1.startsWith('/uploads/')} />
            </Box>
          )}
          {previewProject && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">{previewProject.title}</Typography>
              {previewProject.description && (
                <Typography variant="body2" color="text.secondary">{previewProject.description}</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewProject(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={async () => { if (confirmDeleteId) { await doDeleteProject(confirmDeleteId); setConfirmDeleteId(null); } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


