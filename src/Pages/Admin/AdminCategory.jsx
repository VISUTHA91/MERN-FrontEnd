import React from 'react'
import { useState , useEffect} from 'react';
import { MdDeleteForever } from "react-icons/md";
import { getCategories } from '../../api/apiServices';
import { MdEdit } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import { createCategory } from '../../api/apiServices';
import { deleteCategory } from '../../api/apiServices';
import { editCategory } from '../../api/apiServices';




function AdminCategory() {
  const [categories, setCategories] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false); 
   
  const [editCategoryId, setEditCategoryId] = useState(null); // To track which category is being edited

  const [showEditModal, setShowEditModal] = useState(false); // For modal visibility

  const [categoryName, setCategoryName] = useState('');

  const [currentImage, setCurrentImage] = useState(null); // Store current image for preview

  const [images, setImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
  }, []);


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
    formData.append('images', images);

    try {
      await createCategory(formData); // Call API to create category
      setSuccessMessage('Category created successfully!');
      setCategoryName('');
      setImages(null);
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
      // Refresh categories after deletion
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
  setCurrentImage(category.image); // Set current image for preview
  setShowEditModal(true); // Show the modal
};

// Submit the edited category
const handleEditSubmit = async (event) => {
  event.preventDefault();
  setErrorMessage(''); // Clear previous error messages
  setSuccessMessage(''); // Clear previous success messages

  // Basic validation
  if (!categoryName) {
    setErrorMessage('Please provide the category name.');
    return;
  }

  const formData = new FormData();
  formData.append('name', categoryName);
  if (images) {
    formData.append('images', images); // Append new image only if one is selected
  }

  try {
    // Log formData to see if it contains the right information
    console.log("Form Data Submitted:", formData);
    
    await editCategory(editCategoryId, formData); // Call API to update category
    
    setSuccessMessage('Category updated successfully!'); // Show success message
    setShowEditModal(false); // Close modal on success
    setCategoryName(''); // Reset input field
    setImages(null); // Reset image input
    setCurrentImage(null); // Reset current image reference

    // Re-fetch categories to reflect the update
    const response = await getCategories();
    setCategories(response.data); // Update categories state with new data
  } catch (error) {
    console.error('Error updating category:', error);
    setErrorMessage('Failed to update category.'); // Show error message
  }
};







  return (
    <div className='mt-14'>
      <div className='flex gap-52'>
        <h1 className="text-2xl font-bold ml-10">Category Details</h1>
        <div> 
          <button onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-end text-xl  text-white border-black rounded-lg px-2 py-1 gap-1 bg-green-600">                                
              <FcPlus  size={28}  className=' ' />Create
          </button>
        </div>
      </div>
    <div className=' lg:flex lg:flex-row sm:flex-col w-full gap-2'>
      <div className=' bg-rose'>
       {categories && (
        <table className='bg-white border-gray-600 rounded-lg shadow-lg mt-4 mb-10 '>
          <thead>
            <tr className="">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">CategoryName</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((category,index) => (
            <tr key={category._id} className="hover:bg-gray-100 w-1/4">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">
              <img
                    src={`http://192.168.20.7:4000/${category.image}`}
                    alt={""}
                    height="50"
                    width="50"
                  />
              </td>
              <td className="py-2 px-4 border-b">
                <div className=' flex gap-4'>
              <div className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-700"
                  onClick={() => {
                    handleDelete(category._id);
                  }}
                ><MdDeleteForever size={24} />
               </div>
                <div
                  className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-700"
                  onClick={() => {
                    handleEdit(category);
                  }}
                >
                <MdEdit size={24} />
                    </div>
                </div>
              </td>
              </tr>
          ))}
          </tbody>
        </table>
       )}


       {/* Show Edit From */}

{showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl mb-4">Edit Category</h2>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryname"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentImage">
                    Current Category Image
                  </label>
                  {currentImage && (
                    <img
                      src={`http://192.168.20.7:4000/${currentImage}`} // Display the current image for reference
                      alt="Current"
                      className="mb-4"
                      height="100"
                      width="100"
                    />
                  )}
                </div>





                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                    Category Image (Optional)
                  </label>
                  <input
                    type="file"
                    id="newImage"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    accept="image/*"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Category
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


      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
            Category Name
          </label>
          <input
            type="text"
            id="categoryname"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
            Category Image
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Category
          </button>
        </div>
      </form>
      )}
      </div>
    </div>
    </div>


//     <div className="mt-14">
//   {/* Header Section */}
//   <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-52">
//     <h1 className="text-2xl font-bold ml-10">Category Details</h1>
//     <div className="ml-10 md:ml-0"> 
//       <button 
//         onClick={() => setShowCreateForm(!showCreateForm)} 
//         className="flex items-center text-xl text-white rounded-lg px-4 py-2 gap-2 bg-green-600 hover:bg-green-700 transition duration-200"
//       >
//         <FcPlus size={28} />
//         Create
//       </button>
//     </div>
//   </div>

//   {/* Main Content Section */}
//   <div className="flex flex-col lg:flex-row w-full gap-4">
//     {/* Table Section */}
//     <div className="w-full lg:w-3/4 overflow mb-6 ">
//       {categories && (
//         <table className="min-w-full bg-white border border-gray-600 rounded-lg shadow-lg">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="py-2 px-4 border-b">S.No</th>
//               <th className="py-2 px-4 border-b">Category Name</th>
//               <th className="py-2 px-4 border-b">Image</th>
//               <th className="py-2 px-4 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, index) => (
//               <tr key={category._id} className="hover:bg-gray-100">
//                 <td className="py-2 px-4 border-b">{index + 1}</td>
//                 <td className="py-2 px-4 border-b">{category.name}</td>
//                 <td className="py-2 px-4 border-b">
//                   <img 
//                     src={category.image} 
//                     alt={category.name} 
//                     className="h-12 w-12 object-cover"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <div className="flex gap-4">
//                     <button 
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
//                     >
//                       <MdDeleteForever size={24} />
//                     </button>
//                     <button 
//                       className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-200"
//                     >
//                       <MdEdit size={24} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>

//     {/* Form Section */}
//     <div className="w-full lg:w-1/4 rounded-lg">
//       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//       {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

//       {showCreateForm && (
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label 
//               className="block text-gray-700 text-sm font-bold mb-2" 
//               htmlFor="category-name"
//             >
//               Category Name
//             </label>
//             <input
//               type="text"
//               id="category-name"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label 
//               className="block text-gray-700 text-sm font-bold mb-2" 
//               htmlFor="category-image"
//             >
//               Category Image
//             </label>
//             <input
//               type="file"
//               id="category-image"
//               onChange={handleImageChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               accept="image/*"
//               required
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Create Category
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   </div>
// </div>

   
  )
}

export default AdminCategory