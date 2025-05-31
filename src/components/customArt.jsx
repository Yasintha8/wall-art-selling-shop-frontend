import { useState } from "react";
import toast from "react-hot-toast";

export default function CustomArt() {
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
      toast.success("Your Custom Art Request has been sent successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <section className="bg-white py-20 px-6 md:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary-dark">
          Create Your Own Wall Art
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Looking for something unique? Let us design custom wall art that fits your style, space, and story.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-gray-50 p-8 md:p-10 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            required
          />
          <input
            type="text"
            name="style"
            placeholder="Art Style (e.g., Minimalist, Abstract)"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark md:col-span-2"
          />
          <textarea
            name="message"
            placeholder="Describe your idea or inspiration..."
            rows="5"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark md:col-span-2"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary-dark hover:bg-primary transition-all duration-300 text-white font-semibold py-3 px-6 rounded-lg md:col-span-2 cursor-pointer"
          >
            {result ? result : "Submit Custom Art Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
