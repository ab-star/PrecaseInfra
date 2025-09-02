"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryDataStore, type GalleryImageData } from "../../lib/dataStore";
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

export default function ViewGalleryPage() {
  const [items, setItems] = useState<GalleryImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await GalleryDataStore.getAllImages();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selected = openIndex != null ? items[openIndex] : undefined;

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
            Gallery
          </Typography>
          <Typography color="text.secondary">
            Explore highlights from our recent work and moments.
          </Typography>
        </Box>

        <Paper elevation={8} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: "rgba(255,255,255,0.95)" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Box key={i}>
                    <Skeleton variant="rounded" height={140} sx={{ borderRadius: 2, mb: 1 }} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                ))
              : items.map((img, i) => (
                  <Box
                    key={img.id}
                    onClick={() => setOpenIndex(i)}
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
                    <Box sx={{ position: "relative", aspectRatio: "4/3" }}>
                      <Image src={img.url} alt={img.title} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Typography variant="subtitle1" fontWeight={700} noWrap>
                        {img.title}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        {img.category && <Chip size="small" label={img.category} />}
                        {img.featured && <Chip size="small" color="primary" label="Featured" />}
                      </Stack>
                    </Box>
                  </Box>
                ))}
          </Box>

          {!loading && items.length === 0 && (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="text.secondary">No images yet</Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog open={Boolean(selected)} onClose={() => setOpenIndex(null)} maxWidth="md" fullWidth>
        <DialogTitle>{selected?.title}</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box>
              <Box sx={{ position: "relative", width: "100%", height: { xs: 260, md: 420 }, mb: 2 }}>
                <Image src={selected.url} alt={selected.title} fill style={{ objectFit: "cover" }} />
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                {selected.category && <Chip label={selected.category} />}
                {selected.featured && <Chip color="primary" label="Featured" />}
              </Stack>
              {selected.description && (
                <Typography color="text.secondary">{selected.description}</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIndex(null)} variant="contained" sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
