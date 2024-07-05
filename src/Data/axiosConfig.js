import axios from 'axios';

// Función para convertir DynamoDB JSON a JSON estándar
const dynamodbToJson = (dynamodbJson) => {
    const convert = (data) => {
        if (Array.isArray(data)) {
            return data.map(convert);
        } else if (data && typeof data === 'object') {
            const deserialized = {};
            for (const key in data) {
                const value = data[key];
                if (value.S !== undefined) {
                    deserialized[key] = value.S;
                } else if (value.N !== undefined) {
                    deserialized[key] = Number(value.N);
                } else if (value.BOOL !== undefined) {
                    deserialized[key] = value.BOOL;
                } else if (value.M !== undefined) {
                    deserialized[key] = convert(value.M);
                } else if (value.L !== undefined) {
                    deserialized[key] = value.L.map(convert);
                }
            }
            return deserialized;
        }
        return data;
    };
    return convert(dynamodbJson);
};

// Función para crear una instancia de Axios con interceptores
const createAxiosInstance = (baseURL) => {
    const axiosInstance = axios.create({
        baseURL: baseURL,
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            // Convertir DynamoDB JSON a JSON estándar si es necesario
            if (response.data && typeof response.data === 'object') {
                response.data = dynamodbToJson(response.data);
            }
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

// Crear instancias de Axios para cada API
export const apiUsuario = createAxiosInstance('https://kdi932j6jd.execute-api.us-east-2.amazonaws.com');
export const apiCategoria = createAxiosInstance('https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com');
export const apiCaracteristica = createAxiosInstance('https://vxiflfscqh.execute-api.us-east-2.amazonaws.com');
export const apiSala = createAxiosInstance('https://f3fvcy350l.execute-api.us-east-2.amazonaws.com');
export const apiReserva = createAxiosInstance('https://gs7aw1cml0.execute-api.us-east-2.amazonaws.com');

