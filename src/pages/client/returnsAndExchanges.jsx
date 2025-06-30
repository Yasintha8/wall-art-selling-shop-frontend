export default function ReturnsAndExchanges() {
    return (
        <div className="min-h-screen bg-white px-4 sm:px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Returns & Exchanges</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Return Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          We want you to love your purchase! If you're not completely satisfied, you may return most new, unused items within <strong>14 days</strong> of delivery for a full refund or exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">How to Return</h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
          <li>Email us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@vibecanvas.com</a> with your order number and reason for return.</li>
          <li>Pack the item securely in its original packaging.</li>
          <li>Ship it back using a trackable method. Customers are responsible for return shipping costs unless the item was defective or wrong.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Exchanges</h2>
        <p className="text-gray-600 leading-relaxed">
          Need a different size or color? No problem! Just let us know, and we’ll help you exchange your item. Exchanges must also be initiated within <strong>14 days</strong> of receiving your order.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Non-Returnable Items</h2>
        <p className="text-gray-600 leading-relaxed">
          Some items are non-returnable for hygiene or customization reasons (e.g. personalized products, opened cosmetics, etc.). These will be clearly marked on the product page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Refunds</h2>
        <p className="text-gray-600 leading-relaxed">
          Once your return is received and inspected, we’ll notify you via email. If approved, your refund will be processed within 5–7 business days to your original payment method.
        </p>
      </section>
    </div>
    );
}