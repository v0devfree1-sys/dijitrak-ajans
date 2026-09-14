import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

export default function AdminReports({ reports }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-lg mb-6">SEO Raporları ({reports.length})</h3>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Genel Puan</TableHead>
                <TableHead>SEO</TableHead>
                <TableHead>Performans</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm max-w-xs truncate"
                    >
                      {r.url}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className={`font-heading font-bold text-lg ${getScoreColor(r.overall_score)}`}>
                      {r.overall_score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(r.seo_score)}`}>{r.seo_score}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(r.performance_score)}`}>{r.performance_score}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.created_date ? format(new Date(r.created_date), "dd.MM.yyyy HH:mm") : "-"}
                  </TableCell>
                </TableRow>
              ))}
              {reports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Henüz rapor yok</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}