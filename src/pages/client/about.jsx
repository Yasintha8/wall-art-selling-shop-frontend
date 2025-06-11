import abvideo from '../../assets/abvideo.mp4';
import abimg from '../../assets/abimg.png';

export default function About() {
  return (
    <div className='min-h-screen flex flex-col'>
      <section className="bg-white text-gray-800 px-4 sm:px-6 py-12 lg:px-24">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About VibeCanvas</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-10">
            At <strong>VibeCanvas</strong>, we believe that every wall deserves a story. Our mission is to transform spaces with meaningful, high-quality wall art that evokes emotion, inspires creativity, and reflects personality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Vision */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              We envision a world where art is not just admired in galleries, but celebrated in everyday life. That’s why we curate a wide range of canvas prints and digital artwork—each crafted with precision and passion—to help you turn ordinary walls into stunning expressions of self.
            </p>
          </div>

          {/* Video Section */}
          <div className="w-full aspect-square sm:aspect-video rounded-lg shadow-lg overflow-hidden">
            <video
              src={abvideo}
              controls
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Image Section */}
          <div className="w-full aspect-square rounded-lg shadow-lg overflow-hidden">
            <img
              src={abimg}
              alt="Our Team at Work"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Premium-quality canvas and materials</li>
              <li>Unique and modern designs curated by passionate artists</li>
              <li>Fast, secure shipping across Sri Lanka and worldwide</li>
              <li>Excellent customer support and satisfaction guarantee</li>
            </ul>
          </div>
        </div>

        {/* Closing Text */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h3 className="text-2xl font-semibold mb-3">More Than Decor – It's a Vibe</h3>
          <p className="text-gray-600 text-base">
            Whether you’re revamping your home, decorating your studio, or gifting something special, VibeCanvas offers wall art that speaks to your soul. Join our growing community of design lovers and art enthusiasts. Let's create your vibe, one canvas at a time.
          </p>
        </div>
      </section>
    </div>
  );
}
