import axios from "axios";

// Base URL for your API
const API_BASE_URL = "http://localhost:3000/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

axiosInstance.interceptors.request.use(
    (config) => {
      // Retrieve token from local storage
      const token = localStorage.getItem('authToken');
  
      // If token exists, set it in the Authorization header
      if (token) {
        config.headers['Authorization'] = token;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );


// Login request function
export const registerUser = async (userData) => {
    try {
        console.log(userData);
      const response = await axiosInstance.post(`${API_BASE_URL}register`, userData);
      return response.data; // Return the response data (e.g., user details)
    } catch (error) {
      throw error.response ? error.response.data : new Error("Registration failed");
    }
  };

  export const userLogin = async (userData) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}login`, userData);
      return response.data; // Return the response data (e.g., user details)
    } catch (error) {
      throw error.response ? error.response.data : new Error("Sign In Failed");
    }
  }
