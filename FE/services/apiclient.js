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


// Sử dụng default export
export default apiClient;
export { getUserById, getImageProductByID, getColor, getSize, get_sizes_and_colors };
