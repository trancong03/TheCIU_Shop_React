import React, { useState } from "react";

const ProductListCart = ({ item, onRemove, onUpdateQuantity, onToggleSelect, selected }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        onUpdateQuantity(item.cart_id,item.product_id,item.size_id,item.color_id, newQuantity);
    };

    // Tính thành tiền = quantity * price
    const totalPrice = quantity * parseFloat(item.price); // Loại bỏ dấu 'đ' nếu có
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <div className="flex items-center flex-grow w-7/12">
                {/* Checkbox để chọn sản phẩm */}
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onToggleSelect} // Xử lý khi checkbox thay đổi trạng thái
                    className="mr-4 w-1/12"
                />
                <img
                    src={`http://127.0.0.1:8000//media/images/${item.image}`}
                    alt={item.name}
                    className="w-2/12 h-16 mr-4 object-cover"
                />
                <div className="flex-grow w-4/12 ">
                    <p className="font-semibold text-sm">{item.product_name}</p>
                    <p className="text-xs text-gray-500">
                        Màu sắc: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-xs text-red-500">Tồn kho không đủ số lượng</p>
                </div>
            </div>

            <div className="flex items-center space-x-4 w-5/12">
                <div className="w-4/5 flex justify-center items-center">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-1 border border-gray-300 rounded-xl text-gray-700 font-semibold text-lg transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span className="px-4 text-xl font-semibold text-gray-800">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-1 border border-gray-300 rounded-xl text-gray-700 font-semibold text-lg transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
                    >
                        +
                    </button>



                </div>
                <span className="text-lg font-bold w-2/5">{totalPrice.toLocaleString()}đ</span>
                <button
                    onClick={() => onRemove(item.cart_id)}
                    className="text-red-500 text-xl hover:text-red-700 w-1/5"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ProductListCart;
