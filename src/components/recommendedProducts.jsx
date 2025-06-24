import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/recommended-products")
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-gray-700">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="my-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-dark text-center">
        Recommended Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No recommended products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id || product.productId}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group relative"
            >
              <Link to={`/overview/${product.productId}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.productId}</p>
                  <p className="text-lg font-bold text-accent mt-2">
                    LKR {product.price.toFixed(2)}
                  </p>
                  <span className="line-through text-gray-400 text-sm">
                    {product.price < product.labeledPrice &&
                      product.labeledPrice.toFixed(2)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
