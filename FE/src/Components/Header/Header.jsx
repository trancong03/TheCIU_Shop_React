import { BellRing, FilePenIcon, HomeIcon, NotebookText, Heart, LogOut, Search, ShoppingCart as ShoppingCartIcon, Info, ListOrdered, Wallet  } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getCartQuantity } from "../../../services/apiclient";
export default function Header({ onLoginClick, userInfo, setUserInfo,  }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const menuRef = useRef(null);
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem('cart')));
 

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
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCartQuantity(userData.username); // Gọi API
        if (result) {
          setCart(result.data);
          localStorage.setItem('cart', JSON.stringify(result.data));
        } else {
          console.error('Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error while fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  

  const handleAuthClick = () => {
    if (userInfo!=null||userInfo) {
      setUserInfo(null);
      localStorage.removeItem('userInfo'); 
      localStorage.removeItem('cart');
      navigate('/');
    }
    if (userInfo == null ) {
      onLoginClick();
    }
    setIsMenuOpen(false); // Đóng menu
  };
  const handleNavigation = (path) => {
    if (!userInfo || !userInfo.name) {
      onLoginClick();
    } else {
      navigate(path); // Điều hướng đến trang đích
    }
    setIsMenuOpen(false);
  };
  

  return (
    <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
      <div className=" h-20 flex items-center bg-white p-3 ">
        <div className=" mr-5">
          <img
            className="h-20  w-28"
            src="http://127.0.0.1:8000//media/images/logo1.png"
            alt="Logo"
          />
        </div>
        <div className="hidden lg:flex items-center justify-between py-2 rounded-xl h-[5vh] w-[20vw] bg-[#f3f3f3]">
          <input
            className="ml-2 w-[20vw] bg-transparent focus:outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Tìm sản phẩm..."
          />
          
          <button>
            <Search />
          </button>
        </div>
        <div className=" flex gap-4 justify-center items-center">
          <a
            href="#"
            onClick={() => setActiveLink("heart")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "heart"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <Heart />
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("heart")}
            className={`text-[#5b5858cc] relative flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "heart"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <ShoppingCartIcon />
            {cart && cart.total_quantity > 0 && (
              <span className="absolute bottom-5 left-8 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.total_quantity}
              </span>
            )}
          </a>
          
          <a
            href="#"
            onClick={() => setActiveLink("BellRing")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "BellRing"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <BellRing />
          </a>
            <a
              href="/"
              onClick={() => setActiveLink("home")}
            className={`text-[#5b5858cc]  flex gap-0 w-36 items-center  font-arial  px-3 py-2 ${activeLink === "home"
                ? "text-black font-bold"
                : "hover:text-black"
                }`}
            >
            TRANG CHỦ
            </a>
          <a
            href="#"
            onClick={() => setActiveLink("collection")}
            className={`text-[#5b5858cc] w-36  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "collection"
              ? "text-black font-bold"
              : "hover:text-black font-bold"
              }`}
          >
            COLLECTION
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("product")}
            className={`text-[#5b5858cc]  flex gap-2 items-center w-36  font-arial  px-3 py-2 ${activeLink === "product"
              ? "text-black font-bold"
              : "hover:text-black font-bold"
              }`}
          >
            SẢN PHẨM
          </a>
         
        
          <div className="flex space-x-4 mb-2 h-10 gap-8 justify-start">
          </div>
        </div>
       
        
          <a
            href="#"
            onClick={() => setActiveLink("aboutus")}
            className={`text-[#5b5858cc] w-36  flex gap-2 items-center font-arial  px-3 py-2 ${activeLink === "aboutus"
              ? "text-black font-bold"
              : "hover:text-black font-bold"
              }`}
          >
           GIỚI THIỆU
          </a>

        <div className="px-3 py-2 h-10 w-[20vw] bg-transparent rounded-3xl flex items-center justify-start relative ">
          <nav className="relative">
            <a
              onClick={() => {
                setActiveLink("dn");
                setIsMenuOpen(!isMenuOpen); 
              }}
              className={`text-white flex gap-2 items-center font-arial h-9 w-auto p-3 bg-stone-600 rounded-2xl border border-black `}
            >
            
              <img
                src={userInfo && userInfo.avatar ? `http://127.0.0.1:8000//media/images/${userInfo.avatar}` : "http://127.0.0.1:8000//media/images/icon.png"}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              {userInfo?.name || "Tài khoản"}
            </a>

            {/* Menu con bên dưới */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-[8.5vh] mt-2 bg-white border rounded shadow-md w-60 z-50"
              >
                <ul className="space-y-4">
                  {/* <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/orders')}
                  >
                    <ListOrdered />
                    <a className="block p-2 rounded">Quản lý tin</a>
                  </li> */}
                  <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/notifications')}
                  >
                    <BellRing />
                    <a className="block p-2 rounded">Thông báo</a>
                  </li>
                  <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/favorites')}
                  >
                    <Heart />
                    <a className="block p-2 rounded">Tin yêu thích</a>
                  </li>
                  <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/account')}
                  >
                    <Info />
                    <a className="block p-2 rounded">Thông tin tài khoản</a>
                  </li>
                  {/* <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/address')}
                  >
                    <FontAwesomeIcon icon={faLocationDot} />
                    <a className="block p-2 rounded">Số địa chỉ</a>
                  </li>
                  <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/vouchers')}
                  >
                    <Wallet />
                    <a className="block p-2 rounded">Ví voucher</a>
                  </li> */}
                  <li
                    className="flex justify-start  items-center hover:bg-gray-200"
                    onClick={handleAuthClick}
                  >
                    <LogOut />
                    <a className="block p-2 rounded">
                      {userInfo == null || !userInfo.name ? 'Login' : 'Logout'}
                    </a>
                  </li>
                </ul>
              </div>
            )}

          </nav>
        </div>
        
     </div>
      
    </div>
  );
}
