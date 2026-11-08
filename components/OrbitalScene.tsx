"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef, useSyncExternalStore } from "react";
import type { Group, Mesh } from "three";

function MonogramSculpture() {
  const sculpture = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame(({ mouse }) => {
    if (!sculpture.current || !core.current) return;
    sculpture.current.rotation.y += 0.0025;
    sculpture.current.rotation.x += (mouse.y * 0.18 - sculpture.current.rotation.x) * 0.025;
    sculpture.current.rotation.z += (mouse.x * 0.12 - sculpture.current.rotation.z) * 0.025;
    core.current.rotation.y -= 0.004;
  });

  const metal = { color: "#b9ed54", emissive: "#30480f", emissiveIntensity: 0.35, roughness: 0.2, metalness: 0.78, clearcoat: 0.8 };
  const silver = { color: "#e9eadf", roughness: 0.28, metalness: 0.65, clearcoat: 0.7 };

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={sculpture}>
        <mesh ref={core} position={[0, 0, 0]} rotation={[0.45, 0.45, 0.45]} castShadow>
          <boxGeometry args={[0.58, 0.58, 0.58]} />
          <meshPhysicalMaterial {...metal} />
        </mesh>
        <RoundedBox args={[0.22, 1.65, 0.22]} radius={0.06} smoothness={3} position={[-0.58, 0.05, 0]} rotation={[0, 0, -0.48]} castShadow>
          <meshPhysicalMaterial {...silver} />
        </RoundedBox>
        <RoundedBox args={[0.22, 1.65, 0.22]} radius={0.06} smoothness={3} position={[0.58, 0.05, 0]} rotation={[0, 0, 0.48]} castShadow>
          <meshPhysicalMaterial {...metal} />
        </RoundedBox>
        <RoundedBox args={[0.22, 1.72, 0.22]} radius={0.06} smoothness={3} position={[-0.72, -0.12, 0.04]} rotation={[0, 0, 0.02]} castShadow>
          <meshPhysicalMaterial {...metal} />
        </RoundedBox>
        <RoundedBox args={[0.22, 1.72, 0.22]} radius={0.06} smoothness={3} position={[0, -0.12, 0.04]} rotation={[0, 0, 0.02]} castShadow>
          <meshPhysicalMaterial {...silver} />
        </RoundedBox>
        <RoundedBox args={[0.22, 1.72, 0.22]} radius={0.06} smoothness={3} position={[0.72, -0.12, 0.04]} rotation={[0, 0, 0.02]} castShadow>
          <meshPhysicalMaterial {...metal} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function StaticSculpture() {
  return <div className="scene-fallback scene-fallback-monogram" aria-label="Static YM geometric sculpture fallback"><span>YM</span><i /><b /></div>;
}

export default function OrbitalScene() {
  const useFallback = useSyncExternalStore(
    () => () => undefined,
    () => {
    const connection = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    return (connection !== undefined && connection <= 2) || navigator.hardwareConcurrency <= 2;
    },
    () => false
  );

  if (useFallback) return <StaticSculpture />;

  return (
    <div className="scene-wrap" aria-label="Interactive YM-inspired geometric sculpture" role="img">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 1.35]} shadows fallback={<StaticSculpture />}>
        <ambientLight intensity={0.25} />
        <directionalLight castShadow position={[3, 3, 4]} color="#e7ffba" intensity={2.2} />
        <pointLight position={[-2, 1, 2]} color="#c5ff4a" intensity={4} />
        <pointLight position={[2, -2, -2]} color="#60792b" intensity={2.5} />
        <MonogramSculpture />
      </Canvas>
    </div>
  );
}
