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

function ModelCanvas({ path, scale = 1.5 }: { path: string; scale?: number }) {
  return (
    <Canvas 
  camera={{ position: [5, 3, 5], fov: 45, far: 1000 }} 
  style={{ width: "100%", height: "100%" }}
  gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1.6, 1, 1.2]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
      }>
  <Bounds fit observe margin={1.5}>
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
    {title:'U Shape Drain T6', path:GLB_2, scale:1.5, textPosition: 'right'}, 
    {title:'U Shape Drain T25', path:GLB_3, scale:1.5, textPosition: 'left'}, 
    {title:'FT Flume', path:GLB_1, scale:1.5, textPosition: 'right'}
  ];

  return (
    <div className="bg-white">
    {/* Section 1: Fullscreen Video (R2) */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
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
                className={`w-full max-w-6xl mx-auto rounded-xl ring-1 ring-black/5  shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 ${m.textPosition === 'left' ? 'md:flex-row-reverse' : ''} ${(index === 0 || index === models.length - 1) ? 'md:ml-auto md:mr-0' : ''}`}
                      >
                        <div
                          className="relative w-full md:w-[68%] h-[360px] md:h-[480px] rounded-lg overflow-hidden bg-center bg-cover"
                          style={{ backgroundImage: `url(/product/Drain/background/${(index % 3) + 1}.webp)` }}
                        >
                          <ModelCanvas path={m.path} scale={m.scale} />
                        </div>
                        <div className="w-full md:w-[32%] flex flex-col items-center text-center px-2 text-white" style={{color: "white !important"}}>
                          <h3 className="text-xl md:text-2xl font-extrabold uppercas" style={{color: "white !important"}}>{m.title}</h3>
                        </div>
                      </article>
                    ))}
          </div>
        </div>
      </section>

      {/* Full-viewport image between 3D models and specs */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/Home/2P.webp"
          alt="Drain systems showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Additional Videos (R2) in sequence */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/DrainVideo/TrainDrain2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/DrainVideo/MountainDrain3.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Section 3: Product Specifications */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="w-full" style={{paddingTop: "3rem"}}>

          {/* Row: FT Flume */}
          <article style={{marginBottom: "5rem"}} className="w-full rounded-xl ring-1 ring-black/5 bg-slate-50/60 backdrop-blur-sm shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
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
          <article style={{marginBottom: "5rem"}} className="w-full rounded-xl ring-1 ring-black/5 bg-slate-50/60 backdrop-blur-sm shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
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
          <article style={{marginBottom: "5rem"}} className="w-full rounded-xl ring-1 ring-black/5 bg-slate-50/60 backdrop-blur-sm shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
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
    </div>
  );
}