'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalData {
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

function PetalsCloud({ count = 65 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial petal parameters - delicate small petals
  const petals = useMemo<PetalData[]>(() => {
    const arr: PetalData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 22,
        y: Math.random() * 20 - 5,
        z: (Math.random() - 0.5) * 8 - 2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedY: 0.008 + Math.random() * 0.015,
        speedRot: 0.006 + Math.random() * 0.012,
        wobbleSpeed: 1 + Math.random() * 1.5,
        wobbleAmp: 0.2 + Math.random() * 0.3,
        scale: 0.14 + Math.random() * 0.12,
        seed: Math.random() * 100,
      });
    }
    return arr;
  }, [count]);

  // Petal geometry: small curved organic petal shape
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.4);
    shape.bezierCurveTo(0.3, -0.2, 0.4, 0.3, 0, 0.6);
    shape.bezierCurveTo(-0.4, 0.3, -0.3, -0.2, 0, -0.4);

    const geo = new THREE.ShapeGeometry(shape, 8);
    // Subtle curl in 3D
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

    petals.forEach((p, i) => {
      // Wind drift & falling calculation
      p.y -= p.speedY;
      p.x += Math.sin(time * p.wobbleSpeed + p.seed) * 0.008 + (mouseX * 0.01);
      p.z += Math.cos(time * p.wobbleSpeed + p.seed) * 0.006;

      p.rotX += p.speedRot;
      p.rotY += p.speedRot * 1.2;
      p.rotZ += Math.sin(time + p.seed) * 0.02;

      // Respawn at top if fallen below
      if (p.y < -10) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 22;
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
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#0284c7"
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.2}
      />
    </instancedMesh>
  );
}

function PetalsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#60a5fa" />
      <PetalsCloud count={26} />
    </Canvas>
  );
}

export default function BlueMoonPetals() {
  const [mounted, setMounted] = useState(false);
  const [swarmShadowRoot, setSwarmShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkSwarm = () => {
      if (typeof window !== 'undefined') {
        const host = document.querySelector('swarm-rebuild');
        if (host && host.shadowRoot && host.isConnected) {
          setSwarmShadowRoot(host.shadowRoot);
        } else {
          setSwarmShadowRoot(null);
        }
      }
    };

    checkSwarm();

    // Instant zero-latency detection when Swarm Rebuild is mounted or unmounted
    const observer = new MutationObserver(() => {
      checkSwarm();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Normal In-Page Canvas: Active during standard user browsing */}
      {!swarmShadowRoot && (
        <div
          className="blue-moon-petals-container"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <PetalsScene />
        </div>
      )}

      {/* 2. Swarm Rebuild Floating Layer (Option 1): Rendered directly inside Swarm's open ShadowRoot at completed end-position */}
      {swarmShadowRoot &&
        createPortal(
          <div
            className="swarm-petals-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 2,
              overflow: 'hidden'
            }}
          >
            <PetalsScene />
          </div>,
          swarmShadowRoot
        )}
    </>
  );
}
