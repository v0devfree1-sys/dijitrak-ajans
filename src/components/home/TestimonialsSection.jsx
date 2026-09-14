import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Ahmet Yılmaz", role: "E-Ticaret Yöneticisi", company: "TrendStore", text: "DigiAjans ile organik trafiğimiz %300 arttı. SEO paketleri gerçekten işe yarıyor. Kesinlikle tavsiye ediyorum.", rating: 5, avatar: "AY", color: "from-primary to-primary/60" },
  { name: "Elif Kaya", role: "Startup Kurucusu", company: "TechLaunch", text: "Tema mağazasından aldığımız temalar ile sitemizi hızlıca kurarak pazara çıktık. İnanılmaz kalite ve destek.", rating: 5, avatar: "EK", color: "from-accent to-accent/60" },
  { name: "Mehmet Demir", role: "Dijital Pazarlama Müdürü", company: "MediaGroup", text: "Özel proje sürecinde inanılmaz profesyonellik gösterdiler. Zamanında teslim, bütçe dahilinde — hayran kaldım.", rating: 5, avatar: "MD", color: "from-chart-4 to-chart-4/60" },
  { name: "Selin Bulut", role: "Girişimci", company: "CloudRetail", text: "SEO analizci gerçekten hayat kurtarıcı. Sitenin sorunlarını tek tuşla gördük ve çözdük. Harika araç!", rating: 5, avatar: "SB", color: "from-chart-2 to-chart-2/60" },
  { name: "Oğuz Tekin", role: "CTO", company: "DevForce", text: "Plugin kalitesi rakipsiz. SpeedBoost eklentisinden sonra sitemizin Core Web Vitals skorları dramatik arttı.", rating: 5, avatar: "OT", color: "from-primary to-accent" },
  { name: "Ayşe Çelik", role: "İçerik Direktörü", company: "ContentHub", text: "Fiyat-performans açısından piyasanın en iyisi. Profesyonel ekip, hızlı dönüşler ve kaliteli sonuçlar.", rating: 5, avatar: "AÇ", color: "from-chart-5 to-chart-5/60" },
  { name: "Burak Arslan", role: "Ürün Müdürü", company: "StartupBase", text: "Hem hız hem kalite konusunda beklentileri aştılar. Tekrar çalışmaktan memnuniyet duyarım.", rating: 5, avatar: "BA", color: "from-destructive/80 to-chart-4" },
  { name: "Zeynep Öztürk", role: "CEO", company: "DigitalCo", text: "Dashboard ile tüm SEO metriklerimi tek ekranda görüyorum. Müthiş bir zaman tasarrufu.", rating: 5, avatar: "ZÖ", color: "from-accent to-primary" },
];

function TestimonialCard({ item }) {
  return (
    <div className="flex-shrink-0 w-80 rounded-2xl border border-border bg-card p-6 mx-3 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex gap-0.5 mb-4">
        {Array(item.rating).fill(0).map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-chart-3 text-chart-3" />
        ))}
      </div>
      <Quote className="w-5 h-5 text-primary/20 mb-3" />
      <p className="text-sm leading-relaxed text-foreground mb-5">"{item.text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center font-heading font-bold text-[11px] text-white shadow-sm`}>
          {item.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.role} · {item.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Referanslar</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            500+ işletme{" "}
            <span className="text-muted-foreground">bize güveniyor.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm">
            Müşterilerimizin gerçek deneyimlerini okuyun.
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} item={t} />
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: [-1920, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
            <TestimonialCard key={i} item={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}