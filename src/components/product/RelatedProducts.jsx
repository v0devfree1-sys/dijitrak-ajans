import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Palette, Plug, BarChart3 } from "lucide-react";

const typeLabels = { theme: "Tema", plugin: "Eklenti", seo_package: "SEO Paketi" };

export default function RelatedProducts({ currentId, type }) {
  const { data: products = [] } = useQuery({
    queryKey: ["related-products", type],
    queryFn: () => base44.entities.Product.filter({ type, status: "active" }, "-sales_count", 4),
    enabled: !!type,
  });

  const related = products.filter((p) => p.id !== currentId).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mb-14">
      <h2 className="font-heading text-2xl font-bold mb-6">Benzer Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((product) => {
          const TypeIcon = product.type === "theme" ? Palette : product.type === "plugin" ? Plug : BarChart3;
          return (
            <div key={product.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <TypeIcon className="w-10 h-10 text-primary/30" />
                  </div>
                )}
                <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                  {typeLabels[product.type]}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold line-clamp-1 mb-1">{product.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-primary">${product.price}</span>
                    {product.rating > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-chart-3 text-chart-3" />{product.rating}
                      </span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Button size="sm" variant="outline" className="rounded-lg text-xs">İncele</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}