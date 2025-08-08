"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";

// GLB paths (served from public/)
const GLB_1 = "/product/Drain/glb/FTFlume.glb";
const GLB_2 = "/product/Drain/glb/UShapeDrainT6.glb";
const GLB_3 = "/product/Drain/glb/UShapeDrainT25.glb";

// Preload models
// @ts-expect-error useGLTF exposes a static preload helper at runtime
useGLTF.preload?.(GLB_1);
// @ts-expect-error useGLTF exposes a static preload helper at runtime
useGLTF.preload?.(GLB_2);
// @ts-expect-error useGLTF exposes a static preload helper at runtime
useGLTF.preload?.(GLB_3);

function DrainModel({ path, scale = 1.2 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path) as { scene: THREE.Object3D };
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

function ModelCanvas({ path, scale = 1.1 }: { path: string; scale?: number }) {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 45 }} style={{ width: "100%", height: "100%", background: "#f8fafc" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate target={[0, 0, 0]} />
      <Suspense fallback={<mesh><boxGeometry args={[1.6, 1, 1.2]} /><meshStandardMaterial color="#9ca3af" /></mesh>}>
        <DrainModel path={path} scale={scale} />
      </Suspense>
    </Canvas>
  );
}

export default function DrainsPage() {
  return (
    <div className="bg-white">
      {/* Section 1: Fullscreen Video */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/product/Drain/video/video02.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Drains</h1>
            <p className="text-lg md:text-xl opacity-90">High-precision Precast Drainage Systems</p>
          </div>
        </div>
      </section>

      {/* Section 2: Three 3D Models aligned horizontally with titles (reduced model size) */}
      <section className="w-full bg-gray-50 flex flex-col py-4 md:py-6">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 pb-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="relative w-full max-w-[560px] rounded-xl overflow-hidden bg-white/0 flex flex-col">
              <div className="w-full aspect-[5/4] md:aspect-[5/4] lg:aspect-[6/5]">
                <ModelCanvas path={GLB_2} scale={1.12} />
              </div>
              <div className="pt-0 md:pt-1 text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                  U Shape Drain <span className="text-blue-600">T6</span>
                </h3>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative w-full max-w-[560px] rounded-xl overflow-hidden bg-white/0 flex flex-col">
              <div className="w-full aspect-[5/4] md:aspect-[5/4] lg:aspect-[6/5]">
                <ModelCanvas path={GLB_3} scale={1.12} />
              </div>
              <div className="pt-0 md:pt-1 text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                  U Shape Drain <span className="text-blue-600">T25</span>
                </h3>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative w-full max-w-[560px] rounded-xl overflow-hidden bg-white/0 flex flex-col">
              <div className="w-full aspect-[5/4] md:aspect-[5/4] lg:aspect-[6/5]">
                <ModelCanvas path={GLB_1} scale={1.08} />
              </div>
              <div className="pt-0 md:pt-1 text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                  FT <span className="text-blue-600">Flume</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Product Showcase (Fullscreen, transparent background, full width) */}
      <section className="w-full h-screen bg-transparent text-slate-900 flex flex-col">
        <div className="px-6 pt-0 pb-0 text-center">

        </div>
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20 xl:px-28 pb-8">
          {/* FT Flume */}
          <div className="group relative h-full rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl ring-1 ring-black/5 flex flex-col">
            <div className="relative h-[46%] bg-gradient-to-b from-slate-50 to-slate-100">
              <Image src="/product/Drain/images/FtFlume.png" alt="FT Flume" fill sizes="(min-width: 768px) 33vw, 90vw" className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500" priority />
            </div>
            <div className="flex-1 p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl font-extrabold uppercase">
                FT <span className="text-blue-600">Flume</span>
              </h3>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Sizes</div>
                  <div className="text-gray-600">600 mmx800 mm to<br/>2500 mmx1800 mm</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Loading</div>
                  <div className="text-gray-600">Pedestrian load,<br/>Live load surcharge of 2.4T/m²</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Location</div>
                  <div className="text-gray-600">Edge of the road</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Connection</div>
                  <div className="text-gray-600">Groove filled with sealants,<br/>and flange bolt connection</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Lifting</div>
                  <div className="text-gray-600">Special arrangement</div>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded shadow">DOWNLOAD PDF</button>
            </div>
          </div>

          {/* U-Shape Drain T6 (R8) */}
          <div className="group relative h-full rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl ring-1 ring-black/5 flex flex-col">
            <div className="relative h-[46%] bg-gradient-to-b from-slate-50 to-slate-100">
              <Image src="/product/Drain/images/UShapeDrainT6.png" alt="U-Shape Drain T6" fill sizes="(min-width: 768px) 33vw, 90vw" className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div className="flex-1 p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl font-extrabold uppercase">
                U Shape Drain <span className="text-blue-600">T6</span>
              </h3>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Sizes</div>
                  <div className="text-gray-600">300 mmx300 mm to<br/>900 mmx900 mm</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Loading</div>
                  <div className="text-gray-600">Pedestrian load or LMV,<br/>Live load surcharge of 2.4T/m²</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Location</div>
                  <div className="text-gray-600">Edge of the road with kerb stone</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Connection</div>
                  <div className="text-gray-600">Groove filled<br/>with sealants</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Lifting</div>
                  <div className="text-gray-600">Inbuilt inserts</div>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded shadow">DOWNLOAD PDF</button>
            </div>
          </div>

          {/* U-Shape Drain T25 */}
          <div className="group relative h-full rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl ring-1 ring-black/5 flex flex-col">
            <div className="relative h-[46%] bg-gradient-to-b from-slate-50 to-slate-100">
              <Image src="/product/Drain/images/UshapeDrainT25.png" alt="T-25 Drain" fill sizes="(min-width: 768px) 33vw, 90vw" className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div className="flex-1 p-8 flex flex-col items-center text-center">
              <h3 className="text-2xl font-extrabold uppercase">
                U Shape Drain <span className="text-blue-600">T25</span>
              </h3>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Sizes</div>
                  <div className="text-gray-600">300 mmx300 mm to<br/>1200 mmx1200 mm</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Loading</div>
                  <div className="text-gray-600">5T wheel load,<br/>Live load surcharge of 2.4T/m²</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Location</div>
                  <div className="text-gray-600">Part of the road</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Connection</div>
                  <div className="text-gray-600">Groove filled<br/>with sealants</div>
                </div>
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-gray-800">Lifting</div>
                  <div className="text-gray-600">Inbuilt inserts</div>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded shadow">DOWNLOAD PDF</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
