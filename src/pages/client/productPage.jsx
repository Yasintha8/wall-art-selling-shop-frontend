import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductPage() {

    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [search, setSearch] = useState("")
    useEffect(
        ()=>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/").then(
                    (res)=>{
                        setProductList(res.data)
                        setProductsLoaded(true)
                    }
                )
            }
            
        },[productsLoaded]
    )
    function searchProducts(){
    if(search.trim().length > 0){
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
        .then((res) => {
            setProductList(res.data.products);
            setProductsLoaded(true);
        })
        .catch(err => {
            console.error("Search error:", err);
            setProductsLoaded(true);
        })
    }
}

    return (
        <div className="w-full h-full">
            <div className="w-full h-[50px] flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={search}
                    className="w-[300px] h-[40px] border-[1px] border-gray-400 rounded-md px-2 mt-5"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                    onClick={() => searchProducts(search)}
                    className="w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md ml-2 mt-5 cursor-pointer"
                    >
                    Search
                    </button>
                    <button 
                    onClick={()=>{
                        setProductsLoaded(false)
                    }}
                    className="w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md ml-2 mt-5 cursor-pointer">
                        Reset
                    </button>
            </div>
            {
                productsLoaded?
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