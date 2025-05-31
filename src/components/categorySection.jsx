import { Link } from "react-router-dom";
import livingroomImg from "../assets/livingroomImg.jpg";
import ReligiousImg from "../assets/ReligiousImg.png";
import kitchenImg from "../assets/kitchenImg.jpg";
import resturantImg from "../assets/resturantImg.jpg";

export default function CategorySection() {
  const categories = [
    { id: 1, name: "Living Room", image: livingroomImg },
    { id: 2, name: "Religious", image: ReligiousImg },
    { id: 3, name: "Kitchen", image: kitchenImg },
    { id: 4, name: "Resturant", image: resturantImg },
  ];

  return (
    <section className="my-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-dark text-center">Wall Arts Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
           onClick={()=>{
            window.location.href = '/products'
           }}
            key={cat.id}
            className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
