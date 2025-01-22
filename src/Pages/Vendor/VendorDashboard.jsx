import React from 'react'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";
import { FaFirstOrder } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { IoCloudOfflineOutline } from "react-icons/io5";

import VendorMainContent from './VendorMainContent';
import VendorProductCreation from './VendorProductCreation';
import VendorProductList from './VendorProductList';
import { useEffect } from 'react';
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import VendorDetails from './VendorDetails';
import AdminOrders from '../Admin/AdminOrders';

function VendorDashboard() {


  const [currentPage, setCurrentPage] = useState('Maincontent');
  const [isOpen, setIsOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const [vendor, setVendor] = useState();
  const navigate = useNavigate();


  const token = localStorage.getItem("authToken");
  const vendorData = JSON.parse(localStorage.getItem("vendorData"));

  useEffect(() => {
    if (token && vendorData) {
      setVendor(vendorData);  // Set the vendor data with the real name
      console.log('..............', vendorData)
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

      case 'Profile':
        return <VendorDetails />;
      case 'Maincontent':
        return <VendorMainContent />;
      case 'All':
        return <VendorProductList />;
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
        <div className="w-38 sm:w-48 md:w-40 lg:w-64 "> {/* Smaller width for mobile, larger for bigger screens */}
          <div className="lg:w-58 h-full lg:h-full bg-fuchsia-900 p-8 text-xl">
            {/* <p>Welcome: {vendor}</p> */}

            <ul className="space-y-4 mt-8 ">
              <li>
                <button
                  onClick={() => setCurrentPage('Maincontent')}
                  className="flex items-center text-gray-300 hover:text-black gap-2">
                  <TbLayoutDashboard className=' rounded text-4xl lg:text-base' />
                  <span className="hidden lg:block md:space-x-6">Dashboard</span>
                </button>
              </li>

              {/* <li>
                                <button
                                    onClick={() => setCurrentPage('Profile')}
                                    className="flex items-center text-gray-300 hover:text-black gap-2">
                                    <FaShoppingBasket  className=' rounded mt-1 text-4xl lg:text-base' />
                                                            <span className="hidden lg:block">AllProducts</span>
                                </button>
                            </li> */}
              <li>
                <button
                  onClick={() => setCurrentPage('All')}
                  className="flex items-center text-gray-300 hover:text-black gap-2">
                  <FaShoppingBasket className=' rounded mt-1 text-4xl lg:text-base' />
                  {/* All Products */}
                  <span className="hidden lg:block">AllProducts</span>

                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('Create')}
                  className="flex items-center text-gray-300 hover:text-black gap-2">
                  <GoPlus className='mt-1 border rounded text-4xl lg:text-base' />
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


              <li
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <button
                  className="flex items-center text-gray-300 hover:text-white gap-2">
                  <IoCloudOfflineOutline className=' rounded mt-1 text-4xl lg:text-base' />
                  <span className="hidden lg:block">Offline Store</span></button>
                {/* {isAboutDropdownOpen && (
                    <ul className="absolute left-0 py-2 w-48 rounded-md shadow-lg bg-white text-black z-20">
                      <li>
                        <Link
                          to={'/Productlist/gender/men'}
                          className="flex items-center text-gray-300 hover:text-white gap-2"
                          onClick={() => setIsAboutDropdownOpen(false)}>
                          BILL
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/Productlist/gender/women'}
                          className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          LIST
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/Productlist/gender/kids'}
                          className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          Others
                        </Link>
                      </li>
                    </ul>
                  )} */}



                {isAboutDropdownOpen && (
                  <ul
                    className="absolute left-0 py-2 w-52 ml-10 rounded-md shadow-lg bg-white border border-gray-200 text-black z-20"
                  >
                    <li>
                      <NavLink
                        to={'/Productlist/gender/men'}
                        className="flex items-center px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-300 gap-2 transition duration-200 rounded-md"
                        onClick={() => setIsAboutDropdownOpen(false)}
                      >
                        Bill
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        to={'/Productlist/gender/women'}
                        className="flex items-center px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-300 gap-2 transition duration-200 rounded-md"
                        onClick={() => setIsAboutDropdownOpen(false)}
                      >
                        List
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/Productlist/gender/kids'}
                        className="flex items-center px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-300 gap-2 transition duration-200 rounded-md"
                        onClick={() => setIsAboutDropdownOpen(false)}>
                        Others
                      </Link>
                    </li>
                  </ul>
                )}

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