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
  const [reload, setReload] = useState(false); // State to trigger data fetch


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
    formData.append('images', images);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }

    try {
      await createCategory(formData); 
      // Call API to create category
      setSuccessMessage('Category created successfully!');
      setCategoryName('');
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
  // Clear previous messages
  setErrorMessage('');
  setSuccessMessage('');

  // Basic validation for category name
  if (!categoryName) {
    setErrorMessage('Category name is required.');
    return;
  }

  try {
    // Prepare form data
    const formData = new FormData();
    formData.append('name', categoryName);
    if (images) {
      formData.append('images', images); // Append image if selected
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


  return (
    <div className='mt-14'>
      <div className='flex gap-32'>
        <h1 className="text-2xl font-bold ml-2">Category Details</h1>
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
        // <table className='bg-white   rounded-xl  shadow-lg mt-4 mb-10 '>
        //   <thead className='rounded-lg'>
        //     <tr className="  rounded-lg">
        //       <th className="py-2 px-4 border-b">S.No</th>
        //       <th className="py-2 px-4 border-b">CategoryName</th>
        //       <th className="py-2 px-4 border-b ">Image</th>
        //       <th className="py-2 px-4 border-b">Action</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //   {categories.map((category,index) => (
        //     <tr key={category._id} className="hover:bg-gray-100 w-1/4">
        //       <td className="py-2 px-4 border-b">{index + 1}</td>
        //       <td className="py-2 px-4 border-b">{category.name}</td>
        //       <td className="py-2 px-4 border-b">
        //       <img
        //             src={`http://192.168.20.5:3000/${category.image}`}
        //             alt={""}
        //             height="50"
        //             width="50"
        //           />
        //       </td>
        //       <td className="py-2 px-4 border-b">
        //         <div className=' flex gap-4'>
        //       <div className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-700"
        //           onClick={() => {
        //             handleDelete(category._id);
        //           }}
        //         ><MdDeleteForever size={24} />
        //        </div>
        //         <div
        //           className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-700"
        //           onClick={() => {
        //             handleEdit(category);
        //           }}
        //         >
        //         <MdEdit size={24} />
        //             </div>
        //         </div>
        //       </td>
        //       </tr>
        //   ))}
        //   </tbody>
        // </table>

        <table
  style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '1rem',
    marginBottom: '2.5rem',
    width: '100%',
    overflow: 'hidden',
    borderCollapse: 'collapse',
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
      <th style={{ padding: '12px 16px' }}>S.No</th>
      <th style={{ padding: '12px 16px' }}>Category Name</th>
      <th style={{ padding: '12px 16px' }}>Image</th>
      <th style={{ padding: '12px 16px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category, index) => (
      <tr
        key={category._id}
        style={{
          borderBottom: '1px solid #e5e7eb', // Gray 200
          backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white', // Alternating row colors
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')} // Gray 100
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9fafb' : 'white')}
      >
        <td style={{ padding: '12px 16px' }}>{index + 1}</td>
        <td style={{ padding: '12px 16px' }}>{category.name}</td>
        <td style={{ padding: '12px 16px' }}>
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
        <td style={{ padding: '12px 16px' }}>
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
    ))}
  </tbody>
</table>

       )}


       {/* Show Edit From */}

{showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 mt-14">
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
                      src={`http://192.168.20.5:3000/${currentImage}`} // Display the current image for reference
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


      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-6 pt-2 pb-8 mb-4 ">
        <h1 className='text-center text-2xl mb-2 border bg-gray-600 text-white rounded-lg p-1'>Create Category </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
            Category Name
          </label>
          <input
            type="text"
            id="categoryname"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 12px',
              fontSize: '16px',
              color: '#4a5568', // Gray 700
              backgroundColor: '#f9fafb', // Gray 100
              border: '1px solid #cbd5e0', // Gray 300
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3182ce'; // Blue 600
              e.currentTarget.style.boxShadow = '0 0 4px rgba(49, 130, 206, 0.5)'; // Blue shadow
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e0'; // Reset to Gray 300
              e.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3182ce'; // Blue 600
              e.currentTarget.style.boxShadow = '0 0 4px rgba(49, 130, 206, 0.5)'; // Blue shadow
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e0'; // Reset to Gray 300
              e.currentTarget.style.boxShadow = 'none';
            }}

            // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
            Category Image
          </label>
          {/* <input
            type="file"
            id="images"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            required
          /> */}
          
          <input
  type="file"
  id="images"
  onChange={handleImageChange}
  style={{
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    color: '#4a5568', // Gray 700
    backgroundColor: '#f9fafb', // Gray 100
    border: '1px solid #cbd5e0', // Gray 300
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = '#3182ce'; // Blue 600
    e.currentTarget.style.boxShadow = '0 0 4px rgba(49, 130, 206, 0.5)'; // Blue shadow
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = '#cbd5e0'; // Reset to Gray 300
    e.currentTarget.style.boxShadow = 'none';
  }}
  onFocus={(e) => {
    e.currentTarget.style.borderColor = '#3182ce'; // Blue 600
    e.currentTarget.style.boxShadow = '0 0 4px rgba(49, 130, 206, 0.5)'; // Blue shadow
  }}
  onBlur={(e) => {
    e.currentTarget.style.borderColor = '#cbd5e0'; // Reset to Gray 300
    e.currentTarget.style.boxShadow = 'none';
  }}
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

//  <div className="mt-14 px-6">
//   <div className="flex justify-between items-center gap-8  mb-8">
//     <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">Category Details</h1>
//     <button
//       onClick={() => setShowCreateForm(true)} // Show create form on button click
//       className="flex items-center text-lg text-white rounded-lg px-4 py-2 gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md transform hover:scale-105 transition-transform"
//     >
//       <FcPlus size={28} />
//       Create Category
//     </button>
//   </div>
//   <div className="flex flex-col lg:flex-row gap-8">
//     <div className="w-full lg:w-full bg-white shadow-lg rounded-lg p-12">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category List</h2>
//       {categories && (
//         <div className="overflow-x-auto">
//           <table className="w-96 border-collapse bg-gray-50 rounded-lg shadow-md">
//             <thead>
//               <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700">
//                 <th className="py-4 px-6 text-left text-sm font-semibold">S.No</th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold">Category Name</th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold">Image</th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category, index) => (
//                 <tr
//                   key={category._id}
//                   className="hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <td className="py-4 px-6 border-b">{index + 1}</td>
//                   <td className="py-4 px-6 border-b">{category.name}</td>
//                   <td className="py-4 px-6 border-b">
//                     <img
//                       src={`http://192.168.20.5:3000/${category.image}`}
//                       alt=""
//                       className="h-14 w-14 rounded-md object-cover border"
//                     />
//                   </td>
//                   <td className="py-4 px-6 border-b">
//                     <div className="flex gap-4">
//                       <button
//                         className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-md transform hover:scale-105 transition-transform"
//                         onClick={() => handleDelete(category._id)}
//                       >
//                         <MdDeleteForever size={24} />
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 shadow-md transform hover:scale-105 transition-transform"
//                         onClick={() => {
//                           setShowEditModal(true); // Show edit form on button click
//                           handleEdit(category); // Pass the selected category for editing
//                         }}
//                       >
//                         <MdEdit size={24} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>

//     {showCreateForm && (
//       <div className="w-full lg:w-2/3">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Category</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="categoryname"
//               >
//                 Category Name
//               </label>
//               <input
//                 type="text"
//                 id="categoryname"
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="images"
//               >
//                 Category Image
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 onChange={handleImageChange}
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                 accept="image/*"
//                 required
//               />
//             </div>

//             <div className="flex justify-end gap-4">
//               <button
//                 type="button"
//                 className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
//                 onClick={() => setShowCreateForm(false)} // Close create form
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )}

//     {showEditModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//   <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 mt-14">
//     <h2 className="text-2xl mb-4">Edit Category</h2>
//     {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//     {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//     <form onSubmit={handleEditSubmit}>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryname">
//           Category Name
//         </label>
//         <input
//           type="text"
//           id="categoryname"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentImage">
//           Current Category Image
//         </label>
//         {currentImage && (
//           <img
//             src={`http://192.168.20.5:3000/${currentImage}`} // Display the current image for reference
//             alt="Current"
//             className="mb-4"
//             height="100"
//             width="100"
//           />
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
//           Category Image (Optional)
//         </label>
//         <input
//           type="file"
//           id="newImage"
//           onChange={handleImageChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           accept="image/*"
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Update
//         </button>
//         <button
//           type="button"
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={() => setShowEditModal(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
// )}
//   </div>
//  </div> 


  )
}

export default AdminCategory