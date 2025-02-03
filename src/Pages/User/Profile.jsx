import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../api/apiServices';
import { updateUserProfile } from '../../api/apiServices';
import GoBackButton from '../../Components/GoBackButton';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);  // State to store selected image file
  const [preview, setPreview] = useState(null);  // For image preview

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = JSON.parse(localStorage.getItem('userData')); // Getting user from localStorage
      if (!userData) {
        setErrorMessage('No user data found.');
        return;
      }

      try {
        const response = await getUserProfile(userData.id); // Pass userId from localStorage
        const fetchedUser = response.user || {};
        setUser({ ...fetchedUser, addresses: fetchedUser.addresses || [] });
      } catch (error) {
        setErrorMessage('Failed to load user profile.');
      }
    };
    fetchUserProfile();
  }, []);




  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...user.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setUser({ ...user, addresses: updatedAddresses });
  };

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = user.addresses.map((address, i) => ({
      ...address,
      isDefault: i === index,
    }));
    setUser({ ...user, addresses: updatedAddresses });
  };

  const handleAddNewAddress = () => {
    setUser({
      ...user,
      addresses: [
        ...user.addresses,
        { flatNo: '', area: '', city: '', state: '', country: 'India', mobile: '', isDefault: false },
      ],
    });
  };

  const handleUpdateProfile = async (user) => {
    try {
      const formData = new FormData();
      formData.append('name', user.name || '');
      formData.append('email', user.email || '');
      formData.append('phone_number', user.phone_number || '');
      const defaultAddress = user.addresses.find((address) => address.isDefault);
      console.log('Updated user:', user.name);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const response = await updateUserProfile(user); // Send FormData to backend
      setUser(response);
      window.location.reload();
      setSuccessMessage('Profile updated successfully!');
      // setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update profile.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 relative">
       <div className="absolute top-2 mt-28 -left-8">
        <GoBackButton />
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-14 text-center"> Your Account</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {!isEditing ? (



<div className="bg-white shadow-2xl  mt-4 rounded-xl p-6 max-w-md mx-auto transform transition-all hover:scale-105">
  {/* Profile Header */}
  <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-lg mb-8 relative shadow-xl">
    {/* Decorative Circle */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-3xl opacity-50"></div>
    {/* Avatar */}
    <div className="relative">
      <img
        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
        alt="Profile"
        className="w-28 h-28 rounded-full shadow-lg border-4 border-white hover:shadow-2xl transition duration-300"
      />
    </div>
    {/* User Details */}
    <div className="flex flex-col items-center mt-2 text-center">
      <h2 className="text-2xl font-bold text-white tracking-wide">{user.name}</h2>
      <p className="text-purple-100 text-sm italic">{user.email}</p>
      <p className="text-purple-100 text-sm">Phone: {user.phone_number}</p>
    </div>
  </div>

  {/* Profile Actions */}
  <div className="bg-gray-50 p-4 rounded-lg shadow-md">
    <button
      onClick={() => setIsEditing(true)}
      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-lg transform hover:-translate-y-1">
      Edit Profile
    </button>
  </div>

  {/* Footer Section */}
  <div className="mt-8 text-center">
    <p className="text-gray-400 text-sm">
      Need help?{" "}
      <a
        href="#"
        className="text-indigo-500 underline hover:text-indigo-600 transition duration-300">
        Contact Support
      </a>
    </p>
  </div>
</div>



      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Personal Info */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              value={user.phone_number}
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button
            onClick={() => handleUpdateProfile(user)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-4"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;



        // <div className="bg-white shadow-md rounded-lg p-6">
        //   <div className="flex bg-gray-100 flex-col justify-center items-center rounded mb-4">
        //     <div>
        //       <div className='flex items-center ml-14 mt-4'>
        //       <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-20 h-20 rounded-full" />
        //       </div>
        //       <div className="flex flex-col items-center mb-4">
        //         <h2 className="text-xl font-semibold">{user.name}</h2>
        //         <p>{user.email}</p>
        //         <p>Phone Number: {user.phone_number}</p>
        //       </div>
        //     </div>
        //   </div>

        //   <button
        //     onClick={() => setIsEditing(true)}
        //     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        //     Edit Profile
        //   </button>
        // </div>
//         <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
//   <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg mb-6">
//     <div className="relative">
//       <img 
//         src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
//         alt="Profile" 
//         className="w-24 h-24 rounded-full shadow-md"
//       />
//     </div>
//     <div className="flex flex-col items-center mt-4 text-center">
//       <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
//       <p className="text-gray-600">{user.email}</p>
//       <p className="text-gray-500">Phone Number: {user.phone_number}</p>
//     </div>
//   </div>

//   <button
//     onClick={() => setIsEditing(true)}
//     className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200">
//     Edit Profile
//   </button>
// </div>
     {/* Edit Address Fields */}
          {/* {user.addresses && user.addresses.map((address, index) => (
            <div key={index} className="mb-4">
              <label htmlFor="flatNo" className="block text-sm font-medium text-gray-700">Flat No</label>
              <input
                type="text"
                id="flatNo"
                value={address.flatNo}
                onChange={(e) => handleAddressChange(index, 'flatNo', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />

              <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
              <input
                type="text"
                id="area"
                value={address.area}
                onChange={(e) => handleAddressChange(index, 'area', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />

              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
              <input
                type="text"
                id="landmark"
                value={address.landmark}
                onChange={(e) => handleAddressChange(index, 'landmark', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />

              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN Code</label>
              <input
                type="number"
                id="pin"
                value={address.pin}
                onChange={(e) => handleAddressChange(index, 'pin', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />

              <label htmlFor="isDefault" className="block text-sm font-medium text-gray-700">Set as Default Address</label>
              <input
                type="checkbox"
                id="isDefault"
                checked={address.isDefault}
                onChange={() => handleSetDefaultAddress(index)}
              />
            </div>
          ))}

          <button
            onClick={handleAddNewAddress}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Address
          </button> */}






          {/* <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
  <div className="flex flex-col items-center bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 p-6 rounded-lg mb-6 shadow-inner">
    <div className="relative">
      <img
        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
        alt="Profile"
        className="w-28 h-28 rounded-full shadow-lg border-4 border-white"
      />
    </div>
    <div className="flex flex-col items-center mt-4 text-center">
      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
      <p className="text-blue-100 text-sm">{user.email}</p>
      <p className="text-blue-100 text-sm">Phone: {user.phone_number}</p>
    </div>
  </div>

  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
    <button
      onClick={() => setIsEditing(true)}
      className="w-full bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none">
      Edit Profile
    </button>
  </div>

  <div className="mt-6 text-center">
    <p className="text-gray-500 text-sm">Need help? <a href="#" className="text-blue-500 underline hover:text-blue-600">Contact Support</a></p>
  </div>
</div> */}