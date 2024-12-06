import { ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient, { get_sizes_and_colors, handleAddToCart } from "../../services/apiclient";
import { useCart } from '../Components/context/CardContext';
export default function productDetail({  handleLoginClick }) {
    const { state } = useLocation();
    const { product, images } = state || {}; // Lấy product từ state
    const [currentIndex, setCurrentIndex] = useState(0);

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
    const [size, setSize] = useState([]); // State để lưu hình ảnh
    const [color, setColor] = useState([]); // State để lưu hình ảnh
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState({});
    const [selectedColor, setSelectedColor] = useState(null); // Màu sắc được chọn
    const [selectedSize, setSelectedSize] = useState(null); // Size được chọn

    useEffect(() => {
        const fetchColorSize = async () => {
            const result = await get_sizes_and_colors(product.product_id ); // Gọi API
            
            if (result) {
                setColor(result.colors) // Cập nhật state với dữ liệu từ API
                setSize(result.sizes)
            } else {
                console.error('Failed to fetch product images');
            }
        };
        fetchColorSize()
    }, [product.product_id]); // Chỉ chạy khi `Product.product_id` thay đổi
    useEffect(() => {
        const getvariant = async () => {
            try {
                const response = await apiClient.get(
                    `http://127.0.0.1:8000/api/get_variant_id/?product_id=${product.product_id}&color_id=${selectedColor?.id}&size_id=${selectedSize?.id}`
                );

                if (response.status === 200) {
                    setVariant(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (selectedColor && selectedSize) {
            getvariant();
        }
    }, [selectedColor, selectedSize]);


    // Hàm xử lý khi chọn một option
    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === "color") {
            const selectedColor = color.find((item) =>
                item.id === parseInt(value, 10)
            );
            setSelectedColor(selectedColor);
        } else if (id === "size") {
            const selectedSize = size.find((item) => item.id === parseInt(value, 10));
            setSelectedSize(selectedSize);
        }
    };

    

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const {
        handleAddItem
    } = useCart();
    const handleAddCart= async() =>{
        try{
            const username = JSON.parse(localStorage.getItem('userInfo')).username;
            
            if(username){
                const result = await handleAddItem(username, product.product_id, size.id, color.id, quantity);
                
            }
            else{
                console.log("Khong tim thay user");
                handleLoginClick();
            }
        } catch (error) {
            console.error(error);
        }
    }    
    const navigate = useNavigate();
    const handleMuaNgay = ()=>{
        handleAddCart();
        navigate('/account/cart')
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
                <div className=" w-1/2 ml-8 h-[90vh]">
                    <h1 className="font-black text-xl ml-3 mt-3">{product.product_name}</h1>
                    <h1 className=" font-arial ml-3">{product.title}</h1>
                    <h4 className=' text-black font-black text-xl ml-3 mb-3 mt-3'>
                        {new Intl.NumberFormat('vi-VN').format(product.price || 'Sản phẩm không có tên')} đ
                    </h4>
                    <div className="flex flex-col items-start justify-center">
                        <label htmlFor="color" className="text-black  text-xl ml-3 mb-3 mt-3">Màu Sắc:</label>
                        <select
                            id="color"
                            value={selectedColor ? selectedColor.id : ""}
                            onChange={handleChange}
                            className="border p-2 text-xl ml-3 mb-3 mt-3"
                        >
                            <option value="" disabled>
                                -- Chọn màu sắc --
                            </option>
                            {color.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                   
                    
                    <div className="flex flex-col items-start justify-center">
                        <label htmlFor="color" className="text-black  text-xl ml-3 mb-3 mt-3">Size:</label>
                        <select
                            id="size"
                            value={selectedSize ? selectedSize.id : ""}
                            onChange={handleChange}
                            className="border p-2 text-xl ml-3 mb-3 mt-3"
                        >
                            <option value="" disabled>
                                -- Chọn size --
                            </option>
                            {size.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h3 className=' text-black  text-xl ml-3 mb-3 mt-3'>Tồn Kho : {variant ? variant.quantity: "0"}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-black  text-xl ml-3 mb-3 mt-3">Số lượng</span>
                        <button
                            onClick={handleDecrease}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-xl rounded-full"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-12 h-8 text-center border rounded-md"
                        />
                        <button
                            onClick={handleIncrease}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-xl rounded-full"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button
                        onClick={handleMuaNgay}
                            className='w-full h-[3rem] bg-transparent border text-black bg-slate-500 font-bold rounded-full hover:text-red-200 hover:border-red-200 '
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span>Mua Ngay</span>
                            </div>
                        </button>
                        <button
                            className="w-full h-[3rem] transition-colors duration-300   text-black font-bold border rounded-full  hover:text-yellow-200 hover:border-yellow-200"
                            onClick={handleAddCart}
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
