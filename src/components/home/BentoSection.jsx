import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, TrendingUp, Globe, ShieldCheck, Code2, BarChart3 } from "lucide-react";

const bentoItems = [
  {
    id: 1,
    col: "col-span-2 row-span-2",
    content: (
      <div className="h-full flex flex-col justify-between p-8 glass-dark rounded-3xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
        <div className="relative w-12 h-12 rounded-2xl glass-primary flex items-center justify-center mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div className="relative">
          <div
            className="font-heading text-6xl font-black text-transparent bg-clip-text mb-3"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
          >
            +300%
          </div>
          <h3 className="font-heading text-xl font-bold text-background mb-2">Organik Trafik Artışı</h3>
          <p className="text-sm text-background/50 leading-relaxed">SEO paketlerimizi kullanan müşterilerimizin ortalama trafik büyüme oranı.</p>
        </div>
        <Link to="/seo-analyzer" className="relative flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all mt-6">
          SEO Analizini Dene <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
  {
    id: 2,
    col: "col-span-1 row-span-1",
    content: (
      <div className="h-full flex flex-col justify-between p-6 glass-primary rounded-3xl">
        <Globe className="w-8 h-8 text-primary" />
        <div>
          <div className="font-heading text-4xl font-black text-primary">150+</div>
          <div className="text-sm text-muted-foreground mt-1">Premium Ürün</div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    col: "col-span-1 row-span-1",
    content: (
      <div className="h-full flex flex-col justify-between p-6 glass rounded-3xl hover:shadow-lg hover:shadow-accent/10 transition-all">
        <Zap className="w-8 h-8 text-accent" />
        <div>
          <div className="font-heading text-4xl font-black text-accent">24/7</div>
          <div className="text-sm text-muted-foreground mt-1">Teknik Destek</div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    col: "col-span-1 row-span-2",
    content: (
      <div className="h-full flex flex-col justify-between p-6 glass rounded-3xl hover:shadow-lg hover:shadow-primary/10 transition-all">
        <div>
          <ShieldCheck className="w-8 h-8 text-chart-2 mb-4" />
          <h3 className="font-heading font-bold text-lg mb-2">Güvenli ve Hızlı</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">SSL, performans optimizasyonu ve güvenlik güncellemeleri dahil.</p>
        </div>
        <div className="mt-6 space-y-2">
          {["SSL Sertifikası", "99.9% Uptime", "CDN Desteği"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    col: "col-span-2 row-span-1",
    content: (
      <div className="h-full flex items-center justify-between px-8 py-6 glass-primary rounded-3xl hover:shadow-xl hover:shadow-primary/10 transition-all">
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Yapay Zeka</div>
          <h3 className="font-heading font-bold text-xl">AI Destekli SEO Analizi</h3>
          <p className="text-sm text-muted-foreground mt-1">Sitenizi saniyeler içinde analiz edin.</p>
        </div>
        <Link to="/seo-analyzer">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
    ),
  },
  {
    id: 6,
    col: "col-span-1 row-span-1",
    content: (
      <div className="h-full flex flex-col justify-between p-6 glass rounded-3xl hover:shadow-lg hover:shadow-chart-4/10 transition-all">
        <Code2 className="w-8 h-8 text-chart-4" />
        <div>
          <div className="font-heading text-4xl font-black text-chart-4">500+</div>
          <div className="text-sm text-muted-foreground mt-1">Tamamlanan Proje</div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    col: "col-span-1 row-span-1",
    content: (
      <div className="h-full flex flex-col justify-between p-6 glass rounded-3xl hover:shadow-lg hover:shadow-primary/10 transition-all">
        <BarChart3 className="w-8 h-8 text-primary/60" />
        <div>
          <div className="font-heading text-4xl font-black">98%</div>
          <div className="text-sm text-muted-foreground mt-1">Memnuniyet</div>
        </div>
      </div>
    ),
  },
];

export default function BentoSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">NexusGrowth?</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Rakamlar her şeyi
            <br />
            <span className="text-muted-foreground">anlatıyor.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
              className={`${item.col} will-change-transform`}
            >
              {item.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}