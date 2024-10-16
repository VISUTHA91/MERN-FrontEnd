import React from 'react'
import { getUserProfile, updateUserProfile } from '../../api/apiServices'
import { useState, useEffect } from 'react';

function Profile() {


  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);  // State to store selected image file
  const [preview, setPreview] = useState(null);  // For image preview


  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = JSON.parse(localStorage.getItem("userData")); // Getting user from localStorage
      if (!userData) {
        setErrorMessage('No user data found.');
        return;
      }

      try {
        const response = await getUserProfile(userData.id); // Pass userId from localStorage
        console.log(response.user)
        setUser(response.user);
      } catch (error) {
        setErrorMessage('Failed to load user profile.');
      }
    };
    fetchUserProfile();
  }, []);


  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);  // Save the selected image file
    setPreview(URL.createObjectURL(file));  // Show a preview of the image
  };

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
        { flatNo: '', area: '', city: '', state: '', country: 'India', mobile: '', isDefault: false }
      ],
    });
  };

  // const handleUpdateAddress = (updatedUser) => {
  //   const defaultAddress = updatedUser.addresses.find((address) => address.isDefault);
  //   console.log('Updated user:', updatedUser);
  //   console.log('Default address:', defaultAddress);
  //   // Save updated user and addresses to backend
  // };


  const handleUpdateProfile = async (updatedUser) => {
    try {
      // Use FormData to include the image file in the update request
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);  // Append the image file
      formData.append('name', updatedUser.name);
      formData.append('email', updatedUser.email);
      formData.append('phone_number', updatedUser.phone_number);
      const defaultAddress = updatedUser.addresses.find((address) => address.isDefault);
      console.log('Updated user:', updatedUser);
      console.log('Default address:', defaultAddress);


      const response = await updateUserProfile(formData);  // Send FormData to backend
      setUser(response);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update profile.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    // <div className="container mx-auto p-8 ">
    //   <h1 className="text-2xl font-bold mb-4 mt-10">User Profile</h1>
    //   {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    //   {successMessage && <p className="text-green-500">{successMessage}</p>}
    //   {!isEditing ? (
    //     <div className="bg-white shadow-md rounded-lg p-6">
    //       <div className="flex  flex-col items-center mb-4">
    //         <div>
    //         <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
    //         <div className=' flex  flex-col items-center'>
    //           <h2 className="text-xl font-semibold">{user.name}</h2>
    //           <p>{user.email}</p>
    //           <p>Phone Number :{user.phone_number}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mb-4 border w-1/4 ">
    //         <h3 className="font-semibold">Address</h3>
    //         <p>{user.address || 'No address provided'}</p>
    //       </div>
    //       <button
    //         onClick={() => setIsEditing(true)}
    //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    //         Edit Profile
    //       </button>
    //     </div>
    //   ) : (
    //     // <EditProfile user={user} onUpdateProfile={handleUpdateProfile} onCancel={() => setIsEditing(false)} />

    //       // <div className="bg-white shadow-md rounded-lg p-6">
    //       //   <div className="mb-4">
    //       //     <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
    //       //       Profile Picture
    //       //     </label>
    //       //     <input type="file" accept="image/*" onChange={handleImageChange} />
    //       //     {preview && (
    //       //       <div className="mt-2">
    //       //         <img src={preview} alt="Preview" className="w-20 h-20 rounded-full" />
    //       //       </div>
    //       //     )}
    //       //   </div>

    //         <div className="bg-white shadow-md rounded-lg p-6">
    //           <div className="mb-4">
    //             <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
    //               Profile Picture
    //             </label>
    //             <input type="file" accept="image/*" onChange={handleImageChange} />
    //             {preview && (
    //               <div className="mt-2">
    //                 <img src={preview} alt="Preview" className="w-20 h-20 rounded-full" />
    //               </div>
    //             )}
    //           </div>
    //           <div className="mb-4">
    //             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
    //               Name
    //             </label>
    //             <input
    //               type="text"
    //               id="name"
    //               value={user.name}
    //               onChange={(e) => setUser({ ...user, name: e.target.value })}
    //               className="mt-1 p-2 border border-gray-300 rounded w-full"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //               Email
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               value={user.email}
    //               onChange={(e) => setUser({ ...user, email: e.target.value })}
    //               className="mt-1 p-2 border border-gray-300 rounded w-full"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
    //               Phone Number
    //             </label>
    //             <input
    //               type="text"
    //               id="phone_number"
    //               value={user.phone_number}
    //               onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
    //               className="mt-1 p-2 border border-gray-300 rounded w-full"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
    //               Address
    //             </label>
    //             <input
    //               type="text"
    //               id="address"
    //               value={user.address}
    //               onChange={(e) => setUser({ ...user, address: e.target.value })}
    //               className="mt-1 p-2 border border-gray-300 rounded w-full"
    //             />
    //           </div>        
    //         <button
    //           onClick={() => handleUpdateProfile(user)}
    //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //         >
    //           Save Changes
    //         </button>
    //         <button
    //           onClick={() => setIsEditing(false)}
    //           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     )}
    //   </div>


    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 mt-10">{user.name} Your Profile</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {!isEditing ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center mb-4">
            <div>
              <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
              <div className='flex flex-col items-center'>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p>{user.email}</p>
                <p>Phone Number: {user.phone_number}</p>
              </div>
            </div>
          </div>

          {/* Display multiple addresses */}
          <div className="mb-4 w-full">
            <h3 className="font-semibold">Addresses</h3>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <div key={index} className={`border p-4 mb-2 ${address.isDefault ? 'bg-green-100' : 'bg-white'}`}>
                  <p>{address.flatNo}, {address.area}, {address.city}, {address.state}, {address.country}</p>
                  <p>Mobile: {address.mobile}</p>
                  {address.landmark && <p>Landmark: {address.landmark}</p>}
                  <button
                    onClick={() => handleSetDefaultAddress(index)}
                    className="text-blue-500 underline mt-2"
                  >
                    {address.isDefault ? 'Default Address' : 'Set as Default'}
                  </button>
                </div>
              ))
            ) : (
              <p>No address provided</p>
            )}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
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

          {/* Add Address Fields */}
          {addresses.map((address, index) => (
            <div key={index} className="mb-4">
              <label htmlFor="flatNo" className="block text-sm font-medium text-gray-700">Flat No</label>
              <input
                type="text"
                id="flatNo"
                value={address.flatNo}
                onChange={(e) => handleAddressChange(index, 'flatNo', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />

              <div className="mb-4">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                <input
                  type="text"
                  id="area"
                  value={address.area}
                  onChange={(e) => handleAddressChange(index, 'area', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />

                <div className="mb-4">
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                  <input
                    type="text"
                    id="landmark"
                    value={address.landmark}
                    onChange={(e) => handleAddressChange(index, 'landmark', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="mb-4">
                    <label htmlFor="isDefault" className="block text-sm font-medium text-gray-700">Set as Default Address</label>
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={address.isDefault}
                      onChange={() => handleSetDefaultAddress(index)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddNewAddress}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Another Address
                </button>

                <button
                  onClick={() => handleUpdateProfile(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        )
      }
        </div>
        )}

      export default Profile;