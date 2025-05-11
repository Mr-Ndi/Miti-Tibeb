'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserInfo {
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => {
        setUser(null);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#2E2E2E] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link href="/" className="text-2xl font-bold tracking-wide hover:text-orange-400">
        Miti Tibeb
      </Link>

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
        {!loading && user && (
          <>
            <Link href="/cart" className="hover:text-orange-400">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link href="/profile" className="flex items-center gap-1 hover:text-orange-400">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">{user.email}</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-orange-400"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </>
        )}

        {!loading && !user && (
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-1 hover:text-orange-400">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Login</span>
            </Link>
            <Link 
              href="/signup" 
              className="hidden md:block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
