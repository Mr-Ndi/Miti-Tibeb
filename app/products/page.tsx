'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  material: string;
  imageUrl: string;
  vendor: string;
}

const categories = ['Kitchen', 'Living Room', 'Bedroom', 'Office', 'Outdoor'];
const materials = ['Eucalyptus', 'Mahogany', 'Pine', 'Podocarpus', 'Cedrela'];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [selectedMaterial, setMaterial] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const materialFromQuery = searchParams.get('material');
    if (materialFromQuery) {
      setMaterial(materialFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchApi<any>('/user/furniture');
        // If the API returns { data: [...] }, extract the array
        setProducts(Array.isArray(data) ? data : (data.data || []));
      } catch (e) {
        console.error('Failed to load products:', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Defensive: ensure products is always an array before filtering
  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesMaterial = selectedMaterial ? product.material === selectedMaterial : true;
    return matchesSearch && matchesCategory && matchesMaterial;
  }) : [];

  return (
    <main className="bg-[#2E2E2E] text-white min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Explore Unique Wooden Art</h1>
          <p className="text-gray-400 mt-2">
            Handcrafted pieces from skilled African vendors.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded bg-[#1F1F1F] text-white w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded bg-[#1F1F1F] text-white"
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded bg-[#1F1F1F] text-white"
            value={selectedMaterial}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">All Materials</option>
            {materials.map((mat) => (
              <option key={mat}>{mat}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((id) => (
              <div key={id} className="bg-[#1F1F1F] p-4 rounded-lg animate-pulse h-64" />
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-[#1F1F1F] rounded-lg overflow-hidden p-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-400">{product.vendor}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-400 font-bold">${product.price}</span>
                  <div className="text-sm text-gray-300">
                    <span className="mr-2">{product.category}</span>
                    <span className="italic">{product.material}</span>
                  </div>
                </div>
                <Link href={`/products/${product.id}`}>
                  <button className="text-orange-400 hover:underline mt-4">View Details</button>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
