import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import Model from "./three/Model";

// Camera movement component
const CameraMovement = ({ mousePosition }) => {
  const { camera } = useThree();
  const initialPosition = [0, 0, 7];
  const maxVerticalMovement = 1.5; // Maximum vertical movement range

  useFrame(() => {
    if (!mousePosition) return;

    // Calculate target position with subtle movement
    const targetX = initialPosition[0] + mousePosition.x * 1.5;
    // Limit vertical movement
    const targetY = initialPosition[1] + Math.max(Math.min(mousePosition.y * 1.5, maxVerticalMovement), -maxVerticalMovement);
    
    // Keep the Z position fixed at the initial distance
    const targetZ = initialPosition[2];
    
    // Smoothly interpolate camera position
    camera.position.x += (targetX - camera.position.x) * 0.5;
    camera.position.y += (targetY - camera.position.y) * 0.5;
    camera.position.z = targetZ; // Keep Z position fixed
    
    // Look at the model's body center
    camera.lookAt(0, -1.5, 0);
  });

  return null;
};

const ModelCanvas = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="canvas-wrapper">
      <Canvas 
        camera={{ 
          position: [0, 0, 7],
          fov: 45 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            enabled={false}
          >
            <Model mousePosition={mousePosition} />
          </PresentationControls>
        </Suspense>
        <CameraMovement mousePosition={mousePosition} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default ModelCanvas; 