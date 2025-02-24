import React, { useState } from "react";
import { Link, Outlet ,NavLink} from "react-router-dom";
import Userlist from "./Userlist";
import Maincontent from "./Maincontent";
import AdminProductlist from "./AdminProductlist";
import Createproduct from "./Createproduct";
import AdminOrders from "./AdminOrders";
import AdminCategory from "./AdminCategory";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";
import { FaFirstOrder } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import VendorList from "./VendorList";
import Adminfooter from "../../Components/Adminfooter";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Productlist from "../Productlist";
// import { useState } from 'react';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Maincontent");
  const navigate = useNavigate();

  // const renderPageContent = () => {
  //   switch (currentPage) {
  //     case "Maincontent":
  //       return <Maincontent />;
  //     case "Category":
  //       return <AdminCategory />;
  //     case "Products":
  //       return <AdminProductlist />;
  //     case "Users":
  //       return <Userlist />;
  //     case "Orders":
  //       return <AdminOrders />;
  //     case "Vendors":
  //       return <VendorList />;
  //     default:
  //       return <h2>Page not found</h2>;
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // localStorage.removeItem("vendorData")
    // setIsAuthenticated(false);
    // setVendor(null);
    alert("Logged Out");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
    <div className="flex">
      {/* Side Content */}
      <div className="w-58 ">
        <div className="w-58 h-screen bg-fuchsia-900 p-8 text-xl">
          <ul className="space-y-4">
            <li>
              <NavLink to={"/Dashboard"}
                // onClick={() => setCurrentPage('Maincontent')}
                className="flex items-center text-gray-300 hover:text-black gap-2">
                <TbLayoutDashboard />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={'category'}
                className="flex items-center text-gray-300 hover:text-black gap-2">
                <GrProductHunt />
                Category
              </NavLink>
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
                  <Link to={'Productlist'}
                    className="flex items-center text-gray-300 hover:text-white gap-2 transition duration-200"
                    // onClick={toggleDropdown}>
                    // onClick={() => setCurrentPage("Products")}
                  >
                    <GrProductHunt />
                    Products
                  </Link>
                </div>
              </li>

              <li>
                <Link to={'AdminOrders'}
                  /* onClick={() => setCurrentPage("Orders")} */
                  className="flex items-center text-gray-300 hover:text-white gap-2"
                >
                  <FaFirstOrder />
                  Orders
                </Link>
              </li>

              <li>
                <Link
                  to={"VendorList"}
                  // onClick={() => setCurrentPage("Vendors")}
                  className="flex items-center text-gray-300 hover:text-white gap-2"
                >
                  <HiOutlineUserGroup />
                  Vendors
                </Link>
              </li>

              <li>
                <Link
                  to="users"
                  // onClick={() => setCurrentPage("Users")}
                  className="flex items-center text-gray-300 hover:text-white gap-2"
                >
                  <HiOutlineUserGroup />
                  Customers
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-300 hover:text-white gap-2"
                >
                  {/* <MdReviews className=' rounded mt-1 text-4xl lg:text-base' /> */}
                  <TbLogout />
                  {/* <span className="hidden lg:block">LogOut</span> */}
                  LogOut
                </button>
              </li>

              {/* <li>
              <button
                onClick={() => setCurrentPage('Reviews')}
                className="flex items-center text-gray-300 hover:text-white gap-2"
                >
                <MdReviews />
                Reviews
              </button>
            </li> */}
            </ul>
            {/* </nav> */}
          </div>
        </div>
        {/* Main Content */}
        <div className="bg-fuchsia-100 rounded-xl p-2  m-1 w-full h-screen overflow-auto scrollbar-hide">
          <Outlet />
          <div className="mt-5 fixed bottom-0 left-0 w-full">
            <Adminfooter></Adminfooter>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
