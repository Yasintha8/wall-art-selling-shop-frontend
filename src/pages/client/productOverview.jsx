import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"

export default function ProductOverview() {
     const params =useParams()
     console.log(params.id)
     if(params.id==null){
        window.location.href="/products"
     }

     const [product, setProduct] = useState(null)
     const [status, setStatus] = useState("loading") //loading,loaded, error

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
            <div className="w-full h-full flex">
                <div className="w-[50%] h-full">
                    <ImageSlider images={product.images}/>
                </div>
                <div className="w-[50%] h-full p-[40px]">
                    <h1 className="text-3xl font-bold text-center">{product.name}</h1>
                    <h2 className="text-xl font-semibold text-gray-500 text-center mb-[40px]">{product.altNames.join(" | ")}</h2>
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
                        <button className="bg-orange-400 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:border border-orange-400 hover:text-orange-400 cursor-pointer transition-all duration-300"
                        onClick={
                            ()=>{
                                addToCart(product, 1)
                                toast.success("Product added to cart")
                                console.log(getCart())
                                console.log("Product added to cart")
                            }
                        }>Add to Cart</button>
                        <button className="bg-orange-400 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:border border-orange-400 hover:text-orange-400 cursor-pointer transition-all duration-300 ml-[20px]">Buy Now</button>
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