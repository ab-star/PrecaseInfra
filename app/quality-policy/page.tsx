"use client";
import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Construction,
  Engineering,
  DesignServices,
  SupportAgent,
  CheckCircle,
  EmojiEvents,
  Group,
  AutoAwesome,
  Nature, // Replaced Eco with Nature
  TrendingUp
} from '@mui/icons-material';

const QualityCommitmentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip 
          icon={<EmojiEvents />} 
          label="Quality Commitment" 
          color="primary" 
          sx={{ 
            fontSize: '1.2rem', 
            padding: '1.5rem', 
            mb: 2,
            background: 'linear-gradient(45deg, #2c3e50, #4a6572)'
          }} 
        />
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2c3e50',
            background: 'linear-gradient(45deg, #2c3e50, #4a6572)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Our Commitment to Excellence
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', margin: '0 auto' }}>
          At 3G Infratech, we are unwavering in our commitment to deliver the highest quality precast concrete products that consistently exceed customer expectations.
        </Typography>
      </Box>

      {/* Introduction Section */}
      <Card elevation={4} sx={{ mb: 6, background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            With a strong focus on innovation, reliability, and sustainability, we ensure that each product meets the stringent international standards of quality, durability, and performance for our local clientele.
          </Typography>
          <Typography variant="body1" paragraph>
            Our Quality Management System (QMS) is founded on the principles of consistency, continuous improvement, and full compliance with applicable regulations and standards. We are dedicated to maintaining an environment of excellence and innovation while ensuring that every aspect of our operations aligns with our commitment to quality.
          </Typography>
        </CardContent>
      </Card>

      {/* Commitment Principles Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <AutoAwesome sx={{ fontSize: 40, color: '#2c3e50', mr: 2 }} />
          <Typography variant="h4" component="h2" fontWeight="bold" color="#2c3e50">
            Our Commitment Principles
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Ensuring Excellence */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderLeft: '5px solid #2c3e50'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Ensuring Excellence
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Delivering products of exceptional quality, durability, and performance, through stringent quality control at every stage of production.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Innovation & Improvement */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderLeft: '5px solid #2c3e50'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Engineering sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Innovation & Improvement
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Continuously enhancing our processes, materials, and technologies to achieve optimum results and meet evolving market needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Satisfaction */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderLeft: '5px solid #2c3e50'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SupportAgent sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Customer Satisfaction
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Placing our customers at the core of our business by delivering tailored solutions that meet and exceed their expectations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Sustainable Practices */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderLeft: '5px solid #2c3e50'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Nature sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Sustainable Practices
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Committing to environmentally responsible and sustainable manufacturing processes, minimizing our ecological footprint, and supporting long-term development goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Employee Engagement */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderLeft: '5px solid #2c3e50'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Group sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Employee Engagement
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Fostering a culture of quality at all levels of the organization by encouraging employee involvement, providing training, and empowering individuals to take responsibility for quality outcomes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Final Commitment Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" color="#2c3e50" gutterBottom>
          Our Pledge
        </Typography>
        <Card elevation={4} sx={{ p: 4, background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' }}>
          <CardContent>
            <Typography variant="body1" paragraph>
              We are committed to continuously enhancing the effectiveness of our Quality Management System, fostering trust with our stakeholders, and ensuring that 3G Infratech remains the trusted and preferred partner for precast solutions worldwide.
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <CheckCircle sx={{ fontSize: 48, color: '#2c3e50', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="#2c3e50" gutterBottom>
                    Commitment to Quality
                  </Typography>
                  <Typography variant="body2">
                    Uncompromising standards in every product we deliver
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <EmojiEvents sx={{ fontSize: 48, color: '#2c3e50', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="#2c3e50" gutterBottom>
                    Commitment to Excellence
                  </Typography>
                  <Typography variant="body2">
                    Striving for perfection in all our processes
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Group sx={{ fontSize: 48, color: '#2c3e50', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="#2c3e50" gutterBottom>
                    Commitment to You
                  </Typography>
                  <Typography variant="body2">
                    Putting our customers at the heart of everything we do
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default QualityCommitmentPage;