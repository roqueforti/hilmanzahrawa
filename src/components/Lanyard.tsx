// @ts-nocheck
/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF('/card.glb');
  const texture = useTexture(lanyardImage || '/lanyard.png');
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap?.image;
    const W = baseImg?.width || 1024;
    const H = baseImg?.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    if (baseImg) {
      ctx.drawImage(baseImg, 0, 0, W, H);
    }

    // If custom images are provided, draw them
    const drawFitted = (img: any, rect: any) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) {
      drawFitted(frontTex.image, FRONT_UV_RECT);
    } else {
      // PROCEDURAL BEACH ILLUSTRATION PASS (FRONT)
      const fx = FRONT_UV_RECT.x * W;
      const fy = FRONT_UV_RECT.y * H;
      const fw = FRONT_UV_RECT.w * W;
      const fh = FRONT_UV_RECT.h * H;

      ctx.save();
      ctx.beginPath();
      ctx.rect(fx, fy, fw, fh);
      ctx.clip();

      // Sand Gradient Background
      const bgGrad = ctx.createLinearGradient(fx, fy, fx, fy + fh);
      bgGrad.addColorStop(0, '#fdfcdc');
      bgGrad.addColorStop(0.55, '#fed9b7');
      bgGrad.addColorStop(1, '#00afb9');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(fx, fy, fw, fh);

      // Sunset Orb (Vibrant Coral)
      const sunGrad = ctx.createRadialGradient(fx + fw * 0.5, fy + fh * 0.35, 10, fx + fw * 0.5, fy + fh * 0.35, fw * 0.28);
      sunGrad.addColorStop(0, '#fdfcdc');
      sunGrad.addColorStop(0.5, '#fed9b7');
      sunGrad.addColorStop(1, '#f07167');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(fx + fw * 0.5, fy + fh * 0.35, fw * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // Illustrated Waves (Cerulean & Tropical Teal)
      ctx.fillStyle = '#00afb9';
      ctx.beginPath();
      ctx.moveTo(fx, fy + fh * 0.65);
      ctx.bezierCurveTo(fx + fw * 0.25, fy + fh * 0.62, fx + fw * 0.75, fy + fh * 0.68, fx + fw, fy + fh * 0.64);
      ctx.lineTo(fx + fw, fy + fh);
      ctx.lineTo(fx, fy + fh);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#0081a7';
      ctx.beginPath();
      ctx.moveTo(fx, fy + fh * 0.73);
      ctx.bezierCurveTo(fx + fw * 0.35, fy + fh * 0.76, fx + fw * 0.65, fy + fh * 0.71, fx + fw, fy + fh * 0.75);
      ctx.lineTo(fx + fw, fy + fh);
      ctx.lineTo(fx, fy + fh);
      ctx.closePath();
      ctx.fill();

      // Seafoam highlights
      ctx.strokeStyle = '#fdfcdc';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(fx, fy + fh * 0.65);
      ctx.bezierCurveTo(fx + fw * 0.25, fy + fh * 0.62, fx + fw * 0.75, fy + fh * 0.68, fx + fw, fy + fh * 0.64);
      ctx.stroke();

      // Badge Header
      ctx.fillStyle = '#f07167';
      ctx.fillRect(fx + 20, fy + 24, fw - 40, 28);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('COASTAL DEV PASS • 2026', fx + fw * 0.5, fy + 43);

      // Name & Title
      ctx.fillStyle = '#002b3a';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('HILMAN ZAHRAWA', fx + fw * 0.5, fy + fh * 0.52);

      ctx.fillStyle = '#00566e';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('FULLSTACK & UI/UX', fx + fw * 0.5, fy + fh * 0.57);

      // Coordinates
      ctx.fillStyle = '#fdfcdc';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('8°00\'S 112°38\'E • MALANG COAST', fx + fw * 0.5, fy + fh * 0.92);

      ctx.restore();
    }

    if (backImage && backTex.image) {
      drawFitted(backTex.image, BACK_UV_RECT);
    } else {
      // PROCEDURAL BACK
      const bx = BACK_UV_RECT.x * W;
      const by = BACK_UV_RECT.y * H;
      const bw = BACK_UV_RECT.w * W;
      const bh = BACK_UV_RECT.h * H;

      ctx.save();
      ctx.beginPath();
      ctx.rect(bx, by, bw, bh);
      ctx.clip();

      const backGrad = ctx.createLinearGradient(bx, by, bx, by + bh);
      backGrad.addColorStop(0, '#0081a7');
      backGrad.addColorStop(1, '#002b3a');
      ctx.fillStyle = backGrad;
      ctx.fillRect(bx, by, bw, bh);

      // Back Monogram / Logo
      ctx.strokeStyle = '#00afb9';
      ctx.lineWidth = 6;
      ctx.strokeRect(bx + 40, by + 50, bw - 80, bh - 100);

      ctx.fillStyle = '#fed9b7';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HZ', bx + bw * 0.5, by + bh * 0.48);

      ctx.fillStyle = '#fdfcdc';
      ctx.font = '14px sans-serif';
      ctx.fillText('BEACH ILLUSTRATION EDITION', bx + bw * 0.5, by + bh * 0.56);

      ctx.restore();
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    if (baseMap?.flipY !== undefined) composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
