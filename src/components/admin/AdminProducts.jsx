import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

const emptyProduct = {
  title: "", description: "", type: "theme", price: 0, category: "wordpress",
  image_url: "", features: [], demo_url: "", rating: 0, sales_count: 0,
  is_featured: false, status: "active",
};

export default function AdminProducts({ products }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditProduct(null);
    setForm(emptyProduct);
    setFeaturesText("");
    setDialogOpen(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({ ...product });
    setFeaturesText((product.features || []).join("\n"));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, features: featuresText.split("\n").filter(Boolean) };
    if (editProduct) {
      await base44.entities.Product.update(editProduct.id, data);
    } else {
      await base44.entities.Product.create(data);
    }
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setDialogOpen(false);
    setSaving(false);
    toast({ title: editProduct ? "Ürün güncellendi" : "Ürün oluşturuldu" });
  };

  const handleDelete = async (id) => {
    await base44.entities.Product.delete(id);
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    toast({ title: "Ürün silindi" });
  };

  const typeLabels = { theme: "Tema", plugin: "Eklenti", seo_package: "SEO Paketi" };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg">Ürünler ({products.length})</h3>
          <Button onClick={openNew} size="sm" className="gap-1.5 rounded-lg">
            <Plus className="w-4 h-4" /> Yeni Ürün
          </Button>
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Tür</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{typeLabels[p.type] || p.type}</Badge>
                  </TableCell>
                  <TableCell className="font-heading font-semibold">${p.price}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "active" ? "default" : "secondary"}>
                      {p.status === "active" ? "Aktif" : p.status === "draft" ? "Taslak" : "Arşiv"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Henüz ürün yok</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editProduct ? "Ürünü Düzenle" : "Yeni Ürün"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Ürün Adı</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tür</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theme">Tema</SelectItem>
                      <SelectItem value="plugin">Eklenti</SelectItem>
                      <SelectItem value="seo_package">SEO Paketi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fiyat ($)</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kategori</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["wordpress", "shopify", "react", "nextjs", "analytics", "performance", "security", "marketing"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Durum</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="draft">Taslak</SelectItem>
                      <SelectItem value="archived">Arşiv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Açıklama</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Görsel URL</Label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Demo URL</Label>
                <Input value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Özellikler (her satıra bir tane)</Label>
                <Textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} className="mt-1 h-24" />
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editProduct ? "Güncelle" : "Oluştur"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}