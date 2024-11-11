import axios from "axios";

// Base URL for your API
export const API_BASE_URL = "http://192.168.20.5:3000/";

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
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the token is expired (statusCode === 700)
    if (response.data?.statusCode === 700) {
      // Remove the auth token from local storage
      localStorage.removeItem('authToken');

      // Redirect the user to the login page
      window.location.href = "/Signin";
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Registration function
export const registerUser = async (userData) => {
  try {
    // console.log(userData);
    const response = await axiosInstance.post(`${API_BASE_URL}register`, userData);
    return response.data; // Return the response data (e.g., user details)
    if (response.status === 700) {

      console.log(" Time Out");
    }
  } catch (error) {
    throw error.response ? error.response.data.message : new Error("Registration failed");
  }
};


// Login.......
export const userLogin = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}login`, userData);
    console.log(response);
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
      , { userId });
    return response.data;
  } catch (error) {
    console.error('Error deleting UserDetails:', error);
    throw error; // You can handle this error in your component
  }
};


// fetch all vendorlist(admin)
export const getAllVendors = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}admin/listVendors`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching AllVendorlist:', error);
    throw error;
  }
};


// Vendor Product Creation
export const createProduct = async (formData) => {
  try {
      const response = await axiosInstance.post(`${API_BASE_URL}vendor/productCreate`, formData,
    );
      return response.data; // Return the created product data
  } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Rethrow the error for handling in the component
  }
};

export const editProduct = async (id, formData) => {
  try {
    // Create a new FormData object
    const productData = new FormData();

    // Append product fields to FormData
    for (const key in formData) {
      productData.append(key, formData[key]);
    }

    // Append the 'id'
    productData.append('id', id);

    // Send the POST request
    const response = await axiosInstance.post(`${API_BASE_URL}admin/updateProduct`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure image upload is handled correctly
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};


export const EditProduct = async ( productData) => { // Make sure to pass the id as an argument
  try {
      // Log FormData entries for debugging
   

      const response = await axiosInstance.post(`${API_BASE_URL}vendor/updateProduct`, productData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      return response.data;
  } catch (error) {
      console.error('Error updating product:', error);
      throw error;
  }
};





// Product Delete
export const deleteProduct = async (productId) => {
  console.log(productId)
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}vendor/deleteproduct`
      , { productId });
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

// Get all Products List For Vendor
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}vendor/productList`); // Fetches categories from the backend
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
      , { id });
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

// Get User Address by UserID
export const fetchUserAddresses = async (userId) => {
  try {
    // Make a POST request to the API with the userId
    const response = await axiosInstance.get(`${API_BASE_URL}getAddressesByUser`, { userId });
    
    // Return the data directly, as Axios handles JSON parsing
    return response.data;
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    throw new Error("Failed to fetch addresses");
  }
};

export const addAddress = async (userId, address) => {
  const response = await axiosInstance.post(`${API_BASE_URL}addAddress`, address);
  return response.data;
};

// Set as default Address
export const setDefaultAddress = async (userId, addressId) => {
  try {
    // const response = await  axiosInstance.post(`${API_BASE_URL}${userId}/addresses/${addressId}`);
    const response = await  axiosInstance.get(`${API_BASE_URL}setDefault`,User.authMiddleware,
      Address.setDefaultAddress);
    
    return response.data;
  } catch (error) {
    console.error("Error setting default address:", error.message);
    throw error;
  }
};




//  Get User Profile for User Side

export const getUserProfile = async (UserId) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}getUserById`, {
      UserId, // Pass categoryName as a query parameter
    });
    return response.data;
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
    // if (updatedUser.profilePicture) {
    //   formData.append('profilePicture', updatedUser.profilePicture);
    // }

    const response = await axios.put(`${API_URL}/user/profile`, formData
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    );
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


//  User Side Product list by Category
export const getProductsByCategory = async (categoryName) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}productByCategory`,{
      params: { category: categoryName }, // Pass categoryName as a query parameter
    });
    return response; // Return the response
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};



 // Get products by gender
export const getProductsByGender = async (gender) => {
  // console.log("..............",gender)
  try {
    // console.log("Fetching products from:", `${API_BASE_URL}productByGender`);

    const response = await axios.get(`${API_BASE_URL}productByGender`, {
      params: { gender }, // Pass gender as a query parameter
    });
    return response;
  } catch (error) {
    console.error('Error fetching products by gender:', error);
    throw error;
  }
};



export const getProductById = async (productId) => {
  try {
    console.log(productId)
    const response = await axiosInstance.get(`${API_BASE_URL}getProductById`, {
      params: { productId }, // Pass categoryName as a query parameter
    });
    return response; // Return the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};


// Product Detail get by Id
export const getProductsById = async (productId) => {
  try {
    console.log(productId)
    const response = await axiosInstance.get(`${API_BASE_URL}vendor/getProductById`, {
      params: { productId }, // Pass categoryName as a query parameter
    });
    return response; // Return the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};


// Vendor Registration
export const registerVendor = async (finalvendorData) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}vendor/registerVendor`, finalvendorData); // Axios will automatically stringify the vendorData
    console.log(response)
    return response.data; // Axios automatically parses JSON responses
  } catch (error) {
    console.error('Error registering vendor:', error);
    throw error;
  }
};


// VendorLogin

export const vendorLogin = async (vendor) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}vendor/loginVendor`, vendor);
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle error response
    if (error.response) {
      // The request was made and the server responded with a status code
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error(error.message);
    }
  }
};

// Product Detail get by Id
export const getVendorById = async (vendorId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}getVendorById`, {
      params: { vendorId }, // Pass categoryName as a query parameter
    });
    return response; // Return the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};


// Get all Cart items For Admin
export const getCartItems = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}listCartById`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}deleteCart`,{id});
    return response.data;
  } catch (error) {
    console.error('Failed to delete item:', error);
    throw error;
  }
};


// Vendor status update in admin side
export const updateVendorStatus = (vendorId, status) => {
  const vendorStatus = {
    vendorId,
    status,
  };
  const response = axiosInstance.post(`${API_BASE_URL}admin/approveVendor`,vendorStatus);
  return response;
};

export const addCart = async (cartItem) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}createcart`, cartItem); // Change endpoint based on your API
    return response.data; // Return response data
  } catch (error) {
    throw error.response?.data || 'Error adding to cart';
  }
};

// Apply Filters
export const applyFilters = async (filters) => {
  try {
    const response = await axios.post(`${API_BASE_URL}filterProducts`, filters);
    return response.data;
  } catch (error) {
    console.error('Error applying filters:', error);
    throw error;
  }
};
