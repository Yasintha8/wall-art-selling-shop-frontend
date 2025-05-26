import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {

    const [result, setResult] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3_FORM_kEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
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
    <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-24">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Have questions, feedback, or need assistance? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-md space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Subject of your message"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition cursor-pointer"
            >
             {result ? result : "Send Message"}
            </button>
          </div>
        </form>

        <div className="mt-16 text-center text-sm text-gray-500">
          Or reach out via email:{" "}
          <a href="mailto:support@example.com" className="text-primary font-medium">
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
}
