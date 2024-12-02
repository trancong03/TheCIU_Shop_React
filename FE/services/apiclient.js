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


// Sử dụng default export
export default apiClient;
export { getUserById, getImageProductByID };
