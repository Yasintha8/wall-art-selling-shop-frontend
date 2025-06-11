import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between bg-primary text-white px-4 md:px-10 z-50 shadow-lg backdrop-blur-lg">
        <div className="flex items-center justify-between w-full">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <GiHamburgerMenu
              className="text-3xl lg:hidden cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setIsOpen(true)}
            />
            <Link to="/" className="flex items-center">
              <img src="/header-logo.png" alt="Logo" className="w-10 h-10 mr-2" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                Vibe<span className="text-accent ">Canvas</span>
              </h1>
            </Link>
          </div>

          {/* Center Nav (Desktop) */}
          <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 bg-[#9B7EBD]/80 backdrop-blur-md rounded-full h-[50px] items-center px-10 text-xl space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/products" className="hover:text-gray-200 transition">Products</Link>
            <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
            <Link to="/reviews" className="hover:text-gray-200 transition">Reviews</Link>
          </nav>

          {/* Right: Search + Cart + User */}
          <div className="flex items-center gap-4">
            {/* Search Input (Desktop only) */}
            

            <UserData />
            <Link to="/cart" className="text-2xl hover:text-secondary transition">
              <BsCart4 />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-start"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-[80%] max-w-xs h-full bg-gray-300 text-gray-800 shadow-lg flex flex-col p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-4 text-lg">
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Home</Link>
              <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-primary">Products</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary">Contact</Link>
              <Link to="/reviews" onClick={() => setIsOpen(false)} className="hover:text-primary">Reviews</Link>
            </nav>

            {/* Search */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-black rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="w-full mt-2 bg-primary text-white py-2 rounded hover:bg-secondary transition"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Cart Icon at Bottom */}
            <div className="mt-auto pt-6 border-t">
              <Link
                to="/cart"
                className="text-2xl text-gray-700 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <BsCart4 />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-[70px]" />
    </>
  );
}
