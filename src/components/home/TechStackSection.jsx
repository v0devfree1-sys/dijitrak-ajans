import React from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "WordPress", emoji: "🔷" },
  { name: "Shopify", emoji: "🟢" },
  { name: "React", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" },
  { name: "Google Analytics", emoji: "📊" },
  { name: "WooCommerce", emoji: "🛒" },
  { name: "Elementor", emoji: "🎨" },
  { name: "Tailwind CSS", emoji: "💨" },
];

const trustedBy = [
  "TrendStore", "MediaGroup", "TechLaunch", "CloudRetail",
  "DevForce", "ContentHub", "StartupBase", "DigitalCo",
];

export default function TechStackSection() {
  return (
    <section className="py-20 border-y border-border overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Trusted by — marquee */}
        <div className="mb-14">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            Güvenen Markalar
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-12 w-max"
              animate={{ x: [0, -600] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[...trustedBy, ...trustedBy].map((brand, i) => (
                <span key={i} className="font-heading font-bold text-muted-foreground/30 text-xl hover:text-muted-foreground/70 transition-colors cursor-default select-none whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            Çalıştığımız Teknolojiler
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all cursor-default"
              >
                <span className="text-base">{tech.emoji}</span>
                <span className="font-medium text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}