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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

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
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#2E2E2E] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold tracking-wide">Miti Tibeb</div>

      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li>
          <Link href="/" className="hover:text-orange-400">Home</Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-orange-400">Products</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-orange-400">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-orange-400">Contact</Link>
        </li> 
    </ul>


      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Only show these if not loading */}
        {!loading && user && (
          <>
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-orange-400" />
            <Link href="/profile" className="flex items-center gap-1 hover:text-orange-400">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">{user.email}</span>
            </Link>
          </>
        )}

        {!loading && !user && (
          <Link href="/login" className="flex items-center gap-1 hover:text-orange-400">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
