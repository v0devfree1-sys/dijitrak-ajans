import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Zap, Globe, ShoppingCart, Smartphone, Code2, Layers, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = [
  { value: "landing", label: "Landing Page", base: 500, icon: Globe, desc: "Tek sayfalık pazarlama sitesi" },
  { value: "corporate", label: "Kurumsal Site", base: 2000, icon: Layers, desc: "Çok sayfalı şirket sitesi" },
  { value: "ecommerce", label: "E-Ticaret", base: 5000, icon: ShoppingCart, desc: "Ürün satış platformu" },
  { value: "webapp", label: "Web Uygulaması", base: 8000, icon: Code2, desc: "SaaS veya dashboard" },
  { value: "mobile", label: "Mobil Uygulama", base: 10000, icon: Smartphone, desc: "iOS & Android" },
  { value: "custom", label: "Özel Proje", base: 3000, icon: Sparkles, desc: "Tamamen özelleştirilmiş" },
];

const addons = [
  { id: "seo", label: "SEO Optimizasyonu", price: 800, desc: "Anahtar kelime analizi" },
  { id: "cms", label: "CMS Entegrasyonu", price: 600, desc: "İçerik yönetim sistemi" },
  { id: "analytics", label: "Analitik Dashboard", price: 500, desc: "Google Analytics & raporlama" },
  { id: "multilang", label: "Çoklu Dil", price: 1000, desc: "Farklı dil seçenekleri" },
  { id: "payment", label: "Ödeme Sistemi", price: 1500, desc: "Kart & havale entegrasyonu" },
  { id: "auth", label: "Kullanıcı Sistemi", price: 700, desc: "Kayıt, giriş, profil" },
  { id: "api", label: "API Entegrasyonu", price: 1200, desc: "3. parti servisler" },
  { id: "hosting", label: "1 Yıl Hosting", price: 300, desc: "Yüksek performanslı sunucu" },
];

const designLevels = [
  { key: "basic", label: "Basit", multiplier: 0.7, color: "text-muted-foreground" },
  { key: "standard", label: "Standart", multiplier: 1.0, color: "text-foreground" },
  { key: "premium", label: "Premium", multiplier: 1.5, color: "text-primary" },
  { key: "luxury", label: "Lüks", multiplier: 2.2, color: "text-chart-3", badge: "🔥" },
];

export default function PricingCalculator() {
  const [projectType, setProjectType] = useState("corporate");
  const [pageCount, setPageCount] = useState([5]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [designLevel, setDesignLevel] = useState("standard");

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const basePrice = useMemo(() => {
    const base = projectTypes.find((p) => p.value === projectType)?.base || 0;
    const dm = designLevels.find((d) => d.key === designLevel)?.multiplier || 1;
    return Math.round(base * (1 + (pageCount[0] - 1) * 0.08) * dm);
  }, [projectType, pageCount, designLevel]);

  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      return sum + (addons.find((a) => a.id === id)?.price || 0);
    }, 0);
  }, [selectedAddons]);

  const totalPrice = basePrice + addonsTotal;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative border-b border-border bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-sm mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-background/70">Anında fiyat tahmini</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-background mb-4">Fiyat Hesaplayıcı</h1>
          <p className="text-background/50 max-w-lg mx-auto">Projenize özel detaylı fiyat tahmini alın. Seçimlerinize göre anlık güncellenir.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Type */}
            <div>
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
                Proje Türü
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const active = projectType === type.value;
                  return (
                    <motion.button
                      key={type.value}
                      onClick={() => setProjectType(type.value)}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 ${active ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" : "border-border hover:border-primary/30 bg-card"}`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <div className={`font-semibold text-sm ${active ? "text-primary" : ""}`}>{type.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{type.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Page Count */}
            <div>
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                Sayfa Sayısı
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Kaç sayfa?</span>
                  <Badge className="font-heading text-base px-3 py-1">{pageCount[0]}</Badge>
                </div>
                <Slider value={pageCount} onValueChange={setPageCount} min={1} max={30} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-3">
                  <span>1 sayfa</span>
                  <span>30 sayfa</span>
                </div>
              </div>
            </div>

            {/* Design Level */}
            <div>
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
                Tasarım Seviyesi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {designLevels.map((d) => {
                  const active = designLevel === d.key;
                  return (
                    <motion.button
                      key={d.key}
                      onClick={() => setDesignLevel(d.key)}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-2xl border text-center transition-all duration-200 ${active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30 bg-card"}`}
                    >
                      {d.badge && <div className="text-base mb-1">{d.badge}</div>}
                      <div className={`font-semibold text-sm ${active ? "text-primary" : d.color}`}>{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">x{d.multiplier}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Addons */}
            <div>
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">4</span>
                Eklentiler
                {selectedAddons.length > 0 && <Badge variant="secondary" className="ml-2">{selectedAddons.length} seçili</Badge>}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <motion.button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 ${active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30 bg-card"}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${active ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                        {active && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{addon.label}</span>
                          <span className={`text-sm font-heading font-bold ${active ? "text-primary" : "text-muted-foreground"}`}>+${addon.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{addon.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Main price card */}
              <div className="rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
                <div className="bg-foreground p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 70%)` }} />
                  <div className="relative">
                    <div className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-2">Tahmini Fiyat</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={totalPrice}
                        initial={{ scale: 0.7, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="font-heading text-6xl font-black text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                      >
                        ${totalPrice.toLocaleString()}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-xs text-background/40 mt-2">KDV hariç tahmini</div>
                  </div>
                </div>

                <div className="bg-card p-6">
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Temel Fiyat</span>
                      <span className="font-heading font-semibold">${basePrice.toLocaleString()}</span>
                    </div>
                    {selectedAddons.map((id) => {
                      const addon = addons.find((a) => a.id === id);
                      return addon ? (
                        <div key={id} className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-primary" />{addon.label}</span>
                          <span className="font-medium">+${addon.price}</span>
                        </div>
                      ) : null;
                    })}
                    {addonsTotal > 0 && (
                      <div className="flex justify-between items-center py-2 border-t border-border">
                        <span className="text-muted-foreground">Eklentiler Toplamı</span>
                        <span className="font-heading font-semibold">+${addonsTotal.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <Link to="/contact">
                    <Button className="w-full rounded-xl h-12 gap-2 text-sm font-semibold shadow-lg shadow-primary/20">
                      Teklif Al
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-3">Ücretsiz danışmanlık görüşmesi dahil</p>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                {[
                  { label: "Teslim Süresi", value: `${Math.max(1, Math.round(pageCount[0] * 0.5))} Hafta` },
                  { label: "Revizyon Hakkı", value: "Sınırsız" },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-2xl p-4">
                    <div className="font-heading text-lg font-bold">{item.value}</div>
                    <div className="text-muted-foreground mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}