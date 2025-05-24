'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, AlertCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  material: string;
  category: string;
  dimensions: string;
  weight: string;
  warranty: string;
  imageUrl: string;
  rating: number;
  stock: number;
  features: string[];
}

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: string[];
}

type FeatureKey = keyof Omit<Product, 'id' | 'name' | 'description' | 'imageUrl' | 'features'>;

interface Feature {
  key: FeatureKey;
  label: string;
}

export default function ProductComparison({ isOpen, onClose, selectedProducts }: ProductComparisonProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && selectedProducts.length > 0) {
      loadProducts();
    }
  }, [isOpen, selectedProducts]);

  async function loadProducts() {
    try {
      const productsData = await Promise.all(
        selectedProducts.map(id => fetchApi<Product>(`/products/${id}`))
      );
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }

  const features: Feature[] = [
    { key: 'price', label: 'Price' },
    { key: 'material', label: 'Material' },
    { key: 'category', label: 'Category' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'weight', label: 'Weight' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'rating', label: 'Rating' },
    { key: 'stock', label: 'Stock' }
  ];

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

          {/* Comparison Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 bg-[#1F1F1F] z-50 rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Compare Products</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="flex-1 overflow-auto p-4">
                {loading ? (
                  <div className="text-center text-gray-400">Loading...</div>
                ) : (
                  <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-4">
                    {/* Feature Labels */}
                    <div className="space-y-4">
                      <div className="h-40" /> {/* Spacer for product image */}
                      {features.map((feature) => (
                        <div
                          key={feature.key}
                          className="h-12 flex items-center font-medium"
                        >
                          {feature.label}
                        </div>
                      ))}
                      <div className="h-12 flex items-center font-medium">
                        Features
                      </div>
                    </div>

                    {/* Product Columns */}
                    {products.map((product) => (
                      <div key={product.id} className="space-y-4">
                        {/* Product Image */}
                        <div className="h-40 relative">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <h3 className="mt-2 font-medium">{product.name}</h3>
                        </div>

                        {/* Feature Values */}
                        {features.map((feature) => (
                          <div
                            key={feature.key}
                            className="h-12 flex items-center"
                          >
                            {feature.key === 'price' ? (
                              <span className="text-orange-400">
                                ${product[feature.key]}
                              </span>
                            ) : feature.key === 'rating' ? (
                              <div className="flex items-center gap-1">
                                {product[feature.key]} ⭐
                              </div>
                            ) : feature.key === 'stock' ? (
                              <div className="flex items-center gap-1">
                                {product[feature.key]}
                                {product[feature.key] < 5 && (
                                  <AlertCircle className="w-4 h-4 text-red-400" />
                                )}
                              </div>
                            ) : (
                              product[feature.key]
                            )}
                          </div>
                        ))}

                        {/* Features List */}
                        <div className="h-12">
                          <ul className="space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <Check className="w-4 h-4 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    {/* Add Product Column */}
                    {products.length < 3 && (
                      <div className="space-y-4">
                        <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                          <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-orange-400">
                            <Plus className="w-8 h-8" />
                            <span>Add Product</span>
                          </button>
                        </div>
                        {features.map((feature) => (
                          <div
                            key={feature.key}
                            className="h-12 flex items-center text-gray-400"
                          >
                            -
                          </div>
                        ))}
                        <div className="h-12 flex items-center text-gray-400">
                          -
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 