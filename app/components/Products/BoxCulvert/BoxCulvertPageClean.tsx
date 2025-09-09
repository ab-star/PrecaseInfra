"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import AlternatingFeatures from './AlternatingFeatures';
import Head from 'next/head';

// 3D Model Component
const GLB_PATH = '/product/BoxCulvertProduct/glb/SqareBlock.glb';
useGLTF.preload(GLB_PATH);
function BoxCulvertModel({ scaleMultiplier = 1 }) {
  const { scene } = useGLTF(GLB_PATH) as { scene: THREE.Object3D };
  return <primitive object={scene} scale={1.5 * scaleMultiplier} position={[0, 0, 0]} />;
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
  const canvasContainerRef = useRef(null);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
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
    return 0.8;                // Moderately sized on desktop
  };

  // Calculate camera position based on device
  const getCameraPosition = () => {
    if (isMobile) return [2.5, 1.8, 2.5];   // Closer on mobile
    if (isTablet) return [3, 2.2, 3];       // Medium distance on tablet
    return [3.5, 2.5, 3.5];                 // Default on desktop
  };

  // Calculate field of view based on device
  const getFov = () => {
    if (isMobile) return 50;  // Standard FOV on mobile
    if (isTablet) return 45;  // Standard FOV on tablet
    return 40;                // Slightly narrower on desktop
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="bg-white overflow-x-hidden">
        {/* Hero Video Section */}
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

        {/* 3D Model Section - Properly scaled and centered */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 flex flex-col items-center justify-center">
          {/* <div className="w-full max-w-4xl mx-auto px-4 text-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Interactive 3D Model
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Rotate to explore our precision-engineered box culvert design from all angles
            </p>
          </div> */}
          
          <div 
            ref={canvasContainerRef}
            className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200"
            style={{ 
              height: isMobile ? '40vh' : isTablet ? '45vh' : '50vh',
              maxHeight: '500px',
              touchAction: 'none'
            }}
          >
            <Canvas
              camera={{ 
                position: getCameraPosition(), 
                fov: getFov(),
                zoom: 1
              }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                (gl as unknown as { outputColorSpace?: THREE.ColorSpace }).outputColorSpace = THREE.SRGBColorSpace;
                gl.toneMappingExposure = 1.1;
              }}
            >
              <ambientLight intensity={1.1} />
              <hemisphereLight color={0xffffff} groundColor={0x666666} intensity={0.5} />
              <directionalLight position={[8, 8, 4]} intensity={1.5} />
              <directionalLight position={[-5, 3, -3]} intensity={0.7} />
              <CustomOrbitControls 
                enablePan={false}
                enableRotate={true}
                target={[0, 0, 0]}
                minDistance={2.5}
                maxDistance={2.5}
                enableDamping={true}
                dampingFactor={0.1}
              />
              <ErrorBoundary>
                <Suspense fallback={
                  <mesh>
                    <boxGeometry args={[1.5, 0.8, 2.5]} />
                    <meshStandardMaterial color="#d1d5db" />
                  </mesh>
                }>
                  <Center>
                    <BoxCulvertModel scaleMultiplier={getScaleMultiplier()} />
                  </Center>
                </Suspense>
              </ErrorBoundary>
            </Canvas>
          </div>
          
          {/* Instructions for users */}
          {/* <div className="mt-6 text-center text-gray-600 text-sm max-w-2xl mx-auto px-4">
            <p className="mb-2">Drag to rotate the model</p>
            <p className="text-xs text-gray-500">
              Engineered for durability and optimal performance in infrastructure projects
            </p>
          </div> */}
        </section>

        {/* Strength Section */}
        <section className="relative w-full overflow-hidden flex items-center justify-center py-12 md:py-16 lg:py-24">
          <Image
            src="/concrete4.jpg"
            alt="Concrete background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
              {/* Left: Text */}
              <div className="w-full lg:w-[50%] text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide mb-4 md:mb-6">
                  LOOKS STRONG.
                </h2>
                <div className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    To build strong and sustainable precast bridges, we designed them to comply with Indian loading conditions for
                    Highways and Railways. We made it with high-performance self-compacting concrete as per Japanese
                    Industrial manufacturing standards.
                  </p>
                  <p>
                    Our reinforced concrete culverts deliver exceptional strength and durability even in the most challenging environments,
                    with precision engineering that ensures perfect alignment during installation.
                  </p>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="w-full lg:w-[45%] flex justify-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-md lg:max-w-none">
                  <Image
                    src="/product/BoxCulvertProduct/strong/strong.png"
                    alt="Box culvert frame"
                    width={600}
                    height={600}
                    className="object-contain w-full h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
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