import axios from "axios";

// Base URL for your API
export const API_BASE_URL = "http://192.168.20.5:4000/";

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



// fetch all userlist(admin)
export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}admin/getAllUsers`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching AllUserslist:', error);
    throw error;
  }
};


export const deleteUser = async (userId) => {
  console.log(userId)
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}admin/deleteuser`
      ,{userId});
    return response.data;
  } catch (error) {
    console.error('Error deleting UserDetails:', error);
    throw error; // You can handle this error in your component
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



  // Product Edit
  export const editProduct = async (id, productData) => {
    try {
      // Append 'id' to the productData
      productData.append('id', id); // Include the ID in the formData
  
      // Send the POST request
      const response = await axiosInstance.post(`${API_BASE_URL}admin/updateProduct`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data', // This ensures image upload is handled correctly
        },
      });
  
      return response.data; // Return updated product data
    } catch (error) {
      console.error('Error updating product:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };
  
  // Product Delete
  export const deleteProduct = async (productId) => {
    console.log(productId)
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}admin/deleteproduct`
        ,{productId});
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error; // You can handle this error in your component
    }
  };


// CategoryCreation
  export const createCategory = async (formData) => {
    console.log(formData)

    const response = await axiosInstance.post(`${API_BASE_URL}admin/categoryCreate`, formData);
    return response.data;
  };

  // Get all Products List For Admin
  export const getProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}getAllProducts`); // Fetches categories from the backend
      return response.data; // Assuming the categories are in response.data
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };


  // Delete Category
  export const deleteCategory = async (id) => {
    console.log(id)
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}admin/deleteCategory`
        ,{id});
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error; // You can handle this error in your component
    }
  };


// Update  or Edit Category

export const editCategory = async (categoryId, formData) => {
  try {
    // Append categoryId to formData
    formData.append('categoryId', categoryId);

    const response = await axiosInstance.post(`${API_BASE_URL}admin/updateCategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // This ensures FormData is handled correctly
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; // Rethrow the error to be handled in the component
  }
};



//  Get User Profile

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/getAllUsers`);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update or Edit User Profile
export const updateUserProfile = async (updatedUser) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedUser.name);
    formData.append('email', updatedUser.email);
    formData.append('address', updatedUser.address);
    if (updatedUser.profilePicture) {
      formData.append('profilePicture', updatedUser.profilePicture);
    }

    const response = await axios.put(`${API_URL}/user/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


  //  User Side Product list by Category
  export const getProductsByCategory = async (categoryName) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}productByCategory`, {
        params: { category: categoryName }, // Pass categoryName as a query parameter
      });
      return response; // Return the response
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error; // Rethrow the error to be handled by the calling component
    }
  };


// Product Detail get by Id
  export const getProductsById = async (productId) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}getProductById`, {
       params:{ productId} , // Pass categoryName as a query parameter
      });
      return response; // Return the response
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Rethrow the error to be handled by the calling component
    }
  };
