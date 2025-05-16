import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Model from './Model';
import CameraController from './CameraController';

const Scene = () => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2());

  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    });
  };

  return (
    <Canvas
      camera={{ position: [0, 1, 2.5], fov: 45 }}
      onMouseMove={handleMouseMove}
    >
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={1} />
      <directionalLight position={[0, 20, 20]} intensity={10} />
      <Suspense fallback={null}>
        <Model mousePosition={mousePosition} />
        <CameraController mousePosition={mousePosition} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
