import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./loader";
import ProductCard from "./product-card";
import SearchBox from "./searchbox";

export default function ProductsByCategory() {
  const { categoryName } = useParams();

  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "All");

  const categories = ["All", "Living Room", "Religious", "Kitchen", "Resturant"];

  useEffect(() => {
    setSelectedCategory(categoryName || "All");
  }, [categoryName]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  function fetchProducts() {
    setProductsLoaded(false);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/category/" + selectedCategory)
      .then((res) => {
        setProductList(res.data.products);
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
    <div className="flex flex-col px-4 py-6 md:px-8">
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
        <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product._id || product.productId} product={product} />
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
