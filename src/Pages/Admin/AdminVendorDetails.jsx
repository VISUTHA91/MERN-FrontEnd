import React from 'react'
import { useEffect } from 'react';

function AdminVendorDetails() {
    const { vendorId } = useParams(); // Get vendor_id from the route



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


 if (!vendorId) {
    return <div>Loading...</div>;
  }
  return (
    <div>AdminVendorDetails</div>
  )
}

export default AdminVendorDetails