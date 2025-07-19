import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const BoxCulvert = () => {
  const boxRef = useRef();
  const texture = useTexture('/concrete-texture.jpg');
  
  useFrame(() => {
    boxRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[3, 2, 4]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.7}
        metalness={0.3}
        bumpMap={texture}
        bumpScale={0.05}
      />
    </mesh>
  );
};

const BoxCulvertModel = () => {
  return (
    <div className="model-container">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <BoxCulvert />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default BoxCulvertModel;