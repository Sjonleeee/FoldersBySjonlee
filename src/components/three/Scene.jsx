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
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 5
    }}>
      <Canvas
        onMouseMove={handleMouseMove}
        camera={{ 
          position: [0, -1.0, 5],
          fov: 40,
          near: 0.1,
          far: 1000
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      >
        <color attach="background" args={['transparent']} />
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} />
          <CameraController mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
