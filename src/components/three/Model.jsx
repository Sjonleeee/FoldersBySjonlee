import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ mousePosition }) => {
  const { scene, animations, cameras, lights } = useGLTF('/src/assets/model/SjonleeTop.glb');
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
      const maxOffset = 0.5; 
      intersectionPoint.x = THREE.MathUtils.clamp(intersectionPoint.x, -maxOffset, maxOffset);
      intersectionPoint.y = THREE.MathUtils.clamp(intersectionPoint.y, -maxOffset, maxOffset);
      
      // Bereken de gewenste rotatie met limieten
      const targetPosition = new THREE.Vector3(
        intersectionPoint.x,
        intersectionPoint.y,
        2
      );
      
      const direction = new THREE.Vector3().subVectors(targetPosition, headRef.current.position).normalize();
      const desiredRotation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction
      );
      
      // Limiteer de rotatiehoeken
      const euler = new THREE.Euler().setFromQuaternion(desiredRotation);
      euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 1, Math.PI / 1); 
      euler.y = THREE.MathUtils.clamp(euler.y, -Math.PI / 1, Math.PI / 1); 
      
      const clampedRotation = new THREE.Quaternion().setFromEuler(euler);

      // Pas de rotatie vloeiend toe met slerp
      const smoothingFactor = 0.3; // Verhoogd voor snellere/responsievere beweging
      headRef.current.quaternion.slerp(clampedRotation, smoothingFactor);
    }
  });

  useEffect(() => {
    if (scene) {
      console.log('Scene loaded, available objects:', scene.children);
      console.log('Cameras:', cameras);
      console.log('Lights:', lights);
      
      // Adjust scale - Aangepast om de Creative Developer sectie te vullen en hoofd zichtbaar te houden
      scene.scale.set(2.2, 2.2, 2.2); 
      
      // Position the model - Aangepast om in het midden van de Creative Developer sectie te staan en hoofd zichtbaar
      scene.position.set(0, -2.5, 0); // Lager geplaatst zodat het hoofd zichtbaar is en gecentreerd
      
      // Pas de belichting aan (blijft 10% van origineel zoals eerder afgesproken)
      scene.traverse((child) => {
        if (child.isLight) {
          child.intensity *= 0.1; 
        }
      });
      
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
  }, [scene, actions, cameras, lights]);

  return <primitive object={scene} />;
};

export default Model;
