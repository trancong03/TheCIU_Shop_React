import React, { useState, useEffect } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/ErrorPage";
import Header from "./Components/Header";
import DN from './Components/DN';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Account from './Pages/Account';
import InfomationAccount from "./Components/ui_user_account/InfomationAccount";
import ResetPassWord from "./Components/ui_user_account/ResetPassWord";
import { CartProvider } from './Components/context/CardContext'; 
import ProductLike from "./Pages/ProductLike";
import Manage_address from "./Components/ui_user_account/manage_address";
import AdminStores from "./Pages/Admin/AdminStores";
import AdminOrders from "./Pages/Admin/AdminOrders";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminProducts from "./Pages/Admin/AdminProducts";
import CategoryProducts from "./Components/ui_product/product_category";
import SearchProducts from "./Components/ui_product/product_search.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (data) => {
    setUserInfo(data.person);
    localStorage.setItem('userInfo', JSON.stringify(data.person));
    setShowLogin(false);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <CartProvider personID={userInfo ? userInfo.iduser : "5"}>
      <BrowserRouter>
        <AppContent 
          userInfo={userInfo} 
          setUserInfo={setUserInfo} 
          showLogin={showLogin} 
          handleLoginClick={handleLoginClick} 
          closeLogin={closeLogin} 
          handleLoginSuccess={handleLoginSuccess} 
        />
      </BrowserRouter>
    </CartProvider>
  );
}

function AppContent({ userInfo, setUserInfo, showLogin, handleLoginClick, closeLogin, handleLoginSuccess }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && (
        <Header 
          userInfo={userInfo} 
          setUserInfo={setUserInfo} 
          onLoginClick={handleLoginClick} 
        />
      )}
      
      {showLogin && <DN closeLogin={closeLogin} onLoginSuccess={handleLoginSuccess} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryId" element={<CategoryProducts />} /> 
        <Route path="/search_product/:product_name" element={<SearchProducts />} /> 
        <Route path="/account/*" element={<Account user={userInfo} setUserInfo={setUserInfo} />}>
          <Route path="cart" element={<Cart />} />
          <Route path="like-product" element={<ProductLike />} />
          <Route path="manage-address" element={<Manage_address />} />
          <Route path="info" element={<InfomationAccount user={userInfo} setUserInfo={setUserInfo} />} />
          <Route path="reset-password" element={<ResetPassWord user={userInfo} />} />
        </Route>
        <Route path="/admin/*" element={<Admin />}>
          <Route path="stores" element={<AdminStores />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
