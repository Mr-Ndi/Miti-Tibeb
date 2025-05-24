'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VendorRegisterForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    VendorPassword: '',
    VendorTin: '',
    ShopName: '',
  });
  const [loading, setLoading] = useState(false);
  const { registerVendor, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await registerVendor({
        ...formData,
        token
      });
      router.push('/login');
    } catch (e) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2E2E2E]">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid or Missing Token</h2>
          <p>Please use the link from your invitation email to register.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E2E2E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Complete Your Vendor Registration
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="VendorPassword" className="sr-only">
                Password
              </label>
              <input
                id="VendorPassword"
                name="VendorPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#1F1F1F] rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.VendorPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="VendorTin" className="sr-only">
                TIN Number
              </label>
              <input
                id="VendorTin"
                name="VendorTin"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#1F1F1F] rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="TIN Number"
                value={formData.VendorTin}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="ShopName" className="sr-only">
                Shop Name
              </label>
              <input
                id="ShopName"
                name="ShopName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#1F1F1F] rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Shop Name"
                value={formData.ShopName}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {loading ? 'Completing registration...' : 'Complete registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 