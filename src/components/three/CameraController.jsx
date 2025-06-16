import { useFrame, useThree } from '@react-three/fiber';

const CameraController = () => {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth camera movement based on mouse position
    // const targetX = mousePosition.x * 0.5;
    // const targetY = mousePosition.y * 0.5;
    
    // Smoothly interpolate camera position
    // camera.position.x += (targetX - camera.position.x) * 0.05;
    // camera.position.y += (targetY - camera.position.y) * 0.05;
    
    // Keep the camera looking at the character's body center
    camera.lookAt(0, -1.5, 0); // Camera kijkt naar Y=-1.5 (ongeveer midden van karakter)
  });

  return null;
};

export default CameraController;
