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

// Product Creation
// export const createProduct = async (productData) => {
//   try {
//     const formData = new FormData();

//     formData.append("name", productData.name);
//     formData.append("description", productData.description);
//     formData.append("price", productData.price);
//     formData.append("gender", productData.gender);
//     formData.append("size", productData.size);
//     formData.append("color", productData.color);
//     formData.append("category_id", productData.category_id);
//     formData.append("stock_quantity", productData.stock_quantity);


//     if (productData.images && productData.images.length > 0) {
//       productData.images.forEach((image) => {
//         formData.append("images", image); // Append each image
//       });
//     }

//     const response = await axiosInstance.post(`${API_BASE_URL}vendor/productCreate`, formData);
//     return response.data; // Return response data (e.g., product details)
//   } catch (error) {
//     //   console.error("Error during product creation:", error);
//     //   throw error.response ? error.response.data.message : new Error("Product creation failed");
//     // }
//     console.error("API error:", error); // Log the error here
//     throw error;
//   }
// };


// export const createProduct = async (productData) => {
//   try {
//     const formData = new FormData();
//     // Append basic fields
    
    // formData.append("name", productData.name);
    // formData.append("color", productData.color);
    // formData.append("gender", productData.gender);
    // formData.append("category", productData.category);
    // formData.append("MRP", productData.MRP);
    // formData.append("offer_percentage", productData.offer_percentage);
    
//     // Append product_details fields
//     if (productData.product_details && productData.product_details.length > 0) {
//       const details = productData.product_details[0]; // Assuming you're always using the first object
//       formData.append("sleeve_details", details.sleeve_details);
//       formData.append("pattern_type", details.pattern_type);
//       formData.append("material_type", details.material_type);
//       formData.append("fit_type", details.fit_type);
//     }
//     formData.append("description", productData.description);
//     // formData.append("stock_quantity", productData.stock_quantity);
    
//     // Handle sizes array (size and stock pair)
    // if (productData.variants && productData.variants.length > 0) {
    //   productData.variants.forEach((sizeData, index) => {
    //     formData.append(`variants[${index}][size]`, sizeData.size);
    //     formData.append(`variants[${index}][stock]`, sizeData.stock);
    //   });
    // }
    
//     // Handle images array
//     if (productData.images && productData.images.length > 0) {
//       productData.images.forEach((image) => {
//         formData.append("images", image);
//       });
//     }
    
//     // Debugging: Log FormData entries
//     // for (let [key, value] of formData.entries()) {
//     //     console.log(`${key}: ${value}`);
//     //   }
//     console.log("............................",formData)

//     // Send the POST request with the formData
//     const response = await axiosInstance.post(`${API_BASE_URL}vendor/productCreate`,formData,
//       // {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data', // This is important for FormData
//       // },
//       // }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("API error:", error);
//     throw error;
//   }
// };

// export const createProduct = async (productData) => {
//   try {
//     const formData = new FormData();

//     // Automatically append all basic fields except for arrays and nested objects
//     const basicFields = ['name', 'color', 'gender', 'category', 'MRP', 'offer_percentage', 'description'];
//     basicFields.forEach(field => {
//       if (productData[field] !== undefined && productData[field] !== null) {
//         formData.append(field, String(productData[field]));
//       }
//     });
    

//     console.log("basifield", formData);
    
    // Handle product_details (assuming it's an array of objects)
    // if (productData.product_details && productData.product_details.length > 0) {
    //   productData.product_details.forEach((details, index) => {
    //     Object.keys(details).forEach((key) => {
    //       if (details[key]) {
    //         formData.append(`product_details[${index}][${key}]`, details[key]);
    //       }
    //     });
    //   });
    // }

//     // Handle variants array (size and stock pair)
//     if (productData.variants && productData.variants.length > 0) {
//       productData.variants.forEach((variant, index) => {
//         Object.keys(variant).forEach((key) => {
//           if (variant[key]) {
//             formData.append(`variants[${index}][${key}]`, variant[key]);
//           }
//         });
//       });
//     }

//     // Handle images array
//     // if (productData.images && productData.images.length > 0) {
//     //   productData.images.forEach((image, index) => {
//     //     formData.append(`images[${index}]`, image);
//     //   });
//     // }

//     // Debugging: Log FormData entries
//     // for (let [key, value] of formData.entries()) {
//     //     console.log(`${key}: ${value}`);
//     // }

//     console.log("sss",formData);
    
//     // Send the POST request with the formData
//     const response = await axiosInstance.post(`${API_BASE_URL}vendor/productCreate`, formData, {
//       // headers: {
//       //   'Content-Type': 'multipart/form-data', // For FormData
//       // },
//     });
    

//     return response.data;
//   } catch (error) {
//     console.error("API error:", error);
//     throw error;
//   }
// };



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
    const response = await axiosInstance.get(`${API_BASE_URL}getCart`); // Fetches categories from the backend
    return response.data; // Assuming the categories are in response.data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};