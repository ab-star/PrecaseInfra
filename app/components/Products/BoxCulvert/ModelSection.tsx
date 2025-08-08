"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const BoxCulvertModel = () => {
  const { scene } = useGLTF('/product/BoxCulvertProduct/glb/Sqare block.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  // Auto rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
};

const ModelSection = () => {
  return (
    <section className="w-full h-screen bg-gradient-to-b from-gray-100 to-white flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Precision
            <span className="block text-blue-600">Engineering</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our Box Culvert design combines structural integrity with optimal water flow dynamics. 
            Every angle and dimension is engineered for maximum performance in drainage infrastructure.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Reinforced concrete construction</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Optimized hydraulic design</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Weather-resistant coating</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-96 lg:h-full"
        >
          <Canvas
            camera={{ position: [5, 5, 5], fov: 60 }}
            style={{ height: '100%', background: 'transparent' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <BoxCulvertModel />
              <ContactShadows
                position={[0, -1, 0]}
                opacity={0.4}
                scale={10}
                blur={2}
                far={4}
              />
              <Environment preset="city" background={false} />
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={3}
              maxDistance={8}
            />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelSection;
