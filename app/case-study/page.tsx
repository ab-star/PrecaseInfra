"use client";
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Construction,
  Engineering,
  DesignServices,
  SupportAgent,
  Factory,
  PrecisionManufacturing,
  ExpandMore,
  TableChart,
  Email,
  Language,
  Share,
  Download,
  CalendarToday,
  LocationOn,
  AccountBalance,
  Speed,
  Savings,
  AssignmentTurnedIn,
  FormatQuote
} from '@mui/icons-material';

const CaseStudiesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const caseStudies = [
    {
      id: 1,
      title: "Transforming Infrastructure with Precast Solutions",
      client: "Adani Group & KKS Projects",
      location: "Border Zone, Near Sea Creek",
      challenges: [
        "Continuous saline water logging making on-site casting and curing unreliable",
        "Slushy terrain with poor soil stability",
        "High labor and equipment costs due to continuous dewatering, shuttering, and formwork",
        "Long construction cycle with conventional RCC structures"
      ],
      solutions: [
        "Precast Box Culverts for cross-drainage and saline water passage",
        "Precast U-Shape Drains for effective stormwater discharge",
        "Precast Retaining Walls to stabilize embankments",
        "Precast Compound Walls for boundary and site protection"
      ],
      features: [
        "M50 SCC precast concrete, resistant to saline exposure",
        "Leak-proof jointery ensuring watertight performance",
        "Self-explanatory handling system for fast and safe installation",
        "Factory precision eliminating on-site casting risks"
      ],
      impacts: {
        time: "60% time savings (40 days vs 100 days conventional)",
        cost: "₹6 Crores savings in overhead costs",
        manpower: "80% reduction in manpower requirement",
        quality: "Superior durability in saline conditions"
      }
    },
    {
      id: 2,
      title: "Metro Rail Project Accelerated with Precast Technology",
      client: "Delhi Metro Rail Corporation",
      location: "New Delhi",
      challenges: [
        "Tight project timeline with heavy penalties for delays",
        "Limited workspace in densely populated urban area",
        "Need for precision engineering in seismic zone",
        "High traffic area requiring minimal disruption"
      ],
      solutions: [
        "Precast tunnel segments for metro lines",
        "Precast station elements including walls and platforms",
        "Precast foot over bridges and entry points",
        "Precast noise barriers along elevated sections"
      ],
      features: [
        "High-precision manufacturing with tolerances under 2mm",
        "Seismic-resistant design elements",
        "Quick-connect systems for rapid installation",
        "Architectural finishes for aesthetic appeal"
      ],
      impacts: {
        time: "45% reduction in construction timeline",
        cost: "₹4.2 Crores saved through reduced labor and equipment",
        manpower: "70% reduction in onsite workforce",
        quality: "Consistent quality with zero defects in structural elements"
      }
    },
    {
      id: 3,
      title: "Industrial Park Development with Precast Components",
      client: "Tata Industrial Park",
      location: "Pune, Maharashtra",
      challenges: [
        "Need for rapid construction to meet investor move-in deadlines",
        "Requirement for durable structures in industrial environment",
        "Limited availability of skilled labor in remote location",
        "Complex architectural requirements for modern facilities"
      ],
      solutions: [
        "Precast structural frames for factory buildings",
        "Precast wall panels with insulation properties",
        "Precast hollow core slabs for flooring",
        "Precast staircase and balcony units"
      ],
      features: [
        "Integrated insulation for energy efficiency",
        "Custom architectural finishes as per design",
        "Pre-installed conduits for electrical and plumbing",
        "Fire-resistant specifications for industrial safety"
      ],
      impacts: {
        time: "Project completed 8 months ahead of schedule",
        cost: "22% overall cost savings compared to conventional methods",
        manpower: "60% reduction in onsite labor requirements",
        quality: "Consistent finish quality across all buildings"
      }
    },
    {
      id: 4,
      title: "Bridge Construction in Challenging Terrain",
      client: "NHPC Limited",
      location: "Himalayan Foothills, Uttarakhand",
      challenges: [
        "Extreme weather conditions with limited working season",
        "Difficult terrain with limited access for construction equipment",
        "Seismic zone requiring specialized engineering",
        "Environmental sensitivity requiring minimal site disturbance"
      ],
      solutions: [
        "Precast bridge girders manufactured off-site",
        "Precast abutments and pier elements",
        "Precast deck slabs with anti-skid surface",
        "Precast parapets and safety barriers"
      ],
      features: [
        "High-strength concrete for seismic resistance",
        "Lightweight design for easier transportation",
        "Corrosion-resistant reinforcement for longevity",
        "Modular design for quick assembly during short weather windows"
      ],
      impacts: {
        time: "70% reduction in onsite construction time",
        cost: "₹3.8 Crores saved through efficient methodology",
        manpower: "75% reduction in high-altitude labor requirements",
        quality: "Superior engineering quality with precise tolerances"
      }
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "We are extremely pleased to share our experience with 3G Infratech. The company committed to supplying 20 km of U-Shape Drains within 120 days—and delivered every unit right on time. Beyond supply, 3G Infratech supported us in the hydraulic design of the stormwater drain network, optimizing sizes and ensuring cost-effective, efficient solutions.",
      author: "X M SSSSSS, Director of Operation, PQR company",
      company: "PQR Infrastructure"
    },
    {
      id: 2,
      quote: "3G Infratech's precast solutions helped us complete our metro project 6 months ahead of schedule. Their technical expertise and quality products were instrumental in overcoming complex engineering challenges in dense urban environments.",
      author: "Rajesh Kumar, Project Director, Delhi Metro",
      company: "Delhi Metro Rail Corporation"
    },
    {
      id: 3,
      quote: "The precision and quality of 3G Infratech's precast elements exceeded our expectations. Their team provided excellent support from design through installation, making our industrial park project a great success.",
      author: "Sanjay Mehta, CEO, Tata Industrial Parks",
      company: "Tata Group"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip 
          icon={<Construction />} 
          label="Case Studies" 
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
          Success Stories
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', margin: '0 auto' }}>
          Discover how 3G Infratech's precast solutions have helped leading companies save time, reduce costs, and overcome complex construction challenges.
        </Typography>
      </Box>

      {/* Tabs for Case Studies and Testimonials */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Case Studies" />
          <Tab label="Client Testimonials" />
          <Tab label="Installation Methodology" />
        </Tabs>
      </Box>

      {/* Case Studies Content */}
      {activeTab === 0 && (
        <Grid container spacing={4}>
          {caseStudies.map((caseStudy) => (
            <Grid item xs={12} md={6} key={caseStudy.id}>
              <Card 
                elevation={4} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" fontWeight="bold" color="#2c3e50" gutterBottom>
                    {caseStudy.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccountBalance sx={{ fontSize: 20, color: '#2c3e50', mr: 1 }} />
                    <Typography variant="body1" fontWeight="medium">
                      Client: {caseStudy.client}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ fontSize: 20, color: '#2c3e50', mr: 1 }} />
                    <Typography variant="body1">
                      Location: {caseStudy.location}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" paragraph>
                    Key Achievements:
                  </Typography>
                  
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Speed sx={{ fontSize: 16, color: '#2c3e50', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="medium">
                          Time Saved: {caseStudy.impacts.time}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Savings sx={{ fontSize: 16, color: '#2c3e50', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="medium">
                          Cost Savings: {caseStudy.impacts.cost}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Engineering sx={{ fontSize: 16, color: '#2c3e50', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="medium">
                          Manpower: {caseStudy.impacts.manpower}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssignmentTurnedIn sx={{ fontSize: 16, color: '#2c3e50', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="medium">
                          Quality: {caseStudy.impacts.quality}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ 
                      mt: 2,
                      color: '#2c3e50', 
                      borderColor: '#2c3e50',
                      '&:hover': {
                        borderColor: '#4a6572',
                        backgroundColor: 'rgba(44, 62, 80, 0.1)'
                      }
                    }}
                    onClick={() => handleOpenDialog(caseStudy)}
                  >
                    View Case Study Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Testimonials Content */}
      {activeTab === 1 && (
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.id}>
              <Card 
                elevation={4} 
                sx={{ 
                  height: '100%', 
                  background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                  position: 'relative'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
                    <FormatQuote sx={{ fontSize: 64, color: '#2c3e50' }} />
                  </Box>
                  
                  <Typography variant="body1" fontStyle="italic" paragraph>
                    "{testimonial.quote}"
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body1" fontWeight="bold" color="#2c3e50">
                    {testimonial.author}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.company}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Installation Methodology Content */}
      {activeTab === 2 && (
        <Box sx={{ textAlign: 'center' }}>
          <Card elevation={4} sx={{ p: 4, background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Download sx={{ fontSize: 48, color: '#2c3e50' }} />
              </Box>
              
              <Typography variant="h5" component="h2" fontWeight="bold" color="#2c3e50" gutterBottom>
                Installation Methodology Resources
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ maxWidth: '600px', margin: '0 auto' }}>
                Access our comprehensive installation guides, methodology statements, and technical documents for all our precast products.
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Box Culverts</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>U-Shape Drains</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Retaining Walls</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Compound Walls</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Precast Slabs</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>General Guidelines</Typography>
                    {/* <Button variant="contained" startIcon={<Download />}>
                      Download PDF
                    </Button> */}
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Case Study Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedCaseStudy && (
          <>
            <DialogTitle sx={{ bgcolor: '#2c3e50', color: 'white' }}>
              <Typography variant="h5" fontWeight="bold">
                {selectedCaseStudy.title}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="#2c3e50" fontWeight="bold">
                  Project Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  Client: {selectedCaseStudy.client}
                </Typography>
                <Typography variant="body1" paragraph>
                  Location: {selectedCaseStudy.location}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="#2c3e50" fontWeight="bold">
                  Challenges Faced
                </Typography>
                <ul>
                  {selectedCaseStudy.challenges.map((challenge, index) => (
                    <li key={index}>
                      <Typography variant="body1">{challenge}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="#2c3e50" fontWeight="bold">
                  Precast Solutions
                </Typography>
                <ul>
                  {selectedCaseStudy.solutions.map((solution, index) => (
                    <li key={index}>
                      <Typography variant="body1">{solution}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom color="#2c3e50" fontWeight="bold">
                  Key Features Delivered
                </Typography>
                <ul>
                  {selectedCaseStudy.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom color="#2c3e50" fontWeight="bold">
                  Project Impact
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">Time Savings</TableCell>
                        <TableCell>{selectedCaseStudy.impacts.time}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Cost Efficiency</TableCell>
                        <TableCell>{selectedCaseStudy.impacts.cost}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Manpower Reduction</TableCell>
                        <TableCell>{selectedCaseStudy.impacts.manpower}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Quality Improvement</TableCell>
                        <TableCell>{selectedCaseStudy.impacts.quality}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {/* <Button variant="contained" startIcon={<Download />}>
                Download Case Study
              </Button> */}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CaseStudiesPage;