import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: string;
  color: "primary" | "secondary" | "accent" | "chart-3";
}

interface StatsCounterProps {
  stats: Stat[];
}

const StatsCounter = ({ stats }: StatsCounterProps) => {
  const colorMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    "chart-3": "text-chart-3",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary/30 transition-all animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <p className={`text-2xl md:text-3xl font-bold ${colorMap[stat.color]}`}>
            {stat.value}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
