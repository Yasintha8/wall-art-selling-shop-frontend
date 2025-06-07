import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";
import SearchBox from "../../components/searchbox";

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
        <Loader />
      )}
    </div>
  );
}
