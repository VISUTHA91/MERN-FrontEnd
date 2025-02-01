// import React from 'react';
// import { useEffect, useState } from 'react';
// import { getOrdersByUser } from '../../api/apiServices';

// // const orders = [
// //   {
// //     orderId: '123456',
// //     date: '2024-10-18',
// //     status: 'Delivered',
// //     total: '$150',
// //   },
// //   {
// //     orderId: '123457',
// //     date: '2024-10-10',
// //     status: 'Shipped',
// //     total: '$120',
// //   },
// //   {
// //     orderId: '123458',
// //     date: '2024-10-05',
// //     status: 'Pending',
// //     total: '$90',
// //   },
// // ];

// const UserOrderPage = () => {
//   const [orders, setOrders] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const userId = JSON.parse(localStorage.getItem('userData'));
//         const fetchedOrders = await getOrdersByUser(userId.id);
//         setOrders(fetchedOrders);
//         console.log(fetchedOrders);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load orders. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   },[]);
//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-14">My Orders</h1>
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="px-4 py-2 text-gray-600">Order ID</th>
//               <th className="px-4 py-2 text-gray-600">Date</th>
//               <th className="px-4 py-2 text-gray-600">OrderStatus</th>
//               <th className="px-4 py-2 text-gray-600">PaymentStatus</th>
//               <th className="px-4 py-2 text-gray-600">PaymentMethod</th>
//               <th className="px-4 py-2 text-gray-600">Total</th>
//               <th className="px-4 py-2 text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border-b">
//                 <td className="px-4 py-2">{order.razorpayOrderId}</td>
//                 <td className="px-4 py-2">{order.date}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white ${
//                       order.orderStatus === 'Delivered'
//                         ? 'bg-green-500'
//                         : order.status === 'Shipped'
//                         ? 'bg-blue-500'
//                         : 'bg-yellow-500'
//                     }`}
//                   >
//                     {order.orderStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">{order.paymentStatus}</td>
//                 <td className="px-4 py-2">{order.paymentMethod}</td>
//                 <td className="px-4 py-2">{order.totalAmount.toFixed(2)}</td>
//                 <td className="px-4 py-2">
//                   <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserOrderPage;

// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";

// const UserOrder = ({ orders }) => {
//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-14">My Orders</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders.map((order) => (
//           <OrderCard key={order._id} order={order} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const OrderCard = ({ order }) => {
//   const [rating, setRating] = useState(null);
//   const [hover, setHover] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [reviewText, setReviewText] = useState("");

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <h2 className="text-lg font-semibold text-gray-800">Order ID: {order.razorpayOrderId}</h2>
//       <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
//       <span
//         className={`px-2 py-1 rounded-full text-white inline-block my-2 ${
//           order.orderStatus === "Delivered"
//             ? "bg-green-500"
//             : order.orderStatus === "Shipped"
//             ? "bg-blue-500"
//             : "bg-yellow-500"
//         }`}
//       >
//         {order.orderStatus}
//       </span>
//       <div className="mt-4">
//         {order.products.map((product) => (
//           <div key={product.id} className="border p-2 rounded-lg mb-2">
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="w-full h-32 object-cover rounded-md"
//             />
//             <h3 className="text-md font-semibold mt-2">{product.name}</h3>
//             <p className="text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
//             <p className="text-gray-600">Qty: {product.quantity}</p>
//             <div className="flex mt-2">
//               {[...Array(5)].map((_, index) => {
//                 const currentRating = index + 1;
//                 return (
//                   <FaStar
//                     key={index}
//                     className={`cursor-pointer text-xl ${
//                       currentRating <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
//                     }`}
//                     onClick={() => {
//                       setRating(currentRating);
//                       setIsModalOpen(true);
//                     }}
//                     onMouseEnter={() => setHover(currentRating)}
//                     onMouseLeave={() => setHover(null)}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}  */}
//       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center

//       className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//           <h2 className="text-xl font-bold mb-4">Rate This Product</h2>
//           <p className="text-gray-600 mb-2">Selected Rating: {rating} Stars</p>
//           <textarea
//             className="w-full border rounded-md p-2 mb-4"
//             placeholder="Tell us more about your experience..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           ></textarea>
//           <div className="flex justify-end">
//             <button
//               className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default UserOrder;

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from '../../Components/ReviewModal';
import {useEffect} from "react";
import { getOrdersByUser } from "../../api/apiServices";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const fetchOrders = async () => {
    //     try {
    //       setLoading(true);
    //       const userData = localStorage.getItem("userData");
    //       if (!userData) {
    //         setError("User not found. Please log in.");
    //         setLoading(false);
    //         return;
    //       }
    //       const userId = JSON.parse(userData)?.id;
    //       if (!userId) {
    //         setError("User ID is missing.");
    //         setLoading(false);
    //         return;
    //       }
    //       const fetchedOrders = await getOrdersByUser(userId);
    //       setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
    //       console.log("Fetched Orders:", fetchedOrders);
    //       setLoading(false);
    //     } catch (err) {
    //       setError("Failed to load orders. Please try again.");
    //       setLoading(false);
    //     }
    //   };
    //   fetchOrders();
    // }, []);
    
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem('userData'));
        const fetchedOrders = await getOrdersByUser(userId.id);
        setOrders(fetchedOrders);
        console.log(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();
  },[]);



    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-14">My Orders</h1>
    
        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
              
            ))}
          </div>
        )}
      </div>
    );
    
};

const OrderCard = ({ order }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    console.log("Review Submitted:", { rating, reviewText });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800">Order ID: {order.razorpayOrderId}</h2>
      <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
      <span
        className={`px-2 py-1 rounded-full text-white inline-block my-2 ${
          order.orderStatus === "Delivered"
            ? "bg-green-500"
            : order.orderStatus === "Shipped"
            ? "bg-blue-500"
            : "bg-yellow-500"
        }`}
      >
        {order.orderStatus}
      </span>

<div className="mt-4">
  {Array.isArray(order.products) && order.products.length > 0 ? (
    order.products.map((product) => (
      <div key={product.id} className="border p-2 rounded-lg mb-2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md"
        />
        <h3 className="text-md font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
        <p className="text-gray-600">Qty: {product.quantity}</p>
        <div className="flex mt-2">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                className={`cursor-pointer text-xl ${
                  currentRating <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => {
                  setRating(currentRating);
                  setIsModalOpen(true);
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-600">No products in this order.</p>
  )}
</div>


      {/* Rating Modal */}
      {/* <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rating={rating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
};

export default UserOrder;
