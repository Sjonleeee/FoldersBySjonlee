import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '../Model';
import { MODEL_CONFIG } from '../../../config/modelConfig';

const ModelCanvas = ({ configKey, isDevelopment = false }) => {
  if (isDevelopment) {
    return null;
  }

  const modelConfig = MODEL_CONFIG[configKey];

  if (!modelConfig || !modelConfig.path) {
    console.error(`Model configuration for key "${configKey}" not found or missing path.`);
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model
          modelPath={modelConfig.path}
          scale={modelConfig.scale}
          position={modelConfig.position}
        />
      </Suspense>
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ModelCanvas; 