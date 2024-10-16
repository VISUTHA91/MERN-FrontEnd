import React from 'react'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorById } from '../../api/apiServices';

function VendorDetails() {

    const { vendorId } = useParams(); // Get vendor_id from the route
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
        getVendorById(vendorId)
          .then((response) => {
            setVendor(response.data); // Set the vendor data
            setLoading(false); // Stop the loading state
          })
          .catch((err) => {
            console.error('Error fetching vendor details:', err);
            setError('Failed to load vendor details'); // Set the error state
            setLoading(false); // Stop the loading state
          });
      }, [vendorId]);


 if (!vendor) {
    return <div>Loading...</div>;
  }


  return (
    <>
  
     <div>
      <h1>{vendor.name}'s Details</h1>
      <p>Email: {vendor.email}</p>
      <p>Phone: {vendor.phone_number}</p>
    </div>
    
    
    
    </>
  )
}

export default VendorDetails