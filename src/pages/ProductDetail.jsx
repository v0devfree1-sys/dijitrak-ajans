import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import RelatedProducts from "../components/product/RelatedProducts";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Star, ShoppingCart, Eye, Check, ArrowLeft, Palette, Plug, BarChart3, Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const typeLabels = { theme: "Tema", plugin: "Eklenti", seo_package: "SEO Paketi" };
const categoryLabels = {
  wordpress: "WordPress", shopify: "Shopify", react: "React", nextjs: "Next.js",
  analytics: "Analitik", performance: "Performans", security: "Güvenlik", marketing: "Pazarlama",
};

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [purchasing, setPurchasing] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => base44.entities.Product.filter({ id }),
    select: (data) => data[0],
  });

  const handlePurchase = async () => {
    if (!product) return;
    setPurchasing(true);
    await base44.entities.Order.create({
      product_id: product.id,
      product_title: product.title,
      product_type: product.type,
      amount: product.price,
      status: "completed",
    });
    await base44.entities.Product.update(product.id, {
      sales_count: (product.sales_count || 0) + 1,
    });
    queryClient.invalidateQueries({ queryKey: ["product", id] });
    setPurchasing(false);
    toast({ title: "Satın alma başarılı!", description: `${product.title} hesabınıza eklendi.` });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="text-muted-foreground">Ürün bulunamadı.</p>
        <Link to="/marketplace"><Button variant="outline" className="mt-4">Mağazaya Dön</Button></Link>
      </div>
    );
  }

  const TypeIcon = product.type === "theme" ? Palette : product.type === "plugin" ? Plug : BarChart3;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Mağazaya Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <TypeIcon className="w-20 h-20 text-primary/30" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary">{typeLabels[product.type] || product.type}</Badge>
            {product.category && (
              <Badge variant="outline">{categoryLabels[product.category] || product.category}</Badge>
            )}
            {product.is_featured && (
              <Badge className="bg-chart-3 text-white">Öne Çıkan</Badge>
            )}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>

          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            {product.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-chart-3 text-chart-3" />
                {product.rating} puan
              </span>
            )}
            {product.sales_count > 0 && (
              <span>{product.sales_count} satış</span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {product.features?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-heading font-semibold mb-3">Özellikler</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="mb-6" />

          <div className="flex items-center justify-between mb-6">
            <span className="font-heading text-4xl font-bold text-primary">${product.price}</span>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 h-12 rounded-xl gap-2 text-base"
              onClick={handlePurchase}
              disabled={purchasing}
            >
              {purchasing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
              Satın Al
            </Button>
            {product.demo_url && (
              <Button variant="outline" className="h-12 rounded-xl gap-2" asChild>
                <a href={product.demo_url} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-5 h-5" /> Demo
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <RelatedProducts currentId={id} type={product.type} />
    </div>
  );
}