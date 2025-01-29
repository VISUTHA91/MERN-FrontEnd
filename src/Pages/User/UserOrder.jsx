import React from 'react';
import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../../api/apiServices';

// const orders = [
//   {
//     orderId: '123456',
//     date: '2024-10-18',
//     status: 'Delivered',
//     total: '$150',
//   },
//   {
//     orderId: '123457',
//     date: '2024-10-10',
//     status: 'Shipped',
//     total: '$120',
//   },
//   {
//     orderId: '123458',
//     date: '2024-10-05',
//     status: 'Pending',
//     total: '$90',
//   },
// ];

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-gray-600">Date</th>
              <th className="px-4 py-2 text-gray-600">OrderStatus</th>
              <th className="px-4 py-2 text-gray-600">PaymentStatus</th>
              <th className="px-4 py-2 text-gray-600">PaymentMethod</th>
              <th className="px-4 py-2 text-gray-600">Total</th>
              <th className="px-4 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order.razorpayOrderId}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      order.orderStatus === 'Delivered'
                        ? 'bg-green-500'
                        : order.status === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2">{order.paymentMethod}</td>
                <td className="px-4 py-2">{order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderPage;
