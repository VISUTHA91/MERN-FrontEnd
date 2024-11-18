import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getCartItems , deleteItem } from "../api/apiServices";
import { API_BASE_URL } from "../api/apiServices";
import { MdDeleteForever } from "react-icons/md";
import { updateCartItemQuantity } from "../api/apiServices";


function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // Default as an empty array
  const [loading, setLoading] = useState(true);   // Add loading state
  const [error, setError] = useState(null);       // Add error state
  const [cartId, setCartId] = useState([]);       // Add error state

  const shippingFee = 0;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();  // Fetch data from API
        setCartItems(data.cart.items);  // Only set if the data is an array
        console.log("Cart data:", data.cart.items);
        setCartId(data.cart._id)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const increaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    try {
      await updateCartItemQuantity( cartId, id, updatedCart.find(item => item._id === id).quantity);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };




  const decreaseQuantity = async (cartId,id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    try {
      await updateCartItemQuantity(cartId, id, updatedCart.find(item => item._id === id).quantity);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

 

  const removeItem = async (id) => {
    try {
      await deleteItem(id); // Call the delete API
      setCartItems(cartItems.filter((item) => item._id !== id));
      alert('Product deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };
  

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.final_price * item.quantity,
      0
    );
  };

const calculateGrandTotal = () => {
  return calculateTotalPrice() + shippingFee;
};

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
  }

  console.log("Final cartItems:", cartItems); // Debugging the state

  return (
  
<div className="p-4 md:p-8 pt-28">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h2>
  {cartItems && cartItems.length === 0 ? (
    <p className="text-lg text-gray-600 ">Your cart is empty.</p>
  ) : (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
      {/* Column Headers */}
      <div className="hidden md:flex items-center justify-between py-2 border-b font-semibold text-gray-700 mt-4">
        <span className="flex-1 text-lg">Product</span>
        <span className="w-32 text-center text-lg mr-12">Quantity</span>
        <span className="w-20 text-center text-lg mr-10">Price</span>
        <span className="w-20 text-center text-lg mr-10">Total</span>
        <span className="w-10"></span> {/* Empty space for delete icon */}
      </div>

      {/* Cart Items */}
      {cartItems && cartItems.map((item) => (
        <div key={item._id} className="flex flex-col md:flex-row items-center md:justify-between mb-4 p-4 bg-gray-50 border rounded-lg shadow-sm">
          {/* Product Details */}
          <div className="flex items-center w-full md:flex-1 md:justify-start">
            <img
              src={`${API_BASE_URL}${item.product.images}`}
              alt={item.product.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" 
            />
            <div className="ml-4">
              <h3 className="text-base md:text-lg font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-600">Color: {item.product.color}</p>
              <p className="text-sm text-gray-600">Size: {item.size}</p>
            </div>
          </div>
          <div className=" flex gap-10 mt-6">
         
          {/* Quantity Controls */}
          <div className="mt-2 md:mt-0 w-full md:w-32 flex justify-center md:justify-center items-center">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-l-lg transition-colors"
              onClick={() => decreaseQuantity(item._id)}>
              -
            </button>
            <span className="px-2 text-sm md:text-lg">{item.quantity}</span>
            <button
              className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-r-lg transition-colors"
              onClick={() => increaseQuantity(item._id)}>
              +
            </button>
          </div>
           {/* Price */}
           <div className="mt-2 md:mt-0 w-full md:w-20 text-center md:text-right">
            <p className="text-sm md:text-lg text-gray-800">₹{item.product.final_price}</p>
          </div>

          {/* Total Value */}
          <div className="mt-2 md:mt-0 w-full md:w-20 text-center md:text-right text-sm md:text-lg font-semibold text-gray-900">
            ₹{item.product.final_price * item.quantity}
          </div>
        
          {/* Remove Item Button */}
          <button
            className="mt-2 md:mt-0 w-full md:w-10 text-red-500 hover:text-red-600 transition-colors text-center"
            onClick={() => removeItem(item.product._id)}
          >
            <MdDeleteForever size={24} />
          </button>
          </div>
        </div>
      ))}     

<div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-right">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      {/* Total Items */}
      <div className="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-0">
      Price Detaills: <span className="text-blue-600">( {cartItems.length} Items )</span>
      </div>

      {/* Subtotal Price */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
        Subtotal: <span className="text-blue-600">₹{calculateTotalPrice()}</span>
      </h3>
    </div>

    {/* Shipping Fee */}
    <div className="flex md:flex-row justify-end items-center gap-2 mb-6">
      <p className="text-lg md:text-xl font-semibold text-gray-700 mb-1 ">Shipping Fee:</p>
      <span className="text-lg md:text-xl font-semibold text-blue-600">₹{shippingFee}</span>
    </div>

    {/* Grand Total Price */}
    <div className="flex flex-col md:flex-row justify-end items-center mb-6">
      <h3 className="text-xl font-bold text-gray-900">
        Grand Total: <span className="text-blue-600">₹{calculateGrandTotal()}</span>
      </h3>
    </div>

    {/* Checkout Button */}
    <button
      onClick={handleProceedToPayment}
      className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 ease-in-out">
      Proceed to Checkout
    </button>
  </div>
    </div>
  )}
</div>
  );
}

export default Cart;

 {/* Cart Total */}
      {/* <div className="mt-6 text-right">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Total: ₹{calculateTotalPrice()}</h3>
      </div> */}

      {/* Checkout Button */}
      {/* <div className="mt-6 text-right">
        <button
          onClick={handleProceedToPayment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold shadow-md transition-colors"
        >
          Proceed to Checkout
        </button>
      </div> */}