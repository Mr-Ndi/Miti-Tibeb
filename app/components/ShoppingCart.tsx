'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  async function loadCart() {
    try {
      const data = await fetchApi<CartItem[]>('/cart');
      setItems(data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    try {
      await fetchApi(`/cart/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: newQuantity })
      });
      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  }

  async function removeItem(itemId: string) {
    try {
      await fetchApi(`/cart/${itemId}`, { method: 'DELETE' });
      await loadCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-[#1F1F1F] z-50 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shopping Cart
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                  <div className="text-center text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                  <div className="text-center text-gray-400">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4 bg-[#2E2E2E] p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-orange-400 mt-1">
                            ${item.price}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-700 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-700 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-gray-700 rounded-full text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="p-4 border-t border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600 disabled:opacity-50"
                  disabled={items.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 