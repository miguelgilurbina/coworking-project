import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080', // Ajusta esto a la URL de tu backend
    withCredentials: true, // Esto es importante para enviar y recibir cookies
});

// Interceptor de solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no hemos intentado actualizar el token antes
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Implementar la lógica para refrescar el token
                const { refreshToken } = require('../Components/Context/AuthContext');
                const newToken = await refreshToken();


                // Vuelve a intentar la solicitud original con el nuevo token
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Si no se puede refrescar el token, limpiar el almacenamiento y redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                // Aquí puedes agregar lógica para redirigir al usuario a la página de login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;