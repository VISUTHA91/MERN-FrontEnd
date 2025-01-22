import React from 'react'
import { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { getCategories } from '../../api/apiServices';
import { MdEdit } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import { createCategory } from '../../api/apiServices';
import { deleteCategory } from '../../api/apiServices';
import { editCategory } from '../../api/apiServices';




function AdminCategory() {
  const [categories, setCategories] = useState([]);
  // const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState(['']); // Array to manage subcategories


  const [newImage, setNewImage] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [editCategoryId, setEditCategoryId] = useState(null); // To track which category is being edited

  const [showEditModal, setShowEditModal] = useState(false); // For modal visibility

  const [categoryName, setCategoryName] = useState('');

  const [currentImage, setCurrentImage] = useState(null); // Store current image for preview

  const [images, setImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reload, setReload] = useState(false); // State to trigger data fetch
  const [storeType, setStoreType] = useState('');



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages(file);
    }
  };

  // Fetch Categories to Display
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
  }, [reload]);


  // Category Creation
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!categoryName || !images) {
      setErrorMessage('Please provide both category name and image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('SubCategories', subCategories);
    formData.append('storeType', storeType);
    formData.append('images', images);


    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await createCategory(formData);
      // Call API to create category
      setSuccessMessage('Category created successfully!');
      setCategoryName('');
      setSubCategories('');
      setStoreType('');
      setImages(null);
      setShowCreateForm(false);
      // fetchCategories();


    } catch (error) {
      console.error('Error creating category:', error);
      setErrorMessage('Failed to create category.');
    }
    // window.location.reload();

  };

  // Delete function
  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setSuccessMessage('Category deleted successfully!');
      setCategories(categories.filter(category => category._id !== categoryId));

    } catch (error) {
      setErrorMessage('Failed to delete category.');
      console.error('Error deleting category:', error);
    }
    // window.location.reload();
  };


  // Handle Edit Fuction
  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setCategoryName(category.name); // Set current name in input field
    setCurrentImage(category.image); // Set current image for ()
    setSubCategories(category.subcategories); // Set current subcategories
    setShowEditModal(true); // Show the modal
  };

  // Submit the edited category
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation for category name
    if (!categoryName) {
      setErrorMessage('Category name is required.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', categoryName);
      formData.append('subCategories', subCategories) // Append image if selected
      formData.append('storeType', storeType) // Append image if selected

      if (images) {
        formData.append('images', images);
      }

      // Call API to update category
      await editCategory(editCategoryId, formData);
      // Success: Display message and reset inputs
      setSuccessMessage('Category updated successfully!');
      setShowEditModal(false);
      // resetForm(); 
      // Refresh categories list
      const { data } = await getCategories();
      setCategories(data.data);
      // setReload((prev) => !prev); 

    } catch (error) {
      console.error('Error updating category:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update category.';
      setErrorMessage(errorMsg);
    }
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };
  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, '']); // Add a new empty input
  };
  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    // Toggle the display of subcategories for the clicked category
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  const handlenewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Store the file in state
    }
  };


  const handleAddSubcategory = (categoryId, subcategoryName) => {
    const updatedCategories = categories.map((category) =>
      category._id === categoryId
        ? {
          ...category,
          subcategories: [
            ...category.subcategories,
            { name: subcategoryName, _id: Date.now() }, // Add the new subcategory
          ],
        }
        : category
    );
    setCategories(updatedCategories); // Update the categories state
  };



  return (
    <div className='mt-14'>
      <div className='flex gap-32'>
        <h1 className="text-2xl font-bold ml-2">Category Details</h1>
        <div>
          <button onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-end text-xl  text-white border-black rounded-lg px-2 py-1 gap-1 bg-green-600">
            <FcPlus size={28} className=' ' />Create
          </button>
        </div>
      </div>
      <div className=' lg:flex lg:flex-row sm:flex-col w-full gap-2'>
        <div className=' bg-rose'>
          {categories && (
            <table
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop: '1rem',
                marginBottom: '2.5rem',
                width: '50%',
                overflow: 'hidden',
                borderCollapse: 'collapse',
                tableLayout: 'fixed', // Add this

              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#4b5563', // Gray 600
                    color: 'white',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    letterSpacing: '0.05em',
                  }}
                >
                  <th style={{
                    padding: '12px 16px', width: '50px',
                  }}>S.No</th>
                  <th
                    style={{
                      padding: '12px 16px',
                      width: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',

                    }}
                  >
                    Category Name
                  </th>
                  <th style={{ padding: '', width: '100px' }}>Image</th>
                  <th style={{ padding: '', width: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <React.Fragment key={category._id}>
                    <tr
                      style={{
                        borderBottom: '1px solid #e5e7eb', // Gray 200
                        backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white', // Alternating row colors
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')} // Gray 100
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9fafb' : 'white')}
                      onClick={() => handleCategoryClick(category._id)} // Toggle subcategories on click
                    >
                      <td style={{ padding: '12px 16px' }}>{index + 1}</td>
                      <td style={{ padding: '12px 16px', width: '50px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {category.name}
                      </td>
                      <td style={{ padding: '' }}>
                        <img
                          src={`http://192.168.20.5:3000/${category.image}`}
                          alt="Category"
                          style={{
                            borderRadius: '6px',
                            height: '50px',
                            width: '50px',
                            objectFit: 'cover',
                            border: '1px solid #e5e7eb',
                          }}
                        />
                      </td>
                      <td style={{ padding: '' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '36px',
                              height: '36px',
                              backgroundColor: '#ef4444', // Red 500
                              color: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease',
                            }}
                            onClick={() => handleDelete(category._id)}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')} // Red 700
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')} // Red 500
                          >
                            <MdDeleteForever size={20} />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '36px',
                              height: '36px',
                              backgroundColor: '#3b82f6', // Blue 500
                              color: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease',
                            }}
                            onClick={() => handleEdit(category)}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e3a8a')} // Blue 800
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')} // Blue 500
                          >
                            <MdEdit size={20} />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Subcategories - Conditionally Rendered */}
                    {expandedCategory === category._id && (
                      <tr style={{ backgroundColor: '#f3f4f6', cursor: 'default' }}>
                        <td colSpan="4" style={{ padding: '12px 16px' }}>
                          <strong>Subcategories:</strong>
                          <ul>
                            {category.subcategories.map((subcategory) => (
                              <li key={subcategory._id} style={{ padding: '4px 0' }}>
                                {subcategory.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {/* Show Edit From */}

          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 mt-28 h-96 overflow-auto">
                <h2 className="text-2xl mb-4">Edit Category</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Current Image</label>
                    {currentImage && (
                      <img
                        src={`http://192.168.20.5:3000/${currentImage}`}
                        alt="Current"
                        className="mb-4"
                        height="100"
                        width="100"
                        style={{ objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Upload New Image</label>
                    <input
                      type="file"
                      onChange={handlenewImageChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      accept="image/*"
                    />
                  </div>
                  {newImage && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">New Image Preview</label>
                      <img
                        src={URL.createObjectURL(newImage)}
                        alt="New Preview"
                        className="mb-4"
                        height="100"
                        width="100"
                        style={{ objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Subcategories</label>
                    <ul className="mb-4">
                      {subCategories.map((sub, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <input
                            type="text"
                            value={sub.name}
                            onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSubCategory(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={handleAddSubCategory}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Subcategory
                    </button>
                  </div>

                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storetype">
                      Store Type
                    </label>

                    <select
                      id="storetype"
                      value={storeType}
                      onChange={(e) => setStoreType(e.target.value)}
                      className="block w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Store Type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>






                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                  </div>


                
                </form>
              </div>
            </div>
          )}
          {/* Close Edit Form */}
        </div>
        <div className=' bg-blue mt-4'>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {showCreateForm && (
            <div
              className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setShowCreateForm(false)} // Close modal when clicking outside
            >
              <div
                className="bg-white shadow-md rounded-lg px-6 pt-4 pb-8 w-full max-w-lg mt-6 h-full overflow-y-auto overflow-hidden "
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
              >
                <h1 className="text-center text-2xl mb-4 border bg-gray-600 text-white rounded-lg p-2">
                  Create Category
                </h1>
                <form onSubmit={handleSubmit}>
                  {/* Category Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryname"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="block w-full p-2 border rounded"
                      required
                    />
                  </div>
                  {/* Subcategories */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Subcategories</label>
                    {subCategories.map((subCategory, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={subCategory}
                          onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                          className="block w-full p-2 border rounded"
                          placeholder={`Subcategory ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSubCategory(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddSubCategory}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Add
                    </button>
                  </div>
                  {/* Store Type */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storetype">
                      Store Type
                    </label>
                    <select
                      id="storetype"
                      value={storeType}
                      onChange={(e) => setStoreType(e.target.value)}
                      className="block w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Store Type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  {/* Category Image */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                      Category Image
                    </label>
                    <input
                      type="file"
                      id="images"
                      onChange={handleImageChange}
                      className="block w-full p-2 border rounded"
                      accept="image/*"
                      required
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Create Category
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default AdminCategory

// {showCreateForm && (
//   <div
//     className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//     onClick={() => setShowCreateForm(false)} // Close modal when clicking outside
//   >
//     <div
//       className="bg-white shadow-md rounded-lg px-6 pt-4 pb-8 w-full max-w-lg mt-6 h-full overflow-y-auto overflow-hidden "
//       onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
//     >
//       <h1 className="text-center text-2xl mb-4 border bg-gray-600 text-white rounded-lg p-2">
//         Create Category
//       </h1>
//       <form onSubmit={handleSubmit}>
//         {/* Category Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
//             Category Name
//           </label>
//           <input
//             type="text"
//             id="categoryname"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             className="block w-full p-2 border rounded"
//             required
//           />
//         </div>
//         {/* Subcategories */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Subcategories</label>
//           {subCategories.map((subCategory, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <input
//                 type="text"
//                 value={subCategory}
//                 onChange={(e) => handleSubCategoryChange(index, e.target.value)}
//                 className="block w-full p-2 border rounded"
//                 placeholder={`Subcategory ${index + 1}`}
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveSubCategory(index)}
//                 className="ml-2 text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddSubCategory}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
//           >
//             Add
//           </button>
//         </div>
//         {/* Store Type */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storetype">
//             Store Type
//           </label>
//           <select
//             id="storetype"
//             value={storeType}
//             onChange={(e) => setStoreType(e.target.value)}
//             className="block w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select Store Type</option>
//             <option value="online">Online</option>
//             <option value="offline">Offline</option>
//           </select>
//         </div>
//         {/* Category Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
//             Category Image
//           </label>
//           <input
//             type="file"
//             id="images"
//             onChange={handleImageChange}
//             className="block w-full p-2 border rounded"
//             accept="image/*"
//             required
//           />
//         </div>
//         {/* Submit Button */}
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Create Category
//           </button>
//           <button
//             type="button"
//             className="text-gray-500 hover:text-gray-700"
//             onClick={() => setShowCreateForm(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}