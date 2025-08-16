// components/ConcreteBoxModel.jsx
import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';

const ConcreteBox = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const concreteTexture = useTexture('/concrete_texture.webp');
  
  // Configure concrete material
  const material = new THREE.MeshStandardMaterial({
    map: concreteTexture,
    roughness: 0.8,
    metalness: 0.2,
    bumpMap: concreteTexture,
    bumpScale: 0.05,
  });
  
  // Rotate box slowly
  useFrame(({ clock }) => {
    const mesh = boxRef.current;
    if (mesh) {
      mesh.rotation.y = clock.getElapsedTime() * 0.2;
      mesh.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={boxRef} material={material}>
        <boxGeometry args={[3, 2, 4]} />
      </mesh>
      
      {/* Box frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 2, 4)]} />
        <lineBasicMaterial color="#5d8aa8" linewidth={2} />
      </lineSegments>
    </group>
  );
};

const ConcreteBoxModel = () => {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      
      <ConcreteBox />
      
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </Canvas>
  );
};

export default ConcreteBoxModel;