export default function TrustSection() {
  return (
    <section className="py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-dark text-center">
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4 text-gray-700">
              🚚
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping & Returns</h3>
            <p className="text-gray-600">
              Enjoy fast and free delivery on all orders. Easy 14-day return policy.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4 text-gray-700">
              🔒
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard SSL encryption and secure checkout.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4 text-gray-700">
              ✅
            </div>
            <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
            <p className="text-gray-600">
              We stand behind our art. Not satisfied? We’ll make it right—no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
