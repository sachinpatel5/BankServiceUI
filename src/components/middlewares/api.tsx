// src/apiService.js
import axios from 'axios';
import globalStore from '../../globals';

// Create an instance of axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Access-Control-Allow-Origin': '*', }
   
});

// Request Interceptor
try {
    apiClient.interceptors.request.use(
      (config) => {
        const token = globalStore.get("token");
        console.log("Token in interceptor:", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    console.log("Request interceptor registered:", apiClient.interceptors.request);
  } catch (err) {
    console.error("Error registering request interceptor:", err);
  }
  
// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response.data; // Return only the data from the response
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
console.log(apiClient)
// Dynamic CRUD Methods

// Function to perform a dynamic API call based on user input
const dynamicApiCall = async (method: string, endpoint: string, data?: object | null)=> {
    try {
        switch (method.toLowerCase()) {
            case 'get':
                return await apiClient.get(endpoint);
            case 'post':
                return await apiClient.post(endpoint, data);
            case 'put':
                return await apiClient.put(endpoint, data);
            case 'delete':
                return await apiClient.delete(endpoint);
            default:
                throw new Error('Invalid HTTP method');
        }
    } catch (error) {
        console.error(`Error during ${method} request to ${endpoint}:`, error);
        throw error;
    }
};

// Exporting the dynamic API call function
export { dynamicApiCall };