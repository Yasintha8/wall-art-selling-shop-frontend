import { useState } from "react";
import axios from "axios";

export default function LoginPage() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    function handleLogin(){
        console.log("Email: " , email);
        console.log("Password: " ,password);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login successfull", response.data);
        }) .catch(
            (error) => {
                console.log("Login failed", error.response.data);
            }
        )

        console.log("Login Button Clicked");    
    }   

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <input 
                        onChange={(e) => 
                            setEmail(e.target.value)}
                        type="email" 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        placeholder="Email"/>
                    <input 
                        onChange={(e) => 
                            setPassword(e.target.value)}
                        type="password" 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        placeholder="Password"/>

                    <button 
                        onClick={handleLogin}
                        className="w-[400px] h-[50px] bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-xl mt-[20px]">
                    Login</button>
                </div>
            </div>

            <div className="w-[50%] h-full">
                
            </div>
        </div>
    )
}