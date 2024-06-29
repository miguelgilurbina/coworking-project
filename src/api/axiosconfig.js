import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Ajusta esto a la URL de tu backend
    withCredentials: true, // Esto es importante para enviar y recibir cookies
});

export default api;