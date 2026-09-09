import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

/** The interactive orb: distorted glowing core + wireframe shell + orbiting rings. */
const Orb = ({ onPoke }: { onPoke: () => void }) => {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pulse = useRef(0);
  const scale = useRef(1);
  const { viewport } = useThree();

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const mx = (state.pointer.x * viewport.width) / 12;
    const my = (state.pointer.y * viewport.height) / 12;

    if (group.current) {
      // Follow the pointer with springy damping
      group.current.position.x += (mx - group.current.position.x) * (1 - Math.exp(-3 * delta));
      group.current.position.y +=
        (my + Math.sin(t * 0.8) * 0.15 - group.current.position.y) * (1 - Math.exp(-3 * delta));
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.15, 0.05);
    }

    // Poke burst decays back to rest
    pulse.current *= Math.exp(-3.5 * delta);
    const target = (hovered ? 1.12 : 1) + pulse.current;
    scale.current += (target - scale.current) * (1 - Math.exp(-8 * delta));
    if (core.current) core.current.scale.setScalar(scale.current);
    if (shell.current) {
      shell.current.scale.setScalar(scale.current * 1.22);
      shell.current.rotation.y -= delta * 0.6;
      shell.current.rotation.x += delta * 0.2;
    }
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.7;
      ringA.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.15;
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.45;
      ringB.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.4) * 0.2;
    }
  });

  const poke = () => {
    pulse.current = 0.35;
    onPoke();
  };

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
        {/* Glowing core */}
        <mesh
          ref={core}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          onPointerDown={poke}
        >
          <icosahedronGeometry args={[1.5, 12]} />
          <MeshDistortMaterial
            color={hovered ? "#7dd3fc" : "#4adecd"}
            emissive="#38bdf8"
            emissiveIntensity={hovered ? 1.5 : 0.9}
            roughness={0.15}
            metalness={0.6}
            distort={hovered ? 0.5 : 0.32}
            speed={2.2}
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh ref={shell} raycast={() => null}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Orbiting neon rings */}
        <mesh ref={ringA} raycast={() => null}>
          <torusGeometry args={[2.5, 0.02, 12, 128]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ringB} raycast={() => null}>
          <torusGeometry args={[3.1, 0.014, 12, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
        </mesh>

        <Sparkles count={60} scale={7} size={3} speed={0.4} color="#f0abfc" opacity={0.8} />
        <pointLight position={[0, 0, 0]} intensity={hovered ? 14 : 8} color="#38bdf8" distance={12} />
      </Float>
    </group>
  );
};

const WarperOrbScene = ({ onPoke }: { onPoke?: () => void }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 6, 6]} intensity={1.1} color="#67e8f9" />
        <directionalLight position={[-6, -3, -4]} intensity={0.7} color="#c084fc" />
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 2]} scale={[8, 8, 1]} color="#38bdf8" />
          <Lightformer
            intensity={1.2}
            color="#a855f7"
            position={[-5, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={[12, 3, 1]}
          />
        </Environment>
        <Stars radius={60} depth={50} count={900} factor={3} saturation={0.4} fade speed={0.4} />
        <Orb onPoke={() => onPoke?.()} />
      </Suspense>
    </Canvas>
  );
};

export default WarperOrbScene;
