import { createContext, useState, useContext, useEffect } from 'react';
import { updateCart, deleteCartItem, getCartQuantity, handleAddToCart, } from '../../../services/apiclient';
import { useAlert } from './AlertContext';

const CartContext = createContext();

export const CartProvider = ({ children, User }) => {
    const personID = User ? User.username : null;
    const [cartItems, setCartItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [likeProducts, setLikeProducts] = useState([]);
    const { showAlert } = useAlert();
    const fetchCart = async () => {
        try {
            const result = await getCartQuantity(personID);

            // Kiểm tra result.data trước khi xử lý
            if (result && result.data) {
                const cartItems = result.data.cart_items || []; // Đảm bảo cart_items là mảng
                const updatedCartItems = cartItems.map(item => ({
                    ...item,
                    selected: false, // Default selected field
                }));

                // Cập nhật state
                setCartItems({
                    ...result.data,
                    total_quantity: cartItems.length, // Tổng số lượng sản phẩm
                    cart_items: updatedCartItems,
                });
            } else {
                console.warn('Cart data is empty or undefined');
                setCartItems({ total_quantity: 0, cart_items: [] });
            }
        } catch (error) {
            console.error('Error while fetching cart:', error);
        }
    };


    useEffect(() => {
        if (personID) {
            fetchCart();
        }
    }, [personID]);
console.log(cartItems);

    const handleAddItem = (username, product_id, size = null, color = null, quantity = 1) => {
        handleAddToCart(username, product_id, size, color, quantity)
                .then(() => {
                    fetchCart();
                    
                    showAlert("Thêm sản phẩm thành công")
                })
                .catch(error => {
                    console.error("Error add cart item:", error);
                    alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
                });
    };
    const handleRemoveItem = (id) => {

            deleteCartItem(id)
                .then(() => {
                    fetchCart()
                    showAlert("xóa sản phẩm thành công")
                })
                .catch(error => {
                    console.error("Error deleting cart item:", error);
                    alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
                });
        
    };


    const handleUpdateQuantity = (cart_id, product_id, size_id, color_id, newQuantity) => {
        updateCart(cart_id, product_id, size_id, color_id, newQuantity)
            .then(() => {
                fetchCart(); // Re-fetch cart after update
            })
            .catch(error => {
                console.error("Error updating cart:", error);
            });
    };

    const handleToggleSelectAll = () => {
        setSelectAll(prevSelectAll => {
            const newSelectAll = !prevSelectAll;
            setCartItems(prevCart => ({
                ...prevCart,
                cart_items: prevCart.cart_items.map(item => ({
                    ...item,
                    selected: newSelectAll,
                })),
            }));
            return newSelectAll;
        });
    };

    const handleToggleSelectItem = (id) => {
        const updatedCartItems = cartItems.cart_items.map(item =>
            item.variant_id === id ? { ...item, selected: !item.selected } : item
        );

        const allSelected = updatedCartItems.every(item => item.selected);
        setCartItems({
            ...cartItems,
            cart_items: updatedCartItems,
        });

        setSelectAll(allSelected);
    };

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
        <CartContext.Provider value={{
            cartItems,
            selectAll,
            likeProducts,
            handleRemoveItem,
            handleUpdateQuantity,
            handleToggleSelectAll,
            handleToggleSelectItem,
            calculateTotal,
            fetchCart,
            handleAddItem,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
