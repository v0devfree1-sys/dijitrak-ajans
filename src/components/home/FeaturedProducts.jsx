import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Palette, Plug, BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const typeLabels = { theme: "Tema", plugin: "Eklenti", seo_package: "SEO Paketi" };
const typeColors = { theme: "text-primary bg-primary/10", plugin: "text-accent bg-accent/10", seo_package: "text-chart-4 bg-chart-4/10" };

export default function FeaturedProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => base44.entities.Product.filter({ is_featured: true, status: "active" }, "-sales_count", 6),
  });

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Mağaza</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">Öne Çıkan Ürünler</h2>
            <p className="mt-3 text-muted-foreground">En çok tercih edilen tema ve eklentiler</p>
          </motion.div>
          <Link to="/marketplace" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
            Tümünü Gör
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => {
            const TypeIcon = product.type === "theme" ? Palette : product.type === "plugin" ? Plug : BarChart3;
            const colorClass = typeColors[product.type] || "text-primary bg-primary/10";
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center`}>
                      <TypeIcon className="w-14 h-14 text-muted-foreground/20" />
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                    {typeLabels[product.type]}
                  </span>
                  {product.sales_count > 100 && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                      <TrendingUp className="w-3 h-3" /> Popüler
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-base mb-1.5 line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-5">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-heading text-2xl font-bold">${product.price}</span>
                      {product.rating > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          <Star className="w-3 h-3 fill-chart-3 text-chart-3" />
                          {product.rating}
                        </span>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" className="rounded-lg h-8 px-4 text-xs shadow-sm">İncele</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/marketplace">
            <Button variant="outline" className="gap-2 rounded-xl">Tüm Ürünler <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}