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
  const [isOpen, setIsOpen] = useState(false);



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
  const SupportModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-96">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800">Support Us</h2>
            <button
              className="text-gray-500 hover:text-red-500 transition duration-200"
              onClick={onClose}
            >
              ✖
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <button
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300"
              onClick={() => window.location.href = "mailto:admin@mail.com?subject=Support Request&body=Hello, I need help with..."}
            >
              📧 Email Support
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition duration-300"
              onClick={() => window.open("https://wa.me/1234567890", "_blank")}
            >
              💬 WhatsApp Chat
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className='bg-white'>
      <div className=" mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-4 mt-16 text"> Your Account</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
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
          <Link to={'/Wishlist'}>
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

          <button>
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
              onClick={() => setIsOpen(true)}
            >
              <div className='flex flex-row gap-4'>
                <RiCustomerService2Line size={38} />
                <div className='text-2xl'>
                  Support
                </div>
              </div>
              <p className='text-sm text-gray-500 ml-12'>Contact Our Customer Service Via Phone or Chat </p>
            </div>
          </button>
          <SupportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  )
}
export default ProfilePage

 // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      //   <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      //     <div className='flex justify-between'>
      //     <h2 className="text-lg font-bold">Support Us</h2>

      //     <button className=" text-red-500" onClick={onClose}>Close</button>
      //     </div>


      //     <button
      //       className="block w-full text-left p-2 bg-blue-500 text-white rounded mb-2"
      //       onClick={() => window.location.href = "mailto:admin@mail.com?subject=Support Request&body=Hello, I need help with..."}
      //     >
      //       Email Support
      //     </button>
      //     <button
      //       className="block w-full text-left p-2 bg-green-500 text-white rounded"
      //       onClick={() => window.open("https://wa.me/1234567890", "_blank")}
      //     >
      //       WhatsApp Chat
      //     </button>
      //   </div>
      // </div>