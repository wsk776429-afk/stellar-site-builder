 import { motion } from "framer-motion";
 import { ReactNode } from "react";
 import { cn } from "@/lib/utils";
 
 interface GlassCardProps {
   children: ReactNode;
   className?: string;
   glowColor?: "primary" | "secondary" | "accent" | "pink";
   delay?: number;
   hover3D?: boolean;
 }
 
 const GlassCard = ({
   children,
   className,
   glowColor = "primary",
   delay = 0,
   hover3D = true,
 }: GlassCardProps) => {
   const glowMap = {
     primary: "hover:shadow-[0_0_40px_rgba(74,222,205,0.3)]",
     secondary: "hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
     accent: "hover:shadow-[0_0_40px_rgba(232,121,249,0.3)]",
     pink: "hover:shadow-[0_0_40px_rgba(240,171,252,0.3)]",
   };
 
   const borderGlowMap = {
     primary: "before:bg-gradient-to-br before:from-primary/50 before:via-transparent before:to-secondary/30",
     secondary: "before:bg-gradient-to-br before:from-secondary/50 before:via-transparent before:to-accent/30",
     accent: "before:bg-gradient-to-br before:from-accent/50 before:via-transparent before:to-pink-400/30",
     pink: "before:bg-gradient-to-br before:from-pink-400/50 before:via-transparent before:to-primary/30",
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 30, rotateX: -10 }}
       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
       viewport={{ once: true, margin: "-50px" }}
       transition={{
         duration: 0.6,
         delay,
         ease: [0.21, 0.47, 0.32, 0.98],
       }}
       whileHover={hover3D ? {
         y: -8,
         rotateX: 5,
         rotateY: -5,
         scale: 1.02,
         transition: { duration: 0.3 },
       } : undefined}
       style={{ transformStyle: "preserve-3d", perspective: 1000 }}
       className={cn(
         "relative rounded-2xl overflow-hidden",
         "bg-gradient-to-br from-card/80 via-card/60 to-card/40",
         "backdrop-blur-xl",
         "border border-white/10",
         "shadow-xl shadow-black/20",
         "transition-shadow duration-500",
         glowMap[glowColor],
         "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
         "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
         borderGlowMap[glowColor],
         "before:-z-10",
         className
       )}
     >
       {/* Inner glow effect */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
       
       {/* Content */}
       <div className="relative z-10">{children}</div>
       
       {/* Bottom reflection */}
       <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
     </motion.div>
   );
 };
 
 export default GlassCard;