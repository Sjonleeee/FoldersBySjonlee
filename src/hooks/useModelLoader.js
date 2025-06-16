import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei';

export const useModelLoader = (modelPath) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const animations = useAnimations(gltf.animations, gltf.scene);

  return {
    model: gltf.scene,
    animations,
  };
}; 