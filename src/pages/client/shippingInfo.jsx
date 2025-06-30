export default function ShippingInfo() {
    return (
        <div className="min-h-screen bg-white px-4 sm:px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Shipping Information</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Processing Time</h2>
        <p className="text-gray-600 leading-relaxed">
          Orders are processed within <strong>1–2 business days</strong>. Orders placed on weekends or holidays will be processed the next business day.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Options</h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
          <li><strong>Standard Shipping:</strong> 3–7 business days</li>
          <li><strong>Express Shipping:</strong> 1–3 business days</li>
          <li><strong>International Shipping:</strong> 7–21 business days (varies by country)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Costs</h2>
        <p className="text-gray-600 leading-relaxed">
          Shipping costs are calculated at checkout based on the shipping method and destination. Orders over <strong>$100</strong> qualify for <span className="text-green-600 font-semibold">free standard shipping</span> (domestic only).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tracking Your Order</h2>
        <p className="text-gray-600 leading-relaxed">
          Once your order ships, you’ll receive an email with a tracking number. You can also track your order anytime from your account dashboard.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Delays & Issues</h2>
        <p className="text-gray-600 leading-relaxed">
          We are not responsible for delays caused by carriers or customs. If your order is significantly delayed, please contact us at <a href="mailto:support@vibecanvas.com" className="text-blue-600 hover:underline">support@vibecanvas.com</a> and we’ll be happy to assist.
        </p>
      </section>
    </div>
    )
}