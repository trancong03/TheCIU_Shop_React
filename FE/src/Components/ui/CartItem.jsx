import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";

export default function CartItem({ Product }) {
  const defaultImage = 'default.jpg'; 
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, likeProduct, isProductLiked } = useCart();
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked); 
  };
  useEffect(() => {
    setIsLiked(isProductLiked(Product.ProductID));
  }, [Product.ProductID, isProductLiked]);
  return (
    <div className="flex items-center justify-center flex-col mt-3">
      <div className='w-[15vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl'>
        <div className='relative overflow-hidden flex items-center justify-center flex-col'>
          <img
            src={`/image/product/${Product.ImageID.length > 0 ? Product.ImageID[0] : defaultImage}`}
            alt={Product.Name || 'Sản phẩm không có tên'}
            className='w-auto h-[20rem] rounded-2xl shadow-2xl'
          />
          <div className='absolute h-full w-full bg-black/60 rounded-2xl flex flex-col items-center justify-between p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <div className='text-center'>
              <h3 className='line-clamp-3 font-arial text-white text-xl'>{Product.Name || 'Sản phẩm không có tên'}</h3>
              <h3 className='line-clamp-3 font-arial text-white text-xl'>xuất xứ: {Product.Origin || 'Sản phẩm không có tên'}</h3>
              <p className='text-lg font-bold text-white'>
                Giá: {Product.Price ? Product.Price.toLocaleString() : 0}<span> đ/{Product.Unit || 'N/A'}</span>
              </p>
            </div>
            <div>
              <button
                className='w-full h-[3rem] bg-transparent border text-white font-bold rounded-full '
                onClick={handleToggleLike}
              >
                <div className="flex items-center justify-center gap-2"
                  onClick={() => { likeProduct(Product) }}
                >
                  <FaHeart className={`transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white'}`} size={20} /> {/* Thay đổi màu */}
                  <span>Thêm yêu thích</span>
                </div>
              </button>
              <button
                className='w-full h-[3rem] bg-[#1D7E20] text-white font-bold rounded-full mt-3'
                onClick={() => { addToCart(Product) }}
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCartIcon />
                  <span>Thêm vào giỏ</span>
                </div>
              </button>
            </div>

          </div>
        </div>

        <h4 className='truncate font-arial text-green-950 font-bold text-md ml-3 mt-3'>
          {Product.Name || 'Sản phẩm không có tên'}
        </h4>

        <br />
      </div>
      <div className='flex justify-center space-x-2'>

        {Product.ImageID.map((image, index) => (
          <img
            key={index}
            src={`/image/product/${image}`}
            alt={`${Product.Name} ${index + 1}`}
            className='w-[50px] h-[50px] object-cover rounded-md cursor-pointer hover:opacity-80'
          />
        ))}
      </div>
    </div>
    
  );
}
