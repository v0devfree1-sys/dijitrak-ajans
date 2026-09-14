import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, ShoppingCart, Eye, Palette, Plug, BarChart3, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const typeFilters = [
  { value: "all", label: "Tümü", icon: null },
  { value: "theme", label: "Temalar", icon: Palette },
  { value: "plugin", label: "Eklentiler", icon: Plug },
  { value: "seo_package", label: "SEO Paketleri", icon: BarChart3 },
];

const categoryLabels = {
  wordpress: "WordPress",
  shopify: "Shopify",
  react: "React",
  nextjs: "Next.js",
  analytics: "Analitik",
  performance: "Performans",
  security: "Güvenlik",
  marketing: "Pazarlama",
};

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list("-created_date", 100),
  });

  const filteredProducts = products.filter((p) => {
    const matchesType = activeType === "all" || p.type === activeType;
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch && p.status === "active";
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Mağaza</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Premium temalar, güçlü eklentiler ve SEO paketleri ile projenizi güçlendirin
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <Tabs value={activeType} onValueChange={setActiveType}>
          <TabsList className="bg-muted">
            {typeFilters.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="gap-1.5">
                {f.icon && <f.icon className="w-3.5 h-3.5" />}
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold">Ürün bulunamadı</h3>
          <p className="text-sm text-muted-foreground mt-1">Farklı filtreler deneyin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {product.type === "theme" && <Palette className="w-12 h-12 text-primary/30" />}
                      {product.type === "plugin" && <Plug className="w-12 h-12 text-accent/50" />}
                      {product.type === "seo_package" && <BarChart3 className="w-12 h-12 text-chart-3/50" />}
                    </div>
                  )}
                  {product.is_featured && (
                    <Badge className="absolute top-3 left-3 bg-chart-3 text-white">Öne Çıkan</Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-3 right-3 capitalize">
                    {product.type === "theme" ? "Tema" : product.type === "plugin" ? "Eklenti" : "SEO Paket"}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-semibold text-lg line-clamp-1">{product.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {product.category && (
                      <Badge variant="outline" className="text-xs">
                        {categoryLabels[product.category] || product.category}
                      </Badge>
                    )}
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-chart-3 text-chart-3" />
                        {product.rating}
                      </div>
                    )}
                    {product.sales_count > 0 && (
                      <span className="text-xs text-muted-foreground">{product.sales_count} satış</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-primary">${product.price}</span>
                    <div className="flex gap-2">
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg gap-1">
                          <Eye className="w-4 h-4" /> İncele
                        </Button>
                      </Link>
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm" className="rounded-lg gap-1">
                          <ShoppingCart className="w-4 h-4" />
                          Satın Al
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}