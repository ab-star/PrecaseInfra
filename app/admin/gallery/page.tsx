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
// MUI
import {
  Box,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  // Pagination state
  const [pages, setPages] = useState<GalleryItem[][]>([]);
  const [page, setPage] = useState(0);
  const [cursors, setCursors] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasMore, setHasMore] = useState<boolean[]>([]);
  const pageSize = 12;
  const items = pages[page] || [];
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
      setUploadProgress(0);
      setMessage(null);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("prefix", "gallery");

      // Use XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ url: string }>((resolve, reject) => {
        xhr.open("POST", "/api/r2-upload");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(pct);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
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

      const { url } = await promise;
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
      setUploadProgress(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "gallery", id));
    await loadFirstPage();
    setMessage({ type: "success", text: "Image deleted successfully" });
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        position: "relative",
        backgroundImage:
          "linear-gradient(120deg, rgba(248,250,252,0.94), rgba(241,245,249,0.94)), url('/concrete2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.12)", pointerEvents: "none" }} />
      <Paper elevation={8} sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1280, borderRadius: 4, overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2.5, borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" fontWeight={800}>Gallery Portal</Typography>
            <Typography variant="body2" color="text.secondary">Upload and manage gallery images</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<NavigateBeforeIcon />} disabled={page === 0} onClick={loadPrevPage} sx={{ textTransform: "none", borderRadius: 10 }}>
              Prev
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>{page + 1}</Typography>
            <Button variant="contained" endIcon={<NavigateNextIcon />} disabled={!hasMore[page]} onClick={loadNextPage} sx={{ textTransform: "none", borderRadius: 10 }}>
              Next
            </Button>
          </Box>
        </Box>

        {/* Upload area */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 3 }}>
            <Box
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
              sx={{
                border: "2px dashed",
                borderColor: dragOver ? "primary.main" : "divider",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                textAlign: "center",
                bgcolor: dragOver ? "action.hover" : "background.paper",
                transition: "all .2s ease",
              }}
            >
              <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                {file ? file.name : "Drag & drop an image here, or click to select"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PNG, JPG up to ~10MB
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }}
                aria-label="Choose image"
              />
              <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center" }}>
                <Button onClick={() => setFile(null)} disabled={!file || uploading} variant="text" sx={{ textTransform: "none" }}>
                  Clear
                </Button>
                <Button onClick={handleUpload} disabled={!file || uploading} variant="contained" startIcon={<CloudUploadIcon />} sx={{ textTransform: "none" }}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </Box>
              {uploadProgress !== null && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="caption" color="text.secondary">{uploadProgress}%</Typography>
                </Box>
              )}
              {message && (
                <Typography variant="body2" sx={{ mt: 1 }} color={message.type === 'success' ? 'success.main' : 'error.main'}>
                  {message.text}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Grid */}
          {items.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 6, borderRadius: 3, textAlign: "center", color: "text.secondary" }}>
              No images yet
            </Paper>
          ) : (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 2
            }}>
              {items.map((it) => (
                <Box key={it.id}>
                  <Card sx={{ borderRadius: 3, overflow: "hidden", position: "relative" }}>
                    <CardActionArea onClick={() => setPreviewUrl(it.imageUrl)}>
                      <Box sx={{ position: "relative", height: 180 }}>
                        <Image src={it.imageUrl} alt="Gallery item" fill sizes="(max-width: 600px) 100vw, 25vw" className="object-cover" unoptimized={it.imageUrl.startsWith('/uploads/')} />
                      </Box>
                    </CardActionArea>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="caption" color="text.secondary">{it.createdAt ? it.createdAt.toLocaleDateString() : ''}</Typography>
                      <Box>
                        <IconButton aria-label="Preview" onClick={() => setPreviewUrl(it.imageUrl)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" color="error" onClick={() => setConfirmDeleteId(it.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Footer pagination */}
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" startIcon={<NavigateBeforeIcon />} disabled={page === 0} onClick={loadPrevPage} sx={{ textTransform: "none", borderRadius: 10 }}>
            Prev
          </Button>
          <Typography variant="body2" color="text.secondary">Page {page + 1}</Typography>
          <Button variant="contained" endIcon={<NavigateNextIcon />} disabled={!hasMore[page]} onClick={loadNextPage} sx={{ textTransform: "none", borderRadius: 10 }}>
            Next
          </Button>
        </Box>
      </Paper>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl(null)} maxWidth="md" fullWidth>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent dividers>
          {previewUrl && (
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image src={previewUrl} alt="Preview" fill className="object-contain" sizes="100vw" unoptimized={previewUrl.startsWith('/uploads/')} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewUrl(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Delete image?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={async () => { if (confirmDeleteId) { await handleDelete(confirmDeleteId); setConfirmDeleteId(null); } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
