import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";
import { FaFirstOrder } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';






function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className=" mt-20 w-64 h-full bg-fuchsia-900 p-8 text-xl">
      {/* Adjust top-16 according to the height of your navbar */}
      <nav className="p-4 group">
        <ul className="space-y-4">
          <li>
          {/* <NavLink
    to="/admin/dashboard"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'text-greenyellow' : 'text-gray-300 hover:text-black'}`
    }
  >
    <TbLayoutDashboard />
    Dashboard
  </NavLink> */}
            <Link
              to="/admin/dashboard"
              className="flex items-center text-gray-300 hover:text-black gap-2"
            >
            <TbLayoutDashboard />
             Dashboard 
            </Link>
          </li>

          <li>
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
                      className="flex px-4 py-2 text-gray-300 hover:text-white gap-2"
                    >
                      <FaShoppingBasket className='mt-1' />
                       All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/Admin/Createcategory')}
                      className="flex px-4 py-4 text-gray-300 hover:text-white gap-1"
                    >
                    <GoPlus  className='mt-1' />
                        Create
                    </button>
                  </li>
                </ul>
              </div>
              )}
            </div>
          </li>








          <li>
            <div className="relative group">
            <button className="flex items-center text-gray-300 hover:text-white gap-2 transition duration-200"
                onClick={toggleDropdown}>
              <GrProductHunt   />
                Product
            </button>
              {isOpen && (

              <div className=" group-hover:block absolute w-36 left-0 mt-2 bg-gray-700 rounded shadow-lg">
                <ul className="space-y-2 py-2">
                  <li>
                    <button
                      onClick={() => navigate('/admin/products')}
                      className="flex px-4 py-2 text-gray-300 hover:text-white gap-2"
                    >
                      <FaShoppingBasket className='mt-1' />
                       All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/Admin/Createproduct')}
                      className="flex px-4 py-4 text-gray-300 hover:text-white gap-1"
                    >
                    <GoPlus  className='mt-1' />
                        Create
                    </button>
                  </li>
                </ul>
              </div>
              )}
            </div>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center text-gray-300 hover:text-white gap-2"
            >
              <FaFirstOrder />
              Orders
            </Link>
          </li>

          <li>
            <Link
              to="/Admin/Userlist"
              className="flex items-center text-gray-300 hover:text-white gap-2"
            >
              <HiOutlineUserGroup />
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center text-gray-300 hover:text-white gap-2"
            >
              <MdReviews />
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
