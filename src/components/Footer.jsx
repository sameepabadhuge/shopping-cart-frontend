import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 px-4 md:px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">
            FreshCart
          </h2>

          <p className="text-gray-600 mt-3 text-sm leading-6">
            Fresh vegetables, fruits, cakes and groceries
            delivered to your doorstep.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Home</li>
            <li>Shop</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-3">Contact</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li>support@freshcart.com</li>
            <li>+94 70 225 6830</li>
            <li>Colombo Sri Lanka</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:text-green-600 cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:text-green-600 cursor-pointer">
              <FaInstagram />
            </div>

            <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:text-green-600 cursor-pointer">
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        © 2026 FreshCart. All rights reserved.
      </p>
    </footer>
  );
}