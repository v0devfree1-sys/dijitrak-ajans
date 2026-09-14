import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Frown, Smile, Gauge, Shield, Search } from "lucide-react";

const beforeMetrics = [
  { label: "SEO Skoru", value: 42, icon: Search, color: "text-destructive" },
  { label: "Performans", value: 55, icon: Gauge, color: "text-chart-3" },
  { label: "Güvenlik", value: 38, icon: Shield, color: "text-destructive" },
];
const afterMetrics = [
  { label: "SEO Skoru", value: 94, icon: Search, color: "text-chart-2" },
  { label: "Performans", value: 96, icon: Gauge, color: "text-chart-2" },
  { label: "Güvenlik", value: 92, icon: Shield, color: "text-chart-2" },
];

/**
 * Draggable before/after comparison — drag the handle to reveal the
 * "after SEO" state over the "before" state.
 */
export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const update = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    const move = (e) => dragging.current && update(e.clientX);
    const up = () => (dragging.current = false);
    const tMove = (e) => dragging.current && update(e.touches[0].clientX);
    const tEnd = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tMove, { passive: true });
    window.addEventListener("touchend", tEnd);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tMove);
      window.removeEventListener("touchend", tEnd);
    };
  }, []);

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Öncesi &amp; Sonrası</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-background">
            SEO'nun gücünü
            <br />
            <span className="text-background/50">kendi gözlerinizle görün.</span>
          </h2>
          <p className="mt-4 text-background/50 max-w-lg mx-auto">Ortadaki tutamacı sürükleyin ve dönüşümü deneyimleyin.</p>
        </motion.div>

        {/* Entrance animation wrapper (kept separate from the drag container) */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {/* Drag container — no framer-motion transform here */}
          <div
            ref={containerRef}
            className="relative rounded-3xl overflow-hidden border border-background/10 select-none cursor-ew-resize h-[420px] shadow-2xl"
            onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
            onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
          >
            {/* AFTER layer (full) */}
            <div className="absolute inset-0 bg-gradient-to-br from-chart-2/15 via-background/5 to-accent/10 p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-xl bg-chart-2/20 flex items-center justify-center">
                  <Smile className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <div className="font-heading font-bold text-background">SEO Sonrası</div>
                  <div className="text-xs text-chart-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +300% organik trafik</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1 items-center">
                {afterMetrics.map((m) => (
                  <div key={m.label} className="glass-dark rounded-2xl p-5 text-center">
                    <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-3`} />
                    <div className="font-heading text-4xl font-black text-chart-2">{m.value}</div>
                    <div className="text-xs text-background/60 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 glass-dark rounded-2xl p-4 flex items-center justify-between">
                <span className="text-sm text-background/70">Aylık gelir</span>
                <span className="font-heading text-2xl font-bold text-chart-2">$48.500</span>
              </div>
            </div>

            {/* BEFORE layer (clipped from right) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-destructive/15 via-background/10 to-chart-4/10 p-8 flex flex-col"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <Frown className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <div className="font-heading font-bold text-background">SEO Öncesi</div>
                  <div className="text-xs text-destructive flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Düşük görünürlük</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1 items-center">
                {beforeMetrics.map((m) => (
                  <div key={m.label} className="glass-dark rounded-2xl p-5 text-center">
                    <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-3`} />
                    <div className="font-heading text-4xl font-black text-destructive">{m.value}</div>
                    <div className="text-xs text-background/60 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 glass-dark rounded-2xl p-4 flex items-center justify-between">
                <span className="text-sm text-background/70">Aylık gelir</span>
                <span className="font-heading text-2xl font-bold text-destructive">$12.100</span>
              </div>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-background shadow-[0_0_20px_rgba(255,255,255,0.4)] pointer-events-none"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-strong flex items-center justify-center shadow-xl">
                <div className="flex gap-0.5">
                  <div className="w-1 h-4 bg-background rounded-full" />
                  <div className="w-1 h-4 bg-background rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 text-xs font-semibold text-background/60 px-2.5 py-1 rounded-full glass-dark pointer-events-none">SEO Öncesi</div>
            <div className="absolute top-4 right-4 text-xs font-semibold text-chart-2 px-2.5 py-1 rounded-full glass-dark pointer-events-none">SEO Sonrası</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}