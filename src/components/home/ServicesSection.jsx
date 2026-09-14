import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "SEO Optimizasyonu",
    desc: "Yapay zeka destekli analiz aracımızla sitenizin teknik sorunlarını tespit edin, rakiplerinizi analiz edin ve Google'da üst sıralara çıkın.",
    tags: ["Teknik SEO", "İçerik Analizi", "Backlink"],
    href: "/seo-analyzer",
    color: "from-primary/10 to-primary/5",
  },
  {
    number: "02",
    title: "Premium Temalar",
    desc: "WordPress, Shopify ve React ekosistemi için hazırlanmış hız odaklı, dönüşüm optimize temalar. Kurulum desteği dahil.",
    tags: ["WordPress", "Shopify", "React"],
    href: "/marketplace",
    color: "from-accent/10 to-accent/5",
  },
  {
    number: "03",
    title: "Güçlü Eklentiler",
    desc: "Güvenlik, performans ve pazarlama kategorilerinde sitenizin ihtiyaç duyduğu tüm eklentiler tek çatı altında.",
    tags: ["Güvenlik", "Performans", "Pazarlama"],
    href: "/marketplace",
    color: "from-chart-4/10 to-chart-4/5",
  },
  {
    number: "04",
    title: "Özel Proje Geliştirme",
    desc: "İşletmenize özel web sitesi, e-ticaret altyapısı veya SaaS ürünü geliştirme. Fikrinizi gerçeğe dönüştürüyoruz.",
    tags: ["Web App", "E-Ticaret", "SaaS"],
    href: "/contact",
    color: "from-chart-2/10 to-chart-2/5",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Hizmetler</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            İşletmenizi büyütmek için
            <br />
            <span className="text-muted-foreground">ihtiyacınız olan her şey.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={s.href}
                className="group glass flex flex-col sm:flex-row sm:items-center gap-6 p-8 rounded-2xl hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="font-heading text-5xl font-bold text-muted-foreground/20 group-hover:text-muted-foreground/30 transition-colors w-16 flex-shrink-0">
                  {s.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full border border-border bg-background text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}