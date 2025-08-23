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
      {/* Section 1: Hero Video */}
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          {/* <h1 className="text-white text-4xl md:text-6xl font-extrabold">Walls</h1> */}
        </div>
      </section>

      {/* Section 2: 3D Model - Increased height and top spacing */}
      <section className="w-full min-h-screen pt-32 pb-20 md:pt-40 md:pb-24 flex items-center justify-center bg-transparent">
  <div className="w-full max-w-5xl h-[80vh] mx-auto px-4">  {/* Increased height */}
          <WallCanvas path={WALL_GLB} scale={1.0} />
        </div>
      </section>

      {/* Section 3: Secondary Video - full-bleed, full width, no cropping */}
     
      <section className="relative w-screen overflow-hidden bg-black ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <video className="block w-screen h-auto object-contain" src={EXTRA_VIDEO} autoPlay muted loop playsInline />
      </section>
     


      {/* Section 3b: Extra video if present - full-bleed, full width, no cropping */}

      {/* Section 4: Alternating Features */}
      <AlternatingFeaturesWalls />

            <section className="relative w-screen overflow-hidden bg-black ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] pt-32 pb-20 md:pt-40 md:pb-24">
        <video 
          className="block w-screen h-auto object-contain"
          src={MID_VIDEO} 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      </section>
    </div>
  );
}