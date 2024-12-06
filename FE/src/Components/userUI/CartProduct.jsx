import React, { useEffect } from "react";
import ProductListCart from './../ui/ProductListCart';
import NoPosts from './NoPosts';
import { useCart } from "../context/CardContext";

const CartProduct = ({ username }) => {
    const {
        cartItems,
        selectAll,
        handleRemoveItem,
        handleUpdateQuantity,
        handleToggleSelectAll,
        handleToggleSelectItem,
        calculateTotal,
        fetchCart
    } = useCart();

    useEffect(() => {
        fetchCart;
    }, [username]);

    return (
        <div className="flex flex-col lg:flex-row p-2 lg:p-6 gap-6 bg-white h-fix max-w-screen">
            <div className="flex-1 bg-white shadow-md rounded-lg p-6 min-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Giỏ Hàng</h2>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleToggleSelectAll}
                        className="mr-4"
                    />
                    <label className="font-bold">Chọn tất cả</label>
                </div>
                <div className="flex flex-col justify-between items-baseline">
                    <div className="h-[65vh] overflow-y-auto scrollbar-hidden">
                        {cartItems.total_quantity === 0 ? (
                            <NoPosts />
                        ) : (
                            Array.isArray(cartItems.cart_items) ? (
                                cartItems.cart_items.map(item => (
                                    <div key={item.variant_id} className="mb-4">
                                        <ProductListCart
                                            item={item}
                                            onRemove={handleRemoveItem}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onToggleSelect={() => handleToggleSelectItem(item.variant_id)}
                                            selected={item.selected}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>Không có sản phẩm trong giỏ hàng</p>
                            )
                        )}
                    </div>

                    <div>
                        {cartItems.total_quantity > 0 && (
                            <div className="mt-6">
                                <p className="font-bold text-xl">Tổng tiền: {calculateTotal().toLocaleString()}đ</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-center gap-2 w-[55vw]">
                            <button
                                className="w-[48%] py-2 bg-black text-white rounded"
                                onClick={() => alert("Thanh toán")}
                            >
                                Thanh toán
                            </button>
                            <button
                                className="w-[48%] py-2 bg-gray-300 text-black rounded"
                                onClick={() => alert("Mua thêm")}
                            >
                                Mua thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
