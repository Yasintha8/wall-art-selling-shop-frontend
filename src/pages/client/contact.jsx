import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [result, setResult] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3_FORM_kEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Message sent successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-16 md:px-20 lg:px-32">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Have questions, feedback, or need assistance? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
              placeholder="Subject of your message"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
            >
              {result ? result : "Send Message"}
            </button>
          </div>
        </form>

        <div className="mt-14 text-center text-sm text-gray-500">
          Or reach out via email:{" "}
          <a
            href="mailto:support@example.com"
            className="text-primary font-medium hover:underline"
          >
            support@vibecanvas.lk
          </a>
        </div>
      </div>
    </div>
  );
}
