import React from 'react'
import CartItem from '../ui/CartItem';
export default function Product_list({ listProduct }) {
  return (
      <div className="grid grid-cols-5 m-[5%]">
          {
              listProduct.map((product) => {
                  return (
                      <CartItem
                      key={product.ProductID}
                        Product={product}
                      />
                  );
              })}
      </div>
  )
}
