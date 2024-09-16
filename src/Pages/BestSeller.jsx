import React, { useState } from "react";
import ProductCard from "../Components/ProductCard"; // Import ProductCard từ Components

const BestSeller = () => {
  const products = [
    {
      id: 1,
      name: "Áo sơ mi tay dài THE C.I.U",
      price: "275.000₫",
      mainImage:
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
      thumbnails: [
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
      ],
    },
    {
      id: 2,
      name: "Áo quay hai dây THE C.I.U",
      price: "135.000₫",
      mainImage:
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
      thumbnails: [
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
      ],
    },
    {
      id: 3,
      name: "Áo khoác dây kéo THE C.I.U",
      price: "365.000₫",
      mainImage:
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
      thumbnails: [
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
      ],
    },
    {
      id: 4,
      name: "Quần ống đứng THE C.I.U",
      price: "350.000₫",
      mainImage:
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
      thumbnails: [
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
        "https://minio.theciu.vn/theciu-beta/600/images/bsI0TBFdTXX9ZFpkHNoNZlEDOSiC1ewIylCn3wKD.jpg",
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
      ],
    },
  ];

  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // State cho bộ lọc sidebar (ẩn/hiện)
  const [filterVisible, setFilterVisible] = useState(false);

  // State cho việc hiển thị/ẩn danh mục
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [priceRangeHeight, setPriceRangeHeight] = useState("auto");
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Best Seller</h2>

      {/* Bộ lọc và thanh tìm kiếm */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="flex items-center bg-gray-200 px-4 py-2 rounded"
          onClick={() => setFilterVisible(!filterVisible)} // Click để ẩn/hiện bộ lọc
        >
          <span className="mr-2">☰</span> Bộ lọc tìm kiếm
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="border border-gray-300 px-4 py-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute top-2 right-3">🔍</span>
        </div>
      </div>

      {/* Sidebar bộ lọc */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 transition-transform duration-300 z-50 ${
          filterVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }} // Chiều rộng của sidebar
      >
        <button
          className="mb-4 text-red-500"
          onClick={() => setFilterVisible(false)} // Đóng sidebar
        >
          ✖ Đóng bộ lọc
        </button>

        {/* Danh mục với mũi tên toggle */}
        <div>
          <h3
            className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)} // Toggle mở/đóng danh mục
          >
            Danh mục
            <span>
              {isCategoryOpen ? "▲" : "▼"} {/* Mũi tên lên/xuống */}
            </span>
          </h3>

          {isCategoryOpen && ( // Hiển thị danh mục nếu state isCategoryOpen là true
            <ul
              className={`transition-all overflow-hidden ${
                isCategoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <li>Áo hai dây và ba lỗ</li>
              <li>Áo khoác dây kéo</li>
              <li>Áo kiểu</li>
              <li>Áo len</li>
              <li>Áo polo</li>
              <li>Áo thun</li>
              <li>Áo vest & blazer</li>
              <li>Cardigan</li>
              <li>Chân váy midi</li>
              <li>Chân váy ngắn</li>
              <li>Croptop</li>
              <li>Đầm Maxi</li>
              <li>Đầm ngắn</li>
              <li>Jumpsuit</li>
              <li>Khác</li>
              <li>Phụ kiện</li>
            </ul>
          )}
        </div>

        <h3
          className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer"
          onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
        >
          Khoảng giá
          <span>{isPriceRangeOpen ? "▲" : "▼"}</span> {/* Mũi tên lên/xuống */}
        </h3>
        {isPriceRangeOpen && (
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Giá tối thiểu"
              className="border px-2 py-1 rounded w-full"
            />
            <input
              type="number"
              placeholder="Giá tối đa"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        )}
      </div>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            Không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn.
          </p>
        )}
      </div>

      {/* Overlay để tối trang web và vô hiệu hóa click vào bất kỳ đâu trừ sidebar */}
      {filterVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setFilterVisible(false)} // Đóng sidebar khi click vào overlay
        ></div>
      )}
    </div>
  );
};

export default BestSeller;
