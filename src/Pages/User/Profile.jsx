import React from 'react'
import { getUserProfile, updateUserProfile } from '../../api/apiServices'
// import EditProfile from './EditProfile';
import { useState, useEffect } from 'react';

function Profile() {


    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
        // Fetch user profile data when component mounts
        const fetchUserProfile = async () => {
          try {
            const response = await getUserProfile();
            setUser(response.data);
          } catch (error) {
            setErrorMessage('Failed to load user profile.');
          }
        };
        fetchUserProfile();
      }, []);
    
      const handleUpdateProfile = async (updatedUser) => {
        try {
          const response = await updateUserProfile(updatedUser);
          setUser(response.data);
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
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {!isEditing ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Address</h3>
            <p>{user.address || 'No address provided'}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <EditProfile user={user} onUpdateProfile={handleUpdateProfile} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
}

export default Profile