import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Download, Send, Loader2, Mail } from "lucide-react";
import { downloadSeoPdf, getSeoPdfBlob } from "@/utils/seoPdfReport";

/**
 * Action bar for an SEO report: download a branded PDF or email it to a client.
 */
export default function ReportActions({ report, url }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      downloadSeoPdf(report, url);
      toast({ title: "PDF indirildi", description: "Rapor başarıyla oluşturuldu." });
    } catch (e) {
      toast({ title: "Hata", description: "PDF oluşturulamadı.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  const handleSend = async () => {
    if (!email.trim()) return;
    setSending(true);
    try {
      const blob = await getSeoPdfBlob(report, url);
      const file = new File([blob], "SEO-Raporu.pdf", { type: "application/pdf" });
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      const overall = report.overall_score || 0;
      const grade = overall >= 80 ? "Mükemmel" : overall >= 60 ? "İyi" : overall >= 40 ? "Orta" : "Geliştirilmeli";
      const issuesCount = report.issues?.length || 0;
      const recs = (report.recommendations || []).slice(0, 5).map((r, i) => `${i + 1}. ${r}`).join("\n");

      const body = `Merhaba,\n\n${url} adresi için hazırlanan SEO analiz raporu ekte yer almaktadır.\n\nGenel SEO Puanı: ${overall}/100 (${grade})\nPerformans: ${report.performance_score || 0}/100\nErişilebilirlik: ${report.accessibility_score || 0}/100\nEn İyi Uygulamalar: ${report.best_practices_score || 0}/100\nSEO: ${report.seo_score || 0}/100\n\nTespit edilen sorun sayısı: ${issuesCount}\n\nÖne çıkan öneriler:\n${recs}\n\n${note ? `Notunuz: ${note}\n\n` : ""}Tüm raporu PDF olarak indirmek için:\n${file_url}\n\nSaygılarımla,\nNexusGrowth Ekibi`;

      await base44.integrations.Core.SendEmail({
        to: email,
        subject: `SEO Analiz Raporu — ${url}`,
        body,
      });

      toast({ title: "Rapor gönderildi", description: `${email} adresine e-posta iletildi.` });
      setOpen(false);
      setEmail("");
      setNote("");
    } catch (e) {
      toast({ title: "Gönderilemedi", description: "E-posta gönderimi sırasında bir hata oluştu.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button onClick={handleDownload} disabled={downloading} size="lg" className="h-12 rounded-xl gap-2 font-semibold">
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          PDF Raporunu İndir
        </Button>
        <Button onClick={() => setOpen(true)} variant="outline" size="lg" className="h-12 rounded-xl gap-2 font-semibold">
          <Send className="w-4 h-4" />
          Müşteriye Gönder
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Raporu Müşteriye Gönder
            </DialogTitle>
            <DialogDescription>
              SEO raporu PDF olarak oluşturulup müşterinin e-posta adresine bir indirme bağlantısı ile gönderilir.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="client-email">Müşteri E-postası</Label>
              <Input
                id="client-email"
                type="email"
                placeholder="musteri@sirket.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="client-note">İsteğe Bağlı Not</Label>
              <Textarea
                id="client-note"
                placeholder="Müşteriye iletmek istediğiniz kısa not..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={sending}>Vazgeç</Button>
            <Button onClick={handleSend} disabled={sending || !email.trim()} className="gap-2">
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}