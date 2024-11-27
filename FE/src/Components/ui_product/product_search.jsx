import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartItem from '../ui/CartItem';
export default function SearchProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { product_name } = useParams();

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/get_product_search/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ product_name: product_name }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data.product); 
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProductsByCategory();
    }, [product_name]); // Gọi lại hàm khi `categoryId` thay đổ
    return (

        <div className=" mx-auto bg-white max-w-full min-h-screen p-4 flex-1 justify-between items-center">
            <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Sản Phẩm Tìm Kiếm {product_name}</h2>
            <div className='grid grid-cols-4 gap-4 m-[5%]'>
                {products.length === 0 ? (
                    <h1 className="text-gray-600 font-bold text-2xl w-[100vw]">Không tìm thấy sản phẩm</h1>
                ) : (
                        products.map((product) => (
                            <CartItem
                                key={product.ProductID}
                                Product={product}
                            />
                        ))
                    )}
            </div>
        </div>
    );
}
