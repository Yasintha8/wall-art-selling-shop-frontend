import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            email,
            firstName,
            lastName,
            password,
            phone,
        }).then((response) => {
            console.log("Registration successful", response.data);
            toast.success("Registration successful");
            navigate("/login");
            setLoading(false);
        }).catch((error) => {
            console.log("Registration failed", error.response?.data || error);
            toast.error(error.response?.data?.message || "Registration failed");
            setLoading(false);
        });
    }

    return (
       <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url(/login-bg.jpg)] bg-cover bg-center">
    {/* Left Side - Form */}
    <div className="w-full md:w-1/2 flex justify-center items-center bg-black/30 p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white shadow-2xl rounded-xl p-6 md:p-8">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6 text-center">
                Create Account
            </h2>

            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="First Name"
            />

            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Last Name"
            />

            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Email"
            />

            <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Phone"
            />

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Password"
            />

            <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 border border-white text-white placeholder-gray-300 rounded-xl p-4 mb-4 bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Confirm Password"
            />

            <button
                onClick={handleRegister}
                className="w-full h-12 bg-green-600 text-white rounded-xl hover:bg-green-700 transition mb-4 cursor-pointer"
            >
                {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-white text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-green-300 hover:text-green-500 underline">
                    Login
                </Link>
            </p>
        </div>
    </div>

    {/* Right Side - Optional */}
    <div className="hidden md:block md:w-1/2 h-full"></div>
</div>

    );
}
