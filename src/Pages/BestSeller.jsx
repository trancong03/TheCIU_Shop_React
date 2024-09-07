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
        "https://minio.theciu.vn/theciu-beta/100/images/guqZoJHqOvfdbaXO1fqf7YpeCbeetbBqqsL8lzCj.jpg",
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

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Best Seller</h2>

      {/* Bộ lọc và thanh tìm kiếm */}
      <div className="flex justify-between items-center mb-8">
        <button className="flex items-center bg-gray-200 px-4 py-2 rounded">
          <span className="mr-2">☰</span> Bộ lọc tìm kiếm
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="border border-gray-300 px-4 py-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Xử lý khi nhập từ khóa
          />
          <span className="absolute top-2 right-3">🔍</span>
        </div>
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
    </div>
  );
};

export default BestSeller;
