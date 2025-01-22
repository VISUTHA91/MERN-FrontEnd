import React, { useState } from 'react';
import { createProduct } from '../../api/apiServices';
import { getCategories } from '../../api/apiServices';
import { useEffect } from 'react';

const Createproduct = () => {
  // const [formData, setFormData] = useState({
    const [product, setProduct] = useState({

    name: '',
    color:'',
    size:'',
    gender:'',
    category:'',
    price:'',
    description: '',
    stock_quantity:'',
    images: [],
  });

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Fetch categories from backend
        // console.log("Fetched Data",response)
        setCategories(response.data); // Store fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value,files } = e.target;
    // console.log(`Changing ${name} to ${value}`);  // Log for debugging

    if (name === 'images') {
        setProduct((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...Array.from(files)]  // Append new images
        }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with product data:", product); // Debugging line
    try {
         const response = await createProduct(product);
      console.log("Product created successfully:", response);
    } catch (error){
      console.error("Error creating product:", error); // Log the whole error object
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };


  return (

    <div className="  p-10 bg-white border border-2 border-gray-300 rounded-lg shadow-md  mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className=''>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
             <option value="" disabled>Select a category</option>
             {categories.length > 0 ? 
             (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))):
            (
            <option disabled>Loading categories...</option>
            )}
          
          </select>
        </div>        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
            Color
          </label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="originalprice">
            MRP.Price
          </label>
          <input
            type="number"
            name="originalprice"
            value={formData.originalprice}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            SalePrice
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
    
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
            Size
          </label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_quantity">
          Stock Quantity
          </label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
    

        

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
            Image
          </label>
          <input
            type="file"
            name="images"
            accept="images/*"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

{/* Preview Images */}



        {product.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Image Preview</h3>
          <div className="flex  space-x-4 overflow-auto">

            {product.images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Product
        </button>
      </form>




    </div>
  );
};

export default Createproduct;
