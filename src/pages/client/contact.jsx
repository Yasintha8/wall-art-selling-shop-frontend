export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
                <p className="text-center text-gray-600 mb-12">
                    Have questions, feedback, or need assistance? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Subject of your message"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            rows={5}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="mt-16 text-center text-sm text-gray-500">
                    Or reach out via email: <a href="mailto:support@example.com" className="text-primary font-medium">support@example.com</a>
                </div>
            </div>
        </div>
    );
}
