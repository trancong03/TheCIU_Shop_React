import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import { useNavigate } from "react-router-dom";

export default function CartItem({ Product }) {
    const defaultImage = 'default.jpg';
    const navigate = useNavigate();
    // const { likeProduct, isProductLiked } = useCart();
    const [isLiked, setIsLiked] = useState(false);

    // Cập nhật trạng thái yêu thích khi thay đổi sản phẩm
    // useEffect(() => {
    //     setIsLiked(isProductLiked(Product.MABAIVIET)); // Đồng bộ trạng thái yêu thích khi sản phẩm thay đổi
    // }, [Product.product_id, isProductLiked]); // Theo dõi sự thay đổi của likeProducts

    // Xử lý xem chi tiết sản phẩm
    const handleViewDetails = () => {
        navigate("/product-detail", { state: { product: Product } });
    };

    // Xử lý thay đổi trạng thái yêu thích
    const handleToggleLike = () => {

        likeProduct(Product); 
        // Gọi hàm likeProduct và để nó xử lý trạng thái yêu thích
    };
    
    return (
        <div className="flex items-center justify-center flex-col mt-3 rounded-2xl">
            <div className='w-[18vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl'>
                <div className='relative overflow-hidden flex items-center justify-center flex-col'>
                    <img
                        src={`http://127.0.0.1:8000//media/images//${Product.imageSP || defaultImage}`}
                        alt={Product.Name || 'Sản phẩm không có tên'}
                        className='w-full h-[20rem] shadow-2xl rounded-t-2xl'
                    />
                    <div className='absolute h-full w-full bg-black/60 rounded-t-2xl flex flex-col items-center justify-between p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        
                        <div>
                            <button
                                className='w-full h-[3rem] bg-transparent border text-white font-bold rounded-full '
                                onClick={handleToggleLike} 
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaHeart className={`transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white'}`} size={20} />
                                    <span>{isLiked ? 'Bỏ yêu thích' : 'Thêm yêu thích'}</span>
                                </div>
                            </button>
                            <button
                                className="w-full h-[3rem] bg-[#1D7E20] text-white font-bold rounded-full mt-3"
                                onClick={handleViewDetails}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ShoppingCartIcon />
                                    <span>Xem chi tiết</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <h4 className='truncate font-arial text-black font-bold text-md ml-3 mt-3'>
                    {Product.product_name || 'Sản phẩm không có tên'}
                </h4>
                <h4 className='truncate font-arial text-red-700 font-bold text-md ml-3 mt-3'>
                    {Product.price || 'Sản phẩm không có tên'}
                </h4>
             
                <br />
                <img
                    src={`http://127.0.0.1:8000//media/images/${Product.imageSP}`}
                    alt={`${Product.Name} `}
                    className='w-[50px] h-[50px] object-contain m-3 rounded-md cursor-pointer hover:opacity-80'
                />
            </div>
            
            {/* <div className='flex justify-center space-x-2'>
                {Product.HINHANH.map((image, index) => (
                    <img
                        key={index}
                        src={`http://127.0.0.1:8000//media/images/${image.TENFILE}`}
                        alt={`${Product.Name} ${index + 1}`}
                        className='w-[50px] h-[50px] object-contain m-3 rounded-md cursor-pointer hover:opacity-80'
                    />
                ))}
            </div> */}
        </div>
    );
}
