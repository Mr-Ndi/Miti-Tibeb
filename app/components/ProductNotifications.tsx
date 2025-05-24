'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertCircle, TrendingDown, Package } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Notification {
  id: string;
  type: 'back_in_stock' | 'price_drop' | 'new_product';
  productId: string;
  productName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function ProductNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const data = await fetchApi<Notification[]>('/notifications');
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      await fetchApi(`/notifications/${notificationId}/read`, { method: 'POST' });
      await loadNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  async function markAllAsRead() {
    try {
      await fetchApi('/notifications/read-all', { method: 'POST' });
      await loadNotifications();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }

  function getNotificationIcon(type: Notification['type']) {
    switch (type) {
      case 'back_in_stock':
        return <Package className="w-5 h-5 text-green-400" />;
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-orange-400" />;
      case 'new_product':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-700 rounded-full"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute right-0 mt-2 w-80 bg-[#1F1F1F] rounded-lg shadow-xl z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-orange-400 hover:text-orange-300"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    No notifications
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-4 hover:bg-[#2E2E2E] ${
                          !notification.read ? 'bg-[#2E2E2E]' : ''
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-700 rounded-full"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 