export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Miti Tibeb</h2>
          <p className="text-sm text-gray-400">Art of Trees</p>
          <p className="text-xs mt-2 text-gray-500">
            "Miti" (Swahili = Trees), "Tibeb" (Amharic = Art/Wisdom)
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigate</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">Products</li>
            <li className="hover:text-orange-400 cursor-pointer">About</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@miti.tibeb.com</p>
          <p className="text-sm text-gray-300">Phone: +251 911 123 456</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="flex gap-4 text-orange-400">
            <li className="cursor-pointer hover:text-white">Facebook</li>
            <li className="cursor-pointer hover:text-white">Instagram</li>
            <li className="cursor-pointer hover:text-white">Twitter</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Miti Tibeb. All rights reserved.
      </div>
    </footer>
  );
}
