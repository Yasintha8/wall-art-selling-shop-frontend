import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Elevate Your Space with Stunning Wall Art',
      description: 'Discover unique pieces to personalize your home or office.',
      image: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Modern Styles for Modern Homes',
      description: 'Art that speaks to your style and space.',
      image: 'https://plus.unsplash.com/premium_photo-1706152482966-a295c922cdcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Limited Edition Prints Available Now',
      description: 'Shop exclusive collections before they’re gone!',
      image: 'https://images.unsplash.com/photo-1631510083755-11ecb5172d81?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="text-white my-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="relative rounded-3xl overflow-hidden shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full group">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center justify-start text-left px-8 sm:px-12 md:px-16">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-md sm:text-lg text-gray-100 mb-6 drop-shadow-sm">
                    {slide.description}
                  </p>
                  <button 
                    onClick={() => navigate("/products")}
                    className="bg-[var(--color-accent)] hover:bg-orange-600 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-md transition duration-300 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
