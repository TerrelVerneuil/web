// components/HeartParticles.jsx
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function HeartParticles({ count = 50 }) {
  const meshRef = useRef()
  
  // Create heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    shape.moveTo(x, y + 0.5)
    shape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y)
    shape.bezierCurveTo(x - 0.5, y - 0.35, x, y - 0.6, x, y - 0.8)
    shape.bezierCurveTo(x, y - 0.6, x + 0.5, y - 0.35, x + 0.5, y)
    shape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5)
    return shape
  }, [])

  // Initialize particle data
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,  // x spread
        Math.random() * 15 + 10,      // y start height
        (Math.random() - 0.5) * 20    // z spread
      ],
      speed: Math.random() * 0.02 + 0.01,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      wobbleSpeed: Math.random() * 2,
      wobbleAmount: Math.random() * 0.5,
      scale: Math.random() * 0.2 + 0.1
    }))
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    
    meshRef.current.children.forEach((heart, i) => {
      const particle = particles[i]
      
      // Fall down
      heart.position.y -= particle.speed
      
      // Wobble side to side
      heart.position.x += Math.sin(state.clock.elapsedTime * particle.wobbleSpeed) * 0.01
      
      // Rotate
      heart.rotation.z += particle.rotationSpeed
      
      // Reset when below ground
      if (heart.position.y < -2) {
        heart.position.y = Math.random() * 5 + 12
        heart.position.x = (Math.random() - 0.5) * 20
        heart.position.z = (Math.random() - 0.5) * 20
      }
    })
  })

  return (
    <group ref={meshRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          scale={particle.scale}
          rotation={[Math.PI, 0, 0]} // Flip heart right-side up
        >
          <shapeGeometry args={[heartShape]} />
          <meshStandardMaterial 
            color="#ff69b4" 
            side={THREE.DoubleSide}
            emissive="#ff1493"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default HeartParticles