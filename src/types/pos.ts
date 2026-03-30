export interface Product {
  id: number;
  name: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  barcode: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  balance: number;
}

export interface Sale {
  id: number;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  items: number;
  customer?: string;
}

export interface Supplier {
  id: number;
  name: string;
  phone: string;
}

export type ProductCategory = "Cement" | "Electrical" | "Plumbing" | "Tools" | "Paint" | "Fasteners";
