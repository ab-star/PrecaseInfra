"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  LocationOn,
  AccountBalance,
} from "@mui/icons-material";

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  sector: string;
  description: string;
  highlights?: string[];
}

export default function ViewProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (project: Project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const privateProjects: Project[] = [
    {
      id: "private-1",
      title: "Industrial Complex for Aarti Industries",
      client: "Aarti Industries Ltd.",
      location: "Jhagadiya, Bharuch, Gujarat",
      sector: "Chemicals",
      description:
        "Provided comprehensive precast solutions, including Box Culverts, Pedestal and U Shape Drains, for a major chemical manufacturing facility. Our performance was recognized with a Certificate of Recognition for extraordinary support, highlighting our commitment to partnership and execution excellence.",
      highlights: [
        "Box Culverts for drainage infrastructure",
        "Pedestals for structural support",
        "U Shape Drains for water management",
        "Certificate of Recognition awarded",
      ],
    },
    {
      id: "private-2",
      title: "Industrial Complex for Kansai Nerolac",
      client: "Kansai Nerolac",
      location: "Dahej, Gujarat",
      sector: "Paints & Chemicals",
      description:
        "Delivered a robust precast superstructure, including custom-designed Retaining Wall. The project showcased our ability to execute complex industrial construction under tight timelines, ensuring the facility was operational to meet market demand.",
      highlights: [
        "Custom-designed Retaining Walls",
        "Precast superstructure",
        "Tight timeline execution",
        "Market-ready operations",
      ],
    },
    {
      id: "private-3",
      title: "Agrochemical Facility for UPL",
      client: "UPL",
      location: "Jhagadia, Bharuch, India",
      sector: "Agrochemicals",
      description:
        "Delivered a comprehensive precast solution for a leading global producer of crop protection products and sustainable agricultural solutions. The project utilized our U Shape Drains and Box Culverts to manage complex drainage requirements and support heavy industrial infrastructure.",
      highlights: [
        "Box Culverts for utilities",
        "U Shape Drains for surface drainage",
        "Heavy industrial support",
        "Complex drainage management",
      ],
    },
    {
      id: "private-4",
      title: "Infrastructure Partnership with L&T Infra",
      client: "L&T Infrastructure",
      location: "National Infrastructure",
      sector: "Infrastructure",
      description:
        "Partnered with a leading EPC contractor to supply high-quality precast components, including U Shape Drain, for a critical national infrastructure project. This engagement demonstrated our capacity for large-scale infrastructure projects, with a focus on durability and on-time delivery.",
      highlights: [
        "High-quality precast components",
        "Large-scale project capacity",
        "On-time delivery",
        "National infrastructure focus",
      ],
    },
    {
      id: "private-5",
      title: "Alembic Pharmaceutical Plant",
      client: "Alembic",
      location: "Halol, Gujarat",
      sector: "Pharmaceuticals",
      description:
        "Constructed a state-of-the-art pharmaceutical plant with a focus on high-quality finishes and adherence to international manufacturing standards. The project utilized our U Shape Drains and other precast elements to ensure a safe, compliant, and efficient facility.",
      highlights: [
        "State-of-the-art design",
        "International standards compliance",
        "High-quality finishes",
        "Safe and efficient operations",
      ],
    },
  ];

  const governmentProjects: Project[] = [
    {
      id: "govt-1",
      title: "Ankleshwar Bharuch Cargo Airport",
      client: "Airports Authority of India (AAI)",
      location: "Ankleshwar Bharuch, Gujarat",
      sector: "Airport Infrastructure",
      description:
        "Contributed to the modernization of Ankleshwar Bharuch Cargo Airport through the supply and erection of precast structural components, including Box Culverts for stormwater management. The project was executed without compromising airport operations, adhering to strict aviation safety norms.",
      highlights: [
        "Precast structural components",
        "Box Culverts for stormwater",
        "Zero operational disruption",
        "Aviation safety compliance",
      ],
    },
    {
      id: "govt-2",
      title: "Silvassa Smart City Development",
      client: "Silvassa Smart City Limited",
      location: "Silvassa, Dadra and Nagar Haveli",
      sector: "Smart City Mission",
      description:
        "Partnered to develop key public infrastructure, including public utility buildings and modern drainage systems using our Box Culverts, U Shape Drains and FT Flumes. The project was executed in line with Smart City Mission guidelines with a focus on sustainable construction practices.",
      highlights: [
        "Box Culverts for landscaping",
        "U Shape Drains for drainage",
        "FT Flumes for specialized drainage",
        "Sustainable practices",
      ],
    },
    {
      id: "govt-3",
      title: "Kiran Medical College & Hospital",
      client: "Government of Gujarat",
      location: "Gujarat",
      sector: "Healthcare",
      description:
        "Constructed a multi-specialty hospital and medical college facility utilizing precast components, U Shape Drains for campus drainage, ensuring rapid construction and structural integrity.",
      highlights: [
        "Multi-specialty healthcare facility",
        "Precast structural components",
        "Campus-wide drainage system",
        "Rapid construction methodology",
      ],
    },
    {
      id: "govt-4",
      title: "Adani Green Energy Project, Khavda",
      client: "Adani Green Energy",
      location: "Khavda, Gujarat",
      sector: "Renewable Energy",
      description:
        "Provided precast solutions, including Box Culverts for cable trenches for a large-scale solar power project. The project involved the delivery of durable and reliable precast structures capable of withstanding harsh environmental conditions.",
      highlights: [
        "Box Culverts for cable management",
        "Large-scale solar project",
        "Harsh environment durability",
        "Renewable energy infrastructure",
      ],
    },
    {
      id: "govt-5",
      title: "GIDC Industrial Estate, Jambusar",
      client: "Gujarat Industrial Development Corporation (GIDC)",
      location: "Jambusar, Gujarat",
      sector: "Industrial Infrastructure",
      description:
        "Developed industrial sheds and infrastructure for a new GIDC estate, using precast technology, including U Shape Drains and Box Culverts, to accelerate the availability of industrial facilities. The project met all GIDC specifications and quality benchmarks.",
      highlights: [
        "Industrial sheds and infrastructure",
        "U Shape Drains and Box Culverts",
        "Accelerated facility availability",
        "GIDC compliance standards",
      ],
    },
    {
      id: "govt-6",
      title: "Precast Bunker Systems for Indian Army, Rajouri",
      client: "Indian Army",
      location: "Rajouri, Jammu & Kashmir",
      sector: "Defence Infrastructure",
      description:
        "Supplied and installed advanced precast bunkers for the Indian Army in Rajouri, Kashmir, contributing directly to the nation's defence and security infrastructure. The project involved the delivery of high-strength, durable precast structures engineered to withstand extreme environmental conditions and operational demands. This achievement demonstrates 3G Infratech's capability to serve the critical defence sector with precision-engineered solutions that meet the highest military standards.",
      highlights: [
        "Advanced precast bunker systems",
        "Military-grade specifications",
        "National defence contribution",
        "Extreme environment durability",
      ],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 },
        backgroundImage:
          "linear-gradient(120deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95)), url('/concrete2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="Our Projects"
            variant="filled"
            sx={{
              fontSize: "1.1rem",
              padding: "1.5rem",
              mb: 2,
              background: "linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)",
              color: "white",
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              background: "linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio of Excellence
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "900px",
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "text.secondary",
              mb: 4,
            }}
          >
            3G Infratech has successfully executed a diverse portfolio of projects across private and government sectors, delivering high-quality precast solutions that have strengthened India's industrial and infrastructure landscape. Our work spans pharmaceuticals, chemicals, FMCG, renewable energy, airport infrastructure, smart cities, industrial development, and critically, the nation's defence sector. Each project reflects our commitment to quality, safety, and timely execution.
          </Typography>
        </Box>

        {/* Private Sector Projects */}
        <Box sx={{ mb: 10 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, rgba(24, 113, 182, 0.08) 0%, rgba(44, 90, 160, 0.06) 100%)",
              borderLeft: "6px solid #1871b6",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#1871b6",
                mb: 1,
              }}
            >
              Private Sector Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.05rem" }}>
              Precast Solutions for Industrial Leaders - Our private sector projects demonstrate our expertise in delivering robust, durable structures for some of India's most respected industrial companies. We partner with leading manufacturers to provide precast solutions that accelerate construction timelines while maintaining the highest standards of quality and compliance.
            </Typography>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {privateProjects.map((project) => (
              <Card
                key={project.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: 2,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(24, 113, 182, 0.15)",
                  },
                  }}
                >
                  <Box
                    sx={{
                      height: 4,
                      background: "linear-gradient(90deg, #1871b6 0%, #2c5aa0 100%)",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="#1871b6" gutterBottom>
                      {project.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <AccountBalance sx={{ color: "#1871b6", mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Client
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {project.client}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <LocationOn sx={{ color: "#1871b6", mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Location
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {project.location}
                          </Typography>
                        </Box>
                      </Stack>

                      <Chip
                        label={project.sector}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "#1871b6",
                          color: "#1871b6",
                          width: "fit-content",
                        }}
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                  </CardContent>

                </Card>
              ))}
            </Box>
        </Box>

        {/* Government Sector Projects */}
        <Box sx={{ mb: 10 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, rgba(24, 113, 182, 0.08) 0%, rgba(44, 90, 160, 0.06) 100%)",
              borderLeft: "6px solid #1871b6",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#1871b6",
                mb: 1,
              }}
            >
              Government Sector Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.05rem" }}>
              Building the Nation's Infrastructure - Our government sector projects reflect our commitment to supporting India's development goals. We have partnered with central and state authorities to deliver critical infrastructure using precast technology, ensuring rapid execution, superior quality, and compliance with all regulatory requirements.
            </Typography>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {governmentProjects.map((project) => (
              <Card
                key={project.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: 2,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(24, 113, 182, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 4,
                      background: "linear-gradient(90deg, #1871b6 0%, #2c5aa0 100%)",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="#1871b6" gutterBottom>
                      {project.title}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <AccountBalance sx={{ color: "#1871b6", mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Authority
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {project.client}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <LocationOn sx={{ color: "#1871b6", mt: 0.5, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Location
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {project.location}
                          </Typography>
                        </Box>
                      </Stack>

                      <Chip
                        label={project.sector}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "#1871b6",
                          color: "#1871b6",
                          width: "fit-content",
                        }}
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                  </CardContent>

                </Card>
              ))}
            </Box>
          </Box>

          {/* Our Commitment Section */}
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, rgba(24, 113, 182, 0.1) 0%, rgba(44, 90, 160, 0.08) 100%)",
            borderTop: "2px solid #1871b6",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#1871b6",
              mb: 2,
            }}
          >
            Our Commitment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.05rem" }}>
            At 3G Infratech, we are committed to delivering precast solutions that are not only structurally sound and cost-effective but also aligned with the highest standards of safety, quality, and sustainability. Our portfolio of projects across diverse sectors and geographies demonstrates our technical expertise, project management capabilities, and dedication to supporting India's economic growth through world-class infrastructure.
          </Typography>
        </Box>

        {/* Project Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 },
          }}
        >
          {selectedProject && (
            <>
              <DialogTitle
                sx={{
                background: "linear-gradient(135deg, #1871b6 0%, #2c5aa0 100%)",
                color: "white",
                fontWeight: 800,
              }}
            >
              {selectedProject.title}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    CLIENT
                  </Typography>
                  <Typography variant="body1">{selectedProject.client}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    LOCATION
                  </Typography>
                  <Typography variant="body1">{selectedProject.location}</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    SECTOR
                  </Typography>
                  <Chip
                    label={selectedProject.sector}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#1871b6",
                      color: "#1871b6",
                      mt: 0.5,
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    PROJECT DESCRIPTION
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedProject.description}
                  </Typography>
                </Box>

                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      KEY HIGHLIGHTS
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                      {selectedProject.highlights.map((highlight, idx) => (
                        <Typography key={idx} variant="body2">
                          • {highlight}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      </Container>
    </Box>
  );
}