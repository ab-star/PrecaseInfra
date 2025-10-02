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

// Use available images (01-05.png). If 06 exists later, it can be added.
const features: Feature[] = [
  {
    title: 'Integrated Wall Assembly',
    description:
      'Footing, column, and wall are cast as a single precast unit, ensuring strength and stability in one structure.',
    image: '/product/walls/images/01.png',
  },
  {
    title: 'Fast & Safe Installation',
    description:
      'Precast system enables rapid on-site erection, allowing higher installation quantities per day compared to conventional methods.',
    image: '/product/walls/images/02.png',
  },
  {
    title: 'Seamless Single-Piece Design',
    description:
      'Walls are cast in a single piece without joints, delivering superior strength and flawless continuity.',
    image: '/product/walls/images/03.png',
  },
  {
    title: 'Superior Surface Finish',
    description:
      'Factory-controlled casting ensures smooth, uniform surfaces that require minimal to no plastering.',
    image: '/product/walls/images/04.png',
  },
  {
    title: 'Dual-Application Advantage',
    description:
      'Compound walls can be combined over retaining walls—offering earth retention and secure boundary solutions in one system.',
    image: '/product/walls/images/05.png',
  },
];

// Styled Components
const FeatureRowCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
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
  width: 60,
  height: 60,
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  transition: 'all 0.3s ease',
  flexShrink: 0,
  boxShadow: theme.shadows[2],
}));

// Icon mapping for each feature
const featureIcons = [
  <Engineering key="engineering" sx={{ fontSize: 28 }} />,
  <Build key="build" sx={{ fontSize: 28 }} />,
  <WaterDrop key="water" sx={{ fontSize: 28 }} />,
  <RocketLaunch key="rocket" sx={{ fontSize: 28 }} />,
  <Security key="security" sx={{ fontSize: 28 }} />,
];

export default function AlternatingFeaturesWalls() {
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

  // Use the first image for the main display
  const mainImage = features[0];

  // Group features into pairs for 2 per row
  const featurePairs = [];
  for (let i = 0; i < features.length; i += 2) {
    featurePairs.push(features.slice(i, i + 2));
  }

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        background: `url(/product/Drain/background/uShapedDrainBg.jpg) center/cover`,
        py: { xs: 6, md: 8 },
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Main Centered Image - Using first image */}
        <Fade in={inView} timeout={600}>
          <Box sx={{ 
            textAlign: 'center', 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
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
              Precast Wall Solutions
            </Typography>
            
            {/* Main image container */}
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
                    objectPosition: 'center',
                    marginLeft: isMobile ? '3rem' : '5rem'
                  }}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Feature Points - 2 points per line in larger cards */}
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
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Key Features & Benefits
            </Typography>
            
            <Stack spacing={4} sx={{ width: '100%' }}>
              {featurePairs.map((pair, pairIndex) => (
                <Grow in={inView} timeout={pairIndex * 200 + 800} key={pairIndex}>
                  <FeatureRowCard>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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
                                    mb: 2,
                                    fontSize: { xs: '1.1rem', md: '1.8rem' }
                                  }}
                                >
                                  {feature.title}
                                </Typography>
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.95rem', md: '1.5rem' }
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