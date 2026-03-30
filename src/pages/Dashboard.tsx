import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts, mockSales } from "@/data/mockData";
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const todaySales = mockSales.filter((s) => s.date.startsWith("2026-03-30"));
const todayRevenue = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
const lowStockProducts = mockProducts.filter((p) => p.quantity <= 10);
const topProducts = [...mockProducts]
  .sort((a, b) => b.sellingPrice * (300 - b.quantity) - a.sellingPrice * (300 - a.quantity))
  .slice(0, 5);

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
}) {
  return (
    <Card className="animate-slide-in">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-3 w-3 text-success" />
                <span className="text-xs text-success font-medium">{trend}</span>
              </div>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Icon className="h-5 w-5 text-accent-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Today's overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value={`KES ${todayRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+12% from yesterday"
        />
        <StatCard
          title="Today's Sales"
          value={String(todaySales.length)}
          icon={ShoppingCart}
          trend="+3 more"
        />
        <StatCard
          title="Total Products"
          value={String(mockProducts.length)}
          icon={Package}
        />
        <StatCard
          title="Low Stock Items"
          value={String(lowStockProducts.length)}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">Sale #{sale.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {sale.date.split(" ")[1]} • {sale.items} items
                    {sale.customer && ` • ${sale.customer}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    KES {sale.totalAmount.toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      sale.paymentMethod === "Cash"
                        ? "default"
                        : sale.paymentMethod === "M-Pesa"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {sale.paymentMethod}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock & Top Products */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lowStockProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">All items well stocked</p>
              ) : (
                lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg bg-muted p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                    <Badge variant="destructive" className="font-mono text-xs">
                      {p.quantity} left
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topProducts.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold font-mono">
                    KES {p.sellingPrice.toLocaleString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
