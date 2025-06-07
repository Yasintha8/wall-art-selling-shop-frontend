export default function Footer() {
  return (
    <footer className="bg-gray-900 mb-0 text-gray-300 py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & About */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-4">Vibe<span className="text-secondary">Canvas</span></h1>
          {/* <img src="/logo.png" alt="" /> */}
          <p className="text-gray-400">
            YourBrand is dedicated to providing the best products and customer experience. Quality and service are our top priorities.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Shop</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/returns" className="hover:text-white transition">Returns & Exchanges</a></li>
            <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p>1234 Market Street</p>
          <p>San Francisco, CA 94103</p>
          <p>Email: <a href="mailto:support@vibecanvas.com" className="hover:text-white transition">support@yourbrand.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a></p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} VibeCanvas. All rights reserved.
      </div>
    </footer>
  );
}
