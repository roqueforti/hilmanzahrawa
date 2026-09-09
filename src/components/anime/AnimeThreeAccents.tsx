'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type AnimeParticleMode = 
  | 'falling-petals'
  | 'rising-embers'
  | 'lightning-sparks'
  | 'wisteria-butterflies'
  | 'water-droplets'
  | 'cyber-hex-prisms';

interface ParticleData {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedY: number;
  speedRot: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  scale: number;
  seed: number;
}

// 1. Organic 3D Petals Mesh (Frieren, Fern, Sakura, Hinata)
function FallingPetals({ count = 35, color = '#38bdf8' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 24,
        y: Math.random() * 22 - 6,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedY: 0.008 + Math.random() * 0.016,
        speedRot: 0.006 + Math.random() * 0.014,
        wobbleSpeed: 1 + Math.random() * 1.5,
        wobbleAmp: 0.2 + Math.random() * 0.3,
        scale: 0.12 + Math.random() * 0.12,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.4);
    shape.bezierCurveTo(0.3, -0.2, 0.4, 0.3, 0, 0.6);
    shape.bezierCurveTo(-0.4, 0.3, -0.3, -0.2, 0, -0.4);

    const geo = new THREE.ShapeGeometry(shape, 8);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 3) * 0.08 + Math.cos(y * 2) * 0.05);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x: mouseX } = state.pointer;

    particles.forEach((p, i) => {
      p.y -= p.speedY;
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * 0.008 + (mouseX * 0.012);
      p.z += Math.cos(time * p.wobbleSpeed + p.seed) * 0.006;

      p.rotX += p.speedRot;
      p.rotY += p.speedRot * 1.2;
      p.rotZ += Math.sin(time + p.seed) * 0.02;

      if (p.y < -10) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 24;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[petalGeometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.32}
      />
    </instancedMesh>
  );
}

// 2. Rising 3D Fire Embers (Stark, Eren, Ace, Sabo, Tanjiro)
function RisingEmbers({ count = 45, color = '#ea580c' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 24,
        y: Math.random() * 20 - 10,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.012 + Math.random() * 0.02,
        speedRot: 0.01 + Math.random() * 0.02,
        wobbleSpeed: 1.5 + Math.random() * 2,
        wobbleAmp: 0.3 + Math.random() * 0.4,
        scale: 0.05 + Math.random() * 0.07,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const emberGeo = useMemo(() => new THREE.DodecahedronGeometry(0.5, 0), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x: mouseX } = state.pointer;

    particles.forEach((p, i) => {
      p.y += p.speedY; // Rise upwards
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * 0.01 + (mouseX * 0.008);
      p.z += Math.cos(time * p.wobbleSpeed + p.seed) * 0.008;

      p.rotX += p.speedRot;
      p.rotY += p.speedRot;

      if (p.y > 11) {
        p.y = -10;
        p.x = (Math.random() - 0.5) * 24;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 3 + p.seed) * 0.2));
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[emberGeo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.65}
        roughness={0.2}
        metalness={0.3}
        transparent
        opacity={0.45}
      />
    </instancedMesh>
  );
}

// 3. Lightning Sparks & Prisms (Sasuke, Zenitsu)
function LightningSparks({ count = 35, color = '#eab308' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 24,
        y: Math.random() * 20 - 10,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: (Math.random() - 0.5) * 0.03,
        speedRot: 0.03 + Math.random() * 0.05,
        wobbleSpeed: 3 + Math.random() * 4,
        wobbleAmp: 0.4 + Math.random() * 0.5,
        scale: 0.06 + Math.random() * 0.08,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const sparkGeo = useMemo(() => new THREE.TetrahedronGeometry(0.6, 0), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Rapid jittery pulse
      const jitter = Math.sin(time * 12 + p.seed) > 0.4 ? 0.03 : 0.005;
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * jitter;
      p.y += Math.cos(time * p.wobbleSpeed + p.seed) * jitter;

      p.rotX += p.speedRot;
      p.rotZ += p.speedRot;

      if (p.x > 14) p.x = -14;
      if (p.x < -14) p.x = 14;
      if (p.y > 12) p.y = -10;
      if (p.y < -10) p.y = 12;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      const pulseScale = p.scale * (Math.sin(time * 8 + p.seed) > 0.2 ? 1.4 : 0.6);
      dummy.scale.setScalar(pulseScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[sparkGeo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.5}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

// 4. 3D Winged Butterfly Particles (Shinobu)
function WisteriaButterflies({ count = 24, color = '#a855f7' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 22,
        y: Math.random() * 20 - 10,
        z: (Math.random() - 0.5) * 6 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.006 + Math.random() * 0.012,
        speedRot: 0.008 + Math.random() * 0.01,
        wobbleSpeed: 2 + Math.random() * 2,
        wobbleAmp: 0.3 + Math.random() * 0.3,
        scale: 0.1 + Math.random() * 0.08,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const butterflyGeo = useMemo(() => {
    // Dual triangular wing pair
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.5, 0.4);
    shape.lineTo(0.4, -0.3);
    shape.lineTo(0, 0);
    shape.lineTo(-0.5, 0.4);
    shape.lineTo(-0.4, -0.3);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x: mouseX } = state.pointer;

    particles.forEach((p, i) => {
      // Fluttering flight path
      p.y += Math.sin(time * 1.5 + p.seed) * 0.01;
      p.x += Math.cos(time * 1.2 + p.seed) * 0.012 + (mouseX * 0.01);
      p.z += Math.sin(time * 2 + p.seed) * 0.008;

      // Wing flap rotation
      const flap = Math.sin(time * 9 + p.seed) * 0.6;
      p.rotY = flap;
      p.rotZ = Math.cos(time * 1.5 + p.seed) * 0.2;

      if (p.x > 14) p.x = -14;
      if (p.x < -14) p.x = 14;
      if (p.y > 11) p.y = -10;
      if (p.y < -10) p.y = 11;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(0, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[butterflyGeo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        side={THREE.DoubleSide}
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

// 5. 3D Water Droplets (Giyuu, Inosuke, Nami, Luffy)
function WaterDroplets({ count = 38, color = '#0284c7' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 24,
        y: Math.random() * 22 - 6,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        speedY: 0.015 + Math.random() * 0.02,
        speedRot: 0,
        wobbleSpeed: 1 + Math.random() * 1.2,
        wobbleAmp: 0.2 + Math.random() * 0.2,
        scale: 0.08 + Math.random() * 0.08,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const dropGeo = useMemo(() => new THREE.SphereGeometry(0.5, 12, 12), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x: mouseX } = state.pointer;

    particles.forEach((p, i) => {
      p.y -= p.speedY;
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * 0.005 + (mouseX * 0.008);

      if (p.y < -10) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 24;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale * 0.8, p.scale * 1.3, p.scale * 0.8); // Elongated water drop
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[dropGeo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

// 6. Floating Cyber Hex Prisms (Zero Two, Naruto, Levi, Mikasa)
function CyberHexPrisms({ count = 30, color = '#f43f5e' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 24,
        y: Math.random() * 20 - 10,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.005 + Math.random() * 0.01,
        speedRot: 0.006 + Math.random() * 0.012,
        wobbleSpeed: 0.8 + Math.random() * 1,
        wobbleAmp: 0.2 + Math.random() * 0.2,
        scale: 0.09 + Math.random() * 0.09,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  const hexGeo = useMemo(() => new THREE.CylinderGeometry(0.6, 0.6, 0.2, 6), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x: mouseX } = state.pointer;

    particles.forEach((p, i) => {
      p.y -= p.speedY;
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * 0.006 + (mouseX * 0.01);
      p.rotX += p.speedRot;
      p.rotY += p.speedRot * 1.3;

      if (p.y < -10) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 24;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[hexGeo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.2}
        metalness={0.4}
        transparent
        opacity={0.32}
      />
    </instancedMesh>
  );
}

interface AnimeThreeAccentsProps {
  mode?: AnimeParticleMode;
  color?: string;
}

export default function AnimeThreeAccents({ mode = 'falling-petals', color = '#38bdf8' }: AnimeThreeAccentsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 7]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={1.2} color={color} />

        {mode === 'falling-petals' && <FallingPetals count={32} color={color} />}
        {mode === 'rising-embers' && <RisingEmbers count={40} color={color} />}
        {mode === 'lightning-sparks' && <LightningSparks count={32} color={color} />}
        {mode === 'wisteria-butterflies' && <WisteriaButterflies count={22} color={color} />}
        {mode === 'water-droplets' && <WaterDroplets count={36} color={color} />}
        {mode === 'cyber-hex-prisms' && <CyberHexPrisms count={28} color={color} />}
      </Canvas>
    </div>
  );
}
