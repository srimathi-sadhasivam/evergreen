import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "@/contexts/OrdersContext";

const ManualOrderForm: React.FC = () => {
  const { toast } = useToast();
  const { addOrder } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    productType: "",
    quantity: "",
    totalPrice: "",
  });

  const productTypes = [
    "Premium Tender Coconut",
    "Natural Coconut Water Grade",
    "Regular Brown Coconut",
    "Semi Husked Wholesale Coconut",
    "Export Grade Green Coconut",
    "Chilled Coconut Water Stock",
    "Copra Processing Coconut",
    "Temple Grade Tender Coconut",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName.trim() || !formData.productType || !formData.quantity || !formData.totalPrice) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new order object
    const newOrder = {
      _id: `ORD${Date.now()}`,
      user: {
        name: formData.customerName,
        email: `${formData.customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      },
      items: [
        {
          product: {
            name: formData.productType,
          },
          quantity: parseInt(formData.quantity),
        },
      ],
      totalAmount: parseFloat(formData.totalPrice),
      status: "pending",
      createdAt: new Date().toISOString(),
      isManualOrder: true,
      phoneNumber: formData.phoneNumber,
    };

    // Add order to context
    addOrder(newOrder);

    // Dispatch custom event for dashboard to listen (for backward compatibility)
    window.dispatchEvent(new CustomEvent('manualOrderCreated', { detail: newOrder }));

    // Reset form
    setFormData({
      customerName: "",
      phoneNumber: "",
      productType: "",
      quantity: "",
      totalPrice: "",
    });

    setIsOpen(false);

    toast({
      title: "Order Created",
      description: `Manual order for ${formData.customerName} has been created successfully.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Manual Order</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium mb-2">
                Customer Name *
              </label>
              <Input
                id="customerName"
                type="text"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="productType" className="block text-sm font-medium mb-2">
              Product Type *
            </label>
            <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity *
              </label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                min="1"
                required
              />
            </div>
            
            <div>
              <label htmlFor="totalPrice" className="block text-sm font-medium mb-2">
                Total Price (₹) *
              </label>
              <Input
                id="totalPrice"
                type="number"
                placeholder="Enter total price"
                value={formData.totalPrice}
                onChange={(e) => handleInputChange("totalPrice", e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualOrderForm;
