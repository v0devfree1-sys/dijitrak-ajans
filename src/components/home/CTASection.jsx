import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(245 70% 40%) 50%, hsl(var(--accent)) 100%)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

          <div className="relative px-8 py-20 md:px-16 text-center text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Ücretsiz Başlayın
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
              Dijital dönüşümünüzü
              <br />
              bugün başlatın.
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              SEO analizinden premium temalara, özel geliştirmeden SEO paketlerine kadar her şey tek platformda.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/seo-analyzer">
                <Button size="lg" className="h-12 px-8 rounded-xl bg-white text-primary hover:bg-white/90 font-semibold gap-2 shadow-xl">
                  Ücretsiz SEO Analizi Yap
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="h-12 px-8 rounded-xl text-white hover:bg-white/10 border border-white/20">
                  Bizimle İletişime Geç
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
              {["✓ Kredi kartı gerekmez", "✓ 5 dakikada başlayın", "✓ 500+ memnun müşteri"].map((t) => (
                <span key={t} className="font-medium">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}