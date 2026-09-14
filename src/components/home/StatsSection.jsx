import React from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const stats = [
  { value: 500, suffix: "+", label: "Tamamlanan Proje", desc: "Her ölçekteki işletme için" },
  { value: 98, suffix: "%", label: "Müşteri Memnuniyeti", desc: "Geri bildirimlerimize göre" },
  { value: 150, suffix: "+", label: "Tema & Eklenti", desc: "Hazır dijital ürünler" },
  { value: 24, suffix: "/7", label: "Teknik Destek", desc: "Her zaman yanınızdayız" },
];

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-border border border-border rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-8 py-10 bg-card hover:bg-muted/30 transition-colors group"
            >
              <div
                className="font-heading text-4xl lg:text-5xl font-bold text-transparent bg-clip-text mb-2 group-hover:scale-105 transition-transform origin-left"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-medium text-sm text-foreground">{stat.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}