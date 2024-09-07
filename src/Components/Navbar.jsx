import { Menu, Search, ToggleRightIcon } from "lucide-react";
import { useState } from "react";
import Login from "../Pages/Login";
import BestSeller from "../Pages/BestSeller";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  return (
    <nav className="bg-[#222222]">
      <div className="container flex justify-between items-center">
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white px-3 py-2"
          >
            <Menu />
          </button>
        </div>

        {/* Navigation links for large screens */}
        <div className="hidden md:flex space-x-4 mb-2">
          <a
            href="#"
            onClick={() => setActiveLink("home")}
            className={`text-white px-3 py-2 ${
              activeLink === "home"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            TRANG CHỦ
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("about")}
            className={`text-white px-3 py-2 ${
              activeLink === "about"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            SẢN PHẨM
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("services")}
            className={`text-white px-3 py-2 ${
              activeLink === "services"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            BEST SELLER
          </a>
          <a
            href=""
            onClick={() => setActiveLink("bestseller")}
            className={`text-white px-3 py-2 ${
              activeLink === "contact"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            SALE OFF
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("contact")}
            className={`text-white px-3 py-2 ${
              activeLink === "contact"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            BLOG
          </a>
          <a
            href="/login"
            onClick={() => setActiveLink("login")}
            className={`text-white px-3 py-2 ${
              activeLink === "login"
                ? "border-b-2 border-yellow-400"
                : "hover:bg-blue-700"
            }`}
          >
            SIGN UP
          </a>
        </div>

        {/* Slide-out menu for small screens */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-[#333333]  z-50 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className=" px-3 py-2 mb-4 text-right">
            <button onClick={() => setMenuOpen(false)} className="text-white ">
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
