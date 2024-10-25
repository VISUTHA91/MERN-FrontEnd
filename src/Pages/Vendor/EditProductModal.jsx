import React from 'react'
import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { editProduct, getCategories } from '../../api/apiServices';
import { MdDeleteForever } from "react-icons/md";


function EditProductModal({ isOpen, onClose, product }) {

  const [formData, setFormData] = useState({});
  const [editedProduct, setEditedProduct] = useState({ variants: [] });


  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        MRP: product.MRP,
        color: product.color,
        product_details: product.product_details && product.product_details.length > 0 ? [
          {
            sleeve_details: product.product_details[0]?.sleeve_details || "",
            pattern_type: product.product_details[0]?.pattern_type || "",
            material_type: product.product_details[0]?.material_type || "",
            fit_type: product.product_details[0]?.fit_type || "",
          }
        ] : [{ sleeve_details: "", pattern_type: "", material_type: "", fit_type: "" }],


      });
      setEditedProduct({
        ...product,
        variants: product.variants || [{ size: "", stock: "" }], // Handle variants initialization
        product_details: [{ sleeve_details: "", pattern_type: "", material_type: "", fit_type: "" }]

      });
    }
  }, [product]);


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
    const { name, value } = e.target;
    if (name in formData.product_details[0]) {
      // Update product_details
      setFormData((prevData) => ({
        ...prevData,
        product_details: [{ ...prevData.product_details[0], [name]: value }]
      }));
    } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
}

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...editedProduct.variants];
    updatedSizes[index] = { ...updatedSizes[index], [name]: value };
    setEditedProduct({ ...editedProduct, variants: updatedSizes });
  };

  const addSizeField = () => {
    setEditedProduct({
      ...editedProduct,
      variants: [...editedProduct.variants, { size: "", stock: "" }],
    });
  };

  const removeSizeField = (index) => {
    const updatedSizes = editedProduct.variants.filter((_, i) => i !== index);
    setEditedProduct({ ...editedProduct, variants: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProduct(product._id, formData); // Call the update function passed from the parent
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!isOpen) return null; // If modal is not open, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>


          {/* Mrp */}
          <div>
            <label htmlFor="MRP">MRP:</label>
            <input
              type="number"
              name="MRP"
              value={formData.MRP || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          {/* Color */}
          <div>
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>



          {/* Edit Size and quantitt */}
          <div className="mb-4">
            {editedProduct.variants.map((sizeField, index) => (
              <div key={index} className="mb-1 flex gap-2">
                <div className="mb-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`size-${index}`}>
                    Size
                  </label>
                  <select
                    name="size"
                    id={`size-${index}`}
                    value={sizeField.size || ""}
                    onChange={(e) => handleSizeChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`stock-${index}`}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id={`stock-${index}`}
                    placeholder="Enter Quantity"
                    value={sizeField.stock}
                    onChange={(e) => handleSizeChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {editedProduct.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeField(index)}
                    className="bg-red-500 text-white h-7 mt-7 px-1 rounded hover:bg-red-700">
                    <MdDeleteForever size={22} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSizeField}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700">
              Add Size
            </button>
          </div>


          {/* Product Details */}

          {/* Material Type */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="material_type">
    Material Type
  </label>
  <input
    type="text"
    name="material_type"
    id="material_type"
    // value={formData.product_details[0].material_type || ''}
    value={formData.product_details && formData.product_details[0]?.material_type || ''}

    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

{/* Fit Type */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="fit_type">
    Fit Type
  </label>
  <input
    type="text"
    name="fit_type"
    id="fit_type"
    // value={formData.product_details[0].fit_type || ''}
    value={formData.product_details && formData.product_details[0]?.fit_type || ''}

    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

{/* Sleeve Type */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="sleeve_details">
    Sleeve Type
  </label>
  <input
    type="text"
    name="sleeve_details"
    id="sleeve_details"
    // value={formData.product_details[0].sleeve_details || ''}
    value={formData.product_details && formData.product_details[0]?.sleeve_details || ''}

    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

{/* Pattern Type */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="pattern_type">
    Pattern Type
  </label>
  <input
    type="text"
    name="pattern_type"
    id="pattern_type"
    // value={formData.product_details[0].pattern_type || ''}
    value={formData.product_details && formData.product_details[0]?.pattern_type || ''}

    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>



          {/* Add more fields as needed */}
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal