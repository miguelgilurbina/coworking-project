import api from '../api/axiosconfig';

export const login = async (username, password) => {
    try {
        const response = await api.post('/api/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const logout = async () => {
    try {
        await api.post('/api/auth/logout');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};