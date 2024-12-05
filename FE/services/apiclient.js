import axios from 'axios';

// Tạo instance axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
});

// Thêm interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Hàm getUserById
const getUserById = async (username) => {
    try {
        const response = await apiClient.get(`/api/user/${username}/`);
        if (response.status === 200) {
            return response.data.user;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
// Hàm getUserById
const getImageProductByID = async (product_id) => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/product/${product_id}/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
const getColor = async () => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/color/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};

const getSize = async () => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/size`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
const get_sizes_and_colors = async (product_id) => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/get_sizes_and_colors/?product_id=${product_id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
const handleAddToCart = async (variant_id, username, quantity) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/add_to_cart/', {
            variant_id: variant_id,
            username: username,
            quantity: quantity
        });
        console.log('Thêm vào giỏ hàng thành công:', response.data);
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
};
const getCartQuantity = async (username) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_cart_quantity/${username}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
};
const updateCart = async (cartId, productId, size, color, quantity) => {
    try {
        const data = {
            cart_id: cartId,
            product_id: productId,
            size: size,
            color: color,
            quantity: quantity,
        };

        // Gửi yêu cầu POST tới API
        const response = await axios.post('http://127.0.0.1:8000/api/update_cart/', data, {
            headers: {
                'Content-Type': 'application/json', // Đảm bảo gửi đúng định dạng JSON
            },
        });

        // Kiểm tra phản hồi từ API
        if (response.status === 200) {
            console.log("Cart updated successfully:", response.data);
            return response.data;  // Trả về kết quả thành công
        } else {
            console.error("Failed to update cart:", response.data);
            return null;  // Trả về null nếu có lỗi
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("An error occurred:", error.response ? error.response.data : error.message);
        return null;
    }
};
const deleteCartItem = async (cartId, variantId) => {
    try {
        const response = await axios.delete('http://your-api-url/delete-cart-item/', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                cart_id: cartId,
            },
        });
        if (response.status === 200) {
            console.log('Item deleted successfully:', response.data);
        }
    } catch (error) {
        console.error('Error deleting cart item:', error.response ? error.response.data : error.message);
    }
};
// Sử dụng default export
export default apiClient;
export { getUserById, getImageProductByID, getColor, getSize, get_sizes_and_colors, getCartQuantity, handleAddToCart, updateCart, deleteCartItem };
