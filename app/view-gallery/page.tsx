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
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

// Flag to control whether to show the gallery or under progress message
const SHOW_GALLERY = false; // Set to true to enable the gallery functionality

export default function ViewGalleryPage() {
  const [items, setItems] = useState<GalleryImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!SHOW_GALLERY) return; // Only load data if gallery is enabled
    
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

  // Show under progress message if flag is false
  if (!SHOW_GALLERY) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          width: "100dvw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url('/concrete2.jpg'), linear-gradient(120deg, rgba(248,250,252,0.55), rgba(241,245,249,0.5))",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <Container maxWidth="md">
          <Card 
            elevation={8} 
            sx={{ 
              p: 4, 
              borderRadius: 3, 
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)"
            }}
          >
            <ConstructionOutlined 
              sx={{ 
                fontSize: 64, 
                color: "primary.main", 
                mb: 2 
              }} 
            />
            <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
              Page Under Construction
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              We're working on something amazing!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Our gallery is currently being updated with new content. 
              Please check back soon for updates and exciting new visuals 
              showcasing our latest projects and achievements.
            </Typography>
            <Box
              component="img"
              src="/under-construction.svg"
              alt="Under construction"
              sx={{ 
                width: "100%", 
                maxWidth: 300, 
                height: "auto",
                mx: "auto",
                mb: 3
              }}
            />
            <Button 
              variant="contained" 
              size="large" 
              href="/"
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1
              }}
            >
              Return to Home
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  // Original gallery functionality
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