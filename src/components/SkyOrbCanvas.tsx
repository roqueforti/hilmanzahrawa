'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Interactive 3D Distorted Liquid Glass Orb
function DistortedLiquidOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Smooth cursor follow rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5 + time * 0.1, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5 + time * 0.15, 0.05);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.3;
      ringRef.current.rotation.y = time * 0.2;
      ringRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Floating Sparkles in 3D Space */}
      <Sparkles 
        count={60} 
        scale={6.5} 
        size={3} 
        speed={0.4} 
        color="#38bdf8" 
        opacity={0.7}
      />

      {/* Main Liquid Glass Sphere */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh 
          ref={meshRef} 
          scale={hovered ? 1.75 : 1.6}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.42}
            speed={2.2}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.45}
            ior={1.3}
          />
        </mesh>
      </Float>

      {/* Floating Prismatic Orbit Ring */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.2}>
        <mesh ref={ringRef} scale={2.4}>
          <torusGeometry args={[1, 0.04, 32, 100]} />
          <meshStandardMaterial 
            color="#0ea5e9"
            roughness={0.1}
            metalness={0.8}
            emissive="#0284c7"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      {/* Small floating satellite crystal */}
      <Float speed={4} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[2.2, 1.2, -1]} scale={0.25}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#7dd3fc"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function SkyOrbCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(720px, 95vw)',
      height: 'min(720px, 95vw)',
      pointerEvents: 'auto',
      zIndex: 2,
      opacity: 0.95
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#0284c7" />
        
        <DistortedLiquidOrb />
      </Canvas>
    </div>
  );
}
