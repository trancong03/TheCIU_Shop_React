import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Product_list from "../Components/ui_product/product_list";
export default function Home() {
  const [listProduct, setlistProduct] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product/')
      .then(response => response.json())
      .then(data => setlistProduct(data.product))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const productsBanner = [...listProduct];
  return (
    <div className=" bg-white">
      <Banner products={productsBanner.sort(() => Math.random() - 0.5).slice(0, 10)} />
      <Product_list listProduct={listProduct}/>
    </div>
  );
}
