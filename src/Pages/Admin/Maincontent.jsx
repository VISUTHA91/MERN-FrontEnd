import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchDashboardStats } from '../../api/apiServices';
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";





function Maincontent() {
    
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const getDashboardStats = async () => {
          try {
            const data = await fetchDashboardStats(); // Call the API service
            if (data.status) {
              const { productCount, orderCount, totalSales, outOfStockCount } = data.data;
    
              // Format data for the chart
              const formattedData = [
                { name: "Products", value: productCount, fill: "#8884d8" },
                { name: "Orders", value: orderCount, fill: "#83a6ed" },
                { name: "Total Sales", value: totalSales, fill: "#8dd1e1" },
                { name: "Out of Stock", value: outOfStockCount, fill: "#82ca9d" },
              ];
    
              setChartData(formattedData);
            }
          } catch (error) {
            console.error("Error loading dashboard stats:", error);
          } finally {
            setLoading(false); // Stop loading state
          }
        };
        console.log("chartData",chartData);
    
        getDashboardStats();
      }, []);

  return (
    <div className=''>
         <div className="flex-grow mt-14 p-6">
                <div className='bg-white rounded-xl lg:h-32 h-44 relative'>
                <h1 className="text-3xl font-semibold ml-10">Welcome...</h1>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 m-8 mt-8 absolute ">
                    <div className="bg-blue-500 text-white p-4  rounded-lg shadow-lg lg:gap-10  sm:w-58 sm:h-10 md:w-32 md:h-20 lg:w-44 lg:h-24  ">
                        <div className="text-center lg:text-xl md:text-md sm:text-sm">Total Amount</div>
                        <div className="text-center lg:text-2xl md:text-md sm:text-sm font-bold">1824657</div>
                    </div>

                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg lg:w-44 lg:h-24 md:w-32 md:h-20 sm:h-16">
                        <div className="text-center lg:text-xl sm:text-sm">Products</div>
                        <div className="text-center lg:text-2xl sm:text-sm font-bold">789654</div>
                        <Link
                            to="/Admin/AdminProductlist"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >
                        </Link>
                    </div>

                    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg lg:w-44 lg:h-24 md:w-32 md:h-20 sm:h-16">
                        <div className="text-center lg:text-xl sm:text-sm">Orders</div>
                        <div className="text-center lg:text-2xl sm:text-sm font-bold">789654</div>
                        <Link
                            to="/Admin/AdminOrders"
                            className="block mt-4 text-center text-sm underline hover:text-gray-200"
                        >

                        </Link>
                    </div>

                    <div className="bg-teal-500 text-white p-4 rounded-lg shadow-lg lg:w-44 lg:h-24 md:w-32 md:h-20 sm:h-16">
                        <div className="text-center lg:text-xl sm:text-sm">Users</div>
                        <div className="text-center lg:text-2xl sm:text-sm font-bold">784521</div>
                        <Link
                            to="/Admin/Userlist"
                            className="block mt-4  hover:text-gray-200"
                        >
                        </Link>
                    </div>

                    <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg  lg:w-44 lg:h-24 sm:h-16 md:w-32 md:h-20 sm:h-16">
                        <div className="text-center text-xl">Out of Stock</div>
                        <div className="text-center text-2xl font-bold">258</div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 m-4 md:m-8 mt-4 relative">
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="text-center text-lg md:text-xl">Total Amount</div>
        <div className="text-center text-xl md:text-2xl font-bold">1824657</div>
    </div>

    <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="text-center text-lg md:text-xl">Products</div>
        <div className="text-center text-xl md:text-2xl font-bold">789654</div>
        <Link
            to="/Admin/AdminProductlist"
            className="block mt-4 text-center text-sm underline hover:text-gray-200"
        >
            View Products
        </Link>
    </div>

    <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
    <Link
            to="/Admin/AdminOrders"
            className="block mt-4 text-center text-sm hover:text-gray-200"
        >
        <div className="text-center text-lg md:text-xl">Orders</div>
        <div className="text-center text-xl md:text-2xl font-bold">789654</div>
        
        </Link>
    </div>

    <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="text-center text-lg md:text-xl">Users</div>
        <div className="text-center text-xl md:text-2xl font-bold">784521</div>
        <Link
            to="/Admin/Userlist"
            className="block mt-4 text-center text-sm underline hover:text-gray-200"
        >
            View Users
        </Link>
    </div>

    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="text-center text-lg md:text-xl">Out of Stock</div>
        <div className="text-center text-xl md:text-2xl font-bold">258</div>
    </div>
</div> */}
                </div>
            </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard Overview</h2>
  <div className="flex flex-wrap justify-center gap-6">
      {chartData.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <RadialBarChart
            width={200}
            height={200}
            innerRadius="80%"
            outerRadius="90%"
            barSize={15}
            data={[item]} // Pass individual data as an array
          >
            <RadialBar minAngle={15} clockWise dataKey="value" />
            <Text
              x={100} // Center of the chart (half of width)
              y={100} // Center of the chart (half of height)
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              fontWeight="bold"
            >
              {item.name}
            </Text>
            <Tooltip />
          </RadialBarChart>
          {/* <p className="text-center font-semibold mt-2">{item.name}</p> */}
        </div>
      ))}
    </div>
    </div>
    </div>
  )
}

export default Maincontent