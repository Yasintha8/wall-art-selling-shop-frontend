import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductPage() {

    const [productList, setProductList] = useState([])
    const [productLoaded, setProductLoaded] = useState(false)

    useEffect(
        ()=>{
            if(!productLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (res)=>{
                        console.log("Products fetched successfully", res);
                        setProductList(res.data)
                        setProductLoaded(true)
                    }
                )
            }
            
        },[productLoaded]
    )
    return (
        <div className="w-full h-full">
            {
                productLoaded?
                <div className="w-full h-full flex flex-wrap justify-center gap-4 p-4 ">
                    {
                        productList.map(
                            (product) => {
                                return(
                                    <ProductCard key={product.productId} product={product} />
                                )
                            }

                        )
                    }
                </div>
                :
                <Loader />
            }
        </div>
    )
}