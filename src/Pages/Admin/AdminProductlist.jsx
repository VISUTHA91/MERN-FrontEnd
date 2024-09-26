import React, { useState } from 'react'
import { useEffect } from 'react';
import { getProducts } from '../../api/apiServices';

function AdminProductlist() {
  const[productlist , setProductlist] = useState([]);

  const fetchproductlist = async () => {
    try {
      const response = await getProducts(); // Fetch categories from backend
      console.log("Fetched Data",response)
      setProductlist(response.data); // Store fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

useEffect(() => {
  fetchproductlist(); // Fetch the user list when the component mounts
}, []);




  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
    <button
      className="ProductAddButton bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      onClick={() => window.location.href = "../Admin"}
    >
      Insert Product
    </button>
    <br />
    <br />
    
    <div className="adminproductcontainer">
    {productlist && (
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {productlist.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">
                <img
                  src={product.image}
                  alt=""
                  height="100"
                  width="115"
                />
              </td>
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.category}</td>
              <td className="py-2 px-4 border">{product.price}</td>
              <td className="py-2 px-4 border flex gap-2">
                <button
                  className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                  // onClick={() => deleteProduct(product._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  // onClick={() => {
                  //   handleShowEdit(product);
                  //   setShowEdit(true);
                  // }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )}

      {/* {showEdit && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={handleCloseEdit}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  </>
    
  )
}

export default AdminProductlist