import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import { useNavigate } from "react-router-dom";
import  { getImageProductByID } from "../../../services/apiclient";
import { useAlert } from "../context/AlertContext";

export default function CartItem({ Product }) {
    const defaultImage = 'default.jpg';
    const navigate = useNavigate();
    const { likeProduct, isProductLiked, handleAddItem } = useCart();
    const [isLiked, setIsLiked] = useState(false);
    const [images, setImages] = useState([]); // State để lưu hình ảnh

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getImageProductByID(Product.product_id); // Gọi API
            if (result) {
                setImages(result.slice(0, 4)); // Cập nhật state với dữ liệu từ API
            } else {
                console.error('Failed to fetch product images');
            }
        };

        fetchImages();
    }, [Product.product_id]); 
    
    // Chỉ chạy khi `Product.product_id` thay đổi
    // Cập nhật trạng thái yêu thích khi thay đổi sản phẩm
    // useEffect(() => {
    //     setIsLiked(isProductLiked(Product.MABAIVIET)); // Đồng bộ trạng thái yêu thích khi sản phẩm thay đổi
    // }, [Product.product_id, isProductLiked]); // Theo dõi sự thay đổi của likeProducts

    // Xử lý xem chi tiết sản phẩm
    const { showAlert } = useAlert();
    const handleAddToCart = async () => {
        try {
            const username = JSON.parse(localStorage.getItem('userInfo')).username;

            if (username) {
                const result = await handleAddItem(username, Product.product_id);
                showAlert("Thêm vào giỏ hàng thành công");
            }
            else {
                console.log("Khong tim thay user");
                handleLoginClick();
            }
        } catch (error) {
            console.error(error);
        }
       
    };
    const handleViewDetails = async () => {
        navigate("/product-detail", { state: { product: Product, images: images } });

    };
    // Xử lý thay đổi trạng thái yêu thích
    const handleToggleLike = () => {

        likeProduct(Product); 
        // Gọi hàm likeProduct và để nó xử lý trạng thái yêu thích
    };
    
    return (
        <div className="flex items-center justify-center flex-col mt-3 rounded-2xl">
            <div className='w-[16vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl'>
                <div className='relative overflow-hidden flex items-center justify-center flex-col'>
                    <img
                        src={`http://127.0.0.1:8000//media/images//${Product.imageSP || defaultImage}`}
                        alt={Product.Name || 'Sản phẩm không có tên'}
                        className='w-full h-[20rem] shadow-2xl rounded-t-2xl'
                    />
                    <div className='absolute h-full w-full bg-black/60 rounded-t-2xl flex flex-col items-center justify-center p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        
                        <div>
                            <button
                                className='w-full h-[3rem] bg-transparent border text-white font-bold rounded-full hover:text-red-200 hover:border-red-200 '
                                onClick={handleToggleLike} 
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaHeart className={`transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white'}`} size={20} />
                                    <span>{isLiked ? 'Bỏ yêu thích' : 'Thêm yêu thích'}</span>
                                </div>
                            </button>
                            <button
                                className="w-full h-[3rem] transition-colors duration-300   text-white font-bold border rounded-full mt-3 hover:text-yellow-200 hover:border-yellow-200"
                                onClick={handleAddToCart}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ShoppingCartIcon />
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div onClick={handleViewDetails}>
                    <h4 className=' font-arial text-black font-bold text-md ml-3 mt-3 line-clamp-2  hover:underline hover:cursor-pointer'>
                        {Product.product_name || 'Sản phẩm không có tên'}
                    </h4>

                    <h4 className=' text-black font-black text-md ml-3 mt-3'>
                        {new Intl.NumberFormat('vi-VN').format(Product.price || 'Sản phẩm không có tên')} đ
                    </h4>

                    <br />
                    <div className='flex justify-center space-x-2 pb-3'>
                        {images.map((image, index) => (
                            <img
                                key={`${image.product_id + index} `}
                                src={`http://127.0.0.1:8000//media/images/${image.url}`}
                                className='w-10 h-14 object-cover ml-3 rounded-lg cursor-pointer hover:opacity-80'
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}
