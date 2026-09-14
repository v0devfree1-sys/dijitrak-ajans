import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CheckCircle2, AlertCircle, XCircle, Loader2, Globe, Shield, Zap, TrendingUp } from "lucide-react";

const metrics = [
  { label: "SEO Skoru", key: "seo_score", color: "text-primary", icon: TrendingUp },
  { label: "Performans", key: "performance_score", color: "text-accent", icon: Zap },
  { label: "Erişilebilirlik", key: "accessibility_score", color: "text-chart-2", icon: Shield },
  { label: "En İyi Uygulamalar", key: "best_practices_score", color: "text-chart-4", icon: CheckCircle2 },
];

function ScoreRing({ score, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score || 0, 100) / 100;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
      <motion.circle
        cx="36" cy="36" r={r} fill="none"
        stroke={`hsl(var(--${color.replace("text-", "")}))`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - pct * circ }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function SeoSummarySection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await base44.integrations.Core.InvokeLLM({
      prompt: `Perform a quick SEO audit for the website: ${url}. Return realistic scores and 3 key issues.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          seo_score: { type: "number" },
          performance_score: { type: "number" },
          accessibility_score: { type: "number" },
          best_practices_score: { type: "number" },
          overall_score: { type: "number" },
          top_issues: { type: "array", items: { type: "object", properties: { severity: { type: "string" }, title: { type: "string" } } } },
          summary: { type: "string" },
        },
      },
    });
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Anlık Analiz</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-background">
            Sitenizin SEO skoru
            <br />
            <span className="text-background/40">kaç puan?</span>
          </h2>
          <p className="mt-4 text-background/50 max-w-lg mx-auto">URL girin, yapay zeka sitenizi anında analiz etsin.</p>
        </motion.div>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/30" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              placeholder="https://siteniz.com"
              className="w-full h-14 pl-11 pr-4 rounded-2xl bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:outline-none focus:border-primary text-sm backdrop-blur-sm"
            />
          </div>
          <Button onClick={analyze} disabled={loading} size="lg" className="h-14 px-8 rounded-2xl font-semibold gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Analiz ediliyor..." : "Analiz Et"}
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-dark rounded-3xl p-8 shadow-2xl shadow-primary/10">
              {/* Score overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {metrics.map((m) => (
                  <div key={m.key} className="text-center">
                    <div className="relative inline-block mb-2">
                      <ScoreRing score={result[m.key]} color={m.color} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`font-heading text-lg font-bold ${m.color}`}>{result[m.key] || 0}</span>
                      </div>
                    </div>
                    <div className="text-xs text-background/60">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {result.summary && (
                <p className="text-sm text-background/70 leading-relaxed mb-6 border-t border-background/10 pt-6">{result.summary}</p>
              )}

              {/* Issues */}
              {result.top_issues?.length > 0 && (
                <div className="space-y-2 mb-6">
                  {result.top_issues.map((issue, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      {issue.severity === "high" ? <XCircle className="w-4 h-4 text-destructive flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-chart-3 flex-shrink-0" />}
                      <span className="text-background/80">{issue.title}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/seo-analyzer">
                <Button className="gap-2 rounded-xl">Tam Raporu Gör <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && (
          <div className="text-center text-background/30 text-sm">
            veya{" "}
            <Link to="/seo-analyzer" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              gelişmiş SEO analizine git →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}