import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage'
import { Testing } from './pages/testing';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import ForgetPassword from './pages/client/forgetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProductPage from './pages/client/productPage'; // Make sure this import is present

function App() {
  return (
    <GoogleOAuthProvider clientId='859443425171-u5ear3bkdmsionihve91ge7j9509fral.apps.googleusercontent.com'>
      <BrowserRouter>
        <Toaster position='top-right'/>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/category/:categoryName" element={<ProductPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/*" element={<HomePage />} />
          {/* Optional: 404 fallback */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
