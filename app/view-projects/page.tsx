"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProjectsDataStore, type ProjectData } from "../../lib/dataStore";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";

export default function ViewProjectsPage() {
  const [items, setItems] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await ProjectsDataStore.getAllProjects();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selected = items.find((p) => p.id === openId);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100dvw",
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage:
          "url('/concrete2.jpg'), linear-gradient(120deg, rgba(248,250,252,0.55), rgba(241,245,249,0.5))",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1280 }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            Projects
          </Typography>
          <Typography color="text.secondary">
            A look at our recent and notable work across sectors.
          </Typography>
        </Box>

        <Paper elevation={8} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: "rgba(255,255,255,0.95)" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Box key={i}>
                    <Skeleton variant="rounded" height={160} sx={{ borderRadius: 2, mb: 1.5 }} />
                    <Skeleton variant="text" width="75%" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                ))
              : items.map((p) => (
                  <Box
                    key={p.id}
                    onClick={() => setOpenId(p.id)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      bgcolor: "grey.50",
                      boxShadow: 1,
                      transition: "transform .15s ease, box-shadow .2s ease",
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
                    }}
                  >
                    <Box sx={{ position: "relative", aspectRatio: "16/9", bgcolor: "grey.100" }}>
                      {p.images?.[0]?.url && (
                        <Image
                          src={p.images[0].url}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                          unoptimized={p.images[0].url.startsWith('/uploads/')}
                        />
                      )}
                    </Box>
                    <Box sx={{ p: 1.75 }}>
                      <Typography variant="h6" fontWeight={800} gutterBottom noWrap>
                        {p.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {p.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {p.category && <Chip size="small" label={p.category} />}
                      </Stack>
                    </Box>
                  </Box>
                ))}
          </Box>

          {!loading && items.length === 0 && (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="text.secondary">No projects yet</Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog open={Boolean(selected)} onClose={() => setOpenId(null)} maxWidth="md" fullWidth>
        <DialogTitle>{selected?.title}</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 2 }}>
                <Box>
                  <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/9", mb: 1.5 }}>
                    {selected.images?.[0]?.url && (
                      <Image
                        src={selected.images[0].url}
                        alt={selected.title}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized={selected.images[0].url.startsWith('/uploads/')}
                      />
                    )}
                  </Box>
                  <Typography color="text.secondary">{selected.description}</Typography>
                </Box>
                <Box>
                  <Stack spacing={1}>
                    <Typography><strong>Category:</strong> {selected.category}</Typography>
                    {selected.location && <Typography><strong>Location:</strong> {selected.location}</Typography>}
                    {selected.client && <Typography><strong>Client:</strong> {selected.client}</Typography>}
                    {selected.startDate && <Typography><strong>Start:</strong> {selected.startDate}</Typography>}
                    {selected.endDate && <Typography><strong>End:</strong> {selected.endDate}</Typography>}
                    {selected.budget != null && <Typography><strong>Budget:</strong> ₹{selected.budget.toLocaleString()}</Typography>}
                    {selected.features?.length > 0 && (
                      <Box>
                        <Typography fontWeight={700} sx={{ mb: 0.5 }}>Key Features</Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {selected.features.map((f, i) => (
                            <Chip key={i} label={f} variant="outlined" />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Box>
              </Box>
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
