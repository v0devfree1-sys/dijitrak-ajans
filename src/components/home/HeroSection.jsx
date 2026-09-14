import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, MoveRight, TrendingUp, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import HeroDashboard from "./HeroDashboard";

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-primary/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm text-muted-foreground mb-8 shadow-lg shadow-primary/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Dijital Ajans Platformu
            <span className="w-px h-3 bg-border" />
            <span className="text-primary font-medium">v2.0 Yayında →</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[1.02]"
          >
            Markanızı{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)" }}
            >
              Zirveye
            </span>
            <br />
            Taşıyın
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-7 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            SEO analizi, premium temalar ve özel geliştirme çözümleriyle
            dijitaldeki rakiplerinizi geride bırakın.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/seo-analyzer">
              <Button size="lg" className="h-13 px-8 rounded-xl text-base gap-2 shadow-lg shadow-primary/20 font-semibold">
                <Search className="w-4 h-4" />
                Ücretsiz SEO Analizi
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" size="lg" className="h-13 px-8 rounded-xl text-base gap-2 border-border/80 bg-card/50 backdrop-blur-sm hover:bg-muted/50">
                Mağazayı Keşfet
                <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {["AY", "EK", "MD", "SB", "OT"].map((name, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    {name}
                  </div>
                ))}
              </div>
              <span className="font-medium">500+ mutlu müşteri</span>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-chart-3 text-sm">★</span>)}
              </div>
              <span>%98 memnuniyet</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>AI destekli analiz</span>
            </div>
          </motion.div>
        </div>

        {/* Glass dashboard preview */}
        <HeroDashboard />

        {/* Feature strip — glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { emoji: "🔍", title: "SEO Analizi", desc: "Yapay zeka destekli site denetimi ve iyileştirme önerileri", tag: "Ücretsiz", icon: Search },
            { emoji: "🛍️", title: "Premium Mağaza", desc: "150+ tema, eklenti ve SEO paketi — hazır teslim", tag: "Yeni", icon: TrendingUp },
            { emoji: "⚡", title: "Özel Projeler", desc: "İhtiyacınıza özel geliştirme ve tasarım çözümleri", tag: "24s Yanıt", icon: Zap },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass relative p-8 rounded-2xl hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-5">{item.emoji}</div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">{item.tag}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <ArrowRight className="absolute bottom-8 right-8 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}