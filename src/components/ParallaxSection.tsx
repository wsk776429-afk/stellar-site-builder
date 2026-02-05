 import { motion, useScroll, useTransform } from "framer-motion";
 import { ReactNode, useRef } from "react";
 import { cn } from "@/lib/utils";
 
 interface ParallaxSectionProps {
   children: ReactNode;
   className?: string;
   speed?: number;
   direction?: "up" | "down";
 }
 
 const ParallaxSection = ({
   children,
   className,
   speed = 0.3,
   direction = "up",
 }: ParallaxSectionProps) => {
   const ref = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
     target: ref,
     offset: ["start end", "end start"],
   });
 
   const multiplier = direction === "up" ? -1 : 1;
   const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
 
   return (
     <motion.div
       ref={ref}
       style={{ y }}
       className={cn("relative", className)}
     >
       {children}
     </motion.div>
   );
 };
 
 export default ParallaxSection;