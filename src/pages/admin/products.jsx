import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    console.log("Products fetched successfully", response.data);
                    setProducts(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                    toast.error("Failed to load products");
                });
        }
    }, [loaded]);

    async function deleteProduct(id) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first to delete product");
            return;
        }

        try {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setLoaded(false);
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Product delete failed");
        }
    }

    return (
        <div className="w-full h-full p-6 bg-white rounded-lg shadow-md relative">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">🛍️ Product Management</h1>

            {!loaded ? (
                <Loader />
            ) : (
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 text-sm text-gray-600">
                            <tr>
                                <th className="p-3 text-left">Product ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-right">Price</th>
                                <th className="p-3 text-right">Labeled Price</th>
                                <th className="p-3 text-center">Stock</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition-colors text-sm"
                                >
                                    <td className="p-3 text-gray-700">{product.productId}</td>
                                    <td className="p-3 text-gray-700">{product.name}</td>
                                    <td className="p-3 text-right text-gray-700">${product.price}</td>
                                    <td className="p-3 text-right text-gray-700">${product.labeledPrice}</td>
                                    <td className="p-3 text-center text-gray-700">{product.stock}</td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => deleteProduct(product.productId)}
                                                className="text-red-600 hover:text-red-800 transition"
                                                title="Delete Product"
                                            >
                                                <FaRegTrashAlt className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate("/admin/editproducts", {
                                                        state: product,
                                                    })
                                                }
                                                className="text-blue-600 hover:text-blue-800 transition"
                                                title="Edit Product"
                                            >
                                                <GrEdit className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Link
                to="/admin/addproducts"
                className="fixed bottom-6 right-6 bg-gray-700 hover:bg-gray-900 text-white text-xl p-4 rounded-full shadow-lg transition"
                title="Add Product"
            >
                <FaPlus />
            </Link>
        </div>
    );
}
