import { useFrame, useThree } from '@react-three/fiber';

const CameraController = ({ mousePosition }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth camera movement based on mouse position
    const targetX = mousePosition.x * 0.5;
    const targetY = mousePosition.y * 0.5;
    
    // Smoothly interpolate camera position
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    
    // Keep the camera looking at the center
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default CameraController;
