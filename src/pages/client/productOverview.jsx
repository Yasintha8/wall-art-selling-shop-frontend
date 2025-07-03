import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"
import RecommendedProducts from "../../components/recommendedProducts"

export default function ProductOverview() {
    const params = useParams()
    const navigate = useNavigate()

    if (!params.id) {
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    useEffect(() => {
    setStatus("loading");

    axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
        .then((res) => {
        setProduct(res.data.product);
        setStatus("loaded");
        window.scrollTo(0, 0);
        })
        .catch(() => {
        toast.error("Product is not available");
        setStatus("error");
        });
    }, [params.id]);

    const calculateDiscount = () => {
        if (product.labeledPrice > product.price) {
            return Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)
        }
        return 0
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {status === "loading" && (
                <div className="flex items-center justify-center min-h-screen">
                    <Loader />
                </div>
            )}

            {status === "loaded" && (
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                        <button onClick={() => navigate("/products")} className="hover:text-primary transition-colors">
                            Products
                        </button>
                        <span>›</span>
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="lg:sticky lg:top-8">
                                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-3 sm:p-4 lg:p-6 border border-gray-100">
                                    <div className="w-full">
                                        <ImageSlider images={product.images} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6 sm:space-y-8">
                            {/* Header */}
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h1 className="mt-10 sm:mt-0 text-2xl sm:text-4xl font-bold text-gray-900 leading-tight mb-1">
                                            {product.name}
                                        </h1>
                                        {product.altNames.length > 0 && (
                                            <p className="text-sm sm:text-lg text-gray-600 font-medium">
                                                {product.altNames.join(" • ")}
                                            </p>
                                        )}
                                    </div>
                                    {calculateDiscount() > 0 && (
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                                            -{calculateDiscount()}%
                                        </div>
                                    )}
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-600">(4.8 out of 5)</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                                <div className="flex items-baseline space-x-3 mb-3">
                                    <span className="text-2xl sm:text-4xl font-bold text-primary">
                                        LKR {product.price.toFixed(2)}
                                    </span>
                                    {product.labeledPrice > product.price && (
                                        <span className="text-lg sm:text-2xl text-gray-400 line-through">
                                            LKR {product.labeledPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-green-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free shipping on orders over LKR 5,000</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Product Description</h3>
                                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Sizes */}

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-3">
                                <label className="text-sm font-medium text-gray-900">Quantity:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 text-gray-900 font-medium min-w-[40px] text-center">
                                        {selectedQuantity}
                                    </span>
                                    <button
                                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                                <button
                                    onClick={() => {
                                        addToCart(product, selectedQuantity)
                                        toast.success(`${selectedQuantity} item(s) added to cart`)
                                        console.log(getCart())
                                    }}
                                    className="w-full sm:w-1/2 h-12 sm:h-14 bg-primary text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: {
                                                items: [{
                                                    productId: product.productId,
                                                    name: product.name,
                                                    altNames: product.altNames,
                                                    price: product.price,
                                                    labeledPrice: product.labeledPrice,
                                                    image: product.images[0],
                                                    quantity: selectedQuantity
                                                }]
                                            }
                                        })
                                    }}
                                    className="w-full sm:w-1/2 h-12 sm:h-14 bg-gradient-to-r from-secondary to-secondary/90 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-secondary/90 hover:to-secondary transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Buy Now</span>
                                </button>
                            </div>

                            {/* Info Boxes */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-blue-900">Easy Returns</p>
                                    <p className="text-[10px] sm:text-xs text-blue-700">30-day return policy</p>
                                </div>
                                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-green-900">Secure Payment</p>
                                    <p className="text-[10px] sm:text-xs text-green-700">SSL encrypted checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-8">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">Sorry, we couldn't load this product. Please try again later.</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-primary text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors"
                        >
                            Browse Products
                        </button>
                    </div>
                </div>
            )}
            <RecommendedProducts />
        </div>
    )
}
