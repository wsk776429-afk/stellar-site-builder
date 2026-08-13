import { cn } from "@/lib/utils";

interface WarperLogoProps {
  className?: string;
}

/** Gradient "W" mark matching the Warper AI brand banner. */
const WarperLogo = ({ className }: WarperLogoProps) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-12 h-12", className)}
    role="img"
    aria-label="Warper AI logo"
  >
    <defs>
      <linearGradient id="warper-w-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--secondary))" />
        <stop offset="100%" stopColor="hsl(var(--primary))" />
      </linearGradient>
      <linearGradient id="warper-w-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--accent))" />
        <stop offset="100%" stopColor="hsl(var(--primary))" />
      </linearGradient>
    </defs>
    <path
      d="M10 18 L30 18 L44 62 L52 40 L64 40 L48 88 L30 88 Z"
      fill="url(#warper-w-left)"
    />
    <path
      d="M90 18 L70 18 L56 62 L48 40 L36 40 L52 88 L70 88 Z"
      fill="url(#warper-w-right)"
      opacity="0.95"
    />
  </svg>
);

export default WarperLogo;
