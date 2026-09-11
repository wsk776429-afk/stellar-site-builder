import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Image, Volume2, Wand2, ArrowUpRight } from "lucide-react";

const cards = [
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chat",
    hint: "12 expert agents",
    pos: "md:absolute md:left-0 md:top-[14%]",
    tone: "from-primary/25",
    accent: "text-primary",
    drift: 0,
  },
  {
    to: "/image",
    icon: Image,
    title: "Image Studio",
    hint: "HD & 4K visuals",
    pos: "md:absolute md:right-0 md:top-[10%]",
    tone: "from-secondary/25",
    accent: "text-secondary",
    drift: 0.6,
  },
  {
    to: "/voice",
    icon: Volume2,
    title: "Voice",
    hint: "Talk in real time",
    pos: "md:absolute md:left-0 md:bottom-[12%]",
    tone: "from-accent/25",
    accent: "text-accent",
    drift: 1.2,
  },
  {
    to: "/tools",
    icon: Wand2,
    title: "Photo & PDF",
    hint: "Enhance and read",
    pos: "md:absolute md:right-0 md:bottom-[16%]",
    tone: "from-pink-400/25",
    accent: "text-pink-400",
    drift: 1.8,
  },
];

/** Feature cards that hover in 3D space around the OS core. */
const FloatingFeatureCards = () => (
  <div className="relative md:absolute md:inset-0 z-20 md:pointer-events-none">
    <div className="grid grid-cols-2 gap-3 md:block">
      {cards.map((card) => (
        <motion.div
          key={card.to}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 + card.drift * 0.15 }}
          className={`${card.pos} md:w-[15rem] md:pointer-events-auto`}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7 + card.drift, repeat: Infinity, ease: "easeInOut", delay: card.drift }}
          >
            <Link
              to={card.to}
              className="group block rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl p-4
                         shadow-[0_10px_40px_-12px_hsl(var(--background))] hover:border-primary/50
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${card.tone} to-transparent
                              flex items-center justify-center`}
                >
                  <card.icon className={`w-5 h-5 ${card.accent}`} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground text-sm">{card.title}</span>
                  <span className="block text-xs text-muted-foreground truncate">{card.hint}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default FloatingFeatureCards;
