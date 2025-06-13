import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MODEL_CONFIG } from '../../../config/modelConfig';
import { useModelLoader } from '../../../hooks/useModelLoader';
import { useMousePosition } from '../../../hooks/useMousePosition';

const Model = ({ modelPath }) => {
  const modelRef = useRef();
  const { model, animations } = useModelLoader(modelPath);
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (animations.actions[MODEL_CONFIG.defaultAnimation]) {
      animations.actions[MODEL_CONFIG.defaultAnimation].play();
    }
  }, [animations]);

  useFrame(() => {
    if (modelRef.current) {
      const head = modelRef.current.getObjectByName('Head');
      if (head) {
        head.rotation.x = mousePosition.y * MODEL_CONFIG.lookAtRange.y;
        head.rotation.y = mousePosition.x * MODEL_CONFIG.lookAtRange.x;
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={model}
      scale={MODEL_CONFIG.scale}
      position={MODEL_CONFIG.position}
      rotation={MODEL_CONFIG.rotation}
    />
  );
};

export default Model; 