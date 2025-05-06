'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

interface UserInfo {
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Optional: Fetch user info from backend
    fetch('http://localhost:8080/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="bg-green-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">Miti Tibeb</div>

      {/* Navigation */}
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li className="hover:text-green-300 cursor-pointer">Home</li>
        <li className="hover:text-green-300 cursor-pointer">Products</li>
        <li className="hover:text-green-300 cursor-pointer">About</li>
        <li className="hover:text-green-300 cursor-pointer">Contact</li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="ml-auto mr-4 px-3 py-1 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-green-300" />

        {/* Auth Section */}
        {user ? (
          <Link href="/profile" className="flex items-center gap-1 hover:text-green-300">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">{user.email}</span>
          </Link>
        ) : (
          <Link href="/login" className="flex items-center gap-1 hover:text-green-300">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
