import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const links = {
  Hizmetler: [
    { label: "SEO Analizi", to: "/seo-analyzer" },
    { label: "Tema & Eklentiler", to: "/marketplace" },
    { label: "Fiyat Hesaplama", to: "/pricing" },
    { label: "Özel Projeler", to: "/contact" },
  ],
  Kurumsal: [
    { label: "Ana Sayfa", to: "/" },
    { label: "İletişim", to: "/contact" },
    { label: "Yönetim Paneli", to: "/admin" },
    { label: "SEO Analiz Aracı", to: "/seo-analyzer" },
  ],
};

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulated subscription — replace with a real entity/backend when ready
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setEmail("");
    toast({ title: "Bültene abone oldunuz!", description: "Artık yeni içeriklerden ilk siz haberdar olacaksınız." });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-background">NexusGrowth</span>
            </Link>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              Dijital dünyada markanızı zirveye taşıyoruz. AI destekli SEO, premium temalar ve özel geliştirme çözümleri.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {([Twitter, Linkedin, Github, Mail]).map((SocialIcon, i) => (
                <a key={i} href="#" aria-label="Sosyal medya" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                  <SocialIcon className="w-4 h-4 text-background/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm text-background mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-background/50 hover:text-background transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-semibold text-sm text-background mb-4">Bültene Katıl</h4>
            <p className="text-sm text-background/50 mb-4">
              SEO ipuçları ve yeni ürünlerden ilk siz haberdar olun.
            </p>
            <form onSubmit={subscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/30" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="pl-10 rounded-xl bg-background/10 border-background/20 text-background placeholder:text-background/40"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-xl gap-1.5">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? "Gönderiliyor..." : "Abone Ol"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/40">
          <span>© 2026 NexusGrowth. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Tüm sistemler aktif</span>
          </div>
        </div>
      </div>
    </footer>
  );
}