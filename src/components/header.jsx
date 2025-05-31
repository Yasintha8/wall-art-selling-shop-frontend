import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between bg-primary text-white px-4 z-50 shadow-md backdrop-blur-md">
            {/* Logo */}
            <Link to="/" className="hidden md:flex items-center ml-6">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-12 w-auto object-contain "
                />
                </Link>
            {/* Mobile: Hamburger Icon */}
            <div className="lg:hidden">
                <GiHamburgerMenu
                    className="text-3xl cursor-pointer"
                    onClick={() => setIsOpen(true)}
                />
            </div>

            {/* Center: Nav Menu (Desktop only) */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 bg-[#9B7EBD] backdrop-blur-md rounded-full h-[50px] items-center px-8 text-[18px]">
                <Link to="/" className="hover:text-gray-300 mx-4">Home</Link>
                <Link to="/products" className="hover:text-gray-300 mx-4">Products</Link>
                <Link to="/contact" className="hover:text-gray-300 mx-4">Contact</Link>
                <Link to="/reviews" className="hover:text-gray-300 mx-4">Reviews</Link>
            </div>

            {/* Cart Icon */}
            <div className="flex-1 flex justify-end mr-6">
                <UserData />
                <Link to="/cart" className="text-3xl ml-4 ">
                    <BsCart4 />
                </Link>
            </div>

            {/* Mobile Sidebar Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-20 bg-black/70" onClick={() => setIsOpen(false)}>
                    <div
                        className="w-[300px] h-full bg-gray-200 text-black p-6 flex flex-col gap-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GiHamburgerMenu
                            className="text-3xl mb-4 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                        <Link to="/" className="text-xl" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/products" className="text-xl" onClick={() => setIsOpen(false)}>Products</Link>
                        <Link to="/contact" className="text-xl" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link to="/reviews" className="text-xl" onClick={() => setIsOpen(false)}>Reviews</Link>
                        <Link to="/cart" className="text-3xl mt-auto text-black" onClick={() => setIsOpen(false)}>
                            <BsCart4 />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
