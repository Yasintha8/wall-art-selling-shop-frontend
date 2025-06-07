import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between bg-primary text-white px-6 md:px-10 z-50 shadow-lg backdrop-blur-lg transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="hidden md:flex items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Vibe<span className="text-secondary">Canvas</span>
          </h1>
        </Link>

        {/* Mobile: Hamburger Icon */}
        <div className="lg:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsOpen(true)}
          />
        </div>

        {/* Center Nav Menu (Desktop) */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 bg-[#9B7EBD]/80 backdrop-blur-md rounded-full h-[50px] items-center px-10 text-xl space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-200 transition">Products</Link>
          <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
          <Link to="/reviews" className="hover:text-gray-200 transition">Reviews</Link>
        </nav>

        {/* Cart + User */}
        <div className="flex items-center gap-4 ml-auto">
          <UserData />
          <Link to="/cart" className="text-2xl hover:text-secondary transition">
            <BsCart4 />
          </Link>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-[280px] h-full bg-white text-gray-800 p-6 flex flex-col gap-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Menu</h2>
                <GiHamburgerMenu
                  className="text-2xl cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <Link to="/" className="text-lg hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/products" className="text-lg hover:text-primary" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/contact" className="text-lg hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link to="/reviews" className="text-lg hover:text-primary" onClick={() => setIsOpen(false)}>Reviews</Link>
              <Link to="/cart" className="text-2xl mt-auto text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>
                <BsCart4 />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to offset fixed header height */}
      <div className="h-[70px]" />
    </>
  );
}
