"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import AlternatingFeatures from './AlternatingFeatures';
import Head from 'next/head';

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

        {/* "Looks Strong" Section - Increased height for desktop */}
        <section className="relative w-full overflow-hidden flex items-center justify-center py-16 md:py-20 lg:py-28 min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]"> {/* Added min-height classes */}
          <Image
            src="/concrete4.jpg"
            alt="Concrete background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-12 lg:py-16 text-white"> {/* Increased padding */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14"> {/* Increased gap */}
              {/* Left: Text */}
              <div className="w-full lg:w-[50%] text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide mb-6 md:mb-8"> {/* Larger text */}
                  LOOKS STRONG.
                </h2>
                <div className="space-y-4 md:space-y-5 text-base sm:text-lg md:text-xl leading-relaxed"> {/* Larger text and spacing */}
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
              <div className="w-full lg:w-[45%] flex justify-center mt-10 lg:mt-0"> {/* Increased margin */}
                <div className="relative w-full max-w-md lg:max-w-lg"> {/* Larger max width */}
                  <Image
                    src="/product/BoxCulvertProduct/strong/strong.png"
                    alt="Box culvert frame"
                    width={700} // Larger image
                    height={700}
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