// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  material: string;
  category: string;
  vendor?: {
    businessName: string;
  };
  owner?: {
    businessName: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      throw new Error('API_URL is not defined');
    }

    const res = await fetch(`${apiUrl}/products/${id}`, {
      next: { revalidate: 60 }, // Revalidate every minute
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();
    return data as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

function ProductSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6 animate-pulse">
      <div className="w-full aspect-square bg-gray-200 rounded" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent id={params.id} />
    </Suspense>
  );
}

async function ProductContent({ id }: { id: string }) {
  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-orange-500 font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Material:</strong> {product.material}<br />
            <strong>Category:</strong> {product.category}<br />
            <strong>Vendor:</strong> {product.vendor?.businessName || product.owner?.businessName}
          </p>
        </div>

        <form method="POST" action="/wishlist" className="mt-6">
          <input type="hidden" name="productId" value={product.id} />
          <Button 
            type="submit" 
            variant="outline"
            className="w-full md:w-auto"
          >
            Add to Wishlist
          </Button>
        </form>
      </div>
    </div>
  );
}
