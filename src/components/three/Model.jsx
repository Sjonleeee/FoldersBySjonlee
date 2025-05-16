import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// This is a placeholder model as we don't have the actual 3D models from your design
// You would need to replace this with your actual 3D models
const Model = ({ mousePosition }) => {
  const { scene } = useGLTF('/src/assets/model/sjonlee.glb', (gltf) => {
    console.log('Model loaded successfully:', gltf);
  }, (error) => {
    console.error('Error loading model:', error);
  });
  
  const headRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (headRef.current) {
      // Create a plane at the model's position
      const plane = new THREE.Plane();
      const normal = new THREE.Vector3();
      const intersectionPoint = new THREE.Vector3();
      
      // Set up the plane
      normal.copy(camera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(normal, scene.position);
      
      // Create raycaster
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mousePosition, camera);
      
      // Get intersection point
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      
      // Make head look at the intersection point
      headRef.current.lookAt(intersectionPoint.x, intersectionPoint.y, 2);
    }
  });

  // Set up model and its parts
  useEffect(() => {
    if (scene) {
      console.log('Scene loaded, available objects:', scene.children);
      
      // Adjust scale
      scene.scale.set(3.5, 3.5, 3.5);
      
      // Position the model to match the folder position
      scene.position.set(0, -3, 0); // Move down to match folder position
      
      headRef.current = scene.getObjectByName('Head_3');
      console.log('Head found:', headRef.current);
    }
  }, [scene]);

  return <primitive object={scene} />;
};

export default Model