import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '../Model';
import { MODEL_CONFIG } from '../../../config/modelConfig';

const ModelCanvas = ({ modelPath, isDevelopment = false }) => {
  if (isDevelopment) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Model modelPath={modelPath} />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ModelCanvas; 