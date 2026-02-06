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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack
} from '@mui/material';
import {
  Construction,
  Engineering,
  LocationOn,
  AccountBalance,
  Visibility,
  VerifiedUser,
  TrendingUp,
  EmojiEvents
} from '@mui/icons-material';
import { ConstructionOutlined } from "@mui/icons-material";


const CaseStudiesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const SHOW_GALLERY = true;

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

  const privateCaseStudies = [
    {
      id: 1,
      title: "Chemical Complex for Aarti Industries Ltd., Dahej",
      client: "Aarti Industries Ltd.",
      location: "Dahej, Gujarat",
      overview: "3G Infratech partnered with Aarti Industries Ltd., a leading Indian manufacturer of specialty chemicals, to provide robust precast infrastructure for their expansive chemical complex in Dahej, Gujarat. The project required a high degree of precision and durability to withstand a corrosive industrial environment, ensuring long-term safety and operational continuity.",
      background: "Aarti Industries Limited (AIL) is a globally recognized chemical conglomerate with a strong presence in pharmaceuticals and specialty chemicals. Known for its commitment to sustainability and operational excellence, AIL sought a partner who could deliver infrastructure that met its stringent standards for quality and safety. Our performance on this project was formally recognized by AIL with a Certificate of Recognition for our extraordinary support during the 2024-25 fiscal year.",
      challenges: [
        "Effective stormwater management system capable of handling heavy monsoon rainfall",
        "Fast-track execution to align with expansion schedule",
        "Stringent safety protocols required in live chemical plant environment",
        "Robust precast solution to manage rainwater and prevent waterlogging"
      ],
      solutions: [
        "Heavy-duty FT Flumes for stormwater management",
        "U Shape Drain & Pedestal for underground utility corridors",
        "Comprehensive precast solutions for drainage network",
        "High-performance concrete (HPC) engineered products"
      ],
      methodology: "Meticulous, phased execution plan. All precast elements manufactured at state-of-the-art facility using M50 grade Self-Compacting Concrete (SCC) for superior finish. Off-site production minimized on-site activities, enhancing safety and reducing construction timeline.",
      highlights: [
        "Durable, chemical-resistant infrastructure",
        "Project completed on schedule",
        "Certificate of Recognition from Aarti Industries",
        "Ecovadis Gold sustainability rating"
      ]
    },
    {
      id: 2,
      title: "Industrial Complex for Kansai Nerolac, Dahej",
      client: "Kansai Nerolac",
      location: "Dahej, Gujarat",
      overview: "3G Infratech was entrusted with the construction of a large-scale industrial complex for Kansai Nerolac. The project involved developing a state-of-the-art manufacturing facility using precast technology to ensure speed, quality, and long-term durability.",
      background: "Kansai Nerolac is a leading paint and coatings manufacturer requiring robust industrial infrastructure.",
      challenges: [
        "Large-scale paint manufacturing facility requirements",
        "Complex drainage and effluent management systems",
        "Tight timelines for operational readiness",
        "High-performance structural requirements"
      ],
      solutions: [
        "Complete precast superstructure design and manufacturing",
        "Custom-designed Retaining Walls for stormwater management",
        "Comprehensive drainage systems",
        "Specialized industrial solutions"
      ],
      methodology: "Advanced precast design and manufacturing capabilities with focus on efficiency and speed.",
      highlights: [
        "Complete precast superstructure",
        "Efficient stormwater and effluent management",
        "Fast execution timeline",
        "Operational facility meeting market demands"
      ]
    },
    {
      id: 3,
      title: "Agrochemical Facility for UPL, Jhagadia",
      client: "UPL",
      location: "Jhagadia, Bharuch, India",
      overview: "3G Infratech delivered a comprehensive precast solution for UPL, a leading global producer of crop protection products and sustainable agricultural solutions. The project involved the construction of a durable and efficient manufacturing facility designed to support heavy industrial infrastructure and complex drainage requirements.",
      background: "UPL is a globally recognized agrochemical manufacturer with stringent infrastructure requirements.",
      challenges: [
        "Heavy industrial infrastructure demands",
        "Complex drainage requirements",
        "Durability in demanding industrial environment",
        "Efficient facility layout and execution"
      ],
      solutions: [
        "Heavy-duty Box Culverts for underground utility corridors",
        "Robust U Shape Drains for surface drainage",
        "High-performance precast concrete solutions",
        "Comprehensive infrastructure design"
      ],
      methodology: "Advanced design, manufacturing, and supply of tailored precast components for agrochemical sector.",
      highlights: [
        "Secure underground corridors for utilities",
        "Effective surface drainage management",
        "Long-term infrastructure resilience",
        "High-performance concrete solutions"
      ]
    }
  ];

  const governmentCaseStudies = [
    {
      id: 4,
      title: "Modernization of Bharuch-Ankleshwar Cargo Airport Infrastructure",
      client: "Airports Authority of India (AAI)",
      location: "Bharuch-Ankleshwar, Gujarat",
      overview: "3G Infratech played a pivotal role in the expansion and modernization of Bharuch-Ankleshwar Cargo Airport. The project involved constructing new terminal infrastructure using precast technology to enhance passenger capacity and operational efficiency.",
      background: "A critical aviation infrastructure project requiring minimal operational disruption.",
      challenges: [
        "Continuous airport operations during construction",
        "Large paved surfaces requiring extensive drainage",
        "Strict aviation safety norms compliance",
        "Minimal disruption to airport operations"
      ],
      solutions: [
        "Heavy-duty Box Culverts for underground utility corridors",
        "U Shape Drain for stormwater management",
        "Strategic precast deployment for rapid installation",
        "Aviation-compliant specifications"
      ],
      methodology: "Coordinated execution with airport authorities ensuring zero operational impact.",
      highlights: [
        "Robust underground utility corridors",
        "Extensive stormwater management",
        "Minimal airport disruption",
        "Aviation safety compliance"
      ]
    },
    {
      id: 5,
      title: "Smart City Development - Silvassa Smart City Mission",
      client: "Silvassa Smart City Limited",
      location: "Silvassa, Dadra and Nagar Haveli",
      overview: "3G Infratech partnered with Silvassa Smart City Limited to contribute to the ambitious urban transformation of Silvassa. Our role involved developing key public infrastructure using precast technology to ensure speed, sustainability, and high quality.",
      background: "Supporting India's Smart City Mission with cutting-edge precast infrastructure solutions.",
      challenges: [
        "Rapid infrastructure development requirements",
        "Sustainable construction practices",
        "Multiple infrastructure elements coordination",
        "Quality and durability standards"
      ],
      solutions: [
        "Box Culverts for landscaping and soil retention",
        "Modern drainage network with U Shape Drains",
        "FT Flumes for specialized drainage",
        "End-to-end infrastructure solutions"
      ],
      methodology: "Smart City Mission-aligned execution with focus on sustainable practices.",
      highlights: [
        "Accelerated public infrastructure development",
        "Long-term durability assurance",
        "Sustainable construction practices",
        "Modern drainage systems"
      ]
    },
    {
      id: 6,
      title: "Precast Bunkers for Indian Army, Rajouri, Kashmir",
      client: "Indian Army",
      location: "Rajouri, Jammu & Kashmir",
      overview: "3G Infratech was entrusted with a mission-critical project to supply and install advanced precast bunkers for the Indian Army in Rajouri, Kashmir. This project represents our capability to serve the nation's defence sector with precision-engineered precast solutions designed to withstand extreme environmental conditions and operational demands.",
      background: "Supporting India's national security with defense infrastructure. The bunker systems are integral to the Indian Army's operational infrastructure in Rajouri sector, one of the country's most strategically important regions.",
      challenges: [
        "Enhance safety and living conditions in high-altitude terrain",
        "Protective structures within minimal footprint",
        "Rapid deployment capability in remote border areas",
        "Minimal on-site construction activity",
        "Strict military timelines and security protocols"
      ],
      solutions: [
        "Modular precast bunker systems design and manufacturing",
        "Compact, high-strength bunker units",
        "M50 grade high-performance concrete construction",
        "Enhanced reinforced steel for maximum protection",
        "Rapid, safe, and discreet installation methodology"
      ],
      methodology: "Military-grade precision execution. All manufacturing conducted at state-of-the-art facility under strict quality control and security oversight. Modular design enables rapid, safe installation in sensitive border locations.",
      highlights: [
        "Advanced precast bunker systems",
        "Superior protective capacity",
        "Military-grade precision and security",
        "Operational infrastructure strengthening",
        "Contribution to national security"
      ]
    }
  ];


  const allCaseStudies = [...privateCaseStudies, ...governmentCaseStudies];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            transform: 'translate(100px, -100px)'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Chip
              icon={<Construction />}
              label="Case Studies"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '1rem',
                padding: '1.5rem',
                mb: 3,
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>
            Our Expertise in Action
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', textAlign: 'center', fontWeight: 300, opacity: 0.95 }}>
            3G Infratech's case studies showcase our expertise in delivering complex precast solutions across diverse sectors and geographies. Each project reflects our commitment to innovation, quality, and client success.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Tab Navigation */}
        <Box sx={{ mb: 6 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            variant="scrollable"
            scrollButtonsDisplay="auto"
            sx={{
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto',
                px: 3,
                py: 2,
                color: 'text.secondary'
              },
              '& .MuiTabs-indicator': {
                height: 3,
                background: 'linear-gradient(90deg, #1e3c72, #2a5298)'
              }
            }}
          >
            <Tab label="Private Sector" />
            <Tab label="Government Sector" />
          </Tabs>
          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* Private Sector Case Studies */}
        {activeTab === 0 && (
          <Grid container spacing={4}>
            {privateCaseStudies.map((caseStudy) => (
              <Grid item xs={12} md={6} key={caseStudy.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(30, 60, 114, 0.1)',
                      borderColor: '#2a5298'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                      <Engineering sx={{ color: '#2a5298', fontSize: 24 }} />
                      <Typography variant="caption" sx={{ color: '#2a5298', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Industrial
                      </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#1e3c72' }}>
                      {caseStudy.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Client:</strong> {caseStudy.client}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          {caseStudy.location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="body2" paragraph sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {caseStudy.overview.substring(0, 150)}...
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#2a5298', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                        Key Solutions
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {caseStudy.solutions.slice(0, 2).map((solution, idx) => (
                          <Chip key={idx} label={solution} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #163355, #1f3f6f)'
                        }
                      }}
                      onClick={() => handleOpenDialog(caseStudy)}
                    >
                      View Full Case Study
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Government Sector Case Studies */}
        {activeTab === 1 && (
          <Grid container spacing={4}>
            {governmentCaseStudies.map((caseStudy) => (
              <Grid item xs={12} md={6} key={caseStudy.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(30, 60, 114, 0.1)',
                      borderColor: '#2a5298'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                      <VerifiedUser sx={{ color: '#2a5298', fontSize: 24 }} />
                      <Typography variant="caption" sx={{ color: '#2a5298', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Government
                      </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#1e3c72' }}>
                      {caseStudy.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Authority:</strong> {caseStudy.client}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          {caseStudy.location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="body2" paragraph sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {caseStudy.overview.substring(0, 150)}...
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#2a5298', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                        Key Solutions
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {caseStudy.solutions.slice(0, 2).map((solution, idx) => (
                          <Chip key={idx} label={solution} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #163355, #1f3f6f)'
                        }
                      }}
                      onClick={() => handleOpenDialog(caseStudy)}
                    >
                      View Full Case Study
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Case Study Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedCaseStudy && (
          <>
            <DialogTitle sx={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)', color: 'white', fontWeight: 800, fontSize: '1.3rem' }}>
              {selectedCaseStudy.title}
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3, pt: 2 }}>
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalance sx={{ color: '#2a5298' }} />
                    <Typography variant="body2">
                      <strong>Client/Authority:</strong> {selectedCaseStudy.client}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: '#2a5298' }} />
                    <Typography variant="body2">
                      <strong>Location:</strong> {selectedCaseStudy.location}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                  Project Overview
                </Typography>
                <Typography variant="body2" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {selectedCaseStudy.overview}
                </Typography>
              </Box>

              {selectedCaseStudy.background && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                    Client/Authority Background
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    {selectedCaseStudy.background}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                  Project Challenges
                </Typography>
                <Stack spacing={1}>
                  {selectedCaseStudy.challenges.map((challenge, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1.5 }}>
                      <Typography sx={{ color: '#2a5298', fontWeight: 800 }}>•</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {challenge}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                  Our Solutions
                </Typography>
                <Stack spacing={1}>
                  {selectedCaseStudy.solutions.map((solution, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1.5 }}>
                      <Typography sx={{ color: '#2a5298', fontWeight: 800 }}>✓</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {solution}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                  Execution Methodology
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {selectedCaseStudy.methodology}
                </Typography>
              </Box>

              {selectedCaseStudy.highlights && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3c72', mb: 1 }}>
                    Key Highlights
                  </Typography>
                  <Stack spacing={1}>
                    {selectedCaseStudy.highlights.map((highlight, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                        <EmojiEvents sx={{ color: '#2a5298', flexShrink: 0, mt: 0.5 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {highlight}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CaseStudiesPage;