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
  imageUrl: string;
  material: string;
  category: string;
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

export default async function Home() {
  const topMaterials = await getTopMaterials();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full h-[600px] relative">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-6">
            <h1 className="text-5xl font-bold">Welcome to Miti Tibeb</h1>
            <p className="text-xl">Your one-stop shop for quality furniture</p>
            <Link href="/products">
              <Button>Shop Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product cards will go here */}
          </div>
        </div>
      </section>

      {/* Recent Uploaded Products */}
      <section className="w-full py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topMaterials.map((material) => (
              <div key={material.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
                  <p className="text-gray-600 mb-4">{material.description}</p>
                  <Link href={`/products?material=${material.name}`}>
                    <Button variant="outline" className="w-full">
                      View More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Miti Tibeb</h2>
              <p className="text-gray-600 mb-4">
                We are dedicated to providing high-quality furniture and connecting customers with skilled vendors.
              </p>
              <Link href="/about">
                <Button>Learn More</Button>
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about-image.jpg"
                alt="About Miti Tibeb"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Invite Section */}
      <section className="w-full py-16 px-4 md:px-6 bg-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Are You a Vendor?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our platform to showcase your furniture and reach more customers.
          </p>
          <Link href="/vendor/signup">
            <Button>Become a Vendor</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
