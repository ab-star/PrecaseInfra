"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import AlternatingFeatures from './AlternatingFeatures';

// 3D Model Component
const GLB_PATH = '/product/BoxCulvertProduct/glb/SqareBlock.glb';
useGLTF.preload(GLB_PATH);
function BoxCulvertModel() {
  const { scene } = useGLTF(GLB_PATH) as { scene: THREE.Object3D };
  return <primitive object={scene} scale={1.8} position={[0, 0, 0]} />;
}

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
  return (
    <div className="bg-white">
    {/* Hero Video Section (R2) */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
      src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center" />
      </section>

      {/* 3D Model Section */}
      <section className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-full h-4/5">
          <Canvas camera={{ position: [4, 2.5, 4], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate target={[0, 0, 0]} />
            <ErrorBoundary>
              <Suspense fallback={<mesh><boxGeometry args={[2, 1, 3]} /><meshStandardMaterial color="#9ca3af" /></mesh>}>
                <Center>
                  <BoxCulvertModel />
                </Center>
              </Suspense>
            </ErrorBoundary>
          </Canvas>
        </div>
      </section>

      {/* Strength Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <Image
          src="/concrete4.jpg"
          alt="Concrete background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 flex items-center h-full py-8 text-white [&_p]:text-white [&_h1]:text-white [&_h2]:text-white">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
            {/* Left: Text */}
      <div className="w-full md:w-[42%] text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide">LOOKS STRONG.</h2>
              <p className="mt-6 text-base md:text-lg text-white leading-relaxed">
                To build strong and sustainable precast bridges, we designed them to comply with Indian loading conditions for
                Highways and Railways. We made it with high-performance self-compacting concrete as per Japanese
                Industrial manufacturing standards.
              </p>
              <p className="mt-4 text-base md:text-lg text-white leading-relaxed">
                Our reinforced concrete culverts deliver exceptional strength and durability even in the most challenging environments,
                with precision engineering that ensures perfect alignment during installation.
              </p>
            </div>
            {/* Right: Image */}
            <div className="w-full md:w-[58%] flex justify-center md:justify-end">
              <div className="relative scale-110 md:scale-125">
                <Image
                  src="/product/BoxCulvertProduct/strong/strong.png"
                  alt="Box culvert frame"
                  width={1200}
                  height={1200}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Video Section (R2 sequence 2) */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxDrainTruckVideo2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Full-Viewport Image Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/Home/5p.png"
          alt="Box Culvert showcase"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>

      {/* Feature Details Section (alternating image/text) */}
      <AlternatingFeatures />

    </div>
  );
};

export default BoxCulvertPageClean;
