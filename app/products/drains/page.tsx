"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";

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
        {/* ADJUSTED BOUNDS MARGIN FOR BETTER PRESENTATION */}
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

export default function DrainsPage() {
  const models = [
    {
      title:'360° View of U Shape Drain T6 - Rotate 360° to inspect from all angles', 
      path:GLB_2, 
      scale: 5.5, // REDUCED from 7.0 to 5.5 (balanced size) - KEEP AS IS
      boundsMargin: 1.0, // INCREASED MARGIN slightly for better framing - KEEP AS IS
      textPosition: 'right'
    },
    {
      title:'360° View of U Shape Drain T25 - Rotate 360° to inspect from all angles', 
      path:GLB_3, 
      scale: 6.0, // REDUCED from 7.5 to 6.0 (balanced size) - KEEP AS IS
      boundsMargin: 1.0, // INCREASED MARGIN slightly - KEEP AS IS
      textPosition: 'left'
    },
    {
      title:'360° View of FT Flume - Rotate 360° to inspect from all angles', 
      path:GLB_1, 
      scale: 1.2, // REDUCED from 1.5 to 1.2 (only this one changed)
      boundsMargin: 1.2, 
      textPosition: 'right'
    }
  ];

  return (
    <div className="bg-white">
      {/* Section 1: Full-width responsive video (maintain aspect ratio) */}
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

      {/* Section 2: Interactive 3D Models with Alternating Text */}
      <section style={{background: "url(/product/Drain/background/uShapedDrainBg.webp)" , padding: "5rem 0"}} className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50" >
        <div className="w-full py-5">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            {models.map((m, index) => (
              <article
                key={m.title}
                className={`w-full max-w-6xl mx-auto rounded-xl ring-1 ring-black/5 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 ${m.textPosition === 'left' ? 'md:flex-row-reverse' : ''} ${(index === 0 || index === models.length - 1) ? 'md:ml-auto md:mr-0' : ''}`}
              >
                {/* ADJUSTED CONTAINER SIZES FOR BETTER PROPORTIONS */}
                <div
                  className={`relative rounded-lg overflow-hidden bg-center bg-cover ${
                    index < 2 
                      ? 'w-full md:w-[70%] h-[300px] sm:h-[350px] md:h-[450px]' // SLIGHTLY REDUCED container
                      : 'w-full md:w-[68%] h-[300px] sm:h-[360px] md:h-[480px]' // Original size for third
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

      {/* Additional Videos (R2) in sequence - responsive */}
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

      {/* Section 3: Product Specifications */}
{/* Section 3: Product Specifications - FIXED FOR MOBILE */}
<section className="w-full bg-white py-8 md:py-12">
  <div className="w-full" style={{paddingTop: "3rem"}}>

    {/* Row: FT Flume */}
    <article style={{marginBottom: "5rem"}} className="w-full rounded-xl bg-white shadow-lg border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-full md:w-[40%] min-h-[200px] md:min-h-[240px] bg-white rounded-lg overflow-hidden">
        <Image src="/product/Drain/images/FtFlume.webp" alt="FT Flume" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain p-4" priority />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-xl md:text-2xl font-extrabold uppercase text-slate-900">FT <span className="text-blue-600">Flume</span></h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-slate-700 text-sm md:text-base">
          <li><span className="font-semibold text-slate-800">Sizes:</span> 600×800 mm to 2500×1800 mm</li>
          <li><span className="font-semibold text-slate-800">Loading:</span> Pedestrian; 2.4 T/m² surcharge</li>
          <li><span className="font-semibold text-slate-800">Location:</span> Edge of road</li>
          <li><span className="font-semibold text-slate-800">Connection:</span> Groove + sealant; flange bolt</li>
          <li><span className="font-semibold text-slate-800">Lifting:</span> Special arrangement</li>
        </ul>
      </div>
    </article>

    {/* Row: U Shape Drain T6 */}
    <article style={{marginBottom: "5rem"}} className="w-full rounded-xl bg-white shadow-lg border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-full md:w-[40%] min-h-[200px] md:min-h-[240px] bg-white rounded-lg overflow-hidden">
        <Image src="/product/Drain/images/UShapeDrainT6.webp" alt="U Shape Drain T6" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain p-4" />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-xl md:text-2xl font-extrabold uppercase text-slate-900">U Shape Drain <span className="text-blue-600">T6</span></h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-slate-700 text-sm md:text-base">
          <li><span className="font-semibold text-slate-800">Sizes:</span> 300×300 mm to 900×900 mm</li>
          <li><span className="font-semibold text-slate-800">Loading:</span> Pedestrian/LMV; 2.4 T/m² surcharge</li>
          <li><span className="font-semibold text-slate-800">Location:</span> Edge of road with kerb</li>
          <li><span className="font-semibold text-slate-800">Connection:</span> Groove with sealants</li>
          <li><span className="font-semibold text-slate-800">Lifting:</span> Inbuilt inserts</li>
        </ul>
      </div>
    </article>

    {/* Row: U Shape Drain T25 */}
    <article style={{marginBottom: "5rem"}} className="w-full rounded-xl bg-white shadow-lg border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-full md:w-[40%] min-h-[200px] md:min-h-[240px] bg-white rounded-lg overflow-hidden">
        <Image src="/product/Drain/images/UshapeDrainT25.webp" alt="U Shape Drain T25" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain p-4" />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-xl md:text-2xl font-extrabold uppercase text-slate-900">U Shape Drain <span className="text-blue-600">T25</span></h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-slate-700 text-sm md:text-base">
          <li><span className="font-semibold text-slate-800">Sizes:</span> 300×300 mm to 1200×1200 mm</li>
          <li><span className="font-semibold text-slate-800">Loading:</span> 5 T wheel; 2.4 T/m² surcharge</li>
          <li><span className="font-semibold text-slate-800">Location:</span> Part of the road</li>
          <li><span className="font-semibold text-slate-800">Connection:</span> Groove with sealants</li>
          <li><span className="font-semibold text-slate-800">Lifting:</span> Inbuilt inserts</li>
        </ul>
      </div>
    </article>
  </div>
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