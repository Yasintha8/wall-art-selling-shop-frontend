import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Home from "./client/home";
import Contact from "./client/contact";
import Review from "./client/review";
import Footer from "../components/footer";
import ProductsByCategory from "../components/productsByCategory";
import Orders from "./client/orders";
import Profile from "./client/profile";
import About from "./client/about";
import ReturnsAndExchanges from "./client/returnsAndExchanges";
import ShippingInfo from "./client/shippingInfo";

export default function HomePage() {
    return (
        <div className="w-full h-screen max-h-screen">
            <Header />
            <div  className="w-full h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/products/:categoryName" element={<ProductsByCategory />} />
                    <Route path="/overview/:id" element={<ProductOverview/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/orders" element={<Orders/>} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/reviews" element={<Review />} />
                    <Route path="/returns-and-exchanges" element={<ReturnsAndExchanges />} />
                    <Route path="/shipping-info" element={<ShippingInfo />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
                <Footer />
            </div>       
        </div>
    );
}