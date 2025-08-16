// components/MountainScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const Mountains = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
  const grp = groupRef.current;
  if (grp) grp.rotation.y += 0.001;
  });

  // Create simple mountain geometry
  const geometry = React.useMemo(()=>{
    const g = new THREE.BufferGeometry();
    const vertices:number[] = [];
    for (let i = 0; i < 1000; i++) {
      vertices.push(
        Math.random() * 10 - 5,
        Math.random() * 2,
        Math.random() * 10 - 5
      );
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return g;
  },[]);

  return (
    <group ref={groupRef}>
      <points>
  <primitive object={geometry} />
        <pointsMaterial 
          size={0.1} 
          color="#5d8aa8" 
          transparent 
          opacity={0.8} 
        />
      </points>
    </group>
  );
};

const MountainScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Mountains />
      <Environment preset="dawn" />
    </Canvas>
  );
};

export default MountainScene;