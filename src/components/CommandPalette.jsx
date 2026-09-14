import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
} from "@/components/ui/command";
import {
  Home, Store, Search, Calculator, Mail, LayoutDashboard, Zap, Sparkles, ArrowRight, Compass,
} from "lucide-react";

const groups = [
  {
    heading: "Sayfalar",
    items: [
      { label: "Ana Sayfa", icon: Home, path: "/", keywords: "home main başlangıç" },
      { label: "Mağaza", icon: Store, path: "/marketplace", keywords: "marketplace themes plugins tema eklenti" },
      { label: "SEO Analiz", icon: Search, path: "/seo-analyzer", keywords: "seo audit analiz rapor" },
      { label: "Fiyat Hesapla", icon: Calculator, path: "/pricing", keywords: "price quote teklif fiyat" },
      { label: "İletişim", icon: Mail, path: "/contact", keywords: "contact iletişim ulaş" },
      { label: "Yönetim Paneli", icon: LayoutDashboard, path: "/admin", keywords: "admin dashboard yönetim" },
    ],
  },
  {
    heading: "Hızlı Aksiyonlar",
    items: [
      { label: "SEO Analizi Başlat", icon: Zap, path: "/seo-analyzer", keywords: "analyze seo hızlı" },
      { label: "Tema & Eklenti Keşfet", icon: Compass, path: "/marketplace", keywords: "browse explore keşfet" },
      { label: "Özel Proje Teklifi Al", icon: Sparkles, path: "/pricing", keywords: "custom project teklif" },
      { label: "Bizimle İletişime Geç", icon: ArrowRight, path: "/contact", keywords: "contact ulaş" },
    ],
  },
];

function Kbd({ children }) {
  return (
    <kbd className="min-w-[1.25rem] h-5 px-1 inline-flex items-center justify-center rounded-md border border-border bg-muted/60 text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openEvt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", openEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openEvt);
    };
  }, []);

  const run = (path) => {
    setOpen(false);
    navigate(path);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center" onMouseDown={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150" />
      <div
        className="relative mt-[14vh] w-full max-w-xl mx-4 animate-in fade-in zoom-in-95 duration-150"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Command className="glass-strong rounded-2xl shadow-2xl shadow-black/40 border border-border/60 overflow-hidden">
          <CommandInput placeholder="Bir komut yazın veya sayfa arayın..." autoFocus />
          <CommandList className="max-h-[420px]">
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
            {groups.map((g) => (
              <CommandGroup key={g.heading} heading={g.heading}>
                {g.items.map((item) => (
                  <CommandItem
                    key={item.label}
                    value={`${item.label} ${item.keywords}`}
                    onSelect={() => run(item.path)}
                    className="rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-2.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <div className="border-t border-border/60 px-3 py-2 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd> gezin</span>
              <span className="flex items-center gap-1"><Kbd>↵</Kbd> seç</span>
            </div>
            <span className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd> kapat</span>
          </div>
        </Command>
      </div>
    </div>
  );
}