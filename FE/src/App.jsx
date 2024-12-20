import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./App.css";
import { AlertProvider } from "./Components/context/AlertContext";
import { CartProvider } from "./Components/context/CardContext";
import ErrorPage from "./Components/Footer/ErrorPage";
import Footer from "./Components/Footer/Footer";
import DN from './Components/Header/DN';
import Header from "./Components/Header/Header";
import ForgotPassword from "./Components/userUI/ForgotPassword";
import InfomationAccount from "./Components/userUI/InfomationAccount";
import PostOfUser from "./Components/userUI/PostOfUser";
import ResetPassWord from "./Components/userUI/ResetPassWord";
import ErrorBoundary from "./ErrorBoundary";
import Account from "./Pages/Account";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import ProductDetail from "./Pages/ProductDetail";
import ProductLike from "./Pages/ProductLike";
import UpdatePost from "./Pages/UpdatePost";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsForgotPasswordVisible(false); // Đảm bảo quên mật khẩu không được hiển thị khi đăng nhập
  };

  const closeLogin = () => {
    setShowLogin(false);
    setIsForgotPasswordVisible(false); // Đóng cả hai khi thoát
  };
  const closeForgotPassword = () => {
    setIsForgotPasswordVisible(false); // Đóng cả hai khi thoát
  };


  const handleLoginSuccess = (data) => {
    setUserInfo(data.user);
    const { token } = data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    setShowLogin(false);
  };
  const getUserById = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${username}/`);
      if (response.status === 200) {
        return response.data.user; // Trả về thông tin người dùng
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
        return null;
      } else {
        console.error('Network Error:', error.message);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const userData = JSON.parse(storedUserInfo);
          if (userData) {
            const user = await getUserById(userData.username);
            setUserInfo(user);
          }
        } catch (error) {
          console.error('Invalid JSON in localStorage', error);
        }
      }
    };
    fetchUserData(); // Gọi hàm lấy dữ liệu người dùng
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Tải thông tin từ localStorage
    }
  }, []);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordVisible(true);
  };
  
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Alert tự ẩn sau 3 giây
  };
  return (
    <AlertProvider>
      <CartProvider User={userInfo}>
        <BrowserRouter>
          {/* Điều chỉnh Header chỉ hiển thị khi không phải là các route admin */}
          <ErrorBoundary>
            <Header userInfo={userInfo} setUserInfo={setUserInfo} onLoginClick={handleLoginClick} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
          </ErrorBoundary>
          {showLogin && (
            <DN
              closeLogin={closeLogin}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={handleForgotPasswordClick}
            />
          )}

          {isForgotPasswordVisible && <ForgotPassword closeForgotPassword={closeForgotPassword} />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/*" element={<Account user={userInfo} setUserInfo={setUserInfo} />}>
              <Route path="like-product" element={<ErrorBoundary><ProductLike /></ErrorBoundary>} />
              <Route path="info" element={<InfomationAccount user={userInfo} setUserInfo={setUserInfo} />} />
              <Route path="reset-password" element={<ResetPassWord user={userInfo} />} />
              <Route path="user-post/" element={<PostOfUser userId={userInfo} />} />
              {/* <Route
              path="cart"
              element={
                userInfo ? (
                  <CartProduct username={userInfo.username} />
                ) : (
                  <div>Loading...</div> // Hoặc thông báo lỗi phù hợp
                )
              }
            /> */}

            </Route>
            <Route path="/product-detail" element={<ErrorBoundary><ProductDetail handleLoginClick={handleLoginClick} /></ErrorBoundary>} />
            <Route path="/new-post" element={<ErrorBoundary><NewPost /></ErrorBoundary>} />
            <Route path="/update-post" element={<ErrorBoundary><UpdatePost /></ErrorBoundary>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AlertProvider>
  );
};
export default App;