"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import AlternatingFeaturesWalls from "@/app/components/Products/Walls/AlternatingFeaturesWalls";
import * as THREE from "three";

const HERO_VIDEO = "https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/WallVideo/RetainingWall1.mp4";
const MID_VIDEO = "https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/WallVideo/HighwayVideo2.mp4";
const EXTRA_VIDEO = "https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/WallVideo/TruckVideo3.mp4";
const WALL_GLB = "/product/walls/3d/wall.glb";

// Import Anton font
import { Anton } from 'next/font/google';
const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap' });

function WallModel({ path, scale = 1.2 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path) as { scene: THREE.Object3D };
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

function WallCanvas({ path, scale = 1.0 }: { path: string; scale?: number }) {
  return (
    <Canvas 
      camera={{ position: [6, 4, 6], fov: 30 }}
      style={{ 
        width: "100%", 
        height: "100%",
        display: "block"
      }} 
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 12, 6]} intensity={1.2} />
      <directionalLight position={[-10, -6, -6]} intensity={0.4} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.5}>  {/* Increased margin */}
          <WallModel path={path} scale={scale} />
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate
        target={[0, 0, 0]}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.6}
      />
    </Canvas>
  );
}

export default function WallsPage() {
  return (
    <div className="bg-white">
      {/* Section 1: Hero Video (full width, maintain aspect, no crop) */}
      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)]">
        <video className="w-full h-auto block" src={HERO_VIDEO} autoPlay muted loop playsInline />
      </section>

      {/* Section 2: 3D Model - Increased height and top spacing */}
      <section className="w-full min-h-[70vh] md:min-h-screen pt-16 md:pt-32 pb-16 md:pb-24 flex flex-col items-center justify-center bg-transparent">
        
        {/* Concrete-themed heading - positioned just above the 3D model */}
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
            360° View of Precast Retaining Wall
          </h2>
        </div>

        {/* 3D Model Container */}
        <div className="w-full max-w-5xl h-[60vh] md:h-[70vh] mx-auto px-4">
          <WallCanvas path={WALL_GLB} scale={1.0} />
        </div>
      </section>

      {/* Section 3: Secondary Video - full width, maintain aspect */}
      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)]">
        <video className="w-full h-auto block" src={EXTRA_VIDEO} autoPlay muted loop playsInline />
      </section>

      {/* Section 4: Alternating Features */}
      <AlternatingFeaturesWalls />

      <section className="w-[100dvw] bg-black ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)] pt-0 md:pt-0 pb-0 md:pb-0">
        <video className="w-full h-auto block" src={MID_VIDEO} autoPlay muted loop playsInline />
      </section>
    </div>
  );
}