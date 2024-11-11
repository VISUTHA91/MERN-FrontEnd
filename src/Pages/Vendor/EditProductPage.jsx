import React from 'react'
import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { EditProduct, getCategories } from '../../api/apiServices';
import { MdDeleteForever } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { getProductsById } from '../../api/apiServices';
import { useNavigate } from 'react-router-dom';


function EditProductPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [existingImages, setExistingImages] = useState([]); // To store previously uploaded images
  const [newImages, setNewImages] = useState([]);


  const [editedProduct, setEditedProduct] = useState({ variants: [] });
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    variants: [{ size: "", stock: "" }],
    gender: '',
    category: '',
    MRP: '',
    offer_percentage: '',
    gst_percentage: '',
    product_details: [{ sleeve_details: '', pattern_type: '', material_type: '', fit_type: '' }],
    seller_details: { name: '', location: '' }, // Ensure it's initialized as an array with an object
    description: '',
    country_of_origin: '',
    images: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductsById(id); // Fetch product data
        setProduct(response.data.product); // Set the product data
        console.log(response)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);






  useEffect(() => {
    if (product) {
      console.log('Fetched Product:', product); // Debugging log
      setFormData({
        name: product.name,
        category: product.category,
        MRP: product.MRP,
        color: product.color,
        description: product.description,
        country_of_origin: product.country_of_origin,
        seller_details: {
          seller_name: product.seller_details.name,
          seller_location: product.seller_details.location,
        },
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
        variants: product.variants || [{ size: "", stock: "" }],
      });
      setExistingImages(product.images || []);
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



  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name in formData.product_details[0]) {
  //       // Update product_details
  //       setFormData((prevData) => ({
  //           ...prevData,
  //           product_details: [{ ...prevData.product_details[0], [name]: value }]
  //       }));
  //   } else if (name in formData.seller_details) {
  //       setFormData({
  //         ...prevData,
  //         seller_details: product.seller_details
  //             ? [product.seller_details] // Wrap it in an array if it's a single object
  //             : [{ seller_name: '', seller_location: '' }],
  //         // other fields
  //     });
  //   } else {
  //       setFormData((prevData) => ({
  //           ...prevData,
  //           [name]: value,
  //       }));
  //   }
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.product_details[0]) {
      // Update product_details
      setFormData((prevData) => ({
        ...prevData,
        product_details: [{ ...prevData.product_details[0], [name]: value }]
      }));
    } else if (name in formData.seller_details) {
      // Ensure seller_details is defined and has at least one object
      setFormData((prevData) => ({
        ...prevData,
        seller_details:
        {
          ...prevData.seller_details, // Spread the existing seller_details
          [name]: value // Update the specific field
        }
        ,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  // const handleSizeChange = (index, e) => {
  //     const { name, value } = e.target;
  //     const updatedSizes = [...editedProduct.variants];
  //     updatedSizes[index] = { ...updatedSizes[index], [name]: value };
  //     setEditedProduct({ ...editedProduct, variants: updatedSizes });
  //   };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...editedProduct.variants];
    updatedSizes[index] = { ...updatedSizes[index], [name]: value };

    // Update both editedProduct and formData
    setEditedProduct({ ...editedProduct, variants: updatedSizes });
    setFormData((prev) => ({ ...prev, variants: updatedSizes }));
  };




  // const addSizeField = () => {
  //   setEditedProduct({
  //     ...editedProduct,
  //     variants: [...editedProduct.variants, { size: "", stock: "" }],
  //   });
  // };

  // const removeSizeField = (index) => {
  //   const updatedSizes = editedProduct.variants.filter((_, i) => i !== index);
  //   setEditedProduct({ ...editedProduct, variants: updatedSizes });
  // };

  const addSizeField = () => {
    const newVariant = { size: "", stock: "" };
    setEditedProduct({
      ...editedProduct,
      variants: [...editedProduct.variants, newVariant],
    });
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant],
    });
  };

  const removeSizeField = (index) => {
    const updatedSizes = editedProduct.variants.filter((_, i) => i !== index);
    setEditedProduct({ ...editedProduct, variants: updatedSizes });
    setFormData({ ...formData, variants: updatedSizes });
  };




  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files, // Store images as array
    }));
  };

  const removeExistingImage = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages); // Update the state to reflect removed image
  };

  // const handleNewImagesChange = (e) => {
  //   const files = Array.from(e.target.files); // Get files from the input
  //   setNewImages([...newImages, ...files]); // Add new images to the state
  // };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setFormData((prev) => ({ ...prev, images: files }));
    setNewImages(files); // Update newImages as well for preview
  };


  // const handleRemoveNewImage = (index) => {
  //   const updatedImages = newImages.filter((_, i) => i !== index);
  //   setNewImages(updatedImages); // Update the state to reflect removed new image
  // };

  const handleRemoveNewImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };



  const onClose = () => {

    navigate('/Vendor/VendorProductList');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      // Append all product fields except images
      for (const key in formData) {
        if (!['images', 'variants', 'product_details', 'seller_details'].includes(key)) {
          productData.append(key, formData[key]);
        }
      }

      // Handle images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          productData.append(`images[${index}]`, image); // Append each image
        });
      }

      // Handle variants (size and stock)
      if (formData.variants) {
        formData.variants.forEach((variant, index) => {
          productData.append(`variants[${index}][size]`, variant.size);
          productData.append(`variants[${index}][stock]`, variant.stock);
        });
      }

      // Handle product details
      if (formData.product_details) {
        formData.product_details.forEach((detail, index) => {
          productData.append(`product_details[${index}][sleeve_details]`, detail.sleeve_details);
          productData.append(`product_details[${index}][pattern_type]`, detail.pattern_type);
          productData.append(`product_details[${index}][material_type]`, detail.material_type);
          productData.append(`product_details[${index}][fit_type]`, detail.fit_type);
        });
      }

      // Handle seller details
      if (formData.seller_details) {
        productData.append('seller_details[0][seller_name]', formData.seller_details.seller_name);
        productData.append('seller_details[0][seller_location]', formData.seller_details.seller_location);
      }

      for (let [key, value] of productData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Call the API to update the product
      await EditProduct(product.product_id, productData);
      navigate('/Vendor/VendorProductList'); // Redirect after successful update

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //       const productData = new FormData();

  //       // Append other fields except images and variants
  //       for (const key in formData) {
  //           if (!['images', 'variants', 'product_details', 'seller_details'].includes(key)) {
  //               productData.append(key, formData[key]);
  //           }
  //       }

  //       // Handle images
  //       if (formData.images && formData.images.length > 0) {
  //           formData.images.forEach((image, index) => {
  //               productData.append(`images[${index}]`, image);
  //           });
  //       }

  //       // Handle variants
  //       if (formData.variants && formData.variants.length > 0) {
  //           formData.variants.forEach((variant, index) => {
  //               productData.append(`variants[${index}][size]`, variant.size);
  //               productData.append(`variants[${index}][stock]`, variant.stock);
  //           });
  //       }

  //       console.log('Final FormData for submission:', [...productData.entries()]);

  //       // Call the API to update the product
  //       await EditProduct(product.product_id, productData);
  //       navigate('/Vendor/VendorProductList');

  //   } catch (error) {
  //       console.error('Error updating product:', error);
  //   }
  // };





  if (!product) return <div className='mt-10'>Loading.....</div>;

  return (
    <div className="flex w-full items-center justify-center flex-col">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-lg font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Category:</label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="MRP" className="block mb-1 text-sm font-medium text-gray-700">MRP:</label>
              <input
                type="number"
                name="MRP"
                value={formData.MRP || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label htmlFor="color" className="block mb-1 text-sm font-medium text-gray-700">Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>


            <div>
              <label htmlFor="MRP" className="block mb-1 text-sm font-medium text-gray-700">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>


            <div>
              <label htmlFor="MRP" className="block mb-1 text-sm font-medium text-gray-700">Country Of Orgin:</label>
              <input
                type="text"
                name="country_of_origin"
                value={formData.country_of_origin || ''}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>




            {/* Size and Quantity Section */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Sizes & Quantities:</label>
              {editedProduct.variants.map((sizeField, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor={`size-${index}`}>
                      Size
                    </label>
                    <select
                      name="size"
                      id={`size-${index}`}
                      value={sizeField.size || ""}
                      onChange={(e) => handleSizeChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor={`stock-${index}`}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id={`stock-${index}`}
                      placeholder="Enter Quantity"
                      value={sizeField.stock || ''}
                      onChange={(e) => handleSizeChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  {editedProduct.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSizeField(index)}
                      className="bg-red-500 text-white h-8 w-8 mt-7 rounded hover:bg-red-700 flex items-center justify-center">
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


            {/* Seller Details Section */}
            {/* <div className="mb-4">
    <div className="mb-2">
        <label htmlFor="seller_name" className="block mb-1 text-sm font-medium text-gray-700">Seller Name:</label>
        <input
            type="text"
            name="seller_name"
            id="seller_name"
            value={formData.seller_details.seller_name || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
    </div>
    <div className="mb-2">
        <label htmlFor="seller_location" className="block mb-1 text-sm font-medium text-gray-700">Seller Location:</label>
        <input
            type="text"
            name="seller_location"
            id="seller_location"
            value={formData.seller_details.seller_location || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
    </div>
</div> */}
            <div className="mb-4">
              <div className="mb-2">
                <label htmlFor="seller_name" className="block mb-1 text-sm font-medium text-gray-700">Seller Name:</label>
                <input
                  type="text"
                  name="seller_name"
                  id="seller_name"
                  value={formData.seller_details.seller_name || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="seller_location" className="block mb-1 text-sm font-medium text-gray-700">Seller Location:</label>
                <input
                  type="text"
                  name="seller_location"
                  id="seller_location"
                  value={formData.seller_details.seller_location || ""} // Use optional chaining
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>






          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">

            {/* Product Details */}
            <div className="mb-4">
              {/* Material Type */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="material_type">Material Type</label>
                <input
                  type="text"
                  name="material_type"
                  id="material_type"
                  value={formData.product_details && formData.product_details[0]?.material_type || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Fit Type */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="fit_type">Fit Type</label>
                <input
                  type="text"
                  name="fit_type"
                  id="fit_type"
                  value={formData.product_details && formData.product_details[0]?.fit_type || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Sleeve Type */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="sleeve_details">Sleeve Type</label>
                <input
                  type="text"
                  name="sleeve_details"
                  id="sleeve_details"
                  value={formData.product_details && formData.product_details[0]?.sleeve_details || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Pattern Type */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="pattern_type">Pattern Type</label>
                <input
                  type="text"
                  name="pattern_type"
                  id="pattern_type"
                  value={formData.product_details && formData.product_details[0]?.pattern_type || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Add New Images:</label>
                <input
                  type="file"
                  name="newImages"
                  accept="image/*"
                  multiple
                  onChange={handleNewImagesChange}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {/* Preview of newly added images */}
                {/* <div className="flex flex-wrap gap-4 mt-2">
    {newImages.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(image)} // Display a preview of the new image
          alt="New Product"
          className="w-24 h-24 object-cover"
        />
        <button
          type="button"
          onClick={() => handleRemoveNewImage(index)} // Function to remove new image
          className="absolute top-0 right-0 bg-red-500 text-black p-1 rounded-full"
        >
                      <MdDeleteForever size={26} />
                      </button>
      </div>
    ))}
  </div> */}
                {/* <div className="flex flex-wrap gap-4 mt-2">
    {formData.images?.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(image)} // Display a preview of the new image
          alt="New Product"
          className="w-24 h-24 object-cover"
        />
      
        <button
          type="button"
          onClick={() => handleRemoveNewImage(index)} // Function to remove new image
          className="absolute top-0 right-0 bg-red-500 text-black p-1 rounded-full"
        >
          <MdDeleteForever size={26} />
        </button>
      </div>
    ))}
</div> */}
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold mb-1"> New Image Preview</h3>
                    <div className="flex flex-wrap  space-x-4 overflow-auto">
                      {formData.images?.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)} // Function to remove new image
                            className="absolute top-0 right-0 bg-red-500 text-black p-1 rounded-full">
                            <MdDeleteForever size={26} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Existing Product Images:</label>
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={`http://192.168.20.5:3000/${image}`}
                        alt="Product" className="w-24 h-24 object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)} // Function to remove existing images
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <MdDeleteForever size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons (Full Width) */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default EditProductPage;

// import React, { useState, useEffect } from 'react';
// import { MdEdit, MdDeleteForever } from "react-icons/md";
// import { useParams, useNavigate } from 'react-router-dom';
// import { EditProduct, getCategories, getProductsById } from '../../api/apiServices';

// function EditProductPage() {
//     const { id } = useParams(); // Get the product ID from the URL
//     const navigate = useNavigate();
//     const [product, setProduct] = useState({
//         name: '',
//         color: '',
//         variants: [{ size: "", stock: "" }],
//         gender: '',
//         category: '',
//         MRP: '',
//         offer_percentage: '',
//         gst_percentage: '',
//         product_details: [{ sleeve_details: '', pattern_type: '', material_type: '', fit_type: '' }],
//         seller_details: [{ seller_name: '', seller_location: '' }],
//         description: '',
//         country_of_origin: '',
//         images: [],
//     });
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true); // Track loading state
//     const [imagePreviews, setImagePreviews] = useState([]); // State for image previews


//     // Fetch categories
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await getCategories();
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     // Fetch product data when component mounts
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await getProductsById(id);
//                 setProduct(response.data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;

//         if (name === 'images') {
//           setProduct((prevData) => ({
//             ...prevData,
//             images: [...prevData.images, ...Array.from(files)], // Append new images
//         }));
//         generateImagePreviews(files);
//         } else if (name in product.product_details[0]) {
//             setProduct((prevData) => ({
//                 ...prevData,
//                 product_details: [{ ...prevData.product_details[0], [name]: value }],
//             }));
//         } else if (name in product.seller_details[0]) {
//             setProduct((prevData) => ({
//                 ...prevData,
//                 seller_details: [{ ...prevData.seller_details[0], [name]: value }],
//             }));
//         } else {
//             setProduct({ ...product, [name]: value });
//         }
//     };

//     // Handle size and quantity changes
//     const handleSizeChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedSizes = [...product.variants];
//         updatedSizes[index] = { ...updatedSizes[index], [name]: value };
//         setProduct({ ...product, variants: updatedSizes });
//     };

//     // Add new size field
//     const addSizeField = () => {
//         setProduct({
//             ...product,
//             variants: [...product.variants, { size: "", stock: "" }],
//         });
//     };

//     // Remove size field
//     const removeSizeField = (index) => {
//         const updatedSizes = product.variants.filter((_, i) => i !== index);
//         setProduct({ ...product, variants: updatedSizes });
//     };

//     const generateImagePreviews = (files) => {
//       const previews = Array.from(files).map((file) => URL.createObjectURL(file));
//       setImagePreviews(previews);
//   };

//   // Cleanup URL.createObjectURL to avoid memory leaks
//   useEffect(() => {
//       return () => {
//           imagePreviews.forEach((img) => URL.revokeObjectURL(img));
//       };
//   }, [imagePreviews]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         // Append product data to FormData
//         formData.append('name', product.name);
//         formData.append('color', product.color);
//         formData.append('gender', product.gender);
//         formData.append('category', product.category);
//         formData.append('MRP', product.MRP);
//         formData.append('offer_percentage', product.offer_percentage);
//         formData.append('gst_percentage', product.gst_percentage);
//         formData.append('description', product.description);
//         formData.append('country_of_origin', product.country_of_origin);

//         // Append new images
//         product.images.forEach((image) => {
//             formData.append('images', image);
//         });

//         // Append variants
//         product.variants.forEach((sizeData, index) => {
//             formData.append(`variants[${index}][size]`, sizeData.size);
//             formData.append(`variants[${index}][stock]`, sizeData.stock);
//         });

//         // Append product details
//         product.product_details.forEach((details, index) => {
//             Object.keys(details).forEach((key) => {
//                 if (details[key]) {
//                     formData.append(`product_details[${index}][${key}]`, details[key]);
//                 }
//             });
//         });

//         // Append seller details
//         product.seller_details.forEach((details, index) => {
//             Object.keys(details).forEach((key) => {
//                 if (details[key]) {
//                     formData.append(`seller_details[${index}][${key}]`, details[key]);
//                 }
//             });
//         });

//         try {
//             await EditProduct(id, formData); // Use EditProduct for updating
//             navigate('/products'); // Redirect after successful update
//         } catch (error) {
//             console.error("Error updating product:", error);
//             // Handle error appropriately
//         }
//     };

//     if (loading) return <div>Loading...</div>;
// return (
//   <div className="w-full p-12 bg-white border border-2 border-gray-300 rounded-lg shadow-md mb-8 ml">
//       <h2 className="w-full text-2xl font-bold mb-4">Edit Product</h2>
//       <form onSubmit={handleSubmit} className='w-full'>
//           <div className='lg:flex flex gap-2'>
//               {/* Left Side Content */}
//               <div className='bg-gray-00 w-full'>
//                   {/* Category */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="category">
//                           Category
//                       </label>
//                       <select
//                           type="text"
//                           name="category"
//                           value={product.category}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           required>
//                           <option value="" disabled>Select a category</option>
//                           {categories.length > 0 ? (
//                               categories.map((category) => (
//                                   <option key={category._id} value={category._id}>
//                                       {category.name}
//                                   </option>
//                               ))
//                           ) : (
//                               <option disabled>Loading categories...</option>
//                           )}
//                       </select>
//                   </div>

//                   {/* Product Name */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
//                           Product Name
//                       </label>
//                       <input
//                           type="text"
//                           name="name"
//                           id='name'
//                           value={product.name}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           required
//                       />
//                   </div>

//                   {/* Gender */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gender">
//                           Gender
//                       </label>
//                       <select
//                           name="gender"
//                           id="gender"
//                           value={product.gender}
//                           onChange={handleChange}
//                           className="shadow appearance-none border w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           required
//                       >
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                       </select>
//                   </div>

//                   {/* Color */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1">
//                           Color
//                       </label>
//                       <input
//                           type="text"
//                           name="color"
//                           placeholder="Enter Color"
//                           value={product.color}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           required
//                       />
//                   </div>

//                   {/* Sizes and Quantities */}
//                   <div className="mb-4">
//                       { product.variants && product.variants.map((sizeField, index) => (
//                           <div key={index} className="mb-1 flex gap-2">
//                               <div className="mb-1">
//                                   <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`size-${index}`}>
//                                       Size
//                                   </label>
//                                   <select
//                                       name="size"
//                                       id={`size-${index}`}
//                                       value={sizeField.size || ""}
//                                       onChange={(e) => handleSizeChange(index, e)}
//                                       className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                                       <option value="">Size</option>
//                                       <option value="XS">XS</option>
//                                       <option value="S">S</option>
//                                       <option value="M">M</option>
//                                       <option value="L">L</option>
//                                       <option value="XL">XL</option>
//                                       <option value="XXL">XXL</option>
//                                   </select>
//                               </div>

//                               <div className="mb-4">
//                                   <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`stock-${index}`}>
//                                       Quantity
//                                   </label>
//                                   <input
//                                       type="number"
//                                       name="stock"
//                                       id={`stock-${index}`}
//                                       placeholder="Enter Quantity"
//                                       value={sizeField.stock}
//                                       onChange={(e) => handleSizeChange(index, e)}
//                                       className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
//                               </div>

//                               {product.variants.length > 1 && (
//                                   <button
//                                       type="button"
//                                       onClick={() => removeSizeField(index)}
//                                       className="bg-red-500 text-white h-7 mt-7 px-1 rounded hover:bg-red-700"
//                                   >
//                                       <MdDeleteForever size={22} />
//                                   </button>
//                               )}
//                           </div>
//                       ))}

//                       <button
//                           type="button"
//                           onClick={addSizeField}
//                           className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700">
//                           Add Size
//                       </button>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">
//                           Description
//                       </label>
//                       <textarea
//                           name="description"
//                           value={product.description}
//                           id='description'
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           rows="4"
//                       />
//                   </div>
//               </div>
//               {/* Right Side Content */}
//               <div className='bg-gray-00 w-full'>
//                   {/* Material Type */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="material_type">
//                           Material Type
//                       </label>
//                       <input
//                           type="text"
//                           name="material_type"
//                           id='material_type'
//               value={product.product_details && product.product_details[0]?.material_type || ''}
// onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>
//                   {/* Fit Type */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="fit_type">
//                           Fit Type
//                       </label>
//                       <input
//                           type="text"
//                           name="fit_type"
//                           id='fit_type'
//                          value={product.product_details && product.product_details[0]?.fit_type || ''}

//                           // value={product.product_details[0].fit_type}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* Sleeve Type */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="sleeve_details">
//                           Sleeve Type
//                       </label>
//                       <input
//                           type="text"
//                           name="sleeve_details"
//                           id='sleeve_details'
//                           value={product.product_details && product.product_details[0]?.sleeve_details || ''}

//                           // value={product.product_details[0].sleeve_details}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* Pattern Type */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="pattern_type">
//                           Pattern Type
//                       </label>
//                       <input
//                           type="text"
//                           name="pattern_type"
//                           id='pattern_type'
//                           value={product.product_details && product.product_details[0]?.pattern_type || ''}

//                           // value={product.product_details[0].pattern_type}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* Original Price */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="MRP">
//                           MRP Price
//                       </label>
//                       <input
//                           type="number"
//                           name="MRP"
//                           id='MRP'
//                           value={product.MRP}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* Offer Percentage */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="offer_percentage">
//                           Offer Percentage
//                       </label>
//                       <input
//                           type="number"
//                           name="offer_percentage"
//                           id='offer_percentage'
//                           value={product.offer_percentage}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* GST Percentage */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gst_percentage">
//                           GST Percentage
//                       </label>
//                       <input
//                           type="number"
//                           name="gst_percentage"
//                           id='gst_percentage'
//                           value={product.gst_percentage}
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                   </div>

//                   {/* Product Images */}
//                   <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="images">
//                           Product Images
//                       </label>
//                       <input
//                           type="file"
//                           name="images"
//                           onChange={handleChange}
//                           className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           multiple
//                       />
//                       <div className="mt-2">
//                           {imagePreviews.map((img, index) => (
//                               <img key={index} src={img} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded" />
//                           ))}
//                       </div>
//                   </div>
//               </div>
//           </div>
//           {/* Submit Button */}
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
//               Update Product
//           </button>
//       </form>
//   </div>
// );
// }
// export default EditProductPage;
