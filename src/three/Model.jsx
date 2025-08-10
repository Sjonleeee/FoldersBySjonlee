import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ mousePosition }) => {
  const { scene, animations, cameras, lights } = useGLTF(
    "/assets/model/3LOCKEDIN.glb"
  );
  const { actions } = useAnimations(animations, scene);
  const headRefs = useRef([]);
  const { camera } = useThree();

  useFrame(() => {
    headRefs.current.forEach((head) => {
      if (head) {
        const plane = new THREE.Plane();
        const normal = new THREE.Vector3();
        const intersectionPoint = new THREE.Vector3();

        normal.copy(camera.position).normalize();
        plane.setFromNormalAndCoplanarPoint(normal, scene.position);

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mousePosition, camera);

        raycaster.ray.intersectPlane(plane, intersectionPoint);

        const maxOffset = 1.5; // Increased from 1.2 for more tilt
        intersectionPoint.x = THREE.MathUtils.clamp(
          intersectionPoint.x,
          -maxOffset,
          maxOffset
        );
        intersectionPoint.y = THREE.MathUtils.clamp(
          intersectionPoint.y,
          -maxOffset,
          maxOffset
        );

        const targetPosition = new THREE.Vector3(
          intersectionPoint.x,
          intersectionPoint.y,
          2
        );

        const direction = new THREE.Vector3()
          .subVectors(targetPosition, head.position)
          .normalize();
        const desiredRotation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          direction
        );

        const euler = new THREE.Euler().setFromQuaternion(desiredRotation);
        euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 1.1, Math.PI / 1.1); // Increased range
        euler.y = THREE.MathUtils.clamp(euler.y, -Math.PI / 1.1, Math.PI / 1.1); // Increased range

        const clampedRotation = new THREE.Quaternion().setFromEuler(euler);

        const smoothingFactor = 0.8; // Increased for smoother transitions
        head.quaternion.slerp(clampedRotation, smoothingFactor);
      }
    });
  });

  useEffect(() => {
    if (scene) {
      // Adjust scale - Aangepast om de Creative Developer sectie te vullen en hoofd zichtbaar te houden
      scene.scale.set(2.2, 2.2,2.2);

      // Position the model - Aangepast om in het midden van de Creative Developer sectie te staan en hoofd zichtbaar
      scene.position.set(0, -2.5, 0); // Lager geplaatst zodat het hoofd zichtbaar is en gecentreerd

      scene.traverse((child) => {
        if (child.isLight) {
          child.intensity = 1.0;
        }
      });

      // Find all heads named Head_*
      headRefs.current = [];
      scene.traverse((child) => {
        if (child.name && child.name.startsWith("Head_")) {
          headRefs.current.push(child);
        }
      });

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

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} />
      <primitive object={scene} />
    </>
  );
};

export default Model;
