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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Construction,
  Security,
  HealthAndSafety,
  School,
  Assessment,
  Build,
  Group,
  Warning,
  GppGood,
  Policy
} from '@mui/icons-material';

const SafetyPolicyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip 
          icon={<HealthAndSafety />} 
          label="Safety Policy" 
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
          Our Commitment to Safety
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', margin: '0 auto' }}>
          At 3G Infratech, safety is not just a priority – it is our core value. We are fully committed to maintaining a zero-accident, zero-fatality workplace.
        </Typography>
      </Box>

      {/* Introduction Section */}
      <Card elevation={4} sx={{ mb: 6, background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            Our mission is to create a culture of safety where employees at every level adhere to the strictest safety protocols, use the proper protective equipment, and operate machinery with utmost care and responsibility.
          </Typography>
          <Typography variant="body1" paragraph>
            We believe that safety and productivity go hand-in-hand, and we integrate safety practices seamlessly with our manufacturing processes, ensuring efficient production without ever compromising on the protection of our workforce. Our goal is to create a safe and healthy environment, where every employee feels valued and empowered to contribute to our zero-accident vision.
          </Typography>
        </CardContent>
      </Card>

      {/* Safety Commitments Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Policy sx={{ fontSize: 40, color: '#2c3e50', mr: 2 }} />
          <Typography variant="h4" component="h2" fontWeight="bold" color="#2c3e50">
            Our Safety Commitments
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Zero Accidents, Zero Fatalities */}
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
                  <GppGood sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Zero Accidents, Zero Fatalities
                  </Typography>
                </Box>
                <Typography variant="body1">
                  We aim for a workplace free from accidents and fatalities, with safety protocols in place to ensure that all risks are proactively mitigated.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Comprehensive Safety Measures */}
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
                  <Security sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Comprehensive Safety Measures
                  </Typography>
                </Box>
                <Typography variant="body1">
                  All employees are required to follow stringent safety guidelines, use appropriate protective gear at all times, and operate machinery with the highest level of care and attention.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Regular Training & Development */}
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
                  <School sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Regular Training & Development
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Continuous safety training programs are conducted to ensure that every team member is equipped with the knowledge and skills to identify hazards and prevent accidents before they occur.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Hazard Assessments & Safety Audits */}
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
                  <Assessment sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    Hazard Assessments & Safety Audits
                  </Typography>
                </Box>
                <Typography variant="body1">
                  We regularly assess potential hazards and conduct thorough safety audits to identify areas of improvement, ensuring that safety measures are maintained at the highest level.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* High-Quality Safety Tools & Equipment */}
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
                  <Build sx={{ fontSize: 30, color: '#2c3e50', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#2c3e50">
                    High-Quality Safety Tools & Equipment
                  </Typography>
                </Box>
                <Typography variant="body1">
                  We provide state-of-the-art safety tools, equipment, and personal protective gear to all employees, ensuring their safety is never compromised.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Employee Involvement */}
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
                    Employee Involvement
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Every individual at 3G Infratech is encouraged to actively participate in safety initiatives and report any potential risks or concerns immediately.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Final Commitment Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', margin: '0 auto', mb: 4 }}>
          By adhering to these principles, we ensure that our manufacturing processes are carried out in the safest possible environment, preventing accidents and promoting a culture of care, responsibility, and vigilance.
        </Typography>
        
        <Typography variant="h4" component="h2" fontWeight="bold" color="#2c3e50" gutterBottom>
          Our Safety Pledge
        </Typography>
        <Card elevation={4} sx={{ p: 4, background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' }}>
          <CardContent>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <HealthAndSafety sx={{ fontSize: 48, color: '#2c3e50', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="#2c3e50" gutterBottom>
                    Commitment to Safety
                  </Typography>
                  <Typography variant="body2">
                    Uncompromising standards in protecting our workforce
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Warning sx={{ fontSize: 48, color: '#2c3e50', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="#2c3e50" gutterBottom>
                    Commitment to Zero Harm
                  </Typography>
                  <Typography variant="body2">
                    Striving for a workplace free from accidents and injuries
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
                    Ensuring every team member returns home safely every day
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

export default SafetyPolicyPage;