import axios from "axios";

// Base URL for your API
const API_BASE_URL = "http://192.168.20.7:4000/";

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
        // console.log(userData);
      const response = await axiosInstance.post(`${API_BASE_URL}register`, userData);
      return response.data; // Return the response data (e.g., user details)

    } catch (error) {
      throw error.response ? error.response.data.message : new Error("Registration failed");
    }
  };

  export const userLogin = async (userData) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}login`, userData);
      return response.data; // Return the response data (e.g., user details)
    } catch (error) {
      return error.response ? error.response.data : new Error("Sign In Failed");
    }
  } 

// get All Categories(admin)
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}getAllCategory`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};



// fet all userlist(admin)
export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}admin/getAllUsers`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};





// Product Creation
  export const createProduct = async (productData) => {
    try {
      const formData = new FormData();
  
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("gender", productData.gender);
      formData.append("size", productData.size);
      formData.append("color", productData.color);
      formData.append("category", productData.category);
      formData.append("stock_quantity", productData.stock_quantity);
  

      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image) => {
          formData.append("images", image); // Append each image
        });
      }
  
      const response = await axiosInstance.post(`${API_BASE_URL}admin/productCreate`, formData);
      return response.data; // Return response data (e.g., product details)
    } catch (error) {
    //   console.error("Error during product creation:", error);
    //   throw error.response ? error.response.data.message : new Error("Product creation failed");
    // }
    console.error("API error:", error); // Log the error here
    throw error;
    }
  };
