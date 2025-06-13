import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"

export default function ProductOverview() {
    const params = useParams()
    const navigate = useNavigate()

    if (!params.id) {
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        if (status === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
                .then((res) => {
                    setProduct(res.data.product)
                    setStatus("loaded")
                })
                .catch(() => {
                    toast.error("Product is not available")
                    setStatus("error")
                })
        }
    }, [status, params.id])

    return (
        <div className="w-full min-h-screen p-4">
            {status === "loading" && <Loader />}

            {status === "loaded" && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Slider */}
                    <div className="w-full lg:h-full lg:w-[50%] flex flex-col items-center mb-6 lg:mb-0">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="mb-8"></div>
                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
                        {/* Name & Alt Names */}
                        <div className="w-full px-4 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold mb-1">{product.name}</h1>
                            <h2 className="text-md text-gray-500 mb-4">{product.altNames.join(" | ")}</h2>
                        </div>

                        {/* Price */}
                        <div className="flex justify-center items-center gap-3 mb-6">
                            <h2 className="text-xl text-primary font-semibold">LKR: {product.price.toFixed(2)}</h2>
                            {product.labeledPrice > product.price && (
                                <h2 className="text-xl line-through text-gray-400">LKR: {product.labeledPrice.toFixed(2)}</h2>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-600 text-center mb-6 leading-relaxed">{product.description}</p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                            <button
                                onClick={() => {
                                    addToCart(product, 1)
                                    console.log(getCart())
                                    toast.success("Product added to cart")
                                }}
                                className="bg-primary text-white w-full sm:w-[180px] h-[50px] rounded-lg hover:bg-white hover:border border-primary hover:text-primary transition-all duration-300 cursor-pointer"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/checkout", {
                                        state: {
                                            items: [{
                                                productId: product._id,
                                                name: product.name,
                                                altNames: product.altNames,
                                                price: product.price,
                                                labeledPrice: product.labeledPrice,
                                                image: product.images[0],
                                                quantity: 1
                                            }]
                                        }
                                    })
                                }}
                                className="bg-secondary text-white w-full sm:w-[180px] h-[50px] rounded-lg hover:bg-white hover:border border-secondary hover:text-secondary transition-all duration-300 cursor-pointer"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="text-center text-red-500 mt-10 text-xl">
                    Failed to load product. Please try again later.
                </div>
            )}
        </div>
    )
}
