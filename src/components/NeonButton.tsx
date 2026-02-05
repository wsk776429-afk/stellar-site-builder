 import { motion } from "framer-motion";
 import { ReactNode } from "react";
 import { cn } from "@/lib/utils";
 
 interface NeonButtonProps {
   children: ReactNode;
   className?: string;
   variant?: "primary" | "secondary" | "accent";
   size?: "sm" | "md" | "lg";
   onClick?: () => void;
 }
 
 const NeonButton = ({
   children,
   className,
   variant = "primary",
   size = "md",
   onClick,
 }: NeonButtonProps) => {
   const variantStyles = {
     primary: {
       bg: "bg-gradient-to-r from-primary to-cyan-400",
       shadow: "shadow-[0_0_30px_rgba(74,222,205,0.5)]",
       hoverShadow: "hover:shadow-[0_0_50px_rgba(74,222,205,0.7)]",
       border: "border-primary/50",
     },
     secondary: {
       bg: "bg-gradient-to-r from-secondary to-purple-400",
       shadow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
       hoverShadow: "hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]",
       border: "border-secondary/50",
     },
     accent: {
       bg: "bg-gradient-to-r from-accent to-pink-400",
       shadow: "shadow-[0_0_30px_rgba(232,121,249,0.5)]",
       hoverShadow: "hover:shadow-[0_0_50px_rgba(232,121,249,0.7)]",
       border: "border-accent/50",
     },
   };
 
   const sizeStyles = {
     sm: "px-4 py-2 text-sm",
     md: "px-6 py-3 text-base",
     lg: "px-8 py-4 text-lg",
   };
 
   const styles = variantStyles[variant];
 
   return (
     <motion.button
       onClick={onClick}
       whileHover={{
         scale: 1.05,
         y: -3,
       }}
       whileTap={{
         scale: 0.98,
         y: 0,
       }}
       transition={{
         type: "spring",
         stiffness: 400,
         damping: 17,
       }}
       className={cn(
         "relative font-semibold rounded-xl",
         "text-primary-foreground",
         "border",
         styles.bg,
         styles.shadow,
         styles.hoverShadow,
         styles.border,
         sizeStyles[size],
         "transition-all duration-300",
         "overflow-hidden",
         className
       )}
     >
       {/* Shimmer effect */}
       <motion.div
         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
         initial={{ x: "-100%" }}
         whileHover={{ x: "100%" }}
         transition={{ duration: 0.6 }}
       />
       
       <span className="relative z-10 flex items-center justify-center gap-2">
         {children}
       </span>
     </motion.button>
   );
 };
 
 export default NeonButton;