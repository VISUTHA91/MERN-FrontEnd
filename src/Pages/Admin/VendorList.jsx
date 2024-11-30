
// import React from 'react';
// import { getAllVendors } from '../../api/apiServices';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { updateVendorStatus } from '../../api/apiServices';

// function VendorList() {
//   const [vendorlist, setVendorlist] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState({}); // Track the status for each vendor

//   // Handle status change
//   const handleStatus = (vendorId, status) => {
//     setSelectedStatus((prevStatus) => ({
//       ...prevStatus,
//       [vendorId]: status, // Update the status only for the selected vendor
//     }));

//     // Update vendor status in the backend
//     updateVendorStatus(vendorId, status)
//       .then((response) => {
//         console.log('Status updated successfully', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating status', error);
//       });
//   };

//   // Fetch the vendor list from the backend
//   const fetchVendorList = async () => {
//     try {
//       const response = await getAllVendors();
//       console.log('Fetched Data', response);
//       setVendorlist(response.vendors); // Store fetched vendors

//       // Initialize the selectedStatus with each vendor's initial status
//       const initialStatuses = {};
//       response.vendors.forEach(vendor => {
//         initialStatuses[vendor.id] = vendor.status || 'Select Status'; // Assuming the API returns a 'status' field
//       });
//       setSelectedStatus(initialStatuses);
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchVendorList(); // Fetch the vendor list when the component mounts
//   }, []);

//   return (
//     <>
//       <div className=''>
//         <h1 className="text-2xl font-bold mt-24 ml-10">Vendor Details</h1>
//         {vendorlist && (
//           <table className="w-full bg-white border border-gray-600 rounded-lg shadow-lg ml-18 mb-10 mt-4">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 border-b">S.No</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Contact</th>
//                 <th className="py-2 px-4 border-b">Vendor Status</th>
//                 <th className="py-2 px-4 border-b">Approval Status</th>
//                 <th className="py-2 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendorlist.map((vendor, index) => (
//                 <tr key={vendor._id} className="hover:bg-gray-100 w-1/4">
//                   <td className="py-2 px-4 border-b">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">
//                     <Link to={'/Vendor/VendorDetails/'}
//                       state={{ vendorId: vendor._id }}
//                       key={vendor._id}>
//                       {vendor.name}
//                     </Link>
//                   </td>
//                   <td className="py-2 px-4 border-b">{vendor.email}</td>
//                   <td className="py-2 px-4 border-b">{vendor.phone_number}</td>
//                   <td className="py-2 px-4 border-b">
//                     <select
//                       value={selectedStatus[vendor.id] || vendor.status} // Bind value to each vendor's status
//                       onChange={(e) => handleStatus(vendor.id, e.target.value)} // Update only for the specific vendor
//                       className="px-4 py-1 rounded">
//                       <option value="Select Status">Select Status</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </td>

//                   <td className="py-2 px-4 border-b">
//                     {/* Displaying Approval Status */}
//                     {vendor.is_approved
//                       ? vendor.is_approved
//                       : 'Not Approved'} {/* Assuming approvalStatus is the field name */}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
//                       onClick={() => deleteuser(vendor.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default VendorList;


// import React from 'react';
// import { getAllVendors } from '../../api/apiServices';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { updateVendorStatus } from '../../api/apiServices';

// function VendorList() {
//   const [vendorlist, setVendorlist] = useState([]); // List of vendors

//   // Handle approval status change
//   const handleApprovalStatus = (vendorId, approvalStatus) => {
//     const isApproved = approvalStatus === 'APPROVED'; // Determine if status is approved
//     const vendorStatus = isApproved ? true : false; // Set vendor status based on approval

//     // Update vendor approval status in the backend
//     updateVendorStatus(vendorId, { isApproved, vendorStatus }) // Send object with both values
//       .then((response) => {
//         console.log('Approval status updated successfully', response.data);
//         fetchVendorList();
//       })
//       .catch((error) => {
//         console.error('Error updating approval status', error);
//       });
//   };

//   // Fetch the vendor list from the backend
//   const fetchVendorList = async () => {
//     try {
//       const response = await getAllVendors();
//       console.log('Fetched Data', response);
//       setVendorlist(response.vendors); // Store fetched vendors
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchVendorList(); // Fetch the vendor list when the component mounts
//   }, []);

//   return (
//     <>
//       <div className='mr-12'>
//         <h1 className="text-2xl font-bold mt-24">Vendor Details</h1>
//         {vendorlist && (
//           <table className="w-full bg-white border border-gray-600 rounded-lg shadow-lg ">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 border-b">S.No</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Contact</th>
//                 <th className="py-2 px-4 border-b">Approval Status</th>
//                 {/* <th className="py-2 px-4 border-b">Vendor Status</th> */}
//                 <th className="py-2 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendorlist.map((vendor, index) => (
//                 <tr key={vendor._id} className="hover:bg-gray-100 w-1/4">
//                   <td className="py-2 px-4 border-b">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">
//                     <Link to={'/Vendor/VendorDetails/'}
//                       state={{ vendorId: vendor._id }}
//                       key={vendor._id}>
//                       {vendor.name}
//                     </Link>
//                   </td>
//                   <td className="py-2 px-4 border-b">{vendor.email}</td>
//                   <td className="py-2 px-4 border-b">{vendor.phone_number}</td>
//                   <td className="py-2 px-4 border-b">
//                     <select
//                       value={vendor.is_approved ? 'true' : 'false'} // Display current approval status as 'true' or 'false'
//                       onChange={(e) => handleApprovalStatus(vendor._id, e.target.value === 'true')} // Convert string to boolean and pass to handler
//                       className="px-4 py-1 rounded">
//                       <option value="false">Not Approved</option>  {/* false means not approved */}
//                       <option value="true">Approved</option>  {/* true means approved */}
//                     </select>
//                   </td>

//                   {/* <td className="py-2 px-4 border-b">

//                     {vendor.is_approved ? 'Active' : 'Inactive'}
//                   </td> */}
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
//                       onClick={() => deleteuser(vendor._id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default VendorList;



import React, { useState, useEffect } from 'react';
import { getAllVendors, updateVendorStatus } from '../../api/apiServices';
import { Link } from 'react-router-dom';

function VendorList() {
  const [vendorlist, setVendorlist] = useState([]); // List of vendors

  // Handle approval status change
  const handleApprovalStatus = (vendorId, approvalStatus) => {
    const isApproved = approvalStatus === 'true'; // Boolean value for approval

    // Update vendor approval status in the backend
    updateVendorStatus(vendorId, isApproved) // Only send isApproved value
      .then((response) => {
        console.log('Approval status updated successfully', response.data);
        fetchVendorList(); // Fetch the updated vendor list after the change
      })
      .catch((error) => {
        console.error('Error updating approval status', error);
      });
  };

  // Fetch the vendor list from the backend
  const fetchVendorList = async () => {
    try {
      const response = await getAllVendors();
      console.log('Fetched Data', response);
      setVendorlist(response.vendors); // Store fetched vendors
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchVendorList(); // Fetch the vendor list when the component mounts
  }, []);

  return (
    <>
      <div className='mr-12'>
        <h1 className="text-2xl font-bold mt-24">Vendor Details</h1>
        {vendorlist && (
          <table className="w-full bg-white mt-8 border border-gray-600 rounded-lg shadow-lg ">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">S.No</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Approval Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorlist.map((vendor, index) => (
                <tr key={vendor._id} className="hover:bg-gray-100 w-1/4">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={'/Admin/AdminVendorDetails/'}
                      state={{ vendorId: vendor._id }}
                      key={vendor._id}>
                      {vendor.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4 border-b">{vendor.email}</td>
                  <td className="py-2 px-4 border-b">{vendor.phone_number}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={vendor.is_approved ? 'true' : 'false'} // Convert boolean to string for display
                      onChange={(e) => handleApprovalStatus(vendor.id, e.target.value)} // Convert string back to boolean
                      className="px-4 py-1 rounded">
                      <option value="false">Not Approved</option> {/* false means not approved */}
                      <option value="true">Approved</option> {/* true means approved */}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                      onClick={() => deleteuser(vendor._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default VendorList;
