import axios from 'axios';

const axiosInstance = axios.create();

// Добавляем перехватчик запросов для добавления токена авторизации
axiosInstance.interceptors.request.use((config) => {
    // Получаем токен авторизации из локального хранилища
    const token = localStorage.getItem('token');

    // Если токен существует, добавляем его в заголовок запроса
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    // Обрабатываем ошибки перехвата запросов
    return Promise.reject(error);
});

export default axiosInstance;
