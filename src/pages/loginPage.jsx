import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate();
    const loginWithGoogle = useGoogleLogin(
        {
            onSuccess: (res) => {
                setLoading(true);
                axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/google",{
                    accessToken: res.access_token
                }).then(
                    (response)=>{
                        console.log("Login successfull", response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if(user.role === "admin"){
                    // Redirect to admin page
                    navigate("/admin");
                } else {
                    // Redirect to home page
                    navigate("/");
                }
            setLoading(false);
                    }
                )
            },
            onError: (error) => {
                console.log("Login Failed", error);
            }
        }
    )

    function handleLogin(){
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login successfull", response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if(user.role === "admin"){
                    // Redirect to admin page
                    navigate("/admin");
                } else {
                    // Redirect to home page
                    navigate("/");
                }
            setLoading(false);

        }) .catch(
            (error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message||"Login failed")
                setLoading(false);
            }
        )

        console.log("Login Button Clicked");    
    }   

    return (
         <div className="w-full min-h-screen flex bg-[url('/login-bg.jpg')] bg-cover bg-center">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-black/40 p-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white shadow-2xl rounded-xl p-8">
                    <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6 text-center">
                        Welcome Back
                    </h2>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full h-12 mb-4 border border-white text-white placeholder-gray-300 rounded-xl p-4 bg-transparent focus:outline-none"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full h-12 mb-4 border border-white text-white placeholder-gray-300 rounded-xl p-4 bg-transparent focus:outline-none"
                        placeholder="Password"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full h-12 bg-green-600 text-white rounded-xl hover:bg-green-700 transition mb-4"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <button
                        onClick={loginWithGoogle}
                        className="w-full h-12 bg-white text-gray-800 rounded-xl flex items-center justify-center hover:shadow-lg transition"
                    >
                        <FcGoogle className="text-2xl mr-2" />
                        {loading ? "Loading..." : "Login with Google"}
                    </button>

                    <p className="text-white mt-6 text-sm text-center">
                        Don't have an account yet?{" "}
                        <Link to="/register" className="text-green-300 hover:text-green-500 underline">
                            Register Now
                        </Link>
                    </p>
                    {/* forget password */}
                    <p className="text-white mt-6 text-sm text-center">
                        <Link to="/forget" className="text-green-300 hover:text-green-500 underline">
                            Forget Password
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Section - Decorative Panel */}
            <div className="hidden md:block md:w-1/2 h-full"></div>
        </div>
    )
}