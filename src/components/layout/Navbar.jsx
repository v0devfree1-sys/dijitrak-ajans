import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, Search } from "lucide-react";
import ScrollProgress from "./ScrollProgress";
import ThemeToggle from "../ThemeToggle";

const openPalette = () => window.dispatchEvent(new Event("open-command-palette"));

const navLinks = [
  { label: "Ana Sayfa", path: "/" },
  { label: "Mağaza", path: "/marketplace" },
  { label: "SEO Analiz", path: "/seo-analyzer" },
  { label: "Fiyat Hesapla", path: "/pricing" },
  { label: "İletişim", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <ScrollProgress />
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "glass-strong shadow-lg shadow-primary/5"
        : "bg-background/40 backdrop-blur-md border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">NexusGrowth</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={openPalette}
              className="flex items-center gap-2 h-8 px-3 rounded-lg text-sm text-muted-foreground bg-muted/50 hover:bg-muted border border-border/60 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Ara</span>
              <kbd className="ml-1 hidden lg:inline-flex items-center gap-0.5 px-1.5 h-5 rounded border border-border bg-background text-[10px] font-medium">⌘K</kbd>
            </button>
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Yönetim
              </Button>
            </Link>
            <Link to="/seo-analyzer">
              <Button size="sm" className="rounded-lg h-8 px-4 text-xs font-semibold shadow-sm shadow-primary/20 gap-1.5">
                <Zap className="w-3 h-3" />
                SEO Analizi
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-10">
              <Link to="/" className="flex items-center gap-2 mb-8 px-2">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold">NexusGrowth</span>
              </Link>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border mt-2">
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-xl" size="sm">Yönetim Paneli</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
    </>
  );
}