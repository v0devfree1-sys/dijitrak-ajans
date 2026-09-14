import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, FileText, Clock, DollarSign, BarChart3 } from "lucide-react";
import AdminProducts from "../../components/admin/AdminProducts";
import AdminRequests from "../../components/admin/AdminRequests";
import AdminReports from "../../components/admin/AdminReports";
import AdminOrders from "../../components/admin/AdminOrders";

export default function AdminDashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list("-created_date", 100),
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: () => base44.entities.ProjectRequest.list("-created_date", 100),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => base44.entities.Order.list("-created_date", 100),
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: () => base44.entities.SeoReport.list("-created_date", 50),
  });

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + (o.amount || 0), 0);
  const pendingRequests = requests.filter(r => r.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Yönetim Paneli</h1>
        <p className="text-muted-foreground mt-1">Ajans kontrol merkezi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Toplam Ürün", value: products.length, icon: Package, color: "text-primary bg-primary/10" },
          { title: "Toplam Gelir", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-500 bg-green-500/10" },
          { title: "Bekleyen Talep", value: pendingRequests, icon: Clock, color: "text-chart-3 bg-chart-3/10" },
          { title: "SEO Raporu", value: reports.length, icon: BarChart3, color: "text-accent bg-accent/10" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="font-heading text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products" className="gap-1.5"><Package className="w-4 h-4" /> Ürünler</TabsTrigger>
          <TabsTrigger value="requests" className="gap-1.5"><FileText className="w-4 h-4" /> Talepler</TabsTrigger>
          <TabsTrigger value="orders" className="gap-1.5"><ShoppingCart className="w-4 h-4" /> Siparişler</TabsTrigger>
        <TabsTrigger value="reports" className="gap-1.5"><BarChart3 className="w-4 h-4" /> SEO Raporları</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <AdminProducts products={products} />
        </TabsContent>
        <TabsContent value="requests">
          <AdminRequests requests={requests} />
        </TabsContent>
        <TabsContent value="orders">
          <AdminOrders orders={orders} />
        </TabsContent>
        <TabsContent value="reports">
          <AdminReports reports={reports} />
        </TabsContent>
      </Tabs>
    </div>
  );
}