import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, CheckCircle2, Globe } from "lucide-react";

/**
 * Glass dashboard mockup for the hero — a frosted-glass "app preview"
 * with a score ring, mini metric bars and floating glass chips.
 */
export default function HeroDashboard() {
  const bars = [
    { label: "Performans", value: 96, color: "from-primary to-primary/60" },
    { label: "Erişilebilirlik", value: 92, color: "from-accent to-accent/60" },
    { label: "En İyi Uygulamalar", value: 88, color: "from-chart-4 to-chart-4/60" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-20 max-w-4xl"
      style={{ perspective: 1200 }}
    >
      {/* Floating glass chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-10 z-20 glass rounded-2xl px-4 py-3 shadow-xl shadow-primary/10 hidden sm:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-chart-2/15 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-chart-2" />
          </div>
          <div>
            <div className="text-xs font-semibold">Core Web Vitals</div>
            <div className="text-[10px] text-muted-foreground">Hepsi geçti</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-4 top-24 z-20 glass rounded-2xl px-4 py-3 shadow-xl shadow-accent/10 hidden sm:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div>
            <div className="text-xs font-semibold">Lighthouse</div>
            <div className="text-[10px] text-muted-foreground">98 / 100</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-2 -bottom-4 z-20 glass rounded-2xl px-4 py-3 shadow-xl shadow-primary/10 hidden sm:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold">+312% Trafik</div>
            <div className="text-[10px] text-muted-foreground">Son 90 gün</div>
          </div>
        </div>
      </motion.div>

      {/* Main glass dashboard card */}
      <div className="glass-strong rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/60">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-chart-3/60" />
            <div className="w-3 h-3 rounded-full bg-chart-2/60" />
          </div>
          <div className="flex-1 mx-3 h-7 rounded-md bg-muted/60 flex items-center px-3 gap-2">
            <Globe className="w-3 h-3 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground font-medium">app.nexusgrowth.com/analiz</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Score ring */}
          <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28">
              <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                <circle cx="56" cy="56" r="46" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <motion.circle
                  cx="56" cy="56" r="46" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46}
                  initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - 0.94) }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl font-bold">94</span>
                <span className="text-[10px] text-muted-foreground font-medium">/ 100</span>
              </div>
            </div>
            <div className="mt-3 text-xs font-semibold">Genel SEO Skoru</div>
            <div className="text-[10px] text-chart-2 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Mükemmel
            </div>
          </div>

          {/* Metric bars */}
          <div className="glass rounded-2xl p-5 md:col-span-2 flex flex-col justify-center gap-4">
            {bars.map((b, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium">{b.label}</span>
                  <span className="text-xs font-heading font-bold">{b.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${b.value}%` }}
                    transition={{ duration: 1.1, delay: 0.9 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1 pt-3 border-t border-border/50">
              <Shield className="w-3.5 h-3.5 text-chart-2" />
              <span className="text-[11px] text-muted-foreground">SSL geçerli · Mobil uyumlu · Hızlı yükleme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection glow */}
      <div className="absolute -z-10 inset-x-10 -bottom-8 h-24 bg-primary/20 rounded-full blur-3xl" />
    </motion.div>
  );
}