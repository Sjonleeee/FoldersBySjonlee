import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ mousePosition }) => {
  const { scene, animations } = useGLTF('/src/assets/model/sjonleeSitting.glb');
  const { actions } = useAnimations(animations, scene);
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
      
      // Limit the intersection point
      const maxOffset = 2; // Maximum distance from center
      intersectionPoint.x = THREE.MathUtils.clamp(intersectionPoint.x, -maxOffset, maxOffset);
      intersectionPoint.y = THREE.MathUtils.clamp(intersectionPoint.y, -maxOffset, maxOffset);
      
      // Make head look at the intersection point
      headRef.current.lookAt(intersectionPoint.x, intersectionPoint.y, 2);
    }
  });

  useEffect(() => {
    if (scene) {
      console.log('Scene loaded, available objects:', scene.children);
      
      // Adjust scale
      scene.scale.set(2.5, 2.5, 2.5);
      
      // Position the model - moving it down significantly more
      scene.position.set(0, -3, 0);
      
      // Log the model's bounding box to help debug positioning
      const box = new THREE.Box3().setFromObject(scene);
      console.log('Model bounds:', {
        min: box.min,
        max: box.max,
        center: box.getCenter(new THREE.Vector3())
      });
      
      headRef.current = scene.getObjectByName('Head_3');
      console.log('Head found:', headRef.current);

      // Play animation if it exists
      if (actions && Object.keys(actions).length > 0) {
        const firstAnimation = Object.values(actions)[0];
        if (firstAnimation) {
          firstAnimation.reset().play();
          firstAnimation.setEffectiveTimeScale(1);
          firstAnimation.setLoop(THREE.LoopRepeat);
        }
      }
    }
  }, [scene, actions]);

  return <primitive object={scene} />;
};

export default Model;
