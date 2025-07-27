import React, { Suspense, useState, useEffect, forwardRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import Model from "../three/Model";

// Camera movement component
const CameraMovement = ({ inputPosition }) => {
  const { camera } = useThree();
  const initialPosition = [0, 0, 7];
  const maxVerticalMovement = 1.5;

  useFrame(() => {
    if (!inputPosition) return;

    // Calculate target position with reduced movement range
    const targetX = initialPosition[0] + inputPosition.x * 0.8;
    const targetY =
      initialPosition[1] +
      Math.max(
        Math.min(inputPosition.y * 0.8, maxVerticalMovement),
        -maxVerticalMovement
      );

    // Keep the Z position fixed at the initial distance
    const targetZ = initialPosition[2];

    // Smoother interpolation with reduced speed
    camera.position.x += (targetX - camera.position.x) * 0.3;
    camera.position.y += (targetY - camera.position.y) * 0.3;
    camera.position.z = targetZ;

    // Look at the model's body center
    camera.lookAt(0, -1.5, 0);
  });

  return null;
};

const ModelCanvas = forwardRef((props, ref) => {
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    let permissionRequested = false;
    let orientationHandler;

    if (isMobile && window.DeviceOrientationEvent) {
      orientationHandler = (event) => {
        // Map device orientation to x/y in range [-1, 1]
        const x = event.gamma ? event.gamma / 45 : 0; // gamma: left-right
        const y = event.beta ? event.beta / 90 : 0;   // beta: front-back
        setInputPosition({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        });
      };

      // iOS 13+ requires permission
      if (
        typeof DeviceOrientationEvent.requestPermission === "function" &&
        !permissionRequested
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", orientationHandler, true);
            }
          })
          .catch(console.error);
        permissionRequested = true;
      } else {
        window.addEventListener("deviceorientation", orientationHandler, true);
      }
      return () => {
        window.removeEventListener("deviceorientation", orientationHandler, true);
      };
    } else {
      const handleMouseMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setInputPosition({ x, y });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="canvas-wrapper" ref={ref}>
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
      >
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
            <Model mousePosition={inputPosition} />
          </PresentationControls>
        </Suspense>
        <CameraMovement inputPosition={inputPosition} />
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
});

ModelCanvas.displayName = 'ModelCanvas';

export default ModelCanvas;
