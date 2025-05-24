'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  BarChart2, 
  Settings, 
  AlertCircle,
  DollarSign,
  TrendingUp,
  Shield
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalSales: number;
  pendingVendorApprovals: number;
  lowStockAlerts: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalSales: 0,
    pendingVendorApprovals: 0,
    lowStockAlerts: 0
  });
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, activitiesData] = await Promise.all([
          fetchApi<DashboardStats>('/admin/stats'),
          fetchApi<RecentActivity[]>('/admin/activities')
        ]);
        setStats(statsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Vendors', value: stats.totalVendors, icon: Package, color: 'bg-green-500' },
    { title: 'Total Products', value: stats.totalProducts, icon: BarChart2, color: 'bg-purple-500' },
    { title: 'Total Sales', value: `$${stats.totalSales}`, icon: DollarSign, color: 'bg-yellow-500' },
    { title: 'Pending Approvals', value: stats.pendingVendorApprovals, icon: AlertCircle, color: 'bg-red-500' },
    { title: 'Low Stock Alerts', value: stats.lowStockAlerts, icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <main className="bg-[#2E2E2E] text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

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

        {/* Recent Activity */}
        <motion.section
          className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-[#2E2E2E] rounded-lg">
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-400">{activity.user}</p>
                </div>
                <p className="text-sm text-gray-400">{new Date(activity.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Vendor Management</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Review Pending Vendors
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Send Vendor Invites
              </button>
            </div>
          </div>

          <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">System Settings</h2>
            <div className="space-y-4">
              <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
                Manage Categories
              </button>
              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Configure Notifications
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 