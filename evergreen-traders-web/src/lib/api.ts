export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  "http://localhost:5000"; // Fallback to local development URL

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  isActive?: boolean;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`);

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
}

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  isActive?: boolean;
};

export async function createProduct(input: CreateProductInput, token: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
}

export async function updateProduct(
  id: string,
  input: Partial<CreateProductInput>,
  token: string
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}

export async function deleteProduct(id: string, token: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
}

export type Order = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

export async function fetchOrders(token: string): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to load orders");
  }

  return res.json();
}

export async function updateOrder(
  id: string,
  input: { status: string },
  token: string
): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to update order");
  }

  return res.json();
}

export async function deleteOrder(id: string, token: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to delete order");
  }

  return res.json();
}

