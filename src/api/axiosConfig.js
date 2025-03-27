import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/users'; // Ajusta si el backend usa otro puerto

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
