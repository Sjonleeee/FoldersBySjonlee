import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_CONFIG } from '../../../config/modelConfig';

const Model = ({ modelPath, scale, position }) => {
  const { scene } = useGLTF(modelPath);
  const headRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (scene) {
      // Adjust scale
      scene.scale.set(scale, scale, scale);
      
      // Position the model
      scene.position.set(...position);
      
      // Find the head object
      headRef.current = scene.getObjectByName('Head_3');
      console.log('Head found:', headRef.current);
    }
  }, [scene, scale, position]);

  useFrame((state) => {
    if (headRef.current) {
      // Get mouse position in normalized device coordinates
      const mouseX = (state.mouse.x * window.innerWidth) / window.innerWidth;
      const mouseY = (state.mouse.y * window.innerHeight) / window.innerHeight;

      // Create a plane at the model's position
      const plane = new THREE.Plane();
      const normal = new THREE.Vector3();
      const intersectionPoint = new THREE.Vector3();
      
      // Set up the plane
      normal.copy(camera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(normal, scene.position);
      
      // Create raycaster
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
      
      // Get intersection point
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      
      // Make head look at the intersection point
      headRef.current.lookAt(intersectionPoint.x, intersectionPoint.y, 2);
    }
  });

  return <primitive object={scene} />;
};

export default Model; 