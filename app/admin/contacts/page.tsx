"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRequireAdminSession } from "../_hooks/useRequireAdminSession";

// MUI
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Divider,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface ContactDoc {
  id: string;
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

const PAGE_SIZE = 10;

export default function AdminContactsPage() {
  useRequireAdminSession();

  // pagination state
  const [pages, setPages] = useState<ContactDoc[][]>([]);
  const [cursors, setCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canNext, setCanNext] = useState(false);

  // modal state
  const [openId, setOpenId] = useState<string | null>(null);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const baseQuery = useMemo(
    () => query(collection(db, "contacts"), orderBy("createdAt", "desc")),
    []
  );

  const load = async (cursor?: QueryDocumentSnapshot<DocumentData> | null) => {
    try {
      setLoading(true);
      setError(null);
      let qy = query(baseQuery, limit(PAGE_SIZE));
      if (cursor) qy = query(baseQuery, startAfter(cursor), limit(PAGE_SIZE));
      const snap = await getDocs(qy);
      const docs = snap.docs.map((d) => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          subject: data.subject || "",
          message: data.message || "",
          createdAt: data.createdAt?.toDate?.(),
        } as ContactDoc;
      });
      setPages((prev) => (cursor ? [...prev, docs] : [docs]));
      setCursors((prev) =>
        cursor
          ? [...prev, snap.docs[snap.docs.length - 1] || null]
          : [snap.docs[snap.docs.length - 1] || null]
      );
      setCanNext(snap.docs.length === PAGE_SIZE);
      if (!cursor) setPageIndex(0);
  } catch {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = async () => {
    if (loading) return;
    const currentCursor = cursors[pageIndex];
    if (!currentCursor) return;
    await load(currentCursor);
    setPageIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (loading) return;
    if (pageIndex === 0) return;
    setPageIndex((i) => i - 1);
    setCanNext(true);
  };

  const items = pages[pageIndex] || [];
  const canPrev = pageIndex > 0;
  const selected = items.find((i) => i.id === openId) || null;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 },
        backgroundImage:
          "linear-gradient(120deg, rgba(248,250,252,0.94), rgba(241,245,249,0.94)), url('/concrete2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 4,
          backdropFilter: "blur(6px)",
          bgcolor: "rgba(255,255,255,0.9)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "82vh",
        }}
      >
        {/* Sticky header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 3,
            py: 2,
            bgcolor: "rgba(255,255,255,0.9)",
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant={isSm ? "h6" : "h5"} fontWeight={700} color="text.primary">
            Contacts
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "inline" } }}>
              Page {pageIndex + 1}
            </Typography>
            <Button
              onClick={goPrev}
              disabled={!canPrev || loading}
              variant="outlined"
              startIcon={<NavigateBeforeIcon />}
              sx={{ textTransform: "none", borderRadius: 10 }}
            >
              Prev
            </Button>
            <Button
              onClick={goNext}
              disabled={!canNext || loading}
              variant="contained"
              endIcon={<NavigateNextIcon />}
              sx={{ textTransform: "none", borderRadius: 10 }}
            >
              Next
            </Button>
          </Box>
        </Box>

        {/* Error banner */}
        {error && (
          <Box sx={{ px: 3, py: 1.5, bgcolor: "#FEF2F2", color: "#B91C1C", borderTop: 1, borderBottom: 1, borderColor: "#FCA5A5" }}>
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        {/* Table */}
        <Box sx={{ p: 2, flex: 1, display: "flex", alignItems: items.length <= 1 ? "center" : "stretch" }}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, width: "100%" }}>
            <Table stickyHeader size="small" aria-label="contacts table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 280 }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>Date</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>
                      <Typography fontWeight={600} color="text.primary">
                        {c.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <a href={`mailto:${c.email}`} style={{ color: "#2563EB" }}>{c.email}</a>
                    </TableCell>
                    <TableCell>{c.contact}</TableCell>
                    <TableCell>{c.subject}</TableCell>
                    <TableCell sx={{ maxWidth: 420, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {c.message}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {c.createdAt ? c.createdAt.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="default" onClick={() => setOpenId(c.id)} aria-label="View details">
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                        No contacts yet
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Sticky footer with pagination */}
        <Divider />
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            px: 3,
            py: 2,
            bgcolor: "rgba(255,255,255,0.9)",
            borderTop: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(4px)",
          }}
        >
          <Button onClick={goPrev} disabled={!canPrev || loading} variant="outlined" startIcon={<NavigateBeforeIcon />} sx={{ textTransform: "none", borderRadius: 10 }}>
            Prev
          </Button>
          <Typography variant="body2" color="text.secondary">
            Page {pageIndex + 1}
          </Typography>
          <Button onClick={goNext} disabled={!canNext || loading} variant="contained" endIcon={<NavigateNextIcon />} sx={{ textTransform: "none", borderRadius: 10 }}>
            Next
          </Button>
        </Box>
      </Paper>

      {/* Details Modal */}
      <Dialog open={Boolean(openId)} onClose={() => setOpenId(null)} fullWidth maxWidth="sm">
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "160px 1fr" }, rowGap: 1.5, columnGap: 2 }}>
              <Typography color="text.secondary">Name</Typography>
              <Typography fontWeight={600}>{selected.name}</Typography>
              <Typography color="text.secondary">Email</Typography>
              <Typography component="a" href={`mailto:${selected.email}`} sx={{ color: "primary.main" }}>
                {selected.email}
              </Typography>
              <Typography color="text.secondary">Contact</Typography>
              <Typography>{selected.contact}</Typography>
              <Typography color="text.secondary">Subject</Typography>
              <Typography>{selected.subject}</Typography>
              <Typography color="text.secondary">Message</Typography>
              <Box sx={{ p: 1.5, bgcolor: "grey.50", borderRadius: 1, maxHeight: 240, overflow: "auto" }}>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>{selected.message}</Typography>
              </Box>
              <Typography color="text.secondary">Date</Typography>
              <Typography color="text.secondary">{selected.createdAt ? selected.createdAt.toLocaleString() : "-"}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenId(null)} variant="contained" sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}