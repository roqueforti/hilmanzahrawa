'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WavyGrid() {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 45;
  const sep = 0.25;

  const [positions, initialPositions] = React.useMemo(() => {
    const pos = [];
    const init = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = 0;
        pos.push(x, y, z);
        init.push(x, y, z);
      }
    }
    return [new Float32Array(pos), new Float32Array(init)];
  }, [count, sep]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x: mx, y: my } = state.pointer;
    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = initialPositions[i * 3];
        const z = initialPositions[i * 3 + 2];
        const dist = Math.sqrt((x - mx * 3) ** 2 + (z - my * 3) ** 2);
        // Harmonic 3D wave calculation
        array[i * 3 + 1] = Math.sin(dist * 1.5 - time * 2) * 0.35 + Math.cos(x * 1.2 + time) * 0.15;
        i++;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function SkyWaves3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.8
    }}>
      <Canvas
        camera={{ position: [0, 4, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <WavyGrid />
      </Canvas>
    </div>
  );
}
