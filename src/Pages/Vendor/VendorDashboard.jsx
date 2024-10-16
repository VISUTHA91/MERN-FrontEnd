import React from 'react'
import { useState } from 'react';
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";
import { FaFirstOrder } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import VendorMainContent from './VendorMainContent';
import VendorProductCreation from './VendorProductCreation';
import { useEffect } from 'react';
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';


function VendorDashboard() {


    const [currentPage, setCurrentPage] = useState('Maincontent');
    const [isOpen, setIsOpen] = useState(false);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [vendor, setVendor] = useState();
    const navigate = useNavigate();


    const token = localStorage.getItem("authToken");
  const vendorData = JSON.parse(localStorage.getItem("vendorData")); 

  useEffect(() => {
    if (token && vendorData) {
      setVendor(vendorData);  // Set the vendor data with the real name
      console.log('..............',vendorData)
    //   setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("vendorData")
    // setIsAuthenticated(false);
    setVendor(null);
    alert('Logged Out');
        navigate("/")
        window.location.reload();
  };






    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const renderPageContent = () => {
        switch (currentPage) {
            case 'Maincontent':
                return <VendorMainContent />;
            case 'All':
                return <VendorProductlist />;
            case 'Create':
                return <VendorProductCreation />
            case 'Orders':
                return <AdminOrders />;
            default:
                return <h2>Page not found</h2>;
        }
    };
    return (
        <>
            <div className="flex">
                {/* Side Content */}
                {/* <div className="w-full lg:w-64">
                    <div className="lg:w-58 h-full lg:h-full bg-fuchsia-900 p-8 text-xl"> */}
                    <div className="w-38 sm:w-48 md:w-56 lg:w-64 "> {/* Smaller width for mobile, larger for bigger screens */}
                    <div className="lg:w-58 h-full lg:h-full bg-fuchsia-900 p-8 text-xl">
                    {/* <p>Welcome: {vendor}</p> */}

                        <ul className="space-y-4 mt-8">
                            <li>
                                <button
                                    onClick={() => setCurrentPage('Maincontent')}
                                    className="flex items-center text-gray-300 hover:text-black gap-2">
                                    <TbLayoutDashboard className=' rounded text-4xl lg:text-base' />
                                    <span className="hidden lg:block">Dashboard</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setCurrentPage('All')}
                                    className="flex items-center text-gray-300 hover:text-black gap-2">
                                    <FaShoppingBasket  className=' rounded mt-1 text-4xl lg:text-base' />
                                    {/* All Products */}
                                    <span className="hidden lg:block">AllProducts</span>

                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setCurrentPage('Create')}
                                    className="flex items-center text-gray-300 hover:text-black gap-2">
                                    <GoPlus className='mt-1   border rounded text-4xl lg:text-base' />
                                    {/* Create Product */}
                                    <span className="hidden lg:block">Create Product</span>

                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setCurrentPage('Orders')}
                                    className="flex items-center text-gray-300 hover:text-white gap-2">
                                    <FaFirstOrder className=' rounded mt-1 text-4xl lg:text-base' />
                                    {/* Orders */}
                                    <span className="hidden lg:block">Orders</span>

                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setCurrentPage('Users')}
                                    className="flex items-center text-gray-300 hover:text-white gap-2">
                                    <HiOutlineUserGroup className=' rounded mt-1 text-4xl lg:text-base' />
                                    {/* Users */}
                                    <span className="hidden lg:block">Users</span>

                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setCurrentPage('Reviews')}
                                    className="flex items-center text-gray-300 hover:text-white gap-2">
                                    <MdReviews className=' rounded mt-1 text-4xl lg:text-base' />
                                    {/* Reviews */}
                                    <span className="hidden lg:block">Reviews</span>

                                </button>
                            </li>
                            <li>
                                <button
                                   onClick={handleLogout}
                                    className="flex items-center text-gray-300 hover:text-white gap-2">
                                    {/* <MdReviews className=' rounded mt-1 text-4xl lg:text-base' /> */}
                                    <TbLogout className=' rounded mt-1 text-4xl lg:text-base' />
                                    <span className="hidden lg:block">LogOut</span>

                                </button>
                            </li>
                        </ul>
                        {/* </nav> */}
                    </div>
                </div>
                {/* Main Content */}
                <div className='mt-10  lg:ml-14 ml-6 mr-6'>
                    {renderPageContent()}
                </div>
            </div>
        </>
    )
}
export default VendorDashboard