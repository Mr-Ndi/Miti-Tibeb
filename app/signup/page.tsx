'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ClientFirstName: '',
    ClientOtherName: '',
    ClientEmail: '',
    ClientPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login page after successful registration
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <main className="bg-[#2E2E2E] text-white min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.ClientFirstName}
                onChange={(e) => setFormData({ ...formData, ClientFirstName: e.target.value })}
                className="w-full px-4 py-2 rounded bg-[#2E2E2E] text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="otherName" className="block text-sm font-medium mb-2">
                Other Name
              </label>
              <input
                type="text"
                id="otherName"
                value={formData.ClientOtherName}
                onChange={(e) => setFormData({ ...formData, ClientOtherName: e.target.value })}
                className="w-full px-4 py-2 rounded bg-[#2E2E2E] text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.ClientEmail}
                onChange={(e) => setFormData({ ...formData, ClientEmail: e.target.value })}
                className="w-full px-4 py-2 rounded bg-[#2E2E2E] text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.ClientPassword}
                onChange={(e) => setFormData({ ...formData, ClientPassword: e.target.value })}
                className="w-full px-4 py-2 rounded bg-[#2E2E2E] text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
} 