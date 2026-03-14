import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    rotateY: -5,
    z: -100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    rotateY: 5,
    z: 100,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);

export default PageTransition;
