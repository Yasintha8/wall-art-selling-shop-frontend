import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-primary-dark text-center">Trending Wall Arts</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No trending products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(({ _id, productId, name, price, images }) => (
            <Link
              to={`/overview/${productId}`}
              key={_id || productId}
              className="rounded-lg p-4 shadow hover:shadow-lg transition block"
            >
              <img
                src={images[0]}
                alt={name}
                className="w-full h-[200px] object-cover rounded"
                loading="lazy"
              />
              <h3 className="mt-4 font-semibold text-gray-800">{name}</h3>
              <p className="text-gray-600 text-sm">{productId}</p>
              <p className="text-accent font-bold mt-2">LKR {price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
