import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProducts, CATEGORIES } from "@/data/mockData";
import { Search, Package, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const totalValue = filtered.reduce((s, p) => s + p.sellingPrice * p.quantity, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products • Stock value: KES {totalValue.toLocaleString()}</p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...CATEGORIES].map((c) => (
            <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)}>
              {c}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Buying (KES)</TableHead>
                <TableHead className="text-right">Selling (KES)</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Barcode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const margin = ((p.sellingPrice - p.buyingPrice) / p.buyingPrice * 100).toFixed(0);
                const lowStock = p.quantity <= 10;
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{p.buyingPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">{p.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-success">{margin}%</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-mono ${lowStock ? "text-destructive font-semibold" : ""}`}>
                        {lowStock && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                        {p.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground text-xs">{p.barcode}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
