"use client"
import React from 'react';
import { Box, Container, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  margin: theme.spacing(6, 0),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, #f5f5f5 100%)`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 6),
  },
}));

const SectionIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontSize: '2rem',
  fontWeight: 'bold',
}));

const VisionSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4 },
        backgroundColor: '#fafafa'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 6,
            color: theme.palette.primary.dark,
            fontSize: { xs: '2rem', md: '2.75rem' }
          }}
        >
          Our Vision & Mission
        </Typography>
        
        {/* Vision Section */}
        <StyledSection>
          <Box display="flex" flexDirection="column" alignItems="center">
            <SectionIcon>V</SectionIcon>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mb: 3
              }}
            >
              VISION
            </Typography>
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: theme.palette.text.secondary
              }}
            >
              To become the global leader in innovative and sustainable precast concrete solutions, 
              revolutionizing the infrastructure and construction industries through unmatched quality, 
              reliability, and cost-effectiveness. At 3G Infratech, we are committed to setting new 
              benchmarks in precast manufacturing, pioneering advancements that shape the future of 
              infrastructure, and consistently delivering superior value to our customers across the world. 
              Our vision is to drive industry transformation, building resilient and sustainable 
              infrastructures that endure for generations to come.
            </Typography>
          </Box>
        </StyledSection>

        {/* Mission Section */}
        <StyledSection>
          <Box display="flex" flexDirection="column" alignItems="center">
            <SectionIcon>M</SectionIcon>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mb: 3
              }}
            >
              MISSION
            </Typography>
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: theme.palette.text.secondary
              }}
            >
              At 3G Infratech, our mission is to deliver exceptional precast products that not only meet 
              but exceed global quality standards, ensuring outstanding durability, efficiency, and performance. 
              We are dedicated to building lasting partnerships with our customers, stakeholders, and communities 
              by focusing on continuous innovation, optimizing production processes, and providing cost-effective 
              solutions tailored to meet the diverse needs of the infrastructure, industrial, and private sectors. 
              Through our unwavering commitment to excellence, sustainability, and forward-thinking practices, 
              we aim to contribute to the construction of smarter, stronger, and more resilient infrastructure 
              worldwide, helping shape a better tomorrow.
            </Typography>
          </Box>
        </StyledSection>
      </Container>
    </Box>
  );
};

export default VisionSection;