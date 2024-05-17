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

export default instance