 import { motion } from "framer-motion";
 import { LucideIcon } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface FloatingIconProps {
   icon: LucideIcon;
   className?: string;
   size?: number;
   color?: "primary" | "secondary" | "accent" | "pink";
   delay?: number;
   floatIntensity?: number;
 }
 
 const FloatingIcon = ({
   icon: Icon,
   className,
   size = 24,
   color = "primary",
   delay = 0,
   floatIntensity = 10,
 }: FloatingIconProps) => {
   const colorMap = {
     primary: "text-primary drop-shadow-[0_0_15px_rgba(74,222,205,0.6)]",
     secondary: "text-secondary drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]",
     accent: "text-accent drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]",
     pink: "text-pink-400 drop-shadow-[0_0_15px_rgba(240,171,252,0.6)]",
   };
 
   const bgMap = {
     primary: "bg-primary/20 border-primary/30",
     secondary: "bg-secondary/20 border-secondary/30",
     accent: "bg-accent/20 border-accent/30",
     pink: "bg-pink-400/20 border-pink-400/30",
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, scale: 0.5, y: 20 }}
       whileInView={{ opacity: 1, scale: 1, y: 0 }}
       viewport={{ once: true }}
       animate={{
         y: [0, -floatIntensity, 0],
         rotateZ: [-2, 2, -2],
       }}
       whileHover={{
         scale: 1.2,
         rotate: 10,
       }}
       transition={{
         y: {
           duration: 3 + delay,
           repeat: Infinity,
           ease: "easeInOut",
         },
         rotateZ: {
           duration: 4 + delay,
           repeat: Infinity,
           ease: "easeInOut",
         },
         scale: {
           duration: 0.2,
         },
       }}
       className={cn(
         "p-4 rounded-2xl border backdrop-blur-sm cursor-pointer",
         bgMap[color],
         className
       )}
     >
       <Icon size={size} className={colorMap[color]} />
     </motion.div>
   );
 };
 
 export default FloatingIcon;