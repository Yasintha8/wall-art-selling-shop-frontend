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
import ScrollToTop from './scrollToTop';

function App() {

  return (
    <GoogleOAuthProvider clientId='859443425171-u5ear3bkdmsionihve91ge7j9509fral.apps.googleusercontent.com'>
      <BrowserRouter>
      <ScrollToTop/>
      <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path='admin/*' element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/forget" element={<ForgetPassword/>} />
          {/* <Route path="/*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
