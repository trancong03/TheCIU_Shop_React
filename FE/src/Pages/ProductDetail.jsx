import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, Star, Phone, MessageSquare, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, ShoppingCartIcon } from 'lucide-react';
import { FaHeart } from "react-icons/fa";
export default function productDetail() {
    
    const { state } = useLocation();
    const { product, images } = state || {}; // Lấy product từ state
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(product);

    const updateMainImage = (index) => {
        setCurrentIndex(index);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }
    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }
    
    return (
        <div className ="flex items-center justify-center">
            <div className="flex  max-w-[100%] items-center justify-center ml-[10%]  mr-[10%] bg-white">
                <div className="bg-gray-100 flex items-center justify-center w-1/2 min-h-screen ">
                    <div className="flex  items-center space-y-4 min-w-[100%] ">
                        {/* Ảnh chính */}
                        <div className="relative">
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❮
                            </button>
                            <img
                                src={`http://127.0.0.1:8000//media/images/${images[currentIndex].url}`}
                                alt="Main"
                                className=" w-[30vw] h-[70vh] object-contain rounded-lg"
                            />
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❯
                            </button>
                            <button
                                className='w-80 h-[3rem] m-5 bg-transparent border border-black text-black font-bold rounded-full hover:text-red-200 hover:border-red-200 '
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaHeart className={`transition-colors duration-300 ${'text-black'}`} size={20} />
                                    <span>{'Thêm yêu thích'}</span>
                                </div>
                            </button>
                        </div>

                        {/* Các ảnh thumbnail */}
                        <div className="flex space-x-2 flex-col items-center justify-start !h-[85vh] gap-4 ">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://127.0.0.1:8000//media/images/${image.url}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-28 cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-yellow-500" : "border-transparent"
                                        } hover:border-yellow-500`}
                                    onClick={() => updateMainImage(index)}
                                    onMouseEnter={() => updateMainImage(index)}  // Sự kiện cập nhật khi hover
                                />
                            ))}
                        </div>
                        <hr />
                        
                    </div>
                            
                </div>
                <div className=" w-1/2 ml-8">
                    <h1 className="font-black text-xl ml-3 mt-3">{product.product_name}</h1>
                    <h1 className=" font-arial ml-3">{product.title}</h1>
                    <h4 className=' text-black font-black text-xl ml-3 mb-3 mt-3'>
                        {new Intl.NumberFormat('vi-VN').format(product.price || 'Sản phẩm không có tên')} đ
                    </h4>
                    <h4 className=' text-black  text-xl ml-3 mb-3 mt-3'>Màu Sắc: </h4>
                    <div>

                    </div>
                    <h4 className=' text-black  text-xl ml-3 mb-3 mt-3'>Size :</h4>
                    <div>

                    </div>
                    <h3 className=' text-black  text-xl ml-3 mb-3 mt-3'>Tồn Kho : </h3>
                    <h3 className=' text-black  text-xl ml-3 mb-3 mt-3'> Số lượng </h3>
                    <div className="flex items-center justify-center gap-2">
                        <button
                            className='w-full h-[3rem] bg-transparent border text-white bg-slate-500 font-bold rounded-full hover:text-red-200 hover:border-red-200 '
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span>Mua Ngay</span>
                            </div>
                        </button>
                        <button
                            className="w-full h-[3rem] transition-colors duration-300   text-black font-bold border rounded-full  hover:text-yellow-200 hover:border-yellow-200"
                            // onClick={handleViewDetails}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <ShoppingCartIcon />
                                <span>Thêm vào giỏ hàng</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        
    );
}
