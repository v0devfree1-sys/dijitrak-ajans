import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const growthData = [
  { month: "Oca", trafik: 12, seo: 38 },
  { month: "Şub", trafik: 19, seo: 52 },
  { month: "Mar", trafik: 28, seo: 61 },
  { month: "Nis", trafik: 35, seo: 70 },
  { month: "May", trafik: 52, seo: 78 },
  { month: "Haz", trafik: 61, seo: 83 },
  { month: "Tem", trafik: 75, seo: 88 },
  { month: "Agu", trafik: 91, seo: 92 },
];

const projectData = [
  { type: "WordPress", count: 180 },
  { type: "Shopify", count: 95 },
  { type: "React", count: 112 },
  { type: "Next.js", count: 78 },
  { type: "Ozel", count: 65 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-strong rounded-xl shadow-xl px-4 py-3 text-sm">
        <div className="font-semibold mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs mt-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: p.color }}>{p.name}: {p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function StatsChartSection() {
  return (
    <section className="py-24 bg-muted/20 border-y border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Büyüme</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Verilerle kanıtlanmış
            <br />
            <span className="text-muted-foreground">başarı hikayesi.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Organik Büyüme</div>
              <div className="font-heading text-2xl font-bold">Trafik ve SEO Skoru</div>
              <p className="text-sm text-muted-foreground mt-1">Son 8 aylık ortalama müşteri performansı</p>
            </div>
            <div className="flex items-center gap-4 mb-6 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--primary))" }} />
                <span className="text-muted-foreground">Trafik (k)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--accent))" }} />
                <span className="text-muted-foreground">SEO Skoru</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="trafikGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="seoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="trafik" name="Trafik" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#trafikGrad)" dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                <Area type="monotone" dataKey="seo" name="SEO" stroke="hsl(var(--accent))" strokeWidth={2.5} fill="url(#seoGrad)" dot={{ r: 4, fill: "hsl(var(--accent))" }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8 hover:shadow-xl hover:shadow-accent/10 transition-all"
          >
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Teknoloji Dağılımı</div>
              <div className="font-heading text-2xl font-bold">Proje Türleri</div>
              <p className="text-sm text-muted-foreground mt-1">Platforma göre tamamlanan projeler</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={projectData} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="type" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Proje" radius={[0, 8, 8, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}