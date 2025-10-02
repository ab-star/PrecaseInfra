import Image from 'next/image';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Zoom,
  Grow,
  alpha,
  styled,
  Stack
} from '@mui/material';
import {
  Engineering,
  Security,
  Build,
  WaterDrop,
  RocketLaunch,
  Factory,
  CheckCircle
} from '@mui/icons-material';

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    title: 'Designed for Heavy Loads',
    description:
      'Engineered in compliance with IRC codes and railway standards to withstand demanding traffic conditions.',
    image: '/product/BoxCulvertProduct/transition/1.png',
  },
  {
    title: 'Built for Durability',
    description:
      'High-strength self-compacting concrete and FE500 / 500T reinforcement deliver long-lasting performance.',
    image: '/product/BoxCulvertProduct/transition/2.png',
  },
  {
    title: 'Hydraulic Efficiency',
    description:
      'Smooth interior surfaces and integrated base slab ensure efficient water flow and soil stability.',
    image: '/product/BoxCulvertProduct/transition/3.png',
  },
  {
    title: 'Fast & Easy Installation',
    description:
      'Self-explanatory handling system and precise joint design enable safe, speedy installation.',
    image: '/product/BoxCulvertProduct/transition/4.png',
  },
  {
    title: 'Leak-Proof Assurance',
    description:
      'Precision-engineered joints guarantee watertight connections, preventing leakage and maintenance issues.',
    image: '/product/BoxCulvertProduct/transition/5.png',
  },
  {
    title: 'Factory Precision Quality',
    description:
      'Controlled manufacturing and advanced casting techniques ensure uniformity, accuracy, and reduced on-site effort.',
    image: '/product/BoxCulvertProduct/transition/6.png',
  },
];

// Styled Components
const FeatureRowCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));

const MainImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    transform: 'scale(1.01)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '10px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  transition: 'all 0.3s ease',
  flexShrink: 0,
}));

// Icon mapping for each feature
const featureIcons = [
  <Engineering key="engineering" sx={{ fontSize: 24 }} />,
  <Build key="build" sx={{ fontSize: 24 }} />,
  <WaterDrop key="water" sx={{ fontSize: 24 }} />,
  <RocketLaunch key="rocket" sx={{ fontSize: 24 }} />,
  <Security key="security" sx={{ fontSize: 24 }} />,
  <Factory key="factory" sx={{ fontSize: 24 }} />,
];

export default function AlternatingFeatures() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Use only the last image
  const mainImage = features[features.length - 1];

  // Group features into pairs for 2 per row
  const featurePairs = [];
  for (let i = 0; i < features.length; i += 2) {
    featurePairs.push(features.slice(i, i + 2));
  }

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 100%)`,
        py: { xs: 6, md: 8 },
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Main Centered Image - Fixed centering */}
             <Typography 
              variant="h4" 
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Precision Engineered Box Culverts
            </Typography>
        <Fade in={inView} timeout={600}>
         
            
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, md: 6 }, 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: isMobile ? '3rem' : '20rem'
          }}>
        
            {/* Simplified image container for better centering */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: '100%',
              mb: 4
            }}>
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                maxWidth: { xs: '100%', md: 900 },
                height: { xs: 300, md: 550 },
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                marginRight: "5rem",
                '&:hover': {
                  transform: 'scale(1.01)',
                }
              }}>
                <Image
                  src={mainImage.image}
                  alt={mainImage.title}
                  fill
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Feature Points - 2 points per line in single cards */}
        <Slide direction="up" in={inView} timeout={800}>
          <Box sx={{ width: '100%' }}>
            <Typography 
              variant="h5" 
              component="h3"
              sx={{
                textAlign: 'center',
                fontWeight: 600,
                color: 'text.primary',
                mb: 4,
                fontSize: { xs: '1.5rem', md: '1.75rem' }
              }}
            >
              Key Features & Benefits
            </Typography>
            
            <Stack spacing={3} sx={{ width: '100%' }}>
              {featurePairs.map((pair, pairIndex) => (
                <Grow in={inView} timeout={pairIndex * 200 + 800} key={pairIndex}>
                  <FeatureRowCard>
                    <CardContent sx={{ p: 4 }}>
                      <Grid container spacing={4}>
                        {pair.map((feature, featureIndex) => (
                          <Grid item xs={12} md={6} key={feature.title}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                              <IconContainer>
                                {featureIcons[pairIndex * 2 + featureIndex]}
                              </IconContainer>
                              <Box sx={{ flex: 1 }}>
                                <Typography 
                                  variant="h6" 
                                  component="h4"
                                  sx={{ 
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 1,
                                    fontSize: '1.1rem'
                                  }}
                                >
                                  {feature.title}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                    fontSize: '0.9rem'
                                  }}
                                >
                                  {feature.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </FeatureRowCard>
                </Grow>
              ))}
            </Stack>
          </Box>
        </Slide>

      </Container>
    </Box>
  );
}