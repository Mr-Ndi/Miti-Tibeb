'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { fetchApi } from '@/lib/api';

const materialDescriptions: Record<string, string> = {
  Eucalyptus: "Known for its durability and beautiful grain patterns, Eucalyptus wood is perfect for both indoor and outdoor furniture. Its natural resistance to decay makes it an excellent choice for long-lasting pieces.",
  Mahogany: "Prized for its rich, reddish-brown color and fine grain, Mahogany is a premium hardwood that adds elegance to any space. Its natural luster and durability make it a favorite for high-end furniture.",
  Pine: "Lightweight and versatile, Pine wood offers a warm, natural look at an affordable price. Its distinctive grain patterns and ease of workability make it popular for both traditional and modern designs.",
  Oak: "Renowned for its strength and distinctive grain, Oak is a classic choice for furniture that stands the test of time. Its natural beauty and durability make it perfect for heirloom-quality pieces.",
  Teak: "Highly valued for its natural oils and durability, Teak is the gold standard for outdoor furniture. Its resistance to weather and insects makes it ideal for pieces that need to withstand the elements.",
  Walnut: "Known for its rich, dark color and beautiful grain patterns, Walnut adds sophistication to any space. Its workability and natural beauty make it a favorite for fine furniture and decorative pieces."
};

const materialImages: Record<string, string> = {
  Eucalyptus: '/icon2.png',
  Mahogany: '/icon2.png',
  Pine: '/icon2.png',
  Podocarpus: '/icon2.png',
  Cedrela: '/icon2.png',
};

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

// Define material type
interface Material {
  name: string;
  count: number;
  description: string;
}

async function getTopMaterials(): Promise<Material[]> {
  try {
    const products = await fetchApi<Product[]>('/user/furniture');
    
    // Count materials
    const materialCounts = products.reduce((acc, product) => {
      acc[product.material] = (acc[product.material] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count
    const materials = Object.entries(materialCounts)
      .map(([name, count]) => ({
        name,
        count,
        description: materialDescriptions[name] || "A beautiful and durable wood material perfect for furniture making."
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Get top 3

    return materials;
  } catch (error) {
    console.error('Error fetching materials:', error);
    // Return fallback materials if API fails
    return [
      {
        name: "Eucalyptus",
        count: 0,
        description: materialDescriptions["Eucalyptus"]
      },
      {
        name: "Mahogany",
        count: 0,
        description: materialDescriptions["Mahogany"]
      },
      {
        name: "Pine",
        count: 0,
        description: materialDescriptions["Pine"]
      }
    ];
  }
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchApi<Product[]>('/user/furniture');
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError('Failed to load products');
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Show the 3 most recent products
  const recentProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  return (
    <main className="bg-[#2E2E2E] text-white px-6 py-12 space-y-24">

      {/* Hero Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Embrace the Art of Nature with <span className="text-orange-400">Miti Tibeb</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-lg">
            Discover handcrafted wooden products rooted in African wisdom and sustainable design.
          </p>
          <Link href="/products">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
              Browse Products
            </button>
          </Link>
        </div>
        <Image
          src="/icon2.png"
          alt="Wood Art"
          width={500}
          height={350}
          className="rounded-lg shadow-lg"
        />
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Uploaded Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((id) => (
              <motion.div
                key={id}
                className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition animate-pulse"
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-gray-700 h-40 mb-4 rounded" />
                <div className="h-6 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4" />
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center text-red-400">
              {error}
            </div>
          ) : recentProducts.length === 0 ? (
            // No products state
            <div className="col-span-3 text-center text-gray-400">
              No products available at the moment.
            </div>
          ) : (
            // Products grid
            recentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded mb-4 object-cover h-40 w-full"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{product.vendor}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-orange-400 font-bold">${product.price}</span>
                  <div className="text-sm text-gray-300">
                    <span className="mr-2">{product.category}</span>
                    <span className="italic">{product.material}</span>
                  </div>
                </div>
                <Link href={`/products/${product.id}`}>
                  <button className="text-orange-400 hover:underline">View Details</button>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="max-w-4xl mx-auto text-center space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="text-gray-300 text-lg">
          Miti Tibeb blends the elegance of woodwork with African artistic heritage. Each piece we craft carries a story rooted in culture, sustainability, and care.
        </p>
        <p className="text-gray-400">
          We also offer interior design samples that showcase our partners' skill in both manufacturing and installing wooden works — ensuring peace and harmony in your space.
        </p>
      </motion.section>

      {/* Vendor Invite */}
      <motion.section
        className="bg-[#1F1F1F] py-10 text-center rounded-lg max-w-4xl mx-auto mt-12 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-white">Invite a Vendor</h3>
        <p className="text-gray-400 mb-6">
          Know a talented artisan or furniture vendor? Invite them to join our platform and share their creations.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: handle submission
          }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="email" placeholder="Vendor Email" className="px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input type="text" placeholder="First Name" className="px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input type="text" placeholder="Other Name" className="px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          </div>
          <button
            type="submit"
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Join Us
          </button>
        </form>
      </motion.section>
    </main>
  );
}
