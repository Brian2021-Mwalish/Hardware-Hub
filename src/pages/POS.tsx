import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockProducts, CATEGORIES } from "@/data/mockData";
import type { CartItem, Product } from "@/types/pos";
import { Search, Plus, Minus, Trash2, ShoppingCart, CreditCard, Smartphone, Banknote, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function POS() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search);
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.quantity) {
          toast({ title: "Stock limit", description: `Only ${product.quantity} available`, variant: "destructive" });
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const checkout = (method: string) => {
    if (cart.length === 0) return;
    toast({
      title: "Sale Complete!",
      description: `KES ${total.toLocaleString()} paid via ${method}`,
    });
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left: Product Grid */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or scan barcode..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {["All", ...CATEGORIES].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex-1 overflow-auto">
          <div className="pos-grid">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="flex flex-col items-start rounded-lg border bg-card p-3 text-left transition-all hover:shadow-md hover:border-primary/40 active:scale-[0.98]"
              >
                <p className="text-sm font-medium leading-tight line-clamp-2">
                  {product.name}
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {product.category}
                </Badge>
                <div className="mt-auto pt-3 w-full flex items-end justify-between">
                  <span className="text-base font-bold text-primary font-mono">
                    {product.sellingPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.quantity} in stock
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Cart */}
      <div className="w-[380px] border-l bg-card flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Current Sale</h2>
            <Badge variant="secondary" className="ml-auto font-mono">
              {cart.length} items
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mb-2 opacity-30" />
              <p className="text-sm">Cart is empty</p>
              <p className="text-xs">Click products to add</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    KES {item.product.sellingPrice.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-mono font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm font-bold font-mono w-20 text-right">
                  {(item.product.sellingPrice * item.quantity).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div className="border-t p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Discount %</span>
            <Input
              type="number"
              min={0}
              max={100}
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-20 h-8 text-sm font-mono"
            />
            {discount > 0 && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDiscount(0)}>
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">KES {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount ({discount}%)</span>
                <span className="font-mono">-KES {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-1 border-t">
              <span>Total</span>
              <span className="font-mono text-primary">
                KES {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => checkout("Cash")}
              disabled={cart.length === 0}
              className="flex-col h-14 gap-1"
            >
              <Banknote className="h-4 w-4" />
              <span className="text-xs">Cash</span>
            </Button>
            <Button
              onClick={() => checkout("M-Pesa")}
              disabled={cart.length === 0}
              variant="secondary"
              className="flex-col h-14 gap-1"
            >
              <Smartphone className="h-4 w-4" />
              <span className="text-xs">M-Pesa</span>
            </Button>
            <Button
              onClick={() => checkout("Credit")}
              disabled={cart.length === 0}
              variant="outline"
              className="flex-col h-14 gap-1"
            >
              <CreditCard className="h-4 w-4" />
              <span className="text-xs">Credit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
