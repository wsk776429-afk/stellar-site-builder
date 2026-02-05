 import { useRef } from "react";
 import { useFrame } from "@react-three/fiber";
 import { Sphere } from "@react-three/drei";
 import * as THREE from "three";
 
 interface GlowingOrbProps {
   position?: [number, number, number];
   color?: string;
   size?: number;
   pulseSpeed?: number;
   glowIntensity?: number;
 }
 
 const GlowingOrb = ({
   position = [0, 0, 0],
   color = "#4adecd",
   size = 0.5,
   pulseSpeed = 1,
   glowIntensity = 2,
 }: GlowingOrbProps) => {
   const meshRef = useRef<THREE.Mesh>(null);
   const lightRef = useRef<THREE.PointLight>(null);
 
   useFrame((state) => {
     const time = state.clock.elapsedTime;
     const pulse = Math.sin(time * pulseSpeed) * 0.2 + 1;
     
     if (meshRef.current) {
       meshRef.current.scale.setScalar(pulse);
     }
     if (lightRef.current) {
       lightRef.current.intensity = glowIntensity * pulse;
     }
   });
 
   return (
     <group position={position}>
       <Sphere ref={meshRef} args={[size, 32, 32]}>
         <meshBasicMaterial color={color} transparent opacity={0.9} />
       </Sphere>
       <pointLight ref={lightRef} color={color} intensity={glowIntensity} distance={5} />
       
       {/* Outer glow sphere */}
       <Sphere args={[size * 1.5, 16, 16]}>
         <meshBasicMaterial color={color} transparent opacity={0.15} />
       </Sphere>
     </group>
   );
 };
 
 export default GlowingOrb;