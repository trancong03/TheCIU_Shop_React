import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.mainImage); // Ảnh chính sẽ thay đổi khi click vào thumbnail

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Ảnh chính */}
      <img
        src={currentImage}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />

      {/* Căn giữa tên sản phẩm và giá */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.price}</p>
      </div>

      {/* Căn giữa thumbnails */}
      <div className="flex justify-center space-x-2 mt-4">
        {product.thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Thumbnail ${index}`}
            className="w-12 h-12 object-cover cursor-pointer border border-gray-200 rounded hover:border-gray-400"
            onClick={() => setCurrentImage(thumbnail)} // Đổi ảnh chính khi bấm vào
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
