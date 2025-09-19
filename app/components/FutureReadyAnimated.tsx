
"use client";
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Chip, Fade } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    title: "Engineered for Tomorrow",
    description: "Our precast solutions are designed for the next generation of infrastructure, combining innovation, speed, and sustainability.",
    icon: "🚀"
  },
  {
    title: "Quality You Can Trust",
    description: "Every product is factory-made and quality assured, meeting the highest standards for durability and performance.",
    icon: "✅"
  },
  {
    title: "Expert Team",
    description: "Our team brings decades of experience and a passion for excellence to every project.",
    icon: "👷"
  },
  {
    title: "Faster Construction",
    description: "Accelerate your project timelines with our rapid deployment and minimal site disruption.",
    icon: "⏱️"
  },
  {
    title: "Sustainable Solutions",
    description: "We use eco-friendly materials and processes to build a greener future.",
    icon: "🌱"
  },
  {
    title: "Smart Technology",
    description: "Digital tools and data-driven insights ensure precision and reliability in every build.",
    icon: "💡"
  }
];

const FutureReadyAnimated = () => (
  <Box
    component={motion.section}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
    viewport={{ once: true, amount: 0.2 }}
    sx={{
      width: "100%",
      minHeight: { xs: 480, md: 700 },
      py: { xs: 8, md: 14 },
      px: { xs: 2, md: 8 },
  bgcolor: "#f5f7fa",
  background: "url('/concrete4.jpg') center/cover, #f5f7fa"
    }}
  >
    <Box sx={{ maxWidth: 1200, mx: "auto", mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary"
        gutterBottom
        sx={{ textAlign: "center", mb: 2, letterSpacing: 1 }}
        component={motion.h2}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ahead of Time, Aligned with Tomorrow
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mb: 4, maxWidth: 700, mx: "auto", color: '#fff', textShadow: '0 2px 8px #0008' }}
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
At 3G Infratech, we believe infrastructure must not only serve the needs of today but also anticipate the demands of tomorrow. That’s why we invest in advanced precast engineering, modern manufacturing systems, and continuous innovation—ensuring that our solutions remain relevant, resilient, and future-ready.      </Typography>
    </Box>
    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {features.map((feature, i) => (
        <Grid item xs={12} sm={6} md={4} key={feature.title}>
          <Fade in timeout={700 + i * 120}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              elevation={5}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                py: 4,
                borderRadius: 4,
                bgcolor: "#f7f7f7",
                background: "url('/concrete_texture.jpg') center/cover, linear-gradient(135deg, #e3e3e3 0%, #f7f7f7 100%)",
                boxShadow: "0 8px 32px 0 #0002"
              }}
            >
              <Chip label={feature.icon} sx={{ fontSize: 32, mb: 2, bgcolor: "transparent", color: "#1976d2", boxShadow: 'none' }} />
              <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1, textAlign: "center" }}>
                {feature.title}
              </Typography>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FutureReadyAnimated;
