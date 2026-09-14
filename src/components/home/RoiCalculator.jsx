import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, ArrowRight, Calculator } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";

const CONVERSION_RATE = 0.03;
const AVG_ORDER = 50;

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toLocaleString("tr-TR");
}

function formatMoney(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + (n / 1000).toFixed(0) + "K";
  return "$" + n.toLocaleString("tr-TR");
}

export default function RoiCalculator() {
  const [visitors, setVisitors] = useState(10000);

  const { projected, currentRevenue, projectedRevenue, uplift } = useMemo(() => {
    const projected = Math.round(visitors * 4);
    const currentRevenue = Math.round(visitors * CONVERSION_RATE * AVG_ORDER);
    const projectedRevenue = Math.round(projected * CONVERSION_RATE * AVG_ORDER);
    return { projected, currentRevenue, projectedRevenue, uplift: projectedRevenue - currentRevenue };
  }, [visitors]);

  const chartData = [
    { name: "Şimdi", value: visitors, fill: "hsl(var(--muted-foreground))" },
    { name: "6 Ay Sonra", value: projected, fill: "hsl(var(--primary))" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-primary mb-5">
            <Calculator className="w-3.5 h-3.5" />
            İnteraktif ROI Hesaplayıcı
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            SEO ile ne kadar
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}>
              kazanacağınızı görün.
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto">
            Aylık ziyaretçi sayınızı girin, 6 ay sonraki projeksiyonu anında hesaplayalım.
          </p>
        </motion.div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-2xl shadow-primary/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Input side */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <Users className="w-4 h-4 text-primary" />
                Aylık Ziyaretçi
              </label>
              <span className="font-heading text-2xl font-bold text-primary">{formatNum(visitors)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
              style={{ background: `linear-gradient(to right, hsl(var(--primary)) ${(visitors / 500000) * 100}%, hsl(var(--muted)) ${(visitors / 500000) * 100}%)` }}
            />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
              <span>1K</span><span>125K</span><span>250K</span><span>375K</span><span>500K</span>
            </div>

            {/* Results */}
            <div className="mt-8 space-y-3">
              <div className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Projekte edilen trafik (6 ay)</div>
                    <div className="font-heading text-lg font-bold">{formatNum(projected)} <span className="text-xs font-normal text-chart-2">/ay</span></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-chart-2 bg-chart-2/10 px-2 py-1 rounded-full">+300%</span>
              </div>

              <div className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Ek gelir artışı (aylık)</div>
                    <div className="font-heading text-lg font-bold text-accent">{formatMoney(uplift)}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">{formatMoney(projectedRevenue)}/ay</span>
              </div>
            </div>

            <Link to="/contact" className="mt-6 block">
              <Button className="w-full h-12 rounded-xl font-semibold gap-2 shadow-lg shadow-primary/20">
                Bu büyümeyi başlat
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Chart side */}
          <div className="glass rounded-3xl p-6">
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Trafik Projeksiyonu</div>
              <div className="font-heading text-xl font-bold">Şimdi vs. 6 Ay Sonra</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} barSize={64}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatNum} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={48} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="glass rounded-xl p-3">
                <div className="text-[11px] text-muted-foreground">Şu anki gelir</div>
                <div className="font-heading font-bold text-sm">{formatMoney(currentRevenue)}/ay</div>
              </div>
              <div className="glass-primary rounded-xl p-3">
                <div className="text-[11px] text-primary">Hedef gelir</div>
                <div className="font-heading font-bold text-sm text-primary">{formatMoney(projectedRevenue)}/ay</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}