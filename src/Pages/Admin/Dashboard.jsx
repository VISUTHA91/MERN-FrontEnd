import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Userlist from './Userlist';
import Maincontent from './Maincontent';
import AdminProductlist from './AdminProductlist';
import Createproduct from './Createproduct';
import AdminOrders from './AdminOrders';
import AdminCategory from './AdminCategory';
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";
import { FaFirstOrder } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import VendorList from './VendorList';
// import { useState } from 'react';

function Dashboard() {


  const [currentPage, setCurrentPage] = useState('Maincontent');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'Maincontent':
        return <Maincontent />;
      case 'Category':
        return <AdminCategory />;
      case 'All':
        return <AdminProductlist />;
      case 'Create':
        return <Createproduct />;
      case 'Users':
        return <Userlist />;
      case 'Orders':
        return <AdminOrders />;
        case 'Vendors':
          return <VendorList />;
      default:
        return <h2>Page not found</h2>;
    }
  };
  return (
    <div className="flex ">
      {/* Side Content */}
      <div className="w-58">
        <div className=" mt-20 w-58 h-full bg-fuchsia-900 p-8 text-xl">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setCurrentPage('Maincontent')}
                className="flex items-center text-gray-300 hover:text-black gap-2">
                <TbLayoutDashboard />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('Category')}
                className="flex items-center text-gray-300 hover:text-black gap-2">
                <GrProductHunt />
                Category
              </button>
            </li>


            {/* <li>
            <div className="relative group">
            <button className="flex items-center text-gray-300 hover:text-white gap-2 transition duration-200"
                onClick={toggleDropdown}>
              <GrProductHunt   />
                Category
            </button>
              {isOpen && (
              <div className=" group-hover:block absolute w-36 left-0 mt-2 bg-gray-700 rounded shadow-lg">
                <ul className="space-y-2 py-2">
                  <li>
                    <button
                      onClick={() => navigate('/admin/allcategory')}
                      className="flex px-4 py-2 text-gray-300 hover:text-white gap-2">
                      <FaShoppingBasket className='mt-1' />
                       All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/Admin/Createcategory')}
                      className="flex px-4 py-4 text-gray-300 hover:text-white gap-1">
                    <GoPlus  className='mt-1' />
                        Create
                    </button>
                  </li>
                </ul>
              </div>
              )}
            </div>
          </li> */}

            <li>
              <div className="relative group">
                <button className="flex items-center text-gray-300 hover:text-white gap-2 transition duration-200"
                  onClick={toggleDropdown}>
                  <GrProductHunt />
                  Product
                </button>
                {isOpen && (

                  <div className=" group-hover:block absolute w-36 left-0 mt-2 bg-gray-700 rounded shadow-lg">
                    <ul className="space-y-2 py-2">
                      <li>
                        <button
                          onClick={() => setCurrentPage('All')}
                          className="flex items-center text-gray-300 hover:text-black gap-2">
                          <FaShoppingBasket className='mt-1' />
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setCurrentPage('Create')}
                          className="flex items-center text-gray-300 hover:text-black gap-2">
                          <GoPlus className='mt-1' />
                          Create
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>

            <li>
              <button
                onClick={() => setCurrentPage('Orders')}
                className="flex items-center text-gray-300 hover:text-white gap-2"
              >
                <FaFirstOrder />
                Orders
              </button>
            </li>

            
            <li>
              <button
                onClick={() => setCurrentPage('Vendors')}
                className="flex items-center text-gray-300 hover:text-white gap-2"
              >
                <HiOutlineUserGroup />
                Vendors
              </button>
            </li>

            <li>
              <button
                onClick={() => setCurrentPage('Users')}
                className="flex items-center text-gray-300 hover:text-white gap-2"
              >
                <HiOutlineUserGroup />
                Users
              </button>
            </li>

            <li>
              <button
                onClick={() => setCurrentPage('Reviews')}
                className="flex items-center text-gray-300 hover:text-white gap-2"
              >
                <MdReviews />
                Reviews
              </button>
            </li>
          </ul>
          {/* </nav> */}
        </div>
      </div>
      {/* Main Content */}
      <div className='mt-10 ml-16'>
        {renderPageContent()}
      </div>

    </div>
  );
}

export default Dashboard