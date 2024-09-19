// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// const initialCartItems = [
//   {
//     id: 1,
//     name: "Product 1",
//     price: 50,
//     quantity: 2,
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     price: 100,
//     quantity: 1,
//     imageUrl: "https://via.placeholder.com/100",
//   },
// ];

// function Cart() {
//   const [complete, setComplete] = useState(false);
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   //  => {
//   //     return JSON.parse(localStorage.getItem("cart-items")) || [];
//   // });
//   function placeOrderHandler() {
//     console.log("Placing order with items:", cartItems);

    // fetch("http://localhost:3000/createOrder", {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(cartItems)
    // })
    // .then(() => {
    //     setCartItems([]);
    //     localStorage.removeItem("cart-items");
    //     setComplete(true);
    //     toast.success("Order Success!");
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     toast.error("Order Failed");
    // });
// }


//   return (
//     <>
//     <div className=''>
//      {cartItems.length > 0 ? (
//                     <div className="">
//                         <h2 className='mt-28 bg-red-200'>Your Cart: <b>{initialCartItems.length} items</b></h2>
//                         <div className="row d-flex justify-content-between">
//                             <div className="col-12 col-lg-8">
//                                 {initialCartItems.map((item) => {
//                                     const totalPriceForItem = (item.price * item.qty).toFixed(2);

//                                     return (
//                                         <div key={item._id}>
//                                             <hr />
//                                             <div className="cart-item">
//                                                 <div className="row">
//                                                     <div className="col-4 col-lg-3">
//                                                         <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} height="90" width="115" />
//                                                     </div>
//                                                     <div className="col-5 col-lg-3">
//                                                         <p>{item.name}</p>
//                                                     </div>
//                                                     <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                                                         <p id="card_item_price">₹{item.price}</p>
//                                                     </div>
//                                                     <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                                                         <p>{item.qty}KG</p>
//                                                     </div>
//                                                     <div className="col-4 col-lg-1 mt-4 mt-lg-0">
//                                                         <i id="delete_cart_item" onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                             <div className="col-12 col-lg-3 my-4">
//                                 <div id="order_summary">
//                                     <h4>Order Summary</h4>
//                                     <hr />
//                                     <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.kg), 0)} (Units)</span></p>
//                                     <p>Est. total: <span className="order-summary-values">₹{Number(cartItems.reduce((acc, item) => (acc + item.price * item.kg), 0)).toFixed(2)}</span></p>
//                                     <hr />
//                                     <button id="checkout_btn" onClick={placeOrderHandler} className="btn btn-primary btn-block">Place Order</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 // </Fragment>
//             ) : (
//                 !complete ? (
//                     <h2 className="mt-5" style={{ textAlign: 'center' }}>Your Cart is Empty!</h2>
//                 ) : (
//                     <Fragment>
//                         <h2 className="mt-5" style={{ textAlign: 'center' }}>Order Complete!</h2>
//                         <p style={{ textAlign: 'center' }}>Your order has been placed successfully.</p>
//                     </Fragment>
//                 )
//             )}
//           </div>
//         </>
//           )
// }

// export default Cart

import React, { useState } from "react";

// Mock Data for Cart Items
const initialCartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 50,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Product 2",
    price: 100,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/100",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Handle increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className='p-8 pt-28'>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className=" p-8">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16" />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-sm">Price: ${item.price}</p>
                <p className="text-sm">Total: ${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center">
                {/* Quantity Controls */}
                <button
                  className="bg-gray-300 px-2 py-1 rounded"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="bg-gray-300 px-2 py-1 rounded"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 text-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="mt-4 text-right">
            <h3 className="text-xl font-bold">Total: ${calculateTotalPrice()}</h3>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
