
import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { getUserProfile } from '../api/apiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Nav({ cartCount }) {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = React.useState(null);

  console.log("Cart Count at Nav Bar",cartCount);


  const Links = [
    { name: "HOME", link: "/Home" },
    { name: "PRODUCTS" },
    { name: "CONTACT", link: "/Contact" },
  ];

  const userDropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownRef]);

  // Handle scroll event to change navbar background color
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >=90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData")); 


  useEffect(() => {
    if (token && userData) {
      setUser(userData);  // Set the user data with the real name
      setIsAuthenticated(true);
    }
  }, []);
// console.log(user.id)

  const toggleDropdown = () => {
    // setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpen(prev => !prev);

  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData")
    setIsAuthenticated(false);
    setUser(null);
    // alert('Logged Out');
        // navigate("/")
        // window.location.reload();
        toast.success("Logged Out Successfully");
        setTimeout(() => {
          navigate("/");
      }, 5000);

  };
  // const handleClick = () => {
  //   getUserProfile(user.id)
  //       .then((response) => {
  //         // setUser(response.data); 
  //         console.log(response) // Assuming the user data is in response.data
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user profile:", error);
  //       });
  // }

  // const handleClick = async (e) => {
  //   e.preventDefault(); // Prevent immediate navigation
    
  //   try {
  //     const response = await getUserProfile(user.id);
  //     console.log(response); // Handle the response
  //     // Navigate to the profile page after fetching data
  //     navigate(`/User/Profile/${user.name}`);
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //   }
  // };


  const handleOptionSelect = (option) => {
    console.log(option); // Example action for selecting an option
    setIsDropdownOpen(false); // Close the dropdown
  };


  return (
    <nav className='p-4 fixed w-full flex justify-between items-center shadow-lg z-40 transition-colors duration-500 bg-fuchsia-900 text-white md:w-auto lg:w-full'>
      {/* Logo */}
      <div className="font-bold text-white text-2xl cursor-pointer ml-2 flex items-center gap-1">
        <Link to={'/'}> <p><span>Evvi</span> Tees</p></Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div onClick={() => setOpen(!open)} className="absolute right-5 top-5 cursor-pointer md:hidden">
        {open ? (<IoMdClose size={28} />) : (<RxHamburgerMenu size={28} />)}
      </div>

      {/* Main Navigation */}
      {/* <ul className={`md:flex md:items-center md:static bg-fuchsia-900 md:bg-transparent z-[-1] md:z-auto left-0 w-full gap-20 md:w-auto transition-all duration-500 ease-in-out ${open ? 'top-16 p-6' : 'top-[-490px]'} absolute`}>
        {Links.map((link) => (
          <li key={link.name} className="relative md:ml-4 mt-4 md:mt-0 font-semibold">
            {link.name === "PRODUCTS" ? (
              <>
                <button
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  // onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  // onMouseOver={() => setIsAboutDropdownOpen(true)}
                  // onMouseOut={() => setIsAboutDropdownOpen(false)}
                  // onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className="hover:text-blue-400"
                >
                  {link.name}
                </button>
                {isAboutDropdownOpen && (
                  <ul className="absolute left-0  py-2 w-48 rounded-md shadow-lg bg-white text-black z-20">
                    <li><Link to={'/Productlist/gender/men'}
                    className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Men</Link></li>
                    <li><Link to={'/Productlist/gender/women'}
                    className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Women</Link></li>
                    <li><Link to={'/Productlist/gender/kids'} className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Kids</Link></li>
                  </ul>
                )}
              </>
            ) : (
              <Link to={link.link} className="hover:text-blue-500 duration-500  ">
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul> */}

<ul
  className={`md:flex md:items-center md:static bg-fuchsia-900 md:bg-transparent z-[-1] md:z-auto left-0 w-full gap-20 md:w-auto transition-all duration-500 ease-in-out ${
    open ? 'top-16 p-6' : 'top-[-490px]'
  } absolute`}
>
  {Links.map((link) => (
    <li
      key={link.name}
      className="relative md:ml-4 mt-4 md:mt-0 font-semibold"
      onMouseEnter={() => link.name === "PRODUCTS" && setIsAboutDropdownOpen(true)}
      onMouseLeave={() => link.name === "PRODUCTS" && setIsAboutDropdownOpen(false)}
    >
      {link.name === "PRODUCTS" ? (
        <>
          <button className="hover:text-blue-400">{link.name}</button>
          {isAboutDropdownOpen && (
            <ul className="absolute left-0 py-2 w-48 rounded-md shadow-lg bg-white text-black z-20">
              <li>
                <Link
                  to={'/Productlist/gender/men'}
                  className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                  onClick={() => setIsAboutDropdownOpen(false)}>
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to={'/Productlist/gender/women'}
                  className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                  onClick={() => setIsAboutDropdownOpen(false)}
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to={'/Productlist/gender/kids'}
                  className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                  onClick={() => setIsAboutDropdownOpen(false)}
                >
                  Kids
                </Link>
              </li>
            </ul>
          )}
        </>
      ) : (
        <Link to={link.link} className="hover:text-blue-500 duration-500">
          {link.name}
        </Link>
      )}
    </li>
  ))}
</ul>

      {/* Right Section */}
      <div className="flex  items-center text-white justify-between gap-2 lg:gap-6 mr-10">
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-xs">
          <input
            id="q"
            name="q"
            className="w-full border rounded-xl py-2 pl-3 pr-10 placeholder-gray-500 text-sm focus:border-blue"
            placeholder="Search Products"
            type="text"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
            <IoIosSearch size={20} />
          </button>
        </div>

        {/* Cart and User */}
        <div className="flex items-center lg:gap-8 gap-2 ">
          {/* Cart Icon */}
          
          <Link
          to={isAuthenticated ? '/Cart' : '/Signin'}>
          {isAuthenticated ? (
            user.role === 'admin' ? (
              null
            ):(
            <Badge color="black" badgeContent={cartCount}>
              <BsFillHandbagFill  size={28} className="cursor-pointer" />
            </Badge>
            )
          ):(<Badge badgeContent={cartCount}>
            <BsFillHandbagFill  size={28} className="cursor-pointer" />
          </Badge>)}
          </Link>

          {/* User Dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button onClick={toggleDropdown} 
              className="text-white focus:outline-none">
               Welcome {user.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-35 bg-white rounded-md shadow-lg">
                    {user.role === 'admin' ? (
                    <Link to={'/Dashboard'} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Dashboard
                    </Link>
                    ) : (
                      <Link to={'/User/ProfilePage'}className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                      </Link>
                    )}
                  <a href="/" onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link to={'/Signin'}>
              <FaUserAlt size={28} className="cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;







 // <nav className='
    //   p-4 lg:w-full flex fixed justify-between items-center shadow-lg z-40 transition-colors duration-500 bg-fuchsia-900 text-white w-full'
    //   //  ${isScrolled ? 'bg-fuchsia-900 text-white' : 'bg-fuchsia-900 text-white'}`}
    //    >
    //  {/* <nav  className='p-4 w-full flex fixed justify-between items-center shadow-lg z-40 transition-colors duration-500 bg-fuchsia-900'>  */}
    //   <div className="font-bold text-white text-2xl cursor-pointer ml-2 mt-4 flex items-center gap-1">
    //     <Link to={'/'} > <p><span className=''>Evvi</span> Tees</p></Link>
    //   </div>

    //   <div onClick={() => setOpen(!open)} className="absolute right-5 top-5 cursor-pointer md:hidden">
    //     {open ? (<IoMdClose size={28} />) : (<RxHamburgerMenu size={28} />)}
    //   </div>

    //   <ul className={`md:flex md:items-center lg:text-white md:pb-0 pb-12 absolute md:static bg-fuchsia-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 p-2 gap-20 transition-all duration-500 ease-in ${open ? 'top-20 text-black' : 'top-[-490px]'}`}>
    //     {Links.map((link) => (
    //       <li key={link.name} className="relative ml-4 mt-4 font-semibold">
    //         {link.name === "PRODUCTS" ? (
    //           <>
    //             <button
    //               onMouseOver={() => setIsAboutDropdownOpen(true)}
    //               onMouseOut={() => setIsAboutDropdownOpen(false)}
    //               className="hover:text-blue-400 duration-500"
    //               ref={aboutDropdownRef}
    //             >
    //               {link.name}
    //             </button>
    //             {isAboutDropdownOpen && (
    //               <ul className="absolute left-0 mt-6 py-2 w-48 rounded-md shadow-lg bg-white z-20">
    //                 <li>
    //                   <Link to={'/product1'} className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 1</Link>
    //                 </li>
    //                 <li>
    //                   <Link to={'/product2' }className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 2</Link>
    //                 </li>
    //                 <li>
    //                   <Link to={'/product3'} className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 3</Link>
    //                 </li>
    //               </ul>
    //             )}
    //           </>
    //         ) : (
    //           <Link to ={link.link} className="hover:text-blue-500 duration-500">
    //             {link.name}
    //           </Link>
    //         )}
    //       </li>
    //     ))}
    //   </ul>

    //   <div className="hidden md:flex items-center text-white justify-between gap-6 w-96 bg-blue mr-10">
    //     <div className="relative flex items-center w-full bg-blue">
    //       <input
    //         id="q"
    //         name="q"
    //         className="w-full max-w-xs border rounded-xl py-2 pl-3 pr-10 placeholder-gray-500 text-sm focus:border-blue"
    //         placeholder="Search Products"
    //         type="text"
    //       />
    //       <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
    //         <IoIosSearch size={20} />
    //       </button>
    //     </div>
    //     <div className="flex items-center gap-8 bg-blue">
    //       <Link to={'/Cart'}>
    //       <Badge color="secondary" badgeContent={ cartCount }>

    //         <BsFillHandbagFill size={28} className="cursor-pointer" /></Badge>
    //       </Link>
    //       <div>
    //       {isAuthenticated ? (
    //         <div className="relative">
    //           <button 
    //             onClick={toggleDropdown} 
    //             className="text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    //           >
    //             {user.name}
    //           </button>
    //           {isDropdownOpen && (
    //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
    //               <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
    //                 Profile
    //               </a>
    //               <a href="#" onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
    //                 Logout
    //               </a>
    //             </div>
    //           )}
    //         </div>
    //       ) : (
    //         <Link to={'/Signin'}>
    //         <FaUserAlt size={28} className="cursor-pointer" />
    //       </Link>
    //        )} 


    //       {/* {isUserLogged ? (
    //             <button
    //               onClick={handleLogout}
    //               style={{ color: "white", fontWeight: "bold" }}
    //               className="btn btn-danger"
    //             >
    //               Logout
    //             </button>
    //           ) : ( */}
    //       {/* <Link to={'/Signin'}>
    //         <FaUserAlt size={28} className="cursor-pointer" />
    //       </Link>
    //        )}  */}
    //       </div>
    //     </div>
    //   </div>
    // </nav>





