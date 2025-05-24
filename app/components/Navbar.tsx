import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#232323] text-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl">
        <Link href="/">Miti Tibeb</Link>
      </div>
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
} 