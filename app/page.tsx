'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';


export default function HomePage() {
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
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-gray-700 h-40 mb-4 rounded" />
              <h3 className="text-lg font-semibold mb-2">Product {id}</h3>
              <p className="text-sm text-gray-400 mb-4">Short description of product {id}.</p>
              <button className="text-orange-400 hover:underline">View Details</button>
            </motion.div>
          ))}
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
          We also offer interior design samples that showcase our partners’ skill in both manufacturing and installing wooden works — ensuring peace and harmony in your space.
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
