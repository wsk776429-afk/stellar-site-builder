 import { Canvas } from "@react-three/fiber";
 import { OrbitControls, PerspectiveCamera, Environment, Float, Stars } from "@react-three/drei";
 import { Suspense, ReactNode } from "react";
 
 interface Scene3DProps {
   children?: ReactNode;
   className?: string;
   interactive?: boolean;
 }
 
 const Scene3D = ({ children, className = "", interactive = false }: Scene3DProps) => {
   return (
     <div className={`w-full h-full ${className}`}>
       <Canvas
         dpr={[1, 2]}
         gl={{ antialias: true, alpha: true }}
         style={{ background: "transparent" }}
       >
         <Suspense fallback={null}>
           <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
           
           {/* Soft ambient lighting */}
           <ambientLight intensity={0.4} />
           
           {/* Key light with soft cyan tint */}
           <directionalLight
             position={[5, 5, 5]}
             intensity={0.8}
             color="#4adecd"
             castShadow
           />
           
           {/* Fill light with soft purple tint */}
           <directionalLight
             position={[-5, 3, -5]}
             intensity={0.4}
             color="#c084fc"
           />
           
           {/* Rim light */}
           <pointLight position={[0, -5, 5]} intensity={0.3} color="#f0abfc" />
           
           {/* Floating stars in background */}
           <Stars
             radius={100}
             depth={50}
             count={1000}
             factor={4}
             saturation={0.5}
             fade
             speed={0.5}
           />
           
           {children}
           
           {interactive && (
             <OrbitControls
               enableZoom={false}
               enablePan={false}
               maxPolarAngle={Math.PI / 2}
               minPolarAngle={Math.PI / 3}
               autoRotate
               autoRotateSpeed={0.3}
             />
           )}
         </Suspense>
       </Canvas>
     </div>
   );
 };
 
 export default Scene3D;