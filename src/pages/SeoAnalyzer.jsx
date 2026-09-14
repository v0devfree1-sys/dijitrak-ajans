import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Loader2, Globe, Shield, Smartphone, FileText, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReportActions from "../components/seo/ReportActions";

function ScoreCard({ title, score, icon: Icon, color }) {
  const getColor = (s) => {
    if (s >= 80) return "text-green-500";
    if (s >= 50) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <Icon className={`w-6 h-6 mx-auto mb-3 ${color || "text-primary"}`} />
        <div className={`font-heading text-3xl font-bold ${getColor(score)}`}>{score}</div>
        <div className="text-xs text-muted-foreground mt-1">{title}</div>
        <Progress value={score} className="mt-3 h-1.5" />
      </CardContent>
    </Card>
  );
}

export default function SeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const analyzeSeo = async () => {
    if (!url) return;
    setLoading(true);
    setReport(null);
    try {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Şu web sitesi URL'sini SEO açısından analiz et: ${url}
      
      Gerçekçi ve detaylı bir SEO raporu oluştur. Aşağıdaki JSON formatında yanıt ver. Puanlar 0-100 arası olsun.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          overall_score: { type: "number" },
          performance_score: { type: "number" },
          accessibility_score: { type: "number" },
          best_practices_score: { type: "number" },
          seo_score: { type: "number" },
          meta_data: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              has_sitemap: { type: "boolean" },
              has_robots: { type: "boolean" },
              is_mobile_friendly: { type: "boolean" },
              has_ssl: { type: "boolean" },
              page_speed: { type: "string" }
            }
          },
          issues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                severity: { type: "string" },
                title: { type: "string" },
                description: { type: "string" }
              }
            }
          },
          recommendations: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    });

    setReport(result);

    await base44.entities.SeoReport.create({
      url,
      overall_score: result.overall_score,
      performance_score: result.performance_score,
      accessibility_score: result.accessibility_score,
      best_practices_score: result.best_practices_score,
      seo_score: result.seo_score,
      meta_data: result.meta_data,
      issues: result.issues,
      recommendations: result.recommendations
    });
    } catch (err) {
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">SEO Analiz Aracı</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Web sitenizin SEO performansını tek tuşla analiz edin ve iyileştirme önerileri alın
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="https://ornek-site.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeSeo()}
              className="pl-11 h-12 rounded-xl text-base"
            />
          </div>
          <Button
            onClick={analyzeSeo}
            disabled={loading || !url}
            className="h-12 px-8 rounded-xl gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Analiz Et
          </Button>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h3 className="font-heading text-lg font-semibold">Site analiz ediliyor...</h3>
            <p className="text-sm text-muted-foreground mt-2">Bu işlem birkaç saniye sürebilir</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report */}
      <AnimatePresence>
        {report && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overall Score */}
            <div className="text-center mb-10">
              <div className={`inline-flex w-28 h-28 rounded-full items-center justify-center border-4 ${
                report.overall_score >= 80 ? "border-green-500" : report.overall_score >= 50 ? "border-chart-3" : "border-destructive"
              }`}>
                <span className="font-heading text-4xl font-bold">{report.overall_score}</span>
              </div>
              <p className="mt-3 font-heading font-semibold text-lg">Genel SEO Puanı</p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <ScoreCard title="Performans" score={report.performance_score} icon={Zap} />
              <ScoreCard title="Erişilebilirlik" score={report.accessibility_score} icon={Smartphone} />
              <ScoreCard title="En İyi Uygulamalar" score={report.best_practices_score} icon={Shield} />
              <ScoreCard title="SEO" score={report.seo_score} icon={Search} />
            </div>

            {/* Meta Data */}
            {report.meta_data && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Site Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Sayfa Başlığı</p>
                      <p className="text-sm font-medium mt-1">{report.meta_data.title || "Belirtilmemiş"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Meta Açıklama</p>
                      <p className="text-sm font-medium mt-1">{report.meta_data.description || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {[
                      { label: "SSL", value: report.meta_data.has_ssl },
                      { label: "Sitemap", value: report.meta_data.has_sitemap },
                      { label: "Robots.txt", value: report.meta_data.has_robots },
                      { label: "Mobil Uyumlu", value: report.meta_data.is_mobile_friendly },
                    ].map((item) => (
                      <Badge
                        key={item.label}
                        variant={item.value ? "default" : "destructive"}
                        className="gap-1"
                      >
                        {item.value ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {item.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Issues */}
            {report.issues?.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-chart-3" />
                    Tespit Edilen Sorunlar ({report.issues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.issues.map((issue, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="flex items-start gap-3">
                          <Badge
                            variant={issue.severity === "critical" ? "destructive" : issue.severity === "warning" ? "default" : "secondary"}
                            className="text-xs mt-0.5"
                          >
                            {issue.severity === "critical" ? "Kritik" : issue.severity === "warning" ? "Uyarı" : "Bilgi"}
                          </Badge>
                          <div>
                            <p className="font-medium text-sm">{issue.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {report.recommendations?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Öneriler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* PDF + Email actions */}
            <ReportActions report={report} url={url} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}