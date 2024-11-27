import React from 'react';

const CartItemShopping = ({ name, price, images }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <img src={`/image/product/${images[0]}`} alt={name} className="w-10 h-10 rounded" />
        <div className="ml-2">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{price}đ</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemShopping;
