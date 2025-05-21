import HeroCarousel from "../../components/heroCarousel";

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      {/* categories */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-[var(--color-primary-dark)] mb-10">
          Shop by Category
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {["Abstract", "Nature", "Minimal", "Photography"].map((category, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={`https://source.unsplash.com/400x300/?${category.toLowerCase()},art`}
                alt={category}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[var(--color-primary-dark)] mb-10">
          New Arrivals
        </h2>
        <div className="grid gap-8 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img
                src={`https://source.unsplash.com/400x400/?wall,art,new${i}`}
                alt="New Art"
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Art Title #{i}</h4>
                <p className="text-[var(--color-secondary)] font-bold mt-2">$55.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10">
          Why Choose WallArtify?
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-left">
          {[
            { title: "Museum-Grade Quality", desc: "Printed on premium materials that last a lifetime." },
            { title: "Unique Designs", desc: "Curated by top artists from around the world." },
            { title: "Fast Delivery", desc: "Shipped securely and quickly, right to your door." },
            { title: "Satisfaction Guaranteed", desc: "Easy returns and dedicated customer support." }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
        
       {/* Call to Action (CTA) Banner  */}
       <section className="flex items-center justify-center bg-gray-50 px-4 py-16">
        <div class="flex flex-col md:flex-row items-center justify-around text-sm border rounded-2xl m-2 max-w-5xl w-full bg-white">
          <div class="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
              <h2 class="md:text-4xl text-2xl font-bold text-gray-800">Boost your productivity.<span class="text-indigo-500"> Start using our app today.</span></h2>

              <div class="flex items-center gap-4 mt-6">
                  <button type="button" aria-label="getStarted" class="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                      Get started
                  </button>
                  <button type="button" class="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition">
                      Learn more
                      <svg class="mt-1 group-hover:translate-x-0.5 transition-all" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </button>
              </div>
          </div>

          <img class="max-w-[375px] pt-10 md:p-0" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png" alt="excitedWomenImage"/>
      </div>
      </section>

    </div>
  );
}
