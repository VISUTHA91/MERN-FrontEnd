import React, { useState, useEffect } from 'react';
import { fetchUserAddresses } from '../../api/apiServices';
import { addAddress } from '../../api/apiServices';
import { setDefaultAddress } from '../../api/apiServices';
import GoBackButton from '../../Components/GoBackButton';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { removeAddress } from '../../api/apiServices';
import { updateAddress } from '../../api/apiServices';

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
    phone:'',
    isDefault: false,
  });
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the address being edited


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        let data = await fetchUserAddresses(userId);
        console.log("Data received from API:", data);
        setAddresses(data.addresses || []);
      } catch (error) {
        console.error("Error fetching addresses:", error.message);
        setAddresses([]);
      }
    };
    fetchAddresses();
  }, [userId]);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };
  // const handleAddAddress = () => {
  //   if (editingIndex !== null) {
  //     // Update existing address
  //     const updatedAddresses = [...addressList];
  //     updatedAddresses[editingIndex] = newAddress;
  //     setAddressList(updatedAddresses);
  //     setEditingIndex(null); // Reset edit mode
  //   } else {
  //     // Add new address
  //     setAddressList([...addressList, newAddress]);
  //   }
  //   setNewAddress({
  //     street: "",
  //     area: "",
  //     landmark: "",
  //     city: "",
  //     state: "",
  //     pin: "",
  //     country: "",
  //     phone: "",
  //     isDefault: false,
  //   });
  //   setShowForm(false);
  // };
  
  const handleAddAddress = async () => {
    try {
      const newAddr = await addAddress(userId, newAddress);
      setAddresses((prev) =>{
        if (!Array.isArray(prev)) {
          console.error("Current addresses state is not an array:", prev);
          return [newAddr]; 
        }
        return [...prev, newAddr]; 
      });
      setShowForm(false); 
      setNewAddress({
        street: '',
        area: '',
        landmark: '',
        city: '',
        pin: '',
        state: '',
        country: 'India',
        phone:'',
        isDefault: false,
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  
  
  const handleEditAddress = (addressId) => {
    if (!Array.isArray(addresses)) {
      console.error("Error: addresses is not an array", addresses);
      return;
    }
  
    const addressToEdit = addresses.find(addr => addr._id === addressId);
    if (!addressToEdit) {
      console.error("Address not found for ID:", addressId);
      return;
    }
    setNewAddress({ ...addressToEdit }); // Ensure a fresh object copy
    setEditingIndex(addressId);
    setShowForm(true);
  };
  
  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      setAddresses((prev) =>{
        if (!Array.isArray(prev)) {
          return prev;
        }
        return prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === addressId,
        }));
      });
    } catch (error) {
      console.error("Error setting default address:", error.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;
  
    try {
      await removeAddress(addressId); // Call API to delete the address
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId)); // Remove from state
      console.log("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };



  const handleUpdateAddress = async () => {
    try {
   
      // Call the updateAddress API
      const updatedAddress = await updateAddress(userId, newAddress._id, newAddress);
      console.log("Address updated successfully:", updatedAddress);
  
      // Update the state with the new address data
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === newAddress._id ? { ...address, ...newAddress } : address
        )
      );
  
      // Reset the form and hide it
      setNewAddress({
        street: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pin: "",
        country: "India",
        phone: "",
        isDefault: false,
      });
      setShowForm(false);
  
    } catch (error) {
      console.error("Error updating address:", error.message);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 mt-16">Manage Addresses</h2>
      <div className="absolute top-2 mt-32 left-2">
        <GoBackButton />
      </div>
        { addresses.length === 0 ? (
        <p className="text-gray-500 mb-4 mt-10 border rounded-lg">No address found. Add a new address.</p>
      ) : (
        <div className="pl-8 ml-10 flex flex-wrap gap-8">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`p-4 mt-4  border w-72  border-2 rounded-lg ${address.isDefault ? 'border-blue-500' : 'border-gray-300'}`}>
              <p>{address.street}</p>
                <p>{address.area} </p>
                <p>{address.landmark} </p>
                  <p>{address.city} </p>
                  <p>{address.state} </p>
                  <p>{address.postalCode} </p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                    <div className='flex justify-between mt-10'>
              <button
                onClick={() => handleSetDefault(address._id)}
                className={`  border-2 rounded p-2 text-sm ${address.isDefault ? 'text-blue-500 border-blue-500' : 'text-gray-600 border-gray-500'}`}>
                {address.isDefault ? 'Default Address' : 'Set as Default'}
              </button>
            
              {/* <CiEdit size={28} onClick={() => handleEditAddress(address._id)} /> */}
              <CiEdit size={28} onClick={() => handleEditAddress(address._id)} />          
              <MdDeleteForever   onClick={() => handleDeleteAddress(address._id)} 
  size={28} />
              </div>
            </div>
          ))}
        </div>
      )}


{/* Add New Address and Edit Form */}
{showForm && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Add New Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
               value={newAddress?.street || ''}
              onChange={handleInputChange}
              placeholder="street"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="area"
              value={newAddress?.area || ''}
              onChange={handleInputChange}
              placeholder="Area"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="landmark"
              value={newAddress?.landmark ||''}
              onChange={handleInputChange}
              placeholder="Landmark (Optional)"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="city"
              value={newAddress?.city || ''}
              onChange={handleInputChange}
              placeholder="City"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="state"
              value={newAddress?.state || ''}
              onChange={handleInputChange}
              placeholder="State"
              className="p-2 border rounded-lg"
            />

            <input
              type="number"
              name="pin"
              value={newAddress?.postalCode || ''}
              onChange={handleInputChange}
              placeholder="PIN"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="country"
              value={newAddress?.country || ''}
              onChange={handleInputChange}
              placeholder="Country"
              className="p-2 border rounded-lg"
            />
              <input
              type="number"
              name="phone"
              value={newAddress?.phone || ''}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-2 border rounded-lg"
            />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress ?.isDefault || false}
                              onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-blue-600 "
              />
              <span className="ml-2">Set as Default</span>
            </label>
            <button
  onClick={editingIndex !== null ? handleUpdateAddress : handleAddAddress}
  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
>
  {editingIndex !== null ? "Update Address" : "Submit Address"}
</button>

          </div>
        </div>
      )}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-6"
      >
        {showForm ? 'Cancel' : 'Add Address'}
      </button>     
    </div>
  );
};

export default Address;




      
  // Add a new address
  // const handleAddAddress = async () => {
  //   try {
  //     const newAddr = await addAddress(userId, newAddress);
  //     setAddresses((prev) =>{
  //       if (!Array.isArray(prev)) {
  //         console.error("Current addresses state is not an array:", prev);
  //         return [newAddr]; 
  //       }
  //       return [...prev, newAddr]; 
  //     });
  //     setShowForm(false); 
  //     setNewAddress({
  //       street: '',
  //       area: '',
  //       landmark: '',
  //       city: '',
  //       pin: '',
  //       state: '',
  //       country: 'India',
  //       phone:'',
  //       isDefault: false,
  //     });
  //   } catch (error) {
  //     console.error("Error adding address:", error);
  //   }
  // };

  //   useEffect(() => {
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
