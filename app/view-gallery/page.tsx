"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Pagination,
  Card,
} from "@mui/material";

// Only show .jpg, .jpeg, .png images from Photos
const imageList = [
  "DJI_0198.JPG",
  "DJI_0199.JPG",
  "DJI_0207.JPG",
  "DJI_0208.JPG",
  "DJI_0351.JPG",
  "DJI_0357.JPG",
  "DJI_0364.JPG",
  "DJI_0366.JPG",
  "DJI_0373.JPG",
  "NICK0559.JPG",
  "NICK0741.JPG",
  "NICK0745.JPG",
  "NICK0750.JPG",
  "NICK0751.JPG",
  "NICK0768.JPG",
  "NICK0769.JPG",
  "NICK0773.JPG",
  "NICK0775.JPG",
  "NICK0790.JPG",
  "NICK0793.JPG",
  "NICK0812.JPG",
  "NICK0859.JPG",
  "WhatsApp Image 2026-01-22 at 12.48.30 PM.jpeg",
  "WhatsApp Image 2026-01-22 at 12.50.08 PM.jpeg",
  "WhatsApp Image 2026-01-22 at 12.52.52 PM....jpeg",
  "WhatsApp Image 2026-01-22 at 12.52.52 PM.jpeg",
  "DJI_0244.JPG"
];

const IMAGES_PER_PAGE = 12;

export default function ViewGalleryPage() {
  const [page, setPage] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(imageList.length / IMAGES_PER_PAGE);
  const pagedImages = imageList.slice(
    (page - 1) * IMAGES_PER_PAGE,
    page * IMAGES_PER_PAGE
  );

  const handleOpen = (idx: number) => setOpenIndex(idx);
  const handleClose = () => setOpenIndex(null);

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
            {pagedImages.length === 0 ? (
              <Typography color="text.secondary">No images found.</Typography>
            ) : (
              pagedImages.map((img, i) => (
                <Card
                  key={img}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "grey.50",
                    boxShadow: 1,
                    transition: "transform .15s ease, box-shadow .2s ease",
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
                  }}
                  onClick={() => handleOpen((page - 1) * IMAGES_PER_PAGE + i)}
                >
                  <Box sx={{ position: "relative", aspectRatio: "4/3", width: "100%", height: 0, pb: "75%" }}>
                    <Image
                      src={`/Photos/${img}`}
                      alt={img}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Card>
              ))
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              color="primary"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </Paper>
      </Box>
      <Dialog open={openIndex !== null} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent dividers>
          {openIndex !== null && (
            <Box sx={{ position: "relative", width: "100%", height: { xs: 260, md: 420 } }}>
              <Image
                src={`/Photos/${imageList[openIndex]}`}
                alt={imageList[openIndex]}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}