import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { AnimatedCard } from '@/components/ui/motion';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { orders, addOrder } = useOrders();
  const [stats, setStats] = useState([
    {
      title: 'Total Orders',
      value: '0',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Products',
      value: '45',
      change: '+2 new',
      changeType: 'positive' as const,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Users',
      value: '892',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Revenue',
      value: '₹0',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]);

  // Calculate stats from orders
  useEffect(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    setStats(prev => {
      const newStats = [...prev];
      newStats[0].value = totalOrders.toLocaleString();
      newStats[3].value = `₹${totalRevenue.toLocaleString("en-IN")}`;
      return newStats;
    });
  }, [orders]);

  // Update recent orders from context
  const recentOrders = orders.slice(0, 4).map(order => ({
    id: order._id.slice(-8),
    customer: order.user.name,
    amount: `₹${order.totalAmount.toLocaleString("en-IN")}`,
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    date: new Date(order.createdAt).toLocaleDateString()
  }));

  // Listen for manual order updates (for backward compatibility)
  useEffect(() => {
    const handleManualOrderUpdate = (event: CustomEvent) => {
      const newOrder = event.detail;
      addOrder(newOrder);
    };

    window.addEventListener('manualOrderCreated', handleManualOrderUpdate as EventListener);
    
    return () => {
      window.removeEventListener('manualOrderCreated', handleManualOrderUpdate as EventListener);
    };
  }, [addOrder]);

  const topProducts = [
    { name: 'Fresh Tender Coconut', sales: 234, revenue: '₹46,800' },
    { name: 'Dry Coconut', sales: 156, revenue: '₹31,200' },
    { name: 'Coconut Water', sales: 89, revenue: '₹13,350' },
    { name: 'Coconut Oil', sales: 67, revenue: '₹20,100' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Evergreen Traders Admin Panel</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AnimatedCard key={stat.title} delay={index * 0.1} glass>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {/* Quick Actions */}
      <AnimatedCard delay={0.4} glass>
        <CardHeader>
          <CardTitle className="font-display">Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 border border-white/20 rounded-lg hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm"
              onClick={() => navigate('/admin/products')}
            >
              <Package className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Add New Product</h3>
              <p className="text-sm text-muted-foreground">Add a new product to your inventory</p>
            </div>
            <div 
              className="p-4 border border-white/20 rounded-lg hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm"
              onClick={() => navigate('/admin/orders')}
            >
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">View Orders</h3>
              <p className="text-sm text-muted-foreground">Manage and track customer orders</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-muted-foreground">View and manage customer accounts</p>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Recent Orders */}
      <AnimatedCard delay={0.5} glass>
        <CardHeader>
          <CardTitle className="font-display">Recent Orders</CardTitle>
          <CardDescription>Latest customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg backdrop-blur-sm">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">Order {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Top Products */}
      <AnimatedCard delay={0.6} glass>
        <CardHeader>
          <CardTitle className="font-display">Top Products</CardTitle>
          <CardDescription>Best selling products this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 border border-white/20 rounded-lg backdrop-blur-sm">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
};

export default AdminDashboard;
