import { motion } from "framer-motion";

/** Deep-space brand backdrop: planet arcs, dotted mesh and glowing waves. */
const BrandBackdrop = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base radial wash */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.18),transparent_60%)]" />

    {/* Top-left planet arc */}
    <motion.div
      animate={{ opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute -top-56 -left-40 w-[32rem] h-[32rem] rounded-full border-[3px] border-secondary/60
                 shadow-[0_0_120px_hsl(var(--secondary)/0.45)]"
    />
    {/* Right planet arc */}
    <motion.div
      animate={{ opacity: [0.4, 0.75, 0.4] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-10 -right-52 w-[30rem] h-[30rem] rounded-full border-[3px] border-accent/60
                 shadow-[0_0_120px_hsl(var(--accent)/0.4)]"
    />

    {/* Dotted mesh */}
    <div
      className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--primary)/0.5) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        maskImage: "linear-gradient(to top, black, transparent)",
        WebkitMaskImage: "linear-gradient(to top, black, transparent)",
      }}
    />

    {/* Glowing waves */}
    <svg
      className="absolute inset-x-0 bottom-0 w-full h-[45%]"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-a" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(var(--secondary))" />
          <stop offset="50%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      {[0, 22, 46, 72].map((offset, i) => (
        <motion.path
          key={offset}
          d={`M0 ${180 + offset} C 200 ${110 + offset}, 380 ${250 + offset}, 620 ${190 + offset} S 980 ${90 + offset}, 1200 ${150 + offset}`}
          fill="none"
          stroke="url(#wave-a)"
          strokeWidth={i === 0 ? 2.5 : 1.4}
          opacity={0.7 - i * 0.14}
          animate={{ pathLength: [0.85, 1, 0.85] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  </div>
);

export default BrandBackdrop;
