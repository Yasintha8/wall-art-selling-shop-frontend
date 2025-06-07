import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { Link } from "react-router-dom";
import getCart, { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/trending-products")
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
    <div className="my-8 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-dark text-center">Trending Wall Arts</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No trending products found.</p>
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
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.productId}</p>
                <p className="text-lg font-bold text-accent mt-2">
                  LKR {product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Item added to cart");
                    console.log(getCart());
                  }}
                  className="absolute top-3 right-3 bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition shadow-lg cursor-pointer"
                  aria-label="Add to cart"
                >
                  <FaShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
