"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import AlternatingFeaturesWalls from "@/app/components/Products/Walls/AlternatingFeaturesWalls";
import * as THREE from "three";

const HERO_VIDEO = "/product/walls/videos/bgVid.mp4";
const MID_VIDEO = "/product/walls/videos/wallVid.mp4";
const WALL_GLB = "/product/walls/3d/wall.glb";

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
      camera={{ position: [6, 4, 6], fov: 30 }}  // Reduced FOV to see more content
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
        <Bounds fit clip observe margin={1.5}>  // Increased margin
          <WallModel path={path} scale={scale} />
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate
        target={[0, 0, 0]}
        minPolarAngle={Math.PI * 0.3}  // Adjusted angles
        maxPolarAngle={Math.PI * 0.6}
      />
    </Canvas>
  );
}

export default function WallsPage() {
  return (
    <div className="bg-white">
      {/* Section 1: Hero Video */}
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold">Walls</h1>
        </div>
      </section>

      {/* Section 2: 3D Model - Increased height and top spacing */}
      <section className="w-full min-h-screen pt-32 pb-20 md:pt-40 md:pb-24 flex items-center justify-center bg-transparent">
        <div className="w-full max-w-5xl h-[80vh] mx-auto px-4">  // Increased height
          <WallCanvas path={WALL_GLB} scale={1.0} />
        </div>
      </section>

      {/* Section 3: Secondary Video - Increased height and spacing */}
      <section className="relative w-full min-h-screen pt-32 pb-20 md:pt-40 md:pb-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video 
            className="w-full h-full object-cover" 
            src={MID_VIDEO} 
            autoPlay 
            muted 
            loop 
            playsInline 
          />
        </div>
        <div className="relative z-10 w-full max-w-5xl h-[80vh] mx-auto px-4">
          {/* Optional content container */}
        </div>
      </section>

      {/* Section 4: Alternating Features */}
      <AlternatingFeaturesWalls />
    </div>
  );
}