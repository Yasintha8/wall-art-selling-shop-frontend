export default function PrivacyPolicy() {
    return(
        <div className="min-h-screen bg-white px-4 sm:px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-6">
        This Privacy Policy explains how <strong>[Your Store Name]</strong> collects, uses, and protects the personal information you provide when using our website.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Your name, email address, phone number</li>
          <li>Shipping and billing addresses</li>
          <li>Payment and transaction information (processed securely)</li>
          <li>Device and browser data, IP address, and usage information</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>To process and fulfill your orders</li>
          <li>To send updates about your order</li>
          <li>To respond to customer service requests</li>
          <li>To improve our services and user experience</li>
          <li>To send newsletters or promotions (optional)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Cookies</h2>
        <p className="text-gray-600">
          Our website uses cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. You can manage cookie preferences in your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Data Security</h2>
        <p className="text-gray-600">
          We implement industry-standard security measures to protect your information. Sensitive data like payment information is encrypted and handled by secure third-party payment gateways.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Sharing Your Information</h2>
        <p className="text-gray-600">
          We do not sell or rent your personal data. We may share information with trusted third parties only to the extent necessary to process payments, fulfill orders, or provide services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Your Rights</h2>
        <p className="text-gray-600">
          You may request access to, correction of, or deletion of your personal data at any time by emailing us at <a href="mailto:privacy@vibecanvas.com" className="text-blue-600 hover:underline">privacy@vibecanvas.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Changes to This Policy</h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. The latest version will always be available on this page.
        </p>
        <p className="text-sm text-gray-500 mt-2">Last updated: June 29, 2025</p>
      </section>
    </div>
    )
}