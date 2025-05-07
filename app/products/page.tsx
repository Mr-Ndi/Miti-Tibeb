'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Carved Wooden Bowl',
    description: 'Handcrafted bowl made from African mahogany.',
    price: '$45',
    image: '/icon2.png', // Replace with actual product images
  },
  {
    id: 2,
    name: 'Minimalist Wall Art',
    description: 'Laser-cut wood wall decor in tribal patterns.',
    price: '$60',
    image: '/icon2.png',
  },
  {
    id: 3,
    name: 'Vintage Coffee Table',
    description: 'Rustic coffee table blending tradition and modernity.',
    price: '$180',
    image: '/icon2.png',
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-[#2E2E2E] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Browse Our Products</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover our selection of handcrafted wooden art, furniture, and decor rooted in African heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="rounded mb-4 object-cover"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-400 mb-2">{product.description}</p>
              <p className="text-orange-400 font-bold mb-3">{product.price}</p>
              <Link href={`/products/${product.id}`}>
                <button className="text-orange-400 hover:underline text-sm">
                  View Details →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
