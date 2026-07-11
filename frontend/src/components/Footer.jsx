import { Link } from 'react-router-dom'
import { 
  FiPhone, 
  FiMail, 
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter
} from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1 — About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🛒</span>
              <span className="text-2xl font-bold text-white">Grocera</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Fresh groceries delivered to your doorstep. 
              Quality products at the best prices.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition">
                <FiFacebook />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition">
                <FiInstagram />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'My Orders', path: '/orders' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="hover:text-green-400 transition text-sm flex items-center gap-1"
                  >
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                'Fruits', 'Vegetables', 'Dairy', 
                'Beverages', 'Snacks', 'Household'
              ].map((cat) => (
                <li key={cat}>
                  <Link 
                    to={`/products?category=${cat.toLowerCase()}`}
                    className="hover:text-green-400 transition text-sm flex items-center gap-1"
                  >
                    → {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>123 Market Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="text-green-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="text-green-400 flex-shrink-0" />
                <span>support@grocera.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-sm text-white font-medium mb-2">
                Newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                />
                <button className="bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm text-white">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm">
            © 2024 Grocera. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition">Refund Policy</a>
          </div>
        </div>
      </div>

    </footer>
  )
}