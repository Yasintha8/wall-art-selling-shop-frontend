import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryProductPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {
  console.log("Fetching products for category:", category);
  
  axios
    .get(`/api/product/category/${encodeURIComponent(category)}`)
    .then((res) => {
      console.log("API response:", res.data);
      setProducts(res.data.products); // <- Ensure this exists in the API response
    })
    .catch((err) => {
      console.error("Error fetching category products:", err);
      setError("Could not load products.");
    });
}, [category]);


  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Category: {category}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4 shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-primary mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
