import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: LucideIcon;
  variant?: "primary" | "secondary" | "accent" | "warning";
}

const FeatureCard = ({
  to,
  icon: Icon,
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  variant = "primary",
}: FeatureCardProps) => {
  const colorMap = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "hover:border-primary/50",
      shadow: "hover:shadow-primary/10",
      glow: "group-hover:glow-box",
    },
    secondary: {
      bg: "bg-secondary/10",
      text: "text-secondary",
      border: "hover:border-secondary/50",
      shadow: "hover:shadow-secondary/10",
      glow: "group-hover:glow-box-secondary",
    },
    accent: {
      bg: "bg-accent/10",
      text: "text-accent",
      border: "hover:border-accent/50",
      shadow: "hover:shadow-accent/10",
      glow: "group-hover:glow-box-accent",
    },
    warning: {
      bg: "bg-chart-3/10",
      text: "text-chart-3",
      border: "hover:border-chart-3/50",
      shadow: "hover:shadow-chart-3/10",
      glow: "",
    },
  };

  const colors = colorMap[variant];

  return (
    <Link to={to} className="group">
      <div
        className={`bg-card rounded-xl border border-border p-6 ${colors.border} transition-all duration-300 hover:shadow-lg ${colors.shadow} h-full flex flex-col`}
      >
        <div
          className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${colors.glow}`}
        >
          <Icon className={`w-7 h-7 ${colors.text}`} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>
        <Button
          variant={variant === "primary" ? "default" : "outline"}
          className="w-full gap-2"
        >
          <ButtonIcon className="w-4 h-4" />
          {buttonText}
        </Button>
      </div>
    </Link>
  );
};

export default FeatureCard;
