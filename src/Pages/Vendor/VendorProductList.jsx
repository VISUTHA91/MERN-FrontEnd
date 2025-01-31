import React, { useState, useEffect } from 'react';
import { getProducts, editProduct } from '../../api/apiServices';
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteProduct } from '../../api/apiServices';
import { useNavigate } from 'react-router-dom';



function VendorProductList() {
  const [productlist, setProductlist] = useState([]);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProductList = async () => {
    try {
      const response = await getProducts(); // Fetch products from backend
      console.log("Fetched Data...", response.products); // Log fetched data

      if (Array.isArray(response.products)) {
        setProductlist(response.products); // Set the state if it's an array
      } else {
        console.warn("Expected an array for products but got:", response.products);
        setProductlist([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProductList(); 
  }, []);
  const handleEdit = (product) => {
    setSelectedProduct(product);
    navigate(`/Vendor/EditProductPage/${product._id}`);
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      await updateProduct(productId, updatedData); // Call the API to update the product
      setProductlist((prevList) =>
        prevList.map((product) => (product._id === productId ? { ...product, ...updatedData } : product))
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle Delete Function
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Call the delete API
      setProductlist(productlist.filter((product) => product._id !== productId)); // Update the product list in the UI
      alert('Product deleted successfully!');
      // window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };



  return (
    <div className=' border-black mt-2 mr-8 h-screen overflow-auto scrollbar scrollbar-hide'>
      <h1 className="text-2xl font-bold mt-4 ml-18">Product List</h1>
      {productlist && productlist.length > 0 ? (
        <table className="w-full bg-white border border-gray-600 rounded-lg shadow-lg ml-18 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">SubCategory</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Size</th>
              <th className="py-2 px-4 border-b">MRP</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {productlist.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-100 w-1/4">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 lg:flex flex-wrap ">
                  {product.images.slice(0, 5).map((image, index) => (
                    <img
                      key={index}
                      src={`http://192.168.20.5:3000/${image}`}
                      alt={`Product Image ${index + 1}`}
                      height="15"
                      width="10"
                    />
                  ))}
                </td>
                <td className="py-2 px-4 border-b">{product.category_id.name}</td>
                <td className="py-2 px-4 border-b">{product.sub_category_id.name}</td>
                <td className="py-2 px-4 border-b">{product.color}</td>
                <td className="py-2 px-4 border-b">
{Array.isArray(product.variants) ? (
  product.variants.map((variant, index) => (
    variant.size && Array.isArray(variant.size) ? (
      variant.size.join(",")
    ) : (
      variant.size 
    )
  )).join(", ") 
) : (
  product.size 
)}

                </td>
                <td className="py-2 px-4 border-b">{product.MRP}</td>
                <td className="py-2 px-4 border-b">{product.total_stock}</td>
                <td className="py-2 px-4 border-b flex">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
                    onClick={() => handleEdit(product)} >
                    <MdEdit size={24} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 ml-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="ml-10">No products found.</p>
      )}
     
    </div>
  );
}
export default VendorProductList;



 {/* <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdate}
      /> */}

        // if (loading) {
  //   return <div>Loading...</div>; // Show loading state while fetching data
  // }

     {/* {Array.isArray(product.variants.map((size,index) ? (
                    product.size.join(',') // Join sizes with a comma
                  ) : (
                    product.size // If it's not an array, just display the value
                  )))} */}
