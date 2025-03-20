import React from 'react'
import { Link } from 'react-router-dom'
// import {chart as chartJS} from 'chart.js/auto';
import { LineChart, Line, Bar, BarChart, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AiOutlineMail } from "react-icons/ai";



function VendorMainContent() {
    const data = [
        {
          name: 'Jan',
          Products: 4000,
        //   pv: 2400,
        //   amt: 2400,
        },
        {
          name: 'Feb',
          Products: 3000,
        //   pv: 1398,
        //   amt: 2210,
        },
        {
          name: 'Mar',
          Products: 2000,
        //   pv: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          Products: 2780,
        //   pv: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          Products: 1890,
        //   pv: 4800,
          amt: 2181,
        },
        {
          name: 'Jun',
          Products: 2390,
        //   pv: 3800,
          amt: 2500,
        },
      ];
  return (
    <div className='flex flex-col gap-1'>
         <div className="flex-grow ">
                <h1 className="text-3xl font-semibold mb-8"> Vendor Dashboard</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Total Amount */}
                    <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Total Amount</div>
                        <div className="text-center text-2xl font-bold">1824657</div>
                    </div>

                    {/* Products */}
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    <Link
                            to="/Admin/AdminProductlist"
                            className="block  text-center text-sm hover:text-gray-200"
                        >
                        <div className="text-center text-xl">Products</div>
                        <div className="text-center text-2xl font-bold">789654</div>
                        </Link>
                    </div>

                    {/* Orders */}
                    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Orders</div>
                        <div className="text-center text-2xl font-bold">789654</div>
                        <Link
                            to="/Admin/AdminOrders"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                        
                        </Link>
                    </div>

                    {/* Users */}
                    {/* <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Users</div>
                        <div className="text-center text-2xl font-bold">784521</div>
                        <Link
                            to="/Admin/Userlist"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                            View Details
                        </Link>
                    </div> */}

                    {/* Out of Stock */}
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Out of Stock</div>
                        <div className="text-center text-2xl font-bold">258</div>
                    </div>
                </div>
        </div>
        {/* <div>Charts
            <Bar
            data={{
                labels :["A" ,"B" ,"C"],
                datasets :[
                    {
                        label : "Uploads",
                        data :[200,300,400]
                    },
                    {
                        label: "Sales",
                        data :[100,400,600]
                    },
                ]
            }}
            />




        </div> */}
        <div className=' flex '>
        <LineChart
          width={450}
          height={250}
          data={data}
          margin={{
            top: 2,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
          <Line dataKey="Products" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </LineChart>


        <BarChart
          width={450}
          height={250}
          data={data}
          margin={{
            top: 2,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
          <Bar dataKey="Products" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      
      </div>
      <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-md shadow-md">
        <AiOutlineMail className="text-blue-600 text-2xl" />
        <div>
          <h2 className="text-lg font-semibold">Email Support</h2>
          <div className='flex gap-2'>
          <p>For queries, email us at:</p>
          <a href="mailto:pharmasupport@evvisolutions.com" className="text-blue-500 hover:underline">
            {/* pharmasupport@evvisolutions.com */}
            admin@mail.com
          </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorMainContent