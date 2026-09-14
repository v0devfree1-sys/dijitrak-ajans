import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="font-heading text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="font-heading text-2xl font-bold mb-3">Sayfa Bulunamadı</h1>
        <p className="text-muted-foreground mb-8">
          Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Geri Dön
          </Button>
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" /> Ana Sayfa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}