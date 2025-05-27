import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

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
  <div className="w-full flex items-center justify-center gap-4 p-4 mt-2">
    {/* Category Select */}
    <div className="flex items-center gap-2">
      <label htmlFor="category" className="text-gray-600 font-medium">
        Category:
      </label>
      <div className="relative">
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none h-[40px] pl-4 pr-10 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search for products"
      value={search}
      className="w-[250px] h-[40px] border border-gray-400 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          searchProducts();
        }
      }}
    />

    {/* Search Button */}
    <button
      onClick={searchProducts}
      className="w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md"
    >
      Search
    </button>

    {/* Reset Button */}
    <button
      onClick={handleReset}
      className="w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md"
    >
      Reset
    </button>
  </div>

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
    <Loader />
  )}
</div>

  );
}
