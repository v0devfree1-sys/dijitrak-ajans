import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const projectTypes = [
  { value: "website", label: "Web Sitesi" },
  { value: "ecommerce", label: "E-Ticaret" },
  { value: "mobile_app", label: "Mobil Uygulama" },
  { value: "seo_optimization", label: "SEO Optimizasyonu" },
  { value: "redesign", label: "Yeniden Tasarım" },
  { value: "custom", label: "Özel Proje" },
];

const budgetRanges = [
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000-50000", label: "$25,000 - $50,000" },
  { value: "50000+", label: "$50,000+" },
];

const timelines = [
  { value: "1-2_weeks", label: "1-2 Hafta" },
  { value: "2-4_weeks", label: "2-4 Hafta" },
  { value: "1-2_months", label: "1-2 Ay" },
  { value: "2-3_months", label: "2-3 Ay" },
  { value: "3+_months", label: "3+ Ay" },
];

const featureOptions = [
  "Responsive Tasarım",
  "SEO Optimizasyonu",
  "CMS Entegrasyonu",
  "Ödeme Sistemi",
  "Kullanıcı Girişi",
  "API Entegrasyonu",
  "Çoklu Dil",
  "Analitik",
];

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    project_type: "",
    budget_range: "",
    timeline: "",
    description: "",
    features_needed: [],
  });

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      features_needed: prev.features_needed.includes(feature)
        ? prev.features_needed.filter((f) => f !== feature)
        : [...prev.features_needed, feature],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.project_type) {
      toast({ title: "Lütfen gerekli alanları doldurun", variant: "destructive" });
      return;
    }
    setLoading(true);
    await base44.entities.ProjectRequest.create(form);
    setLoading(false);
    setSubmitted(true);
    toast({ title: "Talebiniz başarıyla gönderildi!" });
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </motion.div>
        <h2 className="font-heading text-2xl font-bold mb-3">Talebiniz Alındı!</h2>
        <p className="text-muted-foreground mb-6">
          En kısa sürede sizinle iletişime geçeceğiz. Genellikle 24 saat içinde dönüş yapıyoruz.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">Yeni Talep Oluştur</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Proje Talebi</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Projeniz hakkında bilgi verin, size özel teklif hazırlayalım
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Adınız" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" className="mt-1.5 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Şirket</Label>
                    <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Şirket adı" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label>Proje Türü *</Label>
                    <Select value={form.project_type} onValueChange={(v) => setForm({ ...form, project_type: v })}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Bütçe Aralığı</Label>
                    <Select value={form.budget_range} onValueChange={(v) => setForm({ ...form, budget_range: v })}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((b) => (<SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Zaman Çizelgesi</Label>
                    <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        {timelines.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>İhtiyaç Duyulan Özellikler</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {featureOptions.map((feature) => (
                      <label key={feature} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={form.features_needed.includes(feature)} onCheckedChange={() => toggleFeature(feature)} />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="desc">Proje Açıklaması</Label>
                  <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Projeniz hakkında detaylı bilgi verin..." className="mt-1.5 rounded-xl h-32" />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Talebi Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Mail, title: "E-posta", value: "info@nexusgrowth.com" },
            { icon: Phone, title: "Telefon", value: "+90 212 555 0000" },
            { icon: MapPin, title: "Adres", value: "İstanbul, Türkiye" },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="font-medium text-sm mt-0.5">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}