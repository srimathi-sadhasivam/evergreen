import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  type CreateProductInput,
  type Product,
  updateProduct,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const PRODUCT_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80";

const AdminProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  // Simple auth guard
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate("/admin/login");
      return;
    }
  }, [user, navigate]);

  // Get token from localStorage for API calls
  useEffect(() => {
    const storedToken = localStorage.getItem("evergreen_admin_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product created" });
      setForm(initialFormState);
    },
    onError: () => {
      toast({ title: "Failed to create product", description: "Please try again." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", description: "Please try again." });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (product: Product) =>
      updateProduct(
        product._id,
        { isActive: !product.isActive },
        token as string,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product updated" });
    },
    onError: () => {
      toast({ title: "Failed to update product", description: "Please try again." });
    },
  });

  const [form, setForm] = useState<AdminProductFormState>(initialFormState);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    createMutation.mutate({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      imageUrl: form.imageUrl || undefined,
      category: form.category || undefined,
      stock: form.stock ? Number(form.stock) : undefined,
      isActive: form.isActive,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-cream/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Evergreen Admin</h1>
            <p className="text-sm text-muted-foreground">Manage your product catalogue</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View Website
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Create Product */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-xl">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="category">Category (optional)</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="Tender, Fresh, Yellow..."
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="stock">Stock (optional)</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  />
                  Active (visible on website)
                </label>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Saving..." : "Add Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Existing Products</h2>
            {isLoading && <p className="text-sm text-muted-foreground">Loading products...</p>}
          </div>
          {products.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No products found. Add your first product using the form above.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <Card key={product._id} className="border shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {product.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ₹{product.price.toLocaleString("en-IN")}
                      {product.category ? ` · ${product.category}` : ""}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="w-full h-40 rounded-md overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl || PRODUCT_IMAGE_FALLBACK}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== PRODUCT_IMAGE_FALLBACK) {
                            e.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={toggleActiveMutation.isPending}
                        onClick={() => toggleActiveMutation.mutate(product)}
                      >
                        {product.isActive ? "Hide" : "Show on site"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (window.confirm("Delete this product permanently?")) {
                            deleteMutation.mutate(product._id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

type AdminProductFormState = {
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
};

const initialFormState: AdminProductFormState = {
  name: "",
  price: "",
  category: "",
  stock: "",
  description: "",
  imageUrl: "",
  isActive: true,
};

export default AdminProducts;

