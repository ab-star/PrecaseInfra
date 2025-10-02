"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import AlternatingFeatures from './AlternatingFeatures';
import Head from 'next/head';
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  Paper,
} from "@mui/material";

// Import Anton font
import { Anton } from 'next/font/google';
const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap' });

// 3D Model Component
const GLB_PATH = '/product/BoxCulvertProduct/glb/SqareBlock.glb';
useGLTF.preload(GLB_PATH);
function BoxCulvertModel({ scaleMultiplier = 1 }) {
  const { scene } = useGLTF(GLB_PATH) as { scene: THREE.Object3D };
  return <primitive object={scene} scale={1.5 * scaleMultiplier} position={[0, 0.5, 0]} />;
}

// Custom OrbitControls that completely disables zoom
const CustomOrbitControls = (props) => {
  const controlsRef = useRef();
  
  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      
      // Completely disable zoom
      controls.enableZoom = false;
      
      // Remove all zoom event listeners
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: null, // Disable middle mouse zoom
        RIGHT: null   // Disable right mouse pan
      };
      
      // Disable touch zoom
      controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: null // Disable two-finger zoom/pan
      };
      
      // Disable wheel zoom
      controls.listenToKeyEvents = false;
    }
  }, []);

  return <OrbitControls ref={controlsRef} {...props} />;
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.error('3D Section Error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
          Failed to load 3D model. Showing placeholder.
        </div>
      );
    }
    return this.props.children;
  }
}

const BoxCulvertPageClean = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasContainerRef = useRef(null);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Prevent wheel events on the canvas container
    const preventWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        return false;
      }
    };
    
    const container = canvasContainerRef.current;
    if (container) {
      container.addEventListener('wheel', preventWheel, { passive: false });
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (container) {
        container.removeEventListener('wheel', preventWheel);
      }
    };
  }, []);

  // Calculate scale multiplier based on device
  const getScaleMultiplier = () => {
    if (isMobile) return 0.5;  // Much smaller on mobile
    if (isTablet) return 0.65; // Medium on tablet
    return 0.7;                // Slightly reduced for desktop
  };

  // Calculate camera position based on device
  const getCameraPosition = () => {
    if (isMobile) return [2.5, 2, 2.5];   // Adjusted for better centering
    if (isTablet) return [3, 2.4, 3];     // Adjusted for better centering
    return [4, 3.2, 4];                   // Adjusted for better centering
  };

  // Calculate field of view based on device
  const getFov = () => {
    if (isMobile) return 50;  // Standard FOV on mobile
    if (isTablet) return 45;  // Standard FOV on tablet
    return 35;                // Narrower FOV on desktop to prevent distortion
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="bg-white overflow-x-hidden">
        {/* Hero Video Section (unchanged) */}
        <section className="w-full bg-black">
          <div className="w-full h-auto">
            <video
              className="w-full h-auto"
              src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </section>

        {/* 3D Model Section - Increased height for desktop */}
        <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-50 flex flex-col items-center justify-center">
          {/* Concrete-themed heading for 3D model */}
          <div className="w-full max-w-5xl mx-auto px-4 mb-6 md:mb-8 text-center">
            <h2 className={`${anton.className} text-3xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-2 md:mb-4`}
                style={{
                  marginTop: '1rem',
                  color: '#2c2c2c',
                  textShadow: `
                    1px 1px 0px #fff, 
                    -1px -1px 0px #666,
                    2px 2px 4px rgba(0,0,0,0.2),
                    0px 0px 8px rgba(0,0,0,0.1)
                  `,
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}
            >
              360° View of Box Culvert
            </h2>
          </div>

          <div 
            ref={canvasContainerRef}
            className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
            style={{ 
              height: isMobile ? '50vh' : isTablet ? '55vh' : '65vh', // Increased desktop height
              maxHeight: isDesktop ? '750px' : '700px', // Taller max height for desktop
              minHeight: isMobile ? '350px' : '400px', // Increased min height
              touchAction: 'none'
            }}
          >
            <Canvas
              camera={{ 
                position: getCameraPosition(), 
                fov: getFov(),
                zoom: 1,
                near: 0.1,
                far: 100
              }}
              onCreated={({ gl, camera, size }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                (gl as unknown as { outputColorSpace?: THREE.ColorSpace }).outputColorSpace = THREE.SRGBColorSpace;
                gl.toneMappingExposure = 1.1;
                
                // Update camera aspect ratio
                if (camera instanceof THREE.PerspectiveCamera) {
                  camera.aspect = size.width / size.height;
                  camera.updateProjectionMatrix();
                }
              }}
              // Handle resize events properly
              onResize={({ camera, size }) => {
                if (camera instanceof THREE.PerspectiveCamera) {
                  camera.aspect = size.width / size.height;
                  camera.updateProjectionMatrix();
                }
              }}
              style={{
                display: 'block',
                width: '100%',
                height: '100%'
              }}
            >
              <ambientLight intensity={1.1} />
              <hemisphereLight color={0xffffff} groundColor={0x666666} intensity={0.5} />
              <directionalLight position={[8, 8, 4]} intensity={1.5} />
              <directionalLight position={[-5, 3, -3]} intensity={0.7} />
              <directionalLight position={[0, 5, 0]} intensity={0.8} />
              <CustomOrbitControls 
                enablePan={false}
                enableRotate={true}
                target={[0, 0.5, 0]} // Target the center of the model
                minPolarAngle={Math.PI / 6} // Limit vertical rotation
                maxPolarAngle={Math.PI / 2.1}
                minDistance={3}
                maxDistance={5}
                enableDamping={true}
                dampingFactor={0.1}
              />
              <ErrorBoundary>
                <Suspense fallback={
                  <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1.5, 0.8, 2.5]} />
                    <meshStandardMaterial color="#d1d5db" />
                  </mesh>
                }>
                  <BoxCulvertModel scaleMultiplier={getScaleMultiplier()} />
                </Suspense>
              </ErrorBoundary>
            </Canvas>
          </div>
        </section>

<section className="relative w-full overflow-hidden flex items-center justify-center py-12 md:py-16 lg:py-20 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh]">
  <Image
    src="/concrete4.jpg"
    alt="Concrete background"
    fill
    sizes="100vw"
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black/40" /> {/* Lighter overlay */}
  
  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: 4 }}> {/* Reduced container maxWidth and padding */}
    <Paper
      elevation={0}
      sx={{
        backgroundColor: alpha('#ffffff', 0.95),
        backdropFilter: 'blur(8px)',
        borderRadius: 3,
        p: { xs: 3, md: 4, lg: 5 }, // Reduced padding
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        border: `1px solid ${alpha('#ffffff', 0.3)}`,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center"> {/* Reduced spacing */}
        {/* Left: Text Content */}
        <Grid item xs={12} lg={7}>
          <Box sx={{ 
            textAlign: { xs: 'center', lg: 'left' },
            color: 'text.primary',
          }}>
            <Typography
              variant="h3" // Changed from h2 to h3 for smaller size
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { 
                  xs: '2rem', 
                  sm: '2.5rem', 
                  md: '2.75rem', 
                  lg: '3rem' 
                }, // Reduced font sizes
                lineHeight: 1.2,
                mb: 3, // Reduced margin
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', // Updated to green shades
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                textAlign: 'center', // Center align the heading
              }}
            >
              Strength with Precision
              <br />
              Built to Last
            </Typography>

            <Box sx={{ 
              '& > div': { mb: 2 } // Reduced margin between cards
            }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2.5, // Increased padding
                  backgroundColor: alpha('#f8f9fa', 0.9),
                  borderLeft: `3px solid #1976d2`,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Typography
                  variant="h6" // Changed back to h6 for larger font
                  component="p"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: { xs: '1rem', md: '1.35rem' }, // Increased font size
                    lineHeight: 1.5,
                  }}
                >
                  Manufactured with high-performance self-compacting concrete (SCC) and FE500 / 500D reinforcement steel, our culverts deliver exceptional density, finishing, and long service life.
                </Typography>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  p: 2.5, // Increased padding
                  backgroundColor: alpha('#f8f9fa', 0.9),
                  borderLeft: `3px solid #2e7d32`,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Typography
                  variant="h6" // Changed back to h6 for larger font
                  component="p"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: { xs: '1rem', md: '1.35rem' }, // Increased font size
                    lineHeight: 1.5,
                  }}
                >
                  The self-explanatory handling system enables safe lifting, transportation, and placement, while precision-engineered leak-proof jointery guarantees watertight connections and long-term reliability.
                </Typography>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  p: 2.5, // Increased padding
                  backgroundColor: alpha('#f8f9fa', 0.9),
                  borderLeft: `3px solid #ed6c02`,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Typography
                  variant="h6" // Changed back to h6 for larger font
                  component="p"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: { xs: '1rem', md: '1.35rem' }, // Increased font size
                    lineHeight: 1.5,
                  }}
                >
                  Our reinforced concrete culverts deliver exceptional strength and durability even in the most challenging environments, with precision engineering that ensures perfect alignment during installation.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Grid>

        {/* Right: Image */}
        <Grid item xs={12} lg={5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: { xs: 300, md: 350, lg: 400 }, // Reduced max width
                mx: 'auto',
              }}
            >
              <Image
                src="/product/BoxCulvertProduct/strong/strong.png"
                alt="Box culvert frame"
                width={450} // Reduced image size
                height={450}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                priority
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Container>
</section>

        {/* Extra Video Section */}
        <section className="w-full bg-black">
          <div className="w-full h-auto">
            <video
              className="w-full h-auto"
              src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxDrainTruckVideo2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </section>

        {/* Feature Details Section */}
        <AlternatingFeatures />
      </div>
    </>
  );
};

export default BoxCulvertPageClean;