import React from "react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const statusLabels = { pending: "Bekliyor", completed: "Tamamlandı", refunded: "İade Edildi" };
const statusColors = {
  pending: "bg-chart-3/10 text-chart-3",
  completed: "bg-green-500/10 text-green-500",
  refunded: "bg-destructive/10 text-destructive",
};

export default function AdminOrders({ orders }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const totalRevenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + (o.amount || 0), 0);

  const updateStatus = async (id, status) => {
    await base44.entities.Order.update(id, { status });
    queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    toast({ title: "Sipariş durumu güncellendi" });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg">Siparişler ({orders.length})</h3>
          <div className="text-sm text-muted-foreground">
            Toplam Gelir: <span className="font-heading font-bold text-green-500">${totalRevenue.toLocaleString()}</span>
          </div>
        </div>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Tür</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium text-sm">{o.product_title || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{o.product_type || "-"}</Badge>
                  </TableCell>
                  <TableCell className="font-heading font-semibold">${o.amount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.customer_email || o.created_by || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.created_date ? format(new Date(o.created_date), "dd.MM.yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                      <SelectTrigger className="w-32 h-7 text-xs">
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
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Henüz sipariş yok</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}