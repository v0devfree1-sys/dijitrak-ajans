import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, UserPlus, X } from "lucide-react";

const activities = [
  { type: "buy", name: "Ahmet Y.", detail: "SpeedBoost Eklenti satın aldı", icon: ShoppingBag, color: "text-chart-2", bg: "bg-chart-2/10" },
  { type: "analyze", name: "trendstore.com", detail: "SEO analizi tamamlandı · 94 puan", icon: Search, color: "text-primary", bg: "bg-primary/10" },
  { type: "signup", name: "Elif K.", detail: "Profesyonel pakete abone oldu", icon: UserPlus, color: "text-accent", bg: "bg-accent/10" },
  { type: "buy", name: "Mehmet D.", detail: "NexusUI Tema satın aldı", icon: ShoppingBag, color: "text-chart-2", bg: "bg-chart-2/10" },
  { type: "analyze", name: "cloudretail.io", detail: "SEO analizi tamamlandı · 88 puan", icon: Search, color: "text-primary", bg: "bg-primary/10" },
  { type: "signup", name: "Burak A.", detail: "Kurumsal pakete geçiş yaptı", icon: UserPlus, color: "text-accent", bg: "bg-accent/10" },
  { type: "buy", name: "Selin B.", detail: "SecureGuard Eklenti satın aldı", icon: ShoppingBag, color: "text-chart-2", bg: "bg-chart-2/10" },
];

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya"];

/**
 * Floating live-activity toast (bottom-left) — cycles through fake recent
 * purchases/analyses to create social proof and a "live platform" feel.
 */
export default function LiveActivityFeed() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let cycle;
    const start = () => {
      setVisible(true);
      cycle = setTimeout(() => {
        setVisible(false);
        cycle = setTimeout(() => setIndex((i) => (i + 1) % activities.length), 600);
      }, 5000);
    };
    const initial = setTimeout(start, 3000);
    const interval = setInterval(start, 7000);
    return () => { clearTimeout(initial); clearInterval(interval); clearTimeout(cycle); };
  }, [index, dismissed]);

  if (dismissed) return null;

  const a = activities[index];
  const Icon = a.icon;

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-2xl shadow-2xl shadow-primary/10 p-3.5 pr-9 max-w-xs relative"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${a.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{a.name}</div>
                <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
                <div className="text-[10px] text-muted-foreground/70 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-chart-2 animate-pulse" />
                  {cities[index % cities.length]} · az önce
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}