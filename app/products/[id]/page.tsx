// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

async function getProduct(id: string) {
  const res = await fetch(`${process.env.API_URL}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-orange-500 font-semibold">${product.price}</p>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Material:</strong> {product.material}<br />
            <strong>Category:</strong> {product.category}<br />
            <strong>Vendor:</strong> {product.vendor || product.owner?.businessName}
          </p>
        </div>

        <form method="POST" action="/wishlist">
          <input type="hidden" name="productId" value={product.id} />
          <Button type="submit" variant="outline" className="mt-6">
            Add to Wishlist
          </Button>
        </form>
      </div>
    </div>
  );
}
