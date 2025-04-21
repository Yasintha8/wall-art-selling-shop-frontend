import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[70px] flex items-center justify-center bg-gray-800 text-white px-4">
            <div className="w-[500px] bg-gray-500/30 backdrop-blur-md rounded-full h-[50px] flex items-center justify-evenly text-orange-300 text-[18px]">
                <Link to="/" className="hover:text-orange-400">Home</Link>
                <Link to="/products" className="hover:text-orange-400">Products</Link>
                <Link to="/contact" className="hover:text-orange-400">Contact</Link>
                <Link to="/reviews" className="hover:text-orange-400">Reviews</Link>
            </div>
        </header>
    );
}
