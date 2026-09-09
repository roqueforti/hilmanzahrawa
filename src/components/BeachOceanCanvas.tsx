// @ts-nocheck
'use client';
/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Ocean Waves Plane
function OceanMesh({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom geometry with plenty of vertices for fluid wave displacement
  const { geometry, originalPositions } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(32, 22, 90, 60);
    geom.rotateX(-Math.PI / 2.3);
    const pos = geom.attributes.position.array as Float32Array;
    const orig = new Float32Array(pos.length);
    orig.set(pos);
    return { geometry: geom, originalPositions: orig };
  }, []);

  // Coastal color gradients (Cerulean -> Tropical Teal -> Light Yellow Foam)
  const colors = useMemo(() => {
    const cerulean = new THREE.Color('#0081a7');
    const teal = new THREE.Color('#00afb9');
    const foam = new THREE.Color('#fdfcdc');
    const coral = new THREE.Color('#f07167');
    return { cerulean, teal, foam, coral };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 1.35;
    const pos = meshRef.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    const mx = mousePos.current.x * 6;
    const my = mousePos.current.y * 4;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i];
      const oz = originalPositions[i + 2];

      // Layered ocean wave equations
      const wave1 = Math.sin(ox * 0.45 + t * 1.2) * 0.55;
      const wave2 = Math.cos(oz * 0.5 + t * 0.9) * 0.45;
      const wave3 = Math.sin((ox + oz) * 0.35 + t * 1.5) * 0.25;
      
      // Interactive mouse ripple
      const distToMouse = Math.hypot(ox - mx, oz - my);
      const ripple = distToMouse < 4 ? Math.sin(distToMouse * 3.5 - t * 4) * Math.max(0, 1 - distToMouse / 4) * 0.4 : 0;

      arr[i + 1] = wave1 + wave2 + wave3 + ripple;
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -3.8, 0]}>
      <meshStandardMaterial
        color="#00afb9"
        roughness={0.15}
        metalness={0.1}
        wireframe={false}
        flatShading={true}
      />
    </mesh>
  );
}

// Floating Low-Poly Surfboard Bobbing on Waves
function FloatingSurfboard({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 1.35;
    
    // Position on the wave surface
    const x = -3.2 + Math.sin(t * 0.4) * 0.5;
    const z = 2.0 + Math.cos(t * 0.3) * 0.4;
    
    // Calculate water height at this point
    const wave1 = Math.sin(x * 0.45 + t * 1.2) * 0.55;
    const wave2 = Math.cos(z * 0.5 + t * 0.9) * 0.45;
    const wave3 = Math.sin((x + z) * 0.35 + t * 1.5) * 0.25;
    const height = wave1 + wave2 + wave3 - 3.5;

    groupRef.current.position.set(x, height, z);
    
    // Pitch & roll rotation following wave slope
    const pitch = Math.sin(x * 0.45 + t * 1.2) * 0.22;
    const roll = Math.cos(z * 0.5 + t * 0.9) * 0.28;
    const yaw = Math.sin(t * 0.3) * 0.2;
    
    groupRef.current.rotation.set(-Math.PI / 2.3 + pitch, yaw, roll);
  });

  return (
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      {/* Surfboard Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 2.8, 16]} />
        <meshStandardMaterial color="#fdfcdc" roughness={0.2} metalness={0.05} />
      </mesh>
      {/* Center Racing Stripe (Vibrant Coral) */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.08, 0.02, 2.7]} />
        <meshStandardMaterial color="#f07167" roughness={0.1} />
      </mesh>
      {/* Nose & Tail Accent (Cerulean) */}
      <mesh position={[0, 0.02, 1.1]}>
        <boxGeometry args={[0.3, 0.02, 0.5]} />
        <meshStandardMaterial color="#0081a7" roughness={0.2} />
      </mesh>
      {/* Surfboard Fin */}
      <mesh position={[0, -0.22, -1.1]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.04, 0.25, 0.28]} />
        <meshStandardMaterial color="#f07167" />
      </mesh>
    </group>
  );
}

// Floating Coastal Buoy
function FloatingBuoy() {
  const buoyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!buoyRef.current) return;
    const t = clock.getElapsedTime() * 1.35;
    const x = 3.6 + Math.cos(t * 0.35) * 0.4;
    const z = 1.2 + Math.sin(t * 0.4) * 0.3;

    const wave1 = Math.sin(x * 0.45 + t * 1.2) * 0.55;
    const wave2 = Math.cos(z * 0.5 + t * 0.9) * 0.45;
    const height = wave1 + wave2 - 3.6;

    buoyRef.current.position.set(x, height, z);
    buoyRef.current.rotation.z = Math.sin(t * 2) * 0.15;
    buoyRef.current.rotation.x = Math.cos(t * 1.8) * 0.18;
  });

  return (
    <group ref={buoyRef} scale={[0.65, 0.65, 0.65]}>
      {/* Lower Buoy Body (Cerulean) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#0081a7" roughness={0.2} />
      </mesh>
      {/* Upper Buoy Body (Vibrant Coral) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f07167" roughness={0.2} />
      </mesh>
      {/* Central Ring Band (Light Yellow) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.07, 8, 24]} />
        <meshStandardMaterial color="#fdfcdc" roughness={0.3} />
      </mesh>
      {/* Top Beacon Mast */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Beacon Light (Soft Apricot Glow) */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#fed9b7" emissive="#fed9b7" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Sunbeam & Sparkling Water Spray Particles
function SparklingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const { positions, originalY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 5 - 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      orig[i] = pos[i * 3 + 1];
    }
    return { positions: pos, originalY: orig };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime() * 0.8;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      arr[idx] = originalY[i] + Math.sin(t + i * 0.5) * 0.4;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#fdfcdc"
        transparent={true}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene Root with Lighting and Pointer Tracking
function OceanScene() {
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <ambientLight intensity={1.2} color="#fdfcdc" />
      {/* Sunlight Golden Ray */}
      <directionalLight position={[8, 12, 6]} intensity={2.2} color="#fed9b7" />
      {/* Coastal Sky Fill */}
      <directionalLight position={[-8, 6, -4]} intensity={1.0} color="#00afb9" />
      
      <OceanMesh mousePos={mousePos} />
      <FloatingSurfboard mousePos={mousePos} />
      <FloatingBuoy />
      <SparklingParticles />
    </>
  );
}

export default function BeachOceanCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 3.2, 10.5], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <OceanScene />
      </Canvas>
    </div>
  );
}
