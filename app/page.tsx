'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const materialDescriptions: Record<string, string> = {
  Eucalyptus: 'Discover our elegant Eucalyptus creations, known for their durability and beauty.',
  Mahogany: 'Explore luxurious Mahogany pieces, prized for their rich color and fine grain.',
  Pine: 'Browse affordable and versatile Pine furniture, perfect for any home.',
  Podocarpus: 'Experience the unique charm of Podocarpus woodwork.',
  Cedrela: 'Admire the lightness and resilience of Cedrela-crafted items.',
};

const materialImages: Record<string, string> = {
  Eucalyptus: '/icon2.png',
  Mahogany: '/icon2.png',
  Pine: '/icon2.png',
  Podocarpus: '/icon2.png',
  Cedrela: '/icon2.png',
};

export default function HomePage() {
  const [topMaterials, setTopMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/furniture`);
        const products = await res.json();
        // Count materials
        const materialCount: Record<string, number> = {};
        for (const product of products) {
          if (product.material) {
            materialCount[product.material] = (materialCount[product.material] || 0) + 1;
          }
        }
        // Sort materials by frequency
        const sorted = Object.entries(materialCount)
          .sort((a, b) => b[1] - a[1])
          .map(([mat]) => mat);
        setTopMaterials(sorted.slice(0, 3));
      } catch (e) {
        setTopMaterials(['Eucalyptus', 'Mahogany', 'Pine']); // fallback
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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

      {/* Featured Materials */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Uploaded Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((id) => (
              <div key={id} className="bg-[#1F1F1F] p-4 rounded-lg animate-pulse h-64" />
            ))
          ) : (
            topMaterials.map((material) => (
              <motion.div
                key={material}
                className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition flex flex-col"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={materialImages[material] || '/icon2.png'}
                  alt={material}
                  width={400}
                  height={160}
                  className="rounded mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{material}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {materialDescriptions[material] || `Explore our finest ${material} creations.`}
                </p>
                <Link href={`/products?material=${encodeURIComponent(material)}`}>
                  <button className="text-orange-400 hover:underline mt-auto">View More</button>
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
