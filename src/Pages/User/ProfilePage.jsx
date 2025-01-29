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
    <div className='bg-white'>
        <div className=" mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-4 mt-16 text"> Your Account</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {/* <div className="bg-rose-200 flex flex-wrap  font-bold justify-around  shadow-md rounded-lg p-6 w-70">
      <Link to={'/User/UserOrder'} > 
        <div className='border w-96 rounded p-10 mb-2 hover:bg-gray-200 flex gap-4 text-xl'> <GiBoxUnpacking  size={30}/>
        Your Orders</div></Link>
        <Link to={'/User/Profile'} > 
        <div className='border rounded p-10 mb-2 w-96 hover:bg-gray-200 flex  gap-4 text-xl '> <BiSolidUserBadge  size={30}/>
        Your Profile</div></Link>
         <Link to={'/User/Address'} > 
        <div className='border rounded p-10 mb-2 w-96 hover:bg-gray-200  flex gap-4 text-xl '> <FaLocationDot size={30} /> 
        Your Address</div> </Link>
        <div className='border rounded p-10 mb-2  w-96 hover:bg-gray-200 flex gap-4 text-xl'> <FaHeart  size={30}/>
        Your whistlist</div>
        <div className='border rounded p-10 mb-2 w-96 hover:bg-gray-200 flex gap-4 text-xl'> <RiCustomerService2Line size={30} />
        Support</div>
        </div> */}
        <div
  style={{
    backgroundColor: '#fff', // Rose-200 equivalent
    display: 'flex',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    justifyContent: 'space-around',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow equivalent
    borderRadius: '12px', // Rounded-lg
    padding: '16px', // Padding-6
    width: '70%',
    margin: ' auto', // Center the container
  }}
>
  <Link to={'/User/UserOrder'}>
    <div
      style={{
        border: '1px solid #e5e7eb', // Border
        width: '24rem', // Width 96
        borderRadius: '8px', // Rounded
        padding: '40px', // Padding-10
        marginBottom: '8px', // Margin Bottom-2
        display: 'flex flex-col',
        alignItems: 'center',
        gap: '16px', // Gap-4
        fontSize: '1.25rem', // Text-xl
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')} // Gray-200 hover
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
    >
     <div className='flex flex-row gap-4'>
      <GiBoxUnpacking size={38} />
      <div className='text-2xl'>
      Your Orders
      </div>
      </div>
      
      <p className='text-sm text-gray-500 ml-14'>Track,Return or Buy Things Again </p>
    

    </div>
  </Link>

  <Link to={'/User/Profile'}>
    <div
      style={{
        border: '1px solid #e5e7eb',
        width: '24rem',
        borderRadius: '8px',
        padding: '40px',
        marginBottom: '8px',
        display: 'flex flex-col',
        alignItems: 'center',
        gap: '16px',
        fontSize: '1.25rem',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
    >
    <div className='flex flex-row gap-4'>

      <BiSolidUserBadge size={38} />
      <div className='text-2xl'>
      Your Profile
      </div>
    </div>
    <p className='text-sm text-gray-500 ml-14'>Edit Name,Email Mobile Number</p>
    </div>
  </Link>

  <Link to={'/User/Address'}>
    <div
      style={{
        border: '1px solid #e5e7eb',
        width: '24rem',
        borderRadius: '8px',
        padding: '40px',
        marginBottom: '8px',
        display: 'flex flex-col',
        alignItems: 'center',
        gap: '16px',
        fontSize: '1.25rem',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
    >
      <div className='flex flex-row gap-4'>
      <FaLocationDot size={38} />
      <div className='text-2xl'>
      Your Address
    </div>
    </div>
    <p className='text-sm text-gray-500 ml-14'>Edit Addresses For Orders and Gifts </p>
</div>
  </Link>
<Link to={'/User/whislist'}>
  <div
    style={{
      border: '1px solid #e5e7eb',
      width: '24rem',
      borderRadius: '8px',
      padding: '40px',
      marginBottom: '8px',
      display: 'flex flex-col',
      alignItems: 'center',
      gap: '16px',
      fontSize: '1.25rem',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
  >
    <div className='flex flex-row gap-4'>
    <FaHeart size={38} />
    <div className='text-2xl'>
    Your Wishlist
    </div>
    </div>
    <p className='text-sm text-gray-500 ml-12'>Favorites, just a click away!" </p>
  </div>
  </Link>

  {/* <Link to={'/User/Returnpage'}>
  <div
    style={{
      border: '1px solid #e5e7eb',
      width: '24rem',
      borderRadius: '8px',
      padding: '40px',
      marginBottom: '8px',
      display: 'flex flex-col',
      alignItems: 'center',
      gap: '16px',
      fontSize: '1.25rem',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
  >
    <div className='flex flex-row gap-4'>
    <FaHeart size={38} />
    <div className='text-2xl'>
    Your Wishlist
    </div>
    </div>
    <p className='text-sm text-gray-500 ml-12'>Favorites, just a click away!" </p>
  </div>
  </Link> */}





<Link>
  <div
    style={{
      border: '1px solid #e5e7eb',
      width: '24rem',
      borderRadius: '8px',
      padding: '40px',
      marginBottom: '8px',
      display: 'flex flex-col',
      alignItems: 'center',
      gap: '16px',
      fontSize: '1.25rem',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
  >
          <div className='flex flex-row gap-4'>
    <RiCustomerService2Line size={38} />
    <div className='text-2xl'>
    Support
    </div>
  </div>
  <p className='text-sm text-gray-500 ml-12'>Contact Our Customer Service Via Phone or Chat </p>
</div>
</Link>

      </div>
    </div>
    </div>
  )
}

export default ProfilePage