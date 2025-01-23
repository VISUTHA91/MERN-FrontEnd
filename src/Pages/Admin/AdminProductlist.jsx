import React, { useState, useEffect } from 'react';
import { getallProducts, editProduct } from '../../api/apiServices';
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { getCategories } from '../../api/apiServices';
import { deleteProduct } from '../../api/apiServices';
import PropTypes from "prop-types";
import noproduct from '../../assets/images/noproduct.png';


function AdminProductlist() {
  // const [productlist, setProductlist] = useState({ data: [] });
  const [productlist, setProductlist] = useState([]);
  const [showEdit, setShowEdit] = useState(false); // For modal visibility
  const [editProductId, setEditProductId] = useState(null); // To track which product is being edited
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productGender, setProductGender] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productStock_Quantity, setProductStock_Quantity] = useState('');
  const [productImage, setProductImage] = useState(null); // Store current image for preview
  const [successMessage, setSuccessMessage] = useState('');
  const [categories, setCategories] = useState([]); // Store categories
  const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" });
  const [showOnline, setShowOnline] = useState(true);


  // Fetch product list from the server  
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await getallProducts(); // Fetch products from backend
        setProductlist(response.products); // Store fetched products
        // console.log("2525252525",response)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProductList(); // Fetch the product list when the component mounts
  }, []);

  console.log("Fetched Data", productlist); // Log fetched data
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getCategories();
  //       setCategories(response.data || response); // Populate categories dropdown
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, [])

  // Handle Edit Product (Open Edit Modal)
  // const handleShowEdit = (product) => {
  //   setEditProductId(product._id);
  //   setProductName(product.name);
  //   setProductPrice(product.price);
  //   setProductDescription(product.description);
  //   setProductColor(product.color);
  //   setProductGender(product.gender);
  //   setProductSize(product.size);
  //   setProductStock_Quantity(product.stock_quantity);
  //   // setSelectedCategory(product.category.name)
  //   // setSelectedCategory(product.category.id)
  //   setSelectedCategory({
  //     id: product.category_id.category._id, // Use the correct property for id
  //     name: product.category_id.category_id.name,
  //   });



  //   setShowEdit(true); // Show the modal
  // };


  // const handleCategoryChange = (e) => {
  //   const selectedId = e.target.value;
  //   const selectedCategoryObj = categories.find((category) => category._id === selectedId);
  //   setSelectedCategory({
  //     id: selectedId,
  //     name: selectedCategoryObj ? selectedCategoryObj.name : "",
  //   });
  // };


  // const handleEditSubmit = async (event) => {
  //   event.preventDefault(); // Prevent page reload

  //   // Ensure the state variables are populated correctly
  //   console.log('Submitting:', {
  //     editProductId,
  //     productName,
  //     productPrice,
  //     productDescription,
  //     productImage,
  //     productColor,
  //     productGender,
  //     productSize,
  //     productStock_Quantity,
  //     // selectedCategory,

  //   });

  //   try {
  //     const formData = new FormData();
  //     formData.append('name', productName);
  //     formData.append('price', productPrice);
  //     formData.append('description', productDescription);
  //     formData.append('color', productColor);
  //     formData.append('size', productSize);
  //     formData.append('gender', productGender);
  //     formData.append('stock_quantity', productStock_Quantity);
  //     formData.append('categoryId', selectedCategory.id);
  //     formData.append('categoryName', selectedCategory.name);
  //     // formData.append('description', productDescription);

  //     if (productImage) {
  //       formData.append('images', productImage); // Append the image if it was updated
  //     }

  //     console.log('Form Data:', Array.from(formData.entries())); // Debug: log form data
  //     await editProduct(editProductId, formData); // Call the editProduct API service

  //     setSuccessMessage('Product updated successfully!');
  //     setShowEdit(false);
  //     fetchProductList(); // Refresh the product list after editing
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

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

  // String.prototype.toCamelCase = function () {
  //   return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2) {
  //     if (p2) return p2.toUpperCase();
  //     return p1.toLowerCase();
  //   });
  // };

  // const Switch = (props) => {
  //   const { className, label, noText, theme, large } = props;
  //   let switchClass = `${className} relative flex items-center`;
  //   let id = label.toCamelCase();

  //   // Conditional styling based on props
  //   if (large) switchClass += " w-16 h-8";
  //   else switchClass += " w-14 h-6";

  //   if (noText) switchClass += " no-text";
  //   if (theme === "success") switchClass += " bg-green-500";

  //   return (
  //     <div className={`${switchClass}`}>
  //       <label htmlFor={id} className="relative flex items-center cursor-pointer">
  //         <input
  //           type="checkbox"
  //           id={id}
  //           role="switch"
  //           className="peer sr-only"
  //         />
  //         <span
  //           className={`
  //           absolute left-0 top-0 h-full w-full rounded-full 
  //           bg-gray-900 peer-checked:bg-blue-500
  //         `}
  //         ></span>
  //         {!noText && (
  //           <span
  //             className={`
  //             absolute top-0 left-0 w-full h-full flex justify-between px-2 
  //             items-center text-xs font-bold
  //           `}
  //             data-on="ON"
  //             data-off="OFF"
  //           >
  //             <span className="peer-checked:opacity-0">OFF</span>
  //             <span className=" peer-checked:opacity-0">ON</span>
  //           </span>
  //         )}
  //         <span
  //           className={`
  //           absolute left-0 top-0 h-5 w-5 bg-white rounded-full shadow 
  //           transform peer-checked:translate-x-8 transition-all
  //         `}
  //         ></span>
  //       </label>
  //     </div>
  //   );
  // };

  // Switch.propTypes = {
  //   className: PropTypes.string,
  //   theme: PropTypes.string,
  //   label: PropTypes.string.isRequired,
  //   noText: PropTypes.bool,
  //   large: PropTypes.bool,
  // };

  // Switch.defaultProps = {
  //   className: "switch",
  //   noText: false,
  //   large: false,
  //   theme: "",
  // };
  const toggleStatus = () => {
    setShowOnline(!showOnline);
  };

  // Filter products based on switch state
  const filteredProducts = productlist.filter(
    (product) => product.storeType === (showOnline ? 'online' : 'offline')
  );


  return (
    <div className=' border-black mt-12 mr-8'>
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        <div className="flex items-center mb-4">
        <span className="mr-2 text-gray-700 font-medium">
          {showOnline ? 'Showing: Online Products' : 'Showing: Offline Products'}
        </span>
        <button
          onClick={toggleStatus}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            showOnline ? 'bg-green-500' : 'bg-gray-300'
          }`}
          >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              showOnline ? 'translate-x-6' : 'translate-x-0'
            }`}
            ></span>
        </button>
      </div>
    
      <div className='w-full'>
        {/* {productlist && productlist.length > 0 ? ( */}
            {filteredProducts?.length > 0 ? (
        
          <table className="min-w-full bg-white border-collapse border rounded-xl border-gray-200">
            <thead className='border'>
              <tr className="bg-gray-600 text-white rounded-2xl">
                <th className="py-2 px-4 border rounded">Image</th>
                <th className="py-2 px-4 border rounded">Name</th>
                <th className="py-2 px-4 border rounded">Category</th>
                <th className="py-2 px-4 border rounded">SubCategory</th>
                <th className="py-2 px-4 border rounded">Price</th>
                <th className="py-2 px-4 border rounded">Size & Quantity</th>
                <th className="py-2 px-4 border rounded">Color</th>
                <th className="py-2 px-4 border rounded">Gender</th>
                <th className="py-2 px-4 border rounded">Quantity</th>
                <th className="py-2 px-4 border rounded">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {productlist.map((product) => ( */}
              {filteredProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 lg:flex flex-wrap ">
                    {product.images.slice(0, 5).map((image, index) => (
                      <img
                        key={index}
                        src={`http://192.168.20.5:3000/${image}`}
                        alt={`Product Image ${index + 1}`}
                        height="25"
                        width="30"
                      />
                    ))}
                  </td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.category_id}</td>
                  <td className="py-2 px-4 border">{product.sub_category_id}</td>
                  <td className="py-2 px-4 border">{product.final_price}</td>
                  {/* <td className="py-2 px-4 border">{product.size}</td> */}
                  <td className="py-2 px-4 border">
                    {Array.isArray(product.variants) ? (
                      product.variants.map((v, index) => (
                        <span key={index} className="inline-block mr-2">
                          {v.size} - {v.stock}
                        </span>
                      ))
                    ) : (
                      <span>No sizes available</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border">{product.color}</td>
                  <td className="py-2 px-4 border">{product.gender}</td>
                  <td className="py-2 px-4 border">{product.stock_quantity}</td>
                  <td className="py-10 px-4 flex gap-2">
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                    >
                      <MdDeleteForever size={24} />
                    </button>
                    {/* <button
                      className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                      onClick={() => handleShowEdit(product)}
                    >
                      <MdEdit size={24} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex lg:ml-52 md:ml-18 items-center justify-center h-screen lg:-mt-24 md:-mt-20">
          <div className="max-w-md text-center sm:mt-12">
            {/* Image Section */}
            <img
              src={noproduct}
              alt="No Products"
              className="w-full h-auto object-contain"
            />
    
            {/* Text Section */}
            <h1 className="text-2xl font-bold text-gray-800 ">
              No Products Available
            </h1>
            {/* <p className="text-gray-600 mb-6">
              Sorry, we couldn’t find any products that match your search criteria.
              Try exploring other categories or refreshing the page.
            </p> */}
    
        
            {/* <div className="flex justify-center gap-4"> */}
              {/* <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button> */}
              {/* <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                onClick={() => console.log("Explore categories")}
              >
                Explore Categories
              </button> */}
            {/* </div> */}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductlist;



{/* {showEdit && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md max-h-[90%]  overflow-y-auto">
              <h2 className="text-lg font-bold mb-4 mt-14">Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
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
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="size">
                    Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                  Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={productGender}
                    onChange={(e) => setProductGender(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="size">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="stock_quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="stoct_quantity"
                    value={productStock_Quantity}
                    // {product.stock_quantity}
                    onChange={(e) => setProductStock_Quantity(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>





                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowEdit(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}