import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorById } from '../../api/apiServices';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';



function VendorDetails() {

  const location = useLocation();
  const { vendorId } = location.state;
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    
    
    const monthlySales = [
      { month: "Jan", orders: 4000 },
      { month: "Feb", orders: 3000 },
      { month: "Mar", orders: 2000 },
      { month: "Apr", orders: 2800 },
      { month: "May", orders: 1890 },
      { month: "Jun", orders: 2500 },
    ];
    
    useEffect(() => {
      const fetchVendorDetails = async () => {
        console.log("VendorId in detail page:", vendorId);
        try {
          const data = await getVendorById(vendorId);
          console.log("VENDOR DETAILS PAGE", data);
          setVendor(data.vendor); 
        } catch (err) {
          setError(err.message);
        }
      };
    
      if (vendorId) {
        fetchVendorDetails();
      }
    }, [vendorId]);  // <-- Always include dependencies
    

 if (!vendorId) {
    return <div>Loading...</div>;
  }

    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Vendor Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div  className={"text-center text-white shadow-xl bg-blue-500 rounded-xl"}
                    onClick={() => setShowModal(true)}>
              <div className="p-6">
                <h2 className="text-lg">Product Count</h2>
                <p className="text-2xl font-bold mt-2">450</p>
              </div>
            </div>
            <div  className={"text-center text-white shadow-xl bg-green-500 rounded-xl"}>
              <div className="p-6">
                <h2 className="text-lg">Income</h2>
                <p className="text-2xl font-bold mt-2">75658</p>
              </div>
            </div>
            <div  className={"text-center text-white shadow-xl bg-red-500 rounded-xl"}>
              <div className="p-6">
                <h2 className="text-lg">Queue</h2>
                <p className="text-2xl font-bold mt-2">50</p>
              </div>
            </div>
            <div className={"text-center text-white shadow- bg-yellow-500 rounded-xl justify-center"}>
              <div className="p-6">
                <h2 className="text-lg">Return</h2>
                <p className="text-2xl font-bold mt-2">7</p>
              </div>
            </div>
        </div>
  { vendor && 
        <div className="shadow-xl">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Vendor Name : </strong>{vendor.name}</p>
              <p><strong>Email : </strong>{vendor.email}</p>
              <p><strong>Contact Number : </strong>{vendor.phone_number}</p>
              {/* <p><strong>Registration Date:</strong> 01 Jan 2024</p> */}
              <p><strong>Store Name : </strong>{vendor.company_name}</p>
              {vendor.address && vendor.address.length > 0 && (
    <p>
      <strong>Store Address : </strong>{" "}
      {vendor.address[0].flatNo}, {vendor.address[0].area}, {vendor.address[0].city}, {vendor.address[0].pincode}, {vendor.address[0].state}
    </p>
  )}
            </div>
          </div>
        </div>
}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          <div className="shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Product Stock Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySales}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
  
        {/* <div className="flex gap-4 mt-6">
          <button className="bg-blue-500 hover:bg-blue-600">Send Message</button>
          <button className="bg-red-500 hover:bg-red-600">Block Vendor</button>
          <button className="bg-green-500 hover:bg-green-600">Export Report</button>
        </div> */}
      </div>
    );
}

export default VendorDetails