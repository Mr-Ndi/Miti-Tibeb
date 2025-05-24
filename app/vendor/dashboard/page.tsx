'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Star,
  AlertCircle,
  Settings,
  BarChart2,
  Users
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface VendorStats {
  totalProducts: number;
  totalSales: number;
  averageRating: number;
  totalReviews: number;
  lowStockItems: number;
  pendingOrders: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  rating: number;
  sales: number;
  imageUrl: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export default function VendorDashboard() {
  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 0,
    totalSales: 0,
    averageRating: 0,
    totalReviews: 0,
    lowStockItems: 0,
    pendingOrders: 0
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, productsData, ordersData] = await Promise.all([
          fetchApi<VendorStats>('/vendor/stats'),
          fetchApi<Product[]>('/vendor/products'),
          fetchApi<RecentOrder[]>('/vendor/orders')
        ]);
        setStats(statsData);
        setProducts(productsData);
        setRecentOrders(ordersData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { title: 'Total Sales', value: `$${stats.totalSales}`, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Average Rating', value: `${stats.averageRating.toFixed(1)} ⭐`, icon: Star, color: 'bg-yellow-500' },
    { title: 'Total Reviews', value: stats.totalReviews, icon: Users, color: 'bg-purple-500' },
    { title: 'Low Stock Items', value: stats.lowStockItems, icon: AlertCircle, color: 'bg-red-500' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <main className="bg-[#2E2E2E] text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.section
          className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-[#2E2E2E] rounded-lg">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.amount}</p>
                  <p className="text-sm text-gray-400">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Product Management */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Product Management</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add New Product
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Update Stock
              </button>
            </div>
          </div>

          <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <div className="space-y-4">
              <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
                View Sales Report
              </button>
              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Customer Reviews
              </button>
            </div>
          </div>
        </motion.section>

        {/* Top Products */}
        <motion.section
          className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-[#2E2E2E] p-4 rounded-lg">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover rounded-lg w-full h-40"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-orange-400">${product.price}</p>
                  <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">Rating: {product.rating} ⭐</p>
                  <p className="text-sm text-gray-400">Sales: {product.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
} 