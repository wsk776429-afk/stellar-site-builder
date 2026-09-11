import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, X, Sparkles } from "lucide-react";
import useSearchHistory from "@/hooks/useSearchHistory";

const suggestions = [
  "Explain quantum computing simply",
  "Write a launch email for my app",
  "Plan a 3-day trip to Kyoto",
  "Debug this React error",
];

/** The OS Core command line: ask anything, land in the AI answer engine. */
const SearchConsole = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();

  const run = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    addSearch(q);
    navigate(`/chat?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pointer-events-auto">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
        className="relative"
      >
        <div
          className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent
                      transition-opacity duration-300 blur-[6px] ${focused ? "opacity-70" : "opacity-30"}`}
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl px-4 py-3">
          <Search className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Ask Warper AI anything"
            placeholder="Ask Warper anything…"
            className="flex-1 bg-transparent border-0 outline-none text-base md:text-lg text-foreground placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            aria-label="Search with Warper AI"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl px-3 md:px-4 py-2 text-sm font-semibold
                       bg-gradient-to-r from-primary to-secondary text-primary-foreground
                       shadow-[0_0_25px_hsl(var(--primary)/0.45)] hover:brightness-110 transition"
          >
            <span className="hidden sm:inline">Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.form>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-4 flex flex-wrap justify-center gap-2"
      >
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-card/40 backdrop-blur-md
                       px-3 py-1.5 text-xs text-foreground/80 hover:border-primary/50 hover:text-foreground transition"
          >
            <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
            {s}
          </button>
        ))}
      </motion.div>

      {/* Recent searches */}
      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md p-4 text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                Recent
              </span>
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                Clear all
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {history.map((entry) => (
                <li key={entry.q}>
                  <span className="group inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/40 pl-3 pr-1 py-1.5">
                    <button
                      type="button"
                      onClick={() => run(entry.q)}
                      className="text-xs text-foreground/85 hover:text-primary transition max-w-[16rem] truncate"
                    >
                      {entry.q}
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${entry.q} from recent searches`}
                      onClick={() => removeSearch(entry.q)}
                      className="p-1 rounded-full text-muted-foreground hover:text-destructive transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SearchConsole;
