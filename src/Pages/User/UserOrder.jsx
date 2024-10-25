import React from 'react';

const orders = [
  {
    orderId: '123456',
    date: '2024-10-18',
    status: 'Delivered',
    total: '$150',
  },
  {
    orderId: '123457',
    date: '2024-10-10',
    status: 'Shipped',
    total: '$120',
  },
  {
    orderId: '123458',
    date: '2024-10-05',
    status: 'Pending',
    total: '$90',
  },
];

const UserOrderPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-gray-600">Date</th>
              <th className="px-4 py-2 text-gray-600">Status</th>
              <th className="px-4 py-2 text-gray-600">Total</th>
              <th className="px-4 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b">
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      order.status === 'Delivered'
                        ? 'bg-green-500'
                        : order.status === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.total}</td>
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
