'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#2E2E2E] text-white px-6 py-12 space-y-20">

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
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
          src="/hero-wood-art.jpg" // replace with your actual image path
          alt="Wood Art"
          width={500}
          height={350}
          className="rounded-lg shadow-lg"
        />
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-[#1F1F1F] p-4 rounded-lg shadow hover:shadow-orange-500/20 transition">
              <div className="bg-gray-700 h-40 mb-4 rounded" />
              <h3 className="text-lg font-semibold mb-2">Product {id}</h3>
              <p className="text-sm text-gray-400 mb-4">Short description of product {id}.</p>
              <button className="text-orange-400 hover:underline">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="text-gray-300 text-lg">
          Miti Tibeb blends the elegance of woodwork with African artistic heritage. Each piece we craft carries a story rooted in culture, sustainability, and care.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-[#1F1F1F] py-10 text-center rounded-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-2">Join Our Community</h3>
        <p className="text-gray-400 mb-4">Subscribe for updates on new products and stories from our artisans.</p>
        <input
          type="email"
          placeholder="you@example.com"
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400 mr-2"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Subscribe</button>
      </section>
    </main>
  );
}
