export default function TrustSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Free Shipping & Returns",
      description: "Enjoy complimentary worldwide shipping on all orders over $50. Hassle-free 30-day returns with prepaid labels.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
      textColor: "text-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure Payments",
      description: "Bank-level security with 256-bit SSL encryption. Multiple payment options including PayPal, Stripe, and major credit cards.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100",
      textColor: "text-emerald-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship backed by our lifetime quality promise. 100% satisfaction or your money back.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      textColor: "text-purple-600"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary bg-opacity-10 rounded-full mb-6">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <div className="w-1 h-1 bg-primary opacity-60 rounded-full"></div>
              <div className="w-1 h-1 bg-primary opacity-30 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-primary">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our commitment to excellence, security, and customer satisfaction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Card */}
              <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} border border-white border-opacity-20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500`}>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-white bg-opacity-20 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full filter blur-lg"></div>
                
                {/* Icon */}
                <div className={`relative ${feature.iconBg} ${feature.textColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-full mx-8 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>

              {/* Connecting line for desktop */}
              {index < features.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-gray-200 to-transparent transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-80 border border-gray-200 rounded-full shadow-lg">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 font-medium">Trusted by 10,000+ customers worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}