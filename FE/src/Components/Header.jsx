import React, { useState, useEffect, useRef } from "react";
import { Heart, LogOut, Search, ShoppingCart as ShoppingCartIcon, BellRing, Info, ListOrdered, Wallet } from "lucide-react";
import Navbar from "./Navbar";
import CartItemShopping from "../Components/CartItemShopping";
import { faLocationDot, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "./context/CardContext";
export default function Header({ onLoginClick, userInfo, setUserInfo }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleAuthClick = () => {
    if (userInfo != null || userInfo) {
      setUserInfo(null);
      localStorage.removeItem('userInfo');
      navigate('/');
    }
    if (userInfo == null || !userInfo.name) {
      onLoginClick();
    }
    setIsMenuOpen(false); 
  };
  
const handleCartClick = () => {
  navigate('account/cart'); 
  };
  const handleLikeClick = () => {
    navigate('account/like-product');
  };
  const { cartItems, likeProducts } = useCart(); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const handleSearchClick = (event) => {
    event.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/search_product/${searchQuery}`); 
    }
  };

  return (
    <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
      <div className="h-[10vh] flex items-center bg-white p-3 shadow-md">
        <div className="ml-[15vw] mr-5">
          <img
            className="h-12 sm:h-8 md:h-10 lg:h-16 w-auto"
            src="/image/product/logo.png"
            alt="The CIU Logo"
          />
        </div>
        <div className="hidden lg:flex items-center py-2 rounded-2xl h-[7vh] w-[40vw] bg-[#f3f3f3]">
          <input
            className="ml-2 w-[37vw] bg-transparent focus:outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button onClick={handleSearchClick}>
            <Search />
          </button>
        </div>
        <div 
        className="ml-3 flex gap-4 justify-center items-center">
          <div className="relative cursor-pointer" onClick={handleLikeClick}>
            <Heart />
            {likeProducts && likeProducts.length > 0 && (
              <span className="absolute bottom-5 left-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {likeProducts.length}
              </span>
            )}
          </div>
          
          <div onClick={handleCartClick} onMouseEnter={() => setIsCartOpen(true)} onMouseLeave={() => setIsCartOpen(false)} 
          className="relative cursor-pointer">
            <ShoppingCartIcon />
            {cartItems && cartItems.length > 0 && (
              <span className="absolute bottom-5 left-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}

            {isCartOpen && (
              <div className="absolute left-15 mt-2 w-[20rem] bg-white border rounded-lg shadow-lg p-4 z-50">
                <h3 className="text-lg font-semibold mb-2">Sản phẩm trong giỏ hàng</h3>
                {cartItems && cartItems.length  > 0 ? (
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        <CartItemShopping
                          key={item.ProductID}
                          name={item.Name}
                          price={item.Price}
                          images={item.ImageID}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Giỏ hàng của bạn trống.</p>
                )}

              </div>
            )}
          </div>
        

          <div className="px-3 py-2 h-10 w-[20vw] bg-transparent rounded-3xl flex items-center justify-start relative">
            <nav>
              <a
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#5b5858cc] flex gap-2 items-center font-arial px-3 py-2"
              >
                <img
                  src={userInfo && userInfo.avatar ? `/image/avatar/${userInfo.avatar}` : "/image/icon.png"}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                {userInfo?.name || "Tài khoản"}
              </a>
              {isMenuOpen && (
                <div ref={menuRef} className="absolute top-[8.5vh] mt-2 bg-white border rounded shadow-md  w-60 z-50">
                  <ul className="space-y-4">
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-20' >
                      <ListOrdered />
                      <a href="/orders" className="block p-2 rounded">Quản lý đơn hàng</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                      <BellRing />
                      <a href="/notifications" className="block p-2 rounded">Thông báo</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                      <Heart />
                      <a href="/favorites" className="block p-2 rounded">Sản phẩm yêu thích</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                      <Info />
                      <a href="/account" className="block p-2 rounded">Thông tin tài khoản</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <a href="/address" className="block p-2 rounded">Số địa chỉ</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                      <Wallet />
                      <a href="/vouchers" className="block p-2 rounded">Ví voucher</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'
                      onClick={handleAuthClick}>
                      <LogOut />
                      <a className="block p-2 rounded">{userInfo == null || !userInfo.name ? "Login" : "Logout"}</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'
                      onClick={handleAuthClick}></li>
                    
                  </ul>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
