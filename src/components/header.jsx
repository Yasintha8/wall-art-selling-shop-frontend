import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    return (
        <header className="w-full h-[70px] flex items-center justify-center bg-primary text-white px-4 relative">
            <div className="w-[500px] bg-[#9B7EBD] backdrop-blur-md rounded-full h-[50px] flex items-center justify-evenly text-white text-[18px]">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/products" className="hover:text-gray-300">Products</Link>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                <Link to="/reviews" className="hover:text-gray-300">Reviews</Link>
            </div>
            <Link to="/cart" className="absolute right-[150px] text-3xl"> <BsCart4 className="text-white"/></Link>
        </header>
    );
}