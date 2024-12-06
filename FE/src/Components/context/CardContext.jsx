import { createContext, useState, useContext, useEffect } from 'react';
import { updateCart, deleteCartItem, getCartQuantity, handleAddToCart, } from '../../../services/apiclient';

const CartContext = createContext();

export const CartProvider = ({ children, User }) => {
    const personID = User ? User.username : null;
    const [cartItems, setCartItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [likeProducts, setLikeProducts] = useState([]);

    const fetchCart = async () => {
        try {
            const result = await getCartQuantity(personID);
            if (result.data.cart_items) {
                const updatedCartItems = result.data.cart_items.map(item => ({
                    ...item,
                    selected: false, // Default selected field
                }));
                setCartItems({ ...result.data, cart_items: updatedCartItems });
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

    const handleRemoveItem = (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        if (isConfirmed) {
            deleteCartItem(id)
                .then(() => {
                    fetchCart()
                })
                .catch(error => {
                    console.error("Error deleting cart item:", error);
                    alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
                });
        } else {
            alert("Hành động xóa bị hủy.");
        }
    };
    const handleAddItem = (variant_id, username,quantity) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        if (isConfirmed) {
            deleteCartItem(id)
                .then(() => {
                    fetchCart()
                })
                .catch(error => {
                    console.error("Error deleting cart item:", error);
                    alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
                });
        } else {
            alert("Hành động xóa bị hủy.");
        }
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
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
