import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
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
      value: '₹2,45,678',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: '₹1,234', status: 'Completed', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Jane Smith', amount: '₹2,456', status: 'Processing', date: '2024-01-15' },
    { id: 'ORD003', customer: 'Bob Johnson', amount: '₹987', status: 'Pending', date: '2024-01-14' },
    { id: 'ORD004', customer: 'Alice Brown', amount: '₹3,210', status: 'Completed', date: '2024-01-14' },
  ];

  const topProducts = [
    { name: 'Fresh Tender Coconut', sales: 234, revenue: '₹46,800' },
    { name: 'Dry Coconut', sales: 156, revenue: '₹31,200' },
    { name: 'Coconut Water', sales: 89, revenue: '₹13,350' },
    { name: 'Coconut Oil', sales: 67, revenue: '₹20,100' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard. Here's an overview of your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <Package className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Add New Product</h3>
              <p className="text-sm text-muted-foreground">Add a new product to your inventory</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">View Orders</h3>
              <p className="text-sm text-muted-foreground">Manage and track customer orders</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-muted-foreground">View and manage customer accounts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
