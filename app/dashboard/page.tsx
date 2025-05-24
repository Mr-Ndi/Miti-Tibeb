'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { fetchApi } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  material: string;
  vendor: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  vendor: string;
}

// Admin Dashboard Component
function AdminDashboard() {
  const { inviteVendor } = useAuth();
  const [inviteData, setInviteData] = useState({
    VendorEmail: '',
    VendorFirstName: '',
    VendorOtherName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inviteVendor(inviteData);
      setInviteData({ VendorEmail: '', VendorFirstName: '', VendorOtherName: '' });
      alert('Vendor invited successfully!');
    } catch (e) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Invite a Vendor</h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Vendor Email"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={inviteData.VendorEmail}
              onChange={(e) => setInviteData(prev => ({ ...prev, VendorEmail: e.target.value }))}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={inviteData.VendorFirstName}
              onChange={(e) => setInviteData(prev => ({ ...prev, VendorFirstName: e.target.value }))}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Other Name"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={inviteData.VendorOtherName}
              onChange={(e) => setInviteData(prev => ({ ...prev, VendorOtherName: e.target.value }))}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {loading ? 'Sending Invitation...' : 'Send Invitation'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Vendor Dashboard Component
function VendorDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    material: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchApi<{ data: Product[] }>('/vendor/products');
      setProducts(data.data || []);
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchApi('/vendor/upload', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setFormData({ name: '', price: '', category: '', material: '' });
      loadProducts();
    } catch (e) {
      console.error('Failed to upload product:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Vendor Dashboard</h1>
      
      <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Upload New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Category"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Material"
              className="w-full px-3 py-2 bg-[#2E2E2E] text-white rounded-md"
              value={formData.material}
              onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>
        </form>
      </div>

      <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Your Products</h2>
        {loading ? (
          <div className="text-white">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-white">No products uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="bg-[#2E2E2E] p-4 rounded-md">
                <h3 className="text-white font-semibold">{product.name}</h3>
                <p className="text-orange-400">${product.price}</p>
                <p className="text-gray-400">{product.category}</p>
                <p className="text-gray-400">{product.material}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Client Dashboard Component
function ClientDashboard() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await fetchApi<{ data: WishlistItem[] }>('/user/wishlist');
      setWishlist(data.data || []);
    } catch (e) {
      console.error('Failed to load wishlist:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Client Dashboard</h1>
      
      <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Your Wishlist</h2>
        {loading ? (
          <div className="text-white">Loading wishlist...</div>
        ) : wishlist.length === 0 ? (
          <div className="text-white">Your wishlist is empty.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item: any) => (
              <div key={item.id} className="bg-[#2E2E2E] p-4 rounded-md">
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-orange-400">${item.price}</p>
                <p className="text-gray-400">{item.vendor}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2E2E2E]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#2E2E2E]">
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'vendor' && <VendorDashboard />}
      {user.role === 'client' && <ClientDashboard />}
    </div>
  );
} 