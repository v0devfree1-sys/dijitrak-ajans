import React from "react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const statusLabels = {
  pending: "Bekliyor",
  reviewing: "İnceleniyor",
  quoted: "Teklif Verildi",
  accepted: "Kabul Edildi",
  rejected: "Reddedildi",
  in_progress: "Devam Ediyor",
  completed: "Tamamlandı",
};

const statusColors = {
  pending: "bg-chart-3/10 text-chart-3",
  reviewing: "bg-primary/10 text-primary",
  quoted: "bg-accent/10 text-accent-foreground",
  accepted: "bg-green-500/10 text-green-500",
  rejected: "bg-destructive/10 text-destructive",
  in_progress: "bg-primary/10 text-primary",
  completed: "bg-green-500/10 text-green-500",
};

const projectTypeLabels = {
  website: "Web Sitesi",
  ecommerce: "E-Ticaret",
  mobile_app: "Mobil Uygulama",
  seo_optimization: "SEO",
  redesign: "Yeniden Tasarım",
  custom: "Özel Proje",
};

export default function AdminRequests({ requests }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateStatus = async (id, status) => {
    await base44.entities.ProjectRequest.update(id, { status });
    queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
    toast({ title: "Durum güncellendi" });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-lg mb-6">Proje Talepleri ({requests.length})</h3>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Müşteri</TableHead>
                <TableHead>Proje</TableHead>
                <TableHead>Bütçe</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{projectTypeLabels[r.project_type] || r.project_type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{r.budget_range || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.created_date ? format(new Date(r.created_date), "dd.MM.yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[r.status] || ""}>{statusLabels[r.status] || r.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Henüz talep yok</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}