import React, { useEffect, useState } from "react";
import CartItemDetail from "../Components/ui/CartItemDetail";
import { useCart } from "../Components/context/CardContext";

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        if (cartItems) {
            const updatedCartItems = cartItems;
            setCart(updatedCartItems);
            calculateTotal(updatedCartItems, selectedProducts);
        } else {
            setCart([]);
            setTotalAmount(0);
        }
    }, [cartItems]);

    // Hàm tính tổng tiền cho các sản phẩm được chọn
    const calculateTotal = (items, selected) => {
        const total = items.reduce((sum, item) => {
            if (selected.includes(item.ProductID)) {
                const price = parseFloat(item.Price) || 0;
                const quantity = item.quantity || 1;
                return sum + price * quantity;
            }
            return sum;
        }, 0);
        setTotalAmount(total);
    };

    const handleQuantityChange = (itemId, change) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.ProductID === itemId) {
                    const newQuantity = (item.quantity || 1) + change;
                    return { ...item, quantity: Math.max(newQuantity, 1) };
                }
                return item;
            });
            calculateTotal(updatedCart, selectedProducts); // Cập nhật tổng tiền
            return updatedCart;
        });
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prevSelected => {
            const newSelected = prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId];

            calculateTotal(cart, newSelected); // Cập nhật tổng tiền khi thay đổi lựa chọn
            return newSelected;
        });
    };

    const handleRemoveItem = async (productId) => {
        await removeFromCart(productId); // Gọi hàm removeFromCart từ context
    };

    const handleCheckout = () => {
        const selectedItems = cart.filter((item) => selectedProducts.includes(item.ProductID));
        console.log('Thanh toán cho các sản phẩm:', selectedItems);
    };

    return (
        <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-6 bg-white min-h-screen">
            <div className="flex-1 bg-white shadow-md rounded-lg p-6 h-fit">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Giỏ hàng</h2>
                <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                        <div key={item.ProductID} className="flex items-center justify-between py-4">
                            <input
                                type="checkbox"
                                checked={selectedProducts.includes(item.ProductID)}
                                onChange={() => handleSelectProduct(item.ProductID)}
                                className="mr-4"
                            />

                            <CartItemDetail
                                item={item}
                                onQuantityChange={handleQuantityChange}
                            />

                            <button
                                onClick={() => handleRemoveItem(item.ProductID)}
                                className="bg-gray-200 ml-3 hover:text-red-700 text-red-500 px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="w-full lg:w-1/3 max-w-sm bg-white shadow-md rounded-lg p-6 h-fit">
                <h3 className="text-xl font-semibold text-gray-700">Tổng tiền</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2 mb-4">{totalAmount.toLocaleString()} VND</p>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                    onClick={handleCheckout}
                >
                    Thanh toán
                </button>
            </div>
        </div>
    );
}
