import axios from "axios"

export default function AdminProductPage(){

    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response)=>{
            console.log("Products fetched successfully", response.data);
        }
    )
    return(
        <div className="w-full h-full rounded-lg ">
            <h1>Products</h1>
        </div>
    )
}