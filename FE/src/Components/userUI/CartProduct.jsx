import React, { useEffect, useState } from "react";
import ProductListCart from './../ui/ProductListCart';
import NoPosts from './NoPosts';
import { getCartQuantity, handleAddToCart, updateCart } from "../../../services/apiclient";
const CartProduct = ({ username }) => {
    const [cartItems, setCartItems] = useState({});
    const fetchCart = async () => {
        try {
            const result = await getCartQuantity(username);
            if (result) {
                const updatedCartItems = result.data.cart_items.map(item => ({
                    ...item,
                    selected: false, // Thêm trường selected mặc định
                }));
                setCartItems({ ...result.data, cart_items: updatedCartItems });
            } else {
                console.error('Failed to fetch cart');
            }
        } catch (error) {
            console.error('Error while fetching cart:', error);
        }
    };
    useEffect(() => {
       
        fetchCart();
    }, [username]);

    
    const [selectAll, setSelectAll] = useState(false); // Trạng thái cho checkbox "Chọn tất cả"

    const handleRemoveItem = (id) => {
        // setCartItems(cartItems.filter(item => item.id !== id));
        alert("remove");
    };

    const handleUpdateQuantity = (cart_id, product_id, size_id, color_id, newQuantity) => {
        updateCart(cart_id, product_id, size_id, color_id, newQuantity);
        fetchCart();
    };
    const handleToggleSelectAll = () => {
        setSelectAll(!selectAll); // Đảo trạng thái "Chọn tất cả"
        
        setCartItems({
            ...cartItems,
            cart_items: cartItems.cart_items.map(item => ({
                ...item,
                selected: !selectAll,
            })),
        });
    };

    const handleToggleSelectItem = (id) => {
        const updatedCartItems = cartItems.cart_items.map(item =>
            item.variant_id === id ? { ...item, selected: !item.selected } : item
        );

        const allSelected = updatedCartItems.every(item => item.selected); // Kiểm tra nếu tất cả item đều được chọn

        setCartItems({
            ...cartItems,
            cart_items: updatedCartItems,
        });

        setSelectAll(allSelected); // Cập nhật trạng thái "Chọn tất cả"
    };



    // Tính tổng tiền của các sản phẩm được chọn
    const calculateTotal = () => {
        if (!Array.isArray(cartItems.cart_items)) return 0;

        return cartItems.cart_items.reduce((total, item) => {
            if (item.selected) {
                const totalPrice = item.quantity * parseFloat(item.price || 0);
                return total + totalPrice;
            }
            return total;
        }, 0);
    };
    return (
            <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-6 bg-white h-fix max-w-screen">
                <div className="flex-1 bg-white shadow-md rounded-lg p-6 min-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Giỏ Hàng</h2>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleToggleSelectAll} // Xử lý khi checkbox "Chọn tất cả" thay đổi
                        className="mr-4"
                    />
                    <label className="font-bold">Chọn tất cả</label>
                </div>
                <div className="flex flex-col justify-between items-baseline">
                    <div className="h-96 overflow-y-auto scrollbar-hidden">
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
                                            selected={item.selected} // Truyền trạng thái selected cho từng sản phẩm
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>Không có sản phẩm trong giỏ hàng</p> // Thông báo nếu cart_items không phải là mảng
                            )
                        )}
                    </div>


                    <div>
                        {/* Hiển thị tổng tiền */}
                        {cartItems.total_quantity > 0 && (
                            <div className="mt-6">
                                <p className="font-bold text-xl">Tổng tiền: {calculateTotal().toLocaleString()}đ</p>
                            </div>
                        )}

                        {/* Nút thanh toán và mua thêm */}
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
