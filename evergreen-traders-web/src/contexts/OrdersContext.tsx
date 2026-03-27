import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
  isManualOrder?: boolean;
  phoneNumber?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, newStatus: string) => void;
  deleteOrder: (orderId: string) => void;
  setOrders: (orders: Order[]) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    console.error('useOrders must be used within an OrdersProvider');
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  console.log('useOrders - context value:', context);
  return context;
};

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([
    // Realistic local orders from Namakkal/Paramathi Velur area
    {
      _id: 'ORD001',
      user: {
        name: 'P. Arumugam',
        email: 'arumugam.traders@example.com',
      },
      items: [
        {
          product: {
            name: 'Premium Tender Coconut',
          },
          quantity: 150,
        },
      ],
      totalAmount: 5700,
      status: 'delivered',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      _id: 'ORD002',
      user: {
        name: 'K. Selvam',
        email: 'selvam.coconut@example.com',
      },
      items: [
        {
          product: {
            name: 'Natural Coconut Water Grade',
          },
          quantity: 200,
        },
      ],
      totalAmount: 6400,
      status: 'processing',
      createdAt: '2024-01-15T14:30:00Z',
    },
    {
      _id: 'ORD003',
      user: {
        name: 'M. Rajendran',
        email: 'rajendran.farms@example.com',
      },
      items: [
        {
          product: {
            name: 'Regular Brown Coconut',
          },
          quantity: 175,
        },
      ],
      totalAmount: 4725,
      status: 'pending',
      createdAt: '2024-01-14T09:15:00Z',
    },
    {
      _id: 'ORD004',
      user: {
        name: 'S. Palanisamy',
        email: 'palanisamy.export@example.com',
      },
      items: [
        {
          product: {
            name: 'Export Grade Green Coconut',
          },
          quantity: 120,
        },
      ],
      totalAmount: 4920,
      status: 'delivered',
      createdAt: '2024-01-14T16:45:00Z',
    },
    {
      _id: 'ORD005',
      user: {
        name: 'V. Lakshmi',
        email: 'lakshmi.traders@example.com',
      },
      items: [
        {
          product: {
            name: 'Semi Husked Wholesale Coconut',
          },
          quantity: 300,
        },
      ],
      totalAmount: 8700,
      status: 'shipped',
      createdAt: '2024-01-13T11:20:00Z',
    },
  ]);

  const addOrder = (newOrder: Order) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
  };

  const value: OrdersContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    setOrders,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};
