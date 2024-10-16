import React from 'react'
import { getAllVendors } from '../../api/apiServices';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VendorList() {


    const [vendorlist, setVendorlist] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Select Status'); // Default text

    const handleStatus = (option) => {
      setSelectedOption(option); // Set the selected option
    };
  

  const fetchvendorlist = async () => {
    try {
      const response = await getAllVendors(); // Fetch categories from backend
      console.log("Fetched Data",response)
      setVendorlist(response.vendors); // Store fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

useEffect(() => {
  fetchvendorlist(); // Fetch the user list when the component mounts
}, []);





  return (
    <>
     <div className=''>
  <h1 className="text-2xl font-bold  mt-24 ml-10">Vendor Details</h1>
  {/* <div className=" bg-rose-600 p-2 mb-10 ml-10 pl-10"> */}
    {vendorlist && (
      <table className="w-full bg-white border border-gray-600 rounded-lg shadow-lg ml-18 mb-10 mt-4">
        <thead>
          <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">S.No</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendorlist.map((vendor ,index) => (
            <tr key={vendor._id} className="hover:bg-gray-100 w-1/4">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b"><Link to={'/Vendor/VendorDetails/'}
                state={{ vendorId: vendor._id }}
                key={vendor._id}>{vendor.name} </Link></td>
              <td className="py-2 px-4 border-b">{vendor.email}</td>
              <td className="py-2 px-4 border-b">{vendor.phone_number}</td>
              <td className="py-2 px-4 border-b">
              <select
        value={selectedOption}
        onChange={(e) => handleStatus( vendor._id,e.target.value)}
        className="px-4 py-1 rounded"
      >
        <option value="Select Status">Select Status</option>
        <option value="Active" className="">Active</option>
        <option value="Inactive" className="">Inactive</option>
      </select>
        
              </td>





              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={(e) => {
                    deleteuser(vendor._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  {/* </div> */}
</div>
    
    
    
    
    </>
  )
}

export default VendorList