import axios from "axios";
import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";

export default function UserData(){

    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/user/current",{
                headers: {
                    "Authorization": "Bearer "+token
                }
            }).then((response)=>{
                setUser(response.data.user);
            }).catch((error)=>{
                console.log(error);
                setUser(null);
            })
        }
    })
   
    return(
        <>
         {user==null?(
           <div className="h-full flex justify-center items-center flex-row">
            <Link to="/login" className="bg-accent text-white px-4 py-2 rounded-lg mr-2 hover:bg-white hover:text-accent transition-all duration-300">Login</Link>
            <Link to="/register" className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-white hover:text-accent transition-all duration-300">Register</Link>
           </div>
         ):(
            <div className="h-full flex justify-center items-center flex-row">
                <button 
                onClick={
                    ()=>{
                        localStorage.removeItem("token");
                        setUser(null);
                        window.location.href="/login";
                    }}
                className="bg-accent text-white px-4 py-2 rounded-lg cursor-pointer">Logout</button>
            </div>
         )}
         </>
    )
}