import React from 'react';

export default function CartItem({ name, price, images = [] }) {
    return (
        <div className="w-[18rem] bg-[#f3f3f3] rounded-2xl ml-3 mb-5 p-4 relative">
            <div className="flex items-center justify-center flex-col">
                <img
                    src={`image/${images[0]}`}
                    alt={`${name} main image`}
                    className="w-full h-auto mt-3 rounded-xl transform transition-transform duration-300 hover:scale-105"
                />
                <div className="w-full text-center mt-2">
                    <h3 className="line-clamp-1 m-[5%] font-arial">{name}</h3>
                    <p className="text-lg font-bold ml-[5%]">
                        {price.toLocaleString()}
                        <span>đ</span>
                    </p>
                </div>
                <div className="flex gap-4 m-3">
                    {images.map((image, index) => (
                        <button key={index}>
                            <img
                                className="w-[3rem] h-[3rem] rounded-md"
                                src={`image/${image}`}
                                alt={`${name} thumbnail ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
                {/* Buttons for buying and adding to cart */}
                <div className="flex flex-col items-center w-full px-4 mt-4 gap-2">
                    <button className="bg-gray-800 text-white w-full py-2 rounded-md">Mua Ngay</button>
                    <button className="border border-gray-800 text-gray-800 w-full py-2 rounded-md">
                        Thêm vào Giỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
