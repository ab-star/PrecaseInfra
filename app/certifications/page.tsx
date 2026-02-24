"use client";
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import {
  VerifiedUser,
  CheckCircle,
  Nature,
} from '@mui/icons-material';

interface CertificationCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  logos: CertificationLogo[];
}

interface CertificationLogo {
  id: number;
  url: string;
  alt: string;
}

export default function CertificationsPage() {
  const certificationCategories: CertificationCategory[] = [
    {
      id: 'process-management',
      title: 'Process & Management Systems',
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      description: 'Industry-recognized certifications for process excellence and management systems',
      logos: [
        {
          id: 1,
          url: '/certIcon/ISO.jpeg',
          alt: 'ISO Certification',
        },
      ],
    },
    {
      id: 'quality-testing',
      title: 'Quality & Testing',
      icon: <CheckCircle sx={{ fontSize: 32 }} />,
      description: 'Certifications validating our quality assurance and testing standards',
      logos: [
        {
          id: 2,
          url: '/certIcon/5S.jpeg',
          alt: '5S Certification',
        },
        {
          id: 4,
          url: '/certIcon/QualityControl.jpeg',
          alt: 'Approved Tested Certification',
        },
      ],
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: <Nature sx={{ fontSize: 32 }} />,
      description: 'Environmental and sustainability commitments recognized by leading organizations',
      logos: [
        {
          id: 3,
          url: '/certIcon/ZED.jpeg',
          alt: 'ZED Silver Certification',
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        width: '100dvw',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 },
        backgroundImage:
          "linear-gradient(120deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95)), url('/concrete2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="Certifications"
            variant="filled"
            sx={{
              fontSize: '1.1rem',
              padding: '1.5rem',
              mb: 2,
              background: 'linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)',
              color: 'white',
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Certifications & Recognition
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              margin: '0 auto',
              fontWeight: 500,
            }}
          >
            3G Infratech maintains the highest international standards for quality, safety, and sustainability across all operations. Our certifications reflect our commitment to excellence and continuous improvement.
          </Typography>
        </Box>

        {/* Certification Categories */}
        <Stack spacing={6}>
          {certificationCategories.map((category) => (
            <Box key={category.id}>
              {/* Category Header */}
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  mb: 3,
                  background: 'linear-gradient(135deg, rgba(24, 113, 182, 0.08) 0%, rgba(44, 90, 160, 0.06) 100%)',
                  borderLeft: '6px solid #1871b6',
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)',
                      color: 'white',
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: '#1871b6',
                        mb: 0.5,
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Logo Grid */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
                {category.logos.map((logo) => (
                  <Paper
                    key={logo.id}
                    elevation={3}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                      background: 'white',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(24, 113, 182, 0.15)',
                      },
                      width: { xs: '100%', sm: 220, md: 240 },
                      height: 220,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={logo.url}
                        alt={logo.alt}
                        width={180}
                        height={180}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: 10,
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(24, 113, 182, 0.1) 0%, rgba(44, 90, 160, 0.08) 100%)',
            borderTop: '2px solid #1871b6',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1871b6',
              mb: 1,
            }}
          >
            Committed to Excellence
          </Typography>
          <Typography variant="body1" color="text.secondary">
            These certifications represent our dedication to delivering world-class precast solutions that meet and exceed international standards for quality, safety, environmental responsibility, and operational excellence. We continuously pursue further certifications and improvements to serve our clients better.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}