import React, { useEffect, useState } from "react";
import Banner from "../Components/Header/Banner";
import axios from 'axios';
import CartItem from './../Components/ui/CartItem';
import ErrorBoundary from "../ErrorBoundary";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/");
        setProducts(response.data); // Lưu danh sách sản phẩm từ API
      } catch (err) {
        setError(err.response ? err.response.data : err.message); // Xử lý lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);// Chạy chỉ một lần khi component mount
  
  return (
    <div className=" bg-white">
      <Banner />
      <div className="grid grid-cols-4 m-[5%]">
        {products.map((product) => {
          return (
            <ErrorBoundary>
              <CartItem
                key={product.product_id}
                Product={product}
              />
            </ErrorBoundary> 
          );
        })}
      </div>

    </div>
  );
}
