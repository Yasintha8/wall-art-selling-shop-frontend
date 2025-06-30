import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";
import SearchBox from "../../components/searchbox";
import { GiShop } from "react-icons/gi";

export default function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Living Rooms", "Religious", "Kitchen", "Resturant"];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  function fetchProducts() {
    let url = import.meta.env.VITE_BACKEND_URL + "/api/product";

    if (selectedCategory !== "All") {
      url += "/category/" + selectedCategory;
    }

    axios
      .get(url)
      .then((res) => {
        setProductList(res.data.products || res.data);
        setProductsLoaded(true);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProductsLoaded(true);
      });
  }

  function searchProducts() {
    if (search.trim().length > 0) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
        .then((res) => {
          setProductList(res.data.products);
          setProductsLoaded(true);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setProductsLoaded(true);
        });
    }
  }

  function handleReset() {
    setSearch("");
    setSelectedCategory("All");
    fetchProducts();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Search and Filter Section */}
      <SearchBox
        search={search}
        setSearch={setSearch}
        onSearch={searchProducts}
        onReset={handleReset}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Product List Section */}
      {productsLoaded ? (
        <div className="w-full flex flex-wrap justify-center gap-4">
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mb-20">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <GiShop className="text-white text-2xl" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Products</h2>
            <p className="text-gray-600">Please wait while we fetch the products...</p>
          </div>
        </div>
      )}
    </div>
  );
}
