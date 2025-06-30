export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white px-4 sm:px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>

      <p className="text-gray-600 mb-6">
        These Terms of Service (“Terms”) govern your access to and use of the <strong>VibaCanvas</strong> website and services. By accessing our website, you agree to comply with and be bound by these Terms.
      </p>

      {/* 1. Use of the Website */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Use of the Website</h2>
        <p className="text-gray-600">
          You must be at least 18 years old to make purchases on our website. You agree not to use the site for any unlawful or prohibited activities.
        </p>
      </section>

      {/* 2. Product Descriptions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Product Descriptions</h2>
        <p className="text-gray-600">
          We strive to ensure product descriptions and images are accurate. However, we do not warrant that descriptions are error-free. If you are not satisfied, you may return the product according to our Return Policy.
        </p>
      </section>

      {/* 3. Pricing and Payment */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Pricing and Payment</h2>
        <p className="text-gray-600">
          Prices are listed in [your currency] and are subject to change without notice. We accept major payment methods via secure payment gateways. Orders are confirmed only after payment is successfully processed.
        </p>
      </section>

      {/* 4. Shipping & Delivery */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Shipping & Delivery</h2>
        <p className="text-gray-600">
          Delivery times are estimates and may vary. We are not responsible for delays caused by shipping carriers or customs clearance.
        </p>
      </section>

      {/* 5. Returns & Refunds */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Returns & Refunds</h2>
        <p className="text-gray-600">
          Returns are accepted within 14 days as per our Return Policy. Returned items must be unused and in original condition.
        </p>
      </section>

      {/* 6. Intellectual Property */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Intellectual Property</h2>
        <p className="text-gray-600">
          All content on this website, including text, images, logos, and design, is the property of [Your Store Name] and protected by copyright laws. You may not use or reproduce content without permission.
        </p>
      </section>

      {/* 7. Limitation of Liability */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Limitation of Liability</h2>
        <p className="text-gray-600">
          We are not liable for any indirect, incidental, or consequential damages arising from your use of the website or purchase of products.
        </p>
      </section>

      {/* 8. Changes to Terms */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">8. Changes to These Terms</h2>
        <p className="text-gray-600">
          We reserve the right to modify these Terms at any time. Changes will be posted on this page with the updated date. Continued use of the site means you accept the changes.
        </p>
      </section>

      {/* 9. Contact Us */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">9. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about these Terms, please contact us at <a href="mailto:support@vibecanvas.com" className="text-blue-600 hover:underline">support@vibecanvas.com</a>.
        </p>
        <p className="text-sm text-gray-500 mt-2">Last updated: June 29, 2025</p>
      </section>
    </div>
    )
}