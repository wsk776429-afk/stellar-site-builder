 import { useRef } from "react";
 import { useFrame } from "@react-three/fiber";
 import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron } from "@react-three/drei";
 import * as THREE from "three";
 
 interface FloatingShapeProps {
   position?: [number, number, number];
   shape?: "sphere" | "box" | "torus" | "icosahedron";
   color?: string;
   size?: number;
   speed?: number;
   distort?: number;
   opacity?: number;
 }
 
 const FloatingShape = ({
   position = [0, 0, 0],
   shape = "sphere",
   color = "#4adecd",
   size = 1,
   speed = 1,
   distort = 0.3,
   opacity = 0.7,
 }: FloatingShapeProps) => {
   const meshRef = useRef<THREE.Mesh>(null);
 
   useFrame((state) => {
     if (meshRef.current) {
       meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
       meshRef.current.rotation.y += 0.003 * speed;
     }
   });
 
   const renderShape = () => {
     const materialProps = {
       color,
       transparent: true,
       opacity,
       roughness: 0.1,
       metalness: 0.8,
       envMapIntensity: 1,
     };
 
     switch (shape) {
       case "box":
         return (
           <Box ref={meshRef} args={[size, size, size]}>
             <MeshDistortMaterial {...materialProps} distort={distort} speed={2} />
           </Box>
         );
       case "torus":
         return (
           <Torus ref={meshRef} args={[size, size * 0.4, 16, 32]}>
             <MeshDistortMaterial {...materialProps} distort={distort * 0.5} speed={2} />
           </Torus>
         );
       case "icosahedron":
         return (
           <Icosahedron ref={meshRef} args={[size, 1]}>
             <MeshDistortMaterial {...materialProps} distort={distort} speed={2} />
           </Icosahedron>
         );
       default:
         return (
           <Sphere ref={meshRef} args={[size, 32, 32]}>
             <MeshDistortMaterial {...materialProps} distort={distort} speed={2} />
           </Sphere>
         );
     }
   };
 
   return (
     <Float speed={speed} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
       <group position={position}>{renderShape()}</group>
     </Float>
   );
 };
 
 export default FloatingShape;