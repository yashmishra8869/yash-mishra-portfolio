"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Torus } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Sculpture() {
  const core = useRef<Mesh>(null);
  const sculpture = useRef<Group>(null);
  useFrame(({ mouse }) => {
    if (!core.current) return;
    if (sculpture.current) {
      sculpture.current.rotation.y += 0.0025;
      sculpture.current.rotation.x += (mouse.y * 0.16 - sculpture.current.rotation.x) * 0.02;
      sculpture.current.rotation.z += (mouse.x * 0.1 - sculpture.current.rotation.z) * 0.02;
    }
    core.current.rotation.x += 0.003;
    core.current.rotation.y += 0.006;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={sculpture}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshPhysicalMaterial color="#c5ff4a" emissive="#486515" emissiveIntensity={0.8} roughness={0.22} metalness={0.72} clearcoat={0.8} />
      </mesh>
      <Torus args={[1.3, 0.012, 16, 96]} rotation={[Math.PI / 2.8, 0.2, 0]}><meshBasicMaterial color="#c5ff4a" /></Torus>
      <Torus args={[1.65, 0.008, 16, 96]} rotation={[0.7, 0, 0.8]}><meshBasicMaterial color="#f2f3ef" transparent opacity={0.5} /></Torus>
      <Torus args={[0.98, 0.006, 12, 72]} rotation={[0.3, Math.PI / 2, 0.8]}><meshBasicMaterial color="#c5ff4a" transparent opacity={0.65} /></Torus>
      </group>
      <Sparkles count={34} scale={[4.5, 4.5, 4.5]} size={2} speed={0.18} color="#c5ff4a" opacity={0.45} />
    </Float>
  );
}

export default function OrbitalScene() {
  return (
    <div className="scene-wrap" aria-label="Interactive orbital sculpture">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} fallback={<div className="scene-fallback" />}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 2, 4]} color="#e7ffba" intensity={2.2} />
        <pointLight position={[-2, 1, 2]} color="#c5ff4a" intensity={7} />
        <pointLight position={[2, -2, -2]} color="#60792b" intensity={5} />
        <Sculpture />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
