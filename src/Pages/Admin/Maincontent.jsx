import React from 'react'
import { Link } from 'react-router-dom'


function Maincontent() {
  return (
    <div>
         <div className="flex-grow p-32">
                <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Total Amount */}
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Total Amount</div>
                        <div className="text-center text-2xl font-bold">1824657</div>
                    </div>

                    {/* Products */}
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Products</div>
                        <div className="text-center text-2xl font-bold">789654</div>
                        <Link
                            to="/Admin/AdminProductlist"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                            View Details
                        </Link>
                    </div>

                    {/* Orders */}
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Orders</div>
                        <div className="text-center text-2xl font-bold">789654</div>
                        <Link
                            to="/Admin/AdminOrders"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                            View Details
                        </Link>
                    </div>

                    {/* Users */}
                    <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Users</div>
                        <div className="text-center text-2xl font-bold">784521</div>
                        <Link
                            to="/Admin/Userlist"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                            View Details
                        </Link>
                    </div>

                    {/* Out of Stock */}
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Out of Stock</div>
                        <div className="text-center text-2xl font-bold">258</div>
                    </div>
                </div>
            </div>



    </div>
  )
}

export default Maincontent