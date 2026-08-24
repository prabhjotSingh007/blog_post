import axios from 'axios';
import { BASE_URL } from '../../enviorment';
import { clearUserFromCookies, getUserFromCookies } from '../cookies-service/CookiesService';

// Create a custom Axios instance
const axiosInterceptor = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 1. Request Interceptor: Attach Auth Tokens
axiosInterceptor.interceptors.request.use(
    (config) => {
        const token = getUserFromCookies()?.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Inject JWT token automatically
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Response Interceptor: Handle Global Errors (like 401 Unauthorized)
axiosInterceptor.interceptors.response.use(
    (response) => {
        // Return only the data portion to simplify API calls in your components
        return response.data;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Token expired or invalid -> Clear storage and redirect
                    clearUserFromCookies()
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden: You do not have access.');
                    break;
                case 500:
                    console.error('Server error occurred.');
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInterceptor;