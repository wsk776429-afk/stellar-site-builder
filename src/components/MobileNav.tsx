import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Image, FileText, Mic, Wrench, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/chat", icon: MessageSquare, label: "Chat" },
  { path: "/photo-tools", icon: Image, label: "Photo" },
  { path: "/pdf-tools", icon: FileText, label: "PDF" },
  { path: "/voice", icon: Mic, label: "Voice" },
  { path: "/image", icon: Wrench, label: "Studio" },
  { path: "/dashboard", icon: LayoutDashboard, label: "More" },
];

const MobileNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card/95 backdrop-blur-xl border-t border-border/50 px-1 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-1.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors min-w-[44px]"
            >
              {isActive(item.path) && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
