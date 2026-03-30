import type { Product, Customer, Sale } from "@/types/pos";

export const CATEGORIES = ["Cement", "Electrical", "Plumbing", "Tools", "Paint", "Fasteners"] as const;

export const mockProducts: Product[] = [
  { id: 1, name: "Portland Cement 50kg", category: "Cement", buyingPrice: 650, sellingPrice: 780, quantity: 120, barcode: "8001001" },
  { id: 2, name: "PVC Pipe 1/2\" x 6m", category: "Plumbing", buyingPrice: 180, sellingPrice: 250, quantity: 85, barcode: "8002001" },
  { id: 3, name: "PVC Pipe 3/4\" x 6m", category: "Plumbing", buyingPrice: 250, sellingPrice: 350, quantity: 60, barcode: "8002002" },
  { id: 4, name: "Copper Wire 2.5mm 100m", category: "Electrical", buyingPrice: 3200, sellingPrice: 3800, quantity: 15, barcode: "8003001" },
  { id: 5, name: "Light Switch", category: "Electrical", buyingPrice: 120, sellingPrice: 180, quantity: 200, barcode: "8003002" },
  { id: 6, name: "Socket Outlet", category: "Electrical", buyingPrice: 150, sellingPrice: 220, quantity: 180, barcode: "8003003" },
  { id: 7, name: "Claw Hammer", category: "Tools", buyingPrice: 450, sellingPrice: 600, quantity: 35, barcode: "8004001" },
  { id: 8, name: "Tape Measure 5m", category: "Tools", buyingPrice: 280, sellingPrice: 400, quantity: 45, barcode: "8004002" },
  { id: 9, name: "Dulux Paint White 4L", category: "Paint", buyingPrice: 1800, sellingPrice: 2200, quantity: 8, barcode: "8005001" },
  { id: 10, name: "Nails 4\" (1kg)", category: "Fasteners", buyingPrice: 150, sellingPrice: 220, quantity: 3, barcode: "8006001" },
  { id: 11, name: "Screws 2\" Box", category: "Fasteners", buyingPrice: 200, sellingPrice: 300, quantity: 50, barcode: "8006002" },
  { id: 12, name: "Gate Valve 1/2\"", category: "Plumbing", buyingPrice: 350, sellingPrice: 500, quantity: 25, barcode: "8002003" },
  { id: 13, name: "Wheelbarrow", category: "Tools", buyingPrice: 3500, sellingPrice: 4500, quantity: 5, barcode: "8004003" },
  { id: 14, name: "Roofing Cement 20kg", category: "Cement", buyingPrice: 550, sellingPrice: 700, quantity: 40, barcode: "8001002" },
  { id: 15, name: "LED Bulb 12W", category: "Electrical", buyingPrice: 80, sellingPrice: 150, quantity: 300, barcode: "8003004" },
  { id: 16, name: "Paint Brush 4\"", category: "Paint", buyingPrice: 120, sellingPrice: 200, quantity: 70, barcode: "8005002" },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: "John Kamau", phone: "0712345678", balance: 15600 },
  { id: 2, name: "Mary Wanjiku", phone: "0723456789", balance: 0 },
  { id: 3, name: "Peter Ochieng", phone: "0734567890", balance: 8200 },
  { id: 4, name: "Grace Akinyi", phone: "0745678901", balance: 0 },
  { id: 5, name: "David Mwangi", phone: "0756789012", balance: 32000 },
];

export const mockSales: Sale[] = [
  { id: 1001, date: "2026-03-30 09:15", totalAmount: 4560, paymentMethod: "Cash", items: 3 },
  { id: 1002, date: "2026-03-30 10:22", totalAmount: 780, paymentMethod: "M-Pesa", items: 1, customer: "John Kamau" },
  { id: 1003, date: "2026-03-30 11:05", totalAmount: 12400, paymentMethod: "Cash", items: 5 },
  { id: 1004, date: "2026-03-30 13:40", totalAmount: 2200, paymentMethod: "Credit", items: 1, customer: "David Mwangi" },
  { id: 1005, date: "2026-03-30 14:18", totalAmount: 6300, paymentMethod: "M-Pesa", items: 4 },
  { id: 1006, date: "2026-03-29 08:30", totalAmount: 3900, paymentMethod: "Cash", items: 2 },
  { id: 1007, date: "2026-03-29 11:45", totalAmount: 15600, paymentMethod: "Credit", items: 8, customer: "Peter Ochieng" },
  { id: 1008, date: "2026-03-29 15:20", totalAmount: 1560, paymentMethod: "M-Pesa", items: 2 },
];
