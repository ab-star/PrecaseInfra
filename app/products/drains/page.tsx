"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from "@mui/material";

// GLB paths (served from public/)
const GLB_1 = "/product/Drain/glb/FTFlume.glb";
const GLB_2 = "/product/Drain/glb/UShapeDrainT6.glb";
const GLB_3 = "/product/Drain/glb/UShapeDrainT25.glb";

// Preload models
useGLTF.preload?.(GLB_1);
useGLTF.preload?.(GLB_2);
useGLTF.preload?.(GLB_3);

function DrainModel({ path, scale = 1.5 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path) as { scene: THREE.Object3D };
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

function ModelCanvas({ path, scale = 1.5, boundsMargin = 1.2 }: { path: string; scale?: number; boundsMargin?: number }) {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 45, far: 1000 }}
      style={{ width: "100%", height: "100%", background: "#fff" }}
      gl={{ alpha: false, antialias: true }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        (gl as unknown as { outputColorSpace?: THREE.ColorSpace }).outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <color attach="background" args={["#fff"]} />
      <ambientLight intensity={1.15} />
      <hemisphereLight color={0xffffff} groundColor={0x666666} intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} />
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1.6, 1, 1.2]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
      }>
        <Bounds fit observe margin={boundsMargin}>
          <DrainModel path={path} scale={scale} />
        </Bounds>
      </Suspense>
      <OrbitControls 
        makeDefault 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 0, 0]} 
      />
    </Canvas>
  );
}

// Product specification data
const productSpecs = [
  {
    id: 1,
    title: "FT Flume",
    subtitle: "High-Capacity Drainage Solution",
    image: "/product/Drain/images/FtFlume.webp",
    features: [
      { label: "Sizes", value: "600×800 mm to 2500×1800 mm" },
      { label: "Loading", value: "Pedestrian; 2.4 T/m² surcharge" },
      { label: "Location", value: "Edge of road" },
      { label: "Connection", value: "Groove + sealant; flange bolt" },
      { label: "Lifting", value: "Special arrangement" },
    ],
    accentColor: "#1976d2",
  },
  {
    id: 2,
    title: "U Shape Drain T6",
    subtitle: "Medium Duty Drainage System",
    image: "/product/Drain/images/UShapeDrainT6.webp",
    features: [
      { label: "Sizes", value: "300×300 mm to 900×900 mm" },
      { label: "Loading", value: "Pedestrian/LMV; 2.4 T/m² surcharge" },
      { label: "Location", value: "Edge of road with kerb" },
      { label: "Connection", value: "Groove with sealants" },
      { label: "Lifting", value: "Inbuilt inserts" },
    ],
    accentColor: "#2e7d32",
  },
  {
    id: 3,
    title: "U Shape Drain T25",
    subtitle: "Heavy Duty Commercial Drainage",
    image: "/product/Drain/images/UshapeDrainT25.jpeg",
    features: [
      { label: "Sizes", value: "300×300 mm to 1200×1200 mm" },
      { label: "Loading", value: "5 T wheel; 2.4 T/m² surcharge" },
      { label: "Location", value: "Part of the road" },
      { label: "Connection", value: "Groove with sealants" },
      { label: "Lifting", value: "Inbuilt inserts" },
    ],
    accentColor: "#ed6c02",
  },
];

function ProductSpecCard({ product }: { product: typeof productSpecs[0] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card 
      sx={{ 
        mb: 6,
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        overflow: "visible",
        '&:hover': {
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Grid container spacing={0}>
          {/* Large Prominent Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 300, md: 400 },
                backgroundColor: alpha(product.accentColor, 0.02),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "30rem",
                  height: "20rem",
                  maxWidth: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={900}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  priority={product.id === 1}
                />
              </Box>
            </Box>
          </Grid>

          {/* Clean Content Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Simple Header */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: product.accentColor,
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                >
                  {product.subtitle}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Clean Features List */}
              <Box sx={{ flex: 1 }}>
                {product.features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      py: 1.5,
                      borderBottom: index < product.features.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        minWidth: 120,
                      }}
                    >
                      {feature.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        textAlign: "right",
                        flex: 1,
                        ml: 2,
                      }}
                    >
                      {feature.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Simple Footer */}
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Chip
                  label="Premium Quality"
                  size="small"
                  sx={{
                    backgroundColor: alpha(product.accentColor, 0.1),
                    color: product.accentColor,
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function DrainsPage() {
  const models = [
    {
      title:'360° View of U Shape Drain T6 - Rotate 360° to inspect from all angles', 
      path:GLB_2, 
      scale: 5.5,
      boundsMargin: 1.0,
      textPosition: 'right'
    },
    {
      title:'360° View of U Shape Drain T25 - Rotate 360° to inspect from all angles', 
      path:GLB_3, 
      scale: 6.0,
      boundsMargin: 1.0,
      textPosition: 'left'
    },
    {
      title:'360° View of FT Flume - Rotate 360° to inspect from all angles', 
      path:GLB_1, 
      scale: 1.2,
      boundsMargin: 1.2, 
      textPosition: 'right'
    }
  ];

  return (
    <div className="bg-white">
      {/* Section 1: Full-width responsive video */}
      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)]">
        <video
          className="w-full h-auto block"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/DrainVideo/UShapeDrain1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Section 2: Interactive 3D Models */}
      <section style={{background: "url(/product/Drain/background/uShapedDrainBg.webp)" , padding: "5rem 0"}} className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50" >
        <div className="w-full py-5">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            {models.map((m, index) => (
              <article
                key={m.title}
                className={`w-full max-w-6xl mx-auto rounded-xl ring-1 ring-black/5 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 ${m.textPosition === 'left' ? 'md:flex-row-reverse' : ''} ${(index === 0 || index === models.length - 1) ? 'md:ml-auto md:mr-0' : ''}`}
              >
                <div
                  className={`relative rounded-lg overflow-hidden bg-center bg-cover ${
                    index < 2 
                      ? 'w-full md:w-[70%] h-[300px] sm:h-[350px] md:h-[450px]'
                      : 'w-full md:w-[68%] h-[300px] sm:h-[360px] md:h-[480px]'
                  }`}
                  style={{ backgroundImage: `url(/product/Drain/background/${(index % 3) + 1}.webp)` }}
                >
                  <ModelCanvas path={m.path} scale={m.scale} boundsMargin={m.boundsMargin} />
                </div>
                <div className="w-full md:w-[28%] flex flex-col items-center text-center px-2 !text-white" style={{ color: '#fff' }}>
                  <h3 className="text-xl md:text-2xl font-extrabold uppercase !text-white" style={{ color: '#fff' }}>{m.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Videos */}
      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)]">
        <video
          className="w-full h-auto block"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/DrainVideo/TrainDrain2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Section 3: Simple & Clean Product Specifications */}
      <section className="w-full bg-white py-8 md:py-12">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mb: 2,
              }}
            >
              Product Specifications
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Engineered for performance and durability
            </Typography>
          </Box>

          <Box>
            {productSpecs.map((product) => (
              <ProductSpecCard key={product.id} product={product} />
            ))}
          </Box>
        </Container>
      </section>

      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)]">
        <video
          className="w-full h-auto block"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/DrainVideo/MountainDrain3.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>
    </div>
  );
}