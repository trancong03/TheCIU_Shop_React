import { Menu, Search, ToggleRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get_all_category/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.category);
        console.log('Categories:', data.category);
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    fetchCategories(); 
  }, []);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); 
  const handleCategoryClick = (event, category) => {
    event.preventDefault(); 
    navigate(`/products/${category.CategoryID}`); 
  };
  return (
    <nav className="bg-white">
      <div className="container flex justify-between items-center">
        <div className="md:hidden ">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#5b5858cc] px-3 py-2"
          >
            <Menu />
          </button>
        </div>
        <div className="hidden md:flex space-x-4 mb-2 gap-8 w-[60vw] ml-[20vw] justify-between">
          <a
            href="/"
            onClick={() => setActiveLink("home")}
            className={`text-[#5b5858cc] text-lg font-arial font-bold px-3 py-2 ${
              activeLink === "home"
                ? "text-black"
                : "hover:text-black"
            }`}
          >
            Trang Chủ
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("collection")}
            className={`text-[#5b5858cc] text-lg font-arial font-bold px-3 py-2 ${activeLink === "collection"
                ? "text-black"
                : "hover:text-black"
              }`}
          >
            Collection
          </a>
          <nav className="relative">
            <a
              onClick={() => setIsCategoryOpen(!isCategoryOpen)} // Toggle danh sách category
              className={`text-[#5b5858cc] text-lg font-arial font-bold ${isCategoryOpen ? "text-black" : "hover:text-black"}`}
            >
              <h1 className="mt-2"> Sản Phẩm</h1>
            </a>
            {isCategoryOpen && (
              <ul className="absolute bg-white border border-gray-200 rounded shadow-md w-80 z-50 transition-all duration-300 ease-in-out mt-2 top-full">
                {categories.map((category, index) => (
                  <li key={index} className="list-none">
                    <a
                      onClick={(event) => {
                        event.preventDefault(); // Ngăn chặn hành động mặc định
                        setActiveLink(category.Name); // Cập nhật activeLink
                        handleCategoryClick(event, category); // Gọi hàm điều hướng
                      }}
                      className={`block text-[#5b5858cc] text-lg font-arial font-bold px-4 py-3 transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-black ${activeLink === category.Name ? "bg-gray-100 text-black" : ""}`}
                    >
                      {category.Name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          <a
            href="#"
            onClick={() => setActiveLink("services")}
            className={`text-[#5b5858cc] text-lg font-arial font-bold px-3 py-2 ${
              activeLink === "services"
                ? "text-black"
                : "hover:text-black"
            }`}
          >
           Event
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("contact")}
            className={`text-[#5b5858cc] text-lg font-arial font-bold px-3 py-2 ${
              activeLink === "contact"
                ? "text-black"
                : "hover:text-black"
            }`}
          >
            Giới Thiệu
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("blog")}
            className={`text-[#5b5858cc] text-lg font-arial font-bold px-3 py-2 ${
              activeLink === "blog"
                ? "text-black"
                : "hover:text-black"
            }`}
          >
            Blog
          </a>
      
        </div>

        {/* Slide-out menu for small screens */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-[#333333]  z-50 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className=" px-3 py-2 mb-4 text-right">
            <button onClick={() => setMenuOpen(false)} className="text-[#5b5858cc] ">
              ✖
            </button>
          </div>
          <div className=" bg-[#333333] mb-[5%] ml-[5%] flex items-center border rounded-sm border-gray-500 w-[80%]">
            <button className="w-50% h-full bg-yellow-600 text-white">
              <Search />
            </button>
            <input
              className=" w-80 pl-1 bg-[#333333] border-none focus:outline-none  placeholder-gray-500 text-white"
              type="text"
              placeholder="Tìm sản phẩm..."
            />
          </div>
          <nav className="flex flex-col space-y-4 text-white">
            <a
              href="#"
              onClick={() => setActiveLink("home")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "home" ? "text-yellow-700" : ""
              }`}
            >
              TRANG CHỦ
            </a>
            <a
              href="#"
              onClick={() => setActiveLink("about")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "about" ? "text-yellow-700" : ""
              }`}
            >
              NEW
            </a>
            <a
              href="#"
              onClick={() => setActiveLink("services")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "services" ? "text-yellow-700" : ""
              }`}
            >
              SẢN PHẨM
            </a>
            <a
              href="#"
              onClick={() => setActiveLink("contact")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "contact" ? "text-yellow-700" : ""
              }`}
            >
              BEST SELLER
            </a>
            <a
              href="#"
              onClick={() => setActiveLink("se")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "contact" ? "text-yellow-700" : ""
              }`}
            >
              SALE OFF
            </a>
            <a
              href="#"
              onClick={() => setActiveLink("contact")}
              className={`text-white border-item px-3 py-2 ${
                activeLink === "contact" ? "text-yellow-700" : ""
              }`}
            >
              BLOG
            </a>
          </nav>
        </div>

        {/* Overlay when slide-out menu is open */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
