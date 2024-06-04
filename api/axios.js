import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_BASE_URL} from "@env";

const instance = axios.create({
    baseURL: API_BASE_URL
})

instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && error.response.data.message === 'Token expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        try {
            console.log('Refreshing token...');
            const response = await axios.post(`${API_BASE_URL}/refresh-token`, { token: refreshToken });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            return axios(originalRequest);
        } catch (e) {
            // Handle error in refreshing token
            return Promise.reject(e);
        }
    }
    return Promise.reject(error);
});

export default instance