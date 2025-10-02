"use client"
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
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Construction,
  Engineering,
  DesignServices,
  SupportAgent,
  Factory,
  PrecisionManufacturing,
  TableChart,
  Email,
  Language,
  Share
} from '@mui/icons-material';

const Why3GInfratech = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Dark theme colors
  const darkColors = {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    primary: '#90caf9',
    secondary: '#ce93d8',
    textPrimary: '#ffffff',
    textSecondary: '#b0b0b0',
    accent: '#64ffda'
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: darkColors.background,
        minHeight: '100vh',
        // Improve text rendering on mobile
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        // Remove any default padding/margin
        margin: 0,
        padding: "5rem",
        width: '100%'
      }}
    >
      {/* Header Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6, 
        px: isMobile ? 2 : 4,
        pt: 4 
      }}>
        <Chip 
          icon={<Construction />} 
          label="Why 3G Infratech" 
          sx={{ 
            fontSize: isMobile ? '1rem' : '1.2rem', 
            padding: isMobile ? '1rem' : '1.5rem', 
            mb: 2,
            background: `linear-gradient(45deg, ${darkColors.primary}, ${darkColors.secondary})`,
            color: darkColors.background,
            fontWeight: 'bold',
            WebkitFontSmoothing: 'antialiased',
            textShadow: 'none'
          }} 
        />
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: darkColors.textPrimary,
            mb: 2,
            fontSmooth: 'always',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            letterSpacing: '0.5px',
            lineHeight: 1.2
          }}
        >
          Why Choose 3G Infratech
        </Typography>
        <Typography 
          variant={isMobile ? "body1" : "h6"} 
          sx={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            color: darkColors.textSecondary,
            fontSmooth: 'always',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            fontWeight: 400
          }}
        >
          Discover our state-of-the-art facilities, in-house mould making excellence, and comprehensive client support services that set us apart in the precast industry.
        </Typography>
      </Box>

      {/* Facilities & Assets Section */}
      <Box sx={{ mb: 8, width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          px: isMobile ? 2 : 4 
        }}>
          <Factory sx={{ 
            fontSize: isMobile ? 32 : 40, 
            color: darkColors.primary, 
            mr: 2 
          }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            fontWeight="bold" 
            sx={{
              color: darkColors.textPrimary,
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility'
            }}
          >
            Facilities & Assets
          </Typography>
        </Box>
        
        {/* Full width card with no side gaps */}
        <Box sx={{ width: '100%' }}>
          <Card elevation={4} sx={{ 
            mb: 4, 
            background: `linear-gradient(to bottom right, ${darkColors.surface}, #2a2a2a)`,
            border: `1px solid #333`,
            borderRadius: 0,
            mx: 0,
            width: '100%'
          }}>
            <CardContent sx={{ p: isMobile ? 3 : 4 }}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                At 3G Infratech, we have established a state-of-the-art production facility equipped with cutting-edge technology, modern infrastructure, and highly skilled professionals to ensure the highest standards in precast manufacturing. Our facility is designed for efficiency, precision, and scalability, enabling us to meet diverse project requirements with ease. From advanced mould-making workshops to high-capacity production zones, every aspect of our infrastructure is optimized to deliver superior quality precast elements with speed and accuracy. With a strong focus on self-sufficiency and innovation, our production area is a benchmark for excellence in the industry.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                The table below showcases the capabilities in terms of facilities and assets available, along with proposed expansions at 3G Infratech, ensuring continued growth and enhanced production efficiency.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Full width table with no side gaps */}
        <Box sx={{ width: '100%', px: 0 }}>
          <TableContainer 
            component={Paper} 
            elevation={4} 
            sx={{ 
              mb: 4,
              backgroundColor: darkColors.surface,
              border: `1px solid #333`,
              borderRadius: 0,
              overflowX: 'auto',
              width: '100%',
              '& .MuiTableCell-root': {
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility'
              }
            }}
          >
            <Table sx={{ minWidth: 650, width: '100%' }} aria-label="facilities table">
              <TableHead sx={{ bgcolor: '#2c3e50' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Sr No</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Items</TableCell>
                  <TableCell align="center" colSpan={2} sx={{ color: 'white', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Block A</TableCell>
                  <TableCell align="center" colSpan={2} sx={{ color: 'white', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Block B</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center" sx={{ color: 'white', bgcolor: '#3a5169', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Facilities 1</TableCell>
                  <TableCell align="center" sx={{ color: 'white', bgcolor: '#3a5169', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Facilities 2</TableCell>
                  <TableCell align="center" sx={{ color: 'white', bgcolor: '#3a5169', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Facilities 1</TableCell>
                  <TableCell align="center" sx={{ color: 'white', bgcolor: '#3a5169', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Proposed Facilities 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: 1, item: 'Land Area in sq. ft.', blockA1: '175663', blockA2: '600000', blockB1: '', blockB2: '' },
                  { id: 2, item: 'Office area in sq. ft.', blockA1: '2500', blockA2: '1000', blockB1: '', blockB2: '' },
                  { id: 3, item: 'Centralised Mould Making facilities in sq. ft.', blockA1: '2000', blockA2: '', blockB1: '', blockB2: '' },
                  { id: 4, item: 'Precast element storage area in sq. ft.', blockA1: '153513', blockA2: '567750', blockB1: '', blockB2: '' },
                  { id: 5, item: 'Centralised Testing facilities in sq. ft.', blockA1: '250', blockA2: '', blockB1: '', blockB2: '' },
                  { id: 6, item: 'Centralised R & D facilities in sq. ft.', blockA1: '250', blockA2: '', blockB1: '', blockB2: '' },
                  { id: 7, item: 'Factory shed area in sq. ft.', blockA1: '7000', blockA2: '7000', blockB1: '10000', blockB2: '25000' },
                  { id: 8, item: 'Nos of Gantries', blockA1: '3', blockA2: '3', blockB1: '4', blockB2: '6' },
                  { id: 9, item: 'Nos of moulds', blockA1: '110', blockA2: '90', blockB1: '100', blockB2: '100' },
                  { id: 10, item: 'Batching plant capacity in cmt/hr', blockA1: '15', blockA2: '15', blockB1: '15', blockB2: '15' },
                  { id: 11, item: 'Nos of silos & Conveyor', blockA1: '1', blockA2: '1', blockB1: '1', blockB2: '1' },
                  { id: 12, item: 'No of workers per shift', blockA1: '40', blockA2: '60', blockB1: '60', blockB2: '60' },
                ].map((row) => (
                  <TableRow 
                    key={row.id} 
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)' 
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)'
                      }
                    }}
                  >
                    <TableCell 
                      component="th" 
                      scope="row"
                      sx={{ 
                        color: darkColors.textPrimary,
                        fontWeight: 'medium',
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'medium',
                        color: darkColors.textPrimary,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.item}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        color: darkColors.textSecondary,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.blockA1}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        color: darkColors.textSecondary,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.blockA2}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        color: darkColors.textSecondary,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.blockB1}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        color: darkColors.textSecondary,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {row.blockB2}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Divider sx={{ my: 6, backgroundColor: '#333', width: '100%' }} />

      {/* In-House Mould Making Excellence Section */}
      <Box sx={{ mb: 8, width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          px: isMobile ? 2 : 4 
        }}>
          <PrecisionManufacturing sx={{ 
            fontSize: isMobile ? 32 : 40, 
            color: darkColors.primary, 
            mr: 2 
          }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            fontWeight="bold"
            sx={{
              color: darkColors.textPrimary,
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility'
            }}
          >
            In-House Mould Making Excellence
          </Typography>
        </Box>
        
        {/* Full width card with no side gaps */}
        <Box sx={{ width: '100%' }}>
          <Card elevation={4} sx={{ 
            mb: 4, 
            background: `linear-gradient(to bottom right, ${darkColors.surface}, #2a2a2a)`,
            border: `1px solid #333`,
            borderRadius: 0,
            mx: 0,
            width: '100%'
          }}>
            <CardContent sx={{ p: isMobile ? 3 : 4 }}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                At 3G Infratech, we take pride in being one of the very few precast manufacturers that are completely self-reliant when it comes to mould design, engineering, and fabrication. While most precast producers depend on third-party suppliers for mould production, we have established a state-of-the-art, in-house mould-making facility that sets us apart from the competition.
              </Typography>
              
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                gutterBottom 
                sx={{ 
                  color: darkColors.primary, 
                  mt: 3,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility'
                }}
              >
                Why 3G Infratech's Mould-Making Facility is a Game-Changer?
              </Typography>
              
              <List sx={{ width: '100%' }}>
                {[
                  { icon: <DesignServices sx={{ color: darkColors.primary }} />, text: "Design & Engineering Expertise: Our in-house team of expert designers and engineers ensures that every mould is precisely crafted to meet the most complex and customized precast requirements." },
                  { icon: <Factory sx={{ color: darkColors.primary }} />, text: "Dedicated Fabrication Shed: Our advanced fabrication unit is equipped with high-end technology, ensuring a seamless and controlled environment for mould production." },
                  { icon: <Engineering sx={{ color: darkColors.primary }} />, text: "Skilled Workforce: Our highly trained fabricators bring years of expertise in mould-making, ensuring superior craftsmanship and flawless execution." },
                  { icon: <PrecisionManufacturing sx={{ color: darkColors.primary }} />, text: "High-Tech Welding Machines: We utilize cutting-edge welding technology to enhance the strength, durability, and precision of every mould we produce." },
                  { icon: <Construction sx={{ color: darkColors.primary }} />, text: "Unmatched Flexibility & Customization: Since we have complete control over the entire process, we can design, fabricate, and modify moulds as per project needs, ensuring speed, efficiency, and cost-effectiveness." },
                  { icon: <Engineering sx={{ color: darkColors.primary }} />, text: "Premium-Grade Steel for Longevity: We use only the best quality steel, guaranteeing exceptional durability and n-number of repetitions, ensuring a high return on investment for our clients." },
                ].map((item, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      alignItems: 'flex-start', 
                      mb: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 1,
                      width: '100%',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, pt: 1 }}>{item.icon}</ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        sx: {
                          color: darkColors.textSecondary,
                          WebkitFontSmoothing: 'antialiased',
                          textRendering: 'optimizeLegibility',
                          fontWeight: 400,
                          lineHeight: 1.5
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  mt: 2,
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400
                }}
              >
                Unlike others in the industry who rely on external mould manufacturers, 3G Infratech is completely self-sufficient. This eliminates delays, ensures high precision, and gives us unparalleled control over the quality and customization of our moulds.
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontStyle: 'italic', 
                  fontWeight: 'medium',
                  color: darkColors.primary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility'
                }}
              >
                Our cutting-edge mould-making facility is not just an advantage—it's a revolution in precast manufacturing. With our expertise, no mould is too complex to fabricate!
              </Typography>
              
              {/* <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    background: `linear-gradient(45deg, ${darkColors.primary}, ${darkColors.secondary})`,
                    px: 4,
                    py: 1.5,
                    color: darkColors.background,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${darkColors.secondary}, ${darkColors.primary})`,
                    }
                  }}
                >
                  Explore Our Facility in Action
                </Button>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1,
                    color: darkColors.textSecondary,
                    WebkitFontSmoothing: 'antialiased',
                    textRendering: 'optimizeLegibility'
                  }}
                >
                  [Insert photos showcasing the facility, machinery, and fabrication process]
                </Typography>
              </Box> */}
              
              <Box sx={{ 
                textAlign: 'center', 
                mt: 4, 
                p: 3, 
                bgcolor: 'rgba(144, 202, 249, 0.1)', 
                borderRadius: 2,
                border: `1px solid ${darkColors.primary}`,
                width: '100%'
              }}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  gutterBottom 
                  sx={{ 
                    color: darkColors.primary,
                    WebkitFontSmoothing: 'antialiased',
                    textRendering: 'optimizeLegibility'
                  }}
                >
                  Partner with 3G Infratech
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    color: darkColors.textSecondary,
                    WebkitFontSmoothing: 'antialiased',
                    textRendering: 'optimizeLegibility'
                  }}
                >
                  Where innovation meets excellence in precast mould production!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ my: 6, backgroundColor: '#333', width: '100%' }} />

      {/* Client Support Section */}
      <Box sx={{ mb: 8, width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          px: isMobile ? 2 : 4 
        }}>
          <SupportAgent sx={{ 
            fontSize: isMobile ? 32 : 40, 
            color: darkColors.primary, 
            mr: 2 
          }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            fontWeight="bold"
            sx={{
              color: darkColors.textPrimary,
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility'
            }}
          >
            Client Support offered by 3G Infratech
          </Typography>
        </Box>
        
        {/* Full width card with no side gaps */}
        <Box sx={{ width: '100%' }}>
          <Card elevation={4} sx={{ 
            background: `linear-gradient(to bottom right, ${darkColors.surface}, #2a2a2a)`,
            border: `1px solid #333`,
            borderRadius: 0,
            mx: 0,
            width: '100%'
          }}>
            <CardContent sx={{ p: isMobile ? 3 : 4 }}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400
                }}
              >
                Value-Added Client Support by 3G Infratech
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: darkColors.textSecondary,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                At 3G Infratech, we go beyond just manufacturing precast elements—we provide end-to-end solutions to our clients, ensuring they receive optimized, cost-effective, and high-quality precast products. Our team of experts, engineers, and field professionals works closely with clients to offer tailored solutions that enhance project efficiency, durability, and performance.
              </Typography>
              
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                gutterBottom 
                sx={{ 
                  color: darkColors.primary, 
                  mt: 3,
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility'
                }}
              >
                Below are the key support services we extend to our clients to ensure they receive the best possible solutions at optimized rates:
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2, width: '100%', mx: 0 }}>
                {[
                  "Customized Mould-Making Support",
                  "Structural Design Support",
                  "Hydraulic Design Support",
                  "Verification of Design Support",
                  "Site Visit & Feasibility Checking Support",
                  "Support for Arranging Erection Agencies"
                ].map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        borderColor: darkColors.primary, 
                        bgcolor: 'rgba(144, 202, 249, 0.05)',
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'rgba(144, 202, 249, 0.1)',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 3 }}>
                        <Typography 
                          variant="body1" 
                          fontWeight="medium"
                          sx={{
                            color: darkColors.textPrimary,
                            WebkitFontSmoothing: 'antialiased',
                            textRendering: 'optimizeLegibility'
                          }}
                        >
                          {service}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>

    </Box>
  );
};

export default Why3GInfratech;