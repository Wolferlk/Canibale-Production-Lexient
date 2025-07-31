import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Store from './pages/Store';
import FashionGallery from './pages/FashionGallery';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Confirmation from './pages/Confirmation';
import OrderEditPage from "./components/admincom/OrderEditPage";
import AIItemFinder from './pages/AIItemFinder';
import AddUsersPage from './components/admincom/AddUserComponent';
import AddUserComponent from './components/admincom/AddUserComponent';
import Footer from './components/Footer';
import Checkoutkoko from './pages/koko/Checkoutkoko';
import Successkoko from './pages/koko/PaymentSuccess';
import Cancelkoko from './pages/koko/PaymentCancel';
import Privacy from './pages/PrivacyPolicy'
import TermAndCondition from './pages/TermAndCondition'
import ReturnPolicy from './pages/ReturnPolicy';
import FAQPage from './pages/FAQPage';

function AppRoutes() {
  const location = useLocation();

  // Define routes where Footer should be hidden
  const noFooterRoutes = [
    "/admin",
    "/admin/dashboard",
    "/add-user",
    "/admin/add"
  ];

  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqpage" element={<FAQPage />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termandcondition" element={<TermAndCondition />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/fashiongallery" element={<FashionGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart/Confirmation" element={<Confirmation />} />
        <Route path="/order-edit/:orderId" element={<OrderEditPage />} />
        <Route path="/ai-item-finder" element={<AIItemFinder />} />
        <Route path="/add-user" element={<AddUsersPage />} />
        <Route path="/cart/checkoutkoko" element={<Checkoutkoko />} />
        <Route path="/cart/checkoutkoko/successkoko" element={<Successkoko />} />
        <Route path="/cart/checkoutkoko/cancelkoko" element={<Cancelkoko />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddUserComponent />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default AppRoutes;
