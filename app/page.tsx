'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#2E2E2E] text-white px-6 py-12 space-y-20">

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto mt-16">
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
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Uploaded Products</h2>
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
        <p>Not only that but also here at Miti Tibeb we got a bunch of enterior disign sample, that highlight how skilled or partenerss are while manufacturing the product but also how good they are when it comes about installing your oun product for the sake of your own peace</p>
      </section>

      {/* Call to Action */}
      <section className="bg-[#1F1F1F] py-10 text-center rounded-lg max-w-4xl mx-auto mt-12 px-6">
  <h3 className="text-2xl font-bold mb-4 text-white">Invite a Vendor</h3>
  <p className="text-gray-400 mb-6">
    Know a talented artisan or furniture vendor? Invite them to join our platform and share their creations.
  </p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      // TODO: handle submission logic (POST to backend)
    }}
    className="space-y-4"
  >
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <input
        type="email"
        placeholder="Your Email"
        className="ml-auto mr-4 px-3 py-1 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="text"
        placeholder="Your Name"
        className="ml-auto mr-4 px-3 py-1 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="text"
        placeholder="Your Name"
        className="ml-auto mr-4 px-3 py-1 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
    </div>

    <button
      type="submit"
      className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
    >
      Join Us
    </button>
  </form>
</section>

    </main>
  );
}
