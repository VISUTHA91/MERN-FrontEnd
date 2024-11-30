import React, { useState, useEffect } from 'react';
import { fetchUserAddresses } from '../../api/apiServices';
import { addAddress } from '../../api/apiServices';
import { setDefaultAddress } from '../../api/apiServices';

const Address = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    area: '',
    landmark: '',
    city: '',
    pin:'',
    state: '',
    country: 'India',
    isDefault: false,
  });


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        let data = await fetchUserAddresses(userId);
        console.log("Data received from API:", data);
        setAddresses(data); 
      } catch (error) {
        console.error("Error fetching addresses:", error.message);
        setAddresses(); // Set empty array on error to maintain array structure
      }
    };
  
    fetchAddresses();
  }, [userId]);
  // console.log("101010101010",addresses)
  
  

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       let data = await fetchUserAddresses(userId);
  //       console.log("Data received from API:", data);
  
  //       // Convert data to an array if it's not already
  //       if (!Array.isArray(data)) {
  //         data = [data];  // Wrap non-array data in an array
  //       }
  
  //       // Ensure all addresses have `isDefault` property
  //       const addressesWithDefault = data.map((address) => ({
  //         ...address,
  //         isDefault: address.isDefault || false,
  //       }));
  
  //       // Set addresses to state
  //       setAddresses(addressesWithDefault);
  //       console.log("Converted and set addresses:", addressesWithDefault);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error.message);
  //       setAddresses([]);  // Set empty array on error to maintain array structure
  //     }
  //   };
    
  //   fetchAddresses();
  // }, [userId]);
  
  
  

  // Handle input changes for new address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new address
  const handleAddAddress = async () => {
    try {
      const newAddr = await addAddress(userId, newAddress);
      setAddresses((prev) =>{
        if (!Array.isArray(prev)) {
          console.error("Current addresses state is not an array:", prev);
          return [newAddr]; // Replace invalid state with a new array
        }
        return [...prev, newAddr]; // Append the new address to the existing array
      });
      setShowForm(false); // Hide form after adding the address
      setNewAddress({
        street: '',
        area: '',
        landmark: '',
        city: '',
        pin: '',
        state: '',
        country: 'India',
        isDefault: false,
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  // Set an address as the default
  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      setAddresses((prev) =>{
        if (!Array.isArray(prev)) {
          // console.error("State is not an array:", prev);
          return prev; // Safeguard against invalid state
        }
        return prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === addressId,
        }));
      });
      window.location.reload();
      // console.log("addresspage:",addressId)
    } catch (error) {
      console.error("Error setting default address:", error.message);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 mt-16">Manage Addresses</h2>

      {/* Display message if no addresses are found */}
      { addresses.data?.length === 0 ? (
        <p className="text-gray-500 mb-4 mt-10 border rounded-lg">No address found. Add a new address.</p>
      ) : (
        <div className="pl-8 ml-10 flex flex-wrap gap-4">
          {addresses.addresses && addresses.addresses.map((address) => (
            <div
              key={address._id}
              className={`p-4 mt-4 w-1/5 border  border-2 rounded-lg ${address.isDefault ? 'border-blue-500' : 'border-gray-300'}`}>
              <p>{address.street}</p>
                <p>{address.area} </p>
                  <p>{address.city} </p>
                  <p>{address.state} </p>
                    <p>{address.country}</p>
              <button
                onClick={() => handleSetDefault(address._id)}
                className={`mt-10  border-2 rounded p-2 text-sm ${address.isDefault ? 'text-blue-500 border-blue-500' : 'text-gray-600 border-gray-500'}`}>
                {address.isDefault ? 'Default Address' : 'Set as Default'}
                {/* {address.isDefault ? 'border-blue-500' : 'border-gray-600'} */}
              </button>
            </div>
          ))}
        </div>
      )}


{/* Add New Address Form */}
{showForm && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Add New Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              placeholder="street"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="area"
              value={newAddress.area}
              onChange={handleInputChange}
              placeholder="Area"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="landmark"
              value={newAddress.landmark}
              onChange={handleInputChange}
              placeholder="Landmark (Optional)"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
              placeholder="State"
              className="p-2 border rounded-lg"
            />

            <input
              type="number"
              name="pin"
              value={newAddress.pin}
              onChange={handleInputChange}
              placeholder="PIN"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="p-2 border rounded-lg"
            />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-blue-600 "
              />
              <span className="ml-2">Set as Default</span>
            </label>
            <button
              onClick={handleAddAddress}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Submit Address
            </button>
          </div>
        </div>
      )}
      {/* Button to show form for adding a new address */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-6"
      >
        {showForm ? 'Cancel' : 'Add Address'}
      </button>

      {/* Add New Address Form */}
      {/* {showForm && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Add New Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              placeholder="street"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="area"
              value={newAddress.area}
              onChange={handleInputChange}
              placeholder="Area"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="landmark"
              value={newAddress.landmark}
              onChange={handleInputChange}
              placeholder="Landmark (Optional)"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
              placeholder="State"
              className="p-2 border rounded-lg"
            />

            <input
              type="number"
              name="pin"
              value={newAddress.pin}
              onChange={handleInputChange}
              placeholder="PIN"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="p-2 border rounded-lg"
            />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-blue-600 "
              />
              <span className="ml-2">Set as Default</span>
            </label>
            <button
              onClick={handleAddAddress}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Submit Address
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Address;
