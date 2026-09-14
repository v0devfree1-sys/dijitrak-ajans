import React from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, BarChart2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Analiz",
    desc: "Sitenizi ve rakiplerinizi derinlemesine analiz ediyoruz. Fırsatları ve zayıf noktaları tespit ediyoruz.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strateji",
    desc: "Veriye dayalı, özelleştirilmiş bir dijital strateji oluşturuyoruz. Her adım ölçülüp planlanıyor.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Uygulama",
    desc: "Hızlı ve hatasız uygulama. Temalar, eklentiler veya özel geliştirme — tam zamanında teslim.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    icon: BarChart2,
    number: "04",
    title: "Büyüme",
    desc: "Sonuçları ölçüp raporluyoruz. Sürekli iyileştirme ile dijital büyümenizi kalıcı hale getiriyoruz.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-28 bg-foreground text-background overflow-hidden relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Süreç</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-background">
            4 adımda dijital
            <br />
            <span className="text-background/50">başarınız garantili.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 22 }}
              className="group relative p-8 bg-foreground hover:bg-background/5 transition-colors overflow-hidden"
            >
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${step.bg}`} />
              <div className="font-heading text-7xl font-black text-background/5 absolute top-6 right-6 leading-none select-none group-hover:text-background/10 transition-colors">
                {step.number}
              </div>
              <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>
              <h3 className="font-heading text-xl font-bold text-background mb-3">{step.title}</h3>
              <p className="text-sm text-background/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}