import React from 'react'
import { getUserProfile, updateUserProfile } from '../../api/apiServices'
import { useState, useEffect } from 'react';
import { GiBoxUnpacking } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';





function ProfilePage() {

    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



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
      if (!user) {
        return <div>Loading...</div>;
      }

  return (
    <div className='bg-fuchsia-900'>
        <div className="container mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-4 mt-12 text-white"> Your Account</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="bg-white  font-bold  justify-around sm:gap-4 shadow-md rounded-lg p-6 w-78">
      <Link to={'/User/UserOrder'} > 
        <div className='border rounded p-6 mb-2 hover:bg-gray-200 flex gap-4 text-xl'> <GiBoxUnpacking  size={30}/>
        Your Orders</div></Link>
        <Link to={'/User/Profile'} > 
        <div className='border rounded p-6 mb-2 hover:bg-gray-200 flex  gap-4 text-xl '> <BiSolidUserBadge  size={30}/>
        Your Profile</div></Link>
         <Link to={'/User/Profile'} > 
        <div className='border rounded p-6 mb-2 hover:bg-gray-200  flex gap-4 text-xl '> <FaLocationDot size={30} /> 
        Your Address</div> </Link>
        <div className='border rounded p-6 mb-2 hover:bg-gray-200 flex gap-4 text-xl'> <FaHeart  size={30}/>
        Your whistlist</div>
        <div className='border rounded p-6 mb-2 hover:bg-gray-200 flex gap-4 text-xl'> <RiCustomerService2Line size={30} />
        Support</div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage