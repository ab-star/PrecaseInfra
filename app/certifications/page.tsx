"use client";
import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

interface Certification {
  id: number;
  title: string;
  description: string;
  filePath: string;
  issueDate: string;
  issuingAuthority: string;
}

export default function CertificationsPage() {
  const [selected, setSelected] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);

  const certifications: Certification[] = [
    {
      id: 1,
      title: '3G Infratech - ISO 14001',
      description:
        'Quality Management System certification demonstrating our commitment to consistent quality and continuous improvement.',
      filePath: '/certif/3GISO14001.pdf',
      issueDate: 'March 15, 2023',
      issuingAuthority: 'International Organization for Standardization',
    },
    {
      id: 2,
      title: '3G Infratech - ISO 45001',
      description:
        'Information Security Management System certification ensuring the highest standards of data protection and security.',
      filePath: '/certif/3GISO45001.pdf',
      issueDate: 'April 22, 2023',
      issuingAuthority: 'International Organization for Standardization',
    },
    {
      id: 3,
      title: 'ISO 9001 2015',
      description:
        'Service Organization Control compliance report verifying our security, availability, and confidentiality processes.',
      filePath: '/certif/ISO90012015.pdf',
      issueDate: 'May 30, 2023',
      issuingAuthority: 'American Institute of CPAs',
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

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
        backgroundImage:
          "linear-gradient(120deg, rgba(248,250,252,0.94), rgba(241,245,249,0.94)), url('/lightGreenGranite.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.08)', pointerEvents: 'none' }} />
      <Paper elevation={6} sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, borderRadius: 4, p: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Our Certifications
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            We maintain the highest standards of quality, safety, and compliance across our operations.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 280 }}>
            <PictureAsPdfIcon color="disabled" sx={{ fontSize: 48 }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))',
              justifyContent: 'center',
              justifyItems: 'center',
              gap: 2,
            }}
          >
            {certifications.map((c) => (
              <Card
                key={c.id}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ height: 6, width: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <PictureAsPdfIcon color="primary" />
                    <Typography variant="h6" component="h3" fontWeight={700} noWrap title={c.title}>
                      {c.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {c.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Issued by: {c.issuingAuthority}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Date: {c.issueDate}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => setSelected(c)}
                    sx={{ textTransform: 'none' }}
                    fullWidth
                  >
                    Preview
                  </Button>
                  <Button
                    component="a"
                    href={c.filePath}
                    download
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{ textTransform: 'none' }}
                    fullWidth
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Paper>

      {/* Preview Dialog */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="xl">
        <DialogTitle sx={{ pb: 1 }}>{selected?.title || 'Preview'}</DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {selected && (
            <Box sx={{ width: '100%', height: { xs: '80vh', md: '85vh' } }}>
              <iframe
                src={selected.filePath}
                title={`Preview of ${selected.title}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selected && (
            <Button
              component="a"
              href={selected.filePath}
              download
              startIcon={<DownloadIcon />}
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Download PDF
            </Button>
          )}
          <Button onClick={() => setSelected(null)} sx={{ textTransform: 'none' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}