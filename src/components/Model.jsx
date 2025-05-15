import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// This is a placeholder model as we don't have the actual 3D models from your design
// You would need to replace this with your actual 3D models
const Model = () => {
  const group = useRef()
  
  // Create a file folder model to represent the blue folder in your design
  const Folder = () => {
    return (
      <group position={[0, 0, 0]}>
        {/* Base folder */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1.2]} />
          <meshStandardMaterial color="#61dafb" />
        </mesh>
        
        {/* Folder top/flap */}
        <mesh position={[0, 0.1, -0.5]} rotation={[Math.PI * 0.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 0.6]} />
          <meshStandardMaterial color="#61dafb" />
        </mesh>
        
        {/* Folder text */}
        <group position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry args={[1, 0.5]} />
            <meshBasicMaterial transparent opacity={0.7} color="#ffffff" />
          </mesh>
        </group>
      </group>
    )
  }
  
  // Create a placeholder for the character models
  const Character = ({ position, rotation }) => {
    return (
      <group position={position} rotation={rotation}>
        {/* Head with pointy ears like in the design */}
        <mesh castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        
        {/* Pointy ears */}
        <mesh position={[0.2, 0.3, 0]} castShadow>
          <coneGeometry args={[0.1, 0.3, 32]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        <mesh position={[-0.2, 0.3, 0]} castShadow>
          <coneGeometry args={[0.1, 0.3, 32]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        
        {/* Sunglasses */}
        <mesh position={[0, 0.05, 0.25]} castShadow>
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[0.3, -0.5, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        <mesh position={[-0.3, -0.5, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[0.15, -1, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[-0.15, -1, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Feet */}
        <mesh position={[0.15, -1.3, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, -1.3, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    )
  }
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) * 0.1, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) * 0.1, 0.05)
  })
  
  return (
    <group ref={group}>
      <Character position={[-0.7, -0.5, 0.5]} rotation={[0, Math.PI / 6, 0]} />
      <Character position={[0.7, -0.5, 0.5]} rotation={[0, -Math.PI / 6, 0]} />
      <Folder />
    </group>
  )
}

export default Model