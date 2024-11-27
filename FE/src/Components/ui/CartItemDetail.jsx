import React from "react";

export default function CartItemDetail({ item, onQuantityChange }) {
    return (
        <li className="flex items-center justify-between py-4 w-full">
            <div className="flex items-center space-x-4">
                <img
                    src={item.ImageID && item.ImageID[0] ? `/image/product/${item.ImageID[0]}` : '/image/product/cong.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                />

                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">{item.Name}</h3>
                    <p className="text-gray-500">{parseFloat(item.Price).toLocaleString()} VND</p>
                </div>
            </div>
            
            <div className="flex items-center mr-3">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => onQuantityChange(item.ProductID, -1)}
                >
                    -
                </button>
                <span className="w-8 text-center text-gray-700 font-semibold">{item.quantity || 1}</span>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => onQuantityChange(item.ProductID, 1)}
                >
                    +
                </button>
            </div>

        </li>
    );
}
