// import React, { useState } from "react";
// import Modal from "../../Components/Modal";
// import { useEffect } from "react";
// import { getallOrders } from "../../api/apiServices.jsx";
//   const VendorOrders = ({ orderId }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const mockOrders = [
//       {
//         orderId: "123456",
//         razorpayOrderId: "RZP_987654",
//         createdAt: "2025-02-13",
//         status: "Shipped",
//         totalAmount: "₹2,500",
//         products: [
//           {
//             name: "T-Shirt",
//             price: "₹500",
//             vendorId: "V001",
//             imageUrl: "https://via.placeholder.com/100",
//           },
//           {
//             name: "Jeans",
//             price: "₹2,000",
//             vendorId: "V002",
//             imageUrl: "https://via.placeholder.com/100",
//           },
//         ],
//       },
//       {
//         orderId: "654321",
//         razorpayOrderId: "RZP_123789",
//         createdAt: "2025-02-12",
//         status: "Delivered",
//         totalAmount: "₹1,200",
//         products: [
//           {
//             name: "Jacket",
//             price: "₹1,200",
//             vendorId: "V003",
//             imageUrl: "https://via.placeholder.com/100",
//           },
//         ],
//       },
//     ];
//     setOrder(mockOrders);
//     // console.log("Status",order.status)

//   }, []);
//   const handleViewDetails = (orderItem) => {
//     setSelectedOrder(orderItem); // Set the selected order details
//     setIsModalOpen(true); // Open the modal
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null); // Clear the selected order when closing the modal
//   };
//   return (
//     <div className="bg h-full pt-10 p-6">
//       <h1 className="text-2xl font-bold text-gray-800  mt-10 mb-6">
//         {" "}
//         Order List
//       </h1>
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="px-4 py-4 text-gray-600">Order ID</th>
//               <th className="px-4 py-6 text-gray-600">Date</th>
//               <th className="px-4 py-2 text-gray-600">Status</th>
//               <th className="px-4 py-2 text-gray-600">Total</th>
//               <th className="px-4 py-2 text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(order) &&
//               order.map((orderItem) => (
//                 <tr key={orderItem.orderId} className="border-b">
//                   <td className="px-4 py-2">{orderItem.razorpayOrderId}</td>
//                   <td className="px-4 py-2">{orderItem.createdAt}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-white ${
//                         orderItem.status === "Delivered"
//                           ? "bg-green-500"
//                           : orderItem.status === "Shipped"
//                           ? "bg-blue-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {orderItem.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2">{orderItem.totalAmount}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
//                       onClick={() => handleViewDetails(orderItem)} // Open the modal with selected order details
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         {selectedOrder && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">
//               Order Details for #{selectedOrder.orderId}
//             </h2>
//             <div>
//               {selectedOrder?.products?.map((product,index) => (
//                 <div
//                   key={index}
//                   className="flex items-center mb-4 border-b pb-4"
//                 >
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-24 h-24 object-cover rounded-md"
//                   />
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold">{product.name}</h3>
//                     <p className="text-gray-600">Price: {product.price}</p>
//                     <p className="text-gray-600">
//                       Vendor ID: {product.vendorId}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               onClick={closeModal} // Close the modal
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };
// export default VendorOrders;

// import React, { useEffect, useState } from "react";
// const VendorOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  


//   useEffect(() => {
//     const staticOrders = [
//       {
//         _id: "order001",
//         customerName: "John Doe",
//         totalAmount: 1500,
//         status: "Pending",
//       },
//       {
//         _id: "order002",
//         customerName: "Alice Smith",
//         totalAmount: 2500,
//         status: "Accepted",
//       },
//       {
//         _id: "order003",
//         customerName: "Raj Kumar",
//         totalAmount: 1800,
//         status: "Processing",
//       },
//       {
//         _id: "order004",
//         customerName: "Priya M",
//         totalAmount: 2200,
//         status: "Dispatched",
//       },
//     ];
//     setOrders(staticOrders);
//   setLoading(false);
//   }, []);

//   const handleStatusChange = (orderId, newStatus) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order._id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   if (loading) return <p>Loading orders...</p>

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Order Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {orders.map((order) => (
//           <div key={order._id} className="shadow-lg">
//             <div className="p-4">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>Customer:</strong> {order.customerName}</p>
//               <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
//               <p><strong>Status:</strong> <span className="font-semibold">{order.status}</span></p>
//               <div className="flex gap-2 mt-4">
//                 <button
//                   variant="secondary"
//                   onClick={() => handleStatusChange(order._id, "Accepted")}
//                   disabled={order.status !== "Pending"}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   variant="secondary"
//                   onClick={() => handleStatusChange(order._id, "Processing")}
//                   disabled={order.status !== "Accepted"}
//                 >
//                   Process
//                 </button>
//                 <button
//                   variant="secondary"
//                   onClick={() => handleStatusChange(order._id, "Dispatched")}
//                   disabled={order.status !== "Processing"}
//                 >
//                   Dispatch
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default VendorOrders;

import React, { useEffect, useState } from "react";
const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const staticOrders = [
      {
        _id: "order001",
        customerName: "John Doe",
        totalAmount: 1500,
        status: "Pending",
      },
      {
        _id: "order002",
        customerName: "Alice Smith",
        totalAmount: 2500,
        status: "Accepted",
      },
      {
        _id: "order003",
        customerName: "Raj Kumar",
        totalAmount: 1800,
        status: "Processing",
      },
      {
        _id: "order001",
        customerName: "John Doe",
        totalAmount: 1500,
        status: "Pending",
      },
      {
        _id: "order004",
        customerName: "Priya M",
        totalAmount: 2200,
        status: "Dispatched",
      },
      {
        _id: "order002",
        customerName: "Alice Smith",
        totalAmount: 2500,
        status: "Accepted",
      },
    ];
    setOrders(staticOrders);
    setLoading(false);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      case "Dispatched":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading orders...</p>;
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Vendor Order Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4"
          >
            <p className="text-gray-600 mb-2">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Customer:</strong> {order.customerName}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Amount:</strong> ₹{order.totalAmount}
            </p>
            <p className="mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleStatusChange(order._id, "Accepted")}
                disabled={order.status !== "Pending"}
                className={`px-4 py-2 rounded-full text-white transition ${
                  order.status === "Pending"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "Processing")}
                disabled={order.status !== "Accepted"}
                className={`px-4 py-2 rounded-full text-white transition ${
                  order.status === "Accepted"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Process
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "Dispatched")}
                disabled={order.status !== "Processing"}
                className={`px-4 py-2 rounded-full text-white transition ${
                  order.status === "Processing"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Dispatch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VendorOrders;