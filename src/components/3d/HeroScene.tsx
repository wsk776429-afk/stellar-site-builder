 import { Suspense } from "react";
 import { Canvas } from "@react-three/fiber";
 import { PerspectiveCamera, Stars, Float, Environment } from "@react-three/drei";
 import FloatingShape from "./FloatingShape";
 import GlowingOrb from "./GlowingOrb";
 
 const HeroScene = () => {
   return (
     <div className="absolute inset-0 -z-10">
       <Canvas
         dpr={[1, 2]}
         gl={{ antialias: true, alpha: true }}
         style={{ background: "transparent" }}
       >
         <Suspense fallback={null}>
           <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
           
           {/* Soft lighting */}
           <ambientLight intensity={0.3} />
           <directionalLight position={[10, 10, 5]} intensity={0.5} color="#4adecd" />
           <directionalLight position={[-10, 5, -5]} intensity={0.3} color="#c084fc" />
           
           {/* Stars background */}
           <Stars
             radius={80}
             depth={60}
             count={1500}
             factor={4}
             saturation={0.3}
             fade
             speed={0.3}
           />
           
           {/* Floating shapes - Primary color (cyan/teal) */}
           <FloatingShape position={[-6, 3, -5]} shape="sphere" color="#4adecd" size={1.2} speed={0.8} opacity={0.6} />
           <FloatingShape position={[7, -2, -8]} shape="icosahedron" color="#4adecd" size={0.8} speed={1.2} opacity={0.5} />
           
           {/* Secondary color (purple) */}
           <FloatingShape position={[5, 4, -6]} shape="torus" color="#a855f7" size={0.7} speed={1} opacity={0.5} />
           <FloatingShape position={[-4, -3, -4]} shape="box" color="#c084fc" size={0.6} speed={0.9} opacity={0.4} />
           
           {/* Accent color (pink/magenta) */}
           <FloatingShape position={[-7, -1, -7]} shape="sphere" color="#f0abfc" size={0.5} speed={1.1} opacity={0.5} />
           <FloatingShape position={[6, 1, -5]} shape="icosahedron" color="#e879f9" size={0.4} speed={1.3} opacity={0.4} />
           
           {/* Glowing orbs for ambient light effect */}
           <GlowingOrb position={[-8, 2, -10]} color="#4adecd" size={0.3} pulseSpeed={0.8} glowIntensity={1.5} />
           <GlowingOrb position={[8, -1, -12]} color="#a855f7" size={0.25} pulseSpeed={1} glowIntensity={1.2} />
           <GlowingOrb position={[0, 5, -15]} color="#f0abfc" size={0.35} pulseSpeed={0.6} glowIntensity={1} />
           <GlowingOrb position={[-5, -4, -8]} color="#22d3ee" size={0.2} pulseSpeed={1.2} glowIntensity={0.8} />
           <GlowingOrb position={[4, 3, -10]} color="#818cf8" size={0.28} pulseSpeed={0.9} glowIntensity={1.1} />
         </Suspense>
       </Canvas>
     </div>
   );
 };
 
 export default HeroScene;