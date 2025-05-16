import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"
import { useNavigate } from "react-router-dom"

export default function ProductOverview() {
     const params =useParams()
     console.log(params.id)
     if(params.id==null){
        window.location.href="/products"
     }

     const [product, setProduct] = useState(null)
     const [status, setStatus] = useState("loading") //loading,loaded, error
     const navigate = useNavigate()

     useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        console.log("Product fetched successfully", res);
                        setProduct(res.data.product)
                        setStatus("loaded")
                    }
                ).catch(
                    ()=>{
                        toast.error("Product is not available")
                        setStatus("error")
                    }
                )

            }
        },[status]
     )
    return(
        <div className="w-full h-full">
        {
            status == "loading"&&
            <Loader />
        }
        {
            status == "loaded"&&
            <div className="w-full h-full flex flex-col lg:flex-row">
                <h1 className="text-3xl lg:hidden font-bold text-center">{product.name}</h1>
                <h2 className="text-xl lg:hidden font-semibold text-gray-500 text-center mb-[40px]">{product.altNames.join(" | ")}</h2>
                <div className="w-full lg:h-full lg:w-[50%]">
                    <ImageSlider images={product.images}/>
                </div>
                <div className="w-full lg:w-[50%] pt-[100px] h-full p-[40px]">
                    <h1 className="hidden lg:block text-3xl font-bold text-center">{product.name}</h1>
                    <h2 className="hidden lg:block text-xl font-semibold text-gray-500 text-center mb-[40px]">{product.altNames.join(" | ")}</h2>
                    <div className="w-full flex justify-center mb-[40px]">
                        {
                            product.labeledPrice>product.price? 
                            <>
                            <h2 className="text-2xl mr-[20px]">LKR: {product.price.toFixed(2)}</h2>
                            <h2 className="text-2xl line-through text-gray-500">LKR: {product.labeledPrice.toFixed(2)}</h2>
                            </>:
                            <h2>{product.price}</h2>
                    }
                    </div>
                    <p className="text-lg font-semibold text-gray-500 text-center mb-[40px]">{product.description}</p>
                    <div className="w-full flex justify-center mb-[40px]">
                        <button className="bg-primary text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:border  border-primary hover:text-primary cursor-pointer transition-all duration-300"
                        onClick={
                            ()=>{
                                addToCart(product, 1)
                                toast.success("Product added to cart")
                                console.log(getCart())
                                console.log("Product added to cart")
                            }
                        }>Add to Cart</button>
                        <button 
                        onClick={
                            ()=>{
                                navigate("/checkout",{
                                    state: {
                                        items: [
                                            {
                                                productId: product._id,
                                                name: product.name,
                                                altNames: product.altNames,
                                                price: product.price,
                                                labeledPrice: product.labeledPrice,
                                                image: product.images[0],
                                                quantity: 1
                                            }
                                        ]
                                    }
                                })
                            }
                        }
                        className="bg-secondary text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:border border-secondary hover:text-secondary cursor-pointer transition-all duration-300 ml-[20px]">
                            Buy Now</button>
                    </div>
                </div>
            </div>
        }
        {
            status == "error"&&
            <div>
                ERROR
            </div>
        }
            
        </div>
    )
}