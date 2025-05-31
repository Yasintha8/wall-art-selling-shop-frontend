export default function CustomArt() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary-dark text-center">
          Create Your Own Wall Art
        </h2>
        <p className="text-gray-600 mb-8">
          Looking for something unique? Let us design custom wall art that fits your style, space, and story.
        </p>

        <form className="bg-gray-50 p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
          <input
            type="text"
            placeholder="Art Style (e.g., Minimalist, Abstract)"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2"
          />
          <textarea
            placeholder="Describe your idea or inspiration..."
            rows="4"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary-dark text-white py-3 px-6 rounded-lg hover:bg-primary cursor-pointer transition md:col-span-2"
          >
            Submit Custom Art Request
          </button>
        </form>
      </div>
    </section>
  );
}
