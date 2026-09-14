import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Başlangıç",
    price: 299,
    period: "/ay",
    description: "Küçük işletmeler için temel SEO paketi",
    features: [
      "Haftalık SEO raporu",
      "5 anahtar kelime takibi",
      "Temel site analizi",
      "E-posta desteği",
    ],
    popular: false,
    cta: "Başla",
  },
  {
    name: "Profesyonel",
    price: 799,
    period: "/ay",
    description: "Büyüyen işletmeler için gelişmiş SEO",
    features: [
      "Günlük SEO raporu",
      "25 anahtar kelime takibi",
      "Rakip analizi",
      "İçerik optimizasyonu",
      "Backlink analizi",
      "Öncelikli destek",
    ],
    popular: true,
    cta: "En Popüler Seçenek",
  },
  {
    name: "Kurumsal",
    price: 1999,
    period: "/ay",
    description: "Büyük ölçekli SEO stratejisi",
    features: [
      "Anlık SEO monitörleme",
      "Sınırsız anahtar kelime",
      "Tam rakip analizi",
      "İçerik stratejisi",
      "Teknik SEO denetimi",
      "Özel danışman",
      "7/24 destek",
    ],
    popular: false,
    cta: "Bize Ulaşın",
  },
];

export default function SeoPricingSection() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Fiyatlandırma</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            İşletmenize özel{" "}
            <span className="text-muted-foreground">SEO paketi.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto">
            Her ölçekteki işletme için hazırlanmış SEO planları. İstediğiniz zaman geçiş yapın.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                pkg.popular
                  ? "border border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/25 md:scale-[1.04]"
                  : "glass hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg">
                  <Zap className="w-3 h-3" /> En Çok Tercih Edilen
                </div>
              )}

              {/* Name & desc */}
              <div className="mb-7">
                <h3 className="font-heading text-xl font-bold mb-1">{pkg.name}</h3>
                <p className={`text-sm ${pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {pkg.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1 mb-8">
                <span className="font-heading text-5xl font-bold">${pkg.price}</span>
                <span className={`text-sm mb-2 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {pkg.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-white/20" : "bg-primary/10"}`}>
                      <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-primary"}`} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/contact">
                <Button
                  className={`w-full rounded-xl h-11 font-semibold ${
                    pkg.popular
                      ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                      : ""
                  }`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  {pkg.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}